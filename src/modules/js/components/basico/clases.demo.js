/**
 * @file clases.demo.js
 * @description Demo interactivo: Clases ES6, herencia y polimorfismo.
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

      <h2>Clases y herencia</h2>
      <p class="js-subtitle">
        Las <strong>clases</strong> de ES6 son azúcar sintáctico sobre el sistema
        de prototipos de JavaScript. Ofrecen una sintaxis más familiar para programadores
        de otros lenguajes, pero por debajo siguen usando prototipos.
      </p>

      <!-- INSTANCIAR -->
      <div class="js-section-title">Jerarquía: Animal → Mamífero → Perro</div>
      <div class="js-controls">
        <ion-button size="small" color="primary"   id="btn-new-animal">new Animal('Loro')</ion-button>
        <ion-button size="small" color="secondary" id="btn-new-mamifero">new Mamifero('Gato')</ion-button>
        <ion-button size="small" color="success"   id="btn-new-perro">new Perro('Rex')</ion-button>
        <ion-button size="small" color="tertiary"  id="btn-instanceof">Comprobar instanceof</ion-button>
      </div>
      <div id="cls-out" class="js-output" style="min-height:60px;">👆 Pulsa para crear una instancia.</div>

      <!-- CÓDIGO -->
      <div class="js-section-title">Implementación</div>
      <pre class="js-code-panel">class Animal {
  constructor(nombre) {
    this.nombre = nombre;   // propiedad de instancia
  }
  respirar() {
    return \`${this.nombre} respira\`;
  }
  // toString es heredado de Object.prototype — lo sobreescribimos
  toString() { return \`Animal(${this.nombre})\`; }
}

class Mamifero extends Animal {
  constructor(nombre) {
    super(nombre);          // SIEMPRE llamar super() antes de usar this
    this.sangre = 'caliente';
  }
  alimentarCrias() {
    return \`${this.nombre} alimenta a sus crías\`;
  }
}

class Perro extends Mamifero {
  constructor(nombre, raza) {
    super(nombre);
    this.raza = raza;
  }
  ladrar() { return \`${this.nombre}: ¡Guau!\`; }

  // Override (polimorfismo)
  toString() { return \`Perro(${this.nombre}, ${this.raza})\`; }
}

// Métodos estáticos — no pertenecen a instancias
class MathUtils {
  static sumar(a, b)  { return a + b; }
  static cuadrado(n)  { return n ** 2; }
}
MathUtils.sumar(3, 4); // 7 — sin new</pre>

      <!-- MÉTODOS ESTÁTICOS -->
      <div class="js-section-title">Métodos estáticos</div>
      <div class="js-controls">
        <ion-button size="small" color="warning" id="btn-static">Probar MathUtils estático</ion-button>
      </div>
      <div id="static-out" class="js-output" style="min-height:40px;"></div>

      <!-- MINI-RETOS -->
      <div class="js-section-title">🎯 Mini-retos</div>
      <div class="js-mini-retos-box">
        <strong>Reto 1:</strong> ¿Qué diferencia hay entre super() y this?<br>
        <strong>Reto 2:</strong> Crea una clase Gato que herede de Mamífero<br>
        <strong>Reto 3:</strong> ¿Por qué instanceof devuelve true para toda la cadena?
      </div>

      <!-- CONSOLA SIMULADA -->
      <div class="js-section-title">Consola simulada</div>
      <div id="cls-console" style="
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
        <div style="color: #888;">// Crea una instancia para ver la salida</div>
      </div>
    </section>
  `;
}

export function init(root) {
  const simConsole = new SimulatedConsole();
  const consoleDisplay = root.querySelector('#cls-console');
  const updateConsole = () => {
    consoleDisplay.innerHTML = simConsole.render() || '<div style="color: #888;">// Vacío</div>';
  };

  class Animal {
    constructor(nombre) { this.nombre = nombre; }
    respirar()  { return `${this.nombre} respira`; }
    toString()  { return `Animal("${this.nombre}")`; }
  }

  class Mamifero extends Animal {
    constructor(nombre) {
      super(nombre);
      this.sangre = 'caliente';
    }
    alimentarCrias() { return `${this.nombre} alimenta a sus crías`; }
  }

  class Perro extends Mamifero {
    constructor(nombre, raza = 'mestizo') {
      super(nombre);
      this.raza = raza;
    }
    ladrar()   { return `${this.nombre}: ¡Guau!`; }
    toString() { return `Perro("${this.nombre}", raza: "${this.raza}")`; }
  }

  class MathUtils {
    static sumar(a, b)    { return a + b; }
    static cuadrado(n)    { return n ** 2; }
    static esPrimo(n) {
      if (n < 2) return false;
      for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false;
      return true;
    }
  }

  const out    = root.querySelector('#cls-out');
  const statOut = root.querySelector('#static-out');

  root.querySelector('#btn-new-animal').addEventListener('click', () => {
    simConsole.clear();
    const a = new Animal('Loro');
    simConsole.log('new Animal("Loro")');
    simConsole.log(`toString(): ${a}`);
    simConsole.log(`instanceof Animal: ${a instanceof Animal}`);
    updateConsole();
    out.innerHTML = `
      <code>const a = new Animal('Loro');</code><br>
      <strong>${a}</strong><br>
      <code>a.respirar()</code> → "${a.respirar()}"<br>
      <code>a instanceof Animal</code> → <strong>${a instanceof Animal}</strong><br>
      <code>a instanceof Mamifero</code> → <strong>${a instanceof Mamifero}</strong>
    `;
  });

  root.querySelector('#btn-new-mamifero').addEventListener('click', () => {
    const m = new Mamifero('Gato');
    out.innerHTML = `
      <code>const m = new Mamifero('Gato');</code><br>
      <code>m.respirar()</code> → "${m.respirar()}" (heredado de Animal)<br>
      <code>m.alimentarCrias()</code> → "${m.alimentarCrias()}"<br>
      <code>m instanceof Mamifero</code> → <strong>${m instanceof Mamifero}</strong><br>
      <code>m instanceof Animal</code> → <strong>${m instanceof Animal}</strong>
    `;
  });

  root.querySelector('#btn-new-perro').addEventListener('click', () => {
    const p = new Perro('Rex', 'Pastor Alemán');
    out.innerHTML = `
      <code>const p = new Perro('Rex', 'Pastor Alemán');</code><br>
      <strong>${p}</strong> (toString sobreescrito)<br>
      <code>p.respirar()</code> → "${p.respirar()}" (de Animal, 2 niveles arriba)<br>
      <code>p.alimentarCrias()</code> → "${p.alimentarCrias()}" (de Mamifero)<br>
      <code>p.ladrar()</code> → "${p.ladrar()}"<br>
      <code>p instanceof Perro</code> → <strong>${p instanceof Perro}</strong><br>
      <code>p instanceof Animal</code> → <strong>${p instanceof Animal}</strong>
    `;
  });

  root.querySelector('#btn-instanceof').addEventListener('click', () => {
    const p = new Perro('Max');
    out.innerHTML = `
      <code>const p = new Perro('Max');</code><br><br>
      <strong>Cadena de instanceof:</strong><br>
      <code>p instanceof Perro</code>    → <strong>${p instanceof Perro}</strong><br>
      <code>p instanceof Mamifero</code> → <strong>${p instanceof Mamifero}</strong><br>
      <code>p instanceof Animal</code>   → <strong>${p instanceof Animal}</strong><br>
      <code>p instanceof Object</code>   → <strong>${p instanceof Object}</strong>
      <br><small>instanceof recorre la cadena de prototipos — Perro hereda de Mamifero, que hereda de Animal.</small>
    `;
  });

  root.querySelector('#btn-static').addEventListener('click', () => {
    statOut.innerHTML = `
      <code>MathUtils.sumar(7, 3)</code> → <strong>${MathUtils.sumar(7, 3)}</strong><br>
      <code>MathUtils.cuadrado(8)</code> → <strong>${MathUtils.cuadrado(8)}</strong><br>
      <code>MathUtils.esPrimo(17)</code> → <strong>${MathUtils.esPrimo(17)}</strong><br>
      <code>MathUtils.esPrimo(18)</code> → <strong>${MathUtils.esPrimo(18)}</strong><br>
      <small>Los métodos estáticos se llaman directamente en la clase, no en instancias. <code>new MathUtils().sumar</code> sería <code>undefined</code>.</small>
    `;
  });
}

