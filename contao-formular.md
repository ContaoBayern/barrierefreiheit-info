# Anforderungen
## Semantische Struktur und Reihenfolge:
- Mehrteilige-Formulare sollten durch inhaltlich zusammengehörige Gruppen mit dem <fieldset>-Element im HTML-Quelltext strukturiert werden.
- Eine saubere HTML-Struktur ist entscheidend, damit Screenreader die Formularelemente, ihre Rolle (z.B. Checkbox, Button), ihren Namen und ihren Zustand (z.B. ausgewählt, erweitert) korrekt interpretieren und ausgeben können.
- Alle Formularelemente auf eine logische und benutzerfreundliche Reihenfolge prüfen.  
## Fehlerbehandlung und Validierung:
- Automatisch erkannte Eingabefehler müssen in einer schriftlichen Fehlermeldung einen klaren Hinweis auf das fehlerhafte Element geben.
- Es sollten Korrekturempfehlungen für falsche Benutzereingaben angegeben werden.
- Vermeidung von Captchas: Grafische Captchas sollten vermieden oder eine barrierefreie Alternative bereitgestellt werden, da sie für Menschen mit Sehbehinderungen problematisch sind
- Bei allen Formularfeldern auf die richtige Validierung achten. Fehlermeldungen müssen sprechend sein.
- ### Lösungen für Contao 5
- Live Valedierung: [FormValidation Bundle für Contao 4 / Contao 5 Trilobit](https://extensions.contao.org/?q=formular&pages=3&p=trilobit-gmbh/contao-formvalidation-bundle)
- Fehlertext pro Feld: [Extended Form Fields-Fritz](https://extensions.contao.org/?q=extended%20form%20fields&pages=1&p=inspiredminds%2Fcontao-extended-form-fields)

## Zeitliche Begrenzungen:
- Es sollte keine Zeitbegrenzung für die Eingabe geben, es sei denn, Nutzer können diese Begrenzung abschalten oder anpassen.
- Wenn eine Sitzung abläuft, sollten Nutzer nach erneuter Anmeldung ihre Aktivität ohne Datenverlust fortführen können.
- Nutzer sollten gewarnt werden, wenn eine Unterbrechung zum Datenverlust führen könnte, sofern die Eingaben nicht für mindestens 20 Stunden erhalten bleiben

## Identifizierungs- und Zahlungsfunktionen: 
Im elektronischen Geschäftsverkehr müssen Identifizierungs-, Authentifizierungs-, Sicherheits- und Zahlungsfunktionen wahrnehmbar, bedienbar, verständlich und robust gestaltet werden. Es sollten Alternativen zur biometrischen Identifizierung angeboten werden.

## Konsistenz: 
Die Funktionalitäten innerhalb des Formulars und der gesamten Website sollten konsistent sein.

## Farbe und Kontrast: 
Interaktive Elemente sollten sich farblich abheben. Es ist wichtig, einen ausreichenden Kontrast zwischen Schriftfarbe und Hintergrundfarbe zu gewährleisten (mindestens 4,5:1 für normalen Text, 3:1 für große Schrift). Farbe sollte niemals das einzige Mittel zur Vermittlung von Informationen sein, um Menschen mit Farbfehlsichtigkeit nicht auszuschließen.

## role="tooltip" und aria-describedby (zusätzliche Möglichkeit)
- Tooltips funktionieren gleichermaßen bei Mausberührung und Tastaturfokus. Sie werden jedoch nur angezeigt, wenn das Element fokussiert ist. Dass ein Tooltip vorhanden ist, wird durch ein Icon signalisiert. Solche Visualisierungen sind eigentlich eine Aufgabe des Browsers. Der Zusatztext, der über aria-describedby verknüpft wird, macht klar, dass er den Linktext ergänzt. Um die redundante Ausgabe der Tooltip-Texte in Screenreadern zu vermeiden, ist die Zuweisung des aria-hidden-Attributs erforderlich. Die Einblendung des Tooltips am Bildschirm wird über das aria-hidden-Attribut und ein entsprechender CSS-Selektor gesteuert.

  
**aria-describedby:**
Das Attribut aria-describedby wird verwendet, um einem Element anzugeben, dass es durch den Inhalt eines anderen Elements beschrieben wird. Es hilft dabei, zusätzliche Informationen für assistive Technologien bereitzustellen.
In Verbindung mit einem Tooltip gibt aria-describedby an, dass der Tooltip den Button, Input oder das interaktive Element beschreibt.  

```
<button aria-describedby="tooltip1">Informationen anzeigen</button>
<div id="tooltip1" role="tooltip">Dies sind zusätzliche Informationen, die der Benutzer sehen kann.</div>
```
```
<input aria-describedby="tooltip2"> type="text" name="name" id="ctrl_16" class="text" value="">
<div id="tooltip2" role="tooltip">Dies sind zusätzliche Informationen, die der Benutzer sehen kann.</div>
```

## Status eines Feldes
- Checkbox
- Radio-Button-Menü
- Select-Menü

Screenreader lesen automatisch den Zustand von z.B. <input type="checkbox"> vor. Es benötigt 
Das allein ist oft schon ausreichend, wenn die Checkbox einfach sichtbar und korrekt beschriftet ist.

**Wichtig dabei:**

- Nutze <label>-Elemente, die mit der Checkbox verbunden sind.
- Achte auf kontrastreiche Darstellung.
- Nutze die Attribute checked, disabled oder readonly nur sinnvoll, da Screenreader diese Zustände ebenfalls ansagen.

Willst du zusätzlich eine Statusmeldung vorlesen lassen (z. B. „Newsletter wurde abonniert“), kannst du ein sogenanntes ARIA-Live-Region-Element verwenden. 

```
<label>
  <input type="checkbox" id="newsletter" name="newsletter" onchange="updateStatus()">
  Newsletter abonnieren
</label>

<div id="statusMessage" aria-live="polite" style="position: absolute; left: -9999px;"></div>

<script>
function updateStatus() {
  const checkbox = document.getElementById('newsletter');
  const status = document.getElementById('statusMessage');
  
  if (checkbox.checked) {
    status.textContent = 'Newsletter wurde abonniert.';
  } else {
    status.textContent = 'Newsletter wurde abbestellt.';
  }
}
</script>

```

## Uploads?


## IDs für formualrfelder + area-labeledby für formularfeld explanation?


