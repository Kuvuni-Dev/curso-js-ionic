/**
 * @file ion-icon.demo.js
 * @description Demo didáctico del componente <ion-icon> de Ionic / Ionicons.
 *
 * ion-icon renderiza iconos SVG vectoriales de la librería Ionicons.
 * Soporta tres variantes por icono (filled, outline, sharp), tamaños,
 * colores, y SVG personalizados mediante src o icon.
 *
 * Documentación oficial: https://ionicframework.com/docs/api/icon
 * Catálogo de iconos:    https://ionic.io/ionicons
 */

const CODE_BASICO = `<!-- Uso básico: atributo name con el nombre del icono -->
<ion-icon name="star"></ion-icon>
<ion-icon name="heart"></ion-icon>
<ion-icon name="home"></ion-icon>

<!-- Tres variantes de cada icono -->
<ion-icon name="star"></ion-icon>          <!-- filled (por defecto) -->
<ion-icon name="star-outline"></ion-icon>  <!-- outline -->
<ion-icon name="star-sharp"></ion-icon>    <!-- sharp (esquinas rectas) -->`;

const CODE_TAMANIO = `<!-- Tamaño: con el atributo size o con CSS font-size -->
<ion-icon name="star" size="small"></ion-icon>    <!-- ~18px -->
<ion-icon name="star"></ion-icon>                  <!-- default ~24px -->
<ion-icon name="star" size="large"></ion-icon>    <!-- ~32px -->

<!-- Tamaño exacto con CSS -->
<ion-icon name="star" style="font-size: 48px;"></ion-icon>`;

const CODE_COLOR = `<!-- Color: tokens Ionic o colores CSS -->
<ion-icon name="star" color="primary"></ion-icon>
<ion-icon name="star" color="danger"></ion-icon>
<ion-icon name="star" color="success"></ion-icon>

<!-- Con CSS directamente -->
<ion-icon name="star" style="color: #ff6b35;"></ion-icon>`;

const CODE_SLOT = `<!-- Uso dentro de otros componentes con slot -->

<!-- En ion-button -->
<ion-button>
  <ion-icon slot="start" name="add-outline"></ion-icon>
  Añadir
</ion-button>
<ion-button>
  <ion-icon slot="icon-only" name="trash-outline"></ion-icon>
</ion-button>

<!-- En ion-item -->
<ion-item>
  <ion-icon slot="start" name="person-outline" color="primary"></ion-icon>
  <ion-label>Perfil</ion-label>
  <ion-icon slot="end" name="chevron-forward-outline" color="medium"></ion-icon>
</ion-item>

<!-- En ion-chip -->
<ion-chip>
  <ion-icon name="star-outline" color="warning"></ion-icon>
  <ion-label>Favorito</ion-label>
</ion-chip>`;

const CODE_PLATAFORMA = `<!-- iOS vs MD: iconos distintos por plataforma -->
<!-- md: icono para Material Design -->
<!-- ios: icono para iOS         -->

<ion-icon ios="share-outline" md="share-social-outline"></ion-icon>
<ion-icon ios="chevron-back-outline" md="arrow-back-outline"></ion-icon>`;

const CODE_CUSTOM = `<!-- SVG personalizado: src apunta a un archivo SVG externo -->
<ion-icon src="/assets/icons/mi-icono.svg"></ion-icon>

<!-- SVG inline: mediante la propiedad icon en JavaScript -->
<script>
  import { addIcons } from 'ionicons';
  import { miIconoPersonalizado } from './mi-icono.js';
  addIcons({ 'mi-icono': miIconoPersonalizado });
</script>

<ion-icon name="mi-icono"></ion-icon>`;

// Grupos de iconos para el browser
const ICON_GROUPS = [
  {
    label: 'Navegación',
    icons: ['home','menu','arrow-back','arrow-forward','chevron-back','chevron-forward',
            'close','search','ellipsis-horizontal','ellipsis-vertical'],
  },
  {
    label: 'Comunicación',
    icons: ['mail','chatbubble','notifications','call','send','share-social',
            'megaphone','at','chatbubbles','paper-plane'],
  },
  {
    label: 'Acciones',
    icons: ['add','remove','create','trash','copy','download','upload','refresh',
            'cloud-upload','cloud-download'],
  },
  {
    label: 'Multimedia',
    icons: ['image','camera','videocam','mic','volume-high','play','pause','stop',
            'musical-notes','film'],
  },
  {
    label: 'Estado',
    icons: ['checkmark','checkmark-circle','close-circle','warning','alert-circle',
            'information-circle','help-circle','star','heart','bookmark'],
  },
];

