
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

      <h2>Números y Math</h2>
      <p class="js-subtitle">
        Practica operaciones numéricas básicas, el operador módulo y utilidades
        frecuentes del objeto <code>Math</code>.
      </p>

      <div class="js-section-title">Laboratorio interactivo</div>

      <ion-item>
        <ion-label position="stacked">A</ion-label>
        <ion-input id="num-a" type="number" value="10"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">B</ion-label>
        <ion-input id="num-b" type="number" value="4"></ion-input>
      </ion-item>

      <ion-button expand="block" id="num-run">Calcular</ion-button>
      <div id="numbers-output" class="js-output" style="min-height:70px;">Pulsa Calcular para ver los resultados.</div>

      <div class="js-section-title">Fragmento base</div>
      <pre class="js-code-panel">const a = 10;
const b = 4;

a + b;
a - b;
a * b;
a / b;
a % b;

Math.max(a, b);
Math.min(a, b);</pre>
    
      <!-- MINI-RETOS -->
      <div class="js-section-title">🎯 Mini-retos</div>
      <div style="background: #fff9c4; padding: 12px; border-radius: 4px; border-left: 4px solid #fbc02d; font-size: 13px;">
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
  const out = root.querySelector('#numbers-output');

  root.querySelector('#num-run').addEventListener('click', () => {
    const a = Number(root.querySelector('#num-a').value);
    const b = Number(root.querySelector('#num-b').value);

    out.innerHTML = `
      a + b = ${a + b}<br>
      a - b = ${a - b}<br>
      a * b = ${a * b}<br>
      a / b = ${b === 0 ? 'NaN' : a / b}<br>
      a % b = ${b === 0 ? 'NaN' : a % b}<br>
      Math.max(a,b) = ${Math.max(a, b)}<br>
      Math.min(a,b) = ${Math.min(a, b)}
    `;
  });
}



