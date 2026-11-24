// Cloudflare Pages Function. Credentials belong in encrypted environment secrets.
const PROFILE = 'laraundjohanna';
const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' };
const json = (body, status = 200, diagnostic) => new Response(JSON.stringify(body), {
  status, headers: { ...headers, ...(diagnostic ? { 'X-Instagram-Status': diagnostic } : {}) },
});
const imageURL = value => {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password &&
      (url.hostname.endsWith('.cdninstagram.com') || url.hostname.endsWith('.fbcdn.net')) ? url.href : null;
  } catch { return null; }
};

export async function onRequestGet({ request, env, waitUntil }) {
  if (!env.INSTAGRAM_ACCESS_TOKEN || !/^\d+$/.test(env.INSTAGRAM_USER_ID || '')) {
    return json({ posts: [], available: false }, 503, 'not-configured');
  }
  const url = new URL(request.url);
  const imageId = url.searchParams.get('image');
  if (imageId !== null && !/^\d+$/.test(imageId)) return json({ error: 'Invalid image' }, 400);
  const host = env.INSTAGRAM_API_HOST || 'graph.facebook.com';
  const version = env.INSTAGRAM_API_VERSION || 'v27.0';
  if (!['graph.facebook.com', 'graph.instagram.com'].includes(host) || !/^v\d+\.\d+$/.test(version)) {
    return json({ posts: [], available: false }, 503, 'invalid-config');
  }
  const cache = caches.default;
  // Separate cached data from the public response; upstream image URLs stay server-side.
  const key = new Request(`${url.origin}/__instagram-cache/${env.INSTAGRAM_USER_ID}/${host}/${version}`);
  let stage = 'cache-read';
  try {
    let stored = await cache.match(key);
    let posts;
    if (stored) posts = await stored.json();
    else {
      const endpoint = new URL(`https://${host}/${version}/${env.INSTAGRAM_USER_ID}`);
      endpoint.searchParams.set('fields', 'username,media.limit(50){id,caption,media_type,media_url,thumbnail_url,permalink,timestamp}');
      stage = 'upstream-request';
      const response = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${env.INSTAGRAM_ACCESS_TOKEN}` },
        signal: AbortSignal.timeout(12000), redirect: 'error',
      });
      stage = `upstream-${response.status}`;
      if (!response.ok) throw new Error('Instagram unavailable');
      stage = 'upstream-json';
      const data = await response.json();
      stage = 'account-mismatch';
      if (data.username?.toLowerCase() !== PROFILE) throw new Error('Wrong account');
      stage = 'media-parse';
      posts = (data.media?.data || []).flatMap(post => {
        let permalink;
        try { permalink = new URL(post.permalink); } catch { return []; }
        const image = imageURL(post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url);
        if (!image || !/^\d+$/.test(post.id) || permalink.protocol !== 'https:' ||
          permalink.hostname !== 'www.instagram.com' || !/^\/(p|reel)\/[\w-]+\/$/.test(permalink.pathname)) return [];
        return [{ id: post.id, caption: String(post.caption || '').slice(0, 2200),
          permalink: permalink.href, timestamp: post.timestamp, type: post.media_type, image }];
      }).sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp)).slice(0, 50);
      stage = 'cache-write';
      waitUntil(cache.put(key, new Response(JSON.stringify(posts), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=900' },
      })));
    }
    if (imageId !== null) {
      const post = posts.find(item => item.id === imageId);
      if (!post) return json({ error: 'Image unavailable' }, 404);
      const imageKey = new Request(`${url.origin}/__instagram-image/${imageId}`);
      const cachedImage = await cache.match(imageKey);
      if (cachedImage) return cachedImage;
      const response = await fetch(post.image, { redirect: 'error', signal: AbortSignal.timeout(12000) });
      const type = response.headers.get('Content-Type')?.split(';')[0];
      if (!response.ok || !['image/jpeg', 'image/png', 'image/webp'].includes(type)) throw new Error('Image unavailable');
      const result = new Response(response.body, { headers: {
        'Content-Type': type, 'Cache-Control': 'public, max-age=3600',
        'X-Content-Type-Options': 'nosniff', 'Content-Security-Policy': "default-src 'none'", 
      } });
      waitUntil(cache.put(imageKey, result.clone()));
      return result;
    }
    return json({ available: true, posts: posts.map(({ image, ...post }) => ({ ...post, image: `/api/instagram?image=${post.id}` })) });
  } catch {
    // Do not expose Graph API errors, URLs or account credentials.
    return json({ posts: [], available: false }, 503, stage);
  }
}
