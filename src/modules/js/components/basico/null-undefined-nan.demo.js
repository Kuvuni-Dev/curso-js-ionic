/**
 * @file null-undefined-nan.demo.js
 * @description Demo interactivo: null, undefined y NaN.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>null, undefined y NaN</h2>
      <p class="js-subtitle">
        Diferencia claramente entre valor no asignado, ausencia intencional y resultado
        numérico inválido para evitar errores de validación.
      </p>

      <div class="js-section-title">Laboratorio interactivo</div>

      <ion-button expand="block" id="nun-run">Ejecutar ejemplos</ion-button>
      <div id="nun-output" class="js-output" style="min-height:70px;">Pulsa para ejecutar los tres casos.</div>

      <div class="js-section-title">Fragmento base</div>
      <pre class="js-code-panel">let ciudad;
console.log(ciudad); // undefined

const usuario = null;
console.log(usuario); // null

const n = Number('hola');
Number.isNaN(n); // true</pre>
    </section>
  `;
}

export function init(root) {
  const out = root.querySelector('#nun-output');

  root.querySelector('#nun-run').addEventListener('click', () => {
    let ciudad;
    const usuario = null;
    const noNumero = Number('hola');

    out.innerHTML = `
      ciudad = ${String(ciudad)} (undefined)<br>
      usuario = ${String(usuario)} (null)<br>
      Number('hola') = ${String(noNumero)}<br>
      Number.isNaN(Number('hola')) = ${Number.isNaN(noNumero)}
    `;
  });
}
