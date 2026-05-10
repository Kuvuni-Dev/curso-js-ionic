
// Utilidad: Consola simulada
class SimulatedConsole {
  constructor() { this.logs = []; }
  log(...args) { this.logs.push({ type: 'log', message: args.map(a => String(a)).join(' ') }); }
  warn(...args) { this.logs.push({ type: 'warn', message: args.map(a => String(a)).join(' ') }); }
  error(...args) { this.logs.push({ type: 'error', message: args.map(a => String(a)).join(' ') }); }
  clear() { this.logs = []; }
  render() { return this.logs.slice(-8).map(l => `<span style="color: ${l.type === 'error' ? '#d32f2f' : l.type === 'warn' ? '#f57c00' : '#1976d2'}">${l.type === 'error' ? '❌' : l.type === 'warn' ? '⚠️' : '✓'} ${l.message}</span>`).join('<br>'); }
}

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Bucles</h2>
      <p class="js-subtitle">
        Compara <code>for</code> y <code>while</code> para iterar colecciones y rangos,
        entendiendo cuándo conviene cada uno.
      </p>

      <div class="js-section-title">Laboratorio interactivo</div>
      <ion-item>
        <ion-label position="stacked">Número de iteraciones</ion-label>
        <ion-input id="loop-n" type="number" value="5"></ion-input>
      </ion-item>

      <ion-button expand="block" id="loop-for">Ejecutar for</ion-button>
      <ion-button expand="block" fill="outline" id="loop-while">Ejecutar while</ion-button>

      <div id="bucles-output" class="js-output" style="min-height:70px;">Pulsa un botón para iterar.</div>

      <div class="js-section-title">Fragmento base</div>
      <pre class="js-code-panel">for (let i = 0; i < n; i++) {
  // ...
}

let i = 0;
while (i < n) {
  // ...
  i++;
}</pre>
    
      <!-- MINI-RETOS -->
      <div class="js-section-title">🎯 Mini-retos</div>
      <div class="js-mini-retos-box">
        <strong>Reto 1:</strong> Ejecuta todos los botones y compara resultados<br>
        <strong>Reto 2:</strong> Cambia entradas para forzar un caso borde<br>
        <strong>Reto 3:</strong> Explica qué salida esperas antes de ejecutar
      </div>

      <!-- CONSOLA SIMULADA -->
      <div class="js-section-title">Consola simulada</div>
      <div id="generic-console" style="
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
        <div style="color: #888;">// Interactua con los controles para ver eventos</div>
      </div>
    </section>
  `;
}

export function init(root) {
  const simConsole = new SimulatedConsole();
  const consoleDisplay = root.querySelector('#generic-console');
  const updateConsole = () => {
    if (!consoleDisplay) return;
    consoleDisplay.innerHTML = simConsole.render() || '<div style="color: #888;">// Vacío</div>';
  };

  const setupGenericLogging = () => {
    root.querySelectorAll('ion-button[id], button[id]').forEach((btn) => {
      if (btn.dataset.consoleBound === '1') return;
      btn.dataset.consoleBound = '1';
      btn.addEventListener('click', () => {
        simConsole.log(`Click: #${btn.id}`);
        updateConsole();
      });
    });
  };
  setupGenericLogging();
  const out = root.querySelector('#bucles-output');
  const getN = () => Math.max(0, Number(root.querySelector('#loop-n').value));

  root.querySelector('#loop-for').addEventListener('click', () => {
    const n = getN();
    const items = [];
    for (let i = 0; i < n; i++) items.push(i);
    out.innerHTML = `<strong>for:</strong> ${items.join(', ') || '(sin iteraciones)'}`;
  });

  root.querySelector('#loop-while').addEventListener('click', () => {
    const n = getN();
    const items = [];
    let i = 0;
    while (i < n) {
      items.push(i);
      i++;
    }
    out.innerHTML = `<strong>while:</strong> ${items.join(', ') || '(sin iteraciones)'}`;
  });
}




