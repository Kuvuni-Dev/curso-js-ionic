
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

      <h2>Consola y depuración</h2>
      <p class="js-subtitle">
        Practica depuración básica enviando distintos niveles de mensajes a DevTools,
        tal como se hace en un flujo real de desarrollo.
      </p>

      <div class="js-section-title">Laboratorio interactivo</div>

      <div class="js-controls">
        <ion-button size="small" color="primary" id="console-log">console.log/info</ion-button>
        <ion-button size="small" color="warning" id="console-warn">console.warn/error</ion-button>
      </div>

      <div id="console-output" class="js-output" style="min-height:70px;">Abre DevTools (F12) y pulsa un botón.</div>

      <div class="js-section-title">Fragmento base</div>
      <pre class="js-code-panel">console.log('Carga correcta');
console.info('Información de estado');
console.warn('Advertencia de validación');
console.error('Error simulado para depuración');</pre>
    
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
  const out = root.querySelector('#console-output');

  root.querySelector('#console-log').addEventListener('click', () => {
    console.log('Mensaje log: variables cargadas correctamente');
    console.info('Mensaje info: proceso en curso');
    out.innerHTML = 'Se enviaron mensajes log/info a la consola del navegador.';
  });

  root.querySelector('#console-warn').addEventListener('click', () => {
    console.warn('Mensaje warn: valor inesperado');
    console.error('Mensaje error: fallo simulado para depuración');
    out.innerHTML = 'Se enviaron mensajes warn/error a la consola del navegador.';
  });
}



