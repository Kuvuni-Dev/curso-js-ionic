/**
 * @file ion-back-button.demo.js
 * @description Demo didáctico del componente <ion-back-button> de Ionic.
 *
 * ion-back-button es el botón de retroceso que Ionic adapta automáticamente
 * a la plataforma: en iOS muestra un chevron con texto, en MD una flecha.
 * Puede usarse con ion-router (declarativo) o con ion-nav (programático).
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/back-button
 */

const CODE_BASICO = `<!-- Se coloca dentro de ion-buttons con slot="start" en la toolbar -->
<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button></ion-back-button>
    </ion-buttons>
    <ion-title>Detalle</ion-title>
  </ion-toolbar>
</ion-header>`;

const CODE_ATRIBUTOS = `<!-- defaultHref: ruta de fallback si no hay página anterior en el historial -->
<ion-back-button defaultHref="/home"></ion-back-button>

<!-- text: texto personalizado (por defecto usa el título de la página anterior) -->
<ion-back-button text="Volver"></ion-back-button>
<ion-back-button text=""></ion-back-button>  <!-- sin texto, solo icono -->

<!-- icon: icono personalizado -->
<ion-back-button icon="arrow-back-circle-outline"></ion-back-button>

<!-- color: color del botón -->
<ion-back-button color="primary"></ion-back-button>

<!-- disabled: desactiva el botón -->
<ion-back-button disabled="true"></ion-back-button>`;

const CODE_PLATAFORMAS = `<!--
  Ionic adapta automáticamente el aspecto a la plataforma:

  iOS (mode="ios"):
    ← NombrePáginaAnterior    (chevron + texto)

  Android / Material Design (mode="md"):
    ←                          (flecha, sin texto)

  Para forzar un estilo específico sin importar la plataforma:
-->
<ion-back-button mode="ios"></ion-back-button>
<ion-back-button mode="md"></ion-back-button>`;

const CODE_CSS = `/* Personalización con variables CSS de Ionic */
ion-back-button {
  --color:           var(--ion-color-primary);
  --icon-font-size:  24px;
  --icon-margin-end: 4px;
  --icon-padding-end: 4px;
  --margin-start:    -4px;  /* ajuste de alineación */
  --min-width:       auto;
  --padding-start:   8px;
  --padding-end:     8px;
}`;

const CODE_NAV = `// Con ion-nav (navegación programática por pila):
// ion-back-button hace automáticamente nav.pop() al pulsar.
// No necesita configuración extra si está dentro de ion-nav.

// Para saber si hay página anterior en la pila desde JS:
const nav = document.querySelector('ion-nav');
const canGoBack = await nav.canGoBack(); // true / false`;

