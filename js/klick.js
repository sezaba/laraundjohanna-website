/* Klick-Sound für Buttons: zufällig einer von zwei kurzen Klicks.
   Die Sounds werden beim Laden geholt; der Audio-Kontext startet erst beim ersten Tippen,
   weil Browser Ton nur nach einer Nutzeraktion erlauben. */
(function () {
  'use strict';

  var DATEIEN = ['assets/sounds/klick-1.wav', 'assets/sounds/klick-2.wav'];
  var LAUTSTAERKE = 0.5;
  var ZIELE = 'button, .btn, .kachel, [role="button"], [role="tab"]';

  var AC = window.AudioContext || window.webkitAudioContext;
  if (!AC || !window.fetch) return;

  var rohdaten = DATEIEN.map(function (url) {
    return fetch(url).then(function (r) { return r.ok ? r.arrayBuffer() : null; }).catch(function () { return null; });
  });
  var ctx = null;
  var puffer = null;
  var gain = null;

  function vorbereiten() {
    if (ctx) return;
    ctx = new AC();
    gain = ctx.createGain();
    gain.gain.value = LAUTSTAERKE;
    gain.connect(ctx.destination);
    puffer = Promise.all(rohdaten).then(function (liste) {
      return Promise.all(liste.map(function (ab) {
        if (!ab) return null;
        return new Promise(function (ok) { ctx.decodeAudioData(ab.slice(0), ok, function () { ok(null); }); });
      }));
    });
  }

  function abspielen() {
    puffer.then(function (liste) {
      var nutzbar = liste.filter(Boolean);
      if (!nutzbar.length) return;
      var quelle = ctx.createBufferSource();
      quelle.buffer = nutzbar[Math.floor(Math.random() * nutzbar.length)];
      quelle.connect(gain);
      quelle.start();
    });
  }

  document.addEventListener('pointerdown', function (e) {
    if (e.button !== 0) return;
    var ziel = e.target.closest(ZIELE);
    if (!ziel || ziel.disabled || ziel.getAttribute('aria-disabled') === 'true') return;
    vorbereiten();
    if (ctx.state === 'suspended') ctx.resume();
    abspielen();
  }, { passive: true });
})();
