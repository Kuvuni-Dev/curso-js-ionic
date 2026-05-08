/**
 * @file dynamic-import.demo.js
 * @description Demo interactivo: import() dinámico y code splitting.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>import() dinámico</h2>
      <p class="js-subtitle">
        A diferencia del <code>import</code> estático (que siempre carga en el arranque),
        <code>import()</code> devuelve una <strong>Promise</strong> que carga el módulo
        solo cuando se necesita. Es la base del <strong>code splitting</strong>.
      </p>

      <!-- DEMOSTRACIÓN SIMULADA -->
      <div class="js-section-title">Carga diferida simulada</div>
      <p style="font-size:14px;margin-bottom:8px;">
        Simula cargar módulos pesados solo al primer uso. Los módulos se marcan como
        "no cargados" y se cargan la primera vez que los necesitas.
      </p>
      <div class="js-controls">
        <ion-button size="small" color="primary"   id="btn-load-charts">Cargar módulo Gráficas</ion-button>
        <ion-button size="small" color="secondary" id="btn-load-export">Cargar módulo Exportar PDF</ion-button>
        <ion-button size="small" color="tertiary"  id="btn-load-editor">Cargar módulo Editor</ion-button>
      </div>
      <div id="dynimport-out" class="js-output" style="min-height:80px;"></div>

      <!-- SYNTAX -->
      <div class="js-section-title">Sintaxis y casos de uso</div>
      <pre class="js-code-panel">// Importación ESTÁTICA — siempre se carga al inicio del bundle
import { sumar } from './matematicas.js';

// Importación DINÁMICA — se carga en tiempo de ejecución cuando se llama
const modulo = await import('./matematicas.js');
modulo.sumar(2, 3); // 5

// Con default export:
const { default: Clase } = await import('./MiClase.js');
// o:
const Clase = (await import('./MiClase.js')).default;

// ─────────────────────────────────────────────
// Caso 1: cargar módulo solo cuando el usuario lo necesita
button.addEventListener('click', async () => {
  const { renderGrafica } = await import('./charts.js'); // ~150kb
  renderGrafica(datos);
});

// Caso 2: cargar según condición
if (usuarioEsAdmin) {
  const { panelAdmin } = await import('./admin.js');
  panelAdmin.init();
}

// Caso 3: carga con import() en parámetro dinámico (con cuidado)
const idioma = 'es';
const { mensajes } = await import(\`./i18n/\${idioma}.js\`);
// ⚠️ Los bundlers no pueden analizar paths 100% dinámicos</pre>

      <!-- CODE SPLITTING -->
      <div class="js-section-title">Code splitting con Vite / Webpack</div>
      <pre class="js-code-panel">// Vite y Webpack detectan import() automáticamente y crean chunks separados.

// router.js — cada vista se carga solo cuando se navega a ella
const routes = {
  '/inicio':   () => import('./views/Inicio.js'),
  '/perfil':   () => import('./views/Perfil.js'),
  '/admin':    () => import('./views/Admin.js'),     // chunk separado
};

// Cuando el usuario navega a /admin, se descarga admin.[hash].js (50kb)
// En lugar de incluir 50kb en el bundle principal.

// ✅ Ventajas:
//    — Tiempo de carga inicial más rápido (smaller main bundle)
//    — Solo se descarga el código que el usuario realmente usa

// ⚠️ Importante: esta app usa Ionic CDN (sin bundler), por lo que
//    ya usa import() dinámico para cargar cada demo bajo demanda.</pre>

      <!-- EJEMPLO REAL -->
      <div class="js-section-title">En esta misma app</div>
      <pre class="js-code-panel">// js.view.js — exactamente así funciona este catálogo
export async function renderJsComponent(topicId) {
  // Se carga el demo SOLO cuando el usuario pulsa el tema
  const module = await import(\`./components/\${folder}/\${topicId}.demo.js\`);
  appRoot.innerHTML = module.render();
  module.init(appRoot);
}
// Cada demo es un chunk separado — 26 módulos que se cargan bajo demanda.</pre>
    </section>
  `;
}

export function init(root) {
  const out = root.querySelector('#dynimport-out');

  // Estado de módulos "cargados" (simulación)
  const modulos = {
    charts: { nombre: 'Gráficas (Chart.js)',     tamaño: '148 KB', cargado: false, tardo: null },
    export: { nombre: 'Exportar PDF (pdfmake)',  tamaño: '322 KB', cargado: false, tardo: null },
    editor: { nombre: 'Editor de código (Monaco)', tamaño: '2.4 MB', cargado: false, tardo: null },
  };

  async function cargarModulo(key) {
    const mod = modulos[key];
    if (mod.cargado) {
      out.innerHTML = `✅ <strong>${mod.nombre}</strong> ya estaba cargado en memoria (cache).<br>
        <small>Los módulos se cargan UNA SOLA VEZ y se cachean. Llamadas posteriores
        a import() del mismo módulo son instantáneas.</small>`;
      return;
    }

    out.innerHTML = `⏳ Descargando <strong>${mod.nombre}</strong> (${mod.tamaño})…`;
    const delay = key === 'editor' ? 2200 : key === 'export' ? 1500 : 800;
    const t0 = Date.now();

    await new Promise(resolve => setTimeout(resolve, delay));

    mod.cargado = true;
    mod.tardo = Date.now() - t0;

    out.innerHTML = `✅ <strong>${mod.nombre}</strong> cargado en ${mod.tardo}ms<br>
      Tamaño del chunk: <code>${mod.tamaño}</code><br><br>
      <code>const mod = await import('./${key}.js');</code><br>
      <code>mod.init(); // módulo listo para usar</code><br><br>
      <small>💡 Pulsa de nuevo para ver que la segunda carga es instantánea (cache).</small>`;
  }

  root.querySelector('#btn-load-charts').addEventListener('click', () => cargarModulo('charts'));
  root.querySelector('#btn-load-export').addEventListener('click', () => cargarModulo('export'));
  root.querySelector('#btn-load-editor').addEventListener('click', () => cargarModulo('editor'));
}