// ─── render() ───────────────────────────────────────────────────────────────
export function render() {
  return `
    <section class="demo-page">

      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-back-button</h2>
        <p class="demo-desc">
          Botón de retroceso que se adapta a la plataforma: muestra un
          <em>chevron + texto</em> en iOS y una <em>flecha</em> en Android.
          Se integra automáticamente con <code>ion-router</code> e
          <code>ion-nav</code> para gestionar el historial de navegación.
        </p>
      </div>

      <!-- ── GRUPO: Uso básico ──────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Uso básico</h3>
        <p class="demo-group-desc">
          Siempre va dentro de <code>ion-buttons slot="start"</code>
          en la <code>ion-toolbar</code> del header.
        </p>
        <pre class="demo-code"><code>${escapeHtml(CODE_BASICO)}</code></pre>
      </div>

      <!-- ── GRUPO: Diferencias por plataforma ─────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Diferencias por plataforma</h3>

        <!-- Comparativa visual iOS vs MD -->
        <div class="demo-row demo-row--align-center" style="gap:24px;">

          <!-- iOS -->
          <div class="demo-back-platform">
            <div class="demo-back-platform__bar demo-back-platform__bar--ios">
              <div class="demo-back-platform__back">
                <ion-icon name="chevron-back-outline"></ion-icon>
                <span>Inicio</span>
              </div>
              <span class="demo-back-platform__title">Detalle</span>
            </div>
            <ion-badge color="medium" style="display:block;text-align:center;margin-top:6px;">mode="ios"</ion-badge>
          </div>

          <!-- MD -->
          <div class="demo-back-platform">
            <div class="demo-back-platform__bar demo-back-platform__bar--md">
              <div class="demo-back-platform__back">
                <ion-icon name="arrow-back-outline"></ion-icon>
              </div>
              <span class="demo-back-platform__title">Detalle</span>
            </div>
            <ion-badge color="primary" style="display:block;text-align:center;margin-top:6px;">mode="md"</ion-badge>
          </div>

        </div>

        <pre class="demo-code" style="margin-top:12px;"><code>${escapeHtml(CODE_PLATAFORMAS)}</code></pre>
      </div>

      <!-- ── GRUPO: Atributos ───────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Atributos principales</h3>
        <ion-list inset="true">
          <ion-item>
            <ion-badge slot="start" color="primary">defaultHref</ion-badge>
            <ion-label><p>Ruta de fallback cuando no hay historial previo. Sin él, el botón se oculta si la pila está vacía.</p></ion-label>
          </ion-item>
          <ion-item>
            <ion-badge slot="start" color="secondary">text</ion-badge>
            <ion-label><p>Texto del botón. Por defecto usa el título de la página anterior. Poner <code>""</code> para solo icono.</p></ion-label>
          </ion-item>
          <ion-item>
            <ion-badge slot="start" color="tertiary">icon</ion-badge>
            <ion-label><p>Icono personalizado. Por defecto: <code>chevron-back</code> (iOS) o <code>arrow-back</code> (MD).</p></ion-label>
          </ion-item>
          <ion-item>
            <ion-badge slot="start" color="success">color</ion-badge>
            <ion-label><p>Color del botón usando los tokens de Ionic.</p></ion-label>
          </ion-item>
          <ion-item>
            <ion-badge slot="start" color="danger">disabled</ion-badge>
            <ion-label><p>Desactiva el botón sin ocultarlo.</p></ion-label>
          </ion-item>
        </ion-list>
        <pre class="demo-code" style="margin-top:12px;"><code>${escapeHtml(CODE_ATRIBUTOS)}</code></pre>
      </div>

      <!-- ── GRUPO: Demo interactivo ────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Demo interactivo: simulador de navegación</h3>
        <p class="demo-group-desc">
          Pulsa <strong>Ir a Detalle</strong> para simular una navegación hacia
          adelante. El back button queda habilitado y al pulsarlo vuelves al estado inicial.
        </p>

        <div class="demo-back-sim">
          <!-- Barra simulada -->
          <div class="demo-back-sim__bar">
            <button class="demo-back-sim__back" id="sim-back" disabled>
              <ion-icon name="chevron-back-outline"></ion-icon>
              <span id="sim-back-text">Inicio</span>
            </button>
            <span id="sim-title">Inicio</span>
          </div>
          <div class="demo-back-sim__content">
            <p id="sim-page-text">Página de inicio</p>
            <ion-button id="sim-forward" size="small" color="primary">
              <ion-icon slot="end" name="chevron-forward-outline"></ion-icon>
              Ir a Detalle
            </ion-button>
          </div>
        </div>
        <p id="sim-log" style="text-align:center;font-size:0.82rem;opacity:0.65;margin-top:6px;">
          ion-back-button oculto (no hay historial)
        </p>
      </div>

      <!-- ── GRUPO: CSS variables ───────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Personalización con CSS</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_CSS)}</code></pre>
      </div>

      <!-- ── GRUPO: Con ion-nav ─────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Integración con ion-nav</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_NAV)}</code></pre>
      </div>

    </section>
  `;
}

// ─── init() ─────────────────────────────────────────────────────────────────
export function init(container) {
  const backBtn   = container.querySelector('#sim-back');
  const backText  = container.querySelector('#sim-back-text');
  const titleEl   = container.querySelector('#sim-title');
  const pageText  = container.querySelector('#sim-page-text');
  const fwdBtn    = container.querySelector('#sim-forward');
  const logEl     = container.querySelector('#sim-log');

  const pages = [
    { title: 'Inicio',  text: 'Página de inicio',  back: null },
    { title: 'Detalle', text: 'Página de detalle',  back: 'Inicio' },
  ];
  let current = 0;

  function goTo(index) {
    current = index;
    const page = pages[index];
    titleEl.textContent   = page.title;
    pageText.textContent  = page.text;
    fwdBtn.style.display  = index < pages.length - 1 ? '' : 'none';

    if (page.back) {
      backBtn.disabled         = false;
      backText.textContent     = page.back;
      backBtn.style.opacity    = '1';
      logEl.textContent        = `ion-back-button visible — defaultHref="${page.back}"`;
    } else {
      backBtn.disabled         = true;
      backText.textContent     = '';
      backBtn.style.opacity    = '0.3';
      logEl.textContent        = 'ion-back-button oculto (no hay historial)';
    }
  }

  fwdBtn.addEventListener('click', () => goTo(1));
  backBtn.addEventListener('click', () => goTo(0));
}

// ─── Utilidad interna ────────────────────────────────────────────────────────
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
