# Instagram-Feed

Vorbereitet am 24. November 2026, noch nicht veröffentlicht.

Der Bereich steht auf der Startseite direkt vor dem Footer. Er zeigt bis zu sechs
aktuelle Beiträge von `@laraundjohanna`, auf kleinen Bildschirmen in zwei Spalten.
Bei fehlender Verbindung oder einem Fehler bleibt ein Link zum echten Profil.
Es sind keine Beispielbeiträge eingebaut.

## Noch erforderlich

1. Instagram-Lesezugriff für **laraundjohanna** abschließen. Die vorhandene lokale
   Studio-Social-Verbindung gehört zum Zeitpunkt der Prüfung zu **chapter_yourbookclub**.
2. Im Cloudflare-Pages-Projekt `laraundjohanna-website` als verschlüsselte Secrets
   `INSTAGRAM_ACCESS_TOKEN` und `INSTAGRAM_USER_ID` für das Studio-Konto hinterlegen.
   Token nicht in Dateien, Browser-Code, Git oder Chat kopieren.
3. Passend zum Login `INSTAGRAM_API_HOST` (`graph.facebook.com` oder
   `graph.instagram.com`) und `INSTAGRAM_API_VERSION` (Vorgabe `v27.0`) setzen.
   Lesezugriff reicht aus; der Feed benötigt keine Veröffentlichungsrechte.
4. Datenschutzhinweis vor Veröffentlichung anpassen: Beiträge und Vorschaubilder
   werden über den eigenen Cloudflare-Endpunkt ausgeliefert. Der Browser baut erst
   beim Klick auf einen Beitragslink eine direkte Instagram-Verbindung auf.
   Der bisherige Satz „Es werden keine Beiträge … eingebettet“ passt dann nicht mehr.
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
`python3 -m http.server 8765 --bind 127.0.0.1` zeigt die statische Vorschau und den
Fallback. Für den echten API-Endpunkt ist die Cloudflare-Laufzeit erforderlich.
