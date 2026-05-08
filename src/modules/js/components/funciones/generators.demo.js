/**
 * @file generators.demo.js
 * @description Demo interactivo: Generators e Iterators en JavaScript.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Generators e Iterators</h2>
      <p class="js-subtitle">
        Un <strong>generator</strong> (<code>function*</code>) es una función que puede
        pausar su ejecución con <code>yield</code> y reanudarla más tarde con <code>.next()</code>.
        Permiten crear <strong>iteradores personalizados</strong> de forma sencilla.
      </p>

      <!-- FIBONACCI -->
      <div class="js-section-title">Generator de Fibonacci — paso a paso</div>
      <p style="font-size:14px;margin-bottom:8px;">
        Cada vez que pulsas <em>Siguiente</em> se invoca <code>fib.next()</code>
        y el generator produce el siguiente número de la secuencia.
      </p>
      <div class="js-controls">
        <ion-button id="btn-fib-next" color="primary" size="small">
          <ion-icon slot="start" name="play-outline"></ion-icon>
          Siguiente
        </ion-button>
        <ion-button id="btn-fib-reset" color="medium" fill="outline" size="small">
          <ion-icon slot="start" name="refresh-outline"></ion-icon>
          Reiniciar
        </ion-button>
      </div>
      <div id="fib-trail" class="js-gen-trail"></div>
      <div id="fib-state" class="js-output" style="margin-top:8px;">
        Pulsa <em>Siguiente</em> para empezar.
      </div>

      <!-- RANGE ITERATOR -->
      <div class="js-section-title">Generator de rango (range)</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:8px;">
        <div>
          <div style="font-size:12px;color:var(--ion-color-medium);margin-bottom:4px;">Inicio</div>
          <input id="range-start" type="number" value="1"  class="js-input" />
        </div>
        <div>
          <div style="font-size:12px;color:var(--ion-color-medium);margin-bottom:4px;">Fin</div>
          <input id="range-end" type="number" value="10" class="js-input" />
        </div>
        <div>
          <div style="font-size:12px;color:var(--ion-color-medium);margin-bottom:4px;">Paso</div>
          <input id="range-step" type="number" value="2"  class="js-input" />
        </div>
      </div>
      <div class="js-controls">
        <ion-button id="btn-range" color="secondary" size="small">
          Generar rango
        </ion-button>
      </div>
      <div id="range-output" class="js-output"></div>

      <!-- CÓDIGO -->
      <div class="js-section-title">El código detrás</div>
      <pre class="js-code-panel">// function* declara un generator
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {          // infinito — el consumer controla cuánto consume
    yield a;              // pausa aquí y devuelve 'a'
    [a, b] = [b, a + b];  // se reanuda aquí en el siguiente .next()
  }
}

const fib = fibonacci();
fib.next(); // { value: 0, done: false }
fib.next(); // { value: 1, done: false }
fib.next(); // { value: 1, done: false }
fib.next(); // { value: 2, done: false }

// ─────────────────────────────────────────────────────
// Generator de rango finito
function* range(start, end, step = 1) {
  for (let i = start; i <= end; i += step) {
    yield i;
  }
  // sin yield → { value: undefined, done: true }
}

// Los generators son iterables → se pueden usar en for...of
for (const n of range(1, 10, 2)) {
  console.log(n); // 1, 3, 5, 7, 9
}

// O con spread (¡cuidado con generators infinitos!)
const primerosCinco = [...range(1, 10)].slice(0, 5); // [1,2,3,4,5]</pre>
    </section>
  `;
}

export function init(root) {
  // Generator de Fibonacci
  function* fibonacci() {
    let [a, b] = [0, 1];
    while (true) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  // Generator de rango finito
  function* range(start, end, step = 1) {
    for (let i = start; i <= end; i += step) yield i;
  }

  let fibGen = fibonacci();
  let fibCount = 0;
  const trail = root.querySelector('#fib-trail');
  const state = root.querySelector('#fib-state');

  function resetFib() {
    fibGen = fibonacci();
    fibCount = 0;
    trail.innerHTML = '';
    state.innerHTML = 'Pulsa <em>Siguiente</em> para empezar.';
  }

  root.querySelector('#btn-fib-next').addEventListener('click', () => {
    const { value, done } = fibGen.next();
    fibCount++;
    if (!done) {
      const chip = document.createElement('div');
      chip.className = 'js-gen-val';
      chip.textContent = value;
      trail.appendChild(chip);
      state.innerHTML = `
        Llamada #${fibCount}: <code>fib.next()</code> →
        <strong>{ value: ${value}, done: false }</strong>`;
    }
  });

  root.querySelector('#btn-fib-reset').addEventListener('click', resetFib);

  // Rango
  root.querySelector('#btn-range').addEventListener('click', () => {
    const start = Number(root.querySelector('#range-start').value) || 0;
    const end   = Number(root.querySelector('#range-end').value)   || 10;
    const step  = Number(root.querySelector('#range-step').value)  || 1;

    if (step <= 0) {
      root.querySelector('#range-output').innerHTML = '⚠️ El paso debe ser mayor que 0.';
      return;
    }

    const valores = [...range(start, end, step)];
    const chips = valores.map(v => `<div class="js-gen-val">${v}</div>`).join('');
    root.querySelector('#range-output').innerHTML = `
      <code>range(${start}, ${end}, ${step})</code> produjo ${valores.length} valores:<br>
      <div class="js-gen-trail" style="margin-top:8px;">${chips}</div>
      <code style="font-size:12px;">[${valores.join(', ')}]</code>
    `;
  });
}
