# Anforderungen
## Semantische Struktur:
- Mehrteilige-Formulare sollten durch inhaltlich zusammengehörige Gruppen mit dem <fieldset>-Element im HTML-Quelltext strukturiert werden.
- Eine saubere HTML-Struktur ist entscheidend, damit Screenreader die Formularelemente, ihre Rolle (z.B. Checkbox, Button), ihren Namen und ihren Zustand (z.B. ausgewählt, erweitert) korrekt interpretieren und ausgeben können.
## Fehlerbehandlung:
- Automatisch erkannte Eingabefehler müssen in einer schriftlichen Fehlermeldung einen klaren Hinweis auf das fehlerhafte Element geben.
- Es sollten Korrekturempfehlungen für falsche Benutzereingaben angegeben werden.
- Vermeidung von Captchas: Grafische Captchas sollten vermieden oder eine barrierefreie Alternative bereitgestellt werden, da sie für Menschen mit Sehbehinderungen problematisch sind

## Zeitliche Begrenzungen:
- Es sollte keine Zeitbegrenzung für die Eingabe geben, es sei denn, Nutzer können diese Begrenzung abschalten oder anpassen.
- Wenn eine Sitzung abläuft, sollten Nutzer nach erneuter Anmeldung ihre Aktivität ohne Datenverlust fortführen können.
- Nutzer sollten gewarnt werden, wenn eine Unterbrechung zum Datenverlust führen könnte, sofern die Eingaben nicht für mindestens 20 Stunden erhalten bleiben

## Identifizierungs- und Zahlungsfunktionen: 
Im elektronischen Geschäftsverkehr müssen Identifizierungs-, Authentifizierungs-, Sicherheits- und Zahlungsfunktionen wahrnehmbar, bedienbar, verständlich und robust gestaltet werden. Es sollten Alternativen zur biometrischen Identifizierung angeboten werden.

## Konsistenz: 
Die Funktionalitäten innerhalb des Formulars und der gesamten Website sollten konsistent sein.

## Farbe und Kontrast: 
Interaktive Elemente sollten sich farblich abheben. Es ist wichtig, einen ausreichenden Kontrast zwischen Schriftfarbe und Hintergrundfarbe zu gewährleisten (mindestens 4,5:1 für normalen Text, 3:1 für große Schrift). Farbe sollte niemals das einzige Mittel zur Vermittlung von Informationen sein, um Menschen mit Farbfehlsichtigkeit nicht auszuschließen.

## Verständliche Formularfelder durch Platzhalter und Labels:
Alle Eingabefelder sollten eine angemessene placeholder-Beschriftung haben und eine klare Anweisung durch das zugehörige <label> haben.

## Reihenfolge von Formularfeldern:
Alle Formularelemente auf eine logische und benutzerfreundliche Reihenfolge prüfen.

## Validierung und Fehlermeldungen:
Bei allen Formularfeldern auf die richtige Validierung achten. Fehlermeldungen müssen sprechend sein.
