/**
 * @file spread-rest.demo.js
 * @description Demo interactivo: Spread (...) y Rest (...) en JavaScript.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Spread y Rest (<code>...</code>)</h2>
      <p class="js-subtitle">
        El operador <code>...</code> tiene dos roles según el contexto:
        <strong>spread</strong> (expandir) cuando se usa en llamadas o literales,
        y <strong>rest</strong> (recoger) cuando se usa en parámetros o destructuring.
      </p>

      <!-- SPREAD EN ARRAYS -->
      <div class="js-section-title">Spread en arrays</div>
      <div class="js-controls">
        <ion-button size="small" color="primary"   id="btn-spread-clone">Clonar array</ion-button>
        <ion-button size="small" color="secondary" id="btn-spread-merge">Combinar arrays</ion-button>
        <ion-button size="small" color="tertiary"  id="btn-spread-insert">Insertar en medio</ion-button>
        <ion-button size="small" color="success"   id="btn-spread-math">Spread en Math.max</ion-button>
      </div>
      <div id="arr-out" class="js-output" style="min-height:50px;">👆 Pulsa una operación.</div>

      <!-- SPREAD EN OBJETOS -->
      <div class="js-section-title">Spread en objetos</div>
      <div class="js-controls">
        <ion-button size="small" color="primary"   id="btn-obj-clone">Clonar objeto</ion-button>
        <ion-button size="small" color="secondary" id="btn-obj-merge">Combinar objetos</ion-button>
        <ion-button size="small" color="danger"    id="btn-obj-override">Sobreescribir propiedad</ion-button>
      </div>
      <div id="obj-out" class="js-output" style="min-height:50px;">👆 Pulsa una operación.</div>

      <!-- REST EN FUNCIONES -->
      <div class="js-section-title">Rest en parámetros de función</div>
      <div style="margin-bottom:8px;">
        <div style="font-size:12px;color:var(--ion-color-medium);margin-bottom:4px;">
          Introduce números separados por coma
        </div>
        <input id="rest-input" type="text" value="5, 3, 8, 1, 9, 2" class="js-input" />
      </div>
      <div class="js-controls">
        <ion-button size="small" color="primary"   id="btn-rest-sum">suma(...nums)</ion-button>
        <ion-button size="small" color="secondary" id="btn-rest-max">maximo(...nums)</ion-button>
        <ion-button size="small" color="success"   id="btn-rest-log">registrar(etiqueta, ...items)</ion-button>
      </div>
      <div id="rest-out" class="js-output" style="min-height:50px;"></div>

      <!-- RESUMEN -->
      <div class="js-section-title">Spread vs Rest — la misma sintaxis, roles distintos</div>
      <pre class="js-code-panel">// SPREAD — expandir (en llamadas y literales)
const a = [1, 2, 3];
const b = [4, 5, 6];

const combinado = [...a, ...b];        // [1,2,3,4,5,6]
Math.max(...a);                         // 3  (equivale a Math.max(1,2,3))
const copia = { ...objeto };           // copia superficial del objeto

// REST — recoger (en parámetros y destructuring)
function suma(...nums) {               // recoge todos los args en un array
  return nums.reduce((a, b) => a + b, 0);
}
suma(1, 2, 3, 4, 5);                   // 15

const [primero, ...resto] = [1,2,3,4]; // primero=1, resto=[2,3,4]
const { a: x, ...sinA } = { a:1, b:2, c:3 }; // sinA={b:2,c:3}

// ⚠️ El rest SIEMPRE debe ir al final
// function fn(a, b, ...resto) ✅
// function fn(...resto, a)    ❌ SyntaxError</pre>
    </section>
  `;
}

export function init(root) {
  const arrOut  = root.querySelector('#arr-out');
  const objOut  = root.querySelector('#obj-out');
  const restOut = root.querySelector('#rest-out');

  const nums1 = [1, 2, 3];
  const nums2 = [4, 5, 6];
  const obj1  = { nombre: 'Ana', edad: 28 };
  const obj2  = { ciudad: 'Madrid', pais: 'España' };

  // SPREAD EN ARRAYS
  root.querySelector('#btn-spread-clone').addEventListener('click', () => {
    const copia = [...nums1];
    copia.push(99);
    arrOut.innerHTML = `
      <pre class="js-code-panel" style="margin:0">const copia = [...nums1]; // [${nums1}]\ncopia.push(99);</pre>
      Original: <strong>[${nums1}]</strong> — no modificado<br>
      Copia:    <strong>[${copia}]</strong> — modificada independientemente
      <br><small>Spread crea una copia superficial. Los objetos anidados siguen siendo referencias compartidas.</small>`;
  });

  root.querySelector('#btn-spread-merge').addEventListener('click', () => {
    const merged = [...nums1, ...nums2];
    arrOut.innerHTML = `
      <pre class="js-code-panel" style="margin:0">const merged = [...nums1, ...nums2];</pre>
      nums1: [${nums1}]  +  nums2: [${nums2}]<br>
      resultado: <strong>[${merged}]</strong>`;
  });

  root.querySelector('#btn-spread-insert').addEventListener('click', () => {
    const extra = [10, 20];
    const result = [...nums1, ...extra, ...nums2];
    arrOut.innerHTML = `
      <pre class="js-code-panel" style="margin:0">const result = [...nums1, ...extra, ...nums2];</pre>
      [${nums1}]  +  [${extra}]  +  [${nums2}]<br>
      resultado: <strong>[${result}]</strong>`;
  });

  root.querySelector('#btn-spread-math').addEventListener('click', () => {
    const todos = [...nums1, ...nums2];
    const max = Math.max(...todos);
    arrOut.innerHTML = `
      <pre class="js-code-panel" style="margin:0">Math.max(...[${todos}]);
// equivale a: Math.max(${todos.join(', ')})</pre>
      resultado: <strong style="color:var(--ion-color-success)">${max}</strong>
      <br><small>Spread convierte el array en argumentos individuales — útil con funciones variádicas.</small>`;
  });

  // SPREAD EN OBJETOS
  root.querySelector('#btn-obj-clone').addEventListener('click', () => {
    const copia = { ...obj1 };
    copia.nombre = 'Modificado';
    objOut.innerHTML = `
      <pre class="js-code-panel" style="margin:0">const copia = { ...obj1 };\ncopia.nombre = 'Modificado';</pre>
      Original: <strong>${JSON.stringify(obj1)}</strong> — no modificado<br>
      Copia:    <strong>${JSON.stringify(copia)}</strong>`;
  });

  root.querySelector('#btn-obj-merge').addEventListener('click', () => {
    const merged = { ...obj1, ...obj2 };
    objOut.innerHTML = `
      <pre class="js-code-panel" style="margin:0">const merged = { ...obj1, ...obj2 };</pre>
      obj1: ${JSON.stringify(obj1)}<br>
      obj2: ${JSON.stringify(obj2)}<br>
      resultado: <strong>${JSON.stringify(merged)}</strong>`;
  });

  root.querySelector('#btn-obj-override').addEventListener('click', () => {
    const actualizado = { ...obj1, edad: 30, activo: true };
    objOut.innerHTML = `
      <pre class="js-code-panel" style="margin:0">const actualizado = { ...obj1, edad: 30, activo: true };</pre>
      Original: ${JSON.stringify(obj1)}<br>
      Actualizado: <strong>${JSON.stringify(actualizado)}</strong>
      <br><small>Las propiedades que aparecen después del spread sobreescriben las anteriores.</small>`;
  });

  // REST EN FUNCIONES
  function suma(...nums)    { return nums.reduce((a, b) => a + b, 0); }
  function maximo(...nums)  { return Math.max(...nums); }
  function registrar(etiqueta, ...items) { return `[${etiqueta}]: ${items.join(' | ')}`; }

  function getNumeros() {
    return root.querySelector('#rest-input').value
      .split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
  }

  root.querySelector('#btn-rest-sum').addEventListener('click', () => {
    const nums = getNumeros();
    restOut.innerHTML = `
      <pre class="js-code-panel" style="margin:0">function suma(...nums) { return nums.reduce((a,b) => a+b, 0); }\nsuma(${nums.join(', ')});</pre>
      resultado: <strong style="color:var(--ion-color-primary)">${suma(...nums)}</strong>`;
  });

  root.querySelector('#btn-rest-max').addEventListener('click', () => {
    const nums = getNumeros();
    restOut.innerHTML = `
      <pre class="js-code-panel" style="margin:0">function maximo(...nums) { return Math.max(...nums); }\nmaximo(${nums.join(', ')});</pre>
      resultado: <strong style="color:var(--ion-color-secondary)">${maximo(...nums)}</strong>`;
  });

  root.querySelector('#btn-rest-log').addEventListener('click', () => {
    const nums = getNumeros();
    const [primero, ...resto] = nums;
    const msg = registrar('Curso', ...nums);
    restOut.innerHTML = `
      <pre class="js-code-panel" style="margin:0">function registrar(etiqueta, ...items) { ... }\nregistrar('Curso', ${nums.join(', ')});</pre>
      resultado: <strong>"${msg}"</strong>
      <br><code>etiqueta</code> → "Curso" &nbsp;|&nbsp; <code>...items</code> → [${nums}]`;
  });
}
