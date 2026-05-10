/**
 * @file condicionales.demo.js
 * @description Demo interactivo: if/else y operador ternario.
 */

// Utilidad: Consola simulada
class SimulatedConsole {
  constructor() { this.logs = []; }
  log(...args) { this.logs.push({ type: 'log', message: args.map(a => String(a)).join(' ') }); }
  warn(...args) { this.logs.push({ type: 'warn', message: args.map(a => String(a)).join(' ') }); }
  error(...args) { this.logs.push({ type: 'error', message: args.map(a => String(a)).join(' ') }); }
  clear() { this.logs = []; }
  render() { return this.logs.slice(-8).map(l => `<span style="color: ${l.type === 'error' ? '#d32f2f' : l.type === 'warn' ? '#f57c00' : '#1976d2'}">${l.type === 'error' ? '❌' : l.type === 'warn' ? '⚠️' : '✓'} ${l.message}</span>`).join('<br>'); }
}

function evaluarNota(nota) {
  if (nota >= 9) return 'Excelente';
  if (nota >= 5) return 'Aprobado';
  return 'Suspenso';
}

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Condicionales</h2>
      <p class="js-subtitle">
        Transforma reglas de negocio en decisiones usando <code>if / else</code>
        y el operador ternario para casos simples.
      </p>

      <div class="js-section-title">Laboratorio interactivo</div>
      <ion-item>
        <ion-label position="stacked">Nota (0-10)</ion-label>
        <ion-input id="cond-nota" type="number" value="8" min="0" max="10"></ion-input>
      </ion-item>

      <ion-button expand="block" id="cond-if">Evaluar con if/else</ion-button>
      <ion-button expand="block" fill="outline" id="cond-ternario">Evaluar con ternario</ion-button>

      <div id="condicionales-output" class="js-output" style="min-height:70px;">Pulsa un método para evaluar la nota.</div>

      <!-- MINI-RETOS -->
      <div class="js-section-title">🎯 Mini-retos</div>
      <div class="js-mini-retos-box">
        <strong>Reto 1:</strong> Prueba con nota = 4.9 ¿Qué resultado ves?<br>
        <strong>Reto 2:</strong> Agrega otra condición para "Notable" (≥7)<br>
        <strong>Reto 3:</strong> ¿Qué diferencia hay entre if/else y ternario?
      </div>

      <!-- CONSOLA SIMULADA -->
      <div class="js-section-title">Consola simulada</div>
      <div id="cond-console" style="
        background: #1e1e1e;
        color: #d4d4d4;
        padding: 12px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        font-size: 12px;
        max-height: 80px;
        overflow-y: auto;
        border: 1px solid #333;
      ">
        <div style="color: #888;">// Los logs aparecen aquí</div>
      </div>

      <div class="js-section-title">Fragmento base</div>
      <pre class="js-code-panel">if (nota >= 9) {
  return 'Excelente';
} else if (nota >= 5) {
  return 'Aprobado';
} else {
  return 'Suspenso';
}

const estado = nota >= 5 ? 'Aprobado' : 'Suspenso';</pre>
    </section>
  `;
}

export function init(root) {
  const simConsole = new SimulatedConsole();
  const consoleDisplay = root.querySelector('#cond-console');
  const out = root.querySelector('#condicionales-output');
  const getNota = () => Number(root.querySelector('#cond-nota').value);

  const updateConsole = () => {
    consoleDisplay.innerHTML = simConsole.render() || '<div style="color: #888;">// Vacío</div>';
  };

  root.querySelector('#cond-if').addEventListener('click', () => {
    simConsole.clear();
    const nota = getNota();
    
    if (nota < 0 || nota > 10) {
      simConsole.warn('Nota debe estar entre 0-10');
      updateConsole();
      out.innerHTML = `⚠️ Ingresa nota válida (0-10)`;
      return;
    }
    
    const resultado = evaluarNota(nota);
    simConsole.log(`if (nota >= 9) return 'Excelente'`);
    simConsole.log(`else if (nota >= 5) return 'Aprobado'`);
    simConsole.log(`else return 'Suspenso'`);
    simConsole.log(`Resultado: ${resultado}`);
    updateConsole();
    
    out.innerHTML = `if/else → <strong style="color: green;">${resultado}</strong>`;
  });

  root.querySelector('#cond-ternario').addEventListener('click', () => {
    simConsole.clear();
    const nota = getNota();
    
    if (nota < 0 || nota > 10) {
      simConsole.warn('Nota debe estar entre 0-10');
      updateConsole();
      out.innerHTML = `⚠️ Ingresa nota válida (0-10)`;
      return;
    }
    
    const res = nota >= 5 ? 'Aprobado' : 'Suspenso';
    simConsole.log(`const res = nota >= 5 ? 'Aprobado' : 'Suspenso'`);
    simConsole.log(`Resultado: ${res}`);
    updateConsole();
    
    out.innerHTML = `ternario → <strong style="color: blue;">${res}</strong>`;
  });
}

