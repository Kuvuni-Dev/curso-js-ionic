/**
 * @file iteradores.demo.js
 * @description Demo interactivo: Iteradores y Symbol.iterator en JavaScript.
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

// Iterador personalizado: Rango
class Rango {
  constructor(inicio, fin) {
    this.inicio = inicio;
    this.fin = fin;
  }

  [Symbol.iterator]() {
    let actual = this.inicio;
    const fin = this.fin;
    return {
      next() {
        if (actual <= fin) {
          return { value: actual++, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
}

// Iterador personalizado: Cuenta regresiva
class CuentaRegresiva {
  constructor(desde) {
    this.desde = desde;
  }

  [Symbol.iterator]() {
    let actual = this.desde;
    return {
      next: () => actual > 0
        ? { value: actual--, done: false }
        : { done: true }
    };
  }
}

// Iterador personalizado: Colores
class PaletaColores {
  constructor(colores) {
    this.colores = colores;
  }

  [Symbol.iterator]() {
    let indice = 0;
    const colores = this.colores;
    return {
      next: () => indice < colores.length
        ? { value: colores[indice++], done: false }
        : { done: true }
    };
  }
}

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Iteradores</h2>
      <p class="js-subtitle">
        Un <strong>iterador</strong> es un objeto que implementa <code>Symbol.iterator</code>.
        Permite iterar sobre datos personalizados con <code>for...of</code> y spread operator <code>...</code>.
        Es la base del protocolo iterable de JavaScript.
      </p>

      <!-- DEMO 1: RANGO -->
      <div class="js-section-title">1. Iterador Rango (inicio a fin)</div>
      <ion-item>
        <ion-label position="stacked">Inicio</ion-label>
        <ion-input id="it-inicio" type="number" value="1" min="0" max="100"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Fin</ion-label>
        <ion-input id="it-fin" type="number" value="5" min="0" max="100"></ion-input>
      </ion-item>
      <ion-button expand="block" id="btn-rango">Iterar rango</ion-button>
      <div id="it-out1" class="js-output" style="min-height:50px;"></div>

      <!-- DEMO 2: CUENTA REGRESIVA -->
      <div class="js-section-title">2. Iterador Cuenta Regresiva</div>
      <ion-item>
        <ion-label position="stacked">Desde (1-20)</ion-label>
        <ion-input id="it-desde" type="number" value="5" min="1" max="20"></ion-input>
      </ion-item>
      <ion-button expand="block" id="btn-regresiva">Generar cuenta regresiva</ion-button>
      <div id="it-out2" class="js-output" style="min-height:50px;"></div>

      <!-- DEMO 3: PALETA DE COLORES -->
      <div class="js-section-title">3. Iterador personalizado: Colores</div>
      <ion-button expand="block" size="small" color="secondary" id="btn-colores">Iterar paleta</ion-button>
      <div id="it-out3" class="js-output" style="min-height:50px;"></div>

      <!-- DEMO 4: ENTRADA/SALIDA DEL ITERADOR -->
      <div class="js-section-title">4. Control manual: .next()</div>
      <ion-item>
        <ion-label position="stacked">Rango (ej: 10,20)</ion-label>
        <ion-input id="it-entrada" value="10,20"></ion-input>
      </ion-item>
      <ion-button expand="block" size="small" color="primary" id="btn-manual">Llamar .next() 4 veces</ion-button>
      <div id="it-out4" class="js-output" style="min-height:50px;"></div>

      <!-- MINI-RETOS -->
      <div class="js-section-title">🎯 Mini-retos</div>
      <div class="js-mini-retos-box">
        <strong>Reto 1:</strong> Crea un iterador que genere números pares<br>
        <strong>Reto 2:</strong> ¿Por qué Symbol.iterator devuelve { next }?<br>
        <strong>Reto 3:</strong> Usa spread operator con tu iterador personalizado
      </div>

      <!-- CONSOLA SIMULADA -->
      <div class="js-section-title">Consola simulada</div>
      <div id="it-console" style="
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
      <pre class="js-code-panel">// Crear un iterador personalizado
class Rango {
  constructor(inicio, fin) {
    this.inicio = inicio;
    this.fin = fin;
  }

  [Symbol.iterator]() {
    let actual = this.inicio;
    const fin = this.fin;
    return {
      next() {
        if (actual <= fin) {
          return { value: actual++, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
}

// Usar con for...of
for (const num of new Rango(1, 5)) {
  console.log(num);          // 1, 2, 3, 4, 5
}

// Usar con spread operator
const arr = [...new Rango(1, 3)];  // [1, 2, 3]</pre>
    </section>
  `;
}

export function init(root) {
  const simConsole = new SimulatedConsole();
  const consoleDisplay = root.querySelector('#it-console');

  const updateConsole = () => {
    consoleDisplay.innerHTML = simConsole.render() || '<div style="color: #888;">// Vacío</div>';
  };

  // DEMO 1: Rango
  root.querySelector('#btn-rango').addEventListener('click', () => {
    simConsole.clear();
    try {
      const inicio = Number(root.querySelector('#it-inicio').value);
      const fin = Number(root.querySelector('#it-fin').value);

      if (isNaN(inicio) || isNaN(fin)) throw new Error('Ingresa números válidos');
      if (inicio > fin) throw new Error('Inicio debe ser ≤ Fin');

      const valores = [];
      for (const num of new Rango(inicio, fin)) {
        valores.push(num);
      }

      simConsole.log(`class Rango(${inicio}, ${fin})`);
      simConsole.log(`for...of: [${valores.join(', ')}]`);
      updateConsole();

      root.querySelector('#it-out1').innerHTML = `
        <code>for (const num of new Rango(${inicio}, ${fin})) { ... }</code><br>
        → <strong style="color:var(--ion-color-success)">[${valores.join(', ')}]</strong>
      `;
    } catch (e) {
      simConsole.error(e.message);
      updateConsole();
      root.querySelector('#it-out1').innerHTML = `❌ Error: ${e.message}`;
    }
  });

  // DEMO 2: Cuenta regresiva
  root.querySelector('#btn-regresiva').addEventListener('click', () => {
    simConsole.clear();
    try {
      const desde = Number(root.querySelector('#it-desde').value);

      if (isNaN(desde) || desde < 1 || desde > 20) throw new Error('Desde debe ser 1-20');

      const valores = [];
      for (const num of new CuentaRegresiva(desde)) {
        valores.push(num);
      }

      simConsole.log(`class CuentaRegresiva(${desde})`);
      simConsole.log(`Secuencia: [${valores.join(', ')}]`);
      updateConsole();

      root.querySelector('#it-out2').innerHTML = `
        <code>for (const num of new CuentaRegresiva(${desde})) { ... }</code><br>
        → <strong style="color:var(--ion-color-primary)">[${valores.join(', ')}]</strong>
      `;
    } catch (e) {
      simConsole.error(e.message);
      updateConsole();
      root.querySelector('#it-out2').innerHTML = `❌ Error: ${e.message}`;
    }
  });

  // DEMO 3: Colores
  root.querySelector('#btn-colores').addEventListener('click', () => {
    simConsole.clear();
    const colores = ['🔴 Rojo', '🟢 Verde', '🔵 Azul', '🟡 Amarillo'];
    const paleta = new PaletaColores(colores);
    const resultado = [];

    for (const color of paleta) {
      resultado.push(color);
    }

    simConsole.log(`class PaletaColores([${colores.length} colores])`);
    simConsole.log(`Iterados: ${resultado.length} elementos`);
    updateConsole();

    root.querySelector('#it-out3').innerHTML = `
      <code>for (const color of new PaletaColores(colores)) { ... }</code><br>
      → ${resultado.map(c => `<strong>${c}</strong>`).join(' ')}
    `;
  });

  // DEMO 4: Manual next()
  root.querySelector('#btn-manual').addEventListener('click', () => {
    simConsole.clear();
    try {
      const input = root.querySelector('#it-entrada').value;
      const [inicio, fin] = input.split(',').map(n => {
        const parsed = Number(n.trim());
        if (isNaN(parsed)) throw new Error(`"${n}" no es un número`);
        return parsed;
      });

      const rango = new Rango(inicio, fin);
      const iterador = rango[Symbol.iterator]();
      const llamadas = [];

      for (let i = 0; i < 4; i++) {
        const result = iterador.next();
        llamadas.push(result);
        simConsole.log(`Llamada ${i + 1}: { value: ${result.value}, done: ${result.done} }`);
      }
      updateConsole();

      root.querySelector('#it-out4').innerHTML = `
        <code>const iter = new Rango(${inicio}, ${fin})[Symbol.iterator]();</code><br>
        ${llamadas.map((r, i) => `Llamada ${i + 1}: { value: <strong>${r.value !== undefined ? r.value : '∅'}</strong>, done: ${r.done} }`).join('<br>')}
      `;
    } catch (e) {
      simConsole.error(e.message);
      updateConsole();
      root.querySelector('#it-out4').innerHTML = `❌ Error: ${e.message}`;
    }
  });
}

