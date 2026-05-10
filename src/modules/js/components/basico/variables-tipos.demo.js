/**
 * @file variables-tipos.demo.js
 * @description Demo interactivo: Variables y tipos de datos en JavaScript.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Variables y tipos de datos</h2>
      <p class="js-subtitle">
        Comprende la diferencia entre <strong>declarar</strong> y <strong>asignar</strong>,
        cuándo usar <code>const</code> o <code>let</code>, y cómo inspeccionar tipos con
        <code>typeof</code>.
      </p>

      <div class="js-section-title">Laboratorio rápido</div>
      <div class="js-controls">
        <ion-button size="small" color="primary" id="exp-const-let">const vs let</ion-button>
        <ion-button size="small" color="secondary" id="exp-types">typeof en acción</ion-button>
      </div>
      <div id="variables-output" class="js-output" style="min-height:70px;">Pulsa un botón para ejecutar.</div>

      <div class="js-section-title">Fragmento base</div>
      <pre class="js-code-panel">let edad = 18;
edad = 19; // let permite reasignar

const usuario = { nombre: 'Ana' };
usuario.nombre = 'Luis'; // permitido (mutación interna)

const valores = ['hola', 42, true, null, undefined];
valores.map(v => typeof v);</pre>
    </section>
  `;
}

export function init(root) {
  const out = root.querySelector('#variables-output');

  root.querySelector('#exp-const-let').addEventListener('click', () => {
    let edad = 18;
    edad = 19;
    const usuario = { nombre: 'Ana' };
    usuario.nombre = 'Luis';

    out.innerHTML = `
      <pre class="js-code-panel" style="margin-top:4px;">let edad = 18;
edad = 19; // OK

const usuario = { nombre: 'Ana' };
usuario.nombre = 'Luis'; // OK (mutación interna)</pre>
      <strong>Resultado:</strong> <code>let</code> permite reasignar y <code>const</code>
      protege la referencia, no el contenido del objeto.
    `;
  });

  root.querySelector('#exp-types').addEventListener('click', () => {
    const valores = ['hola', 42, true, null, undefined];
    const filas = valores.map((v) => `${String(v)} -> ${typeof v}`).join('<br>');

    out.innerHTML = `<strong>typeof:</strong><br>${filas}<br><br><small>Nota: <code>typeof null</code> devuelve <code>object</code> por un detalle histórico del lenguaje.</small>`;
  });
}
