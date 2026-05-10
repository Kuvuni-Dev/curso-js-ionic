/**
 * @file bucles.demo.js
 * @description Demo interactivo: Bucles for y while.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Bucles</h2>
      <p class="js-subtitle">
        Compara <code>for</code> y <code>while</code> para iterar colecciones y rangos,
        entendiendo cuándo conviene cada uno.
      </p>

      <div class="js-section-title">Laboratorio interactivo</div>
      <ion-item>
        <ion-label position="stacked">Número de iteraciones</ion-label>
        <ion-input id="loop-n" type="number" value="5"></ion-input>
      </ion-item>

      <ion-button expand="block" id="loop-for">Ejecutar for</ion-button>
      <ion-button expand="block" fill="outline" id="loop-while">Ejecutar while</ion-button>

      <div id="bucles-output" class="js-output" style="min-height:70px;">Pulsa un botón para iterar.</div>

      <div class="js-section-title">Fragmento base</div>
      <pre class="js-code-panel">for (let i = 0; i < n; i++) {
  // ...
}

let i = 0;
while (i < n) {
  // ...
  i++;
}</pre>
    </section>
  `;
}

export function init(root) {
  const out = root.querySelector('#bucles-output');
  const getN = () => Math.max(0, Number(root.querySelector('#loop-n').value));

  root.querySelector('#loop-for').addEventListener('click', () => {
    const n = getN();
    const items = [];
    for (let i = 0; i < n; i++) items.push(i);
    out.innerHTML = `<strong>for:</strong> ${items.join(', ') || '(sin iteraciones)'}`;
  });

  root.querySelector('#loop-while').addEventListener('click', () => {
    const n = getN();
    const items = [];
    let i = 0;
    while (i < n) {
      items.push(i);
      i++;
    }
    out.innerHTML = `<strong>while:</strong> ${items.join(', ') || '(sin iteraciones)'}`;
  });
}
