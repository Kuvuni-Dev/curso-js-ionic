
// Utilidad: Consola simulada
class SimulatedConsole {
  constructor() { this.logs = []; }
  log(...args) { this.logs.push({ type: 'log', message: args.map(a => String(a)).join(' ') }); }
  warn(...args) { this.logs.push({ type: 'warn', message: args.map(a => String(a)).join(' ') }); }
  error(...args) { this.logs.push({ type: 'error', message: args.map(a => String(a)).join(' ') }); }
  clear() { this.logs = []; }
  render() { return this.logs.slice(-8).map(l => `<span style="color: ${l.type === 'error' ? '#d32f2f' : l.type === 'warn' ? '#f57c00' : '#1976d2'}">${l.type === 'error' ? '❌' : l.type === 'warn' ? '⚠️' : '✓'} ${l.message}</span>`).join('<br>'); }
}

function evaluarDia(dia) {
  switch (dia) {
    case 'lunes':
      return 'Inicio de semana: organiza tareas clave.';
    case 'martes':
      return 'Buen día para avanzar en práctica.';
    case 'miercoles':
      return 'Mitad de semana: revisa progreso.';
    case 'jueves':
      return 'Refuerza conceptos con ejercicios.';
    case 'viernes':
      return 'Cierra pendientes y documenta aprendizajes.';
    case 'sabado':
    case 'domingo':
      return 'Fin de semana: repaso ligero y descanso.';
    default:
      return 'Día no reconocido.';
  }
}

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>switch case</h2>
      <p class="js-subtitle">
        Usa <code>switch</code> para evaluar múltiples casos de forma más clara que una cadena
        extensa de <code>if / else if</code> cuando comparas un mismo valor.
      </p>

      <div class="js-section-title">Laboratorio interactivo</div>
      <ion-item>
        <ion-label position="stacked">Selecciona un día</ion-label>
        <ion-select id="sw-day" value="lunes" interface="popover">
          <ion-select-option value="lunes">Lunes</ion-select-option>
          <ion-select-option value="martes">Martes</ion-select-option>
          <ion-select-option value="miercoles">Miércoles</ion-select-option>
          <ion-select-option value="jueves">Jueves</ion-select-option>
          <ion-select-option value="viernes">Viernes</ion-select-option>
          <ion-select-option value="sabado">Sábado</ion-select-option>
          <ion-select-option value="domingo">Domingo</ion-select-option>
        </ion-select>
      </ion-item>

      <div class="js-controls">
        <ion-button size="small" color="primary" id="sw-run">Evaluar con switch</ion-button>
        <ion-button size="small" color="medium" id="sw-default">Probar default</ion-button>
      </div>

      <div id="switch-output" class="js-output" style="min-height:70px;">Selecciona un valor y pulsa un botón.</div>

      <div class="js-section-title">Fragmento base</div>
      <pre class="js-code-panel">switch (dia) {
  case 'lunes':
    return 'Inicio de semana';
  case 'martes':
    return 'Buen día para avanzar';
  case 'miercoles':
    return 'Mitad de semana';
  case 'sabado':
  case 'domingo':
    return 'Fin de semana';
  default:
    return 'Día no reconocido';
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
  const out = root.querySelector('#switch-output');

  root.querySelector('#sw-run').addEventListener('click', () => {
    const dia = root.querySelector('#sw-day').value;
    const resultado = evaluarDia(dia);

    out.innerHTML = `
      <code>dia = '${dia}'</code><br>
      <strong>Resultado:</strong> ${resultado}
      <br><small>Tip: switch compara por igualdad estricta (<code>===</code>).</small>
    `;
  });

  root.querySelector('#sw-default').addEventListener('click', () => {
    const resultado = evaluarDia('feriado');
    out.innerHTML = `
      <code>dia = 'feriado'</code><br>
      <strong>Resultado:</strong> ${resultado}
      <br><small>El bloque <code>default</code> cubre valores no contemplados en los <code>case</code>.</small>
    `;
  });
}



