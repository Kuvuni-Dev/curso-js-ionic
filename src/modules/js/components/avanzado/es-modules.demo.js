/**
 * @file es-modules.demo.js
 * @description Demo: import/export en ES Modules (explicación interactiva).
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>import / export (ES Modules)</h2>
      <p class="js-subtitle">
        Los <strong>ES Modules</strong> son el sistema oficial de módulos de JavaScript.
        Permiten dividir el código en archivos con scope propio, exportar lo que se necesita
        e importar solo lo que se usa.
      </p>

      <!-- TIPOS DE EXPORT -->
      <div class="js-section-title">Tipos de exportación</div>
      <div class="js-controls">
        <ion-button size="small" color="primary"   id="btn-named">Named exports</ion-button>
        <ion-button size="small" color="secondary" id="btn-default">Default export</ion-button>
        <ion-button size="small" color="tertiary"  id="btn-mixed">Combinado</ion-button>
        <ion-button size="small" color="success"   id="btn-rename">Renombrar al importar</ion-button>
        <ion-button size="small" color="warning"   id="btn-namespace">Namespace import</ion-button>
      </div>
      <div id="esm-out" class="js-output" style="min-height:120px;">👆 Selecciona un tipo de import/export.</div>

      <!-- SCOPE -->
      <div class="js-section-title">Module scope — cada módulo tiene su propio scope</div>
      <pre class="js-code-panel">// modulo-a.js
const privado = 'solo visible en este módulo';
export const publico = 'sí se puede importar';

// modulo-b.js
import { publico } from './modulo-a.js';
console.log(publico);   // ✅ "sí se puede importar"
console.log(privado);   // ❌ ReferenceError: privado is not defined

// A diferencia de los scripts tradicionales (script sin type="module"),
// las variables de módulos NO contaminan el scope global (window).
</pre>

      <!-- RE-EXPORT -->
      <div class="js-section-title">Re-exportación (index barrel)</div>
      <pre class="js-code-panel">// src/utils/index.js — re-exporta varios módulos desde un único punto
export { sumar, restar }    from './matematicas.js';
export { formatear }        from './formato.js';
export { default as Logger } from './logger.js';

// Ahora el consumidor importa desde un único punto:
import { sumar, formatear, Logger } from './utils/index.js';
// En lugar de:
// import { sumar }    from './utils/matematicas.js';
// import { formatear } from './utils/formato.js';
// …etc
</pre>

      <!-- DIFERENCIAS CON COMMONJS -->
      <div class="js-section-title">ES Modules vs CommonJS</div>
      <pre class="js-code-panel">// CommonJS (Node.js clásico)
const { sumar } = require('./matematicas');
module.exports = { sumar, restar };

// ES Modules (estándar moderno)
import { sumar } from './matematicas.js';
export { sumar, restar };

// Diferencias clave:
// ✅ ES Modules: estático → el bundler puede hacer tree-shaking
// ✅ ES Modules: cargado una sola vez y cacheado
// ✅ ES Modules: evaluación asíncrona (top-level await disponible)
// ⚠️ CommonJS: require() es síncrono y dinámico</pre>
    </section>
  `;
}

export function init(root) {
  const out = root.querySelector('#esm-out');

  const ejemplos = {
    named: {
      title: 'Named exports — múltiples exportaciones por nombre',
      code: `// matematicas.js
export function sumar(a, b)    { return a + b; }
export function restar(a, b)   { return a - b; }
export const PI = 3.14159;

// main.js — importar por nombre (las llaves son obligatorias)
import { sumar, PI } from './matematicas.js';

sumar(2, 3);  // 5
PI;           // 3.14159

// ✅ Solo se importa lo que se usa → el bundler puede eliminar el resto (tree-shaking)`,
    },
    default: {
      title: 'Default export — una exportación principal por módulo',
      code: `// calculadora.js
export default class Calculadora {
  sumar(a, b)  { return a + b; }
  restar(a, b) { return a - b; }
}

// main.js — el nombre del import puede ser cualquiera
import Calculadora from './calculadora.js';
import MiCalc from './calculadora.js';    // también válido

const calc = new Calculadora();
calc.sumar(5, 3); // 8

// ⚠️ Solo puede haber UN export default por módulo
// ✅ Se importa SIN llaves (a diferencia de named exports)`,
    },
    mixed: {
      title: 'Combinado — default + named en el mismo módulo',
      code: `// formato.js
export default function formatear(n) {
  return n.toLocaleString('es-ES');
}
export const MONEDA = '€';
export const DECIMALES = 2;

// main.js
import formatear, { MONEDA, DECIMALES } from './formato.js';
//     ↑ default     ↑ named exports

formatear(1234567);      // "1.234.567"
\`\${formatear(9.99)} \${MONEDA}\`; // "9,99 €"`,
    },
    rename: {
      title: 'Renombrar al importar con as',
      code: `// Si hay conflicto de nombres o quieres un alias:
import { sumar as add, restar as subtract } from './matematicas.js';
add(2, 3);       // 5
subtract(5, 2);  // 3

// También al exportar:
function calcularIVA(precio) { return precio * 0.21; }
export { calcularIVA as iva, calcularIVA as VAT };

// Y en re-exportaciones:
export { default as Logger } from './logger.js';`,
    },
    namespace: {
      title: 'Namespace import — importar todo como objeto',
      code: `// Importar TODOS los named exports como un namespace
import * as Mat from './matematicas.js';

Mat.sumar(2, 3);   // 5
Mat.restar(5, 2);  // 3
Mat.PI;            // 3.14159

// ⚠️ Namespace imports dificultan el tree-shaking del bundler.
//    Úsalos solo cuando necesites muchos exports del mismo módulo.

// El default export queda en Mat.default:
import * as Format from './formato.js';
Format.default(1234); // la función formatear
Format.MONEDA;        // "€"`,
    },
  };

  Object.entries(ejemplos).forEach(([key, { title, code }]) => {
    root.querySelector(`#btn-${key}`).addEventListener('click', () => {
      out.innerHTML = `<strong>${title}</strong>
        <pre class="js-code-panel" style="margin-top:8px">${code}</pre>`;
    });
  });
}
