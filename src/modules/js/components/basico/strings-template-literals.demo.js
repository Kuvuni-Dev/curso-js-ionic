
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

      <h2>Strings y template literals</h2>
      <p class="js-subtitle">
        Compara concatenación tradicional y template literals para crear mensajes
        más claros y fáciles de mantener.
      </p>

      <div class="js-section-title">Laboratorio interactivo</div>

      <ion-item>
        <ion-label position="stacked">Nombre</ion-label>
        <ion-input id="str-name" value="Maria"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Curso</ion-label>
        <ion-input id="str-course" value="JavaScript"></ion-input>
      </ion-item>

      <ion-button expand="block" id="str-run">Generar mensajes</ion-button>
      <div id="strings-output" class="js-output" style="min-height:70px;">Completa los campos y genera mensajes.</div>

      <div class="js-section-title">Fragmento base</div>
      <pre class="js-code-panel">const nombre = 'Maria';
const curso = 'JavaScript';

const concat = 'Hola ' + nombre + ', bienvenida a ' + curso;
const template = `Hola ${nombre}, bienvenida a ${curso}`;</pre>
    
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
  const out = root.querySelector('#strings-output');

  root.querySelector('#str-run').addEventListener('click', () => {
    const nombre = root.querySelector('#str-name').value;
    const curso = root.querySelector('#str-course').value;
    const concat = 'Hola ' + nombre + ', bienvenida a ' + curso;
    const template = `Hola ${nombre}, bienvenida a ${curso}`;

    out.innerHTML = `
      Concatenación: <strong>${concat}</strong><br>
      Template literal: <strong>${template}</strong>
    `;
  });
}



