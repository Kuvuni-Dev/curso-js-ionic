/**
 * @file ion-nav.demo.js
 * @description Demo didáctico de ion-nav.
 *
 * ion-nav implementa una pila de navegación (stack) con animaciones de
 * push/pop, al estilo de la navegación nativa de iOS y Android.
 *
 * A diferencia de ion-router (que usa URLs), ion-nav es programático:
 * las páginas se apilan y desapilan mediante métodos JavaScript.
 *
 * Métodos principales:
 *  - push(component, props?) → añade una página a la pila
 *  - pop()                   → elimina la página superior (retrocede)
 *  - popToRoot()             → vuelve a la primera página de la pila
 *  - setRoot(component)      → reemplaza toda la pila por una página nueva
 *  - getActive()             → devuelve la vista activa
 *
 * Caso de uso típico: secciones de la app con flujos de múltiples pasos
 * (formularios de varios pasos, asistentes, flujos de pago…) donde no
 * interesa exponer las URLs intermedias.
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/nav
 */

const CODE_BASIC = `<!-- ion-nav se coloca donde deben renderizarse las páginas -->
<ion-app>
  <ion-nav id="main-nav" root="app-home"></ion-nav>
</ion-app>`;

const CODE_PUSH_POP = `// Obtener referencia al nav
const nav = document.querySelector('ion-nav');

// PUSH — añade una página a la pila con animación de entrada
await nav.push('app-detalle', { itemId: 42 });
//                             ↑ props que recibe el componente

// POP — elimina la página superior (botón "Atrás")
await nav.pop();

// POP TO ROOT — vuelve directamente a la raíz de la pila
await nav.popToRoot();

// SET ROOT — reemplaza toda la pila (útil en login → home)
await nav.setRoot('app-home');`;

const CODE_COMPONENT = `// Definir un componente de página como Custom Element
class AppDetalle extends HTMLElement {
  // ion-nav pasa las props como propiedades del elemento
  set itemId(value) {
    this._itemId = value;
    this.render();
  }

  render() {
    this.innerHTML = \`
      <ion-page>
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-back-button></ion-back-button>
            </ion-buttons>
            <ion-title>Detalle \${this._itemId}</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <p>Contenido del ítem \${this._itemId}</p>
        </ion-content>
      </ion-page>
    \`;
  }
}

customElements.define('app-detalle', AppDetalle);`;

const CODE_VS = `// ┌─────────────────────────────────────────────────────────┐
// │              ion-router  vs  ion-nav                    │
// ├──────────────────────┬──────────────────────────────────┤
// │  ion-router          │  ion-nav                         │
// ├──────────────────────┼──────────────────────────────────┤
// │  Declarativo (HTML)  │  Programático (JS)               │
// │  Basado en URLs      │  Basado en pila (stack)          │
// │  Deep linking ✅     │  Deep linking ❌                 │
// │  Botón atrás nativo  │  push() / pop() manuales         │
// │  Tabs, rutas anid.   │  Flujos de pasos, wizards        │
// └──────────────────────┴──────────────────────────────────┘`;

/**
 * @returns {string}
 */
export function render() {
  return `
    <section class="demo-page">

      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-nav</h2>
        <p class="demo-desc">
          Pila de navegación programática. Las páginas se apilan con
          <code>push()</code> y se desapilan con <code>pop()</code>,
          con animaciones nativas de iOS y Android.
        </p>
      </div>

      <!-- ── GRUPO: Cómo funciona la pila ───────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">¿Cómo funciona la pila?</h3>
        <p class="demo-group-desc">
          Cada llamada a <code>push()</code> añade una página encima de la actual.
          <code>pop()</code> la elimina y vuelve a la anterior.
        </p>
        <div class="demo-stack">
          <div class="demo-stack__item demo-stack__item--active">
            <ion-icon name="document-outline"></ion-icon>
            <span>app-detalle (activa)</span>
            <ion-badge color="success">top</ion-badge>
          </div>
          <div class="demo-stack__item">
            <ion-icon name="document-outline"></ion-icon>
            <span>app-lista</span>
          </div>
          <div class="demo-stack__item">
            <ion-icon name="home-outline"></ion-icon>
            <span>app-home (raíz)</span>
            <ion-badge color="medium">root</ion-badge>
          </div>
        </div>
        <div class="demo-row" style="margin-top:12px;">
          <ion-chip color="primary" id="demo-nav-push">
            <ion-icon name="add-outline"></ion-icon>
            <ion-label>push()</ion-label>
          </ion-chip>
          <ion-chip color="danger" id="demo-nav-pop">
            <ion-icon name="remove-outline"></ion-icon>
            <ion-label>pop()</ion-label>
          </ion-chip>
          <ion-chip color="medium" id="demo-nav-root">
            <ion-icon name="home-outline"></ion-icon>
            <ion-label>popToRoot()</ion-label>
          </ion-chip>
        </div>
        <p style="margin-top:8px;font-size:0.9rem;">
          Páginas en pila: <strong id="demo-nav-count">3</strong>
        </p>
      </div>

      <!-- ── GRUPO: Código base ─────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Código base</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_BASIC)}</code></pre>
      </div>

      <!-- ── GRUPO: push / pop / setRoot ───────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">push() · pop() · popToRoot()</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_PUSH_POP)}</code></pre>
      </div>

      <!-- ── GRUPO: Definir un componente de página ─────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Definir una página como Custom Element</h3>
        <p class="demo-group-desc">
          <code>ion-nav</code> trabaja con Web Components nativos.
          Las props se pasan directamente como propiedades del elemento.
        </p>
        <pre class="demo-code"><code>${escapeHtml(CODE_COMPONENT)}</code></pre>
      </div>

      <!-- ── GRUPO: ion-router vs ion-nav ──────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">ion-router vs ion-nav</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_VS)}</code></pre>
      </div>

    </section>
  `;
}

/**
 * @param {HTMLElement} container
 */
export function init(container) {
  let count = 3; // simulación del tamaño de la pila
  const countEl = container.querySelector('#demo-nav-count');
  const stackItems = container.querySelectorAll('.demo-stack__item');

  const updateStack = () => {
    countEl.textContent = count;
    stackItems.forEach((item, i) => {
      // índice 0 = top, 2 = root. Mostramos los `count` superiores activos.
      const visibleIndex = stackItems.length - count;
      item.style.opacity = i >= visibleIndex ? '1' : '0.25';
    });
  };

  container.querySelector('#demo-nav-push').addEventListener('click', () => {
    if (count < 6) { count++; updateStack(); }
  });

  container.querySelector('#demo-nav-pop').addEventListener('click', () => {
    if (count > 1) { count--; updateStack(); }
  });

  container.querySelector('#demo-nav-root').addEventListener('click', () => {
    count = 1; updateStack();
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
