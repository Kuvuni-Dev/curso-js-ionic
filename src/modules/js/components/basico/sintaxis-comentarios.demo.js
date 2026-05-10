/**
 * @file sintaxis-comentarios.demo.js
 * @description Demo interactivo: Sintaxis y comentarios en JavaScript.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Sintaxis y comentarios</h2>
      <p class="js-subtitle">
        Domina reglas mínimas de sintaxis para evitar errores frecuentes y mejora la
        legibilidad con comentarios bien usados.
      </p>

      <div class="js-section-title">Laboratorio rápido</div>
      <div class="js-controls">
        <ion-button size="small" color="primary" id="exp-case">Case-sensitive</ion-button>
        <ion-button size="small" color="secondary" id="exp-comments">Comentarios</ion-button>
      </div>
      <div id="sintaxis-output" class="js-output" style="min-height:70px;">Pulsa un botón para ejecutar.</div>

      <div class="js-section-title">Fragmento base</div>
      <pre class="js-code-panel">const usuario = 'Ana';
const Usuario = 'Luis';

// Comentario de una línea
/* Comentario
   de varias líneas */

console.log(usuario, Usuario);</pre>
    </section>
  `;
}

export function init(root) {
  const out = root.querySelector('#sintaxis-output');

  root.querySelector('#exp-case').addEventListener('click', () => {
    const usuario = 'Ana';
    const Usuario = 'Luis';
    out.innerHTML = `
      <pre class="js-code-panel">const usuario = 'Ana';
const Usuario = 'Luis';
console.log(usuario, Usuario); // Ana Luis</pre>
      JavaScript distingue mayúsculas y minúsculas: son identificadores diferentes.
    `;
  });

  root.querySelector('#exp-comments').addEventListener('click', () => {
    out.innerHTML = `
      <pre class="js-code-panel">// Comentario de una línea
const curso = 'JavaScript';

/* Comentario
   de múltiples líneas */
console.log(curso);</pre>
      Los comentarios documentan intención y facilitan mantenimiento.
    `;
  });
}
