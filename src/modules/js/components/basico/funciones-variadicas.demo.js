/**
 * @file funciones-variadicas.demo.js
 * @description Demo interactivo: Funciones variadicas con rest parameters (...args).
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

// Funciones variadicas
function sumar(...numeros) {
  return numeros.reduce((sum, n) => sum + n, 0);
}

function concatenarTexto(separador, ...textos) {
  return textos.join(separador);
}

function procesarDatos(tipo, ...datos) {
  if (tipo === 'suma') return datos.reduce((a, b) => a + b, 0);
  if (tipo === 'promedio') return datos.length ? datos.reduce((a, b) => a + b, 0) / datos.length : 0;
  if (tipo === 'maximo') return Math.max(...datos);
  if (tipo === 'minimo') return Math.min(...datos);
  return null;
}

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Funciones variadicas</h2>
      <p class="js-subtitle">
        El operador <strong>rest</strong> (<code>...</code>) permite que una función
        acepte un número variable de argumentos como un array.
        Perfectas para funciones flexibles que trabajan con múltiples valores.
      </p>

      <!-- DEMO 1: SUMA SIMPLE -->
      <div class="js-section-title">1. Sumar N números</div>
      <ion-item>
        <ion-label position="stacked">Números (separados por coma, ej: 5,10,15)</ion-label>
        <ion-input id="var-nums" value="5,10,15"></ion-input>
      </ion-item>
      <ion-button expand="block" id="btn-suma">Calcular suma</ion-button>
      <div id="var-out1" class="js-output" style="min-height:50px;"></div>

      <!-- DEMO 2: CONCATENAR CON SEPARADOR -->
      <div class="js-section-title">2. Concatenar textos con separador</div>
      <ion-item>
        <ion-label position="stacked">Separador</ion-label>
        <ion-input id="var-sep" value=" - "></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Textos (separados por coma, ej: Hola,Mundo,JS)</ion-label>
        <ion-input id="var-textos" value="Hola,Mundo,JS"></ion-input>
      </ion-item>
      <ion-button expand="block" id="btn-concat">Concatenar</ion-button>
      <div id="var-out2" class="js-output" style="min-height:50px;"></div>

      <!-- DEMO 3: REST EN DESTRUCTURING -->
      <div class="js-section-title">3. Rest en destructuring</div>
      <ion-button expand="block" size="small" color="secondary" id="btn-destruct">Extraer primer y resto</ion-button>
      <div id="var-out3" class="js-output" style="min-height:50px;"></div>

      <!-- DEMO 4: PROCESAMIENTO VARIÁFICO -->
      <div class="js-section-title">4. Procesar datos (suma, promedio, máx, mín)</div>
      <ion-item>
        <ion-label position="stacked">Tipo de operación</ion-label>
        <ion-select id="var-tipo" value="suma">
          <ion-select-option value="suma">Suma</ion-select-option>
          <ion-select-option value="promedio">Promedio</ion-select-option>
          <ion-select-option value="maximo">Máximo</ion-select-option>
          <ion-select-option value="minimo">Mínimo</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Números (ej: 2,8,4,15,3)</ion-label>
        <ion-input id="var-datos" value="2,8,4,15,3"></ion-input>
      </ion-item>
      <ion-button expand="block" id="btn-proceso">Procesar</ion-button>
      <div id="var-out4" class="js-output" style="min-height:50px;"></div>

      <!-- MINI-RETOS -->
      <div class="js-section-title">🎯 Mini-retos</div>
      <div style="background: #fff9c4; padding: 12px; border-radius: 4px; border-left: 4px solid #fbc02d; font-size: 13px;">
        <strong>Reto 1:</strong> Crea una función que multiplique N números<br>
        <strong>Reto 2:</strong> ¿Cuál es la diferencia entre ...rest y argumentos object?<br>
        <strong>Reto 3:</strong> Usa rest en destructuring con arrays anidados
      </div>

      <!-- CONSOLA SIMULADA -->
      <div class="js-section-title">Consola simulada</div>
      <div id="var-console" style="
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
        <div style="color: #888;">// Selecciona una operación para ver la salida</div>
      </div>

      <div class="js-section-title">Fragmento base</div>
      <pre class="js-code-panel">// Función variádica básica
function sumar(...numeros) {
  return numeros.reduce((sum, n) => sum + n, 0);
}

sumar(5, 10, 15);     // 30
sumar(1, 2, 3, 4, 5); // 15

// Rest con parámetro fijo
function concatenar(separador, ...textos) {
  return textos.join(separador);
}

concatenar(' - ', 'Hola', 'Mundo', 'JS');
// "Hola - Mundo - JS"

// Rest en destructuring
const [primero, ...resto] = [1, 2, 3, 4, 5];
// primero = 1, resto = [2, 3, 4, 5]</pre>
    </section>
  `;
}

export function init(root) {
  const simConsole = new SimulatedConsole();
  const consoleDisplay = root.querySelector('#var-console');

  const updateConsole = () => {
    consoleDisplay.innerHTML = simConsole.render() || '<div style="color: #888;">// Vacío</div>';
  };

  // DEMO 1: Suma
  root.querySelector('#btn-suma').addEventListener('click', () => {
    simConsole.clear();
    try {
      const input = root.querySelector('#var-nums').value;
      const numeros = input.split(',').map(n => {
        const parsed = Number(n.trim());
        if (isNaN(parsed)) throw new Error(`"${n}" no es un número`);
        return parsed;
      });

      const resultado = sumar(...numeros);
      simConsole.log(`sumar(${numeros.join(', ')})`);
      simConsole.log(`Resultado: ${resultado}`);
      updateConsole();

      root.querySelector('#var-out1').innerHTML = `
        <code>sumar(...[${numeros.join(', ')}])</code><br>
        → <strong style="color:var(--ion-color-success)">${resultado}</strong>
      `;
    } catch (e) {
      simConsole.error(e.message);
      updateConsole();
      root.querySelector('#var-out1').innerHTML = `❌ Error: ${e.message}`;
    }
  });

  // DEMO 2: Concatenar
  root.querySelector('#btn-concat').addEventListener('click', () => {
    simConsole.clear();
    try {
      const sep = root.querySelector('#var-sep').value;
      const input = root.querySelector('#var-textos').value;
      const textos = input.split(',').map(t => t.trim()).filter(t => t);

      if (textos.length === 0) throw new Error('Ingresa al menos un texto');

      const resultado = concatenarTexto(sep, ...textos);
      simConsole.log(`concatenarTexto("${sep}", "${textos.join('", "')}")`);
      simConsole.log(`Resultado: "${resultado}"`);
      updateConsole();

      root.querySelector('#var-out2').innerHTML = `
        <code>concatenarTexto("${sep}", ...${JSON.stringify(textos)})</code><br>
        → <strong style="color:var(--ion-color-primary)">"${resultado}"</strong>
      `;
    } catch (e) {
      simConsole.error(e.message);
      updateConsole();
      root.querySelector('#var-out2').innerHTML = `❌ Error: ${e.message}`;
    }
  });

  // DEMO 3: Destructuring
  root.querySelector('#btn-destruct').addEventListener('click', () => {
    simConsole.clear();
    const arr = [100, 200, 300, 400, 500];
    const [primero, ...resto] = arr;

    simConsole.log(`const [primero, ...resto] = [${arr.join(', ')}]`);
    simConsole.log(`primero = ${primero}`);
    simConsole.log(`resto = [${resto.join(', ')}]`);
    updateConsole();

    root.querySelector('#var-out3').innerHTML = `
      <code>const [primero, ...resto] = [${arr.join(', ')}];</code><br>
      <strong>primero</strong> → ${primero}<br>
      <strong>resto</strong> → [${resto.join(', ')}]
    `;
  });

  // DEMO 4: Procesamiento
  root.querySelector('#btn-proceso').addEventListener('click', () => {
    simConsole.clear();
    try {
      const tipo = root.querySelector('#var-tipo').value;
      const input = root.querySelector('#var-datos').value;
      const datos = input.split(',').map(n => {
        const parsed = Number(n.trim());
        if (isNaN(parsed)) throw new Error(`"${n}" no es un número`);
        return parsed;
      });

      if (datos.length === 0) throw new Error('Ingresa al menos un número');

      const resultado = procesarDatos(tipo, ...datos);
      simConsole.log(`procesarDatos("${tipo}", ${datos.join(', ')})`);
      simConsole.log(`Resultado: ${resultado}`);
      updateConsole();

      root.querySelector('#var-out4').innerHTML = `
        <code>procesarDatos("${tipo}", ...${JSON.stringify(datos)})</code><br>
        → <strong style="color:var(--ion-color-tertiary)">${resultado}</strong>
      `;
    } catch (e) {
      simConsole.error(e.message);
      updateConsole();
      root.querySelector('#var-out4').innerHTML = `❌ Error: ${e.message}`;
    }
  });
}
