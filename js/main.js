/* Lara & Johanna: Interaktion: Tag/Nacht, Menü, Galerie, Leistungsseiten, FAQ-Tabs */
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
  // Münzwurf: der Drehwinkel wächst bei jedem Wechsel um 540° (1,5 Umdrehungen).
  // So zeigt die Münze unterwegs Sonne, Mond, Sonne, Mond und landet auf der richtigen Seite.
  var muenzWinkel = site.classList.contains('theme-nacht') ? 180 : 0;
  var setNightOhneMuenze = setNight;
  setNight = function (night, save) {
    setNightOhneMuenze(night, save);
    if (save) {
      // mindestens anderthalb Umdrehungen weiter, Endstellung immer passend zum Modus:
      // Tag = Vielfaches von 360°, Nacht = 180° darüber
      var ziel = muenzWinkel + 540;
      var zeigtMond = Math.round(ziel / 180) % 2 === 1;
      if (zeigtMond !== night) ziel += 180;
      muenzWinkel = ziel;
      site.style.setProperty('--coin-rot', muenzWinkel + 'deg');
      // Modus merken, damit Unterseiten, 404 und Ladeanimation ihn beim nächsten Aufruf übernehmen
      try { localStorage.setItem('lj-modus', night ? 'nacht' : 'tag'); } catch (e) {}
    }
  };
  function wechsleModus(ursprung) {
    var night = !site.classList.contains('theme-nacht');
    var o = ursprung || mitteVon(modeBtn);
    var ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var html = document.documentElement;
    if (document.startViewTransition && !ruhig) {
      html.classList.add('vt-wechsel');
      // Den Ziel-Modus erst beim tatsächlichen Umschalten bestimmen, damit schnelle Doppelklicks sauber zählen
      var vt = document.startViewTransition(function () { setNight(!site.classList.contains('theme-nacht'), true); });
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
    if (!coin || coin.classList.contains('loader__coin')) return;
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

  var closeGallery = function () {};
  var lb = $('lightbox');
  if ($('gal')) {
  /* ---------- Galerie: mobil aufklappen + Lightbox ---------- */
  var gal = $('gal');
  // Bei jedem Laden neu gemischt (Fisher-Yates), damit die Galerie jedes Mal anders aussieht
  (function () {
    var t = Array.prototype.slice.call(gal.querySelectorAll('.tile'));
    for (var i = t.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var x = t[i]; t[i] = t[j]; t[j] = x;
    }
    t.forEach(function (tile) { gal.appendChild(tile); });
  })();
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
      lbImg.src = img.getAttribute('data-full-src') || img.currentSrc || img.src;
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

  closeGallery = closeLightbox;

  /* Desktop: nur ein festes Raster ist sichtbar (CSS). Alle paar Sekunden dreht sich ein Feld um
     wie eine Karte und zeigt danach ein gerade unsichtbares Bild. Dafür tauschen ein sichtbares und ein verstecktes Feld ihren Inhalt,
     so bleiben alle Bilder im Dokument (fürs Karussell auf dem Handy und die Detailansicht). */
  var WECHSEL_ALLE_MS = 3800;
  var DREH_MS = 380; // je Hälfte der Drehung
  var galZuletzt = null;
  var galUeber = false;
  var galImBild = true;
  var galBeschaeftigt = false;
  var ATTRIBUTE = ['src', 'srcset', 'sizes', 'width', 'height', 'alt', 'data-full-src'];
  gal.addEventListener('mouseenter', function () { galUeber = true; });
  gal.addEventListener('mouseleave', function () { galUeber = false; });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { galImBild = e[0].isIntersecting; }).observe(gal);
  }
  function galSichtbar(tile) { return tile.offsetParent !== null; }
  function galTausche(a, b) {
    var ia = a.querySelector('img'), ib = b.querySelector('img');
    ATTRIBUTE.forEach(function (n) {
      var va = ia.getAttribute(n), vb = ib.getAttribute(n);
      if (vb == null) ia.removeAttribute(n); else ia.setAttribute(n, vb);
      if (va == null) ib.removeAttribute(n); else ib.setAttribute(n, va);
    });
    var ca = a.querySelector('figcaption span'), cb = b.querySelector('figcaption span');
    var t = ca.textContent; ca.textContent = cb.textContent; cb.textContent = t;
    if (a.hasAttribute('aria-label')) a.setAttribute('aria-label', 'Bild vergrößern: ' + ia.alt);
    if (b.hasAttribute('aria-label')) b.setAttribute('aria-label', 'Bild vergrößern: ' + ib.alt);
  }
  // Neues Bild vorab laden, damit die Kachel nach der halben Drehung nicht leer ist (spätestens nach 3 s weiter)
  function galVorladen(img, fertig) {
    var v = new Image(), los = false;
    function weiter() { if (!los) { los = true; fertig(); } }
    v.onload = v.onerror = weiter;
    if (img.getAttribute('sizes')) v.sizes = img.getAttribute('sizes');
    if (img.getAttribute('srcset')) v.srcset = img.getAttribute('srcset');
    v.src = img.getAttribute('src');
    if (v.complete) weiter();
    setTimeout(weiter, 3000);
  }
  function galWechsel() {
    if (galBeschaeftigt || galUeber || !galImBild || document.hidden || galMobil.matches || lb.classList.contains('is-open')) return;
    var alle = Array.prototype.slice.call(gal.querySelectorAll('.tile:not(.is-klon)'));
    var sichtbar = alle.filter(function (t) { return galSichtbar(t) && t !== galZuletzt && t !== document.activeElement; });
    var versteckt = alle.filter(function (t) { return !galSichtbar(t); });
    if (!sichtbar.length || !versteckt.length) return;
    var feld = sichtbar[Math.floor(Math.random() * sichtbar.length)];
    var neu = versteckt[Math.floor(Math.random() * versteckt.length)];
    galBeschaeftigt = true;
    galZuletzt = feld;
    galVorladen(neu.querySelector('img'), function () {
      if (!feld.animate) { galTausche(feld, neu); galBeschaeftigt = false; return; }
      // Erste Hälfte: Kachel klappt weg, bis sie hochkant steht. Dann Motiv tauschen,
      // zweite Hälfte: von der anderen Seite zurück in die Fläche.
      var weg = feld.animate(
        [{ transform: 'perspective(1100px) rotateY(0deg)' }, { transform: 'perspective(1100px) rotateY(90deg)' }],
        { duration: DREH_MS, easing: 'cubic-bezier(.55,0,.85,.35)', fill: 'forwards' }
      );
      weg.onfinish = function () {
        feld.querySelector('img').loading = 'eager';
        galTausche(feld, neu);
        var zurueck = feld.animate(
          [{ transform: 'perspective(1100px) rotateY(-90deg)' }, { transform: 'perspective(1100px) rotateY(0deg)' }],
          { duration: DREH_MS, easing: 'cubic-bezier(.15,.65,.45,1)' }
        );
        weg.cancel();
        zurueck.onfinish = zurueck.oncancel = function () { galBeschaeftigt = false; };
      };
    });
  }
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setInterval(galWechsel, WECHSEL_ALLE_MS);
  }

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
  });

  /* ---------- Fragen & Antworten ---------- */
  var tabsEl = $('tabs');
  if (tabsEl) {
  var qaEl = $('qa');
  var tabBtns = D.tabs.map(function (t, i) {
    var b = el('button', 'btn btn--klein tab', t.name);
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.id = 'tab-' + t.key;
    b.setAttribute('aria-controls', 'qa-' + t.key);
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
    D.tabs.forEach(function (t, j) {
      var panel = $('qa-' + t.key);
      panel.hidden = i !== j;
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
  }

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
  [[kpop, closeKontakt], [lb, closeGallery]].forEach(function (entry) {
    if (!entry[0]) return;
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
