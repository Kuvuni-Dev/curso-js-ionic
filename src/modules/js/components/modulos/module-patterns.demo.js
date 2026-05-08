/**
 * @file module-patterns.demo.js
 * @description Demo interactivo: IIFE y Revealing Module Pattern.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Patrones de módulo</h2>
      <p class="js-subtitle">
        Antes de los ES Modules (ES2015), los desarrolladores creaban módulos manualmente
        usando <strong>IIFE</strong> (Immediately Invoked Function Expressions) y el
        <strong>Revealing Module Pattern</strong>. Entenderlos ayuda a leer código legado
        y comprender qué hace por nosotros el sistema de módulos moderno.
      </p>

      <!-- IIFE -->
      <div class="js-section-title">1. IIFE — función autoejecutada</div>
      <p style="font-size:14px;margin-bottom:8px;">
        Una IIFE crea un scope privado que se ejecuta inmediatamente,
        evitando contaminar el scope global.
      </p>
      <div class="js-controls">
        <ion-button size="small" color="primary"   id="btn-iife-demo">Probar IIFE</ion-button>
        <ion-button size="small" color="secondary" id="btn-iife-param">IIFE con parámetros</ion-button>
      </div>
      <div id="iife-out" class="js-output" style="min-height:50px;"></div>
      <pre class="js-code-panel">;(function () {
  // Todo lo que está aquí es PRIVADO
  const mensajesEnviados = 0;
  const API_KEY = 'abc123';

  function enviar(msg) { /* … */ }

  // Nada se filtra al scope global
})();

// Variante moderna con arrow:
(() => {
  const local = 'privado';
  console.log(local); // ✅
})();

console.log(typeof local); // "undefined" — no existe fuera</pre>

      <!-- REVEALING MODULE PATTERN -->
      <div class="js-section-title">2. Revealing Module Pattern</div>
      <p style="font-size:14px;margin-bottom:8px;">
        Devuelve un objeto con solo los métodos y propiedades que queremos hacer públicos.
        El resto permanece privado en el closure de la IIFE.
      </p>
      <div class="js-controls">
        <ion-button size="small" color="primary"   id="btn-rmp-add">Agregar tarea</ion-button>
        <ion-button size="small" color="success"   id="btn-rmp-done">Completar #1</ion-button>
        <ion-button size="small" color="warning"   id="btn-rmp-list">Listar tareas</ion-button>
        <ion-button size="small" color="danger"    id="btn-rmp-acceso">Acceso a privado</ion-button>
      </div>
      <div id="rmp-out" class="js-output" style="min-height:60px;"></div>

      <pre class="js-code-panel">const TaskManager = (function () {
  // PRIVADO — no accesible desde fuera
  let _tareas = [];
  let _nextId = 1;

  function _buscar(id) {
    return _tareas.find(t => t.id === id);
  }

  // PÚBLICO — solo lo que se retorna en el objeto
  return {
    agregar(texto) {
      const tarea = { id: _nextId++, texto, hecha: false };
      _tareas.push(tarea);
      return tarea;
    },
    completar(id) {
      const t = _buscar(id);
      if (t) t.hecha = true;
      return t;
    },
    listar() { return [..._tareas]; }, // copia, no referencia
  };
})();

TaskManager.agregar('Estudiar closures');
TaskManager.completar(1);
TaskManager._tareas;    // undefined — es privado
TaskManager._nextId;    // undefined — es privado</pre>

      <!-- COMPARATIVA -->
      <div class="js-section-title">Comparativa histórica</div>
      <pre class="js-code-panel">// Época pre-ES6 (2010) — patrón IIFE
var MiModulo = (function () {
  var privado = 0;
  return { incrementar: function () { privado++; return privado; } };
})();

// ES2015 — ES Modules (archivos separados)
// contador.js
let privado = 0;
export function incrementar() { privado++; return privado; }

