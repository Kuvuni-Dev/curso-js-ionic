/**
 * @file async-await.demo.js
 * @description Demo interactivo: Async/Await en JavaScript.
 */

function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function simularApiPaso(nombre, ms, falla = false) {
  return new Promise((resolve, reject) =>
    setTimeout(() => falla ? reject(new Error(`Error en ${nombre}`)) : resolve(`✅ ${nombre} listo`), ms)
  );
}

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Async / Await</h2>
      <p class="js-subtitle">
        <code>async/await</code> es azúcar sintáctico sobre las Promises que permite
        escribir código asíncrono con apariencia síncrona. Una función <code>async</code>
        siempre devuelve una Promise; <code>await</code> pausa la ejecución hasta que
        la Promise se resuelva.
      </p>

      <!-- SINTAXIS BÁSICA -->
      <div class="js-section-title">Sintaxis básica</div>
      <pre class="js-code-panel">// Con Promises (encadenamiento)
function obtenerDatos() {
  return fetch('/api/datos')
    .then(res => res.json())
    .then(datos => procesarDatos(datos))
    .catch(err => manejarError(err));
}

// Con async/await (mismo comportamiento, más legible)
async function obtenerDatos() {
  try {
    const res   = await fetch('/api/datos');
    const datos = await res.json();
    return procesarDatos(datos);
  } catch (err) {
    manejarError(err);
  }
}</pre>

      <!-- DEMO 1: AWAIT SECUENCIAL -->
      <div class="js-section-title">1. Pasos secuenciales con await</div>
      <p style="font-size:14px;margin-bottom:8px;">
        Cada paso espera al anterior. El tiempo total es la suma de todos los pasos.
      </p>
      <div class="js-controls">
        <ion-button size="small" color="primary" id="btn-sequential">Ejecutar secuencial</ion-button>
      </div>
      <div id="seq-log" class="js-log" style="min-height:80px;"></div>

      <!-- DEMO 2: AWAIT PARALELO -->
      <div class="js-section-title">2. Paralelo con Promise.all + await</div>
      <p style="font-size:14px;margin-bottom:8px;">
        Lanzamos todas las operaciones a la vez. El tiempo total es el del más lento.
      </p>
      <div class="js-controls">
        <ion-button size="small" color="secondary" id="btn-parallel">Ejecutar en paralelo</ion-button>
      </div>
      <div id="par-log" class="js-log" style="min-height:80px;"></div>

      <!-- DEMO 3: TRY/CATCH -->
      <div class="js-section-title">3. Manejo de errores con try/catch</div>
      <div class="js-controls">
        <ion-button size="small" color="success" id="btn-trycatch-ok">Éxito</ion-button>
        <ion-button size="small" color="danger"  id="btn-trycatch-fail">Con error</ion-button>
      </div>
      <div id="tc-output" class="js-output" style="min-height:40px;"></div>

      <!-- CÓDIGO COMPARATIVO -->
      <div class="js-section-title">Secuencial vs paralelo</div>
      <pre class="js-code-panel">// ❌ Secuencial innecesario: 900ms (300+300+300)
async function secuencial() {
  const a = await api('A', 300); // espera 300ms
  const b = await api('B', 300); // espera 300ms más
  const c = await api('C', 300); // espera 300ms más
  return [a, b, c];              // total: 900ms
}

// ✅ Paralelo: 300ms (el más lento)
async function paralelo() {
  const [a, b, c] = await Promise.all([
    api('A', 300),
    api('B', 300),
    api('C', 300),
  ]);
  return [a, b, c]; // total: 300ms
}</pre>
    </section>
  `;
}

export function init(root) {
  const seqLog = root.querySelector('#seq-log');
  const parLog = root.querySelector('#par-log');
  const tcOut  = root.querySelector('#tc-output');

  function logLine(container, msg, type = '') {
    const el = document.createElement('div');
    el.className = `js-log-line ${type}`;
    el.innerHTML = msg;
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
  }

  // 1. Secuencial
  root.querySelector('#btn-sequential').addEventListener('click', async () => {
    seqLog.innerHTML = '';
    const t0 = Date.now();
    logLine(seqLog, '⏳ Iniciando pasos secuenciales…');
    const r1 = await simularApiPaso('Paso 1 (autenticación)', 400);
    logLine(seqLog, `${r1} — ${Date.now() - t0}ms`, 'event');
    const r2 = await simularApiPaso('Paso 2 (cargar perfil)', 500);
    logLine(seqLog, `${r2} — ${Date.now() - t0}ms`, 'event');
    const r3 = await simularApiPaso('Paso 3 (cargar datos)', 300);
    logLine(seqLog, `${r3} — ${Date.now() - t0}ms`, 'event');
    logLine(seqLog, `🏁 Completado en ${Date.now() - t0}ms (suma de todos los pasos)`);
  });

  // 2. Paralelo
  root.querySelector('#btn-parallel').addEventListener('click', async () => {
    parLog.innerHTML = '';
    const t0 = Date.now();
    logLine(parLog, '⚡ Lanzando todas las operaciones en paralelo…');
    const [r1, r2, r3] = await Promise.all([
      simularApiPaso('Petición A', 400),
      simularApiPaso('Petición B', 500),
      simularApiPaso('Petición C', 300),
    ]);
    [r1, r2, r3].forEach(r => logLine(parLog, r, 'event'));
    logLine(parLog, `🏁 Completado en ${Date.now() - t0}ms (solo el más lento: 500ms)`);
  });

  // 3. Try/catch
  root.querySelector('#btn-trycatch-ok').addEventListener('click', async () => {
    tcOut.innerHTML = '⏳ Ejecutando…';
    try {
      await esperar(500);
      const resultado = await simularApiPaso('Servicio', 300);
      tcOut.innerHTML = `✅ <strong>try</strong> ejecutado: "${resultado}"
        <br><small>El bloque catch NO se ejecutó porque no hubo error.</small>`;
    } catch (err) {
      tcOut.innerHTML = `❌ catch: "${err.message}"`;
    }
  });

  root.querySelector('#btn-trycatch-fail').addEventListener('click', async () => {
    tcOut.innerHTML = '⏳ Ejecutando…';
    try {
      await esperar(200);
      await simularApiPaso('Servicio', 400, true); // lanza error
      tcOut.innerHTML = '✅ Esto nunca se muestra cuando hay error.';
    } catch (err) {
      tcOut.innerHTML = `❌ <strong>catch</strong> capturó: "${err.message}"
        <br><small>await convierte el reject de la Promise en una excepción que catch puede capturar.</small>`;
    }
  });
}
