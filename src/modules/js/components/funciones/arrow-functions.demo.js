/**
 * @file arrow-functions.demo.js
 * @description Demo interactivo: Arrow functions vs funciones clásicas.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Arrow functions</h2>
      <p class="js-subtitle">
        Las arrow functions (<code>=&gt;</code>) son una sintaxis más concisa para escribir funciones.
        Pero su diferencia más importante no es la sintaxis — es que <strong>no tienen
        su propio <code>this</code></strong> ni su propio <code>arguments</code>.
      </p>

      <!-- COMPARACIÓN SINTÁCTICA -->
      <div class="js-section-title">Comparación de sintaxis</div>
      <pre class="js-code-panel">// Función clásica
function sumar(a, b) { return a + b; }

// Arrow — bloque completo
const sumar = (a, b) => { return a + b; };

// Arrow — return implícito (sin llaves)
const sumar = (a, b) => a + b;

// Arrow — un solo parámetro (sin paréntesis)
const doble = n => n * 2;

// Arrow — sin parámetros (paréntesis obligatorio)
const saluda = () => 'Hola';</pre>

      <!-- RETURN IMPLÍCITO PLAYGROUND -->
      <div class="js-section-title">Playground: return implícito</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">
        <div>
          <div style="font-size:12px;color:var(--ion-color-medium);margin-bottom:4px;">Valor de A</div>
          <input id="inp-a" type="number" value="5" class="js-input" />
        </div>
        <div>
          <div style="font-size:12px;color:var(--ion-color-medium);margin-bottom:4px;">Valor de B</div>
          <input id="inp-b" type="number" value="3" class="js-input" />
        </div>
      </div>
      <div class="js-controls">
        <ion-button size="small" color="primary"   id="btn-sum">sumar(a, b)</ion-button>
        <ion-button size="small" color="secondary" id="btn-mul">multiplicar(a, b)</ion-button>
        <ion-button size="small" color="tertiary"  id="btn-pow">potencia(a, b)</ion-button>
      </div>
      <div id="arrow-output" class="js-output"></div>

      <!-- THIS LÉXICO -->
      <div class="js-section-title">La diferencia clave: this léxico</div>
      <div class="js-controls">
        <ion-button size="small" color="danger"  id="btn-this-regular">Con function (pierde this)</ion-button>
        <ion-button size="small" color="success" id="btn-this-arrow">Con arrow (mantiene this)</ion-button>
      </div>
      <div id="this-output" class="js-output"></div>

      <!-- CUÁNDO NO USAR -->
      <div class="js-section-title">Cuándo NO usar arrow functions</div>
      <pre class="js-code-panel">// ❌ Métodos de objeto (this no sería el objeto)
const obj = {
  nombre: 'Ana',
  saludar: () => `Hola, soy ${this.nombre}`, // this = globalThis
};
obj.saludar(); // "Hola, soy undefined"

// ❌ Constructores (no se pueden usar con new)
const Persona = (nombre) => { this.nombre = nombre; };
new Persona('Ana'); // TypeError: Persona is not a constructor

// ❌ Funciones con arguments (no tienen el objeto arguments)
const fn = () => arguments[0]; // ReferenceError en módulos

// ✅ Callbacks, promesas, array methods — ideal para arrows
[1,2,3].map(n => n * 2);
fetch(url).then(res => res.json());</pre>
    </section>
  `;
}

export function init(root) {
  const sumar       = (a, b) => a + b;
  const multiplicar = (a, b) => a * b;
  const potencia    = (a, b) => a ** b;

  const out     = root.querySelector('#arrow-output');
  const thisOut = root.querySelector('#this-output');

  function getAB() {
    const a = Number(root.querySelector('#inp-a').value) || 0;
    const b = Number(root.querySelector('#inp-b').value) || 0;
    return { a, b };
  }

  root.querySelector('#btn-sum').addEventListener('click', () => {
    const { a, b } = getAB();
    out.innerHTML = `<code>const sumar = (a, b) => a + b</code><br>
      sumar(${a}, ${b}) → <strong style="color:var(--ion-color-primary)">${sumar(a, b)}</strong>`;
  });

  root.querySelector('#btn-mul').addEventListener('click', () => {
    const { a, b } = getAB();
    out.innerHTML = `<code>const multiplicar = (a, b) => a * b</code><br>
      multiplicar(${a}, ${b}) → <strong style="color:var(--ion-color-secondary)">${multiplicar(a, b)}</strong>`;
  });

  root.querySelector('#btn-pow').addEventListener('click', () => {
    const { a, b } = getAB();
    out.innerHTML = `<code>const potencia = (a, b) => a ** b</code><br>
      potencia(${a}, ${b}) → <strong style="color:var(--ion-color-tertiary)">${potencia(a, b)}</strong>`;
  });

  // Simulación de pérdida de this con function en setTimeout
  root.querySelector('#btn-this-regular').addEventListener('click', () => {
    thisOut.innerHTML = `
      <strong style="color:var(--ion-color-danger)">❌ Con function regular en setTimeout:</strong><br>
      Dentro del callback, <code>this</code> es <code>globalThis</code> (o <code>undefined</code> en strict mode),
      no el objeto. El contador no puede acceder a <code>this.cuenta</code>.<br><br>
      <pre class="js-code-panel" style="margin:0">const timer = {
  cuenta: 0,
  iniciar() {
    setTimeout(function() {
      this.cuenta++; // ❌ this = window, no timer
      console.log(this.cuenta); // NaN
    }, 500);
  }
};</pre>`;
  });

  root.querySelector('#btn-this-arrow').addEventListener('click', () => {
    thisOut.innerHTML = `
      <strong style="color:var(--ion-color-success)">✅ Con arrow function en setTimeout:</strong><br>
      La arrow hereda el <code>this</code> del método <code>iniciar()</code> → es el objeto <code>timer</code>.<br><br>
      <pre class="js-code-panel" style="margin:0">const timer = {
  cuenta: 0,
  iniciar() {
    setTimeout(() => {
      this.cuenta++; // ✅ this = timer (heredado del scope de iniciar)
      console.log(this.cuenta); // 1, 2, 3...
    }, 500);
  }
};</pre>`;
  });
}
