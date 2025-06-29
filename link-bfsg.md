# Links und BFSG

Barrierefreie (externe) Links sind ein wichtiger Bestandteil einer zugänglichen Webseite, da sie Menschen mit verschiedenen Einschränkungen die Navigation und das Verständnis erleichtern. Die folgenden Anforderungen und Aspekte sollten beachtet werden:

1.  **Aussagekräftige und unterscheidbare Linktexte:**
    *   Der Linktext sollte das Ziel und den Zweck des Links entweder direkt aus sich selbst heraus oder aus dem unmittelbaren Kontext erkennen lassen. Dies ist besonders wichtig für blinde Menschen, die Screenreader nutzen und von Link zu Link springen können, wobei ihnen nur die Linktexte vorgelesen werden.
    *   Uninformative Formulierungen wie „hier klicken“ oder „mehr“ sollten vermieden werden, insbesondere wenn sie mehrfach auf einer Seite vorkommen und zu unterschiedlichen Inhalten führen.
        *   Ein anschauliches Beispiel für einen aussagekräftigen Linktext wäre: „Lesen Sie den Artikel zum Thema barrierefreie Farbkontraste auf der Webseite der Beratungsstelle Barrierefreiheit“.
    *   Die Bezeichnung von Links sollte über die gesamte Webseite hinweg **konsistent** sein, wenn sie auf dieselbe Seite verweisen (z. B. immer „Kontakt“ statt abwechselnd „Schreiben Sie uns“).

2.  **Informationen zu Dateiformaten bei Verlinkung auf Dateien:**
    *   Wird auf eine Datei (z.B. ein PDF) statt auf eine andere Webseite verlinkt, sollte das Dateiformat im Linktext angegeben werden.
    *   Idealerweise sollten die verlinkten Dateien selbst barrierefrei sein. Falls nicht, ist es hilfreich anzugeben, dass es sich um eine nicht barrierefreie Datei handelt (z.B. „Download Merkblatt Alternativtexte (barrierefreies PDF)“).

3.  **Tastaturbedienung und visueller Fokus:**
    *   Alle Verlinkungen auf einer Webseite müssen **mit der Tastatur erreichbar** sein. Dies kann durch Navigieren mit der Tabulatortaste getestet werden.
    *   Es muss ein **visuelles Feedback** geben, wenn ein Link mit der Tastatur angesprungen wird, z.B. durch eine Umrahmung, Unterstreichung oder Farb- und Formveränderung.
    *   Die Fokus-Reihenfolge der Links sollte logisch sein.
    *   Es sollte keine bestimmte Zeiteinteilung für einzelne Tastanschläge erforderlich sein. Der Tastaturfokus darf bei keinem Element blockiert sein, und Nutzende müssen jedes Element mit der Tastatur ansteuern und verlassen können.

**Klickbare Bereiche auf Mobilgeräten:**

Für die mobile Nutzung sollten Links und Schaltflächen ausreichend Abstand zueinander haben und mindestens 24 Pixel hoch und breit sein, um die Bedienung mit dem Finger auf Tablets oder Smartphones zu erleichtern.

**HTML-Struktur und ARIA-Attribute**

*   Das `aria-label`-Attribut kann verwendet werden, um einem Element, das keinen sichtbaren Textinhalt hat (z.B. ein Button mit einem SVG-Icon), einen zugänglichen Namen zu geben.
*   `aria-labelledby` ist gegenüber `aria-label` zu bevorzugen, wenn ein sichtbares Label im DOM existiert, das referenziert werden kann. Beide Attribute bieten einen zugänglichen Namen.
*   `aria-label` ist hauptsächlich für assistive Technologien gedacht und sollte nicht übermäßig verwendet werden; wichtige Informationen sollten für alle Benutzer sichtbar sein.

---

### Zu 1.:

Nicht immer steht der Platz zur Verfügung, im Linktext alle Informationen zur Verfügung zu stellen. Vor allem, wenn dieser z.B. als Button formatiert ist. So ist z.B. auch oft über den Linktext nicht zu erkennen das es sich um eine Verlinkung zu einer externen Seite handelt.

*   Verlinkungen zu externen Seiten sollten sich visuell unterscheiden
*   Als Info dem Screenreader zur Verfügung stehen.

**Wenn das nicht geht:**

```html
<a href="[https://de.wikipedia.org](https://de.wikipedia.org)" target="_blank" rel="noopener noreferrer">
    Wikipedia (Externer Link, öffnet in neuem Tab)
</a>
````

### Lösungen:

**Screenreader: `aria-labelledby`**

```html
<a href="[https://de.wikipedia.org](https://de.wikipedia.org)" target="_blank" rel="noopener noreferrer" aria-labelledby="link-desc">
    Wikipedia
</a>
<span id="link-desc" class="visually-hidden">
    Externer Link zu Wikipedia öffnet in neuem Tab.
</span>
```

```css
.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}
```

**Warum `aria-labelledby` und nicht `aria-label`\!**

`aria-labelledby` ist gegenüber `aria-label` zu bevorzugen, wenn ein sichtbares Label im DOM existiert, das referenziert werden kann. Beide Attribute bieten einen zugänglichen Namen.

### Nötige Optimierung von Contao Modulen:

1.  TinyMCE
2.  Hyperlink

Beiden müsste die Möglichkeit zur Verfügung gestellt werden, **`aria-labelledby`** zu verwenden.

**Inhaltselement hyperlink - Für Andreas**

Im Modul Hyperlink müsste dazu ein weiteres Eingabefeld für **`aria-labelledby`** hinzugefügt werden. 
- Name:Linkbeschreibung
- Hinweistext: Informationen zum Linkziel (z.B. Externer Link zu Wikipedia öffnet in neuem Tab).
- twig-template erweitern.
- Zusätzlich benötigt es CSS, um die Beschreibung im Frontend nicht anzuzeigen (nicht `display:none`).
- Die ID muss eindeutig/einmalig sein pro Seite\! Am besten die jeweiligen ** Inhaltselement-ID ** aus tl_content
- ID muss dann auch der Wert von aria-labelledby im **a tag** sein.


**HTML-Ausgabe - content_hyperlink:**

```html
<div class="content-hyperlink">  
   <a href="[https://de.wikipedia.org](https://de.wikipedia.org)" target="_blank" rel="noopener noreferrer" aria-labelledby="link-desc">
       Wikipedia
   </a>
   <span id="link-desc" class="visually-hidden">
       Externer Link zu Wikipedia öffnet in neuem Tab.
   </span>
</div>
```

```css
.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}
```

**TinyMCE**

  * Manuell über die Codeansicht.
  * Gibt es eine bessere Lösung?

[https://www.tiny.cloud/docs/tinymce/latest/accessibility/](https://www.tiny.cloud/docs/tinymce/latest/accessibility/)

```
```