// main.js
import { incrementar } from './contador.js';
// ✅ Scope privado automático, sin IIFE
// ✅ Static analysis, tree-shaking
// ✅ Sintaxis limpia y estándar</pre>
    </section>
  `;
}

export function init(root) {
  // IIFE demo
  const iifeOut = root.querySelector('#iife-out');

  root.querySelector('#btn-iife-demo').addEventListener('click', () => {
    // Simular el resultado de una IIFE
    const resultado = (() => {
      const privado = 42;
      const secreto = 'no me ves';
      return { publico: privado * 2, mensaje: 'IIFE ejecutada' };
    })();

    iifeOut.innerHTML = `
      IIFE ejecutada. Devuelve: <code>${JSON.stringify(resultado)}</code><br>
      <code>typeof privado</code> fuera de la IIFE → <strong>"undefined"</strong><br>
      <code>typeof secreto</code> fuera de la IIFE → <strong>"undefined"</strong><br>
      <small>✅ Las variables privadas no existen en el scope externo.</small>
    `;
  });

  root.querySelector('#btn-iife-param').addEventListener('click', () => {
    const nombre = 'Curso JS';
    const resultado = ((modulo, version) => {
      return { inicializado: true, info: `${modulo} v${version}` };
    })(nombre, '2.0');

    iifeOut.innerHTML = `
      IIFE con parámetros:<br>
      <code>(function(modulo, version) { … })("${nombre}", "2.0")</code><br>
      Resultado: <code>${JSON.stringify(resultado)}</code><br>
      <small>Pasar dependencias globales como parámetros — patrón común en código legado con jQuery.</small>
    `;
  });

  // Revealing Module Pattern
  const TaskManager = (() => {
    let _tareas = [];
    let _nextId = 1;
    function _buscar(id) { return _tareas.find(t => t.id === id); }
    return {
      agregar(texto) {
        const tarea = { id: _nextId++, texto, hecha: false };
        _tareas.push(tarea);
        return tarea;
      },
      completar(id) {
        const t = _buscar(id);
        if (t) t.hecha = true;
        return t;
      },
      listar() { return [..._tareas]; },
    };
  })();

  const rmpOut = root.querySelector('#rmp-out');
  let tareaCount = 1;

  root.querySelector('#btn-rmp-add').addEventListener('click', () => {
    const t = TaskManager.agregar(`Tarea de ejemplo #${tareaCount++}`);
    rmpOut.innerHTML = `
      <code>TaskManager.agregar(...)</code> → <code>${JSON.stringify(t)}</code><br>
      Total de tareas: ${TaskManager.listar().length}
    `;
  });

  root.querySelector('#btn-rmp-done').addEventListener('click', () => {
    const t = TaskManager.completar(1);
    rmpOut.innerHTML = t
      ? `<code>TaskManager.completar(1)</code> → <code>${JSON.stringify(t)}</code><br>
         La tarea #1 está ahora marcada como hecha.`
      : `⚠️ No existe la tarea #1 (aún no has creado ninguna).`;
  });

  root.querySelector('#btn-rmp-list').addEventListener('click', () => {
    const lista = TaskManager.listar();
    if (!lista.length) {
      rmpOut.innerHTML = 'No hay tareas. Pulsa <em>Agregar tarea</em> primero.';
      return;
    }
    rmpOut.innerHTML = `<strong>Tareas (${lista.length}):</strong><br>` +
      lista.map(t => `${t.hecha ? '✅' : '⏳'} #${t.id}: ${t.texto}`).join('<br>');
  });

  root.querySelector('#btn-rmp-acceso').addEventListener('click', () => {
    rmpOut.innerHTML = `
      <code>TaskManager._tareas</code> → <strong>${JSON.stringify(TaskManager['_tareas'])}</strong> (undefined)<br>
      <code>TaskManager._nextId</code> → <strong>${JSON.stringify(TaskManager['_nextId'])}</strong> (undefined)<br>
      <code>TaskManager._buscar</code> → <strong>${typeof TaskManager['_buscar']}</strong> (undefined)<br>
      <small>✅ Las variables y funciones privadas del closure son completamente inaccesibles desde fuera.</small>
    `;
  });
}
