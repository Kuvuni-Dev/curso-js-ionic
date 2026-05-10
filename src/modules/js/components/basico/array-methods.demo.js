/**
 * @file array-methods.demo.js
 * @description Demo interactivo: Métodos de array avanzados.
 */

const ALUMNOS = [
  { nombre: 'Ana',     nota: 9.5, grado: 'DAW' },
  { nombre: 'Carlos',  nota: 6.2, grado: 'DAM' },
  { nombre: 'Elena',   nota: 8.0, grado: 'DAW' },
  { nombre: 'Marcos',  nota: 4.8, grado: 'SMR' },
  { nombre: 'Laura',   nota: 7.5, grado: 'DAM' },
  { nombre: 'Diego',   nota: 9.1, grado: 'DAW' },
  { nombre: 'Sofía',   nota: 5.5, grado: 'SMR' },
  { nombre: 'Javier',  nota: 8.8, grado: 'DAM' },
];

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Array methods avanzados</h2>
      <p class="js-subtitle">
        Más allá de <code>map</code>, <code>filter</code> y <code>reduce</code>,
        JavaScript ofrece métodos muy útiles para buscar, verificar y transformar arrays.
      </p>

      <!-- DATASET -->
      <div class="js-section-title">Dataset: alumnos del curso</div>
      <div style="overflow-x:auto;margin-bottom:12px;">
        <table class="js-table">
          <thead><tr><th>Nombre</th><th>Nota</th><th>Grado</th></tr></thead>
          <tbody>
            ${ALUMNOS.map(a => `<tr><td>${a.nombre}</td><td>${a.nota}</td><td>${a.grado}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>

      <!-- MÉTODOS -->
      <div class="js-section-title">Selecciona un método</div>
      <div class="js-controls">
        <ion-button size="small" color="primary"   id="btn-find">find</ion-button>
        <ion-button size="small" color="primary"   id="btn-findindex">findIndex</ion-button>
        <ion-button size="small" color="secondary" id="btn-some">some</ion-button>
        <ion-button size="small" color="secondary" id="btn-every">every</ion-button>
        <ion-button size="small" color="tertiary"  id="btn-flat">flat / flatMap</ion-button>
        <ion-button size="small" color="success"   id="btn-at">at(-1)</ion-button>
        <ion-button size="small" color="warning"   id="btn-sort">sort (notas)</ion-button>
        <ion-button size="small" color="danger"    id="btn-includes">includes</ion-button>
      </div>
      <div id="arr-out" class="js-output" style="min-height:60px;">👆 Pulsa un método.</div>
      <pre id="arr-code" class="js-code-panel" style="display:none;"></pre>

      <!-- GUÍA RÁPIDA -->
      <div class="js-section-title">Guía rápida de métodos</div>
      <pre class="js-code-panel">// Buscar un elemento (devuelve el elemento o undefined)
arr.find(fn)         // primer elemento que cumple la condición
arr.findIndex(fn)    // índice del primer elemento que cumple la condición

// Verificar condiciones (devuelve booleano)
arr.some(fn)         // true si AL MENOS un elemento cumple la condición
arr.every(fn)        // true si TODOS los elementos cumplen la condición

// Aplanar arrays anidados
arr.flat(profundidad)        // aplana niveles de anidamiento
arr.flatMap(fn)              // map + flat(1) en un solo paso

// Acceso por índice
arr.at(0)            // equivale a arr[0]
arr.at(-1)           // último elemento (¡sin arr[arr.length-1]!)

// Ordenar (MODIFICA el array original)
arr.sort((a, b) => a - b)    // numérico ascendente
arr.sort((a, b) => b - a)    // numérico descendente

// Comprobar si existe (valor primitivo)
arr.includes(valor)  // true/false</pre>
    </section>
  `;
}

export function init(root) {
  const out  = root.querySelector('#arr-out');
  const code = root.querySelector('#arr-code');

  function show(html, codeText) {
    out.innerHTML = html;
    code.style.display = 'block';
    code.textContent = codeText;
  }

  root.querySelector('#btn-find').addEventListener('click', () => {
    const res = ALUMNOS.find(a => a.nota >= 9);
    show(
      `<code>.find(a => a.nota >= 9)</code><br>
       → primer alumno con nota ≥ 9: <strong>${res ? JSON.stringify(res) : 'undefined'}</strong>`,
      `alumnos.find(a => a.nota >= 9);\n// { nombre: '${res?.nombre}', nota: ${res?.nota}, grado: '${res?.grado}' }`
    );
  });

  root.querySelector('#btn-findindex').addEventListener('click', () => {
    const idx = ALUMNOS.findIndex(a => a.grado === 'DAM');
    show(
      `<code>.findIndex(a => a.grado === 'DAM')</code><br>
       → índice del primer alumno de DAM: <strong>${idx}</strong>
       (${ALUMNOS[idx].nombre})`,
      `alumnos.findIndex(a => a.grado === 'DAM'); // ${idx}`
    );
  });

  root.querySelector('#btn-some').addEventListener('click', () => {
    const hayAprobado = ALUMNOS.some(a => a.nota >= 5);
    const hayMatricula = ALUMNOS.some(a => a.nota === 10);
    show(
      `<code>.some(a => a.nota >= 5)</code> → <strong>${hayAprobado}</strong> (hay algún aprobado)<br>
       <code>.some(a => a.nota === 10)</code> → <strong>${hayMatricula}</strong> (hay matrícula de honor)`,
      `alumnos.some(a => a.nota >= 5);    // ${hayAprobado}\nalumnos.some(a => a.nota === 10);  // ${hayMatricula}`
    );
  });

  root.querySelector('#btn-every').addEventListener('click', () => {
    const todosAprobados = ALUMNOS.every(a => a.nota >= 5);
    const todosDAW = ALUMNOS.every(a => a.grado === 'DAW');
    show(
      `<code>.every(a => a.nota >= 5)</code> → <strong>${todosAprobados}</strong> (¿aprueban todos?)<br>
       <code>.every(a => a.grado === 'DAW')</code> → <strong>${todosDAW}</strong>`,
      `alumnos.every(a => a.nota >= 5);   // ${todosAprobados}\nalumnos.every(a => a.grado === 'DAW'); // ${todosDAW}`
    );
  });

  root.querySelector('#btn-flat').addEventListener('click', () => {
    const anidado = [[1, 2], [3, 4], [5, 6]];
    const plano = anidado.flat();
    const nombres = ALUMNOS.flatMap(a => a.nombre.split(''));
    show(
      `<code>[[1,2],[3,4],[5,6]].flat()</code> → <strong>[${plano}]</strong><br>
       <code>alumnos.flatMap(a => a.nombre.split(''))</code><br>
       → primeras 10 letras: <strong>[${nombres.slice(0, 10).join(', ')}…]</strong>`,
      `[[1,2],[3,4],[5,6]].flat(); // [${plano}]\nalumnos.flatMap(a => a.nombre.split(''));`
    );
  });

  root.querySelector('#btn-at').addEventListener('click', () => {
    const ultimo = ALUMNOS.at(-1);
    const penultimo = ALUMNOS.at(-2);
    show(
      `<code>alumnos.at(-1)</code> → <strong>${ultimo.nombre}</strong> (último)<br>
       <code>alumnos.at(-2)</code> → <strong>${penultimo.nombre}</strong> (penúltimo)<br>
       <small>Equivale a alumnos[alumnos.length - 1] pero más limpio.</small>`,
      `alumnos.at(-1); // { nombre: '${ultimo.nombre}', … }\nalumnos.at(-2); // { nombre: '${penultimo.nombre}', … }`
    );
  });

  root.querySelector('#btn-sort').addEventListener('click', () => {
    const copia = [...ALUMNOS].sort((a, b) => b.nota - a.nota);
    show(
      `<code>[...alumnos].sort((a, b) => b.nota - a.nota)</code><br>
       ${copia.map((a, i) => `${i + 1}. ${a.nombre}: <strong>${a.nota}</strong>`).join('<br>')}
       <br><small>⚠️ sort() modifica el array original. Usamos [...alumnos] para no alterarlo.</small>`,
      `[...alumnos].sort((a, b) => b.nota - a.nota);\n// Descendente: ${copia.map(a => a.nombre).join(', ')}`
    );
  });

  root.querySelector('#btn-includes').addEventListener('click', () => {
    const grados = ALUMNOS.map(a => a.grado);
    show(
      `<code>grados.includes('DAW')</code> → <strong>${grados.includes('DAW')}</strong><br>
       <code>grados.includes('ASIR')</code> → <strong>${grados.includes('ASIR')}</strong><br>
       <small>includes() usa igualdad estricta (===). Para objetos usa find() o some().</small>`,
      `grados.includes('DAW');  // ${grados.includes('DAW')}\ngrados.includes('ASIR'); // ${grados.includes('ASIR')}`
    );
  });
}
