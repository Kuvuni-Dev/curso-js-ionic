/**
 * @file ion-grid.demo.js
 * @description Demo didáctico de ion-grid, ion-row e ion-col.
 *
 * Ionic implementa un sistema de rejilla de 12 columnas idéntico al de Bootstrap,
 * pero como componentes web. Incluye breakpoints responsivos y utilidades de
 * alineación y offset.
 *
 * Documentación oficial: https://ionicframework.com/docs/api/grid
 */

// NOTA CDN: ion-grid/row/col cargan chunks adicionales del CDN de Ionic.
// Los previews usan divs con CSS equivalente; el código real va en bloques pre.

const CODE_BASICO = `<!-- Sistema de 12 columnas -->
<ion-grid>
  <ion-row>
    <ion-col size="6">6 columnas</ion-col>
    <ion-col size="6">6 columnas</ion-col>
  </ion-row>
  <ion-row>
    <ion-col size="4">4 col</ion-col>
    <ion-col size="4">4 col</ion-col>
    <ion-col size="4">4 col</ion-col>
  </ion-row>
  <ion-row>
    <ion-col>auto</ion-col>  <!-- sin size: reparte el espacio disponible -->
    <ion-col>auto</ion-col>
    <ion-col>auto</ion-col>
  </ion-row>
</ion-grid>`;

const CODE_RESPONSIVE = `<!-- Breakpoints responsivos (como Bootstrap) -->
<!-- size-{bp}: aplica a partir del breakpoint indicado -->

<ion-grid>
  <ion-row>
    <!--
      xs  (<576px)  → ocupa 12 columnas (pantalla pequeña)
      sm  (≥576px)  → ocupa  6 columnas
      md  (≥768px)  → ocupa  4 columnas
      lg  (≥992px)  → ocupa  3 columnas
    -->
    <ion-col size="12" size-sm="6" size-md="4" size-lg="3">
      Tarjeta responsive
    </ion-col>
    <ion-col size="12" size-sm="6" size-md="4" size-lg="3">
      Tarjeta responsive
    </ion-col>
    <ion-col size="12" size-sm="6" size-md="4" size-lg="3">
      Tarjeta responsive
    </ion-col>
    <ion-col size="12" size-sm="6" size-md="4" size-lg="3">
      Tarjeta responsive
    </ion-col>
  </ion-row>
</ion-grid>`;

const CODE_OFFSET = `<!-- offset: desplaza la columna N posiciones hacia la derecha -->
<ion-grid>
  <ion-row>
    <ion-col size="6" offset="3">centrada con offset="3"</ion-col>
  </ion-row>
  <ion-row>
    <ion-col size="4">col 1</ion-col>
    <ion-col size="4" offset="4">col 3 (salta la 2)</ion-col>
  </ion-row>
</ion-grid>`;

const CODE_ALIGN = `<!-- Alineación vertical de filas y columnas -->
<ion-grid>

  <!-- align-items en la fila -->
  <ion-row style="height: 80px;">
    <ion-col class="ion-align-self-start">start</ion-col>
    <ion-col class="ion-align-self-center">center</ion-col>
    <ion-col class="ion-align-self-end">end</ion-col>
  </ion-row>

  <!-- justify-content en la fila -->
  <ion-row class="ion-justify-content-center">
    <ion-col size="3">centrado</ion-col>
    <ion-col size="3">centrado</ion-col>
  </ion-row>

  <ion-row class="ion-justify-content-between">
    <ion-col size="3">separado</ion-col>
    <ion-col size="3">separado</ion-col>
  </ion-row>

</ion-grid>`;

const CODE_FIXED = `<!-- ion-grid fixed: limita el ancho máximo en pantallas grandes (como un container) -->
<ion-grid fixed>
  <ion-row>
    <ion-col>Esta rejilla tiene ancho máximo fijo</ion-col>
  </ion-row>
</ion-grid>`;

