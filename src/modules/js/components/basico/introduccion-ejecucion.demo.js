/**
 * @file introduccion-ejecucion.demo.js
 * @description Demo interactivo: entender cómo JavaScript ejecuta código línea por línea.
 */

// Utilidad: Consola simulada
class SimulatedConsole {
  constructor() {
    this.logs = [];
  }
  log(...args) {
    this.logs.push({ type: 'log', message: args.map(a => String(a)).join(' ') });
  }
  warn(...args) {
    this.logs.push({ type: 'warn', message: args.map(a => String(a)).join(' ') });
  }
  error(...args) {
    this.logs.push({ type: 'error', message: args.map(a => String(a)).join(' ') });
  }
  clear() {
    this.logs = [];
  }
  render() {
    return this.logs.map(log => `<span style="color: ${log.type === 'error' ? '#d32f2f' : log.type === 'warn' ? '#f57c00' : '#1976d2'}">${log.type === 'error' ? '❌' : log.type === 'warn' ? '⚠️' : '✓'} ${log.message}</span>`).join('<br>');
  }
}

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Introducción: Ejecución de código</h2>
      <p class="js-subtitle">
        JavaScript es un lenguaje <strong>interpretado</strong> que ejecuta instrucciones <strong>de arriba hacia abajo</strong>
        (top-to-bottom, left-to-right). Cada línea se ejecuta en orden, y el orden importa.
      </p>

      <!-- ESCENARIO: ORDEN DE EJECUCIÓN -->
      <div class="js-section-title">Escenario 1: ¿Qué pasa con el orden?</div>
      <p style="font-size: 0.9rem; color: #666;">Observa qué ocurre cuando cambias el orden de las líneas.</p>
      
      <div class="js-controls">
        <ion-button size="small" color="primary" id="btn-orden-correcto">
          Orden correcto
        </ion-button>
        <ion-button size="small" color="secondary" id="btn-orden-incorrecto">
          Orden incorrecto
        </ion-button>
      </div>

      <div id="intro-output-1" class="js-output" style="min-height:80px;">
        👆 Pulsa para ver el impacto del orden de ejecución.
      </div>

      <!-- ESCENARIO: VARIABLES NO DECLARADAS -->
      <div class="js-section-title">Escenario 2: Acceso antes de declaración</div>
      <p style="font-size: 0.9rem; color: #666;">¿Qué sucede si intentas usar una variable antes de declararla?</p>

      <div class="js-controls">
        <ion-button size="small" color="primary" id="btn-var-antes">
          Con var (hoisting)
        </ion-button>
        <ion-button size="small" color="secondary" id="btn-let-antes">
          Con let/const (ReferenceError)
        </ion-button>
      </div>

      <div id="intro-output-2" class="js-output" style="min-height:80px;">
        👆 Pulsa para ver diferencias de temporal dead zone.
      </div>

      <!-- ESCENARIO: FUNCIONES Y SCOPE -->
      <div class="js-section-title">Escenario 3: Scope global vs local</div>
      <p style="font-size: 0.9rem; color: #666;">Las variables dentro de funciones son locales; las fuera son globales.</p>

      <div class="js-controls">
        <ion-button size="small" color="primary" id="btn-scope-global">
          Acceder global
        </ion-button>
        <ion-button size="small" color="secondary" id="btn-scope-local">
          Crear local
        </ion-button>
      </div>

      <!-- MINI-RETOS -->
      <div class="js-section-title">🎯 Mini-retos para practicar</div>
      <div style="background: #fff9c4; padding: 12px; border-radius: 4px; border-left: 4px solid #fbc02d;">
        <strong>Reto 1:</strong> Cambia el orden del código de "Orden incorrecto" ¿Qué sucede?<br>
        <strong>Reto 2:</strong> Intenta acceder a una variable antes de declararla. ¿Qué error ves?<br>
        <strong>Reto 3:</strong> Crea una función que acceda a una variable global. ¿Funciona?
      </div>

      <!-- CONSOLA SIMULADA -->
      <div class="js-section-title">Consola simulada</div>
      <div id="intro-console" style="
        background: #1e1e1e;
        color: #d4d4d4;
        padding: 12px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        font-size: 12px;
        max-height: 120px;
        overflow-y: auto;
        border: 1px solid #333;
      ">
        <div style="color: #888;">// La salida de console.log aparece aquí</div>
      </div>

      <!-- CÓDIGO EJEMPLO -->
      <div class="js-section-title">Fragmento de referencia</div>
      <pre class="js-code-panel">// Orden correcto ✅
let nombre = 'Ana';
let saludo = 'Hola, ' + nombre;
console.log(saludo);  // "Hola, Ana"

// Orden incorrecto ❌
console.log(saludo);  // undefined o ReferenceError
let saludo = 'Hola, Ana';

// Scope global
let global = 'Accesible en todas partes';

