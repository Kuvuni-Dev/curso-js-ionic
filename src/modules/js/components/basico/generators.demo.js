/**
 * @file generators.demo.js
 * @description Demo interactivo: Funciones generadoras (function*, yield).
 */

// Utilidad: Consola simulada
class SimulatedConsole {
  constructor() { this.logs = []; }
  log(...args) { this.logs.push({ type: 'log', message: args.map(a => String(a)).join(' ') }); }
  warn(...args) { this.logs.push({ type: 'warn', message: args.map(a => String(a)).join(' ') }); }
  error(...args) { this.logs.push({ type: 'error', message: args.map(a => String(a)).join(' ') }); }
  clear() { this.logs = []; }
  render() { return this.logs.slice(-8).map(l => `<span style="color: ${l.type === 'error' ? '#d32f2f' : l.type === 'warn' ? '#f57c00' : '#1976d2'}">${l.type === 'error' ? '❌' : l.type === 'warn' ? '⚠️' : '✓'} ${l.message}</span>`).join('<br>'); }
}

// Generadores
function* contarHasta(n) {
  for (let i = 1; i <= n; i++) {
    yield i;
  }
}

function* secuenciaFibonacci(max) {
  let [a, b] = [0, 1];
  while (a <= max) {
    yield a;
    [a, b] = [b, a + b];
  }
}

function* generarIds(prefijo) {
  let contador = 0;
  while (true) {
    yield `${prefijo}-${++contador}`;
  }
}

function* procesarArray(arr, fn) {
  for (const item of arr) {
    yield fn(item);
  }
}

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Generators (Funciones generadoras)</h2>
      <p class="js-subtitle">
        Un <strong>generator</strong> es una función especial que puede pausar su ejecución
        con <code>yield</code> y reanudarse después. Devuelve un iterador que genera valores bajo demanda,
        perfecto para secuencias infinitas o datos complejos.
      </p>

      <!-- DEMO 1: CONTAR HASTA N -->
      <div class="js-section-title">1. Contar desde 1 hasta N</div>
      <ion-item>
        <ion-label position="stacked">Límite (1-100)</ion-label>
        <ion-input id="gen-limite" type="number" value="10" min="1" max="100"></ion-input>
      </ion-item>
      <ion-button expand="block" id="btn-contar">Generar secuencia</ion-button>
      <div id="gen-out1" class="js-output" style="min-height:50px;"></div>

      <!-- DEMO 2: FIBONACCI -->
      <div class="js-section-title">2. Secuencia Fibonacci hasta N</div>
      <ion-item>
        <ion-label position="stacked">Máximo valor (1-10000)</ion-label>
        <ion-input id="gen-fib-max" type="number" value="100" min="1" max="10000"></ion-input>
      </ion-item>
      <ion-button expand="block" id="btn-fib">Generar Fibonacci</ion-button>
      <div id="gen-out2" class="js-output" style="min-height:50px;"></div>

      <!-- DEMO 3: GENERADOR INFINITO (IDs) -->
      <div class="js-section-title">3. Generador infinito: ID automático</div>
      <ion-item>
        <ion-label position="stacked">Prefijo</ion-label>
        <ion-input id="gen-prefijo" value="USER"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Cantidad de IDs</ion-label>
        <ion-input id="gen-cantidad" type="number" value="5" min="1" max="20"></ion-input>
      </ion-item>
      <ion-button expand="block" id="btn-ids">Generar IDs</ion-button>
      <div id="gen-out3" class="js-output" style="min-height:50px;"></div>

      <!-- DEMO 4: TRANSFORMAR ARRAY -->
      <div class="js-section-title">4. Transformar array con generator</div>
      <ion-button expand="block" size="small" color="secondary" id="btn-transform">Elevar al cuadrado [1,2,3,4,5]</ion-button>
      <div id="gen-out4" class="js-output" style="min-height:50px;"></div>

      <!-- MINI-RETOS -->
      <div class="js-section-title">🎯 Mini-retos</div>
      <div class="js-mini-retos-box">
        <strong>Reto 1:</strong> Crea un generator que genere pares infinitamente<br>
        <strong>Reto 2:</strong> ¿Qué diferencia hay entre generator y función normal?<br>
        <strong>Reto 3:</strong> Usa un generator para simular una cola (queue)
      </div>

      <!-- CONSOLA SIMULADA -->
      <div class="js-section-title">Consola simulada</div>
      <div id="gen-console" style="
        background: #1e1e1e;
        color: #d4d4d4;
        padding: 12px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        font-size: 12px;
        max-height: 100px;
        overflow-y: auto;
        border: 1px solid #333;
      ">
        <div style="color: #888;">// Selecciona una operación para ver la salida</div>
      </div>

      <div class="js-section-title">Fragmento base</div>
      <pre class="js-code-panel">// Definición de generator
