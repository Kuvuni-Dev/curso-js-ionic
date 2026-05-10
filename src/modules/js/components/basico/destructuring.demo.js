/**
 * @file destructuring.demo.js
 * @description Demo interactivo: Destructuring de objetos y arrays.
 */

export function render() {
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

      <h2>Destructuring</h2>
      <p class="js-subtitle">
        El <strong>destructuring</strong> es una sintaxis que permite extraer valores
        de arrays u objetos y asignarlos a variables de forma concisa.
        Reduce el código repetitivo y mejora la legibilidad.
      </p>

      <!-- OBJETO -->
      <div class="js-section-title">1. Destructuring de objeto</div>
      <div class="js-controls">
        <ion-button size="small" color="primary"   id="btn-obj-basic">Básico</ion-button>
        <ion-button size="small" color="secondary" id="btn-obj-rename">Renombrar</ion-button>
        <ion-button size="small" color="tertiary"  id="btn-obj-default">Valores por defecto</ion-button>
        <ion-button size="small" color="success"   id="btn-obj-nested">Anidado</ion-button>
      </div>
      <div id="obj-out" class="js-output" style="min-height:60px;">
        👆 Pulsa una variante para ver el ejemplo.
      </div>

      <!-- ARRAY -->
      <div class="js-section-title">2. Destructuring de array</div>
      <div class="js-controls">
        <ion-button size="small" color="primary"   id="btn-arr-basic">Básico</ion-button>
        <ion-button size="small" color="secondary" id="btn-arr-skip">Saltar elementos</ion-button>
        <ion-button size="small" color="success"   id="btn-arr-swap">Swap de variables</ion-button>
        <ion-button size="small" color="tertiary"  id="btn-arr-rest">Rest en array</ion-button>
      </div>
      <div id="arr-out" class="js-output" style="min-height:60px;">
        👆 Pulsa una variante para ver el ejemplo.
      </div>

      <!-- PARÁMETROS DE FUNCIÓN -->
      <div class="js-section-title">3. Destructuring en parámetros de función</div>
      <pre class="js-code-panel">// Sin destructuring (verboso)
function mostrarUsuario(usuario) {
  console.log(usuario.nombre, usuario.email);
}

// Con destructuring en el parámetro (conciso)
function mostrarUsuario({ nombre, email, rol = 'usuario' }) {
  console.log(nombre, email, rol);
}

mostrarUsuario({ nombre: 'Ana', email: 'ana@email.com' });
// "Ana" "ana@email.com" "usuario"

// También funciona con arrays:
function primeros([a, b, ...resto]) {
  return { a, b, resto };
}
primeros([1, 2, 3, 4, 5]); // { a:1, b:2, resto:[3,4,5] }</pre>

      <!-- RESUMEN -->
      <div class="js-section-title">Patrones más usados</div>
      <pre class="js-code-panel">const persona = { nombre: 'Ana', edad: 28, ciudad: 'Madrid' };

// Extraer propiedades
const { nombre, edad }      = persona;

// Renombrar
const { nombre: name }      = persona;        // name = 'Ana'

// Valor por defecto
const { pais = 'España' }   = persona;        // 'España' (no existe en obj)

// Rest
const { nombre: n, ...resto } = persona;      // resto = { edad: 28, ciudad: 'Madrid' }

// Array
const [primero, , tercero]  = [10, 20, 30];   // primero=10, tercero=30

// Swap (intercambio sin variable temporal)
let [x, y] = [1, 2];
[x, y] = [y, x];                              // x=2, y=1</pre>

        <!-- MINI-RETOS -->
        <div class="js-section-title">🎯 Mini-retos</div>
        <div style="background: #fff9c4; padding: 12px; border-radius: 4px; border-left: 4px solid #fbc02d; font-size: 13px;">
          <strong>Reto 1:</strong> Desestructura objeto anidado sin destructuring anidado (usa variables intermedias)<br>
          <strong>Reto 2:</strong> ¿Por qué las comas vacías en arrays sirven para saltar?<br>
          <strong>Reto 3:</strong> Desestructura parámetro de función con valores por defecto
        </div>

        <!-- CONSOLA SIMULADA -->
        <div class="js-section-title">Consola simulada</div>
        <div id="dest-console" style="
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
          <div style="color: #888;">// Selecciona una variante para ver la salida</div>
        </div>
    </section>
  `;
}

export function init(root) {
  const persona = {
    nombre: 'Ana',
    edad: 28,
    ciudad: 'Madrid',
    direccion: { calle: 'Gran Vía', numero: 5 },
  };

  const objOut = root.querySelector('#obj-out');
  const arrOut = root.querySelector('#arr-out');

  // Objeto
  root.querySelector('#btn-obj-basic').addEventListener('click', () => {
    const { nombre, edad, ciudad } = persona;
    objOut.innerHTML = `
      <pre class="js-code-panel" style="margin:0">const { nombre, edad, ciudad } = persona;</pre>
      <strong>nombre</strong> → "${nombre}" &nbsp;|&nbsp;
      <strong>edad</strong> → ${edad} &nbsp;|&nbsp;
      <strong>ciudad</strong> → "${ciudad}"`;
  });

  root.querySelector('#btn-obj-rename').addEventListener('click', () => {
    const { nombre: name, edad: years } = persona;
    objOut.innerHTML = `
      <pre class="js-code-panel" style="margin:0">const { nombre: name, edad: years } = persona;</pre>
      <strong>name</strong> → "${name}" &nbsp;|&nbsp;
      <strong>years</strong> → ${years}
      <br><small>La variable se llama <code>name</code>, no <code>nombre</code>.</small>`;
  });

  root.querySelector('#btn-obj-default').addEventListener('click', () => {
    const { nombre, pais = 'España', telefono = 'no disponible' } = persona;
    objOut.innerHTML = `
      <pre class="js-code-panel" style="margin:0">const { nombre, pais = 'España', telefono = 'no disponible' } = persona;</pre>
      <strong>nombre</strong> → "${nombre}" (existía)<br>
      <strong>pais</strong> → "${pais}" (valor por defecto — no estaba en el objeto)<br>
      <strong>telefono</strong> → "${telefono}" (valor por defecto)`;
  });

  root.querySelector('#btn-obj-nested').addEventListener('click', () => {
    const { nombre, direccion: { calle, numero } } = persona;
    objOut.innerHTML = `
      <pre class="js-code-panel" style="margin:0">const { nombre, direccion: { calle, numero } } = persona;</pre>
      <strong>nombre</strong> → "${nombre}"<br>
      <strong>calle</strong> → "${calle}" &nbsp;|&nbsp;
      <strong>numero</strong> → ${numero}
      <br><small>Se puede desestructurar directamente propiedades anidadas.</small>`;
  });

  // Array
  const nums = [10, 20, 30, 40, 50];

  root.querySelector('#btn-obj-basic').addEventListener('click', () => {
    simConsole.clear();
    const { nombre, edad, ciudad } = persona;
    simConsole.log(`const { nombre, edad, ciudad } = persona`);
    simConsole.log(`nombre: "${nombre}", edad: ${edad}, ciudad: "${ciudad}"`);
    updateConsole();
    objOut.innerHTML = `
      <pre class="js-code-panel" style="margin:0">const { nombre, edad, ciudad } = persona;</pre>
      <strong>nombre</strong> → "${nombre}" &nbsp;|&nbsp;
      <strong>edad</strong> → ${edad} &nbsp;|&nbsp;
      <strong>ciudad</strong> → "${ciudad}"`;
  });

  root.querySelector('#btn-arr-skip').addEventListener('click', () => {
    const [primero, , tercero, , quinto] = nums;
    arrOut.innerHTML = `
      <pre class="js-code-panel" style="margin:0">const [primero, , tercero, , quinto] = nums;</pre>
      <strong>primero</strong> → ${primero} &nbsp;|&nbsp;
      <strong>tercero</strong> → ${tercero} &nbsp;|&nbsp;
      <strong>quinto</strong> → ${quinto}
      <br><small>Las comas vacías saltan las posiciones correspondientes.</small>`;
  });

  root.querySelector('#btn-arr-swap').addEventListener('click', () => {
    let x = 1, y = 2;
    arrOut.innerHTML = `Antes: x=${x}, y=${y}<br>`;
    [x, y] = [y, x];
    arrOut.innerHTML += `
      <pre class="js-code-panel" style="margin:4px 0">let x = 1, y = 2;\n[x, y] = [y, x]; // swap sin variable temporal</pre>
      Después: <strong>x=${x}, y=${y}</strong>`;
  });

  root.querySelector('#btn-arr-rest').addEventListener('click', () => {
    const [cabeza, ...cola] = nums;
    arrOut.innerHTML = `
      <pre class="js-code-panel" style="margin:0">const [cabeza, ...cola] = [10, 20, 30, 40, 50];</pre>
      <strong>cabeza</strong> → ${cabeza}<br>
      <strong>cola</strong> → [${cola.join(', ')}]
      <br><small>El rest (<code>...</code>) recoge todos los elementos restantes en un nuevo array.</small>`;
  });
}
