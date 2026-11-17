/* Inhalte der Website: Angebote (Kacheln + Popups) und Fragen & Antworten.
   Hier Texte, Preise und Fragen bearbeiten. Die Seite baut sich daraus automatisch auf.
   "key" eines Angebots muss zum "key" des passenden FAQ-Tabs passen.
   Optional pro Angebot: "eyebrow" (Überschrift im Popup), "intro" (Einleitungstext),
   "cta" (Button im Popup-Fuß). Pakete ohne "price" werden als Themenkarten ohne Preis gezeigt.
   Optional pro Paket: "hinweis" (dezenter Satz unter den Punkten), "empfehlung" (schräges Band oben rechts),
   "text" (kurzer Absatz über den Punkten),
   "button" (eigene Button-Beschriftung), "anfrage" (was im Kontaktformular vorausgewählt wird),
   "buchung" (Link zur Terminbuchung, öffnet statt des Formulars das Cal.com-Fenster). */
window.LJ_DATA = {
  "offers": [
    {
      "name": "Websites",
      "short": "Onepager, Unternehmenswebsites und Branding + Website",
      "note": "* Vollständige Materialien zum Start. Veröffentlichung nach Freigabe. Hosting, Domain und zusätzliche Funktionen separat.",
      "packages": [
        {
          "name": "Website an einem Tag",
          "sub": "Am vereinbarten Produktionstag",
          "price": "1.900 €*",
          "small": "netto",
          "items": [
            "Onepager mit bis zu 6 Abschnitten",
            "Ihr liefert CI, Texte und Bilder",
            "Responsive Umsetzung und Kontaktformular"
          ]
        },
        {
          "name": "Website komplett",
          "price": "3.900 €",
          "small": "netto",
          "items": [
            "Interview mit euch, daraus neue Texte und Inhalte",
            "Klare Struktur für bis zu fünf Seiten",
            "Bildbearbeitung, Gestaltung und Umsetzung"
          ],
          "empfehlung": "Unsere Empfehlung"
        },
        {
          "name": "Marke + Website",
          "price": "7.900 €",
          "small": "netto",
          "items": [
            "Neues Branding inklusive Logo",
            "Alles aus Website komplett enthalten"
          ],
          "hinweis": "Domain und Hosting laufen nicht über uns."
        }
      ],
      "key": "websites"
    },
    {
      "name": "Branding",
      "short": "Logo, visuelle Identität und Anwendungen",
      "note": "* Anwendungen z. B. Visitenkarten, Fensterbeklebung, Außenwerbung oder Merchandise. Druck separat. Employer Branding als eigenes Projekt.",
      "packages": [
        {
          "name": "Logo kompakt",
          "sub": "Für einen klaren Einstieg",
          "price": "1.900 €",
          "small": "netto",
          "items": [
            "Eine ausgearbeitete Gestaltungsrichtung",
            "Zwei Korrekturrunden und finale Dateien",
            "Kurzes Anwendungsblatt"
          ]
        },
        {
          "name": "Markenbasis",
          "sub": "Ein zusammenhängendes Erscheinungsbild",
          "price": "3.900 €",
          "small": "netto",
          "items": [
            "Positionierungsworkshop und Logo",
            "Farbe, Typografie und Bildsprache",
            "Styleguide und 2 Anwendungen"
          ]
        },
        {
          "name": "Markenwelt",
          "sub": "Strategie und Gestaltung im Zusammenhang",
          "price": "6.900 €",
          "small": "netto",
          "items": [
            "Vertiefte Strategie und Tonalität",
            "Visuelle Identität und Styleguide",
            "5 vereinbarte Anwendungen"
          ]
        }
      ],
      "key": "branding"
    },
    {
      "name": "Meta & Kampagnen",
      "short": "Konzept und Creatives für eure Kampagne",
      "note": "Wir entwickeln Konzept und Creatives. Weitere Creatives könnt ihr jederzeit einzeln dazubuchen. Einrichtung, Ausspielung und Betreuung der Kampagne übernehmt ihr selbst oder ein Partner eurer Wahl. Werbebudget, Fotoshootings und Video separat.",
      "packages": [
        {
          "name": "Alles rund um Creatives",
          "price": "2.000 €",
          "small": "netto",
          "items": [
            "Ziel und Zielgruppenhypothesen",
            "Leitidee und Kommunikationsansätze",
            "Anzeigenideen inklusive Texte",
            "Moods",
            "Fertige Creatives nach eurer Freigabe der Moods",
            "Briefing zur Umsetzung"
          ]
        }
      ],
      "key": "meta-und-kampagnen"
    },
    {
      "name": "LinkedIn",
      "short": "Eure Personal Brand auf LinkedIn stärken",
      "eyebrow": "Themen & Ablauf",
      "intro": "Wir glauben nicht daran, Beiträge auf LinkedIn zu ghostwriten oder von KI schreiben zu lassen. Dort überzeugt, wer selbst spricht: mit eigenen Gedanken, eigener Sprache und eigenem Gesicht. Deshalb helfen wir euch, eure Personal Brand zu stärken. Feste Pakete gibt es dafür nicht. In einem Kickoff Termin klären wir mit euch, wo ihr steht, wie aktiv ihr seid und wo wir euch unterstützen können.",
      "note": "* Folgepakete sind optional. Was sie enthalten und kosten, legen wir nach dem Kickoff gemeinsam mit euch fest.",
      "cta": "Kickoff anfragen",
      "packages": [
        {
          "name": "Kickoff",
          "sub": "Der gemeinsame Start",
          "items": [
            "Wo steht ihr gerade?",
            "Wie aktiv seid ihr auf LinkedIn?",
            "Wo können wir euch unterstützen?"
          ]
        },
        {
          "name": "Konzept & Setup",
          "sub": "Die Grundlage für euren Auftritt",
          "items": [
            "Konzept für eure Personal Brand",
            "Einrichtung eures Videosetups",
            "Hilfe beim Einrichten von Agenten mit KI"
          ]
        },
        {
          "name": "Paid",
          "sub": "Bezahlte Reichweite",
          "items": [
            "Lohnt sich Paid für euch?",
            "Ziele und Budget einordnen",
            "Gemeinsam den Weg festlegen"
          ]
        },
        {
          "name": "Begleitung",
          "sub": "Optional als Folgepaket",
          "items": [
            "Einmal im Monat kommen wir zu euch",
            "Wir nehmen Fotos oder Videos auf",
            "Regie und Beratung vor Ort"
          ]
        }
      ],
      "key": "linkedin"
    },
    {
      "name": "App-Design",
      "short": "Konzept, Moods und klickbare Prototypen",
      "note": "* Programmierung nicht enthalten.",
      "packages": [
        {
          "name": "App Design Konzept",
          "price": "2.500 €",
          "small": "netto",
          "items": [
            "Workshop",
            "Brandingansätze in Form von Moods",
            "Statischer Teaser, wie eure App aussehen könnte (nicht funktional)",
            "2 Designschleifen"
          ]
        },
        {
          "name": "App Prototyp",
          "price": "4.900 €",
          "small": "netto",
          "items": [
            "Alles aus App Design Konzept enthalten",
            "Nach Freigabe der Moods: Design auf alle nötigen Screens übertragen",
            "4 Designschleifen",
            "Klickbarer Prototyp"
          ]
        },
        {
          "name": "Extras",
          "sub": "Zusätzlich buchbar",
          "items": [
            "App Store Vorschaubilder",
            "Kampagnen"
          ]
        }
      ],
      "key": "app-design"
    },
    {
      "name": "KI-Schulungen",
      "short": "Kreative KI-Workshops für euch und euer Team",
      "note": "* Kein Paket von der Stange: Nach der Bestandsaufnahme bekommt ihr ein Angebot mit klarem Umfang und Preis, zugeschnitten auf euer Team. Bei euch in Hamburg oder online.",
      "packages": [
        {
          "name": "Erster Kontakt mit KI",
          "sub": "Für Einsteiger:innen",
          "items": [
            "Was KI kann und was nicht",
            "Die passenden Werkzeuge kennenlernen",
            "Erste eigene Ergebnisse"
          ]
        },
        {
          "name": "Ethik & Rechtliches",
          "sub": "Sicher und verantwortungsvoll",
          "items": [
            "Urheber- und Nutzungsrechte",
            "Datenschutz und vertrauliche Inhalte",
            "Transparenz im Umgang mit KI"
          ]
        },
        {
          "name": "Mindset",
          "sub": "KI im Team verankern",
          "items": [
            "Berührungsängste abbauen",
            "KI als kreatives Werkzeug verstehen",
            "Gemeinsame Spielregeln finden"
          ]
        },
        {
          "name": "Workflows",
          "sub": "Kreativ und design-technisch",
          "items": [
            "Ideen, Moodboards und Bildwelten",
            "Markentreue Gestaltung mit KI",
            "Wiederkehrende Abläufe vereinfachen"
          ]
        }
      ],
      "eyebrow": "Themen & Ablauf",
      "intro": "Vom ersten Kontakt mit KI über Ethik und Rechtliches und das passende Mindset bis hin zu konkreten Workflows: Im kreativen und design-technischen Bereich decken wir alles ab. Feste Preise gibt es dafür bewusst nicht, denn jedes Team startet woanders. Bevor wir euch ein Angebot machen, nehmen wir in einem Gespräch mit eurem Betrieb eine Bestandsaufnahme vor und stecken gemeinsam ab, was ihr wirklich braucht.",
      "cta": "Bestandsaufnahme anfragen",
      "key": "ki-schulungen"
    },
    {
      "name": "Beratung & Einstieg",
      "short": "Erstgespräch und der passende Weg für euch",
      "note": "* Nach dem Erstgespräch bekommt ihr ein Angebot mit klarem Umfang und Preis.",
      "packages": [
        {
          "name": "Erstgespräch",
          "sub": "30 Minuten",
          "price": "Kostenlos",
          "small": "unverbindlich",
          "items": [
            "Euch und euer Anliegen kennenlernen",
            "Erste Einschätzung",
            "Empfehlung für die nächsten Schritte"
          ],
          "button": "Jetzt Termin vereinbaren!",
          "buchung": "https://cal.com/laraundjohanna/erstgespraech"
        },
        {
          "name": "Ihr wollt generell mehr Kunden erreichen?",
          "text": "Dann nehmen wir die Zügel in die Hand. Wir zeigen euch, welches Potenzial in euch steckt, und machen konkrete Vorschläge. Wenn sie euch überzeugen, setzen wir sie auch direkt für euch um."
        },
        {
          "name": "Ihr wollt ganz konkret eine neue Website?",
          "text": "Ihr habt schon eine klare Linie und eine eigene Identität und braucht wirklich nur eine Website? Dann starten wir direkt damit, ohne Umwege."
        }
      ],
      "key": "beratung-und-einstieg",
      "eyebrow": "Euer Einstieg"
    }
  ],
  "tabs": [
    {
      "key": "allgemein",
      "name": "Allgemein",
      "qa": [
        {
          "q": "Sind eure Preise wirklich fest?",
          "a": "Ja. Vor der Buchung legen wir Leistungen, Ergebnis und Preis fest. Wenn wir dafür länger brauchen, bleibt euer Preis gleich. Zusätzliche Wünsche besprechen und kalkulieren wir vor der Umsetzung. Ausnahmen sind unsere KI-Schulungen und LinkedIn: Dort klären wir zuerst gemeinsam mit euch, was ihr braucht, und erstellen danach ein individuelles Angebot."
        },
        {
          "q": "Können wir Leistungen kombinieren?",
          "a": "Ja. Zum Beispiel Branding und Website, Website und Kampagne oder LinkedIn und einen KI-Workshop. Ihr bekommt dafür ein abgestimmtes Angebot mit klaren Leistungen."
        },
        {
          "q": "Was müssen wir vorbereiten?",
          "a": "Das hängt vom Paket ab. Wir sagen euch vor dem Start, welche Inhalte, Zugänge und Freigaben wir benötigen. Für die Website an einem Tag brauchen wir euer Branding, finale Texte und Bilder sowie eine erreichbare Ansprechperson. Wenn etwas fehlt, unterstützen wir euch mit dem passenden Paket."
        },
        {
          "q": "Kommt ihr auch zu uns?",
          "a": "Gerne. Wenn ihr in Hamburg sitzt, vereinbaren wir persönliche Kennenlern-, Workshop- und Abstimmungstermine bei euch. Dafür berechnen wir innerhalb Hamburgs keine zusätzliche Anfahrt. Produktionen wie Fotoshootings werden separat gebucht. Außerhalb Hamburgs arbeiten wir per Video oder stimmen einen Vor-Ort-Termin gesondert ab."
        },
        {
          "q": "Können wir uns erst einmal kennenlernen?",
          "a": "Ja. Bucht ein kostenloses Erstgespräch von 30 Minuten. Wir sprechen über euer Vorhaben und empfehlen passende nächste Schritte. Das Gespräch ist unverbindlich."
        }
      ]
    },
    {
      "key": "websites",
      "name": "Websites",
      "qa": [
        {
          "q": "Welches Website-Paket empfehlt ihr?",
          "a": "Unsere Empfehlung ist „Website komplett“. Damit entsteht eine gute neue Basis für euren Auftritt, mit frischem Blick auf das, was bei euch schon da ist. Wir führen ein Interview mit euch und erarbeiten daraus neue Texte und Inhalte. Wenn ihr später mehr braucht, könnt ihr zusätzliche Leistungen ohne großen Aufwand dazubuchen."
        },
        {
          "q": "Was ist bei „Website an einem Tag“ enthalten?",
          "a": "Wir gestalten und erstellen einen Onepager mit bis zu sechs Inhaltsabschnitten auf Basis eures bestehenden Brandings. Enthalten sind die Darstellung für Smartphone und Desktop, ein einfaches Kontaktformular, eine technische Prüfung und eine gebündelte Korrekturrunde innerhalb des vereinbarten Umfangs. Voraussetzung für dieses Paket: Ihr liefert zum Start alle Materialien vollständig, also CI, fertige Texte und Bilder. Veröffentlicht wird nach eurer Freigabe. Hosting, Domain und zusätzliche Funktionen sind nicht enthalten."
        },
        {
          "q": "Was bedeutet „an einem Tag“ genau?",
          "a": "Wir reservieren einen Produktionstag für eure Website. Briefing, Inhalte, Zugänge und gestalterische Richtung klären wir vorher. Am Produktionstag erstellen wir die Website und stimmen sie mit euch ab. Nach eurer Freigabe kann sie veröffentlicht werden, sofern alle technischen Voraussetzungen vorliegen."
        },
        {
          "q": "Was müssen wir für das Tagespaket vorbereiten?",
          "a": "Wir benötigen euer Logo, Farben und Schriften beziehungsweise euren Styleguide, finale Texte, ausgewählte Bilder und die nötigen Zugänge. Außerdem brauchen wir eine entscheidungsbefugte Person, die am Produktionstag für Rückfragen und Freigaben erreichbar ist. Ihr bekommt vorab eine Checkliste."
        },
        {
          "q": "Was ist bei „Website komplett“ zusätzlich enthalten?",
          "a": "Hier entwickeln wir auch die Seitenstruktur. Eure Texte müsst ihr nicht selbst schreiben: Wir führen ein Interview mit euch und erarbeiten daraus die Texte selbst. Außerdem bearbeiten wir die von euch gelieferten Bilder und gestalten und erstellen bis zu fünf Seiten. Zwei gebündelte Korrekturrunden sind enthalten."
        },
        {
          "q": "Was zählt als Seite oder Abschnitt?",
          "a": "Eine Seite ist eine eigene Unterseite, zum Beispiel „Über uns“ oder „Leistungen“. Ein Abschnitt ist ein Inhaltsbereich innerhalb einer Seite, etwa eine Vorstellung, Leistungsübersicht oder Kontaktsektion. Die konkrete Seitenliste und Struktur halten wir vor dem Start fest."
        },
        {
          "q": "Was umfasst „Marke + Website“?",
          "a": "Ihr bekommt ein komplett neues Branding inklusive Logo. Darauf bauen wir eure Website mit bis zu fünf Seiten auf, inklusive Struktur, Texten aus unserem Interview mit euch und Bearbeitung gelieferter Bilder. Enthalten sind zwei gebündelte Korrekturrunden pro Projektphase. Domain und Hosting laufen nicht über uns."
        },
        {
          "q": "Sind ein Shop, mehrere Sprachen oder besondere Funktionen enthalten?",
          "a": "Die Standardpakete umfassen eine einsprachige Unternehmenswebsite. Shops, Mitgliederbereiche, individuelle Schnittstellen oder mehrere Sprachen besprechen und kalkulieren wir als zusätzliche Festpreisleistungen."
        },
        {
          "q": "Sind SEO, Hosting und rechtliche Texte enthalten?",
          "a": "Eine klare Seitenstruktur, Seitentitel und eine technisch sorgfältige Umsetzung gehören dazu. Laufende Suchmaschinenoptimierung bieten wir nicht an. Hosting und Domain laufen nicht über uns, die bucht ihr direkt bei einem Anbieter eurer Wahl. Freigegebene Texte für Impressum und Datenschutzhinweise stellt ihr bereit. Den Einbau berücksichtigen wir im Angebot."
        },
        {
          "q": "Können wir die Website später selbst bearbeiten?",
          "a": "Wenn ihr Inhalte selbst pflegen möchtet, wählen wir den technischen Aufbau entsprechend aus. Welche Bereiche bearbeitbar sind und wie die Übergabe und Einweisung aussehen, vereinbaren wir vor Projektstart. Laufende Pflege ist eine separat buchbare Leistung."
        },
        {
          "q": "Sind neue Fotos enthalten?",
          "a": "Bei „Website komplett“ bearbeiten wir vorhandene Bilder. Neue Aufnahmen entstehen in einem separat gebuchten Fotoshooting. Wenn ihr noch kein passendes Bildmaterial habt, klären wir vorab, welche Lösung zu euch passt."
        }
      ]
    },
    {
      "key": "branding",
      "name": "Branding",
      "qa": [
        {
          "q": "Welches Branding-Paket passt zu uns?",
          "a": "„Logo kompakt“ passt, wenn ihr ein Logo benötigt und eure grundsätzliche Ausrichtung bereits kennt. Die „Markenbasis“ schafft ein zusammenhängendes visuelles Erscheinungsbild. Die „Markenwelt“ umfasst eine vertiefte Strategie, Tonalität und mehr konkrete Anwendungen. Im Erstgespräch helfen wir euch bei der Auswahl."
        },
        {
          "q": "Was ist bei „Logo kompakt“ enthalten?",
          "a": "Ein Briefing, eine ausgearbeitete Gestaltungsrichtung, zwei gebündelte Korrekturrunden sowie die finalen Logodateien für digitale und gedruckte Anwendungen. Ein kurzes Anwendungsblatt erklärt die grundlegende Verwendung. Farben, Typografie und Bildsprache für einen vollständigen Markenauftritt gehören zu den größeren Paketen."
        },
        {
          "q": "Bekommen wir mehrere Logoentwürfe zur Auswahl?",
          "a": "Im Paket „Logo kompakt“ entwickeln wir eine begründete Gestaltungsrichtung, die wir mit euch weiter ausarbeiten. Mehrere unabhängig ausgearbeitete Richtungen können wir zusätzlich vereinbaren."
        },
        {
          "q": "Was gehört zur „Markenbasis“?",
          "a": "Ein Positionierungsworkshop, Logo, Farbpalette, Typografie, Bildsprache und ein kompakter Styleguide. Dazu gestalten wir zwei vorab ausgewählte Anwendungen, zum Beispiel eine Visitenkarte und eine Social-Media-Vorlage."
        },
        {
          "q": "Was ist bei der „Markenwelt“ zusätzlich enthalten?",
          "a": "Wir vertiefen eure Positionierung, entwickeln die sprachliche Tonalität und dokumentieren das Erscheinungsbild in einem ausführlicheren Styleguide. Außerdem gestalten wir fünf vorab definierte Anwendungen. Welche das sind, legen wir gemeinsam fest."
        },
        {
          "q": "Was zählt als Anwendung?",
          "a": "Eine Anwendung ist ein klar definiertes Gestaltungsergebnis, beispielsweise eine Visitenkarte, eine Fensterbeklebung für eine festgelegte Fläche oder ein Merchandise-Motiv. Mehrere Formate, Motive und Varianten vereinbaren wir ausdrücklich im Leistungsumfang."
        },
        {
          "q": "Sind Druck und Produktion enthalten?",
          "a": "Die Pakete umfassen die vereinbarte Gestaltung und die dafür benötigten Ausgabedateien. Druck, Herstellung, Beklebung und andere Produktionsleistungen werden separat kalkuliert. Auf Wunsch unterstützen wir bei der Abstimmung."
        },
        {
          "q": "Könnt ihr unser bestehendes Branding weiterentwickeln?",
          "a": "Ja. Wir schauen uns an, was bereits funktioniert und was verändert werden sollte. Daraus entsteht ein klar abgegrenztes Paket für die Weiterentwicklung."
        },
        {
          "q": "Ist Employer Branding enthalten?",
          "a": "Ein umfassendes Employer Branding ist ein eigenes Projekt. Dabei geht es unter anderem darum, wofür ihr als Arbeitgeber steht und wie ihr passende Menschen ansprecht. Umfang und Ergebnis definieren wir vorab; Recruiting-Motive oder eine Karriereseite können darauf aufbauen."
        }
      ]
    },
    {
      "key": "meta-und-kampagnen",
      "name": "Meta & Kampagnen",
      "qa": [
        {
          "q": "Was ist im Kampagnenpaket enthalten?",
          "a": "Wir legen mit euch Ziel und Zielgruppenhypothesen fest und entwickeln eine kreative Leitidee mit passenden Kommunikationsansätzen. Dazu bekommt ihr Anzeigenideen inklusive Texten und Moods für die visuelle Richtung. Sobald ihr die Moods freigegeben habt, gestalten wir daraus die fertigen Creatives. Zum Schluss bekommt ihr ein Briefing zur Umsetzung."
        },
        {
          "q": "Was sind Moods?",
          "a": "Moods zeigen die visuelle Richtung eurer Kampagne: Bildsprache, Farben und Stimmung. So seht ihr früh, wie sich die Kampagne anfühlen wird. Nach eurer Freigabe der Moods gestalten wir daraus die fertigen Creatives."
        },
        {
          "q": "Können wir später weitere Creatives beauftragen?",
          "a": "Ja, natürlich. Weitere Anzeigenideen, Motive oder Formate könnt ihr jederzeit einzeln bei uns beauftragen, auch unabhängig vom Kampagnenpaket. Ihr bekommt dafür vorab ein klares Angebot."
        },
        {
          "q": "Übernehmt ihr auch die Ausspielung und Betreuung auf Meta?",
          "a": "Nein. Wir konzentrieren uns auf Konzept und Creatives. Die Einrichtung im Werbekonto, die Ausspielung und die laufende Betreuung übernehmt ihr selbst oder ein Partner eurer Wahl. Mit dem Briefing zur Umsetzung habt ihr dafür eine klare Grundlage."
        },
        {
          "q": "Sind Videos, Fotoshootings oder UGC enthalten?",
          "a": "Nein. Das Paket umfasst Konzept, Anzeigenideen, Texte, Moods und die fertigen Creatives als Bildmotive. Video, Animation, Fotoshootings und die Zusammenarbeit mit Creator:innen kalkulieren wir bei Bedarf separat."
        },
        {
          "q": "Ist das Anzeigenbudget im Preis enthalten?",
          "a": "Nein. Unser Preis bezahlt unsere Arbeit an Konzept und Creatives. Das Werbebudget läuft direkt über euer eigenes Werbekonto."
        },
        {
          "q": "Garantiert ihr eine bestimmte Anzahl an Verkäufen oder Anfragen?",
          "a": "Nein. Wir entwickeln Ziel, Idee und Creatives so, dass eure Kampagne die besten Voraussetzungen hat. Die Ergebnisse hängen aber auch von eurem Angebot, dem Budget, der Ausspielung, eurer Website und der Nachfrage ab."
        }
      ]
    },
    {
      "key": "linkedin",
      "name": "LinkedIn",
      "qa": [
        {
          "q": "Schreibt ihr unsere Beiträge auf LinkedIn?",
          "a": "Nein, und das mit Absicht. Wir glauben nicht daran, Beiträge zu ghostwriten oder von KI schreiben zu lassen. Auf LinkedIn wirkt, wer selbst spricht: mit eigenen Gedanken, eigener Sprache und eigenem Gesicht. Wir helfen euch stattdessen, eure Personal Brand zu stärken, damit ihr selbst sichtbar werdet."
        },
        {
          "q": "Was kostet die Unterstützung bei LinkedIn?",
          "a": "Feste Pakete haben wir dafür bewusst nicht, denn jede Person und jedes Unternehmen startet woanders. Im Kickoff klären wir, wo ihr steht und was ihr braucht. Danach bekommt ihr ein Angebot mit klarem Umfang und Preis."
        },
        {
          "q": "Was passiert im Kickoff?",
          "a": "Wir schauen gemeinsam, wo ihr auf LinkedIn steht, wie aktiv ihr seid und wo wir euch am besten unterstützen können. Daraus entsteht ein klarer Plan für die nächsten Schritte."
        },
        {
          "q": "Wobei könnt ihr uns unterstützen?",
          "a": "Wir erstellen ein Konzept für eure Personal Brand, helfen euch bei der Einrichtung eures Videosetups oder von Agenten mit KI und sprechen mit euch über Paid, also bezahlte Reichweite auf LinkedIn."
        },
        {
          "q": "Was beinhalten die Folgepakete?",
          "a": "Folgepakete sind optional. Zum Beispiel kommen wir einmal im Monat zu euch, nehmen Fotos oder Videos auf und stehen euch dabei als Regie und Beratung zur Seite. Was genau enthalten ist, stimmen wir nach dem Kickoff mit euch ab."
        },
        {
          "q": "Betreut ihr persönliche Profile oder Unternehmensseiten?",
          "a": "Beides ist möglich. Unser Schwerpunkt liegt auf Personal Brands, also auf den Menschen hinter dem Unternehmen. Was zu euch passt, klären wir im Kickoff."
        }
      ]
    },
    {
      "key": "app-design",
      "name": "App-Design",
      "qa": [
        {
          "q": "Was bekommen wir im App Design Konzept?",
          "a": "Wir starten mit einem gemeinsamen Workshop. Danach entwickeln wir Brandingansätze für eure App in Form von Moods. Dazu bekommt ihr einen statischen Teaser, der zeigt, wie eure App aussehen könnte. Der Teaser ist ein Bild und nicht funktional. Zwei Designschleifen sind enthalten."
        },
        {
          "q": "Was ist beim App Prototyp enthalten?",
          "a": "Alles aus dem App Design Konzept. Sobald ihr die Moods freigegeben habt, übertragen wir das Design auf alle nötigen Screens eurer App. Daraus entsteht ein klickbarer Prototyp, mit dem ihr die Abläufe ausprobieren, zeigen und besprechen könnt. Insgesamt sind vier Designschleifen enthalten."
        },
        {
          "q": "Wie hängen die beiden Pakete zusammen?",
          "a": "Der App Prototyp baut auf dem Konzept auf und enthält es komplett. Ihr könnt direkt mit dem Prototyp starten oder zuerst das Konzept buchen und den Prototyp später dazunehmen."
        },
        {
          "q": "Was zählt als Screen?",
          "a": "Ein Screen ist eine eigenständige Ansicht, zum Beispiel eine Übersicht oder Detailseite. Welche Screens für eure App nötig sind, legen wir vorab gemeinsam in einer Liste fest."
        },
        {
          "q": "Ist die Programmierung der App enthalten?",
          "a": "Nein. Programmierung ist nicht enthalten. Der klickbare Prototyp zeigt die geplanten Abläufe, hat aber keine echte Funktion. Programmierung, Backend und Veröffentlichung setzt ihr selbst oder mit einem Entwicklungspartner um."
        },
        {
          "q": "Welche Extras können wir dazubuchen?",
          "a": "Zum Beispiel Vorschaubilder für den App Store oder eine Kampagne für den Start eurer App. Die Extras könnt ihr zu beiden Paketen dazubuchen, ihr bekommt dafür vorab ein klares Angebot."
        }
      ]
    },
    {
      "key": "ki-schulungen",
      "name": "KI-Schulungen",
      "qa": [
        {
          "q": "Für wen sind eure KI-Schulungen gedacht?",
          "a": "Für Unternehmen, Marketingteams und Kreative, die KI für Ideen, Bilder, Texte und Gestaltung einsetzen möchten. Egal, ob ihr noch nie mit KI gearbeitet habt oder schon erste Erfahrungen mitbringt. In der Bestandsaufnahme klären wir euren Kenntnisstand und holen euch dort ab, wo ihr steht."
        },
        {
          "q": "Was kostet eine KI-Schulung?",
          "a": "Für KI-Schulungen haben wir bewusst keine festen Preise, weil jedes Team mit anderen Voraussetzungen und Zielen startet. Zuerst nehmen wir in einem Gespräch mit euch eine Bestandsaufnahme vor. Danach bekommt ihr ein Angebot mit klar festgelegtem Umfang und Preis."
        },
        {
          "q": "Wie läuft die Bestandsaufnahme ab?",
          "a": "Wir sprechen mit euch über euer Team, eure bisherigen Erfahrungen mit KI, eure Abläufe und eure Ziele. Daraus stecken wir gemeinsam ab, was ihr wirklich braucht: welche Themen, wie viel Zeit, für wie viele Personen und in welchem Format. Das Gespräch kann per Video oder bei euch in Hamburg stattfinden."
        },
        {
          "q": "Welche Themen können wir behandeln?",
          "a": "Im kreativen und design-technischen Bereich decken wir alles ab: vom ersten Kontakt mit KI über Ethik und Rechtliches und das passende Mindset bis hin zu konkreten Workflows. Dazu gehören zum Beispiel Ideen und Moodboards, Bildgenerierung und Bildbearbeitung, markentreue Gestaltung, Headlines und Content-Varianten oder wiederkehrende kreative Arbeitsschritte. Welche Schwerpunkte für euch sinnvoll sind, klären wir in der Bestandsaufnahme."
        },
        {
          "q": "Sprecht ihr auch über Ethik und rechtliche Fragen?",
          "a": "Ja. Wir zeigen, worauf ihr beim Einsatz von KI achten solltet, etwa bei Urheber- und Nutzungsrechten, Datenschutz, vertraulichen Inhalten und einem transparenten Umgang mit KI-Ergebnissen. Wir geben Orientierung für die Praxis; eine individuelle Rechtsberatung ersetzt das nicht."
        },
        {
          "q": "Was nehmen wir aus der Schulung mit?",
          "a": "Ihr könnt die geübten Abläufe selbst anwenden und Ergebnisse gezielter beurteilen und verbessern. Was ihr zusätzlich mitnehmt, etwa ein Handout, Beispielprompts oder gemeinsam erarbeitete Vorlagen, legen wir nach der Bestandsaufnahme gemeinsam fest."
        },
        {
          "q": "Können wir mit unserem Branding und eigenen Aufgaben arbeiten?",
          "a": "Ja, sehr gern. Wenn es zu euren Zielen passt, arbeiten wir mit ausgewählten Beispielen aus eurem Unternehmen. Dafür stellt ihr rechtzeitig euren Styleguide beziehungsweise Logo, Farben und Schriften sowie geeignetes Bild- und Textmaterial bereit."
        },
        {
          "q": "Was müssen wir technisch vorbereiten?",
          "a": "Jede teilnehmende Person benötigt einen geeigneten Laptop, eine stabile Internetverbindung und die vorab abgestimmten Zugänge. Bei Terminen vor Ort braucht ihr außerdem einen geeigneten Raum mit Bildschirm oder Beamer. Ihr bekommt vor dem Termin eine Checkliste; bitte prüft die Konten und Freigaben rechtzeitig."
        },
        {
          "q": "Welche KI-Werkzeuge nutzen wir und sind Lizenzen inklusive?",
          "a": "Wir wählen die Werkzeuge passend zu eurem Ziel und euren vorhandenen Systemen. Die Auswahl klären wir vorab. Benötigte Abonnements, Nutzungsguthaben und Lizenzen sind nicht in unserem Angebot enthalten. Wenn kostenpflichtige Zugänge nötig sind, nennen wir sie vor der Buchung."
        },
        {
          "q": "Findet die Schulung bei uns in Hamburg oder online statt?",
          "a": "Beides ist möglich. Wenn euer Unternehmen in Hamburg sitzt, kommen wir gerne für die gebuchte Schulung zu euch; eine zusätzliche Anfahrt innerhalb Hamburgs berechnen wir nicht. Alternativ treffen wir uns live per Video. Termine außerhalb Hamburgs und mögliche Reisekosten stimmen wir vorab ab."
        },
        {
          "q": "Sind fertige Designs oder eine individuelle Automatisierung enthalten?",
          "a": "Unsere KI-Schulungen sind Schulungen mit praktischen Übungen. Eine vollständige Markenentwicklung, eine fertige Kampagne und eine individuell eingerichtete Automatisierung gehören nicht dazu. Wenn ihr die Umsetzung zusätzlich beauftragen möchtet, bekommt ihr dafür ein eigenes Festpreisangebot."
        },
        {
          "q": "Wie gehen wir mit vertraulichen Inhalten und Fragen nach dem Workshop um?",
          "a": "Wir stimmen vorab ab, welche Materialien und Werkzeuge für die Übungen geeignet sind. Vertrauliche Inhalte nutzen wir nur nach entsprechender Abstimmung; alternativ arbeiten wir mit neutralen Beispielen. Ob eine Nachbereitung oder weitere Begleitung sinnvoll ist, besprechen wir in der Bestandsaufnahme."
        }
      ]
    },
    {
      "key": "beratung-und-einstieg",
      "name": "Beratung & Einstieg",
      "qa": [
        {
          "q": "Was passiert im kostenlosen Erstgespräch?",
          "a": "Wir nehmen uns 30 Minuten Zeit, um euch und euer Anliegen kennenzulernen. Ihr bekommt eine erste Einschätzung und Empfehlungen für die nächsten Schritte. Ihr könnt das Gespräch per Video führen oder einen persönlichen Termin bei euch in Hamburg vereinbaren."
        },
        {
          "q": "Wir wollen mehr Kunden erreichen, wissen aber nicht genau wie. Was macht ihr?",
          "a": "Dann nehmen wir die Zügel in die Hand. Wir schauen uns euren Auftritt an, zeigen euch euer ganzes Potenzial und machen konkrete Vorschläge. Wenn euch das überzeugt, setzen wir es auch für euch um."
        },
        {
          "q": "Wir brauchen nur eine neue Website. Geht das auch?",
          "a": "Klar. Wenn ihr schon eine klare Linie und eine eigene Identität habt und wirklich nur eine Website braucht, starten wir direkt damit. Die passenden Pakete findet ihr unter Websites."
        },
        {
          "q": "Ist das Erstgespräch verbindlich?",
          "a": "Nein. Das Erstgespräch ist kostenlos und unverbindlich. Ihr entscheidet danach in Ruhe, ob und wie ihr mit uns weitermachen wollt."
        }
      ]
    }
  ]
};
