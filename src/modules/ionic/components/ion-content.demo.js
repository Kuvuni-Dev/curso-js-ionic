/**
 * @file ion-content.demo.js
 * @description Demo didáctico de ion-content.
 *
 * ion-content es el área de desplazamiento principal de una página Ionic.
 * Envuelve el contenido que puede hacer scroll y gestiona:
 *   - Desplazamiento vertical/horizontal
 *   - Relleno seguro respecto al header/footer (safe area)
 *   - Elementos fijos superpuestos al scroll (slot="fixed")
 *   - Scroll programático con scrollToTop(), scrollToBottom(), scrollToPoint()
 *   - Eventos ionScroll, ionScrollStart, ionScrollEnd
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/content
 */

const CODE_BASIC = `<ion-content>
  <p>Contenido que hace scroll...</p>
</ion-content>`;

const CODE_PADDING = `<!-- padding añade espaciado interno en los 4 lados -->
<ion-content class="ion-padding">
  <p>Contenido con padding</p>
</ion-content>`;

const CODE_FIXED = `<!-- slot="fixed" mantiene el elemento visible durante el scroll -->
<ion-content>
  <p>Contenido largo...</p>

  <ion-fab slot="fixed" vertical="bottom" horizontal="end">
    <ion-fab-button>
      <ion-icon name="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</ion-content>`;

const CODE_SCROLL = `<!-- Scroll programático desde JavaScript -->
const content = document.querySelector('ion-content');

// Ir al principio animado
content.scrollToTop(400); // 400 ms de duración

// Ir al final
content.scrollToBottom(400);

// Ir a una posición concreta (x, y, duración)
content.scrollToPoint(0, 500, 300);

// Evento de scroll
content.addEventListener('ionScroll', (e) => {
  console.log('scrollTop:', e.detail.scrollTop);
});`;

const CODE_FULLSCREEN = `<!-- fullscreen: el contenido empieza bajo el header translúcido (iOS) -->
<ion-header translucent="true">
  <ion-toolbar>
    <ion-title>Título</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content fullscreen="true">
  <!-- En iOS el contenido comienza detrás del header -->
  <ion-header collapse="condense">
    <ion-toolbar>
      <ion-title size="large">Título grande</ion-title>
    </ion-toolbar>
  </ion-header>
</ion-content>`;

/**
 * @returns {string} HTML del demo.
 */
