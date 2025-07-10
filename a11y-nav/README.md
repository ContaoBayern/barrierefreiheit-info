Einfügen im Seitenlayout unter Eigener JavaScript-Code.

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

die JS Datei **a11y-nav.js** über Externe JavaScripts hinzufügen
