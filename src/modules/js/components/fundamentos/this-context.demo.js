/**
 * @file this-context.demo.js
 * @description Demo interactivo: El valor de this en distintos contextos.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>El valor de <code>this</code></h2>
      <p class="js-subtitle">
        <code>this</code> no es fijo — su valor depende de <em>cómo</em> se invoca la función,
        no de dónde está definida. Hay 4 reglas fundamentales que lo determinan.
      </p>

      <!-- CONTEXTOS -->
      <div class="js-section-title">Pulsa cada contexto para ver el valor de this</div>

      <ion-list inset="true">
        <!-- 1. Función regular en global -->
        <ion-item button="true" id="ctx-global" detail="false">
          <ion-icon slot="start" name="globe-outline" color="medium"></ion-icon>
          <ion-label>
            <h3>1. Función regular (modo sloppy)</h3>
            <p><code>function fn() { return this; }</code></p>
          </ion-label>
        </ion-item>

        <!-- 2. Método de objeto -->
        <ion-item button="true" id="ctx-method" detail="false">
          <ion-icon slot="start" name="cube-outline" color="primary"></ion-icon>
          <ion-label>
            <h3>2. Método de objeto</h3>
            <p><code>obj.saludar()</code></p>
          </ion-label>
        </ion-item>

        <!-- 3. Arrow function -->
        <ion-item button="true" id="ctx-arrow" detail="false">
          <ion-icon slot="start" name="trending-up-outline" color="secondary"></ion-icon>
          <ion-label>
            <h3>3. Arrow function</h3>
            <p><code>const fn = () => this;</code> — hereda del scope exterior</p>
          </ion-label>
        </ion-item>

        <!-- 4. call / apply / bind -->
        <ion-item button="true" id="ctx-explicit" detail="false">
          <ion-icon slot="start" name="link-outline" color="tertiary"></ion-icon>
          <ion-label>
            <h3>4. Binding explícito: call / apply / bind</h3>
            <p><code>fn.call(obj)</code> — forzamos el valor de this</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <div id="this-output" class="js-output" style="margin-top:12px;min-height:60px;">
        👆 Pulsa un contexto para ver el resultado.
      </div>

      <!-- REGLA DE ORO -->
      <div class="js-section-title">Regla de oro para determinar this</div>
      <pre class="js-code-panel">// Prioridad de mayor a menor:

// 1️⃣  new Fn()          → this = nuevo objeto vacío
// 2️⃣  fn.call(obj)      → this = obj  (también apply y bind)
// 3️⃣  obj.metodo()      → this = obj
// 4️⃣  fn()              → this = globalThis (o undefined en strict mode)

// ⚠️  Arrow functions NO tienen su propio this.
//     Usan el this del scope léxico donde fueron definidas.</pre>

      <!-- TRAMPA CLÁSICA -->
      <div class="js-section-title">Trampa clásica: pérdida de contexto</div>
      <pre class="js-code-panel">const obj = {
  nombre: 'Ana',
  saludar() { console.log('Hola, soy', this.nombre); },
};

obj.saludar();             // ✅ "Hola, soy Ana"

const fn = obj.saludar;
fn();                      // ❌ "Hola, soy undefined"
                           // Al extraer el método perdemos el contexto

// Soluciones:
const fnBound = obj.saludar.bind(obj);  // bind guarda el contexto
fnBound();                              // ✅ "Hola, soy Ana"

// O convertir el método en arrow (si el contexto permite):
// saludar: () => this.nombre  ← ojo: aquí this sería el scope exterior</pre>
    </section>
  `;
}

export function init(root) {
  const out = root.querySelector('#this-output');

  // Contexto 1: función regular
  root.querySelector('#ctx-global').addEventListener('click', () => {
    out.innerHTML = `
      <strong>Función regular (modo no estricto):</strong><br>
      <code>this</code> → <span style="color:var(--ion-color-primary)">globalThis</span>
      (el objeto global: <code>window</code> en un navegador).<br>
      En <strong>strict mode</strong> sería <code>undefined</code>.
      <pre class="js-code-panel" style="margin-top:8px">function fn() {
  console.log(this); // window (o globalThis)
}
fn();</pre>`;
  });

  // Contexto 2: método de objeto
  root.querySelector('#ctx-method').addEventListener('click', () => {
    const obj = { nombre: 'Ana', saludar() { return this.nombre; } };
    const resultado = obj.saludar();
    out.innerHTML = `
      <strong>Método de objeto:</strong><br>
      <code>obj.saludar()</code> → <code>this</code> es <strong>obj</strong>.
      Resultado: <span style="color:var(--ion-color-primary)">"${resultado}"</span>
      <pre class="js-code-panel" style="margin-top:8px">const obj = {
  nombre: 'Ana',
  saludar() { return this.nombre; } // this = obj
};
obj.saludar(); // "Ana"</pre>`;
  });

  // Contexto 3: arrow function
  root.querySelector('#ctx-arrow').addEventListener('click', () => {
    out.innerHTML = `
      <strong>Arrow function:</strong><br>
      Las arrows <strong>NO tienen su propio this</strong>.
      Capturan el <code>this</code> del scope léxico donde se definen.
      <pre class="js-code-panel" style="margin-top:8px">const timer = {
  segundos: 0,
  inicio() {
    // Si usáramos function() { }, this sería undefined en el callback
    setInterval(() => {
      this.segundos++;  // ✅ this es 'timer' (scope léxico del método)
    }, 1000);
  }
};

// Con function() regular en setInterval:
// setInterval(function() {
//   this.segundos++;  // ❌ this = globalThis o undefined en strict
// }, 1000);</pre>`;
  });

  // Contexto 4: call / apply / bind
  root.querySelector('#ctx-explicit').addEventListener('click', () => {
    function presentar(saludo, puntuacion) {
      return `${saludo}, soy ${this.nombre}${puntuacion}`;
    }
    const persona = { nombre: 'Carlos' };
    const c = presentar.call(persona, 'Hola', '!');
    const a = presentar.apply(persona, ['Buenos días', '.']);
    const b = presentar.bind(persona, 'Hey');
    out.innerHTML = `
      <strong>Binding explícito (call / apply / bind):</strong><br>
      <code>call</code> → <span style="color:var(--ion-color-primary)">"${c}"</span><br>
      <code>apply</code> → <span style="color:var(--ion-color-secondary)">"${a}"</span><br>
      <code>bind</code> → <span style="color:var(--ion-color-tertiary)">"${b('!')}"</span>
      <pre class="js-code-panel" style="margin-top:8px">function presentar(saludo, punt) {
  return \`\${saludo}, soy \${this.nombre}\${punt}\`;
}
const persona = { nombre: 'Carlos' };

presentar.call(persona, 'Hola', '!');       // llama ahora, args separados
presentar.apply(persona, ['Buenos días', '.']); // llama ahora, args en array
const fnBound = presentar.bind(persona, 'Hey'); // devuelve nueva función
fnBound('!');                                // llama después</pre>`;
  });
}
