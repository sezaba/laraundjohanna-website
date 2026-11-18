"""Verify the agreed copy remains verbatim when moving dialogs into pages."""
import json
import re
import subprocess
from html.parser import HTMLParser
from pathlib import Path

root = Path(__file__).resolve().parent.parent
source = subprocess.check_output(['git', 'show', '1563b70:js/data.js'], cwd=root)
assert (root / 'js/data.js').read_bytes() == source, 'The agreed content source changed'
data = json.loads(subprocess.check_output(['node', '-e', '''
const fs=require('fs'),vm=require('vm'),c={window:{}};
vm.runInNewContext(fs.readFileSync('js/data.js','utf8'),c);
console.log(JSON.stringify(c.window.LJ_DATA));
'''], cwd=root))

class Content(HTMLParser):
    def __init__(self):
        super().__init__()
        self.packages, self.faq, self.texts = [], [], []
        self.card = self.question = None
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'article' and 'pk' in attrs.get('class', '').split():
            self.card = []
        if tag == 'details':
            self.question = []
    def handle_data(self, text):
        if not text.strip():
            return
        self.texts.append(text.strip())
        if self.card is not None:
            self.card.append(text)
        if self.question is not None:
            self.question.append(text)
    def handle_endtag(self, tag):
        if tag == 'article' and self.card is not None:
            self.packages.append(self.card)
            self.card = None
        if tag == 'details' and self.question is not None:
            self.faq.append(self.question)
            self.question = None

home = (root / 'index.html').read_text()
old_home = subprocess.check_output(['git', 'show', '1563b70:index.html'], cwd=root, text=True)
for section in ['galerie', 'ueber-uns', 'kontakt']:
    pattern = rf'<section\b[^>]*\bid="{section}"[^>]*>[\s\S]*?</section>'
    assert re.search(pattern, old_home)[0] == re.search(pattern, home)[0], section
dialog = r'<dialog class="pop pop--kontakt"[\s\S]*?</dialog>'
assert re.search(dialog, old_home)[0] == re.search(dialog, home)[0], 'Contact form changed'

for offer in data['offers']:
    parser = Content()
    html = (root / (offer['key'] + '.html')).read_text()
    parser.feed(html)
    expected = []
    for package in offer['packages']:
        fields = []
        for key in ['empfehlung', 'name', 'sub', 'price', 'small', 'text']:
            if package.get(key):
                fields.append(package[key])
        fields.extend(package.get('items', []))
        if package.get('price') and package.get('hinweis'):
            fields.append(package['hinweis'])
        if package.get('price'):
            fields.append(package.get('button', 'Paket anfragen'))
        expected.append(fields)
    assert parser.packages == expected, f"Package copy differs: {offer['key']}"
    tab = next(t for t in data['tabs'] if t['key'] == offer['key'])
    assert parser.faq == [[q['q'], q['a']] for q in tab['qa']], f"FAQ copy differs: {offer['key']}"
    for key in ['name', 'short', 'intro', 'note', 'cta']:
        if offer.get(key):
            assert offer[key] in parser.texts, f"Missing copy: {offer['key']}, {key}"
    assert html.count('<h1>') == 1
    assert f'<link rel="canonical" href="https://laraundjohanna.de/{offer["key"]}">' in html
    assert 'id="pop"' not in html
    assert f'href="/{offer["key"]}"' in home
    print(f"{offer['key']}: {len(expected)} packages and {len(tab['qa'])} FAQ copied verbatim")

home_parser = Content()
home_parser.feed(home)
assert home_parser.faq == [[q['q'], q['a']] for t in data['tabs'] for q in t['qa']]
print('All 60 homepage FAQ verbatim; existing homepage sections and contact form unchanged.')
