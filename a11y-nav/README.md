# Beschreibung zu a11y-nav - Barrierefreie Navigation
Einfügen im Seitenlayout 
die JS Datei `a11y-nav.js` über Externe JavaScripts hinzufügen
die JS Datei `mobile-toggle.js` über Externe JavaScripts hinzufügen

unter Eigener JavaScript-Code einfügen:

````
<script>
document.addEventListener('DOMContentLoaded', function() {
    new A11yNav({
        ariaLabels: {
            'main': 'Main menu',
            'expand': 'Expand menu: ',
            'collapse': 'Collapse menu: '
        }
    });
});
</script>
````


