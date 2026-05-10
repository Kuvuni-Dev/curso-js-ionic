/**
 * @file numbers-math.demo.js
 * @description Demo interactivo: Numbers y objeto Math.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Números y Math</h2>
      <p class="js-subtitle">
        Practica operaciones numéricas básicas, el operador módulo y utilidades
        frecuentes del objeto <code>Math</code>.
      </p>

      <div class="js-section-title">Laboratorio interactivo</div>

      <ion-item>
        <ion-label position="stacked">A</ion-label>
        <ion-input id="num-a" type="number" value="10"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">B</ion-label>
        <ion-input id="num-b" type="number" value="4"></ion-input>
      </ion-item>

      <ion-button expand="block" id="num-run">Calcular</ion-button>
      <div id="numbers-output" class="js-output" style="min-height:70px;">Pulsa Calcular para ver los resultados.</div>

      <div class="js-section-title">Fragmento base</div>
      <pre class="js-code-panel">const a = 10;
const b = 4;

a + b;
a - b;
a * b;
a / b;
a % b;

Math.max(a, b);
Math.min(a, b);</pre>
    </section>
  `;
}

export function init(root) {
  const out = root.querySelector('#numbers-output');

  root.querySelector('#num-run').addEventListener('click', () => {
    const a = Number(root.querySelector('#num-a').value);
    const b = Number(root.querySelector('#num-b').value);

    out.innerHTML = `
      a + b = ${a + b}<br>
      a - b = ${a - b}<br>
      a * b = ${a * b}<br>
      a / b = ${b === 0 ? 'NaN' : a / b}<br>
      a % b = ${b === 0 ? 'NaN' : a % b}<br>
      Math.max(a,b) = ${Math.max(a, b)}<br>
      Math.min(a,b) = ${Math.min(a, b)}
    `;
  });
}
