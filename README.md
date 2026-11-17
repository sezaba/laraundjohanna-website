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

Solange in `index.html` beim Formular `id="kform"` das Attribut `data-endpoint` leer ist,
öffnet das Absenden das E-Mail-Programm mit der fertigen Nachricht an `data-mail`.
Für den Versand direkt von der Website einen Formular-Dienst (z. B. Formspree) anlegen,
dessen Adresse in `data-endpoint` eintragen und den Dienst in der Datenschutzerklärung nennen.

## Offen

- [ ] LinkedIn- und Instagram-Links im Footer eintragen (aktuell `#`)
- [ ] Optional: Kontaktformular an einen Formular-Dienst anschließen (siehe oben)

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