function miFunc() {
  let local = 'Solo aquí dentro';
  console.log(global);  // ✅ Se puede acceder
  console.log(local);   // ✅ Se puede acceder
}

console.log(local);  // ❌ ReferenceError</pre>
    </section>
  `;
}

export function init(root) {
  const simConsole = new SimulatedConsole();
  const consoleDisplay = root.querySelector('#intro-console');
  const out = root.querySelector('#intro-output-1');

  const updateConsole = () => {
    const content = simConsole.render() || '<span style="color: #888;">// Vacío</span>';
    consoleDisplay.innerHTML = content;
  };

  const logToConsole = (...args) => {
    simConsole.log(...args);
    updateConsole();
  };

  // Escenario 1: Orden de ejecución
  root.querySelector('#btn-orden-correcto').addEventListener('click', () => {
    try {
      simConsole.clear();
      let x = 5;
      logToConsole('x =', x);
      let y = 10;
      logToConsole('y =', y);
      let suma = x + y;
      logToConsole('suma = x + y =', suma);
      
      out.innerHTML = `
        <strong>Orden correcto:</strong><br>
        ✅ Las variables se declaran ANTES de usarlas<br>
        <span style="color: green;">El resultado es predecible</span>
      `;
    } catch (e) {
      simConsole.log('❌ Error:', e.message);
      updateConsole();
      out.innerHTML = `<span style="color: red;">❌ Error: ${e.message}</span>`;
    }
  });

  root.querySelector('#btn-orden-incorrecto').addEventListener('click', () => {
    try {
      simConsole.clear();
      let out2 = `<strong>Intento de acceso incorrecto:</strong><br>`;
      out2 += `<span style="color: red;">console.log(suma); // ReferenceError<br>`;
      out2 += `let suma = 5 + 10;</span><br><br>`;
      out2 += `<span style="color: red;">❌ No puedes usar 'suma' antes de declararla</span>`;
      
      logToConsole('💡 Si ejecutaras este código fallaría aquí:', 'ReferenceError: suma is not defined');
      out.innerHTML = out2;
    } catch (e) {
      out.innerHTML = `<span style="color: red;">❌ Error: ${e.message}</span>`;
    }
  });

  // Escenario 2: Variables con hoisting
  root.querySelector('#btn-var-antes').addEventListener('click', () => {
    try {
      simConsole.clear();
      logToConsole('console.log(x);  // undefined (hoisting)');
      logToConsole('var x = 5;');
      logToConsole('console.log(x);  // 5');
      
      let out2 = `<strong>Con var (hoisting):</strong><br>`;
      out2 += `JavaScript mueve la declaración al inicio.<br>`;
      out2 += `<span style="color: orange;">⚠️ x empieza como undefined, luego = 5</span>`;
      out.innerHTML = out2;
    } catch (e) {
      out.innerHTML = `<span style="color: red;">❌ Error: ${e.message}</span>`;
    }
  });

  root.querySelector('#btn-let-antes').addEventListener('click', () => {
    try {
      simConsole.clear();
      logToConsole('❌ ReferenceError: Cannot access "x" before initialization');
      
      let out2 = `<strong>Con let/const (temporal dead zone):</strong><br>`;
      out2 += `<span style="color: red;">ReferenceError inmediato</span><br>`;
      out2 += `<span style="color: green;">✅ Comportamiento seguro y predecible</span>`;
      out.innerHTML = out2;
    } catch (e) {
      out.innerHTML = `<span style="color: red;">❌ Error: ${e.message}</span>`;
    }
  });

  // Escenario 3: Scope
  root.querySelector('#btn-scope-global').addEventListener('click', () => {
    try {
      simConsole.clear();
      let global = 'Soy global';
      
      logToConsole('let global =', global);
      logToConsole('Dentro de función, accedo a global:', global);
      
      let out2 = `<strong>Acceso global:</strong><br>`;
      out2 += `<span style="color: green;">✅ Dentro de la función accedo a global</span>`;
      out.innerHTML = out2;
    } catch (e) {
      out.innerHTML = `<span style="color: red;">❌ Error: ${e.message}</span>`;
    }
  });

  root.querySelector('#btn-scope-local').addEventListener('click', () => {
    try {
      simConsole.clear();
      logToConsole('Dentro función: local =', 'Solo aquí');
      logToConsole('❌ Fuera función: ReferenceError: local is not defined');
      
      let out2 = `<strong>Scope local:</strong><br>`;
      out2 += `<span style="color: red;">❌ No puedo acceder 'local' desde fuera</span><br>`;
      out2 += `<span style="color: green;">✅ Está protegida dentro de su scope</span>`;
      out.innerHTML = out2;
    } catch (e) {
      out.innerHTML = `<span style="color: red;">❌ Error: ${e.message}</span>`;
    }
  });
}
