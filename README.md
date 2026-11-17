# laraundjohanna Website

Öffentliche Coming-soon-Website der laraundjohanna GbR.

Live: https://laraundjohanna.de
Hosting: Cloudflare Pages, bestehendes Projekt `lara-und-johanna`.

## Dateien

- `index.html`: animierte Tag-/Nacht-Startseite aus dem bestehenden Design-Export.
- `impressum.html` und `datenschutz.html`: Rechteseiten.
- `fonts.css`, `*.ttf`: lokal bereitgestellte Schriften Anton und Space Grotesk; Lizenzen in `OFL-*.txt`.
- `react.js`, `react-dom.js`, `support.js`: lokaler Darstellungsruntime des Design-Exports.
- `legal.css`: responsive Gestaltung der Rechteseiten.

## Lokal ansehen

```sh
python3 -m http.server 8080
```

## Veröffentlichung

Das bestehende Cloudflare-Pages-Projekt verwendet Direct Upload. Die Website-Dateien aus diesem Repository als ZIP (mit `index.html` direkt im ZIP-Stamm) über **Create deployment → Production** hochladen. Es ist kein Build erforderlich.

Das öffentliche GitHub-Repository ist keine automatische Deployment-Verbindung. Änderungen werden erst nach einem Cloudflare-Upload live. Bestehende Domain- und E-Mail-Einstellungen beibehalten.

## Pflege

Rechtstexte anpassen, wenn sich Anbieterangaben, Hosting oder eingesetzte Dienste ändern. Noch zu prüfen sind gegebenenfalls bereits erteilte Umsatzsteuer-/Wirtschafts-Identifikationsnummern und Registerangaben sowie die bestehenden Auftragsverarbeitungsvereinbarungen. Keine Zugangsdaten, Vertragsunterlagen oder internen Projektdateien hochladen.
