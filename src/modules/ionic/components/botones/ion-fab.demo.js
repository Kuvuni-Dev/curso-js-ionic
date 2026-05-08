/**
 * @file ion-fab.demo.js
 * @description Demo didáctico de ion-fab, ion-fab-button e ion-fab-list.
 *
 * ion-fab es el contenedor del botón de acción flotante (FAB).
 * Se coloca dentro de ion-content con slot="fixed" para que quede
 * superpuesto al contenido y no desplace el scroll.
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/fab
 */

// ─── NOTA CDN ────────────────────────────────────────────────────────────────
// ion-fab, ion-fab-button e ion-fab-list requieren chunks adicionales del CDN
// de Ionic. Por eso los previews interactivos usan CSS puro para simular el
// aspecto visual; el código real se muestra en bloques <pre>.
// ─────────────────────────────────────────────────────────────────────────────

const CODE_BASICO = `<!-- FAB mínimo: un solo botón flotante en la esquina inferior derecha -->
<ion-content>

  <ion-fab vertical="bottom" horizontal="end" slot="fixed">
    <ion-fab-button>
      <ion-icon name="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>

</ion-content>`;

const CODE_POSICION = `<!-- vertical: "top" | "center" | "bottom"  (por defecto "bottom") -->
<!-- horizontal: "start" | "center" | "end"  (por defecto "end")   -->

<ion-fab vertical="top"    horizontal="start"  slot="fixed">...</ion-fab>
<ion-fab vertical="top"    horizontal="end"    slot="fixed">...</ion-fab>
<ion-fab vertical="bottom" horizontal="start"  slot="fixed">...</ion-fab>
<ion-fab vertical="bottom" horizontal="end"    slot="fixed">...</ion-fab>
<ion-fab vertical="center" horizontal="center" slot="fixed">...</ion-fab>`;

const CODE_FAB_LIST = `<!-- ion-fab-list muestra acciones secundarias al pulsar el FAB principal -->
<!-- side: "top" | "bottom" | "start" | "end"  (dirección de expansión) -->

<ion-fab vertical="bottom" horizontal="end" slot="fixed">

  <!-- Botón principal: abre/cierra la lista al hacer clic -->
  <ion-fab-button>
    <ion-icon name="share-social"></ion-icon>
  </ion-fab-button>

  <!-- Acciones que se despliegan hacia arriba -->
  <ion-fab-list side="top">
    <ion-fab-button color="danger"  onclick="compartirWhatsApp()">
      <ion-icon name="logo-whatsapp"></ion-icon>
    </ion-fab-button>
    <ion-fab-button color="primary" onclick="compartirTwitter()">
      <ion-icon name="logo-twitter"></ion-icon>
    </ion-fab-button>
    <ion-fab-button color="warning" onclick="copiarEnlace()">
      <ion-icon name="link-outline"></ion-icon>
    </ion-fab-button>
  </ion-fab-list>

</ion-fab>`;

const CODE_COLOR = `<!-- Colores y variantes visuales -->
<ion-fab-button color="primary">...</ion-fab-button>
<ion-fab-button color="secondary">...</ion-fab-button>
<ion-fab-button color="danger">...</ion-fab-button>

<!-- Tamaño reducido ("mini") -->
<ion-fab-button size="small">
  <ion-icon name="add"></ion-icon>
</ion-fab-button>

<!-- Translúcido (efecto blur sobre el contenido) -->
<ion-fab-button translucent="true">
  <ion-icon name="add"></ion-icon>
</ion-fab-button>`;

const CODE_JS = `// Abrir/cerrar el FAB-list desde JavaScript
const fab = document.querySelector('ion-fab');

fab.activated = true;   // abre la lista
fab.activated = false;  // cierra la lista

// También se puede usar el método nativo
fab.close();`;

