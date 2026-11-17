/* Lara & Johanna: Interaktion: Tag/Nacht, Menü, Galerie, Angebote-Popup, FAQ-Tabs */
(function () {
  'use strict';

  var D = window.LJ_DATA;
  var site = document.getElementById('site');
  var body = document.body;
  var $ = function (id) { return document.getElementById(id); };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  var ARROW = '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M3 9h11M10 4l5 5-5 5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
  var PLUS = '<svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><path d="M11 3v16M3 11h16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"></path></svg>';

  /* ---------- Tag / Nacht ---------- */
  var modeBtn = $('mode-btn');
  function setNight(night, save) {
    site.classList.toggle('theme-nacht', night);
    site.classList.toggle('theme-tag', !night);
    body.classList.toggle('is-nacht', night);
    modeBtn.setAttribute('aria-pressed', night ? 'true' : 'false');
    modeBtn.querySelector('.mode__label').textContent = night ? 'Tag' : 'Nacht';
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', night ? '#25252D' : '#FFFFFF');
  }
  setNight(site.classList.contains('theme-nacht'), false);
  // Der neue Modus breitet sich als Kreis von der angetippten Sonne (oder dem Button) aus.
  // Browser ohne View Transitions bekommen einen sanften Farbübergang.
  var WECHSEL_MS = 1000;
  var switchTimer = null;
  var wechselUrsprung = null;
  function mitteVon(elm) {
    var r = elm.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }
  function wechsleModus(ursprung) {
    var night = !site.classList.contains('theme-nacht');
    var o = ursprung || mitteVon(modeBtn);
    var ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var html = document.documentElement;
    if (document.startViewTransition && !ruhig) {
      html.classList.add('vt-wechsel');
      var vt = document.startViewTransition(function () { setNight(night, true); });
      vt.ready.then(function () {
        var r = Math.hypot(Math.max(o.x, window.innerWidth - o.x), Math.max(o.y, window.innerHeight - o.y));
        html.animate(
          { clipPath: ['circle(0px at ' + o.x + 'px ' + o.y + 'px)', 'circle(' + r + 'px at ' + o.x + 'px ' + o.y + 'px)'] },
          { duration: WECHSEL_MS, easing: 'cubic-bezier(.65,0,.35,1)', pseudoElement: '::view-transition-new(root)' }
        );
      }).catch(function () {});
      var aufraeumen = function () { html.classList.remove('vt-wechsel'); };
      vt.finished.then(aufraeumen, aufraeumen);
      return;
    }
    site.classList.add('is-switching');
    clearTimeout(switchTimer);
    switchTimer = setTimeout(function () { site.classList.remove('is-switching'); }, 900);
    setNight(night, true);
  }
  modeBtn.addEventListener('click', function () {
    var o = wechselUrsprung;
    wechselUrsprung = null;
    wechsleModus(o);
  });
  function wechselVon(elm) {
    wechselUrsprung = mitteVon(elm);
    modeBtn.click();
  }

  // Jede Sonne/jeder Mond (Logo oben, Erstgespräch, Kontakt, Fußzeile) wechselt Tag und Nacht.
  // Abfangen in der Capture-Phase, damit der Klick nicht zusätzlich den Link oder die Kachel auslöst.
  document.addEventListener('click', function (e) {
    var coin = e.target.closest && e.target.closest('.coin');
    if (!coin) return;
    e.preventDefault();
    e.stopPropagation();
    wechselVon(coin);
  }, true);

  // Sonne im Hero antippen = Tag/Nacht wechseln (wie der Button in der Navigation)
  var sonne = $('sonne');
  if (sonne) {
    sonne.addEventListener('click', function () { wechselVon(sonne); });
    sonne.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); wechselVon(sonne); }
    });
  }

  /* ---------- Mobiles Menü ---------- */
  var menuBtn = $('menu-btn');
  var nav = $('hauptnav');
  function syncScrollLock() {
    body.classList.toggle('no-scroll', !!document.querySelector('dialog[open]') || nav.classList.contains('is-open'));
  }
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.querySelector('.menu-btn__label').textContent = open ? 'Schließen' : 'Menü';
    syncScrollLock();
    body.classList.toggle('menu-open', open);
  }
  menuBtn.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  window.addEventListener('resize', function () { if (window.innerWidth > 900 && nav.classList.contains('is-open')) setMenu(false); });

  /* ---------- Galerie: mobil aufklappen + Lightbox ---------- */
  var gal = $('gal');
  // Mobil: Endlos-Karussell. Vor und hinter die echten Bilder kommt je eine Kopie aller Bilder.
  // Landet man nach dem Wischen in einer Kopie, springt das Karussell unsichtbar zum passenden echten Bild.
  var galTiles = Array.prototype.slice.call(gal.querySelectorAll('.tile'));
  var galN = galTiles.length;
  var galKarussell = window.matchMedia('(max-width: 900px)');
  var galKlone = [];
  function galSlides() { return gal.querySelectorAll('.tile'); }
  function galSchritt() {
    var s = galSlides();
    return s.length > 1 ? s[1].offsetLeft - s[0].offsetLeft : gal.clientWidth;
  }
  function galIndex() { return Math.round(gal.scrollLeft / (galSchritt() || 1)); }
  function galSpringe(i) { gal.scrollTo({ left: i * galSchritt(), behavior: 'instant' }); }
  function galKlon(tile) {
    var k = tile.cloneNode(true);
    k.classList.add('is-klon');
    k.setAttribute('aria-hidden', 'true');
    k.removeAttribute('tabindex');
    k.removeAttribute('role');
    k.removeAttribute('aria-label');
    var img = k.querySelector('img');
    if (img) img.loading = 'lazy';
    galKlone.push(k);
    return k;
  }
  function galEndlosAn() {
    if (galKlone.length || galN < 2) return;
    var vorne = document.createDocumentFragment();
    galTiles.forEach(function (t) { vorne.appendChild(galKlon(t)); });
    gal.insertBefore(vorne, gal.firstChild);
    galTiles.forEach(function (t) { gal.appendChild(galKlon(t)); });
    galSpringe(galN);
  }
  function galEndlosAus() {
    galKlone.forEach(function (k) { k.remove(); });
    galKlone = [];
    gal.scrollLeft = 0;
  }
  function galZurechtruecken() {
    if (!galKlone.length) return;
    var i = galIndex();
    if (i < galN) galSpringe(i + galN);
    else if (i >= 2 * galN) galSpringe(i - galN);
  }
  function galModusKarussell() { if (galKarussell.matches) galEndlosAn(); else galEndlosAus(); }
  galModusKarussell();
  if (galKarussell.addEventListener) galKarussell.addEventListener('change', galModusKarussell);
  window.addEventListener('resize', function () { if (galKlone.length) galSpringe(galIndex()); });

  // Ende des Wischens erkennen: scrollend, wo vorhanden, sonst kurze Pause im Scrollen
  var galRuhe = null;
  if ('onscrollend' in window) gal.addEventListener('scrollend', galZurechtruecken);
  else gal.addEventListener('scroll', function () { clearTimeout(galRuhe); galRuhe = setTimeout(galZurechtruecken, 140); }, { passive: true });

  // Kleine Pfeile neben dem Bild blättern ein Bild weiter, ohne Anfang und Ende
  $('gal-zurueck').addEventListener('click', function () { gal.scrollBy({ left: -galSchritt(), behavior: 'smooth' }); });
  $('gal-weiter').addEventListener('click', function () { gal.scrollBy({ left: galSchritt(), behavior: 'smooth' }); });

  var lb = $('lightbox');
  var lbImg = $('lightbox-img');
  var lbCap = $('lightbox-cap');
  var lastFocus = null;
  // Auf dem Handy ist die Galerie nur ein Karussell zum Wischen, ohne Detailansicht
  var galMobil = window.matchMedia('(max-width: 900px)');
  function galModus() {
    Array.prototype.forEach.call(gal.querySelectorAll('.tile'), function (tile) {
      var img = tile.querySelector('img');
      if (galMobil.matches) {
        tile.removeAttribute('tabindex');
        tile.removeAttribute('role');
        tile.removeAttribute('aria-label');
      } else {
        tile.setAttribute('tabindex', '0');
        tile.setAttribute('role', 'button');
        tile.setAttribute('aria-label', 'Bild vergrößern: ' + img.alt);
      }
    });
  }
  galModus();
  if (galMobil.addEventListener) galMobil.addEventListener('change', galModus);
  Array.prototype.forEach.call(gal.querySelectorAll('.tile'), function (tile) {
    var img = tile.querySelector('img');
    function open() {
      if (galMobil.matches) return;
      lastFocus = tile;
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = tile.querySelector('figcaption').textContent;
      lb.classList.add('is-open');
      lb.showModal();
      syncScrollLock();
      lb.querySelector('[data-close]').focus({ preventScroll: true });
    }
    tile.addEventListener('click', open);
    tile.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
  function closeLightbox() {
    if (!lb.classList.contains('is-open')) return;
    lb.classList.remove('is-open');
    lb.close();
    syncScrollLock();
    if (lastFocus) lastFocus.focus();
  }
  lb.addEventListener('click', function (e) { if (e.target === lb || e.target.closest('[data-close]')) closeLightbox(); });

  /* ---------- Angebote: Kacheln aus data.js ---------- */
  var kacheln = $('kacheln');
  var gespraech = kacheln.querySelector('.kachel--gespraech');
  var footerList = $('footer-leistungen');
  D.offers.forEach(function (o, i) {
    var k = el('article', 'kachel');
    k.setAttribute('data-offer', i);
    k.appendChild(el('h3', 'kachel__name', o.name));
    k.appendChild(el('p', 'kachel__short', o.short));
    var more = el('button', 'kachel__more');
    more.type = 'button';
    more.innerHTML = 'Pakete ansehen' + ARROW;
    more.setAttribute('aria-label', 'Pakete ansehen: ' + o.name);
    k.appendChild(more);
    k.addEventListener('click', function () { openPop(i, more); });
    // „Beratung & Einstieg“ hat keine eigene Kachel: die pinke Erstgesprächs-Kachel öffnet es
    if (o.key === 'beratung-und-einstieg') {
      var gMore = $('gespraech-more');
      gespraech.addEventListener('click', function () { openPop(i, gMore); });
    } else {
      kacheln.insertBefore(k, gespraech);
    }

    var li = el('li');
    var a = el('a', null, o.name);
    a.href = '#angebote';
    a.addEventListener('click', function (e) { e.preventDefault(); openPop(i, a); });
    li.appendChild(a);
    footerList.appendChild(li);
  });

  /* ---------- Zurück-Taste/Wischgeste schließt Popups ---------- */
  var histOffen = false, histIgnorieren = false;
  function histOpen() {
    if (histOffen) history.replaceState({ lj: 1 }, '');
    else { history.pushState({ lj: 1 }, ''); histOffen = true; }
  }
  function histClose() {
    if (!histOffen) return;
    histOffen = false;
    histIgnorieren = true;
    history.back();
  }
  window.addEventListener('popstate', function () {
    if (histIgnorieren) { histIgnorieren = false; return; }
    if (!histOffen) return;
    histOffen = false;
    closeKontakt(true);
    closePop(true);
  });

  /* ---------- Paket-Popup ---------- */
  var pop = $('pop');
  var popBox = $('pop-box');
  var popOpener = null;
  function tabIndexByKey(key) {
    for (var i = 0; i < D.tabs.length; i++) if (D.tabs[i].key === key) return i;
    return 0;
  }
  function openPop(i, opener) {
    var o = D.offers[i];
    popOpener = opener || null;
    $('pop-title').textContent = o.name;
    $('pop-note').textContent = o.note;
    $('pop-eyebrow').textContent = o.eyebrow || 'Pakete & Festpreise';
    var intro = $('pop-intro');
    intro.textContent = o.intro || '';
    intro.hidden = !o.intro;
    var cta = $('pop-cta');
    cta.hidden = !o.cta;
    if (o.cta) {
      cta.textContent = o.cta;
      cta.onclick = function (e) {
        e.preventDefault();
        var back = popOpener;
        closePop(false, true);
        openKontakt(o.name + ': ' + o.cta.replace(/ anfragen$/, ''), back);
      };
    }
    var grid = $('pop-grid');
    grid.innerHTML = '';
    grid.classList.toggle('pop__grid--themen', o.packages.every(function (p) { return !p.price; }));
    grid.classList.toggle('pop__grid--einzeln', o.packages.length === 1);
    o.packages.forEach(function (p) {
      var pk = el('div', p.price ? 'pk' : 'pk pk--thema');
      if (p.empfehlung) { pk.classList.add('pk--empfohlen'); pk.appendChild(el('span', 'pk__band', p.empfehlung)); }
      pk.appendChild(el('p', 'pk__name', p.name));
      if (p.sub) pk.appendChild(el('p', 'pk__sub', p.sub));
      var ul = el('ul');
      (p.items || []).forEach(function (it) { ul.appendChild(el('li', null, it)); });
      if (!p.price) {
        if (p.text) { pk.classList.add('pk--text'); pk.appendChild(el('p', 'pk__text', p.text)); }
        if (p.items) pk.appendChild(ul);
        grid.appendChild(pk);
        return;
      }
      var preis = el('div', 'pk__preis', p.price);
      preis.appendChild(el('small', null, p.small));
      pk.appendChild(preis);
      if (p.text) pk.appendChild(el('p', 'pk__text', p.text));
      if (p.items) pk.appendChild(ul);
      if (p.hinweis) pk.appendChild(el('p', 'pk__hinweis', p.hinweis));
      var btn = el('a', 'btn btn--pink btn--klein');
      btn.href = '#kontakt';
      btn.textContent = p.button || 'Paket anfragen';
      if (p.buchung) {
        // Öffnet die Cal.com-Terminbuchung (js/booking.js) statt des Kontaktformulars
        btn.href = p.buchung;
        btn.setAttribute('data-booking', '');
        btn.target = '_blank';
        btn.rel = 'noopener noreferrer';
        btn.setAttribute('aria-haspopup', 'dialog');
      } else btn.addEventListener('click', function (e) {
        e.preventDefault();
        var back = popOpener;
        closePop(false, true);
        openKontakt(p.anfrage || (o.name + ': ' + p.name + ' (' + p.price.replace('*', '') + ')'), back);
      });
      pk.appendChild(btn);
      grid.appendChild(pk);
    });
    // Nur ein Paket: Hinweistext steht als normaler Text neben der Karte statt klein im Fuß
    var einzeln = o.packages.length === 1;
    $('pop-note').hidden = einzeln;
    if (einzeln) grid.appendChild(el('p', 'pop__seite', o.note));
    var t = tabIndexByKey(o.key);
    var faq = $('pop-faq');
    faq.textContent = D.tabs[t].qa.length + ' Fragen & Antworten zu ' + o.name + ' →';
    faq.onclick = function (e) {
      e.preventDefault();
      selectTab(t);
      closePop();
      setTimeout(function () {
        document.getElementById('fragen').scrollIntoView({ behavior: 'smooth' });
        tabBtns[t].focus({ preventScroll: true });
      }, 60);
    };
    pop.showModal();
    histOpen();
    syncScrollLock();
    popBox.scrollTop = 0;
    popBox.focus({ preventScroll: true });
  }
  // vonVerlauf: durch Zurück-Taste ausgelöst; behalten: direkt danach öffnet ein anderes Popup
  function closePop(vonVerlauf, behalten) {
    if (!pop.open) return;
    pop.close();
    if (!vonVerlauf && !behalten) histClose();
    syncScrollLock();
    if (popOpener && document.contains(popOpener)) popOpener.focus({ preventScroll: true });
  }
  pop.addEventListener('click', function (e) { if (e.target === pop || e.target.closest('[data-close]')) closePop(); });

  /* ---------- Fragen & Antworten ---------- */
  var tabsEl = $('tabs');
  var qaEl = $('qa');
  var tabBtns = D.tabs.map(function (t, i) {
    var b = el('button', 'btn btn--klein tab', t.name);
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.id = 'tab-' + t.key;
    b.addEventListener('click', function () {
      selectTab(i);
      // Mobil: nach dem Antippen eines Themas direkt zu den passenden Fragen scrollen
      if (window.matchMedia('(max-width: 900px)').matches) {
        var ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var ziel = qaEl.getBoundingClientRect().top + window.pageYOffset - 16;
        window.scrollTo({ top: ziel, behavior: ruhig ? 'auto' : 'smooth' });
      }
    });
    tabsEl.appendChild(b);
    return b;
  });
  function selectTab(i) {
    tabBtns.forEach(function (b, j) {
      b.setAttribute('aria-selected', i === j ? 'true' : 'false');
      b.tabIndex = i === j ? 0 : -1;
    });
    qaEl.setAttribute('aria-labelledby', tabBtns[i].id);
    qaEl.innerHTML = '';
    D.tabs[i].qa.forEach(function (q) {
      var d = el('details');
      var s = el('summary', null, q.q);
      s.insertAdjacentHTML('beforeend', PLUS);
      d.appendChild(s);
      d.appendChild(el('p', null, q.a));
      qaEl.appendChild(d);
    });
  }
  tabsEl.addEventListener('keydown', function (e) {
    var cur = tabBtns.indexOf(document.activeElement);
    if (cur < 0) return;
    var next = e.key === 'ArrowRight' ? cur + 1 : e.key === 'ArrowLeft' ? cur - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? tabBtns.length - 1 : null;
    if (next === null) return;
    e.preventDefault();
    next = (next + tabBtns.length) % tabBtns.length;
    selectTab(next);
    tabBtns[next].focus();
  });
  selectTab(0);

  /* ---------- Kontakt-Popup mit Formular ---------- */
  var kpop = $('kpop');
  var kbox = kpop.querySelector('.pop__box');
  var kform = $('kform');
  var kSelect = $('kform-anliegen');
  var kFehler = $('kform-fehler');
  var kDanke = $('kform-danke');
  var kOpener = null;
  var kSending = false;
  var STANDARD = ['Allgemeine Anfrage'].concat(D.offers.map(function (o) { return o.name; }), ['Individuelles Angebot', 'Etwas anderes']);
  function fillSelect(extra) {
    kSelect.innerHTML = '';
    var list = extra && STANDARD.indexOf(extra) < 0 ? [extra].concat(STANDARD) : STANDARD;
    list.forEach(function (v) { var op = el('option', null, v); op.value = v; kSelect.appendChild(op); });
    kSelect.value = extra || STANDARD[0];
  }
  function openKontakt(anliegen, opener) {
    kOpener = opener || null;
    if (!kDanke.hidden) kform.reset();
    kform.hidden = false;
    kDanke.hidden = true;
    kform.classList.remove('is-checked');
    kFehler.hidden = true;
    if (!kSending) fillSelect(anliegen);
    kpop.showModal();
    histOpen();
    syncScrollLock();
    kbox.scrollTop = 0;
    var first = kform.querySelector('input[name=name]');
    if (!kSending && window.matchMedia('(pointer: fine)').matches) first.focus({ preventScroll: true }); else kbox.focus({ preventScroll: true });
  }
  function closeKontakt(vonVerlauf) {
    if (!kpop.open) return;
    kpop.close();
    if (!vonVerlauf) histClose();
    syncScrollLock();
    if (kOpener && document.contains(kOpener)) kOpener.focus({ preventScroll: true });
  }
  kpop.addEventListener('click', function (e) { if (e.target === kpop || e.target.closest('[data-close]')) closeKontakt(); });
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-kontakt]');
    if (!a) return;
    e.preventDefault();
    if (nav.classList.contains('is-open')) setMenu(false);
    openKontakt(a.getAttribute('data-kontakt'), a);
  });

  var kFields = $('kform-felder');
  var kStatus = $('kform-sendestatus');
  var kSubmit = kform.querySelector('[type=submit]');
  var kSubmitLabel = kSubmit.innerHTML;
  kform.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (kSending) return;
    ['name', 'email', 'nachricht'].forEach(function (name) {
      var input = kform.elements.namedItem(name);
      input.value = input.value.trim();
    });
    kform.classList.add('is-checked');
    if (!kform.checkValidity()) {
      kFehler.textContent = 'Bitte füllt alle Pflichtfelder aus und gebt eine gültige E-Mail-Adresse an.';
      kFehler.hidden = false;
      var bad = kform.querySelector('input:invalid, textarea:invalid, select:invalid');
      if (bad) bad.focus();
      return;
    }
    kFehler.hidden = true;
    kStatus.textContent = 'Eure Nachricht wird gesendet …';
    var payload = new FormData(kform);
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, 25000);
    kSending = true;
    kFields.disabled = true;
    kSubmit.disabled = true;
    kSubmit.textContent = 'Wird gesendet …';
    kform.setAttribute('aria-busy', 'true');
    try {
      var response = await fetch(kform.action, {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' },
        signal: controller.signal,
        credentials: 'omit'
      });
      var result = await response.json();
      if (!response.ok || result.success !== true) throw new Error('not-confirmed');
      kform.hidden = true;
      kDanke.hidden = false;
      if (kpop.open) $('kform-erfolg-titel').focus();
    } catch (error) {
      kFehler.textContent = 'Wir konnten keine Sendebestätigung empfangen. Eure Eingaben bleiben erhalten. Bitte wartet kurz, bevor ihr es erneut versucht, oder schreibt direkt an hallo@laraundjohanna.de.';
      kFehler.hidden = false;
      if (kpop.open) kFehler.focus();
    } finally {
      clearTimeout(timer);
      kSending = false;
      kFields.disabled = false;
      kSubmit.disabled = false;
      kSubmit.innerHTML = kSubmitLabel;
      kform.removeAttribute('aria-busy');
      kStatus.textContent = '';
    }
  });

  /* Native modale Dialoge halten den Fokus im obersten Fenster. */
  [[pop, closePop], [kpop, closeKontakt], [lb, closeLightbox]].forEach(function (entry) {
    entry[0].addEventListener('cancel', function (e) { e.preventDefault(); entry[1](); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !document.querySelector('dialog[open]') && nav.classList.contains('is-open')) {
      setMenu(false);
      menuBtn.focus();
    }
  });

  var jahr = $('jahr');
  if (jahr) jahr.textContent = new Date().getFullYear();
})();
