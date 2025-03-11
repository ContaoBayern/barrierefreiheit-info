# Navigations-Lösungen 

## ARIA-Lösung bis C5.3

Template anpassen:
aria-label="<?= $this->name ?> hinzufügen. Der Name des Frontendmoduls wird als aria-label verwendet.


```<!-- indexer::stop -->
<nav class="<?= $this->class ?> block"<?= $this->cssID ?><?php if ($this->style): ?> style="<?= $this->style ?>"<?php endif; ?> aria-label="<?= $this->name ?>">

  <?php if ($this->headline): ?>
    <<?= $this->hl ?>><?= $this->headline ?></<?= $this->hl ?>>
  <?php endif; ?>

  <a href="<?= $this->request ?>#<?= $this->skipId ?>" class="invisible"><?= $this->skipNavigation ?></a>

  <?= $this->items ?>

  <span id="<?= $this->skipId ?>" class="invisible"></span>

</nav>
<!-- indexer::continue -->
```