// ─── render() ───────────────────────────────────────────────────────────────
export function render() {
  return `
    <section class="demo-page">

      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-fab / ion-fab-button / ion-fab-list</h2>
        <p class="demo-desc">
          El <strong>FAB</strong> (Floating Action Button) es el botón circular
          flotante que representa la acción principal de una pantalla.
          Se coloca con <code>slot="fixed"</code> dentro de
          <code>ion-content</code> para que no participe en el scroll.
        </p>
      </div>

      <!-- ── GRUPO: Estructura ──────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Estructura de componentes</h3>
        <p class="demo-group-desc">
          El FAB se compone de tres elementos anidados que trabajan juntos:
        </p>
        <ion-list inset="true">
          <ion-item>
            <ion-icon slot="start" name="layers-outline" color="primary"></ion-icon>
            <ion-label>
              <h3>ion-fab</h3>
              <p>Contenedor posicionador. Define la esquina mediante <code>vertical</code> y <code>horizontal</code>.</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" name="add-circle-outline" color="primary"></ion-icon>
            <ion-label>
              <h3>ion-fab-button</h3>
              <p>El botón circular. Acepta <code>color</code>, <code>size</code> y <code>translucent</code>.</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" name="list-circle-outline" color="primary"></ion-icon>
            <ion-label>
              <h3>ion-fab-list</h3>
              <p>Lista de acciones secundarias que se despliegan al pulsar el botón principal. Atributo <code>side</code> controla la dirección.</p>
            </ion-label>
          </ion-item>
        </ion-list>
        <pre class="demo-code"><code>${escapeHtml(CODE_BASICO)}</code></pre>
      </div>

      <!-- ── GRUPO: Posicionamiento ─────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Posicionamiento</h3>
        <p class="demo-group-desc">
          Combina <code>vertical</code> y <code>horizontal</code> para colocar
          el FAB en cualquier esquina o en el centro de la pantalla.
        </p>

        <!-- Diagrama visual de posiciones -->
        <div class="demo-fab-grid">
          <div class="demo-fab-grid__cell demo-fab-grid__cell--active">
            <span class="demo-fab-sim">+</span>
            <small>top / start</small>
          </div>
          <div class="demo-fab-grid__cell">
            <span class="demo-fab-sim demo-fab-sim--sm">+</span>
            <small>top / center</small>
          </div>
          <div class="demo-fab-grid__cell demo-fab-grid__cell--active">
            <span class="demo-fab-sim">+</span>
            <small>top / end</small>
          </div>
          <div class="demo-fab-grid__cell">
            <span class="demo-fab-sim demo-fab-sim--sm">+</span>
            <small>center / start</small>
          </div>
          <div class="demo-fab-grid__cell demo-fab-grid__cell--center">
            <span class="demo-fab-sim">+</span>
            <small>center / center</small>
          </div>
          <div class="demo-fab-grid__cell">
            <span class="demo-fab-sim demo-fab-sim--sm">+</span>
            <small>center / end</small>
          </div>
          <div class="demo-fab-grid__cell demo-fab-grid__cell--active">
            <span class="demo-fab-sim">+</span>
            <small>bottom / start</small>
          </div>
          <div class="demo-fab-grid__cell">
            <span class="demo-fab-sim demo-fab-sim--sm">+</span>
            <small>bottom / center</small>
          </div>
          <div class="demo-fab-grid__cell demo-fab-grid__cell--active demo-fab-grid__cell--main">
            <span class="demo-fab-sim">+</span>
            <small>bottom / end ★</small>
          </div>
        </div>
        <p class="demo-group-desc" style="margin-top:8px;">
          ★ La posición <em>bottom/end</em> es la convención más habitual en Material Design.
        </p>
        <pre class="demo-code"><code>${escapeHtml(CODE_POSICION)}</code></pre>
      </div>

      <!-- ── GRUPO: ion-fab-list interactivo ───────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Demo interactivo: FAB con lista de acciones</h3>
        <p class="demo-group-desc">
          Pulsa el botón para ver cómo se despliega <code>ion-fab-list</code>
          con las acciones secundarias.
        </p>

        <!-- Simulación visual del FAB + list con CSS/JS puro -->
        <div class="demo-fab-preview">
          <div class="demo-fab-preview__screen">
            <p style="opacity:0.4;font-size:0.85rem;text-align:center;padding-top:30px;">Contenido de la página</p>

            <!-- Acciones secundarias (ocultas inicialmente) -->
            <div class="demo-fab-preview__list" id="fab-list">
              <div class="demo-fab-preview__action" style="background:var(--ion-color-danger);">
                <ion-icon name="logo-whatsapp"></ion-icon>
              </div>
              <div class="demo-fab-preview__action" style="background:var(--ion-color-primary);">
                <ion-icon name="logo-twitter"></ion-icon>
              </div>
              <div class="demo-fab-preview__action" style="background:var(--ion-color-warning);">
                <ion-icon name="link-outline"></ion-icon>
              </div>
            </div>

            <!-- Botón FAB principal -->
            <button class="demo-fab-preview__btn" id="fab-btn" aria-label="Compartir">
              <ion-icon name="share-social" id="fab-icon"></ion-icon>
            </button>
          </div>
          <p id="fab-status" style="text-align:center;margin-top:8px;font-size:0.85rem;opacity:0.7;">
            Pulsa el botón para desplegar las acciones
          </p>
        </div>

        <pre class="demo-code"><code>${escapeHtml(CODE_FAB_LIST)}</code></pre>
      </div>

      <!-- ── GRUPO: Colores y tamaños ───────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Colores, tamaños y variantes</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_COLOR)}</code></pre>
      </div>

      <!-- ── GRUPO: Control desde JS ───────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Control desde JavaScript</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_JS)}</code></pre>
      </div>

    </section>
  `;
}

// ─── init() ─────────────────────────────────────────────────────────────────
export function init(container) {
  const fabBtn  = container.querySelector('#fab-btn');
  const fabList = container.querySelector('#fab-list');
  const fabIcon = container.querySelector('#fab-icon');
  const status  = container.querySelector('#fab-status');

  let open = false;

  fabBtn.addEventListener('click', () => {
    open = !open;
    fabList.classList.toggle('demo-fab-preview__list--open', open);
    fabIcon.setAttribute('name', open ? 'close' : 'share-social');
    fabBtn.style.background = open
      ? 'var(--ion-color-danger)'
      : 'var(--ion-color-primary)';
    status.textContent = open
      ? 'Lista abierta — ion-fab activated="true"'
      : 'Lista cerrada — ion-fab activated="false"';
  });

  // Clic en cualquier acción secundaria
  fabList.querySelectorAll('.demo-fab-preview__action').forEach((el) => {
    el.addEventListener('click', () => {
      open = false;
      fabList.classList.remove('demo-fab-preview__list--open');
      fabIcon.setAttribute('name', 'share-social');
      fabBtn.style.background = 'var(--ion-color-primary)';
      status.textContent = 'Acción seleccionada — lista cerrada';
    });
  });
}

// ─── Utilidad interna ────────────────────────────────────────────────────────
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
