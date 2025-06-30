# Erkenntnisse

## Semantik

### ARIA-roles

ARIA-roles sind für Elemente nicht nötig, wenn das HTML-Element selbst sprechend ist: z.B. `main` braucht keine seperate `aria-role`, da es automatisch erkannt wird.

### Für Redakteure

 - TinyMCE anpassen (Leere `p` Tags raus, leere Überschriften raus, a11ychecker Plugin (bezahlt, https://www.tiny.cloud/docs/tinymce/latest/a11ychecker/), Möglichkeiten reduzieren, erlaubte Elemente einschränken)
 - Ggf. "einfach" erkennbare Probleme per `modifyFrontendPage` Hook abfangen, entfernen/korrigieren
 - Ggf. automatische Validierung von "einfach" erkennbaren Problemen im Backend (beforesubmit_callback o.Ä.)

## Navigation

1 Navigation für desktop und mobile zusammen. So wenig wie möglich Javascript.

Interessante Seite dazu: https://gehirngerecht.digital/

Firefox kann man hier unterschiedlich den Browser eingestellt haben: Einstellungen -> Surfen -> "Tab-Taste verwenden, um den Fokus zwischen Formular-Steuerung und links zu verschieben". Führt dazu, dass sich die Tab-Taste anders verhält: mit gesetzten Haken kann man z.B. in ein Untermenü springen, ohne Haken springt man zum nächsten Element auf gleicher Ebene weiter.

### Unterschiede
- Menüpunkt führt direkt auf Seite, ohne Untermenü
- Menüpunkt ist nur Schalter der nur das Ausklappen auslöst, besitzt selbst aber keine Seite.
- Menüpunkt führt direkt auf Seite und hat zusätzlich Untermenü

- Menüpunkt führt direkt auf Seite, dann ist sematisch ein Link `<a>` korrekt
- Menüpunkt ist nur Modal -> dann muss es sematisch ein Button sein.
- Menüpunkt führt direkt auf Seite (mit Klick), hat Untermenü, dann macht ein zusätzlicher Button Sinn, der den Klick auslösen kann.


### Gestaltung
Wenn man den Button nicht anzeigen möchte, könnte man den Button mit `clip-path` ausblenden und bei Fokus das 'clip-path' wieder rausnehmen.
Beispiel:
```scss
.invisible {
	border: 0;
	clip-path: circle(0);
	display: initial;
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	width: 1px;
	&:focus-visible{
		clip-path: initial;
		height: auto;
		width: auto;
	}
}
```

Button kann entweder über Javascript ergänzt werden (aktuelle Umsetzung in der Contao Demo) oder durch direkte Anpassung des Templates.

Die Demo nutzt die Umsetzung über Javascript mit diesem Script:\
https://github.com/contao/contao-demo/blob/5.3.x/files/contaodemo/theme/src/js/a11y-nav.js

Eine angepasste Version mit Focus-Traps in Untermenüs ist hier zu finden:\
https://github.com/ContaoBayern/barrierefreiheit-info/tree/main/a11y-nav/


### Momentane ARIA-Attribut Einschränkungen
`aria-haspopup` Attribut funktioniert in älteren Safari-Versionen mit VoiceOver nicht. In aktuellen Versionen (Version 18.5 getestet) funktioniert das Attribut. \
`aria-expanded` funktioniert allerdings auch in aktuellen Safari Versionen in Kombination mit VoiceOver nicht.

## Focus
Kombination aus Outline und Shadow verwenden, damit es sowohl auf hellen und dunklen Hintergünden funktioniert. Ggf. mit dotted.

### Beispiel
(ggf. Farben passend ändern)
```scss
:focus-visible{
	box-shadow: 0 0 0 3px $primary, 0 0 0 9px $primary;
	outline: 3px solid white;
	outline-offset: 3px;
}
```

## Skip-Links
Sich widerholende Bereich wie Header etc. sollen überspringbar sein. Evtl. auch Punkte wie "direkt zur Navigation springen".
TODO: Umsetzung noch zu beschreiben

## Slider
[Slider Anforderungen und Empfehlungen](https://handreichungen.bfit-bund.de/barrierefreie-uie/karussell.html)

## Tabellen
Tabellen sollten eine th besitzen, damit erkennbar ist, um was es in jeder Spalte/Zeile inhaltlich geht.\
[Lesereihenfolge](https://bitvtest.de/pruefschritt/wcag-21-web/wcag-21-web-1-3-1e-datentabellen-richtig-aufgebaut)\
Kopfzeile hinzufügen oder Reihenüberschriften sollte im Backend angehakt werden. Contao setzt dann automatisch das `scope` Attribut der `th` Elemente.\
Zusammenfassung erzeugt nun Caption, was richtig ist (früher summary).
