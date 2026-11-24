import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const source = await readFile(new URL('../functions/api/instagram.js', import.meta.url), 'utf8');
const { onRequestGet } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const originalFetch = globalThis.fetch;
const store = new Map();
globalThis.caches = { default: {
  match: async key => store.get(key.url)?.clone(),
  put: async (key, value) => { store.set(key.url, value.clone()); },
} };
const env = { INSTAGRAM_ACCESS_TOKEN: 'test-secret', INSTAGRAM_USER_ID: '123' };
const pending = [];
const run = (suffix = '', config = env) => onRequestGet({
  request: new Request(`https://example.test/api/instagram${suffix}`), env: config,
  waitUntil: promise => pending.push(promise),
});
try {
  assert.equal((await run('', {})).status, 503);
  assert.equal((await run('?image=https://example.org')).status, 400);
  let calls = 0;
  globalThis.fetch = async (url, options) => {
    calls++;
    assert.equal(options.headers.Authorization, 'Bearer test-secret');
    return Response.json({ username: 'chapter_yourbookclub', media: { data: [] } });
  };
  assert.equal((await run()).status, 503, 'Reject another Instagram account');
  globalThis.fetch = async () => {
    calls++;
    return Response.json({ username: 'laraundjohanna', media: { data: [
      { id: '1', caption: '<script>test</script>', media_type: 'IMAGE', media_url: 'https://s.cdninstagram.com/1.jpg', permalink: 'https://www.instagram.com/p/Test/', timestamp: '2026-11-24T10:00:00Z' },
      { id: '2', media_type: 'IMAGE', media_url: 'https://evil.example/2.jpg', permalink: 'https://www.instagram.com/p/Test2/' },
    ] } });
  };
  const data = await (await run()).json();
  assert.equal(data.posts.length, 1, 'Reject arbitrary upstream image hosts');
  assert.equal(data.posts[0].image, '/api/instagram?image=1');
  assert.ok(!JSON.stringify(data).includes('cdninstagram'));
  assert.ok(!JSON.stringify(data).includes('test-secret'));
  await Promise.all(pending);
  const before = calls;
  assert.equal((await run()).status, 200);
  assert.equal(calls, before, 'Reuse cached feed');
  assert.equal((await run('?image=99')).status, 404);
  globalThis.fetch = async url => {
    assert.equal(url, 'https://s.cdninstagram.com/1.jpg');
    return new Response('image', { headers: { 'Content-Type': 'image/jpeg', 'Set-Cookie': 'upstream=secret' } });
  };
  const image = await run('?image=1');
  assert.equal(image.status, 200);
  assert.equal(image.headers.get('Set-Cookie'), null);
  assert.equal(image.headers.get('Content-Type'), 'image/jpeg');
  console.log('Instagram checks passed: account guard, URL validation, cache, image proxy, secret isolation.');
} finally { globalThis.fetch = originalFetch; }