function* contarHasta(n) {
  for (let i = 1; i <= n; i++) {
    yield i;  // Pausa aquí y devuelve i
  }
}

// Uso
const gen = contarHasta(3);
console.log(gen.next());      // { value: 1, done: false }
console.log(gen.next());      // { value: 2, done: false }
console.log(gen.next());      // { value: 3, done: false }
console.log(gen.next());      // { value: undefined, done: true }

// O usando for...of (más fácil)
for (const numero of contarHasta(3)) {
  console.log(numero);        // 1, 2, 3
}</pre>
    </section>
  `;
}

export function init(root) {
  const simConsole = new SimulatedConsole();
  const consoleDisplay = root.querySelector('#gen-console');

  const updateConsole = () => {
    consoleDisplay.innerHTML = simConsole.render() || '<div style="color: #888;">// Vacío</div>';
  };

  // DEMO 1: Contar
  root.querySelector('#btn-contar').addEventListener('click', () => {
    simConsole.clear();
    try {
      const limite = Number(root.querySelector('#gen-limite').value);
      if (isNaN(limite) || limite < 1 || limite > 100) throw new Error('Limite debe ser 1-100');

      const secuencia = [];
      for (const num of contarHasta(limite)) {
        secuencia.push(num);
      }

      simConsole.log(`function* contarHasta(${limite})`);
      simConsole.log(`Generados: [${secuencia.join(', ')}]`);
      updateConsole();

      root.querySelector('#gen-out1').innerHTML = `
        <code>for (const num of contarHasta(${limite})) { ... }</code><br>
        → <strong style="color:var(--ion-color-success)">[${secuencia.join(', ')}]</strong>
      `;
    } catch (e) {
      simConsole.error(e.message);
      updateConsole();
      root.querySelector('#gen-out1').innerHTML = `❌ Error: ${e.message}`;
    }
  });

  // DEMO 2: Fibonacci
  root.querySelector('#btn-fib').addEventListener('click', () => {
    simConsole.clear();
    try {
      const max = Number(root.querySelector('#gen-fib-max').value);
      if (isNaN(max) || max < 1 || max > 10000) throw new Error('Máximo debe ser 1-10000');

      const fib = [];
      for (const num of secuenciaFibonacci(max)) {
        fib.push(num);
      }

      simConsole.log(`function* secuenciaFibonacci(${max})`);
      simConsole.log(`Generados: [${fib.join(', ')}]`);
      updateConsole();

      root.querySelector('#gen-out2').innerHTML = `
        <code>for (const num of secuenciaFibonacci(${max})) { ... }</code><br>
        → <strong style="color:var(--ion-color-primary)">[${fib.join(', ')}]</strong>
      `;
    } catch (e) {
      simConsole.error(e.message);
      updateConsole();
      root.querySelector('#gen-out2').innerHTML = `❌ Error: ${e.message}`;
    }
  });

  // DEMO 3: IDs infinitos
  root.querySelector('#btn-ids').addEventListener('click', () => {
    simConsole.clear();
    try {
      const prefijo = root.querySelector('#gen-prefijo').value || 'ID';
      const cantidad = Number(root.querySelector('#gen-cantidad').value);
      if (isNaN(cantidad) || cantidad < 1 || cantidad > 20) throw new Error('Cantidad debe ser 1-20');

      const ids = [];
      const gen = generarIds(prefijo);
      for (let i = 0; i < cantidad; i++) {
        ids.push(gen.next().value);
      }

      simConsole.log(`function* generarIds("${prefijo}")`);
      simConsole.log(`Generados: ${cantidad} IDs`);
      updateConsole();

      root.querySelector('#gen-out3').innerHTML = `
        <code>const gen = generarIds("${prefijo}");<br>
        for (let i = 0; i < ${cantidad}; i++) { ... }</code><br>
        → <strong style="color:var(--ion-color-secondary)">[${ids.join(', ')}]</strong>
      `;
    } catch (e) {
      simConsole.error(e.message);
      updateConsole();
      root.querySelector('#gen-out3').innerHTML = `❌ Error: ${e.message}`;
    }
  });

  // DEMO 4: Transformar array
  root.querySelector('#btn-transform').addEventListener('click', () => {
    simConsole.clear();
    const arr = [1, 2, 3, 4, 5];
    const transformado = [];
    for (const valor of procesarArray(arr, x => x * x)) {
      transformado.push(valor);
    }

    simConsole.log(`procesarArray([${arr.join(', ')}], x => x * x)`);
    simConsole.log(`Resultado: [${transformado.join(', ')}]`);
    updateConsole();

    root.querySelector('#gen-out4').innerHTML = `
      <code>for (const v of procesarArray([${arr.join(', ')}], x => x * x)) { ... }</code><br>
      → <strong style="color:var(--ion-color-tertiary)">[${transformado.join(', ')}]</strong>
    `;
  });
}