// ─── render() ───────────────────────────────────────────────────────────────
export function render() {
  return `
    <section class="demo-page">

      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-grid / ion-row / ion-col</h2>
        <p class="demo-desc">
          Sistema de rejilla de <strong>12 columnas</strong> responsive idéntico
          conceptualmente al de Bootstrap. Se compone de tres componentes anidados:
          <code>ion-grid</code> → <code>ion-row</code> → <code>ion-col</code>.
        </p>
      </div>

      <!-- ── GRUPO: División básica ─────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">División en columnas (12 en total)</h3>
        <p class="demo-group-desc">
          El atributo <code>size</code> indica cuántas de las 12 columnas ocupa
          cada <code>ion-col</code>. Sin <code>size</code>, las columnas se
          reparten el espacio disponible a partes iguales.
        </p>

        <!-- Preview visual con divs (misma lógica que ion-grid) -->
        <div class="demo-grid-preview">
          ${gridRow([12], 'warning')}
          ${gridRow([6, 6], 'warning')}
          ${gridRow([4, 4, 4], 'warning')}
          ${gridRow([3, 3, 3, 3], 'warning')}
          ${gridRow([2, 2, 2, 2, 2, 2], 'warning')}
          ${gridRow([1,1,1,1,1,1,1,1,1,1,1,1], 'warning')}
        </div>

        <pre class="demo-code"><code>${escapeHtml(CODE_BASICO)}</code></pre>
      </div>

      <!-- ── GRUPO: Breakpoints ─────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Breakpoints responsivos</h3>
        <p class="demo-group-desc">
          Usa <code>size-{bp}</code> para cambiar el número de columnas en
          distintos anchos de pantalla.
        </p>

        <ion-list inset="true">
          <ion-item>
            <ion-badge slot="start" color="warning" style="min-width:36px;text-align:center;">xs</ion-badge>
            <ion-label><p>&lt; 576 px — móvil pequeño</p></ion-label>
          </ion-item>
          <ion-item>
            <ion-badge slot="start" color="warning" style="min-width:36px;text-align:center;">sm</ion-badge>
            <ion-label><p>≥ 576 px — móvil grande</p></ion-label>
          </ion-item>
          <ion-item>
            <ion-badge slot="start" color="warning" style="min-width:36px;text-align:center;">md</ion-badge>
            <ion-label><p>≥ 768 px — tablet</p></ion-label>
          </ion-item>
          <ion-item>
            <ion-badge slot="start" color="warning" style="min-width:36px;text-align:center;">lg</ion-badge>
            <ion-label><p>≥ 992 px — escritorio</p></ion-label>
          </ion-item>
          <ion-item>
            <ion-badge slot="start" color="warning" style="min-width:36px;text-align:center;">xl</ion-badge>
            <ion-label><p>≥ 1200 px — escritorio grande</p></ion-label>
          </ion-item>
        </ion-list>

        <pre class="demo-code" style="margin-top:10px;"><code>${escapeHtml(CODE_RESPONSIVE)}</code></pre>
      </div>

      <!-- ── GRUPO: Offset ──────────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Offset</h3>
        <p class="demo-group-desc">
          <code>offset</code> desplaza la columna N posiciones hacia la derecha,
          útil para centrar o crear espacios vacíos.
        </p>

        <div class="demo-grid-preview">
          ${gridRowOffset([{ size: 6, offset: 3 }], 'warning')}
          ${gridRowOffset([{ size: 4, offset: 0 }, { size: 4, offset: 4 }], 'warning')}
        </div>

        <pre class="demo-code"><code>${escapeHtml(CODE_OFFSET)}</code></pre>
      </div>

      <!-- ── GRUPO: Alineación ──────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Alineación y distribución</h3>
        <p class="demo-group-desc">
          Ionic incluye clases de utilidad CSS para alinear columnas vertical y
          horizontalmente dentro de la fila.
        </p>
        <pre class="demo-code"><code>${escapeHtml(CODE_ALIGN)}</code></pre>
      </div>

      <!-- ── GRUPO: Fixed ───────────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">ion-grid fixed (ancho máximo)</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_FIXED)}</code></pre>
      </div>

    </section>
  `;
}

// ─── Helpers de preview ──────────────────────────────────────────────────────
function gridRow(sizes, color) {
  const cols = sizes.map((s) => {
    const pct = (s / 12) * 100;
    return `<div class="demo-grid-col" style="width:${pct}%;">
      <div class="demo-grid-cell demo-grid-cell--${color}">${s}</div>
    </div>`;
  }).join('');
  return `<div class="demo-grid-row">${cols}</div>`;
}

function gridRowOffset(cols, color) {
  const total = 12;
  return `<div class="demo-grid-row">${cols.map(({ size, offset }) => {
    const offPct = (offset / total) * 100;
    const sizePct = (size / total) * 100;
    return `<div style="width:${offPct}%;"></div>
    <div class="demo-grid-col" style="width:${sizePct}%;">
      <div class="demo-grid-cell demo-grid-cell--${color}">
        ${offset ? `offset=${offset} ` : ''}size=${size}
      </div>
    </div>`;
  }).join('')}</div>`;
}

// ─── init() ─────────────────────────────────────────────────────────────────
export function init(_container) {}

// ─── Utilidad interna ────────────────────────────────────────────────────────
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
