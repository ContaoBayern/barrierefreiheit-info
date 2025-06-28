# Erkenntnisse

## Semantik
ARIA-roles:
ARIA-roles sind für Elemente nicht nötig, wenn das HTML-Element selbst sprechend ist: z.B. main braucht keine seperate aria-role, da es automatisch erkannt wird.


## Navigation
1 Navigation für desktop und mobile zusammen. So wenig wie möglich Javascript.  
  
Firefox kann man hier unterschiedlich den Browser eingestellt haben: Einstellungen -> Surfen -> "Tab-Taste verwenden, um den Fokus zwischen Formular-Steuerung und links zu verschieben". Führt dazu, dass sich die Tab-Taste anders verhält: mit gesetzten Haken kann man z.B. in ein Untermenü springen, ohne Haken springt man zum nächsten Element auf gleicher Ebene weiter.

Unterschiede:  
Menüpunkt führt direkt auf Seite, ohne Untermenü  
Menüpunkt ist nur Schalter der nur das Ausklappen auslöst, besitzt selbst aber keine Seite.  
Menüpunkt führt direkt auf Seite und hat zusätzlich Untermenü  

Menüpunkt führt direkt auf Seite, dann ist sematisch ein Link <a> korrekt  
Menüpunkt ist nur Modal -> dann muss es sematisch ein Button sein.  
Menüpunkt führt direkt auf Seite (mit Klick), hat Untermenü, dann macht ein zusätzlicher Button Sinn, der den Klick auslösen kann.  


Gestaltung:  
Wenn man den Button nicht anzeigen möchte, könnte man den Button mit clip ausblenden und bei fokus das clip wieder rausnehmen.  
Beispiel:
```scss
.invisible {
	border: 0;
	clip: rect(0 0 0 0);
	display: initial;
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	width: 1px;
	&:focus-visible{
		clip: initial;
		height: auto;
		width: auto;
	}
}
```

Interessante Seite dazu: https://gehirngerecht.digital/
