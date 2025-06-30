# Barrierefreiheit - Fragen

## Navigationsmodul - ARIA-Label Insert-Tags werden nicht ersetzt

Wenn man nur ein Navigationsmodul für mehrere Sprachen verwenden möchte, könnte man das ARIA-Label mit Contao Insert-Tags versehen, um die Bezeichnung in der jeweiligen Sprache anzuzeigen.
```
{{iflng::en}}Main menu{{iflng::de}}Hauptmenü{{iflng}}
```
Standardmäßig funktioniert das allerdings nicht, da die Insert-Tags hier nicht ersetzt werden.

> [!NOTE]
> [Pull-Request um dies im Modul zu ermöglichen](https://github.com/contao/contao/pull/8497) abgelehnt. Kann stattdessen aber per Template-Anpassung ermöglicht werden.

```php
<?php
// templates/mod_navigation.html5

$this->extend('mod_navigation');

$this->wrapperAttributes = $this->attr()
    ->setIfExists('aria-label', \Contao\System::getContainer()->get('contao.insert_tag.parser')->replaceInline($this->ariaLabel))
    ->mergeWith($this->wrapperAttributes)
;
```