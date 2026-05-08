/**
 * @file mixins.demo.js
 * @description Demo interactivo: Mixins y composición de objetos.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Mixins y composición</h2>
      <p class="js-subtitle">
        JavaScript solo permite herencia <em>simple</em> (una clase padre).
        Los <strong>mixins</strong> resuelven esto copiando métodos de múltiples fuentes
        en una clase. La <strong>composición</strong> va más allá: "favorece la composición
        sobre la herencia".
      </p>

      <!-- DEMO MIXINS -->
      <div class="js-section-title">Mixins: combinar capacidades</div>
      <div class="js-controls">
        <ion-button size="small" color="primary"   id="btn-crear-usuario">Crear Usuario</ion-button>
        <ion-button size="small" color="secondary" id="btn-crear-admin">Crear Admin</ion-button>
        <ion-button size="small" color="tertiary"  id="btn-crear-bot">Crear Bot (sin Loggable)</ion-button>
      </div>
      <div id="mixin-out" class="js-output" style="min-height:80px;">👆 Pulsa para crear un objeto.</div>

      <!-- CÓDIGO -->
      <div class="js-section-title">Implementación de mixins</div>
      <pre class="js-code-panel">// Mixins — objetos con métodos reutilizables
const Serializable = {
  serialize()   { return JSON.stringify(this); },
  toJSON()      { return { ...this }; },
};

const Loggable = {
  log(msg) { console.log(`[${this.nombre ?? 'obj'}] ${msg}`); },
  warn(msg) { console.warn(`[${this.nombre ?? 'obj'}] ⚠️ ${msg}`); },
};

const Validable = {
  validate() {
    const errores = [];
    if (!this.nombre)  errores.push('nombre requerido');
    if (!this.email)   errores.push('email requerido');
    return errores.length ? { valido: false, errores } : { valido: true };
  },
};

// Clase base
class Usuario {
  constructor(nombre, email) {
    this.nombre = nombre;
    this.email  = email;
  }
  saludar() { return `Hola, soy ${this.nombre}`; }
}

// Aplicar mixins con Object.assign sobre el prototipo
Object.assign(Usuario.prototype, Serializable, Loggable, Validable);

// Herencia + Mixins adicionales
class Admin extends Usuario {
  constructor(nombre, email, nivel) {
    super(nombre, email);
    this.nivel = nivel;
  }
  administrar() { return `${this.nombre} administra el sistema (nivel ${this.nivel})`; }
}
Object.assign(Admin.prototype, Serializable, Loggable, Validable);</pre>

      <!-- COMPOSICIÓN -->
      <div class="js-section-title">Composición funcional vs herencia</div>
      <pre class="js-code-panel">// Problema de herencia: ¿qué pasa si necesitamos Perro que vuela Y nada?
// class Animal → class Perro extends Animal     ✅ ladra
// class Animal → class Ave extends Animal       ✅ vuela
// class PerroVolador extends ??? (herencia múltiple no existe)

// Solución con composición:
const puedeVolar = (obj) => ({
  ...obj,
  volar: () => `${obj.nombre} vuela`,
});
const puedeNadar = (obj) => ({
  ...obj,
  nadar: () => `${obj.nombre} nada`,
});

const perro = { nombre: 'Rex' };
const perroAnfibio = puedeNadar(puedeVolar(perro));
perroAnfibio.volar(); // "Rex vuela"
perroAnfibio.nadar(); // "Rex nada"
// No hay jerarquía de herencia — solo composición de capacidades</pre>
      <div class="js-controls">
        <ion-button size="small" color="success" id="btn-compose-demo">Probar composición funcional</ion-button>
      </div>
      <div id="compose-out" class="js-output" style="min-height:50px;"></div>
    </section>
  `;
}

export function init(root) {
  // Mixins
  const Serializable = {
    serialize()  { return JSON.stringify({ nombre: this.nombre, email: this.email }); },
  };
  const Loggable = {
    log(msg)  { return `[${this.nombre}] ${msg}`; },
    warn(msg) { return `[${this.nombre}] ⚠️ ${msg}`; },
  };
  const Validable = {
    validate() {
      const errores = [];
      if (!this.nombre) errores.push('nombre requerido');
      if (!this.email)  errores.push('email requerido');
      return errores.length ? { valido: false, errores } : { valido: true };
    },
  };

  class Usuario {
    constructor(nombre, email) {
      this.nombre = nombre;
      this.email  = email;
    }
    saludar() { return `Hola, soy ${this.nombre}`; }
  }
  Object.assign(Usuario.prototype, Serializable, Loggable, Validable);

  class Admin extends Usuario {
    constructor(nombre, email, nivel) {
      super(nombre, email);
      this.nivel = nivel;
    }
    administrar() { return `${this.nombre} administra el sistema (nivel ${this.nivel})`; }
  }
  Object.assign(Admin.prototype, Serializable, Loggable, Validable);

  // Bot sin Loggable
  class Bot {
    constructor(nombre) { this.nombre = nombre; this.email = null; }
    ejecutar() { return `${this.nombre} ejecuta tarea automática`; }
  }
  Object.assign(Bot.prototype, Serializable, Validable);

  const out = root.querySelector('#mixin-out');

  root.querySelector('#btn-crear-usuario').addEventListener('click', () => {
    const u = new Usuario('Ana', 'ana@email.com');
    const v = u.validate();
    out.innerHTML = `
      <strong>Usuario creado con mixins Serializable + Loggable + Validable:</strong><br>
      <code>u.saludar()</code> → "${u.saludar()}" (método propio)<br>
      <code>u.log('inicio de sesión')</code> → "${u.log('inicio de sesión')}" (de Loggable)<br>
      <code>u.serialize()</code> → <code>${u.serialize()}</code> (de Serializable)<br>
      <code>u.validate()</code> → <code>${JSON.stringify(v)}</code> (de Validable)
    `;
  });

  root.querySelector('#btn-crear-admin').addEventListener('click', () => {
    const a = new Admin('Carlos', 'carlos@empresa.com', 3);
    out.innerHTML = `
      <strong>Admin extiende Usuario y también usa mixins:</strong><br>
      <code>a.saludar()</code> → "${a.saludar()}" (heredado de Usuario)<br>
      <code>a.administrar()</code> → "${a.administrar()}" (método propio de Admin)<br>
      <code>a.warn('permiso denegado')</code> → "${a.warn('permiso denegado')}" (de Loggable)<br>
      <code>a.validate()</code> → <code>${JSON.stringify(a.validate())}</code> (de Validable)
    `;
  });

  root.querySelector('#btn-crear-bot').addEventListener('click', () => {
    const b = new Bot('CronBot');
    const tieneLog = typeof b.log === 'function';
    const tieneVal = typeof b.validate === 'function';
    out.innerHTML = `
      <strong>Bot solo tiene Serializable + Validable (sin Loggable):</strong><br>
      <code>b.ejecutar()</code> → "${b.ejecutar()}"<br>
      <code>typeof b.log</code> → <strong>"${typeof b.log}"</strong> (no tiene Loggable) ✅<br>
      <code>typeof b.validate</code> → <strong>"${typeof b.validate}"</strong> (sí tiene Validable) ✅<br>
      <code>b.validate()</code> → <code>${JSON.stringify(b.validate())}</code>
    `;
  });

  // Composición funcional
  const puedeVolar = (obj) => ({ ...obj, volar() { return `${this.nombre} vuela`; } });
  const puedeNadar = (obj) => ({ ...obj, nadar() { return `${this.nombre} nada`; } });
  const puedeLadrar = (obj) => ({ ...obj, ladrar() { return `${this.nombre}: ¡Guau!`; } });

  root.querySelector('#btn-compose-demo').addEventListener('click', () => {
    const base = { nombre: 'Rex' };
    const perroAnfibio = puedeLadrar(puedeNadar(puedeVolar(base)));
    const ave = puedeVolar({ nombre: 'Loro' });
    root.querySelector('#compose-out').innerHTML = `
      <code>const perroAnfibio = puedeLadrar(puedeNadar(puedeVolar({ nombre: 'Rex' })));</code><br>
      <code>perroAnfibio.volar()</code> → "${perroAnfibio.volar()}"<br>
      <code>perroAnfibio.nadar()</code> → "${perroAnfibio.nadar()}"<br>
      <code>perroAnfibio.ladrar()</code> → "${perroAnfibio.ladrar()}"<br><br>
      <code>const ave = puedeVolar({ nombre: 'Loro' });</code><br>
      <code>ave.volar()</code> → "${ave.volar()}"<br>
      <small>✅ Composición sin herencia. Cada capacidad es independiente y reutilizable.</small>
    `;
  });
}
