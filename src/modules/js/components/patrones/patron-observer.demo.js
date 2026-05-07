/**
 * @file patron-observer.demo.js
 * @description Demo interactivo: Patrón Observer (EventEmitter custom).
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Patrón Observer</h2>
      <p class="js-subtitle">
        El <strong>Observer</strong> define una relación de uno-a-muchos: cuando un objeto
        (sujeto) cambia de estado, todos sus <em>suscriptores</em> son notificados
        automáticamente. Es la base del sistema de eventos del DOM, RxJS y la reactividad
        en frameworks como Vue o Angular.
      </p>

      <!-- EMITTER DEMO -->
      <div class="js-section-title">EventEmitter propio — suscribir y emitir eventos</div>
      <div class="js-controls">
        <ion-button size="small" color="primary"   id="btn-sub-a">Suscribir Módulo A</ion-button>
        <ion-button size="small" color="secondary" id="btn-sub-b">Suscribir Módulo B</ion-button>
        <ion-button size="small" color="tertiary"  id="btn-sub-c">Suscribir Logger</ion-button>
        <ion-button size="small" color="success"   id="btn-emit-data">Emitir: datos-actualizados</ion-button>
        <ion-button size="small" color="warning"   id="btn-emit-error">Emitir: error-red</ion-button>
        <ion-button size="small" color="danger"    id="btn-unsub-a">Desuscribir Módulo A</ion-button>
        <ion-button size="small" color="medium"    id="btn-clear">Limpiar log</ion-button>
      </div>
      <div id="obs-log" class="js-log" style="min-height:100px;"></div>

      <!-- IMPLEMENTACIÓN -->
      <div class="js-section-title">Implementación del EventEmitter</div>
      <pre class="js-code-panel">class EventEmitter {
  #listeners = {};  // { evento: [fn1, fn2, ...] }

  on(evento, fn) {
    if (!this.#listeners[evento]) this.#listeners[evento] = [];
    this.#listeners[evento].push(fn);
    return this; // permite chaining: emitter.on('x', f).on('y', g)
  }

  off(evento, fn) {
    if (!this.#listeners[evento]) return;
    this.#listeners[evento] = this.#listeners[evento].filter(f => f !== fn);
  }

  emit(evento, datos) {
    (this.#listeners[evento] ?? []).forEach(fn => fn(datos));
  }

  once(evento, fn) {
    const wrapper = (datos) => { fn(datos); this.off(evento, wrapper); };
    this.on(evento, wrapper);
  }
}

// Uso
const bus = new EventEmitter();

const onDatos = (d) => console.log('A recibió:', d);
bus.on('datos-actualizados', onDatos);
bus.on('datos-actualizados', (d) => console.log('B recibió:', d));

bus.emit('datos-actualizados', { total: 42 });
// A recibió: {total: 42}
// B recibió: {total: 42}

bus.off('datos-actualizados', onDatos);
bus.emit('datos-actualizados', { total: 99 });
// Solo B recibe ahora</pre>

      <!-- STORE REACTIVO -->
      <div class="js-section-title">Store reactivo con Observer (mini Redux)</div>
      <pre class="js-code-panel">class Store extends EventEmitter {
  #estado;

  constructor(estadoInicial) {
    super();
    this.#estado = estadoInicial;
  }

  getEstado() { return { ...this.#estado }; }

  setState(cambios) {
    this.#estado = { ...this.#estado, ...cambios };
    this.emit('change', this.getEstado());
  }
}

const store = new Store({ usuario: null, cargando: false });
store.on('change', (estado) => console.log('Estado nuevo:', estado));

store.setState({ cargando: true });
// → Estado nuevo: { usuario: null, cargando: true }
store.setState({ usuario: { nombre: 'Ana' }, cargando: false });
// → Estado nuevo: { usuario: {nombre: 'Ana'}, cargando: false }</pre>
    </section>
  `;
}

export function init(root) {
  class EventEmitter {
    _listeners = {};

    on(evento, fn) {
      if (!this._listeners[evento]) this._listeners[evento] = [];
      this._listeners[evento].push(fn);
      return this;
    }
    off(evento, fn) {
      if (!this._listeners[evento]) return;
      this._listeners[evento] = this._listeners[evento].filter(f => f !== fn);
    }
    emit(evento, datos) {
      (this._listeners[evento] ?? []).forEach(fn => fn(datos));
    }
    once(evento, fn) {
      const wrapper = (d) => { fn(d); this.off(evento, wrapper); };
      this.on(evento, wrapper);
    }
    listenerCount(evento) {
      return (this._listeners[evento] ?? []).length;
    }
  }

  const bus = new EventEmitter();
  const log = root.querySelector('#obs-log');

  function addLog(msg, color = '#ccc') {
    const line = document.createElement('div');
    line.className = 'js-log-line';
    line.style.borderLeftColor = color;
    line.innerHTML = `<small>${new Date().toLocaleTimeString()}</small> ${msg}`;
    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
  }

  // Suscriptores
  const handlerA = (d) => addLog(`📦 <strong>Módulo A</strong> recibió: <code>${JSON.stringify(d)}</code>`, '#5260ff');
  const handlerB = (d) => addLog(`🔧 <strong>Módulo B</strong> recibió: <code>${JSON.stringify(d)}</code>`, '#2dd36f');
  const handlerLogger = (d) => addLog(`📝 <strong>Logger</strong> registra: <code>${JSON.stringify(d)}</code>`, '#ffc409');

  const handlerErrorA = (e) => addLog(`❌ <strong>Módulo A</strong> maneja error: <code>${JSON.stringify(e)}</code>`, '#5260ff');
  const handlerErrorLog = (e) => addLog(`🚨 <strong>Logger</strong> alerta error: ${e.mensaje}`, '#ffc409');

  let subA = false, subB = false, subC = false;

  root.querySelector('#btn-sub-a').addEventListener('click', () => {
    if (subA) { addLog('⚠️ Módulo A ya está suscrito.', '#888'); return; }
    bus.on('datos-actualizados', handlerA);
    bus.on('error-red', handlerErrorA);
    subA = true;
    addLog('✅ Módulo A suscrito a: datos-actualizados, error-red', '#5260ff');
  });

  root.querySelector('#btn-sub-b').addEventListener('click', () => {
    if (subB) { addLog('⚠️ Módulo B ya está suscrito.', '#888'); return; }
    bus.on('datos-actualizados', handlerB);
    subB = true;
    addLog('✅ Módulo B suscrito a: datos-actualizados', '#2dd36f');
  });

  root.querySelector('#btn-sub-c').addEventListener('click', () => {
    if (subC) { addLog('⚠️ Logger ya está suscrito.', '#888'); return; }
    bus.on('datos-actualizados', handlerLogger);
    bus.on('error-red', handlerErrorLog);
    subC = true;
    addLog('✅ Logger suscrito a: datos-actualizados, error-red', '#ffc409');
  });

  root.querySelector('#btn-emit-data').addEventListener('click', () => {
    const payload = { total: Math.floor(Math.random() * 100), ts: Date.now() };
    const count = bus.listenerCount('datos-actualizados');
    addLog(`📡 Emitiendo <strong>datos-actualizados</strong> → ${count} listener(s)`, '#eb445a');
    bus.emit('datos-actualizados', payload);
  });

  root.querySelector('#btn-emit-error').addEventListener('click', () => {
    const err = { codigo: 503, mensaje: 'Servicio no disponible' };
    const count = bus.listenerCount('error-red');
    addLog(`📡 Emitiendo <strong>error-red</strong> → ${count} listener(s)`, '#eb445a');
    bus.emit('error-red', err);
  });

  root.querySelector('#btn-unsub-a').addEventListener('click', () => {
    if (!subA) { addLog('⚠️ Módulo A no está suscrito.', '#888'); return; }
    bus.off('datos-actualizados', handlerA);
    bus.off('error-red', handlerErrorA);
    subA = false;
    addLog('🔕 Módulo A desuscrito. Ya no recibirá eventos.', '#5260ff');
  });

  root.querySelector('#btn-clear').addEventListener('click', () => {
    log.innerHTML = '';
  });
}
