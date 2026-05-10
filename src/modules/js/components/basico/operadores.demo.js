/**
 * @file operadores.demo.js
 * @description Demo interactivo: Operadores aritméticos y de comparación.
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

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Operadores</h2>
      <p class="js-subtitle">
        Practica operadores aritméticos y de comparación para construir expresiones
        seguras y fáciles de leer.
      </p>

      <div class="js-section-title">Calculadora interactiva</div>
      <ion-item>
        <ion-label position="stacked">A</ion-label>
        <ion-input id="op-a" type="number" value="10" min="-999" max="999"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">B</ion-label>
        <ion-input id="op-b" type="number" value="3" min="-999" max="999"></ion-input>
      </ion-item>

      <ion-segment id="op-kind" value="arit">
        <ion-segment-button value="arit"><ion-label>Aritmética</ion-label></ion-segment-button>
        <ion-segment-button value="comp"><ion-label>Comparación</ion-label></ion-segment-button>
      </ion-segment>

      <ion-button expand="block" id="op-run">Calcular</ion-button>
      <div id="operadores-output" class="js-output" style="min-height:70px;">Pulsa Calcular para ver resultados.</div>

      <!-- MINI-RETOS -->
      <div class="js-section-title">🎯 Mini-retos</div>
      <div class="js-mini-retos-box">
        <strong>Reto 1:</strong> Usa A=10, B=0 ¿Qué pasa con 10 / 0?<br>
        <strong>Reto 2:</strong> ¿Cuál es la diferencia entre === y ==?<br>
        <strong>Reto 3:</strong> Cambia A a -5 y explora comparaciones
      </div>

      <!-- CONSOLA SIMULADA -->
      <div class="js-section-title">Consola simulada</div>
      <div id="op-console" style="
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
        <div style="color: #888;">// Los operadores aparecen aquí</div>
      </div>

      <div class="js-section-title">Fragmento base</div>
      <pre class="js-code-panel">const a = 10;
const b = 3;

// Aritméticos
a + b; a - b; a * b; a / b; a % b;

// Comparación estricta
a === b;
a !== b;</pre>
    </section>
  `;
}

export function init(root) {
  const simConsole = new SimulatedConsole();
  const consoleDisplay = root.querySelector('#op-console');
  const out = root.querySelector('#operadores-output');

  const updateConsole = () => {
    consoleDisplay.innerHTML = simConsole.render() || '<div style="color: #888;">// Vacío</div>';
  };

  root.querySelector('#op-run').addEventListener('click', () => {
    simConsole.clear();
    const a = Number(root.querySelector('#op-a').value);
    const b = Number(root.querySelector('#op-b').value);
    const kind = root.querySelector('#op-kind').value;

    if (kind === 'arit') {
      simConsole.log(`Aritméticos: a=${a}, b=${b}`);
      simConsole.log(`a + b = ${a + b}`);
      simConsole.log(`a - b = ${a - b}`);
      simConsole.log(`a * b = ${a * b}`);
      if (b === 0) {
        simConsole.warn(`a / b = NaN (división por 0)`);
        simConsole.warn(`a % b = NaN (módulo por 0)`);
      } else {
        simConsole.log(`a / b = ${a / b}`);
        simConsole.log(`a % b = ${a % b}`);
      }
      updateConsole();
      out.innerHTML = `+ ${a + b}<br>- ${a - b}<br>* ${a * b}<br>/ ${b === 0 ? '⚠️ NaN' : (a / b).toFixed(2)}<br>% ${b === 0 ? '⚠️ NaN' : a % b}`;
      return;
    }

    simConsole.log(`Comparación: a=${a}, b=${b}`);
    simConsole.log(`a === b → ${a === b}`);
    simConsole.log(`a !== b → ${a !== b}`);
    simConsole.log(`a > b → ${a > b}`);
    simConsole.log(`a < b → ${a < b}`);
    updateConsole();
    
    out.innerHTML = `<strong>a === b</strong> → ${a === b}<br><strong>a !== b</strong> → ${a !== b}<br><strong>a > b</strong> → ${a > b}<br><strong>a < b</strong> → ${a < b}`;
  });
}

