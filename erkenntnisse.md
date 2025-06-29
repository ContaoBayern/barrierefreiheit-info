# Erkenntnisse

## Semantik
### ARIA-roles
ARIA-roles sind für Elemente nicht nötig, wenn das HTML-Element selbst sprechend ist: z.B. `main` braucht keine seperate `aria-role`, da es automatisch erkannt wird.


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
// alte Umsetzung / deprecated
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
```scss
// neuere Umsetzung
.invisible {
            border: 0;
            clip-path: circle(0);
            height: 1px;
            margin: -1px;
            overflow: hidden;
            padding: 0;
            position: absolute;
            width: 1px;
        }
```

ARIA: \
aria-haspopup-Attribut funktioniert im Safari aktuell nicht komplett, zumindest bei älteren Systemen. Bei neueren Version sollte das behoben sein. \
aria-expanded funktioniert allerdings auch in aktuellen Safari Versionen in Kombination mit VoiceOver nicht.

Button kann entweder über Javascript ergänzt werden (aktuelle Umsetzung in der Demo) oder durch direkte Anpassung des Templates:


Die Demo nutzt die Umsetzung über Javascript mit diesem Script (https://github.com/contao/contao-demo/blob/5.3.x/files/contaodemo/theme/src/js/a11y-nav.js):

(https://github.com/ContaoBayern/barrierefreiheit-info/blob/main/a11y-nav/a11y-nav.js)

```js
// toggles navi sidebar
const toggleNavMain = document.querySelector('[ data-nav-toggle ]');
const navMobile = document.querySelector('.nav-main');
const header = document.getElementById('header');

const showNavMobile = 'show-nav-mobile';
const isActive = 'is-active';
const preventBodyScrolling = "prevent-scrolling";

function toggleNavigationState(open) {
    if (open) {
        document.body.classList.add(showNavMobile, preventBodyScrolling);
        navMobile.setAttribute('style', 'top:' + header.offsetHeight + 'px;');
    } else {
        document.body.classList.remove(showNavMobile, preventBodyScrolling);
    }

    toggleNavMain.classList.toggle(isActive, open);
    toggleNavMain.ariaExpanded = open ? 'true' : 'false';
    toggleNavMain.ariaLabel = open ? 'Collapse menu: ' + navMobile.ariaLabel : 'Expand menu: ' + navMobile.ariaLabel;

    navMobile.classList.toggle(isActive, open);
}
toggleNavMain?.addEventListener('click', () => toggleNavigationState(!document.body.classList.contains(showNavMobile)));

```

Interessante Seite dazu: https://gehirngerecht.digital/


## Kundenerziehung/Semantik

 - TinyMCE anpassen (Leere `p` Tags, leere Überschriften raus, a11y Plugin (bezahlt, https://www.tiny.cloud/docs/tinymce/latest/a11ychecker/), Möglichkeiten redizieren, erlaubte Elemente einschränken)
 - Ggf. "einfach" erkennbare Probleme per `modifyFrontendPage` Hook abfangen, entfernen/korrigieren
 - Ggf. automatische Validierung von "einfach" erkennbaren Problemen im Backend (beforesubmit_callback o.Ä.)

## Focus
Kombination aus Outline und Shadow verwenden, damit es sowohl auf hellen und dunklen Hintergünden funktioniert. Ggf. mit dotted.

## Skip-Links
Sich widerholende Bereich wie Header etc. sollen überspringbar sein. 
TODO: Umsetzung noch zu beschreiben
