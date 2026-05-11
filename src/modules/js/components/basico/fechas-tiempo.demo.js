/**
 * @file fechas-tiempo.demo.js
 * @description Demo interactivo: trabajar con fechas y tiempo en JavaScript.
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

      <h2>Fechas y Tiempo</h2>
      <p class="js-subtitle">
        JavaScript usa el objeto <strong>Date</strong> para trabajar con fechas y horas.
        También puedes medir tiempo con métodos como <code>Date.now()</code> y calcular duraciones.
      </p>

      <!-- LABORATORIO INTERACTIVO -->
      <div class="js-section-title">Laboratorio: Maneja fechas y tiempo</div>

      <!-- ESCENARIO 1: FECHA ACTUAL -->
      <div class="js-section-title">Escenario 1: Obtener fecha y hora actual</div>
      <div class="js-controls">
        <ion-button expand="block" size="small" color="primary" id="fecha-btn-ahora">
          📅 Obtener fecha ahora
        </ion-button>
      </div>

      <div id="fecha-output-ahora" style="
        background: #e3f2fd;
        padding: 12px;
        border-radius: 4px;
        margin-top: 8px;
        font-size: 14px;
      "></div>

      <!-- ESCENARIO 2: PARTES DE UNA FECHA -->
      <div class="js-section-title">Escenario 2: Extraer partes de una fecha</div>
      <div class="js-controls">
        <ion-button size="small" color="primary" id="fecha-btn-partes">
          🔍 Extraer componentes
        </ion-button>
      </div>

      <div id="fecha-output-partes" style="
        background: #f5f5f5;
        padding: 12px;
        border-radius: 4px;
        margin-top: 8px;
        font-size: 12px;
      "></div>

      <!-- ESCENARIO 3: CREAR FECHA PERSONALIZADA -->
      <div class="js-section-title">Escenario 3: Crear fecha específica</div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;">
        <div>
          <label style="font-size: 12px; color: #666;">Año:</label>
          <ion-input type="number" id="fecha-input-year" value="2026" style="padding: 4px;"></ion-input>
        </div>
        <div>
          <label style="font-size: 12px; color: #666;">Mes (0-11):</label>
          <ion-input type="number" id="fecha-input-month" value="4" style="padding: 4px;"></ion-input>
        </div>
      </div>
      <ion-button expand="block" size="small" color="secondary" id="fecha-btn-crear">
        ✏️ Crear fecha personalizada
      </ion-button>
      <div id="fecha-output-crear" style="
        background: #fff3e0;
        padding: 12px;
        border-radius: 4px;
        margin-top: 8px;
      "></div>

      <!-- ESCENARIO 4: DIFERENCIA ENTRE FECHAS -->
      <div class="js-section-title">Escenario 4: Calcular diferencia entre fechas</div>
      <div class="js-controls">
        <ion-button size="small" color="primary" id="fecha-btn-diff-dias">
          📊 Días desde referencia
        </ion-button>
        <ion-button size="small" color="secondary" id="fecha-btn-diff-horas">
          ⏱️ Horas desde medianoche
        </ion-button>
      </div>
      <div id="fecha-output-diff" style="
        background: #f3e5f5;
        padding: 12px;
        border-radius: 4px;
        margin-top: 8px;
      "></div>

      <!-- ESCENARIO 5: MEDIR RENDIMIENTO -->
      <div class="js-section-title">Escenario 5: Medir tiempo de ejecución</div>
      <div style="display: flex; gap: 8px;">
        <ion-button size="small" color="primary" id="fecha-btn-perf-rapido">
          ⚡ Tarea rápida
        </ion-button>
        <ion-button size="small" color="secondary" id="fecha-btn-perf-lento">
          🐢 Tarea lenta
        </ion-button>
      </div>
      <div id="fecha-output-perf" style="
        background: #e8f5e9;
        padding: 12px;
        border-radius: 4px;
        margin-top: 8px;
      "></div>

      <!-- MINI-RETOS -->
      <div class="js-section-title">🎯 Mini-retos</div>
      <div class="js-mini-retos-box">
        <strong>Reto 1:</strong> Calcula cuántos días faltan para Año Nuevo 2027<br>
        <strong>Reto 2:</strong> Crea una cuenta regresiva para un evento futuro<br>
        <strong>Reto 3:</strong> ¿Cuál es tu edad en milisegundos?
      </div>

      <!-- CONSOLA SIMULADA -->
      <div class="js-section-title">Consola simulada</div>
      <div id="fechas-console" style="
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
        <div style="color: #888;">// Los logs aparecen aquí</div>
      </div>

      <!-- CÓDIGO EJEMPLO -->
      <div class="js-section-title">Fragmento de referencia</div>
      <pre class="js-code-panel">// Crear fecha actual
const ahora = new Date();
console.log(ahora);  // Objeto Date con fecha/hora actual

// Obtener componentes
const año = ahora.getFullYear();      // 2026
const mes = ahora.getMonth();         // 0-11 (enero es 0)
const dia = ahora.getDate();          // 1-31
const hora = ahora.getHours();        // 0-23
const minutos = ahora.getMinutes();   // 0-59

// Crear fecha específica
const navidad = new Date(2026, 11, 25);  // Mes es 0-11

// Obtener timestamp (milisegundos desde 1970)
const timestamp = Date.now();

// Diferenciar fechas
const fecha1 = new Date(2026, 0, 1);
const fecha2 = new Date(2026, 0, 8);
const dias = (fecha2 - fecha1) / (1000 * 60 * 60 * 24);  // 7 días

// Medir tiempo
const inicio = Date.now();
// ... hacer algo ...
const fin = Date.now();
console.log('Tiempo:', fin - inicio, 'ms');</pre>

      <div id="fechas-output" class="js-output" style="min-height:50px;">👆 Interactúa con los botones para explorar fechas.</div>
    </section>
  `;
}

export function init(root) {
  const simConsole = new SimulatedConsole();
  const consoleDisplay = root.querySelector('#fechas-console');
  const out = root.querySelector('#fechas-output');

  const updateConsole = () => {
    consoleDisplay.innerHTML = simConsole.render() || '<div style="color: #888;">// Vacío</div>';
  };

  // Escenario 1: Fecha actual
  root.querySelector('#fecha-btn-ahora').addEventListener('click', () => {
    simConsole.clear();
    const ahora = new Date();
    const formatted = ahora.toLocaleString('es-ES');
    simConsole.log(`new Date() =>`);
    simConsole.log(formatted);
    updateConsole();
    root.querySelector('#fecha-output-ahora').innerHTML = `
      <strong>Fecha y hora actual:</strong><br>
      ${formatted}
    `;
    out.innerHTML = `✅ Objeto Date creado`;
  });

  // Escenario 2: Partes
  root.querySelector('#fecha-btn-partes').addEventListener('click', () => {
    simConsole.clear();
    const ahora = new Date();
    simConsole.log(`getFullYear(): ${ahora.getFullYear()}`);
    simConsole.log(`getMonth(): ${ahora.getMonth()} (0=enero, 11=dic)`);
    simConsole.log(`getDate(): ${ahora.getDate()}`);
    simConsole.log(`getHours(): ${ahora.getHours()}`);
    updateConsole();
    root.querySelector('#fecha-output-partes').innerHTML = `
      <strong>Componentes de la fecha:</strong><br>
      • getFullYear(): ${ahora.getFullYear()}<br>
      • getMonth(): ${ahora.getMonth()}<br>
      • getDate(): ${ahora.getDate()}<br>
      • getHours(): ${ahora.getHours()}<br>
      • getMinutes(): ${ahora.getMinutes()}<br>
      • getTime(): ${ahora.getTime()} ms
    `;
    out.innerHTML = `✅ Se extrajeron todos los componentes`;
  });

  // Escenario 3: Crear fecha personalizada
  root.querySelector('#fecha-btn-crear').addEventListener('click', () => {
    simConsole.clear();
    const year = parseInt(root.querySelector('#fecha-input-year').value) || 2026;
    const month = parseInt(root.querySelector('#fecha-input-month').value) || 0;
    
    if (month < 0 || month > 11) {
      simConsole.warn('Mes debe estar entre 0-11');
      updateConsole();
      root.querySelector('#fecha-output-crear').innerHTML = `⚠️ Mes inválido (0-11)`;
      return;
    }

    const fecha = new Date(year, month, 1);
    const formatted = fecha.toLocaleString('es-ES');
    
    simConsole.log(`new Date(${year}, ${month}, 1)`);
    simConsole.log(formatted);
    updateConsole();
    
    root.querySelector('#fecha-output-crear').innerHTML = `
      <strong>Fecha creada:</strong><br>
      ${formatted}
    `;
    out.innerHTML = `✅ Fecha personalizada creada`;
  });

  // Escenario 4: Diferencias
  root.querySelector('#fecha-btn-diff-dias').addEventListener('click', () => {
    simConsole.clear();
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const referencia = new Date(1995, 0, 15);
    const diasPasados = Math.floor((hoy - referencia) / (1000 * 60 * 60 * 24));
    
    simConsole.log(`Hoy - Referencia (1995-01-15)`);
    simConsole.log(`Días pasados: ${diasPasados}`);
    updateConsole();
    
    root.querySelector('#fecha-output-diff').innerHTML = `
      <strong>Diferencia entre fechas:</strong><br>
      Referencia: ${referencia.toLocaleDateString('es-ES')}<br>
      Hoy: ${hoy.toLocaleDateString('es-ES')}<br><br>
      Diferencia: <strong>${diasPasados}</strong> días
    `;
    out.innerHTML = `✅ Diferencia calculada: ${diasPasados} días`;
  });

  root.querySelector('#fecha-btn-diff-horas').addEventListener('click', () => {
    simConsole.clear();
    const ahora = new Date();
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const horasTranscurridas = Math.floor((ahora - hoy) / (1000 * 60 * 60));
    const minutosTranscurridos = Math.floor((ahora - hoy) / (1000 * 60)) % 60;
    
    simConsole.log(`Tiempo desde medianoche`);
    simConsole.log(`${horasTranscurridas}h ${minutosTranscurridos}m`);
    updateConsole();
    
    root.querySelector('#fecha-output-diff').innerHTML = `
      <strong>Tiempo desde medianoche:</strong><br>
      ${ahora.toLocaleTimeString('es-ES')}<br><br>
      Transcurrido: <strong>${horasTranscurridas}h ${minutosTranscurridos}m</strong>
    `;
    out.innerHTML = `✅ Tiempo calculado`;
  });

  // Escenario 5: Rendimiento
  root.querySelector('#fecha-btn-perf-rapido').addEventListener('click', () => {
    simConsole.clear();
    const inicio = Date.now();
    
    let suma = 0;
    for (let i = 0; i < 1000000; i++) {
      suma += i;
    }
    
    const fin = Date.now();
    const tiempo = fin - inicio;
    
    simConsole.log(`Sumar 1M de números`);
    simConsole.log(`Tiempo: ${tiempo}ms`);
    updateConsole();
    
    root.querySelector('#fecha-output-perf').innerHTML = `
      <strong>⚡ Tarea rápida:</strong><br>
      Sumar 1 millón de números<br><br>
      Tiempo: <strong>${tiempo}ms</strong>
    `;
    out.innerHTML = `✅ Completado en ${tiempo}ms`;
  });

  root.querySelector('#fecha-btn-perf-lento').addEventListener('click', () => {
    simConsole.clear();
    const inicio = Date.now();
    
    let resultado = 0;
    for (let i = 0; i < 100000000; i++) {
      resultado = Math.sqrt(i) * Math.sin(i);
    }
    
    const fin = Date.now();
    const tiempo = fin - inicio;
    
    simConsole.log(`100M operaciones complejas`);
    simConsole.log(`Tiempo: ${tiempo}ms`);
    updateConsole();
    
    root.querySelector('#fecha-output-perf').innerHTML = `
      <strong>🐢 Tarea lenta:</strong><br>
      100 millones de Math.sqrt + Math.sin<br><br>
      Tiempo: <strong>${tiempo}ms</strong>
    `;
    out.innerHTML = `✅ Completado en ${tiempo}ms`;
  });
}
