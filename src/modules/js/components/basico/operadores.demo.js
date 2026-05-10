/**
 * @file operadores.demo.js
 * @description Demo interactivo: Operadores aritméticos y de comparación.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Operadores</h2>
      <p class="js-subtitle">
        Practica operadores aritméticos y de comparación para construir expresiones
        seguras y fáciles de leer.
      </p>

      <div class="js-section-title">Calculadora interactiva</div>
      <ion-item>
        <ion-label position="stacked">A</ion-label>
        <ion-input id="op-a" type="number" value="10"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">B</ion-label>
        <ion-input id="op-b" type="number" value="3"></ion-input>
      </ion-item>

      <ion-segment id="op-kind" value="arit">
        <ion-segment-button value="arit"><ion-label>Aritmética</ion-label></ion-segment-button>
        <ion-segment-button value="comp"><ion-label>Comparación</ion-label></ion-segment-button>
      </ion-segment>

      <ion-button expand="block" id="op-run">Calcular</ion-button>
      <div id="operadores-output" class="js-output" style="min-height:70px;">Pulsa Calcular para ver resultados.</div>

      <div class="js-section-title">Fragmento base</div>
      <pre class="js-code-panel">const a = 10;
const b = 3;

// Aritméticos
a + b; a - b; a * b; a / b; a % b;

// Comparación estricta
a === b;
a !== b;</pre>
    </section>
  `;
}

export function init(root) {
  const out = root.querySelector('#operadores-output');

  root.querySelector('#op-run').addEventListener('click', () => {
    const a = Number(root.querySelector('#op-a').value);
    const b = Number(root.querySelector('#op-b').value);
    const kind = root.querySelector('#op-kind').value;

    if (kind === 'arit') {
      out.innerHTML = `+ ${a + b}<br>- ${a - b}<br>* ${a * b}<br>/ ${b === 0 ? 'NaN' : a / b}<br>% ${b === 0 ? 'NaN' : a % b}`;
      return;
    }

    out.innerHTML = `a === b -> ${a === b}<br>a !== b -> ${a !== b}<br>a > b -> ${a > b}<br>a < b -> ${a < b}`;
  });
}
