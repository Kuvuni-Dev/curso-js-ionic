
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

      <h2>Variables y tipos de datos</h2>
      <p class="js-subtitle">
        Comprende la diferencia entre <strong>declarar</strong> y <strong>asignar</strong>,
        cuándo usar <code>const</code> o <code>let</code>, y cómo inspeccionar tipos con
        <code>typeof</code>.
      </p>

      <div class="js-section-title">Laboratorio rápido</div>
      <div class="js-controls">
        <ion-button size="small" color="primary" id="exp-const-let">const vs let</ion-button>
        <ion-button size="small" color="secondary" id="exp-types">typeof en acción</ion-button>
      </div>
      <div id="variables-output" class="js-output" style="min-height:70px;">Pulsa un botón para ejecutar.</div>

      <div class="js-section-title">Fragmento base</div>
      <pre class="js-code-panel">let edad = 18;
edad = 19; // let permite reasignar

const usuario = { nombre: 'Ana' };
usuario.nombre = 'Luis'; // permitido (mutación interna)

const valores = ['hola', 42, true, null, undefined];
valores.map(v => typeof v);</pre>
    
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
  const out = root.querySelector('#variables-output');

  root.querySelector('#exp-const-let').addEventListener('click', () => {
    let edad = 18;
    edad = 19;
    const usuario = { nombre: 'Ana' };
    usuario.nombre = 'Luis';

    out.innerHTML = `
      <pre class="js-code-panel" style="margin-top:4px;">let edad = 18;
edad = 19; // OK

const usuario = { nombre: 'Ana' };
usuario.nombre = 'Luis'; // OK (mutación interna)</pre>
      <strong>Resultado:</strong> <code>let</code> permite reasignar y <code>const</code>
      protege la referencia, no el contenido del objeto.
    `;
  });

  root.querySelector('#exp-types').addEventListener('click', () => {
    const valores = ['hola', 42, true, null, undefined];
    const filas = valores.map((v) => `${String(v)} -> ${typeof v}`).join('<br>');

    out.innerHTML = `<strong>typeof:</strong><br>${filas}<br><br><small>Nota: <code>typeof null</code> devuelve <code>object</code> por un detalle histórico del lenguaje.</small>`;
  });
}



