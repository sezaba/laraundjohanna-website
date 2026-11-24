// Local-only preview adapter for the production Cloudflare Pages Function.
// Reads the existing Studio Social connection into memory. Never writes tokens.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname, sep } from 'node:path';
import { Publisher } from '../../../plugins/studio-social/core.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const code = await readFile(new URL('../functions/api/instagram.js', import.meta.url), 'utf8');
const { onRequestGet } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
const entries = new Map();
globalThis.caches = { default: {
  async match(key) {
    const entry = entries.get(key.url);
    return entry && entry.expires > Date.now() ? entry.response.clone() : undefined;
  },
  async put(key, response) {
    const seconds = Number(response.headers.get('cache-control')?.match(/max-age=(\d+)/)?.[1] || 0);
    entries.set(key.url, { response: response.clone(), expires: Date.now() + seconds * 1000 });
  },
} };
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.woff2': 'font/woff2' };
const server = createServer(async (req, res) => {
  try {
    if (req.headers.host !== '127.0.0.1:8765') { res.writeHead(403).end(); return; }
    const url = new URL(req.url, 'http://127.0.0.1:8765');
    if (url.pathname === '/api/instagram') {
      if (req.method !== 'GET') { res.writeHead(405).end(); return; }
      const account = await new Publisher().account('instagram', 'laraundjohanna');
      const response = await onRequestGet({ request: new Request(url), env: {
        INSTAGRAM_ACCESS_TOKEN: account.token, INSTAGRAM_USER_ID: account.author,
        INSTAGRAM_API_HOST: account.api_host, INSTAGRAM_API_VERSION: account.version,
      }, waitUntil: promise => promise.catch(() => {}) });
      res.writeHead(response.status, Object.fromEntries(response.headers));
      res.end(Buffer.from(await response.arrayBuffer()));
      return;
    }
    const pathname = decodeURIComponent(url.pathname);
    if (pathname.split('/').some(segment => segment.startsWith('.')) || /^\/(tools|functions)\//.test(pathname)) {
      res.writeHead(404).end(); return;
    }
    let file = resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
    if (!file.startsWith(root.endsWith(sep) ? root : root + sep)) { res.writeHead(404).end(); return; }
    if (!extname(file)) file += '.html';
    if (!(await stat(file)).isFile()) { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(503, { 'Content-Type': 'text/plain' });
    res.end('Vorschau gerade nicht verfügbar.');
  }
});
server.listen(8765, '127.0.0.1', () => console.log('Instagram-Vorschau: http://127.0.0.1:8765/#instagram'));
