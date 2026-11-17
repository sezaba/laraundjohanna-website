# laraundjohanna Website

Öffentliche Coming-soon-Website der laraundjohanna GbR.

Live: https://laraundjohanna.de
Hosting: Cloudflare Pages, Projekt `laraundjohanna-website`.

## Dateien

- `index.html`: animierte Tag-/Nacht-Startseite aus dem bestehenden Design-Export.
- `impressum.html` und `datenschutz.html`: Rechteseiten.
- `fonts.css`, `*.ttf`: lokal bereitgestellte Schriften Anton und Space Grotesk; Lizenzen in `OFL-*.txt`.
- `react.js`, `react-dom.js`, `support.js`: lokaler Darstellungsruntime des Design-Exports.
- `Sonne.dc.html` und `Mond.dc.html`: Komponenten der Animation.
- `legal.css`: responsive Gestaltung der Rechteseiten.

## Lokal ansehen

```sh
python3 -m http.server 8080
```

## Automatische Veröffentlichung

Cloudflare Pages ist direkt mit diesem GitHub-Repository verbunden. Jeder Push bzw. Merge auf `main` startet automatisch eine neue Produktionsveröffentlichung. Nach einem erfolgreichen Deployment sind die Änderungen auf https://laraundjohanna.de live.

- Produktionsbranch: `main`
- Framework: None (statisches HTML)
- Build-Befehl: `exit 0`
- Ausgabeverzeichnis: `.` (Repository-Stamm)
- Pages-Adresse: https://laraundjohanna-website.pages.dev

Änderungen lassen sich über Branch und Pull Request vorbereiten. Der Merge auf `main` veröffentlicht sie automatisch. Den Status zeigen Cloudflare unter **Deployments** und die GitHub-Commit-Checks.

Manuelle ZIP-Uploads sind nicht mehr erforderlich. Das frühere Direct-Upload-Projekt `lara-und-johanna` ist nicht mehr der Veröffentlichungsweg. Bestehende Domain- und IONOS-E-Mail-Einstellungen beibehalten.

## Pflege

Rechtstexte anpassen, wenn sich Anbieterangaben, Hosting oder eingesetzte Dienste ändern. Noch zu prüfen sind gegebenenfalls bereits erteilte Umsatzsteuer-/Wirtschafts-Identifikationsnummern und Registerangaben sowie die bestehenden Auftragsverarbeitungsvereinbarungen. Keine Zugangsdaten, Vertragsunterlagen oder internen Projektdateien hochladen.
