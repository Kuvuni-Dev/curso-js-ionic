/**
 * @file event-loop.demo.js
 * @description Demo interactivo: Event loop, call stack, task queue y microtask queue.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Event loop y call stack</h2>
      <p class="js-subtitle">
        JavaScript es <strong>single-threaded</strong> pero maneja operaciones
        asíncronas gracias al <strong>event loop</strong>, que coordina tres zonas:
        el call stack (código síncrono), la microtask queue (Promises) y la
        macro-task queue (setTimeout, eventos).
      </p>

      <!-- VISUALIZACIÓN -->
      <div class="js-section-title">Visualización en tiempo real</div>
      <div class="js-el-board">
        <div class="js-el-col">
          <div class="js-el-col-title">📚 Call Stack</div>
          <div id="el-stack" style="min-height:80px;"></div>
        </div>
        <div class="js-el-col">
          <div class="js-el-col-title">⚡ Microtask Queue</div>
          <div id="el-micro" style="min-height:80px;"></div>
          <small style="color:var(--ion-color-medium);font-size:10px;">Promise.then / queueMicrotask</small>
        </div>
        <div class="js-el-col">
          <div class="js-el-col-title">⏱ Task Queue</div>
          <div id="el-macro" style="min-height:80px;"></div>
          <small style="color:var(--ion-color-medium);font-size:10px;">setTimeout / setInterval</small>
        </div>
      </div>
      <div id="el-log" class="js-log" style="min-height:80px;"></div>

      <!-- CONTROLES -->
      <div class="js-section-title">Elige un escenario para simular</div>
      <div class="js-controls">
        <ion-button size="small" color="primary"   id="btn-el-classic">Clásico: sync + setTimeout + Promise</ion-button>
        <ion-button size="small" color="secondary" id="btn-el-order">Orden de ejecución</ion-button>
        <ion-button size="small" color="medium"    id="btn-el-reset">Limpiar</ion-button>
      </div>

      <!-- CÓDIGO -->
      <div class="js-section-title">El código del escenario clásico</div>
      <pre class="js-code-panel">console.log('1 — síncrono (call stack)');

setTimeout(() => {
  console.log('4 — setTimeout (task queue)');
}, 0);

Promise.resolve()
  .then(() => console.log('3 — Promise.then (microtask queue)'));

console.log('2 — síncrono (call stack)');

// Orden de salida: 1 → 2 → 3 → 4
// Por qué: el call stack se vacía primero (1, 2),
// luego se vacían las microtasks (3),
// y por último la task queue (4).</pre>

      <div class="js-section-title">Reglas del event loop</div>
      <pre class="js-code-panel">// 1. El call stack se ejecuta hasta vaciarse (código síncrono).
// 2. Cuando el stack queda vacío, el event loop revisa:
//    a. Primero: microtask queue (Promise.then, MutationObserver…)
//       → se vacía COMPLETAMENTE antes de continuar.
//    b. Después: una tarea de la task queue (setTimeout, eventos…).
// 3. Vuelve a empezar (re-render del navegador puede ocurrir entre tareas).

// ⚠️ setTimeout(..., 0) no significa "inmediato"
//    sino "en la siguiente tarea disponible de la task queue".</pre>
    </section>
  `;
}

export function init(root) {
  const stack = root.querySelector('#el-stack');
  const micro = root.querySelector('#el-micro');
  const macro = root.querySelector('#el-macro');
  const log   = root.querySelector('#el-log');

  function addLog(msg, type = '') {
    const line = document.createElement('div');
    line.className = `js-log-line ${type}`;
    line.textContent = `→ ${msg}`;
    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
  }

  function addItem(container, text, cls = '') {
    const el = document.createElement('div');
    el.className = `js-el-item ${cls}`;
    el.textContent = text;
    container.appendChild(el);
    return el;
  }

  function removeItem(el) {
    el.style.opacity = '0';
    el.style.transform = 'scale(0.8)';
    el.style.transition = 'opacity 0.3s, transform 0.3s';
    setTimeout(() => el.remove(), 300);
  }

  function reset() {
    stack.innerHTML = '';
    micro.innerHTML = '';
    macro.innerHTML = '';
    log.innerHTML   = '';
  }

  root.querySelector('#btn-el-reset').addEventListener('click', reset);

  root.querySelector('#btn-el-classic').addEventListener('click', () => {
    reset();
    let t = 0;
    const step = 600;

    // t=0: console.log('1')
    setTimeout(() => {
      const e = addItem(stack, "console.log('1')");
      addLog("1 — síncrono (call stack)", 'event');
      setTimeout(() => removeItem(e), step * 0.8);
    }, t += step);

    // t=1: setTimeout programado
    setTimeout(() => {
      const e = addItem(stack, "setTimeout(cb, 0)");
      addLog("setTimeout programado → cb va a Task Queue");
      setTimeout(() => {
        removeItem(e);
        addItem(macro, "cb setTimeout", 'macro');
      }, step * 0.8);
    }, t += step);

    // t=2: Promise.resolve().then programado
    setTimeout(() => {
      const e = addItem(stack, "Promise.resolve().then(cb)");
      addLog("Promise resuelta → cb va a Microtask Queue");
      setTimeout(() => {
        removeItem(e);
        addItem(micro, "cb Promise.then", 'micro');
      }, step * 0.8);
    }, t += step);

    // t=3: console.log('2')
    setTimeout(() => {
      const e = addItem(stack, "console.log('2')");
      addLog("2 — síncrono (call stack)", 'event');
      setTimeout(() => removeItem(e), step * 0.8);
    }, t += step);

    // t=4: stack vacío → microtasks primero
    setTimeout(() => {
      addLog("Stack vacío → event loop revisa microtasks primero…");
      const mItems = micro.querySelectorAll('.js-el-item');
      mItems.forEach(item => {
        const e = addItem(stack, item.textContent);
        addLog("3 — Promise.then ejecutado (microtask)", 'event');
        removeItem(item);
        setTimeout(() => removeItem(e), step * 0.8);
      });
    }, t += step);

    // t=5: microtasks vacías → task queue
    setTimeout(() => {
      addLog("Microtasks vacías → event loop toma una tarea de Task Queue…");
      const mItems = macro.querySelectorAll('.js-el-item');
      mItems.forEach(item => {
        const e = addItem(stack, item.textContent);
        addLog("4 — setTimeout callback ejecutado (task queue)", 'event');
        removeItem(item);
        setTimeout(() => removeItem(e), step * 0.8);
      });
    }, t += step);

    setTimeout(() => addLog("✅ Orden: 1 → 2 → 3 → 4"), t += step);
  });

  root.querySelector('#btn-el-order').addEventListener('click', () => {
    reset();
    addLog("Ejecutando: sync A → Promise → setTimeout → sync B", 'event');
    setTimeout(() => addLog("Resultado esperado:"), 200);
    setTimeout(() => addLog("  1. sync A  (call stack)"), 400);
    setTimeout(() => addLog("  2. sync B  (call stack)"), 600);
    setTimeout(() => addLog("  3. Promise.then  (microtask — antes de tareas)"), 800);
    setTimeout(() => addLog("  4. setTimeout  (task queue — cuando stack y microtasks están vacíos)"), 1000);
    setTimeout(() => addLog("⚡ Microtasks SIEMPRE van antes que las tareas de la task queue", 'event'), 1300);
  });
}
