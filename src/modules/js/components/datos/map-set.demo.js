/**
 * @file map-set.demo.js
 * @description Demo interactivo: Map y Set en JavaScript.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Map y Set</h2>
      <p class="js-subtitle">
        <strong>Map</strong> es una colección de pares clave-valor donde las claves pueden
        ser de cualquier tipo. <strong>Set</strong> es una colección de valores únicos.
        Ambos son iterables y más potentes que los objetos/arrays en ciertos casos.
      </p>

      <!-- MAP -->
      <div class="js-section-title">Map — contador de palabras</div>
      <p style="font-size:14px;margin-bottom:8px;">
        Escribe un texto y verás un mapa de frecuencias de palabras en tiempo real.
      </p>
      <textarea id="map-input" class="js-input" rows="3"
        placeholder="Escribe aquí…">JavaScript es genial y JavaScript tiene closures y closures son poderosos</textarea>
      <div class="js-controls">
        <ion-button size="small" color="primary" id="btn-count">Contar palabras</ion-button>
      </div>
      <div id="map-freq" style="margin-top:8px;"></div>

      <!-- MAP VS OBJETO -->
      <div class="js-section-title">Map vs Objeto — diferencias clave</div>
      <pre class="js-code-panel">// ✅ Map puede usar cualquier tipo como clave
const m = new Map();
m.set('texto', 1);
m.set(42, 'número como clave');
m.set(true, 'booleano como clave');
m.set({ id: 1 }, 'objeto como clave');  // ⚠️ por referencia

m.get('texto');  // 1
m.size;          // 4 — propiedad, no método
m.has(42);       // true
m.delete(42);

// Iterar un Map (orden de inserción garantizado)
for (const [clave, valor] of m) {
  console.log(clave, '→', valor);
}

// Objeto literal como "mapa" — limitaciones:
const obj = {};
obj[42]    = 'clave';   // clave se convierte en string "42"
obj[true]  = 'clave';   // clave se convierte en string "true"
// No hay .size, no hay garantía de orden en todas las implementaciones</pre>

      <!-- SET -->
      <div class="js-section-title">Set — deduplicar valores</div>
      <p style="font-size:14px;margin-bottom:8px;">
        Introduce valores separados por coma. El Set eliminará los duplicados automáticamente.
      </p>
      <div style="margin-bottom:8px;">
        <input id="set-input" type="text" class="js-input"
          value="manzana, naranja, manzana, pera, naranja, kiwi, pera" />
      </div>
      <div class="js-controls">
        <ion-button size="small" color="secondary" id="btn-dedup">Deduplicar con Set</ion-button>
        <ion-button size="small" color="tertiary"  id="btn-set-ops">Operaciones de conjunto</ion-button>
      </div>
      <div id="set-out" class="js-output" style="min-height:50px;"></div>

      <!-- SET CÓDIGO -->
      <pre class="js-code-panel">// Crear un Set (solo valores únicos)
const set = new Set([1, 2, 2, 3, 3, 3]);
// Set { 1, 2, 3 }

set.add(4);   // Set { 1, 2, 3, 4 }
set.has(2);   // true
set.delete(1);
set.size;     // 3

// Convertir a array
const arr = [...set];     // [2, 3, 4]
const arr2 = Array.from(set);

// Deduplicar array fácilmente
const unico = [...new Set([1, 2, 2, 3, 1])]; // [1, 2, 3]

// Operaciones de conjunto con arrays + Set
const A = new Set([1, 2, 3, 4]);
const B = new Set([3, 4, 5, 6]);

const union        = new Set([...A, ...B]);    // {1,2,3,4,5,6}
const interseccion = new Set([...A].filter(x => B.has(x))); // {3,4}
const diferencia   = new Set([...A].filter(x => !B.has(x))); // {1,2}</pre>
    </section>
  `;
}

export function init(root) {
  // MAP: contador de palabras
  root.querySelector('#btn-count').addEventListener('click', () => {
    const texto = root.querySelector('#map-input').value;
    const palabras = texto.toLowerCase().match(/\w+/g) || [];
    const frecuencia = new Map();
    for (const p of palabras) {
      frecuencia.set(p, (frecuencia.get(p) || 0) + 1);
    }

    const maxFreq = Math.max(...frecuencia.values());
    const sorted = [...frecuencia.entries()].sort((a, b) => b[1] - a[1]);

    const container = root.querySelector('#map-freq');
    container.innerHTML = `
      <div style="font-size:12px;color:var(--ion-color-medium);margin-bottom:6px;">
        Map con ${frecuencia.size} entradas únicas (${palabras.length} palabras total):
      </div>
      ${sorted.map(([palabra, count]) => `
        <div class="js-freq-bar">
          <span style="min-width:90px;font-size:13px;">${palabra}</span>
          <div class="js-freq-fill" style="width:${(count / maxFreq) * 160}px;"></div>
          <span style="font-family:monospace;font-size:12px;">${count}</span>
        </div>
      `).join('')}
    `;
  });

  // SET: deduplicar
  root.querySelector('#btn-dedup').addEventListener('click', () => {
    const input = root.querySelector('#set-input').value;
    const items = input.split(',').map(s => s.trim()).filter(Boolean);
    const set = new Set(items);
    const unico = [...set];

    root.querySelector('#set-out').innerHTML = `
      <code>new Set([${items.map(i => `"${i}"`).join(', ')}])</code><br>
      Antes: <strong>${items.length} elementos</strong> — [${items.join(', ')}]<br>
      Después: <strong>${unico.length} únicos</strong> — [${unico.join(', ')}]
      <br><small>Eliminados ${items.length - unico.length} duplicado(s).</small>
    `;
  });

  root.querySelector('#btn-set-ops').addEventListener('click', () => {
    const A = new Set([1, 2, 3, 4, 5]);
    const B = new Set([3, 4, 5, 6, 7]);
    const union        = new Set([...A, ...B]);
    const interseccion = new Set([...A].filter(x => B.has(x)));
    const diferencia   = new Set([...A].filter(x => !B.has(x)));

    root.querySelector('#set-out').innerHTML = `
      A = {${[...A].join(', ')}} &nbsp; B = {${[...B].join(', ')}}<br><br>
      <strong>Unión</strong> (A ∪ B): {${[...union].join(', ')}}<br>
      <pre class="js-code-panel" style="margin:4px 0">new Set([...A, ...B]);</pre>
      <strong>Intersección</strong> (A ∩ B): {${[...interseccion].join(', ')}}<br>
      <pre class="js-code-panel" style="margin:4px 0">new Set([...A].filter(x => B.has(x)));</pre>
      <strong>Diferencia</strong> (A − B): {${[...diferencia].join(', ')}}<br>
      <pre class="js-code-panel" style="margin:4px 0">new Set([...A].filter(x => !B.has(x)));</pre>
    `;
  });

  // Auto-ejecutar contador
  root.querySelector('#btn-count').click();
}
