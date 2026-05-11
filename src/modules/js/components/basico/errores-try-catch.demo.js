/**
 * @file errores-try-catch.demo.js
 * @description Demo interactivo: manejo de errores con try/catch/finally.
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

      <h2>Errores: try/catch/finally</h2>
      <p class="js-subtitle">
        Los <strong>errores</strong> (exceptions) suceden cuando algo sale mal.
        Con <code>try/catch/finally</code>, puedes "atrapar" errores y tu código sigue ejecutándose.
      </p>

      <!-- LABORATORIO INTERACTIVO -->
      <div class="js-section-title">Laboratorio: Detecta y maneja errores</div>

      <!-- ESCENARIO 1: ERROR DE REFERENCIA -->
      <div class="js-section-title">Escenario 1: ReferenceError (variable no existe)</div>
      <div class="js-controls">
        <ion-button size="small" color="danger" id="err-btn-referen">
          Acceder var no definida
        </ion-button>
        <ion-button size="small" color="primary" id="err-btn-referen-catch">
          Con try/catch
        </ion-button>
      </div>

      <!-- ESCENARIO 2: ERROR DE TIPO -->
      <div class="js-section-title">Escenario 2: TypeError (operación inválida)</div>
      <div class="js-controls">
        <ion-button size="small" color="danger" id="err-btn-type">
          Llamar método en null
        </ion-button>
        <ion-button size="small" color="primary" id="err-btn-type-catch">
          Con try/catch
        </ion-button>
      </div>

      <!-- ESCENARIO 3: ERROR DE SINTAXIS EN JSON -->
      <div class="js-section-title">Escenario 3: SyntaxError (JSON inválido)</div>
      <ion-item>
        <ion-label position="stacked">JSON (válido o inválido):</ion-label>
        <ion-textarea id="err-textarea-json" placeholder='{"nombre":"Ana"}' rows="3"></ion-textarea>
      </ion-item>
      <div class="js-controls">
        <ion-button size="small" color="danger" id="err-btn-json-fail">
          Parse sin protección
        </ion-button>
        <ion-button size="small" color="primary" id="err-btn-json-safe">
          Parse con try/catch
        </ion-button>
      </div>

      <!-- ESCENARIO 4: LANZAR ERROR PROPIO -->
      <div class="js-section-title">Escenario 4: throw (lanzar error manual)</div>
      <ion-item>
        <ion-label position="stacked">Edad:</ion-label>
        <ion-input type="number" id="err-input-edad" placeholder="18"></ion-input>
      </ion-item>
      <div class="js-controls">
        <ion-button size="small" color="danger" id="err-btn-throw">
          Validar edad (sin protección)
        </ion-button>
        <ion-button size="small" color="primary" id="err-btn-throw-catch">
          Validar con try/catch
        </ion-button>
      </div>

      <!-- ESCENARIO 5: FINALLY (limpieza) -->
      <div class="js-section-title">Escenario 5: finally (siempre se ejecuta)</div>
      <div class="js-controls">
        <ion-button size="small" color="primary" id="err-btn-finally-1">
          Éxito + finally
        </ion-button>
        <ion-button size="small" color="warning" id="err-btn-finally-2">
          Error + finally
        </ion-button>
      </div>

      <!-- MINI-RETOS -->
      <div class="js-section-title">🎯 Mini-retos</div>
      <div class="js-mini-retos-box">
        <strong>Reto 1:</strong> Escribe JSON con error intencionado ¿Qué ves?<br>
        <strong>Reto 2:</strong> Prueba con edad = -5 o 200 ¿Qué pasa?<br>
        <strong>Reto 3:</strong> ¿Por qué finally SIEMPRE se ejecuta?
      </div>

      <!-- CONSOLA SIMULADA -->
      <div class="js-section-title">Consola simulada</div>
      <div id="errores-console" style="
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
        <div style="color: #888;">// Los errores aparecen aquí</div>
      </div>

      <!-- CÓDIGO EJEMPLO -->
      <div class="js-section-title">Fragmento de referencia</div>
      <pre class="js-code-panel">// try = intenta ejecutar
// catch = atrapa el error si falla
try {
  const datos = JSON.parse('{"inválido"');  // ❌ Esto falla
  console.log(datos);
} catch (error) {
  // ✅ El error se atrapa aquí
  console.log('Error:', error.message);
}

// finally = SIEMPRE se ejecuta (incluso si hay error)
try {
  // código
} catch (error) {
  // si hay error
} finally {
  // Limpieza: cerrar conexión, liberar recursos
  console.log('Bloque finally siempre se ejecuta');
}

// throw = lanzar error manual
function validarEdad(edad) {
  if (edad < 0) {
    throw new Error('La edad no puede ser negativa');
  }
  return edad;
}</pre>

      <div id="errores-output" class="js-output" style="min-height:80px;">👆 Interactúa para ver manejo de errores.</div>
    </section>
  `;
}

export function init(root) {
  const simConsole = new SimulatedConsole();
  const consoleDisplay = root.querySelector('#errores-console');
  const out = root.querySelector('#errores-output');

  const updateConsole = () => {
    consoleDisplay.innerHTML = simConsole.render() || '<div style="color: #888;">// Vacío</div>';
  };

  // Escenario 1: ReferenceError sin protección
  root.querySelector('#err-btn-referen').addEventListener('click', () => {
    simConsole.clear();
    simConsole.error('ReferenceError: variableNoDefinida is not defined');
    updateConsole();
    out.innerHTML = `
      ❌ <strong>ReferenceError</strong> sin protección<br>
      La página se detendría si este código corriera.
    `;
  });

  // Con try/catch
  root.querySelector('#err-btn-referen-catch').addEventListener('click', () => {
    simConsole.clear();
    simConsole.log('try { ... }');
    simConsole.error('ReferenceError: variableNoDefinida is not defined');
    simConsole.log('catch (error) { ... }  ✅ Error atrapado');
    updateConsole();
    out.innerHTML = `
      ✅ <strong>Error atrapado con try/catch</strong><br>
      La página sigue funcionando perfectamente.
    `;
  });

  // Escenario 2: TypeError sin protección
  root.querySelector('#err-btn-type').addEventListener('click', () => {
    simConsole.clear();
    simConsole.error('TypeError: Cannot read property "toUpperCase" of null');
    updateConsole();
    out.innerHTML = `
      ❌ <strong>TypeError</strong> sin protección<br>
      La página se detendría.
    `;
  });

  // Con try/catch
  root.querySelector('#err-btn-type-catch').addEventListener('click', () => {
    simConsole.clear();
    simConsole.log('try { null.toUpperCase() }');
    simConsole.error('TypeError: Cannot read property "toUpperCase" of null');
    simConsole.log('catch (error) { ... }  ✅ Atrapado');
    updateConsole();
    out.innerHTML = `
      ✅ <strong>Error atrapado</strong><br>
      La página sigue funcionando.
    `;
  });

  // Escenario 3: JSON inválido sin protección
  root.querySelector('#err-btn-json-fail').addEventListener('click', () => {
    simConsole.clear();
    const json = root.querySelector('#err-textarea-json').value;
    try {
      JSON.parse(json);
    } catch (error) {
      simConsole.error('SyntaxError:', error.message);
    }
    updateConsole();
    out.innerHTML = `⚠️ JSON.parse() falló (deberías usar try/catch SIEMPRE)`;
  });

  // Con try/catch
  root.querySelector('#err-btn-json-safe').addEventListener('click', () => {
    simConsole.clear();
    const json = root.querySelector('#err-textarea-json').value;
    try {
      const obj = JSON.parse(json);
      simConsole.log('JSON parseado:', JSON.stringify(obj));
      updateConsole();
      out.innerHTML = `✅ <strong>JSON parseado correctamente</strong><br>Objeto: <code>${JSON.stringify(obj)}</code>`;
    } catch (error) {
      simConsole.warn('JSON inválido:', error.message);
      updateConsole();
      out.innerHTML = `✅ Error atrapado correctamente (código sigue ejecutándose)`;
    }
  });

  // Escenario 4: throw propio sin protección
  root.querySelector('#err-btn-throw').addEventListener('click', () => {
    simConsole.clear();
    simConsole.error('Validación sin protección: si falla, página se detiene');
    updateConsole();
    out.innerHTML = `❌ Validación sin protección`;
  });

  // Con try/catch
  root.querySelector('#err-btn-throw-catch').addEventListener('click', () => {
    simConsole.clear();
    const edad = root.querySelector('#err-input-edad').value;
    try {
      if (!edad) {
        throw new Error('La edad no puede estar vacía');
      }
      if (edad < 0) {
        throw new Error('La edad no puede ser negativa');
      }
      if (edad > 120) {
        throw new Error('Edad poco realista (> 120)');
      }
      simConsole.log(`Edad válida: ${edad} años`);
      updateConsole();
      out.innerHTML = `✅ Edad válida: <strong>${edad} años</strong>`;
    } catch (error) {
      simConsole.error('Validación fallida:', error.message);
      updateConsole();
      out.innerHTML = `✅ Error atrapado: ${error.message}`;
    }
  });

  // Escenario 5: finally
  root.querySelector('#err-btn-finally-1').addEventListener('click', () => {
    simConsole.clear();
    simConsole.log('try { x = 5 * 2 }');
    simConsole.log('resultado: 10');
    simConsole.log('finally { ... }  ✅ SIEMPRE EJECUTA');
    updateConsole();
    out.innerHTML = `✅ Bloque finally se ejecutó INCLUSO sin error`;
  });

  root.querySelector('#err-btn-finally-2').addEventListener('click', () => {
    simConsole.clear();
    simConsole.log('try { noExiste() }');
    simConsole.error('ReferenceError: noExiste is not defined');
    simConsole.log('catch { ... }  ✅ Error atrapado');
    simConsole.log('finally { ... }  ✅ SIEMPRE EJECUTA');
    updateConsole();
    out.innerHTML = `✅ Bloque finally se ejecutó INCLUSO CON error`;
  });
}