// ─── render() ───────────────────────────────────────────────────────────────
export function render() {
  const iconBrowserHtml = ICON_GROUPS.map(({ label, icons }) => `
    <div class="demo-group" style="margin-bottom:0;">
      <h4 class="demo-group-title" style="font-size:0.85rem;">${label}</h4>
      <div class="demo-icon-grid">
        ${icons.map((name) => `
          <div class="demo-icon-cell" data-name="${name}" title="${name}">
            <ion-icon name="${name}-outline" id="icon-cell-${name}"></ion-icon>
            <span>${name}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  return `
    <section class="demo-page">

      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-icon</h2>
        <p class="demo-desc">
          Componente vectorial de la librería <strong>Ionicons</strong>.
          Más de 1 300 iconos en tres variantes (filled, outline, sharp),
          con soporte de colores, tamaños y SVG personalizados.
        </p>
      </div>

      <!-- ── GRUPO: Variantes ───────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Las tres variantes de cada icono</h3>
        <p class="demo-group-desc">
          Añadir <code>-outline</code> o <code>-sharp</code> al nombre obtiene
          las otras dos variantes. La versión sin sufijo es la <em>filled</em>.
        </p>
        <div class="demo-row demo-row--align-center" style="gap:32px;">
          ${['star','heart','settings','person','notifications'].map((name) => `
            <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
              <div class="demo-row demo-row--align-center" style="gap:12px;">
                <ion-icon name="${name}"          style="font-size:28px;" title="filled"></ion-icon>
                <ion-icon name="${name}-outline"  style="font-size:28px;" title="outline"></ion-icon>
                <ion-icon name="${name}-sharp"    style="font-size:28px;" title="sharp"></ion-icon>
              </div>
              <small style="font-size:0.7rem;opacity:0.6;">${name}</small>
            </div>
          `).join('')}
        </div>
        <pre class="demo-code" style="margin-top:12px;"><code>${escapeHtml(CODE_BASICO)}</code></pre>
      </div>

      <!-- ── GRUPO: Tamaños ─────────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Tamaños</h3>
        <div class="demo-row demo-row--align-center" style="gap:24px;">
          ${[16,20,24,32,40,56,72].map((s) => `
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
              <ion-icon name="star-outline" style="font-size:${s}px;"></ion-icon>
              <small style="font-size:0.7rem;opacity:0.6;">${s}px</small>
            </div>
          `).join('')}
        </div>
        <pre class="demo-code" style="margin-top:12px;"><code>${escapeHtml(CODE_TAMANIO)}</code></pre>
      </div>

      <!-- ── GRUPO: Colores ─────────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Colores</h3>
        <div class="demo-row demo-row--align-center" style="gap:16px;flex-wrap:wrap;">
          ${['primary','secondary','tertiary','success','warning','danger','medium','light'].map((c) => `
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
              <ion-icon name="heart" color="${c}" style="font-size:32px;"></ion-icon>
              <small style="font-size:0.7rem;opacity:0.7;">${c}</small>
            </div>
          `).join('')}
        </div>
        <pre class="demo-code" style="margin-top:12px;"><code>${escapeHtml(CODE_COLOR)}</code></pre>
      </div>

      <!-- ── GRUPO: Uso con slot ────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Uso en otros componentes (slot)</h3>
        <div class="demo-row" style="flex-wrap:wrap;gap:8px;">
          <ion-button>
            <ion-icon slot="start" name="add-outline"></ion-icon>
            Añadir
          </ion-button>
          <ion-button fill="outline" color="danger">
            <ion-icon slot="start" name="trash-outline"></ion-icon>
            Eliminar
          </ion-button>
          <ion-button fill="clear">
            <ion-icon slot="icon-only" name="share-social-outline"></ion-icon>
          </ion-button>
        </div>
        <pre class="demo-code" style="margin-top:12px;"><code>${escapeHtml(CODE_SLOT)}</code></pre>
      </div>

      <!-- ── GRUPO: Por plataforma ──────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Iconos distintos por plataforma</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_PLATAFORMA)}</code></pre>
      </div>

      <!-- ── GRUPO: Browser de iconos ──────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Explorador de iconos</h3>
        <p class="demo-group-desc">
          Pulsa cualquier icono para ver su nombre exacto (variante outline).
          Catálogo completo en <strong>ionic.io/ionicons</strong>.
        </p>
        ${iconBrowserHtml}
        <div id="icon-inspector" class="demo-icon-inspector" style="display:none;">
          <ion-icon id="inspector-icon" style="font-size:40px;"></ion-icon>
          <div>
            <p id="inspector-name" style="font-weight:600;margin:0;"></p>
            <p style="font-size:0.8rem;opacity:0.65;margin:2px 0 0;">&lt;ion-icon name="<span id="inspector-name2"></span>"&gt;&lt;/ion-icon&gt;</p>
          </div>
        </div>
      </div>

      <!-- ── GRUPO: SVG personalizado ──────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">SVG personalizado</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_CUSTOM)}</code></pre>
      </div>

    </section>
  `;
}

// ─── init() ─────────────────────────────────────────────────────────────────
export function init(container) {
  const inspector     = container.querySelector('#icon-inspector');
  const inspectorIcon = container.querySelector('#inspector-icon');
  const inspectorName = container.querySelector('#inspector-name');
  const inspectorName2= container.querySelector('#inspector-name2');

  container.querySelectorAll('.demo-icon-cell').forEach((cell) => {
    cell.addEventListener('click', () => {
      const name = cell.dataset.name;
      inspectorIcon.setAttribute('name', `${name}-outline`);
      inspectorName.textContent  = `${name}-outline`;
      inspectorName2.textContent = `${name}-outline`;
      inspector.style.display = 'flex';

      // Quitar selección anterior
      container.querySelectorAll('.demo-icon-cell--selected')
        .forEach((c) => c.classList.remove('demo-icon-cell--selected'));
      cell.classList.add('demo-icon-cell--selected');
    });
  });
}

// ─── Utilidad interna ────────────────────────────────────────────────────────
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
