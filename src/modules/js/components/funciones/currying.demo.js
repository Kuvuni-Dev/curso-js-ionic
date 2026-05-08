/**
 * @file currying.demo.js
 * @description Demo interactivo: Currying y composición de funciones.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Currying y composición</h2>
      <p class="js-subtitle">
        <strong>Currying</strong> transforma una función de <em>n</em> argumentos en
        una cadena de funciones de 1 argumento. La <strong>composición</strong> combina
        funciones de forma que la salida de una sea la entrada de la siguiente.
      </p>

      <!-- CURRYING -->
      <div class="js-section-title">Calculadora currificada</div>
      <p style="font-size:14px;margin-bottom:8px;">
        <code>sumar(a)(b)</code> — en vez de pasar dos argumentos a la vez, los pasamos uno a uno.
      </p>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:8px;">
        <div>
          <div style="font-size:12px;color:var(--ion-color-medium);margin-bottom:4px;">A</div>
          <input id="curry-a" type="number" value="5" class="js-input" />
        </div>
        <div>
          <div style="font-size:12px;color:var(--ion-color-medium);margin-bottom:4px;">B</div>
          <input id="curry-b" type="number" value="3" class="js-input" />
        </div>
        <div>
          <div style="font-size:12px;color:var(--ion-color-medium);margin-bottom:4px;">C</div>
          <input id="curry-c" type="number" value="2" class="js-input" />
        </div>
      </div>
      <div class="js-controls">
        <ion-button size="small" color="primary"   id="btn-curry-add">sumar(a)(b)</ion-button>
        <ion-button size="small" color="secondary" id="btn-curry-mul">multiplicar(a)(b)(c)</ion-button>
        <ion-button size="small" color="tertiary"  id="btn-curry-partial">sumar5 = sumar(5) → sumar5(b)</ion-button>
      </div>
      <div id="curry-output" class="js-output"></div>

      <!-- COMPOSICIÓN -->
      <div class="js-section-title">Composición de funciones</div>
      <p style="font-size:14px;margin-bottom:8px;">
        <code>compose(f, g)(x)</code> es equivalente a <code>f(g(x))</code>.
        Las funciones se aplican de derecha a izquierda.
      </p>
      <div style="margin-bottom:8px;">
        <div style="font-size:12px;color:var(--ion-color-medium);margin-bottom:4px;">Texto de entrada</div>
        <input id="compose-input" type="text" value="  hola mundo  " class="js-input" />
      </div>
      <div class="js-controls">
        <ion-button size="small" color="success"   id="btn-compose-pipe">pipe: trim → upper → exclamar</ion-button>
        <ion-button size="small" color="warning"   id="btn-compose-compose">compose: exclamar → upper → trim</ion-button>
      </div>
      <div id="compose-output" class="js-output"></div>

      <!-- CÓDIGO -->
      <div class="js-section-title">El código detrás</div>
      <pre class="js-code-panel">// Currying manual
const sumar = a => b => a + b;
sumar(5)(3);       // 8

// Aplicación parcial — fijamos un argumento
const sumar5 = sumar(5);  // función que suma 5 a cualquier número
sumar5(3);         // 8
sumar5(10);        // 15

// Currying de 3 argumentos
const multiplicar = a => b => c => a * b * c;
multiplicar(2)(3)(4); // 24

// ─────────────────────────────────────────────────
// Composición (de derecha a izquierda)
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

// Pipe (de izquierda a derecha, más intuitivo)
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const trim      = s => s.trim();
const upper     = s => s.toUpperCase();
const exclamar  = s => s + '!';

const transformar = pipe(trim, upper, exclamar);
transformar('  hola mundo  '); // "HOLA MUNDO!"</pre>
    </section>
  `;
}

export function init(root) {
  // Currying
  const sumar       = a => b => a + b;
  const multiplicar = a => b => c => a * b * c;

  const out = root.querySelector('#curry-output');
  const compOut = root.querySelector('#compose-output');

  function getABC() {
    return {
      a: Number(root.querySelector('#curry-a').value) || 0,
      b: Number(root.querySelector('#curry-b').value) || 0,
      c: Number(root.querySelector('#curry-c').value) || 0,
    };
  }

  root.querySelector('#btn-curry-add').addEventListener('click', () => {
    const { a, b } = getABC();
    const resultado = sumar(a)(b);
    out.innerHTML = `<code>sumar(${a})(${b})</code> → <strong style="color:var(--ion-color-primary)">${resultado}</strong>
      <br><small>sumar devuelve una función que espera b. Al llamarla con b obtenemos el resultado.</small>`;
  });

  root.querySelector('#btn-curry-mul').addEventListener('click', () => {
    const { a, b, c } = getABC();
    const resultado = multiplicar(a)(b)(c);
    out.innerHTML = `<code>multiplicar(${a})(${b})(${c})</code> → <strong style="color:var(--ion-color-secondary)">${resultado}</strong>
      <br><small>Cada llamada devuelve una nueva función hasta que se reciben todos los argumentos.</small>`;
  });

  root.querySelector('#btn-curry-partial').addEventListener('click', () => {
    const { a, b } = getABC();
    const sumarA = sumar(a);   // aplicación parcial
    const resultado = sumarA(b);
    out.innerHTML = `<code>const sumar${a} = sumar(${a});</code> — función parcialmente aplicada<br>
      <code>sumar${a}(${b})</code> → <strong style="color:var(--ion-color-tertiary)">${resultado}</strong>
      <br><small>La aplicación parcial fija uno o más argumentos y devuelve una función lista para los restantes.</small>`;
  });

  // Composición / Pipe
  const pipe    = (...fns) => x => fns.reduce((v, f) => f(v), x);
  const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
  const trim     = s => s.trim();
  const upper    = s => s.toUpperCase();
  const exclamar = s => s + '!';

  root.querySelector('#btn-compose-pipe').addEventListener('click', () => {
    const texto = root.querySelector('#compose-input').value;
    const transformar = pipe(trim, upper, exclamar);
    const resultado = transformar(texto);
    compOut.innerHTML = `<code>pipe(trim, upper, exclamar)("${texto}")</code><br>
      → trim: <code>"${trim(texto)}"</code><br>
      → upper: <code>"${upper(trim(texto))}"</code><br>
      → exclamar: <strong style="color:var(--ion-color-success)">"${resultado}"</strong>`;
  });

  root.querySelector('#btn-compose-compose').addEventListener('click', () => {
    const texto = root.querySelector('#compose-input').value;
    const transformar = compose(exclamar, upper, trim);
    const resultado = transformar(texto);
    compOut.innerHTML = `<code>compose(exclamar, upper, trim)("${texto}")</code> (se aplica de derecha a izq.)<br>
      → trim → upper → exclamar: <strong style="color:var(--ion-color-warning)">"${resultado}"</strong>
      <br><small>compose y pipe producen el mismo resultado cuando las funciones son puras y están en orden inverso.</small>`;
  });
}
