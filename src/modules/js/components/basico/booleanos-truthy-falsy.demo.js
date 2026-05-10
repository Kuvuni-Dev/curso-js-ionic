
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

      <h2>Booleanos, truthy y falsy</h2>
      <p class="js-subtitle">
        Entiende cómo JavaScript convierte valores a booleano en condiciones y evita
        decisiones erróneas por coerción implícita.
      </p>

      <div class="js-section-title">Laboratorio interactivo</div>

      <ion-segment id="bool-value" value="0">
        <ion-segment-button value="0"><ion-label>0</ion-label></ion-segment-button>
        <ion-segment-button value="texto"><ion-label>'texto'</ion-label></ion-segment-button>
        <ion-segment-button value="null"><ion-label>null</ion-label></ion-segment-button>
        <ion-segment-button value="false"><ion-label>false</ion-label></ion-segment-button>
      </ion-segment>

      <ion-button expand="block" id="bool-run">Evaluar</ion-button>
      <div id="booleanos-output" class="js-output" style="min-height:70px;">Selecciona un valor y pulsa Evaluar.</div>

      <div class="js-section-title">Fragmento base</div>
      <pre class="js-code-panel">Boolean(0);        // false
Boolean('texto');  // true
Boolean(null);     // false
Boolean(false);    // false

if (valor) {
  // truthy
} else {
  // falsy
}</pre>
    
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
  const out = root.querySelector('#booleanos-output');

  root.querySelector('#bool-run').addEventListener('click', () => {
    const option = root.querySelector('#bool-value').value;
    let valor;

    if (option === '0') valor = 0;
    if (option === 'texto') valor = 'texto';
    if (option === 'null') valor = null;
    if (option === 'false') valor = false;

    out.innerHTML = `Valor: <code>${String(valor)}</code><br>Boolean(valor): <strong>${Boolean(valor)}</strong>`;
  });
}



