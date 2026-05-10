
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

      <h2>Arrays y objetos (básico)</h2>
      <p class="js-subtitle">
        Trabaja con las dos estructuras más usadas en JavaScript: arrays para listas
        y objetos para datos con propiedades.
      </p>

      <div class="js-section-title">Laboratorio interactivo</div>

      <ion-button expand="block" id="arr-run">Operar array</ion-button>
      <ion-button expand="block" fill="outline" id="obj-run">Mostrar objeto</ion-button>

      <div id="arrays-objetos-output" class="js-output" style="min-height:70px;">Pulsa un botón para ejecutar un ejemplo.</div>

      <div class="js-section-title">Fragmento base</div>
      <pre class="js-code-panel">const alumnos = ['Ana', 'Luis', 'Marta'];
alumnos.push('Pablo');
alumnos.pop();
alumnos.includes('Ana');

const curso = {
  nombre: 'JavaScript',
  nivel: 'Básico',
  horas: 30
};</pre>
    
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
  const out = root.querySelector('#arrays-objetos-output');

  root.querySelector('#arr-run').addEventListener('click', () => {
    const alumnos = ['Ana', 'Luis', 'Marta'];
    alumnos.push('Pablo');
    const eliminado = alumnos.pop();
    const incluyeAna = alumnos.includes('Ana');

    out.innerHTML = `
      <strong>Array:</strong> [${alumnos.join(', ')}]<br>
      eliminado con pop(): ${eliminado}<br>
      includes('Ana'): ${incluyeAna}
    `;
  });

  root.querySelector('#obj-run').addEventListener('click', () => {
    const curso = { nombre: 'JavaScript', nivel: 'Básico', horas: 30 };
    out.innerHTML = `<pre class="js-code-panel">${JSON.stringify(curso, null, 2)}</pre>`;
  });
}




