import { readFileSync, writeFileSync, readdirSync, mkdirSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve, parse } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const sharp = require(process.env.SHARP_MODULE_PATH || 'sharp');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const imageDir = resolve(root, 'assets/img');
const outputDir = resolve(imageDir, 'optimized');
mkdirSync(outputDir, { recursive: true });
const manifest = {};
for (const entry of readdirSync(imageDir, { withFileTypes: true })) {
  if (!entry.isFile() || !/\.(jpe?g|png|webp)$/i.test(entry.name)) continue;
  const input = resolve(imageDir, entry.name);
  const meta = await sharp(input).metadata();
  const widths = [...new Set([320, 640, 960, 1280, meta.width].filter(w => w <= meta.width))].sort((a,b) => a-b);
  const variants = [];
  for (const width of widths) {
    const name = `${parse(entry.name).name}-${width}.webp`;
    const output = resolve(outputDir, name);
    await sharp(input).resize({ width, withoutEnlargement: true })
      .webp({ quality: meta.hasAlpha ? 90 : 85, alphaQuality: 100, effort: 6 }).toFile(output);
    variants.push({ width, src: `assets/img/optimized/${name}`, bytes: statSync(output).size });
  }
  manifest[`assets/img/${entry.name}`] = { width: meta.width, height: meta.height, originalBytes: statSync(input).size, variants };
}

const indexPath = resolve(root, 'index.html');
let html = readFileSync(indexPath, 'utf8');
html = html.replace(/<img\b[^>]*>/g, tag => {
  if (tag.includes('id="lightbox-img"')) return tag.replace(/\s+src="[^"]*"/, '');
  const original = tag.match(/data-full-src="([^"]+)"/)?.[1] || tag.match(/\bsrc="([^"]+)"/)?.[1];
  const item = manifest[original];
  if (!item) return tag;
  const fallback = item.variants.find(v => v.width >= 640) || item.variants.at(-1);
  const sizes = original.endsWith('lara-und-johanna.jpg')
    ? '(max-width: 1080px) calc(100vw - 40px), 580px'
    : '(max-width: 900px) calc(100vw - 124px), (max-width: 1280px) calc((100vw - 120px) / 3), 387px';
  const srcset = item.variants.map(v => `${v.src} ${v.width}w`).join(', ');
  return tag.replace(/\s+(src|srcset|sizes|width|height|decoding|data-full-src)="[^"]*"/g, '')
    .replace(/>$/, ` src="${fallback.src}" srcset="${srcset}" sizes="${sizes}" width="${item.width}" height="${item.height}" decoding="async" data-full-src="${original}">`);
});
html = html.replace(/js\/main\.js\?v=[^" ]+/, 'js/main.js?v=20261118-bilder');
writeFileSync(indexPath, html);
writeFileSync(resolve(outputDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
const sum = items => items.reduce((n,i) => n+i, 0);
console.log(JSON.stringify({
  images: Object.keys(manifest).length,
  originalBytes: sum(Object.values(manifest).map(i => i.originalBytes)),
  mobile640Bytes: sum(Object.values(manifest).map(i => (i.variants.find(v => v.width >= 640) || i.variants.at(-1)).bytes))
}));
