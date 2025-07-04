/*!
Dieses Skript basiert auf dem Werk von zoglo / Sebastian Zoglowek, lizenziert unter CC BY-SA 4.0
Original: (https://github.com/contao/contao-demo/blob/5.3.x/files/contaodemo/theme/src/js/a11y-nav.js)
Änderungen: Desktop Focus-Trap in Untermenüs; evtl. geplant: Mehrsprachigkeit
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

	_focusTrapEventDesktop(event){
        if (!(event.key === 'Tab' || event.keyCode === 9))
            return
		if (!this.navigation.contains(document.activeElement))
			return

		if(document.activeElement.classList.contains('btn-toggle-submenu')) {
			if(document.activeElement.ariaExpanded === 'true'){
				const submenu = document.activeElement.closest('li').querySelector('ul');
				if (submenu) {
					if(event.shiftKey){
						const lastItem = submenu.querySelector(':scope > li:last-child > a, :scope > li:last-child > button');
						if (lastItem) {
							event.preventDefault();
							lastItem.focus();
						}
					}else{
						const firstItem = submenu.querySelector(':scope > li:first-child > a, :scope > li:first-child > button');
						if (firstItem) {
							event.preventDefault();
							firstItem.focus();
						}
					}
				}
				return
			}
		}

		let currentUL = event.target.closest('ul');
		if (!currentUL || !this.navigation.contains(currentUL))
			return

		if(!currentUL.parentElement.closest('ul'))
			return

		const items = currentUL.querySelectorAll(':scope > li > a, :scope > li > button');
		const firstItem = currentUL.previousElementSibling || items[0];
		const lastItem = items[items.length - 1];

		if (document.activeElement === lastItem && !event.shiftKey) {
			event.preventDefault();
			firstItem?.focus();
		}

		if (document.activeElement === firstItem && event.shiftKey) {
			event.preventDefault();
			lastItem?.focus();
		}

	}

    /**
     * Adds and removes the focusTrap based on the mobile navigation state
     *
     * @private
     */
    _focusMenu() {
        // consider the navigation state from scripts.js
        const state = document.body.classList.contains('show-nav-mobile') || window.innerWidth >= this.options.minWidth

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
        this._initDesktopToggleEvents()

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

	_initDesktopToggleEvents() {
		this._initFocusTrapTargets()
		this._focusTrapEvent = this._focusTrapEvent.bind(this)
		if(window.innerWidth >= this.options.minWidth) {
			document.addEventListener('keydown', (e) => {this._focusTrapEventDesktop(e)}, false)
		}
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
