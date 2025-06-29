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
```js

/*! 
Dieses Skript basiert auf dem Werk von zoglo / Sebastian Zoglowek, lizenziert unter CC BY-SA 4.0
Original: (https://github.com/contao/contao-demo/blob/5.3.x/files/contaodemo/theme/src/js/a11y-nav.js)
Änderungen: aktuell noch keine, evtl. geplant: Änderungen, dass man nach dem letzten Punkt des Submenüs zurück zum Button, anstatt auf den nächsten Menüpunkt springt, Mehrsprachigkeit
Lizenz: https://creativecommons.org/licenses/by-sa/4.0/
*/

class A11yNav {
    constructor(options) {
        this.options = this._merge({
            selector: 'header .nav-main',
            toggle: 'header .nav-toggle',
            minWidth: 1024,
            classes: {
                submenuButton: 'btn-toggle-submenu',
                expand: 'nav-expanded'
            },
            ariaLabels: {
                'main': 'Main menu',
                'expand': 'Expand menu: ',
                'collapse': 'Collapse menu: '
            }
        }, options || {})

        this.navigation = document.querySelector(this.options.selector)
        this.toggle = document.querySelector(this.options.toggle)

        if (!this.navigation) {
            return
        }

        this.dropdowns = []
        this.active = []

        this._init()

        this.dropdowns.forEach(dropdown => {
            this._initDropdown(dropdown)
        })
    }

    /**
     * Merges configuration options and replaces them if they exist
     *
     * @private
     */
    _merge(a, b) {
        return [...new Set([...Object.keys(a), ...Object.keys(b)])].reduce((result, key) => ({
            ...result,
            [key]: "object" === typeof (a[key]) ? Object.assign({}, a[key], b[key]) : !b[key] ? a[key] : b[key]
        }), {})
    }

    /**
     * Placeholder button that is cloned for each submenu item
     *
     * @private
     */
    _createSubMenuButton() {
        this.btn = document.createElement('button')
        this.btn.classList.add(this.options.classes.submenuButton)
        this.btn.ariaHasPopup = 'true'
        this.btn.ariaExpanded = 'false'
    }

    /**
     * Determines the focus trap targets
     *
     * @private
     */
    _initFocusTrapTargets() {
        const nodes = [this.navigation.parentNode?.querySelector('a[href].logo'), ...this.navigation.querySelectorAll('a[href]:not([disabled]), button:not([disabled])')]

        this.firstFocus = nodes[0] ?? []
        this.lastFocus = nodes[nodes.length - 1] ?? []
    }

    /**
     * Handles the focus trap on the open mobile navigation
     *
     * @private
     */
    _focusTrapEvent(event) {
        if (!(event.key === 'Tab' || event.keyCode === 9))
            return

        if (document.activeElement === this.lastFocus && !event.shiftKey) {
            event.preventDefault()
            this.firstFocus?.focus()
        }

        if (document.activeElement === this.firstFocus && event.shiftKey) {
            event.preventDefault()
            this.lastFocus?.focus()
        }
    }

    /**
     * Adds and removes the focusTrap based on the mobile navigation state
     *
     * @private
     */
    _focusMenu() {
        // consider the navigation state from scripts.js
        const state = document.body.classList.contains('show-nav-mobile')

        if (state)
            document.addEventListener('keydown', this._focusTrapEvent, false)
        else
            document.removeEventListener('keydown', this._focusTrapEvent, false)
    }

    /**
     * Initializes navigation items and sets aria-attributes if they do not exist
     *
     * @private
     */
    _init() {
        this._createSubMenuButton()
        this._initMobileToggleEvents()

        if (!this.navigation.ariaLabel) {
            this.navigation.ariaLabel = this.options.ariaLabels.main
        }

        this.navigation.querySelectorAll('li').forEach(item => {

            if (item.classList.contains('submenu')) {
                this.dropdowns.push(item)
            }

            const navItem = item.firstElementChild

            if (navItem.classList.contains('active')) {
                navItem.ariaCurrent = 'page'
            }

            if (!navItem.ariaLabel && navItem.title) {
                navItem.ariaLabel = navItem.title
                navItem.removeAttribute('title')
            }
        })

        // Hide the active navigation on escape
        document.addEventListener('keyup', (e) => {
            e.key === 'Escape' && this._hideDropdown()
        })
    }

    /**
     * Updates the aria labels and state for the dropdown buttons
     *
     * @private
     */
    _updateAriaState(dropdown, show) {
        dropdown.btn.ariaLabel = (show ? this.options.ariaLabels.collapse : this.options.ariaLabels.expand) + dropdown.btn.dataset.label
        dropdown.btn.ariaExpanded = show ? 'true' : 'false'
    }

    /**
     * Collapses the dropdown
     *
     * @private
     */
    _collapseSubmenu(dropdown) {
        dropdown.classList.remove(this.options.classes.expand)
        this._updateAriaState(dropdown, false)
    }

    /**
     * Handles hiding dropdowns. Adding no parameter will close all
     *
     * @private
     */
    _hideDropdown(dropdown = null) {
        if (0 === this.active.length) return

        // Case 1: Leaving the previous dropdown (e.g. focus left)
        if (this.active.includes(dropdown)) {
            this._collapseSubmenu(dropdown)
            this.active = this.active.filter(node => node !== dropdown)
        }

        // Case 2: Not contained in the tree at all, remove everything
        else if (null === dropdown || this.active[0] !== dropdown && !this.active[0].contains(dropdown)) {
            this.active.forEach(node => this._collapseSubmenu(node))
            this.active = []
        }

        // Case 3: Down the drain with everything that ain't a parent node :)
        else {
            this.active.filter(node => {
                if (node.contains(dropdown)) {
                    return true
                }

                this._collapseSubmenu(node)
                return false
            })
        }
    }

    /**
     * Shows the dropdown
     *
     * @private
     */
    _showDropdown(dropdown) {
        this._hideDropdown(dropdown)

        dropdown.classList.add(this.options.classes.expand)
        this._updateAriaState(dropdown, true)

        if (!this.active.includes(dropdown)) {
            this.active.push(dropdown)
        }
    }

    /**
     * Updates the dropdown state
     *
     * @private
     */
    _toggleDropdownState(dropdown, show) {
        show ? this._showDropdown(dropdown) : this._hideDropdown(dropdown)
    }

    /**
     * Adds a submenu button that toggles submenu navigations
     *
     * @private
     */
    _addSubMenuButton(dropdown) {
        const item = dropdown.firstElementChild,
              btn = this.btn.cloneNode()

        dropdown.btn = btn

        btn.dataset.label = item.textContent
        btn.ariaLabel = this.options.ariaLabels.expand + item.textContent

        btn.addEventListener('click', () => {
            const show = btn.ariaExpanded === 'false' ?? true
            this._toggleDropdownState(dropdown, show)
        })

        item.after(btn)
    }

    /**
     * Mouse enter event for dropdowns
     *
     * @private
     */
    _mouseEnter(e, dropdown) {
        this._toggleDropdownState(dropdown, true)
    }

    /**
     * Mouse leave event for dropdowns
     *
     * @private
     */
    _mouseLeave(e, dropdown) {
        this._hideDropdown(dropdown)
    }

    /**
     * Listener for the focusout event when an element loses it's focus, necessary for tab control
     *
     * @private
     */
    _focusOut(e, dropdown) {
        if (e.relatedTarget && this.active.length > 0 && !dropdown.contains(e.relatedTarget)) {
            this._hideDropdown(dropdown)
        }
    }

    _initMobileToggleEvents() {
        this._initFocusTrapTargets()
        this._focusTrapEvent = this._focusTrapEvent.bind(this)

        this.toggle?.addEventListener('click', () => {
            if (window.innerWidth < this.options.minWidth)
                this._focusMenu()
        })
    }

    /**
     * Initializes the dropdown
     *
     * @private
     */
    _initDropdown(dropdown) {
        this._addSubMenuButton(dropdown)

        const minWidth = window.innerWidth >= this.options.minWidth

        dropdown.addEventListener('mouseenter', e => { minWidth && this._mouseEnter(e, dropdown) })
        dropdown.addEventListener('mouseleave', e => { minWidth && this._mouseLeave(e, dropdown) })
        dropdown.addEventListener('focusout', e => { minWidth && this._focusOut(e, dropdown) })
    }
}
```
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
