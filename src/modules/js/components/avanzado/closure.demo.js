/**
 * @file closure.demo.js
 * @description Demo interactivo: Closures y scope léxico.
 * El alumno crea contadores independientes para ver cómo cada closure
 * mantiene su propio estado privado.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Closures y scope léxico</h2>
      <p class="js-subtitle">
        Una <strong>closure</strong> es una función que recuerda el entorno léxico
        donde fue creada, aunque ese entorno ya no esté activo. Esto permite
        encapsular estado privado de forma elegante.
      </p>

      <!-- FÁBRICA DE CONTADORES -->
      <div class="js-section-title">Fábrica de contadores independientes</div>
      <p style="font-size:14px;margin-bottom:8px;">
        Cada vez que pulsas <em>Nuevo contador</em> se invoca <code>makeCounter()</code>.
        Cada llamada crea su propio <code>count</code> en memoria — los contadores son completamente independientes.
      </p>
      <div class="js-controls">
        <ion-button id="btn-new-counter" color="primary" size="small">
          <ion-icon slot="start" name="add-outline"></ion-icon>
          Nuevo contador
        </ion-button>
        <ion-button id="btn-reset-counters" color="medium" fill="outline" size="small">
          <ion-icon slot="start" name="trash-outline"></ion-icon>
          Limpiar
        </ion-button>
      </div>
      <div id="counter-grid" class="js-counter-grid"></div>

      <!-- CÓDIGO EXPLICADO -->
      <div class="js-section-title">El código detrás</div>
      <pre class="js-code-panel">// makeCounter devuelve un OBJETO que contiene dos funciones.
// Ambas comparten la variable 'count' del scope de makeCounter.
function makeCounter(initial = 0) {
  let count = initial;   // variable "privada" del closure

  return {
    increment() { count++; return count; },
    decrement() { count--; return count; },
    value()     { return count; },
  };
}

// Cada llamada a makeCounter crea su propio 'count' en memoria:
const c1 = makeCounter();     // count = 0
const c2 = makeCounter(10);   // count = 10  (independiente de c1)

c1.increment(); // 1
c1.increment(); // 2
c2.increment(); // 11  — c2 NO se vio afectado por c1</pre>

      <!-- CLOSURE PARA ESTADO PRIVADO -->
      <div class="js-section-title">Closure para estado privado</div>
      <p style="font-size:14px;margin-bottom:8px;">
        Las variables del scope exterior son <em>inaccesibles desde fuera</em>.
        Intenta acceder directamente y observa el resultado:
      </p>
      <div class="js-controls">
        <ion-button id="btn-test-private" color="secondary" size="small">
          Probar acceso directo a <code>count</code>
        </ion-button>
      </div>
      <div id="private-output" class="js-output" style="display:none;"></div>

      <!-- CONCEPTO CLAVE -->
      <div class="js-section-title">Concepto clave</div>
      <pre class="js-code-panel">// El scope léxico determina qué variables ve una función.
// Una closure "cierra" sobre las variables de su scope exterior
// y las mantiene vivas aunque la función externa haya terminado.

// Casos de uso frecuentes:
// ✅ Encapsular estado privado
// ✅ Fábricas de funciones (makeAdder, makeCounter…)
// ✅ Callbacks que necesitan recordar contexto
// ✅ Memoización (cachear resultados)</pre>
    </section>
  `;
}

export function init(root) {
  let counterCount = 0;
  const grid = root.querySelector('#counter-grid');

  // Fábrica de contadores (el patrón que se enseña)
  function makeCounter(initial = 0) {
    let count = initial;
    return {
      increment() { count++; return count; },
      decrement() { count--; return count; },
      value()     { return count; },
    };
  }

  function addCounter() {
    counterCount++;
    const id = `c${counterCount}`;
    const counter = makeCounter();

    const card = document.createElement('div');
    card.className = 'js-counter-card';
    card.id = id;
    card.innerHTML = `
      <div style="font-size:11px;color:var(--ion-color-medium);margin-bottom:4px;">
        makeCounter() #${counterCount}
      </div>
      <div class="js-counter-val" id="${id}-val">0</div>
      <div style="display:flex;gap:6px;justify-content:center;margin-top:8px;">
        <ion-button size="small" fill="outline" color="danger" data-action="dec" data-target="${id}">−</ion-button>
        <ion-button size="small" fill="outline" color="success" data-action="inc" data-target="${id}">+</ion-button>
      </div>
    `;

    // Guardamos la instancia del closure en un atributo del nodo
    card._counter = counter;
    grid.appendChild(card);

    card.querySelectorAll('[data-action]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.action === 'inc'
          ? counter.increment()
          : counter.decrement();
        card.querySelector(`#${id}-val`).textContent = val;
      });
    });
  }

  root.querySelector('#btn-new-counter').addEventListener('click', addCounter);
  root.querySelector('#btn-reset-counters').addEventListener('click', () => {
    grid.innerHTML = '';
    counterCount = 0;
  });

  root.querySelector('#btn-test-private').addEventListener('click', () => {
    const out = root.querySelector('#private-output');
    out.style.display = 'block';
    // 'count' no es accesible desde fuera — solo a través de .value()
    const demoCounter = makeCounter(42);
    out.innerHTML = `
      <strong>Resultado del experimento:</strong><br>
      <code>typeof count</code> → <span style="color:var(--ion-color-danger)">"undefined"</span>
      — la variable <code>count</code> no existe en el scope global.<br><br>
      <code>demoCounter.value()</code> → <span style="color:var(--ion-color-success)">
        ${demoCounter.value()}
      </span> — solo se puede leer a través de la API pública del closure. ✅
    `;
  });

  // Crear dos contadores de ejemplo al cargar
  addCounter();
  addCounter();
}
