/**
 * @file ion-button.demo.js
 * @description Demo didáctico del componente <ion-button> de Ionic.
 *
 * ion-button es el botón estándar de Ionic. Acepta múltiples variantes
 * visuales mediante atributos HTML, sin necesidad de clases CSS personalizadas.
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/button
 */

// ─── Código de ejemplo que se mostrará en pantalla ──────────────────────────
// Se guarda como string para poder renderizarlo como texto en el bloque de código.
const CODE_EXAMPLE = `<!-- Variantes de color -->
<ion-button>Default</ion-button>
<ion-button color="primary">Primary</ion-button>
<ion-button color="secondary">Secondary</ion-button>
<ion-button color="tertiary">Tertiary</ion-button>
<ion-button color="success">Success</ion-button>
<ion-button color="warning">Warning</ion-button>
<ion-button color="danger">Danger</ion-button>

<!-- Variantes de relleno -->
<ion-button fill="solid">Solid (por defecto)</ion-button>
<ion-button fill="outline">Outline</ion-button>
<ion-button fill="clear">Clear</ion-button>

<!-- Expansión -->
<ion-button expand="block">Block (ancho completo)</ion-button>
<ion-button expand="full">Full (sin márgenes)</ion-button>

<!-- Tamaños -->
<ion-button size="small">Small</ion-button>
<ion-button size="default">Default</ion-button>
<ion-button size="large">Large</ion-button>

<!-- Con icono -->
<ion-button>
  <ion-icon slot="start" name="star"></ion-icon>
  Con icono
</ion-button>

<!-- Deshabilitado -->
<ion-button disabled="true">Deshabilitado</ion-button>`;

// ─── render() ───────────────────────────────────────────────────────────────
/**
 * Genera el HTML completo del demo.
 * @returns {string} HTML listo para insertar con innerHTML.
 */
export function render() {
  return `
    <section class="demo-page">

      <!-- Cabecera del demo -->
      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-button</h2>
        <p class="demo-desc">
          Componente de botón de Ionic. Soporta múltiples variantes de color,
          relleno, tamaño y expansión mediante atributos HTML.
        </p>
      </div>

      <!-- ── GRUPO: Colores ─────────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Colores</h3>
        <p class="demo-group-desc">
          El atributo <code>color</code> acepta los tokens de la paleta de Ionic:
          <em>primary, secondary, tertiary, success, warning, danger, medium, light</em>.
        </p>
        <div class="demo-row">
          <ion-button color="primary">Primary</ion-button>
          <ion-button color="secondary">Secondary</ion-button>
          <ion-button color="tertiary">Tertiary</ion-button>
          <ion-button color="success">Success</ion-button>
          <ion-button color="warning">Warning</ion-button>
          <ion-button color="danger">Danger</ion-button>
        </div>
      </div>

      <!-- ── GRUPO: Relleno ─────────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Relleno (fill)</h3>
        <p class="demo-group-desc">
          <code>fill</code> controla si el botón es sólido, con borde o transparente.
        </p>
        <div class="demo-row">
          <ion-button fill="solid">Solid</ion-button>
          <ion-button fill="outline">Outline</ion-button>
          <ion-button fill="clear">Clear</ion-button>
        </div>
      </div>

      <!-- ── GRUPO: Expansión ───────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Expansión (expand)</h3>
        <p class="demo-group-desc">
          <code>expand="block"</code> ocupa todo el ancho con margen lateral.
          <code>expand="full"</code> elimina también los márgenes.
        </p>
        <ion-button expand="block">Block</ion-button>
        <ion-button expand="full" color="secondary" style="margin-top:8px;">Full</ion-button>
      </div>

      <!-- ── GRUPO: Tamaños ─────────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Tamaños (size)</h3>
        <div class="demo-row demo-row--align-center">
          <ion-button size="small">Small</ion-button>
          <ion-button size="default">Default</ion-button>
          <ion-button size="large">Large</ion-button>
        </div>
      </div>

      <!-- ── GRUPO: Iconos ──────────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Con iconos</h3>
        <p class="demo-group-desc">
          Usa <code>slot="start"</code> o <code>slot="end"</code> en <code>ion-icon</code>
          para posicionar el icono dentro del botón.
        </p>
        <div class="demo-row">
          <ion-button>
            <ion-icon slot="start" name="star-outline"></ion-icon>
            Start
          </ion-button>
          <ion-button color="secondary">
            End
            <ion-icon slot="end" name="arrow-forward-outline"></ion-icon>
          </ion-button>
          <ion-button fill="outline" color="tertiary">
            <ion-icon slot="icon-only" name="heart-outline"></ion-icon>
          </ion-button>
        </div>
      </div>

      <!-- ── GRUPO: Estados ─────────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Estados</h3>
        <div class="demo-row">
          <ion-button disabled="true">Deshabilitado</ion-button>
          <ion-button id="btn-contador" color="success">
            Pulsaciones: <span id="btn-count">0</span>
          </ion-button>
        </div>
      </div>

      <!-- ── BLOQUE DE CÓDIGO ───────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Código de ejemplo</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_EXAMPLE)}</code></pre>
      </div>

    </section>
  `;
}

// ─── init() ─────────────────────────────────────────────────────────────────
/**
 * Adjunta los listeners interactivos del demo.
 * Se llama después de insertar el HTML en el DOM.
 * @param {HTMLElement} container - El elemento raíz donde se montó el demo.
 */
export function init(container) {
  // Demo de contador: muestra cómo escuchar el evento click en ion-button.
  const btnContador = container.querySelector('#btn-contador');
  const spanCount = container.querySelector('#btn-count');
  let count = 0;

  // ion-button emite el evento nativo 'click' igual que un <button> estándar.
  btnContador.addEventListener('click', () => {
    count++;
    spanCount.textContent = count;
  });
}

// ─── Utilidad interna ────────────────────────────────────────────────────────
/**
 * Escapa caracteres HTML especiales para mostrar código en pantalla
 * sin que el navegador lo interprete como markup.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
