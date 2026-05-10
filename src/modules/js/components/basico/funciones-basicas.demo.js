
// Utilidad: Consola simulada
class SimulatedConsole {
  constructor() { this.logs = []; }
  log(...args) { this.logs.push({ type: 'log', message: args.map(a => String(a)).join(' ') }); }
  warn(...args) { this.logs.push({ type: 'warn', message: args.map(a => String(a)).join(' ') }); }
  error(...args) { this.logs.push({ type: 'error', message: args.map(a => String(a)).join(' ') }); }
  clear() { this.logs = []; }
  render() { return this.logs.slice(-8).map(l => `<span style="color: ${l.type === 'error' ? '#d32f2f' : l.type === 'warn' ? '#f57c00' : '#1976d2'}">${l.type === 'error' ? '❌' : l.type === 'warn' ? '⚠️' : '✓'} ${l.message}</span>`).join('<br>'); }
}

function saludar(nombre, rol = 'alumno') {
  return `Hola, ${nombre}. Rol: ${rol}.`;
}

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Funciones básicas</h2>
      <p class="js-subtitle">
        Aprende a encapsular lógica en funciones reutilizables y a definir
        parámetros por defecto para evitar valores vacíos.
      </p>

      <div class="js-section-title">Laboratorio interactivo</div>
      <ion-item>
        <ion-label position="stacked">Nombre</ion-label>
        <ion-input id="fn-nombre" value="Lucia"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Rol (opcional)</ion-label>
        <ion-input id="fn-rol" value=""></ion-input>
      </ion-item>

      <ion-button expand="block" id="fn-run">Ejecutar función</ion-button>
      <div id="funciones-output" class="js-output" style="min-height:70px;">Pulsa Ejecutar función para ver el resultado.</div>

      <div class="js-section-title">Fragmento base</div>
      <pre class="js-code-panel">function saludar(nombre, rol = 'alumno') {
  return `Hola, ${nombre}. Rol: ${rol}.`;
}

saludar('Lucia');
saludar('Carlos', 'profesor');</pre>
    
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
  const out = root.querySelector('#funciones-output');

  root.querySelector('#fn-run').addEventListener('click', () => {
    const nombre = root.querySelector('#fn-nombre').value || 'Invitado';
    const rol = root.querySelector('#fn-rol').value;
    const mensaje = rol ? saludar(nombre, rol) : saludar(nombre);

    out.innerHTML = `
      <pre class="js-code-panel">function saludar(nombre, rol = 'alumno') {
  return \`Hola, \${nombre}. Rol: \${rol}.\`;
}</pre>
      <strong>Salida:</strong> ${mensaje}
    `;
  });
}



