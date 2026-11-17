# laraundjohanna Website

Website der laraundjohanna GbR, Kreativstudio aus Hamburg.
Reines HTML, CSS und JavaScript, ohne Build-Schritt und ohne Abhängigkeiten.

Live: https://laraundjohanna.de
Hosting: Cloudflare Pages, Projekt `laraundjohanna-website`.

## Dateien

```
index.html          Startseite (alle Abschnitte)
impressum.html      Impressum
datenschutz.html    Datenschutzerklärung
css/style.css       Gestaltung inkl. Tag- und Nachtmodus
css/booking.css     Fenster für die Terminbuchung
js/data.js          INHALTE: Angebote, Pakete, Preise, Fragen & Antworten
js/main.js          Interaktion (Tag/Nacht, Menü, Galerie, Popups, Kontaktformular, FAQ)
js/booking.js       Cal.com-Terminbuchung im Fenster (Erstgespräch)
assets/img/         Galerie- und Teamfotos
assets/fonts/       Schriften Anton, Instrument Serif, Space Grotesk (lokal, Lizenzen in LICENSES.txt)
assets/favicon.svg  Sonnen-Symbol als Favicon
```

## Inhalte ändern

- **Preise, Pakete, Angebote, FAQ:** nur `js/data.js` bearbeiten. Kacheln, Popups,
  Footer-Liste und FAQ-Tabs werden daraus automatisch erzeugt. Welche Felder es gibt,
  steht oben in der Datei.
- **Texte der Abschnitte (Hero, Über uns, Kontakt …):** direkt in `index.html`.
- **Galerie-Bilder:** Datei nach `assets/img/` legen und in `index.html` im Abschnitt
  `id="galerie"` eintragen. Bilder mit `tile--preview` erscheinen mobil in der Vorschau.
- **Texte ohne Gedankenstriche schreiben.**

## Terminbuchung

Alle Links mit `data-booking` öffnen die Buchungsseite
`https://cal.com/laraundjohanna/erstgespraech` in einem Fenster (`js/booking.js`).
Cal.com wird erst geladen, wenn jemand das Fenster öffnet. Ohne JavaScript führt der
Link direkt zu Cal.com.

## Kontaktformular

„Paket anfragen“, „Bestandsaufnahme anfragen“, „Kickoff anfragen“ und „Nachricht schreiben“
öffnen das Kontakt-Popup. „Worum geht es?“ ist dabei passend vorausgefüllt.

„Nachricht senden“ überträgt die Eingaben per HTTPS direkt an Form.taxi
(`https://form.taxi/s/46vfhlsv`). Der Empfänger ist im Form.taxi-Konto fest auf
`hallo@laraundjohanna.de` eingestellt. Keine SMTP-Zugangsdaten oder Verwaltungs-API-Keys
sind im Website-Code erforderlich. Die Sendeadresse ist für die öffentliche Einbindung gedacht.

Der kostenlose Free-Tarif umfasst aktuell 40 Sendungen pro Monat. Weitere Sendungen
werden laut Anbieter gespeichert, ihre Inhalte sind erst nach einem Upgrade einsehbar.
Keine automatische kostenpflichtige Umstellung einrichten. Auslastung regelmäßig im
Form.taxi-Panel prüfen. Domainfreigabe und Spamfilter sind aktiviert; das Formular
verwendet zusätzlich das Honeypot-Feld `_gotcha`. Spamordner im Panel beachten.

Erst HTTP-Erfolg plus `success: true` lösen die Bestätigung aus. Während des Sendens
werden erneute Klicks verhindert. Bei Fehler oder nach 25 Sekunden ohne Bestätigung
bleiben die Eingaben erhalten; es gibt keine automatische Wiederholung. Ein Timeout
kann auch auftreten, wenn die Anfrage bereits angenommen wurde, daher vor einem
neuen Versuch kurz warten. Auf Erfolg wird kein automatischer E-Mail-Eingang beim
Besucher versprochen. Direktantworten auf die Benachrichtigung gehen an das `email`-Feld.

## Tastatur und Cache

Kontakt, Pakete und Galerie verwenden native modale `dialog`-Elemente. Escape schließt
nur das oberste Fenster; der Fokus kehrt zum Auslöser zurück. Die FAQ-Tabs unterstützen
Pfeiltasten, Home und End. Der Skip-Link fokussiert den vollständigen Hauptinhalt.

Bei weiteren Änderungen an CSS oder JavaScript die Versionskennung an den entsprechenden
Dateiverweisen in allen HTML-Seiten aktualisieren, damit alte Browser-Caches nicht
unterschiedliche Versionen kombinieren.

## Offen

- [ ] Vertragsgrundlagen für den geschäftlich genutzten kostenlosen Google Kalender/Meet prüfen. Eine Datenschutzerklärung ersetzt keine erforderliche Auftragsverarbeitungsvereinbarung.

LinkedIn und Instagram sind mit den bestätigten Studio-Profilen verlinkt. Laut Auskunft
der Gesellschafterinnen vom 17. November 2026 gibt es noch keine Umsatzsteuer-ID,
Wirtschafts-ID oder Eintragung im Gesellschaftsregister. Bei Erteilung nachtragen;
keine persönliche Steuer-ID oder gewöhnliche Steuernummer veröffentlichen.

## Lokal ansehen

```sh
python3 -m http.server 8080
```

## Automatische Veröffentlichung

Cloudflare Pages ist direkt mit diesem GitHub-Repository verbunden. Jeder Push bzw. Merge
auf `main` startet automatisch eine neue Produktionsveröffentlichung. Nach einem
erfolgreichen Deployment sind die Änderungen auf https://laraundjohanna.de live.

- Produktionsbranch: `main`
- Framework: None (statisches HTML)
- Build-Befehl: `exit 0`
- Ausgabeverzeichnis: `.` (Repository-Stamm)
- Pages-Adresse: https://laraundjohanna-website.pages.dev

Änderungen lassen sich über Branch und Pull Request vorbereiten. Der Merge auf `main`
veröffentlicht sie automatisch. Den Status zeigen Cloudflare unter **Deployments** und die
GitHub-Commit-Checks.

Bestehende Domain- und IONOS-E-Mail-Einstellungen beibehalten.

## Pflege

Rechtstexte anpassen, wenn sich Anbieterangaben, Hosting oder eingesetzte Dienste ändern
(z. B. beim Anschluss eines Formular-Dienstes). Noch zu prüfen sind gegebenenfalls bereits
erteilte Umsatzsteuer-/Wirtschafts-Identifikationsnummern und Registerangaben sowie die
bestehenden Auftragsverarbeitungsvereinbarungen. Keine Zugangsdaten, Vertragsunterlagen
oder internen Projektdateien hochladen.