export function render() {
  return `
    <section class="demo-page">

      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-content</h2>
        <p class="demo-desc">
          Área de desplazamiento principal de cada página.
          Gestiona el scroll, el safe area y permite elementos fijos superpuestos.
        </p>
      </div>

      <!-- ── GRUPO: Uso básico ───────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Uso básico</h3>
        <p class="demo-group-desc">
          Todo el contenido de una página va dentro de <code>ion-content</code>.
          Aplica automáticamente el padding seguro respecto al header y footer.
        </p>
        <div class="demo-preview demo-preview--tall">
          <ion-header style="position:relative;">
            <ion-toolbar color="primary">
              <ion-title>Ejemplo</ion-title>
            </ion-toolbar>
          </ion-header>
          <div style="background:var(--app-surface);padding:16px;overflow-y:auto;height:180px;">
            <p>Párrafo 1 — contenido de la página.</p>
            <p>Párrafo 2 — el área hace scroll cuando hay más contenido del visible.</p>
            <p>Párrafo 3</p>
            <p>Párrafo 4</p>
            <p>Párrafo 5 — fin del contenido.</p>
          </div>
        </div>
        <pre class="demo-code"><code>${escapeHtml(CODE_BASIC)}</code></pre>
      </div>

      <!-- ── GRUPO: Clases de padding ───────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Clases de espaciado</h3>
        <p class="demo-group-desc">
          Ionic incluye clases de utilidad para espaciado que se pueden usar
          directamente en <code>ion-content</code> o en cualquier elemento.
        </p>
        <ion-list inset="true">
          <ion-item>
            <ion-label><code>ion-padding</code></ion-label>
            <ion-note slot="end">16px en los 4 lados</ion-note>
          </ion-item>
          <ion-item>
            <ion-label><code>ion-padding-top</code></ion-label>
            <ion-note slot="end">Solo arriba</ion-note>
          </ion-item>
          <ion-item>
            <ion-label><code>ion-padding-horizontal</code></ion-label>
            <ion-note slot="end">Izquierda y derecha</ion-note>
          </ion-item>
          <ion-item>
            <ion-label><code>ion-no-padding</code></ion-label>
            <ion-note slot="end">Elimina padding</ion-note>
          </ion-item>
          <ion-item>
            <ion-label><code>ion-margin</code></ion-label>
            <ion-note slot="end">16px de margen exterior</ion-note>
          </ion-item>
        </ion-list>
        <pre class="demo-code"><code>${escapeHtml(CODE_PADDING)}</code></pre>
      </div>

      <!-- ── GRUPO: slot="fixed" ────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Elementos fijos (slot="fixed")</h3>
        <p class="demo-group-desc">
          Los elementos con <code>slot="fixed"</code> se superponen al contenido
          y no se desplazan con el scroll. Se usan típicamente para FAB buttons.
        </p>
        <pre class="demo-code"><code>${escapeHtml(CODE_FIXED)}</code></pre>
      </div>

      <!-- ── GRUPO: Scroll programático ─────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Scroll programático</h3>
        <p class="demo-group-desc">
          <code>ion-content</code> expone métodos para controlar el scroll
          desde JavaScript. Prueba los botones:
        </p>
        <div class="demo-preview demo-preview--tall">
          <div id="content-scroll-box"
               style="height:200px;overflow-y:auto;background:var(--app-surface);padding:16px;border-radius:8px;">
            ${Array.from({length: 12}, (_, i) =>
              `<p style="margin:8px 0;">Línea ${i + 1} de contenido de ejemplo.</p>`
            ).join('')}
          </div>
        </div>
        <div class="demo-row" style="margin-top:10px;">
          <ion-button id="btn-scroll-top" size="small" fill="outline">
            <ion-icon slot="start" name="arrow-up-outline"></ion-icon>
            scrollToTop()
          </ion-button>
          <ion-button id="btn-scroll-bottom" size="small" fill="outline">
            <ion-icon slot="start" name="arrow-down-outline"></ion-icon>
            scrollToBottom()
          </ion-button>
          <ion-button id="btn-scroll-middle" size="small" fill="outline" color="secondary">
            scrollToPoint(50%)
          </ion-button>
        </div>
        <pre class="demo-code" style="margin-top:12px;"><code>${escapeHtml(CODE_SCROLL)}</code></pre>
      </div>

      <!-- ── GRUPO: fullscreen + translucent (iOS) ─────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">fullscreen y translucent (iOS)</h3>
        <p class="demo-group-desc">
          <code>fullscreen="true"</code> hace que el contenido empiece
          debajo del header, permitiendo el efecto "large title" propio de iOS.
          Solo visible con <code>mode="ios"</code>.
        </p>
        <pre class="demo-code"><code>${escapeHtml(CODE_FULLSCREEN)}</code></pre>
      </div>

    </section>
  `;
}

/**
 * @param {HTMLElement} container
 */
export function init(container) {
  const box = container.querySelector('#content-scroll-box');
  const btnTop = container.querySelector('#btn-scroll-top');
  const btnBottom = container.querySelector('#btn-scroll-bottom');
  const btnMiddle = container.querySelector('#btn-scroll-middle');

  // Simulamos scrollToTop / scrollToBottom sobre el div de preview
  btnTop.addEventListener('click', () => {
    box.scrollTo({ top: 0, behavior: 'smooth' });
  });

  btnBottom.addEventListener('click', () => {
    box.scrollTo({ top: box.scrollHeight, behavior: 'smooth' });
  });

  btnMiddle.addEventListener('click', () => {
    box.scrollTo({ top: box.scrollHeight / 2, behavior: 'smooth' });
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
