# Instagram-Feed

Am 24. November 2026 mit fünf echten Studio-Beiträgen lokal geprüft. Noch nicht veröffentlicht.

Der Bereich steht auf der Startseite direkt vor dem Footer. Er zeigt auf Desktop
die drei neuesten Beiträge von `@laraundjohanna` in einer Zeile. Unter 768 Pixeln
ist ausschließlich der zuletzt veröffentlichte Beitrag sichtbar. Weitere Beiträge
bleiben ausgeblendet; es gibt keine zweite Zeile. Die API liefert bis zu sechs
Beiträge, sodass nach einem Bildfehler ein nachfolgender Beitrag nachrücken kann.
Bei fehlender Verbindung oder einem Fehler bleibt ein Link zum echten Profil.
Es sind keine Beispielbeiträge eingebaut.

## Noch erforderlich

1. Erledigt: Instagram-Verbindung für **laraundjohanna** ist gespeichert. Profil
   und fünf Beiträge erfolgreich über die API geprüft. Lese- und Veröffentlichungsrechte
   wurden ausdrücklich freigegeben; der Feed verwendet nur lesende Abrufe.
2. Im Cloudflare-Pages-Projekt `laraundjohanna-website` als verschlüsselte Secrets
   `INSTAGRAM_ACCESS_TOKEN` und `INSTAGRAM_USER_ID` für das Studio-Konto hinterlegen.
   Token nicht in Dateien, Browser-Code, Git oder Chat kopieren.
3. Passend zum Login `INSTAGRAM_API_HOST` (`graph.facebook.com` oder
   `graph.instagram.com`) und `INSTAGRAM_API_VERSION` (Vorgabe `v27.0`) setzen.
   Lesezugriff reicht aus; der Feed benötigt keine Veröffentlichungsrechte.
4. Erledigt: Datenschutzhinweis beschreibt die Auslieferung über Cloudflare und
   die direkte Instagram-Verbindung erst beim Klick auf Profil- oder Beitragslinks.
5. Cloudflare Pages Functions für `functions/api/instagram.js` mit bereitstellen.
   Echten Feed, Bilder, Handyansicht und Fehlerfall prüfen, dann auf `main` veröffentlichen.

Der Server prüft den Instagram-Nutzernamen und weist andere Konten zurück.
Feed-Daten werden bis zu 15 Minuten zwischengespeichert, Bilder bis zu einer Stunde.
Eine neue Anfrage nach Cache-Ablauf aktualisiert die Beiträge automatisch.
Der Abruf beginnt erst in der Nähe des sichtbaren Bereichs. Es werden keine
Instagram-Skripte, Tracker oder fremden Cookies in den Browser eingebunden.
Tokens müssen vor ihrem Ablauf erneuert werden; ein Fehler zeigt den Profil-Link.

## Prüfen

`node tools/check-instagram.mjs` prüft simulierte API-Antworten inklusive falschem
Konto, fremden Bild-URLs, Cache, Bild-Proxy und Schutz der Zugangsdaten.
`node tools/preview-instagram.mjs` startet auf `http://127.0.0.1:8765/#instagram`
die Vorschau mit echten Beiträgen. Der lokale Adapter führt dieselbe Function aus
und liest die vorhandene Studio-Social-Verbindung ausschließlich in den Arbeitsspeicher.
Er ist nur lokal erreichbar. Keine Zugangsdaten in `.env` oder Website-Dateien ablegen.
