import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFileSync(resolve(root, path), 'utf8');
const write = (path, text) => writeFileSync(resolve(root, path), text);
const context = { window: {} };
vm.runInNewContext(read('js/data.js'), context);
const { offers, tabs } = context.window.LJ_DATA;
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const arrow = '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M3 9h11M10 4l5 5-5 5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
const plus = '<svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><path d="M11 3v16M3 11h16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"></path></svg>';
const questions = tab => tab.qa.map(q => `<details><summary>${escape(q.q)}${plus}</summary><p>${escape(q.a)}</p></details>`).join('\n');
const footerLinks = offers.map(o => `<li><a href="/${o.key}">${escape(o.name)}</a></li>`).join('');

let home = read('index.html');
const cards = offers.filter(o => o.key !== 'beratung-und-einstieg').map(o => `<article class="kachel" data-offer="${o.key}"><h3 class="kachel__name">${escape(o.name)}</h3><p class="kachel__short">${escape(o.short)}</p><a class="kachel__more" href="/${o.key}" aria-label="Pakete ansehen: ${escape(o.name)}">Pakete ansehen${arrow}</a></article>`).join('\n');
const cardBlock = `<!-- offers:start -->\n${cards}\n<!-- offers:end -->`;
if (home.includes('<!-- offers:start -->')) home = home.replace(/<!-- offers:start -->[\s\S]*?<!-- offers:end -->/, cardBlock);
else home = home.replace('<!-- Die Angebots-Kacheln werden aus js/data.js erzeugt -->', cardBlock);
home = home.replace(/<button class="kachel__more" type="button" id="gespraech-more">([\s\S]*?)<\/button>/, '<a class="kachel__more" id="gespraech-more" href="/beratung-und-einstieg">$1</a>');
home = home.replace(/<ul id="footer-leistungen">[\s\S]*?<\/ul>/, `<ul id="footer-leistungen">${footerLinks}</ul>`);
const panels = tabs.map(t => `<div class="qa-panel" id="qa-${t.key}" role="tabpanel" aria-label="${escape(t.name)}">${questions(t)}</div>`).join('\n');
const faqBlock = `<!-- faq:start -->\n${panels}\n<!-- faq:end -->`;
if (home.includes('<!-- faq:start -->')) home = home.replace(/<!-- faq:start -->[\s\S]*?<!-- faq:end -->/, faqBlock);
else home = home.replace('<div class="qa" role="tabpanel" id="qa" aria-live="polite"></div>', `<div class="qa" id="qa">${faqBlock}</div>`);
home = home.replace(/<!-- Paket-Popup -->[\s\S]*?<\/dialog>\s*/, '');
home = home.replace(/js\/main\.js\?v=[^" ]+/, 'js/main.js?v=20261118-leistungsseiten');
if (!home.includes('css/service.css')) home = home.replace('</head>', '<link rel="stylesheet" href="css/service.css?v=20261118-leistungsseiten">\n</head>');
write('index.html', home);

function packageCard(o, p) {
  let html = `<article class="pk${p.price ? '' : ' pk--thema'}${p.empfehlung ? ' pk--empfohlen' : ''}${!p.price && p.text ? ' pk--text' : ''}">`;
  if (p.empfehlung) html += `<span class="pk__band">${escape(p.empfehlung)}</span>`;
  html += `<h3 class="pk__name">${escape(p.name)}</h3>`;
  if (p.sub) html += `<p class="pk__sub">${escape(p.sub)}</p>`;
  if (p.price) html += `<div class="pk__preis">${escape(p.price)}<small>${escape(p.small)}</small></div>`;
  if (p.text) html += `<p class="pk__text">${escape(p.text)}</p>`;
  if (p.items) html += `<ul>${p.items.map(item => `<li>${escape(item)}</li>`).join('')}</ul>`;
  if (p.price && p.hinweis) html += `<p class="pk__hinweis">${escape(p.hinweis)}</p>`;
  if (p.price) {
    const topic = p.anfrage || `${o.name}: ${p.name} (${p.price.replace('*', '')})`;
    const attributes = p.buchung ? `href="${escape(p.buchung)}" data-booking target="_blank" rel="noopener noreferrer" aria-haspopup="dialog"` : `href="#kontakt" data-kontakt="${escape(topic)}"`;
    html += `<a class="btn btn--pink btn--klein" ${attributes}>${escape(p.button || 'Paket anfragen')}</a>`;
  }
  return html + '</article>';
}

const contact = home.match(/<section class="kontakt"[\s\S]*?<\/section>/)[0];
for (const o of offers) {
  const tab = tabs.find(t => t.key === o.key);
  const label = o.eyebrow || 'Pakete & Festpreise';
  const one = o.packages.length === 1;
  const faqLink = `${tab.qa.length} Fragen & Antworten zu ${o.name} →`;
  const gridClass = `pop__grid${o.packages.every(p => !p.price) ? ' pop__grid--themen' : ''}${one ? ' pop__grid--einzeln' : ''}`;
  const main = `<main id="inhalt" tabindex="-1">
<section class="service"><div class="wrap">
<a class="service__back" href="/#angebote">← Zurück</a>
<header class="service__head"><h1>${escape(o.name)}</h1><p class="lead">${escape(o.short)}</p>${o.intro ? `<p class="pop__intro">${escape(o.intro)}</p>` : ''}</header>
<h2 class="service__label">${escape(label)}</h2>
<div class="${gridClass}">${o.packages.map(p => packageCard(o, p)).join('\n')}${one ? `<p class="pop__seite">${escape(o.note)}</p>` : ''}</div>
<div class="pop__foot">${one ? '' : `<p class="pop__note">${escape(o.note)}</p>`}<span class="pop__foot-r"><a class="pop__qa" href="#fragen">${escape(faqLink)}</a>${o.cta ? `<a class="btn btn--pink" href="#kontakt" data-kontakt="${escape(o.name + ': ' + o.cta.replace(/ anfragen$/, ''))}">${escape(o.cta)}</a>` : ''}</span></div>
</div></section>
<section class="fragen" id="fragen"><div class="wrap"><div class="fragen__head"><h2 class="h2">Fragen &amp; Antworten</h2></div><div class="qa">${questions(tab)}</div></div></section>
${contact}
</main>`;
  let page = home.replace(/<main id="inhalt"[\s\S]*?<\/main>/, main);
  page = page.replace('<body>', `<body data-service="${o.key}">`);
  page = page.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(o.name)} · Lara &amp; Johanna</title>`);
  page = page.replace(/(<meta name="description" content=")[^"]*(">)/, `$1${escape(o.short)}$2`);
  page = page.replace(/(<meta property="og:title" content=")[^"]*(">)/, `$1${escape(o.name)} · Lara &amp; Johanna$2`);
  page = page.replace(/(<meta property="og:description" content=")[^"]*(">)/, `$1${escape(o.short)}$2`);
  page = page.replace(/(<meta property="og:url" content=")[^"]*(">)/, `$1https://laraundjohanna.de/${o.key}$2`);
  page = page.replace(/(<link rel="canonical" href=")[^"]*(">)/, `$1https://laraundjohanna.de/${o.key}$2`);
  page = page.replace(/href="#(galerie|angebote|ueber-uns)"/g, 'href="/#$1"');
  page = page.replace(/(<a class="wordmark" href=")#top/, '$1/');
  page = page.replace(/<!-- Galerie-Lightbox -->[\s\S]*?<\/dialog>\s*/, '');
  write(`${o.key}.html`, page);
}
const urls = ['', 'impressum', 'datenschutz', ...offers.map(o => o.key)];
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(path => `  <url><loc>https://laraundjohanna.de/${path}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log(`Generated ${offers.length} service pages, ${tabs.reduce((n,t) => n + t.qa.length, 0)} unchanged FAQ, homepage links and sitemap.`);
