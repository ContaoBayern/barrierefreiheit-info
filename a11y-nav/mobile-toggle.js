/*!
Dieses Skript basiert auf dem Werk von zoglo / Sebastian Zoglowek, lizenziert unter CC BY-SA 4.0
Original: (https://github.com/contao/contao-demo/blob/5.3.x/files/contaodemo/theme/src/js/script.js)
Änderungen: aktuell noch keine, evtl. geplant: Mehrsprachigkeit
Lizenz: https://creativecommons.org/licenses/by-sa/4.0/
*/

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
