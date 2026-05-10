/**
 * @file patron-singleton.demo.js
 * @description Demo interactivo: Patrón Singleton.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Patrón Singleton</h2>
      <p class="js-subtitle">
        El <strong>Singleton</strong> garantiza que una clase tenga <em>una única instancia</em>
        y proporciona un punto de acceso global a ella. Ideal para gestores de configuración,
        conexiones a base de datos o caches compartidos.
      </p>

      <!-- DEMO INTERACTIVO -->
      <div class="js-section-title">ConfigManager — singleton en acción</div>
      <div class="js-controls">
        <ion-button size="small" color="primary"   id="btn-get-a">Obtener instancia A</ion-button>
        <ion-button size="small" color="secondary" id="btn-get-b">Obtener instancia B</ion-button>
        <ion-button size="small" color="tertiary"  id="btn-get-c">Obtener instancia C</ion-button>
        <ion-button size="small" color="success"   id="btn-set-val">Cambiar config desde A</ion-button>
        <ion-button size="small" color="warning"   id="btn-read-b">Leer config desde B</ion-button>
        <ion-button size="small" color="danger"    id="btn-check-same">Verificar igualdad</ion-button>
      </div>
      <div id="singleton-out" class="js-output" style="min-height:80px;">👆 Obtén instancias y modifica la configuración.</div>

      <!-- IMPLEMENTACIÓN -->
      <div class="js-section-title">Implementación con clase y campo estático</div>
      <pre class="js-code-panel">class ConfigManager {
  // Campo privado estático — comparte el mismo valor en todas las instancias
  static #instancia = null;

  // Configuración privada
  #config = {
    tema: 'claro',
    idioma: 'es',
    debug: false,
  };

  // Constructor privado — lanza error si se llama directamente
  constructor() {
    if (ConfigManager.#instancia) {
      throw new Error('Usa ConfigManager.getInstance()');
    }
    ConfigManager.#instancia = this;
  }

  static getInstance() {
    if (!ConfigManager.#instancia) {
      ConfigManager.#instancia = new ConfigManager();
    }
    return ConfigManager.#instancia;
  }

  get(clave)           { return this.#config[clave]; }
  set(clave, valor)    { this.#config[clave] = valor; }
  getAll()             { return { ...this.#config }; }
}

// Uso:
const cfg1 = ConfigManager.getInstance();
const cfg2 = ConfigManager.getInstance();

cfg1.set('tema', 'oscuro');
cfg2.get('tema');  // 'oscuro' — es la misma instancia

cfg1 === cfg2;  // ✅ true</pre>

      <!-- VARIANTE CON MÓDULO -->
      <div class="js-section-title">Variante más simple: singleton de módulo</div>
      <pre class="js-code-panel">// config.js — el módulo actúa de singleton automáticamente
// (los ES Modules se evalúan una sola vez y se cachean)
let _config = { tema: 'claro', idioma: 'es' };

export const get = (k) => _config[k];
export const set = (k, v) => { _config[k] = v; };

// Cualquier import de config.js comparte el mismo _config:
// import * as config from './config.js';  // siempre la misma instancia</pre>

      <!-- CUÁNDO NO USAR -->
      <div class="js-section-title">Cuándo NO usar Singleton</div>
      <pre class="js-code-panel">// ⚠️ Singletons dificultan los tests unitarios porque comparten estado global.
// Alternativa: Inyección de dependencias.

// Difícil de testear:
function procesarPedido() {
  const cfg = ConfigManager.getInstance(); // dependencia oculta
}

// Fácil de testear:
function procesarPedido(config) {  // dependencia explícita = fácil de mockear
  const modo = config.get('modo');
}</pre>
    </section>
  `;
}

export function init(root) {
  // Implementación de singleton en la demo
  class ConfigManager {
    static _instancia = null;
    _config = { tema: 'claro', idioma: 'es', debug: false, version: '1.0' };
    _id;

    constructor(id) {
      this._id = id;
    }

    static getInstance(id) {
      if (!ConfigManager._instancia) {
        ConfigManager._instancia = new ConfigManager(id);
      }
      return ConfigManager._instancia;
    }

    get(clave)        { return this._config[clave]; }
    set(clave, valor) { this._config[clave] = valor; }
    getAll()          { return { ...this._config }; }
    getId()           { return this._id; }
  }

  let refA, refB, refC;
  const out = root.querySelector('#singleton-out');

  root.querySelector('#btn-get-a').addEventListener('click', () => {
    refA = ConfigManager.getInstance('A');
    out.innerHTML = `
      <strong>getInstance('A')</strong> devuelve instancia con id: <strong>${refA.getId()}</strong><br>
      Config actual: <code>${JSON.stringify(refA.getAll())}</code>
    `;
  });

  root.querySelector('#btn-get-b').addEventListener('click', () => {
    refB = ConfigManager.getInstance('B');
    out.innerHTML = `
      <strong>getInstance('B')</strong> devuelve instancia con id: <strong>${refB.getId()}</strong><br>
      <small>⚠️ El id es '<strong>${refB.getId()}</strong>' (no 'B') porque la instancia ya fue creada por A.</small><br>
      Config actual: <code>${JSON.stringify(refB.getAll())}</code>
    `;
  });

  root.querySelector('#btn-get-c').addEventListener('click', () => {
    refC = ConfigManager.getInstance('C');
    out.innerHTML = `
      <strong>getInstance('C')</strong> → id: <strong>${refC.getId()}</strong> (siempre la misma)<br>
      Las 3 referencias apuntan a <strong>un único objeto</strong>.
    `;
  });

  root.querySelector('#btn-set-val').addEventListener('click', () => {
    if (!refA) refA = ConfigManager.getInstance('A');
    refA.set('tema', 'oscuro');
    refA.set('debug', true);
    out.innerHTML = `
      <code>refA.set('tema', 'oscuro')</code><br>
      <code>refA.set('debug', true)</code><br>
      Config de refA: <code>${JSON.stringify(refA.getAll())}</code>
    `;
  });

  root.querySelector('#btn-read-b').addEventListener('click', () => {
    if (!refB) refB = ConfigManager.getInstance('B');
    out.innerHTML = `
      <code>refB.get('tema')</code> → "<strong>${refB.get('tema')}</strong>"<br>
      <code>refB.get('debug')</code> → <strong>${refB.get('debug')}</strong><br>
      <small>✅ refB ve los cambios hechos por refA porque es la MISMA instancia.</small>
    `;
  });

  root.querySelector('#btn-check-same').addEventListener('click', () => {
    if (!refA) refA = ConfigManager.getInstance('A');
    if (!refB) refB = ConfigManager.getInstance('B');
    if (!refC) refC = ConfigManager.getInstance('C');
    out.innerHTML = `
      <code>refA === refB</code> → <strong>${refA === refB}</strong><br>
      <code>refB === refC</code> → <strong>${refB === refC}</strong><br>
      <code>refA === refC</code> → <strong>${refA === refC}</strong><br>
      <small>✅ Las tres referencias apuntan exactamente al mismo objeto en memoria.</small>
    `;
  });
}
