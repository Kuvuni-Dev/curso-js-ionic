/**
 * @file promises.demo.js
 * @description Demo interactivo: Promises en JavaScript.
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

// Simula una petición asíncrona que puede resolver o rechazar
function simularPeticion(nombre, delayMs, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error(`Fallo en ${nombre}`));
      else resolve({ origen: nombre, datos: `Datos de ${nombre}` });
    }, delayMs);
  });
}

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Promises</h2>
      <p class="js-subtitle">
        Una <strong>Promise</strong> es un objeto que representa la eventual
        resolución o rechazo de una operación asíncrona. Tiene tres estados:
        <em>pending</em>, <em>fulfilled</em> y <em>rejected</em>.
      </p>

      <!-- ESTADOS -->
      <div class="js-section-title">Estados de una Promise</div>
      <pre class="js-code-panel">// Pending → aún no resuelta
const p = new Promise((resolve, reject) => {
  // … operación asíncrona …
  resolve(valor);   // fulfilled ✅
  // o
  reject(error);    // rejected ❌
});

// Una Promise solo puede cambiar de estado UNA vez.</pre>

      <!-- DEMO 1: RESOLVE / REJECT -->
      <div class="js-section-title">1. Crear y resolver una Promise</div>
      <div class="js-controls">
        <ion-button size="small" color="success" id="btn-promise-ok">Resolver (fulfilled)</ion-button>
        <ion-button size="small" color="danger"  id="btn-promise-fail">Rechazar (rejected)</ion-button>
      </div>
      <div id="p-basic-out" class="js-output" style="min-height:40px;"></div>

      <!-- DEMO 2: ENCADENAMIENTO -->
      <div class="js-section-title">2. Encadenamiento con .then()</div>
      <div class="js-controls">
        <ion-button size="small" color="primary" id="btn-chain">Ejecutar cadena</ion-button>
      </div>
      <div id="p-chain-out" class="js-output" style="min-height:40px;"></div>
      <pre class="js-code-panel">simularPeticion('API', 500)
  .then(res => { console.log('✅', res.datos); return res.datos.toUpperCase(); })
  .then(upper => console.log('Mayúsculas:', upper))
  .catch(err => console.error('Error:', err.message));
// Cada .then devuelve una nueva Promise → se pueden encadenar</pre>

      <!-- DEMO 3: PROMISE.ALL -->
      <div class="js-section-title">3. Promise.all — esperar todas en paralelo</div>
      <div class="js-controls">
        <ion-button size="small" color="secondary" id="btn-all-ok">Todas resuelven</ion-button>
        <ion-button size="small" color="danger"    id="btn-all-fail">Una falla (corta todo)</ion-button>
      </div>
      <div id="p-all-out" class="js-output" style="min-height:40px;"></div>

      <!-- DEMO 4: PROMISE.ALLSETTLED -->
      <div class="js-section-title">4. Promise.allSettled — espera todas sin cortar</div>
      <div class="js-controls">
        <ion-button size="small" color="tertiary" id="btn-settled">Ejecutar allSettled</ion-button>
      </div>
      <div id="p-settled-out" class="js-output" style="min-height:40px;"></div>
      <pre class="js-code-panel">// Promise.all   → rechaza al primer fallo (fail-fast)
// Promise.allSettled → espera todas y devuelve el estado de cada una
// Promise.race  → resuelve/rechaza con la PRIMERA que termine
// Promise.any   → resuelve con la primera que tenga éxito</pre>

      <!-- MINI-RETOS -->
      <div class="js-section-title">🎯 Mini-retos</div>
      <div class="js-mini-retos-box">
        <strong>Reto 1:</strong> ¿Cuál es la diferencia entre Promise.all y Promise.allSettled?<br>
        <strong>Reto 2:</strong> ¿Por qué el encadenamiento es más legible que callbacks anidados?<br>
        <strong>Reto 3:</strong> Crea una Promise que se rechace después de 2s
      </div>

      <!-- CONSOLA SIMULADA -->
      <div class="js-section-title">Consola simulada</div>
      <div id="p-console" style="
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
        <div style="color: #888;">// Los eventos de Promises aparecen aquí</div>
      </div>
    </section>
  `;
}

export function init(root) {
  const simConsole = new SimulatedConsole();
  const basicOut   = root.querySelector('#p-basic-out');
  const chainOut   = root.querySelector('#p-chain-out');
  const allOut     = root.querySelector('#p-all-out');
  const settledOut = root.querySelector('#p-settled-out');
  const consoleDisplay = root.querySelector('#p-console');

  function loading(el, msg = 'Ejecutando…') {
    el.innerHTML = `<span style="color:var(--ion-color-medium)">⏳ ${msg}</span>`;
  }

  const updateConsole = () => {
    consoleDisplay.innerHTML = simConsole.render() || '<div style="color: #888;">// Vacío</div>';
  };

  // 1. Básico
  root.querySelector('#btn-promise-ok').addEventListener('click', () => {
    simConsole.clear();
    loading(basicOut);
    simConsole.log('new Promise((resolve) => ...');
    simConsole.log('Estado: pending → fulfilled');
    updateConsole();
    new Promise((resolve) => setTimeout(() => resolve('¡Operación completada!'), 800))
      .then(v => {
        simConsole.log('✅ .then() callback ejecutado');
        simConsole.log(`Valor: "${v}"`);
        updateConsole();
        basicOut.innerHTML = `✅ <strong>fulfilled</strong>: "${v}"
          <br><small>El callback de <code>.then()</code> recibe el valor resuelto.</small>`;
      });
  });

  root.querySelector('#btn-promise-fail').addEventListener('click', () => {
    simConsole.clear();
    loading(basicOut);
    simConsole.log('new Promise((_, reject) => ...');
    simConsole.log('Estado: pending → rejected');
    updateConsole();
    new Promise((_, reject) => setTimeout(() => reject(new Error('Algo salió mal')), 800))
      .catch(err => {
        simConsole.error(`❌ .catch() callback ejecutado`);
        simConsole.error(`Mensaje: "${err.message}"`);
        updateConsole();
        basicOut.innerHTML = `❌ <strong>rejected</strong>: "${err.message}"
          <br><small>El callback de <code>.catch()</code> recibe el objeto Error.</small>`;
      });
  });

  // 2. Encadenamiento
  root.querySelector('#btn-chain').addEventListener('click', () => {
    loading(chainOut, 'Cadena en ejecución…');
    simularPeticion('API', 700)
      .then(res => {
        chainOut.innerHTML = `→ .then #1: <code>${res.datos}</code>`;
        return res.datos.toUpperCase();
      })
      .then(upper => {
        chainOut.innerHTML += `<br>→ .then #2: <code>${upper}</code>`;
        return upper.split(' ').length;
      })
      .then(words => {
        chainOut.innerHTML += `<br>→ .then #3: <strong style="color:var(--ion-color-success)">${words} palabra(s)</strong>`;
      });
  });

  // 3. Promise.all
  root.querySelector('#btn-all-ok').addEventListener('click', () => {
    loading(allOut, 'Lanzando 3 peticiones en paralelo…');
    const t0 = Date.now();
    Promise.all([
      simularPeticion('Servicio A', 400),
      simularPeticion('Servicio B', 600),
      simularPeticion('Servicio C', 300),
    ]).then(resultados => {
      const elapsed = Date.now() - t0;
      allOut.innerHTML = `✅ <strong>Promise.all</strong> resolvió en ${elapsed}ms<br>
        ${resultados.map(r => `→ ${r.datos}`).join('<br>')}
        <br><small>Nota: 3 peticiones en paralelo (600ms máx.) en lugar de secuenciales (1300ms).</small>`;
    });
  });

  root.querySelector('#btn-all-fail').addEventListener('click', () => {
    loading(allOut, 'Lanzando peticiones (una fallará)…');
    Promise.all([
      simularPeticion('Servicio A', 300),
      simularPeticion('Servicio B', 500, true), // fallará
      simularPeticion('Servicio C', 400),
    ]).then(() => {
      allOut.innerHTML = '✅ Todas resolvieron.';
    }).catch(err => {
      allOut.innerHTML = `❌ <strong>Promise.all cortó</strong> en cuanto falló uno: "${err.message}"
        <br><small>Las otras promesas continúan ejecutándose pero su resultado se ignora.</small>`;
    });
  });

  // 4. allSettled
  root.querySelector('#btn-settled').addEventListener('click', () => {
    loading(settledOut, 'Esperando todas (incluso las que fallen)…');
    Promise.allSettled([
      simularPeticion('Servicio A', 300),
      simularPeticion('Servicio B', 500, true),
      simularPeticion('Servicio C', 400),
    ]).then(results => {
      settledOut.innerHTML = results.map(r =>
        r.status === 'fulfilled'
          ? `✅ fulfilled: "${r.value.datos}"`
          : `❌ rejected: "${r.reason.message}"`
      ).join('<br>') +
      `<br><small>Promise.allSettled nunca rechaza — devuelve el estado de cada una.</small>`;
    });
  });
}

