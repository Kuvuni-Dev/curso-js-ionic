/**
 * @file prototype.demo.js
 * @description Demo interactivo: Cadena de prototipos en JavaScript.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Cadena de prototipos</h2>
      <p class="js-subtitle">
        En JavaScript cada objeto tiene un enlace interno <code>[[Prototype]]</code>
        que apunta a otro objeto. Cuando buscas una propiedad, el motor sube por
        esta cadena hasta encontrarla o llegar a <code>null</code>.
      </p>

      <!-- JERARQUÍA VISUAL -->
      <div class="js-section-title">Jerarquía Animal → Mamífero → Perro</div>
      <div id="proto-chain" class="js-proto-chain">
        <div class="js-proto-node" style="border-color:var(--ion-color-primary)">perro</div>
        <div class="js-proto-arrow">→ [[Prototype]]</div>
        <div class="js-proto-node" style="border-color:var(--ion-color-secondary)">Mamifero.prototype</div>
        <div class="js-proto-arrow">→ [[Prototype]]</div>
        <div class="js-proto-node" style="border-color:var(--ion-color-tertiary)">Animal.prototype</div>
        <div class="js-proto-arrow">→ [[Prototype]]</div>
        <div class="js-proto-node" style="border-color:var(--ion-color-medium)">Object.prototype</div>
        <div class="js-proto-arrow">→</div>
        <div class="js-proto-node" style="border-color:var(--ion-color-danger)">null</div>
      </div>

      <!-- PLAYGROUND -->
      <div class="js-section-title">Buscar propiedad en la cadena</div>
      <p style="font-size:14px;margin-bottom:8px;">
        Pulsa cada botón para ver en qué nivel de la cadena se encuentra la propiedad.
      </p>
      <div class="js-controls">
        <ion-button size="small" color="primary"    id="btn-proto-nombre">perro.nombre</ion-button>
        <ion-button size="small" color="secondary"  id="btn-proto-sangre">perro.sangre</ion-button>
        <ion-button size="small" color="tertiary"   id="btn-proto-respirar">perro.respirar()</ion-button>
        <ion-button size="small" color="success"    id="btn-proto-tostring">perro.toString()</ion-button>
        <ion-button size="small" color="danger"     id="btn-proto-volar">perro.volar()</ion-button>
      </div>
      <div id="proto-output" class="js-output"></div>

      <!-- hasOwnProperty -->
      <div class="js-section-title">hasOwnProperty vs herencia</div>
      <div class="js-controls">
        <ion-button size="small" color="primary"   id="btn-own-nombre">hasOwnProperty("nombre")</ion-button>
        <ion-button size="small" color="secondary" id="btn-own-sangre">hasOwnProperty("sangre")</ion-button>
        <ion-button size="small" color="tertiary"  id="btn-own-respirar">hasOwnProperty("respirar")</ion-button>
      </div>
      <div id="own-output" class="js-output"></div>

      <!-- CÓDIGO -->
      <div class="js-section-title">El código detrás</div>
      <pre class="js-code-panel">function Animal(nombre) {
  this.nombre = nombre;          // propiedad propia del objeto
}
Animal.prototype.respirar = function () {
  return \`${this.nombre} respira\`;  // en Animal.prototype
};

function Mamifero(nombre, sangre) {
  Animal.call(this, nombre);     // hereda propiedades propias
  this.sangre = sangre;
}
Mamifero.prototype = Object.create(Animal.prototype);
Mamifero.prototype.constructor = Mamifero;

function Perro(nombre) {
  Mamifero.call(this, nombre, 'caliente');
}
Perro.prototype = Object.create(Mamifero.prototype);
Perro.prototype.constructor = Perro;
Perro.prototype.ladrar = function () {
  return \`${this.nombre}: ¡Guau!\`;
};

const perro = new Perro('Rex');

// Búsqueda en cadena:
perro.nombre       // ✅ en el propio objeto
perro.sangre       // ✅ en el propio objeto (heredado vía call)
perro.respirar()   // ✅ en Animal.prototype (2 niveles arriba)
perro.toString()   // ✅ en Object.prototype (3 niveles arriba)
perro.volar()      // ❌ TypeError: no existe en ningún nivel</pre>
    </section>
  `;
}

export function init(root) {
  // Jerarquía real construida con el patrón del código mostrado
  function Animal(nombre) { this.nombre = nombre; }
  Animal.prototype.respirar = function () { return `${this.nombre} respira`; };

  function Mamifero(nombre, sangre) {
    Animal.call(this, nombre);
    this.sangre = sangre;
  }
  Mamifero.prototype = Object.create(Animal.prototype);
  Mamifero.prototype.constructor = Mamifero;

  function Perro(nombre) { Mamifero.call(this, nombre, 'caliente'); }
  Perro.prototype = Object.create(Mamifero.prototype);
  Perro.prototype.constructor = Perro;
  Perro.prototype.ladrar = function () { return `${this.nombre}: ¡Guau!`; };

  const perro = new Perro('Rex');
  const out   = root.querySelector('#proto-output');
  const ownOut = root.querySelector('#own-output');

  const lookup = {
    'btn-proto-nombre':   () => ({ res: perro.nombre,      nivel: 'objeto propio (perro)',  ok: true }),
    'btn-proto-sangre':   () => ({ res: perro.sangre,      nivel: 'objeto propio (heredado vía call)', ok: true }),
    'btn-proto-respirar': () => ({ res: perro.respirar(),  nivel: 'Animal.prototype',       ok: true }),
    'btn-proto-tostring': () => ({ res: perro.toString(),  nivel: 'Object.prototype',       ok: true }),
    'btn-proto-volar':    () => ({ res: null,              nivel: '—',                      ok: false }),
  };

  Object.entries(lookup).forEach(([id, fn]) => {
    root.querySelector(`#${id}`).addEventListener('click', () => {
      const { res, nivel, ok } = fn();
      out.innerHTML = ok
        ? `✅ Encontrado en <strong>${nivel}</strong> → valor: <code>${res}</code>`
        : `❌ <strong>TypeError</strong>: No existe en ningún nivel de la cadena. El motor llegó a <code>null</code> sin encontrarla.`;
    });
  });

  const ownLookup = {
    'btn-own-nombre':   { prop: 'nombre',   result: true,  loc: 'objeto propio' },
    'btn-own-sangre':   { prop: 'sangre',   result: true,  loc: 'objeto propio' },
    'btn-own-respirar': { prop: 'respirar', result: false, loc: 'Animal.prototype (no es propia)' },
  };

  Object.entries(ownLookup).forEach(([id, { prop, result, loc }]) => {
    root.querySelector(`#${id}`).addEventListener('click', () => {
      const icon = result ? '✅' : '⚠️';
      ownOut.innerHTML = `${icon} <code>perro.hasOwnProperty("${prop}")</code> → <strong>${result}</strong>
        <br><small style="color:var(--ion-color-medium)">La propiedad está en: ${loc}</small>`;
    });
  });
}
