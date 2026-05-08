/**
 * @file hoisting.demo.js
 * @description Demo interactivo: Hoisting de var, function y TDZ de let/const.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Hoisting y Zona Muerta Temporal (TDZ)</h2>
      <p class="js-subtitle">
        <strong>Hoisting</strong> es el mecanismo por el que el motor de JavaScript
        "eleva" las declaraciones al inicio de su scope antes de ejecutar el código.
        Afecta de forma distinta a <code>var</code>, <code>function</code> y <code>let/const</code>.
      </p>

      <!-- EXPERIMENTOS -->
      <div class="js-section-title">Ejecuta cada experimento y observa el resultado</div>

      <ion-list inset="true">
        <ion-item button="true" id="exp-var" detail="false">
          <ion-icon slot="start" name="arrow-up-outline" color="warning"></ion-icon>
          <ion-label>
            <h3>Experimento 1: Hoisting de <code>var</code></h3>
            <p>Usar una variable var antes de declararla</p>
          </ion-label>
        </ion-item>
        <ion-item button="true" id="exp-func" detail="false">
          <ion-icon slot="start" name="arrow-up-outline" color="success"></ion-icon>
          <ion-label>
            <h3>Experimento 2: Hoisting de declaración de función</h3>
            <p>Llamar a una función antes de definirla</p>
          </ion-label>
        </ion-item>
        <ion-item button="true" id="exp-let" detail="false">
          <ion-icon slot="start" name="warning-outline" color="danger"></ion-icon>
          <ion-label>
            <h3>Experimento 3: TDZ con <code>let</code></h3>
            <p>Usar let antes de su declaración — zona muerta temporal</p>
          </ion-label>
        </ion-item>
        <ion-item button="true" id="exp-func-expr" detail="false">
          <ion-icon slot="start" name="warning-outline" color="danger"></ion-icon>
          <ion-label>
            <h3>Experimento 4: Expresión de función con <code>var</code></h3>
            <p>Llamar a una expresión de función antes de asignarla</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <div id="hoist-output" class="js-output" style="margin-top:12px;min-height:60px;">
        👆 Pulsa un experimento para ver el resultado.
      </div>

      <!-- TABLA RESUMEN -->
      <div class="js-section-title">Resumen de comportamiento</div>
      <pre class="js-code-panel">// ┌──────────────────────┬──────────────┬───────────────────────┐
// │  Tipo                │  ¿Elevado?   │  Valor antes de decl. │
// ├──────────────────────┼──────────────┼───────────────────────┤
// │  var x = 5           │  ✅ Sí       │  undefined             │
// │  function fn() {}    │  ✅ Sí       │  función completa      │
// │  let x = 5           │  ✅ Sí*      │  ReferenceError (TDZ)  │
// │  const x = 5         │  ✅ Sí*      │  ReferenceError (TDZ)  │
// │  var fn = () => {}   │  ✅ Sí       │  undefined (no es fn)  │
// └──────────────────────┴──────────────┴───────────────────────┘

// * let y const SÍ se elevan pero quedan en la TDZ (Temporal Dead Zone)
//   hasta que el control del programa llega a su declaración.</pre>

      <!-- CÓMO LO VE EL MOTOR -->
      <div class="js-section-title">Cómo transforma el motor el código con <code>var</code></div>
      <pre class="js-code-panel">// Lo que escribes:
console.log(x);   // undefined
var x = 5;
console.log(x);   // 5

// Lo que el motor "lee" internamente (hoisting):
var x;            // declaración elevada al inicio del scope
console.log(x);   // undefined (declarada pero no asignada aún)
x = 5;            // la asignación se queda donde estaba
console.log(x);   // 5</pre>
    </section>
  `;
}

export function init(root) {
  const out = root.querySelector('#hoist-output');

  root.querySelector('#exp-var').addEventListener('click', () => {
    // Simulación segura del comportamiento (no podemos hacer hoisting real en módulos)
    out.innerHTML = `
      <strong>var hoisting:</strong><br>
      La declaración se eleva al inicio del scope → la variable existe pero
      su valor es <code>undefined</code> antes de la asignación.<br><br>
      <pre class="js-code-panel" style="margin-top:4px">console.log(x); // → undefined  (¡no error!)
var x = 5;
console.log(x); // → 5</pre>
      ⚠️ Este comportamiento sorpresivo es una de las razones por las que
      se prefiere <code>let</code> y <code>const</code> en código moderno.
    `;
  });

  root.querySelector('#exp-func').addEventListener('click', () => {
    // Declaración de función — se puede llamar antes de definirla
    function saluda(nombre) { return `¡Hola, ${nombre}!`; }
    const res = saluda('Mundo');
    out.innerHTML = `
      <strong>Hoisting de declaración de función:</strong><br>
      La función completa se eleva — se puede invocar antes de su definición en el código.<br>
      Resultado de llamada: <span style="color:var(--ion-color-success)">"${res}"</span><br><br>
      <pre class="js-code-panel" style="margin-top:4px">console.log(saluda('Mundo')); // → "¡Hola, Mundo!"  ✅

function saluda(nombre) {
  return \`¡Hola, \${nombre}!\`;
}
// El motor eleva la función COMPLETA, no solo su nombre.</pre>
    `;
  });

  root.querySelector('#exp-let').addEventListener('click', () => {
    out.innerHTML = `
      <strong>TDZ con let (Temporal Dead Zone):</strong><br>
      <code>let</code> y <code>const</code> sí se elevan, pero permanecen en la
      <em>zona muerta temporal</em> hasta su declaración.
      Acceder antes genera un <code>ReferenceError</code>.<br><br>
      <pre class="js-code-panel" style="margin-top:4px">console.log(y); // ❌ ReferenceError: Cannot access 'y' before initialization
let y = 10;     // aquí termina la TDZ de 'y'
console.log(y); // ✅ 10</pre>
      ✅ <strong>Ventaja:</strong> El error es inmediato y claro, ayuda a detectar
      bugs de orden de declaración en lugar de silenciarlos con <code>undefined</code>.
    `;
  });

  root.querySelector('#exp-func-expr').addEventListener('click', () => {
    out.innerHTML = `
      <strong>Expresión de función con var:</strong><br>
      Solo se eleva la declaración <code>var</code>, <strong>no</strong> la asignación.
      Llamarla antes de la asignación da <code>TypeError</code> porque
      <code>undefined</code> no es una función.<br><br>
      <pre class="js-code-panel" style="margin-top:4px">console.log(typeof doblar); // "undefined"  (var elevada, sin valor aún)
doblar(4);                   // ❌ TypeError: doblar is not a function

var doblar = function(n) { return n * 2; };
doblar(4);                   // ✅ 8</pre>
      📌 La diferencia clave con la <em>declaración</em> de función:
      <code>function doblar(n) {}</code> eleva la función completa; la expresión solo eleva el nombre.
    `;
  });
}
