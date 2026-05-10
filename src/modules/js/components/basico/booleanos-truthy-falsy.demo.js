/**
 * @file booleanos-truthy-falsy.demo.js
 * @description Demo interactivo: Booleanos, truthy y falsy.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Booleanos, truthy y falsy</h2>
      <p class="js-subtitle">
        Entiende cómo JavaScript convierte valores a booleano en condiciones y evita
        decisiones erróneas por coerción implícita.
      </p>

      <div class="js-section-title">Laboratorio interactivo</div>

      <ion-segment id="bool-value" value="0">
        <ion-segment-button value="0"><ion-label>0</ion-label></ion-segment-button>
        <ion-segment-button value="texto"><ion-label>'texto'</ion-label></ion-segment-button>
        <ion-segment-button value="null"><ion-label>null</ion-label></ion-segment-button>
        <ion-segment-button value="false"><ion-label>false</ion-label></ion-segment-button>
      </ion-segment>

      <ion-button expand="block" id="bool-run">Evaluar</ion-button>
      <div id="booleanos-output" class="js-output" style="min-height:70px;">Selecciona un valor y pulsa Evaluar.</div>

      <div class="js-section-title">Fragmento base</div>
      <pre class="js-code-panel">Boolean(0);        // false
Boolean('texto');  // true
Boolean(null);     // false
Boolean(false);    // false

if (valor) {
  // truthy
} else {
  // falsy
}</pre>
    </section>
  `;
}

export function init(root) {
  const out = root.querySelector('#booleanos-output');

  root.querySelector('#bool-run').addEventListener('click', () => {
    const option = root.querySelector('#bool-value').value;
    let valor;

    if (option === '0') valor = 0;
    if (option === 'texto') valor = 'texto';
    if (option === 'null') valor = null;
    if (option === 'false') valor = false;

    out.innerHTML = `Valor: <code>${String(valor)}</code><br>Boolean(valor): <strong>${Boolean(valor)}</strong>`;
  });
}
