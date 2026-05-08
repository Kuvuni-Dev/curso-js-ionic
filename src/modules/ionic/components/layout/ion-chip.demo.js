/**
 * @file ion-chip.demo.js
 * @description Demo didáctico del componente <ion-chip> de Ionic.
 *
 * ion-chip es una etiqueta compacta que puede contener texto, un icono
 * y/o un botón de cierre. Se usa para filtros, categorías, tags o
 * estados de selección.
 *
 * Documentación oficial: https://ionicframework.com/docs/api/chip
 */

const CODE_BASICO = `<!-- Chip básico -->
<ion-chip>Etiqueta</ion-chip>

<!-- Con icono -->
<ion-chip>
  <ion-icon name="star-outline"></ion-icon>
  <ion-label>Favorito</ion-label>
</ion-chip>

<!-- Con botón de cierre -->
<ion-chip>
  <ion-label>JavaScript</ion-label>
  <ion-icon name="close-circle" style="cursor:pointer;"></ion-icon>
</ion-chip>

<!-- Colores -->
<ion-chip color="primary">Primary</ion-chip>
<ion-chip color="success">Success</ion-chip>
<ion-chip color="danger">Danger</ion-chip>

<!-- Outline (sin relleno) -->
<ion-chip color="primary" outline="true">Outline</ion-chip>

<!-- Deshabilitado -->
<ion-chip disabled="true">Deshabilitado</ion-chip>`;

const CODE_AVATAR = `<!-- Con ion-avatar para imagen de perfil -->
<ion-chip>
  <ion-avatar>
    <img src="avatar.jpg" alt="Ana García" />
  </ion-avatar>
  <ion-label>Ana García</ion-label>
</ion-chip>`;

const CODE_EVENTO = `// ion-chip emite el evento nativo 'click'
const chip = document.querySelector('ion-chip');

chip.addEventListener('click', () => {
  chip.disabled = true; // deshabilitar tras seleccionar
});

// Chip closeable: escuchar el icono de cierre
const closeIcon = chip.querySelector('ion-icon[name="close-circle"]');
closeIcon.addEventListener('click', (e) => {
  e.stopPropagation(); // evitar que el click suba al chip
  chip.remove();
});`;

// ─── render() ───────────────────────────────────────────────────────────────
export function render() {
  return `
    <section class="demo-page">

      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-chip</h2>
        <p class="demo-desc">
          Etiqueta compacta para representar categorías, filtros, estados o
          personas. Puede contener texto, iconos, avatares y un botón de cierre.
        </p>
      </div>

      <!-- ── GRUPO: Colores ─────────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Colores y variantes</h3>
        <div class="demo-row" style="flex-wrap:wrap;">
          <ion-chip>Default</ion-chip>
          <ion-chip color="primary">Primary</ion-chip>
          <ion-chip color="secondary">Secondary</ion-chip>
          <ion-chip color="tertiary">Tertiary</ion-chip>
          <ion-chip color="success">Success</ion-chip>
          <ion-chip color="warning">Warning</ion-chip>
          <ion-chip color="danger">Danger</ion-chip>
          <ion-chip color="medium">Medium</ion-chip>
        </div>
        <div class="demo-row" style="flex-wrap:wrap;margin-top:10px;">
          <ion-chip outline="true">Outline</ion-chip>
          <ion-chip color="primary" outline="true">Primary</ion-chip>
          <ion-chip color="success" outline="true">Success</ion-chip>
          <ion-chip color="danger" outline="true">Danger</ion-chip>
          <ion-chip disabled="true">Deshabilitado</ion-chip>
        </div>
      </div>

      <!-- ── GRUPO: Con iconos ──────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Con iconos</h3>
        <div class="demo-row" style="flex-wrap:wrap;">
          <ion-chip color="primary">
            <ion-icon name="star-outline"></ion-icon>
            <ion-label>Favorito</ion-label>
          </ion-chip>
          <ion-chip color="success">
            <ion-icon name="checkmark-outline"></ion-icon>
            <ion-label>Completado</ion-label>
          </ion-chip>
          <ion-chip color="warning">
            <ion-icon name="time-outline"></ion-icon>
            <ion-label>Pendiente</ion-label>
          </ion-chip>
          <ion-chip color="danger">
            <ion-icon name="close-outline"></ion-icon>
            <ion-label>Error</ion-label>
          </ion-chip>
          <ion-chip>
            <ion-icon name="logo-javascript" style="color:#f7df1e;"></ion-icon>
            <ion-label>JavaScript</ion-label>
          </ion-chip>
        </div>
      </div>

      <!-- ── GRUPO: Chips cerrables (interactivo) ───────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Chips cerrables (demo interactivo)</h3>
        <p class="demo-group-desc">
          Pulsa la ✕ de cualquier chip para eliminarlo.
          El icono <code>close-circle</code> actúa como botón de cierre.
        </p>
        <div class="demo-row" style="flex-wrap:wrap;" id="chip-closeable-container">
          ${['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Ionic', 'Angular', 'React'].map((t, i) => {
            const colors = ['primary','secondary','tertiary','success','warning','danger','medium'];
            return `
              <ion-chip color="${colors[i % colors.length]}" class="demo-chip-closeable">
                <ion-label>${t}</ion-label>
                <ion-icon name="close-circle" class="demo-chip-close-btn" style="cursor:pointer;"></ion-icon>
              </ion-chip>
            `;
          }).join('')}
        </div>
        <p id="chip-status" style="font-size:0.82rem;opacity:0.6;margin-top:6px;min-height:18px;"></p>
      </div>

      <!-- ── GRUPO: Filtros seleccionables (interactivo) ───── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Filtros seleccionables (toggle)</h3>
        <p class="demo-group-desc">
          Un patrón habitual: chips que actúan como filtros con estado
          activo/inactivo.
        </p>
        <div class="demo-row" style="flex-wrap:wrap;" id="chip-filter-container">
          ${['Todos', 'Estructura', 'Formularios', 'Layout', 'Feedback'].map((t, i) => `
            <ion-chip
              id="filter-chip-${i}"
              color="${i === 0 ? 'primary' : 'medium'}"
              outline="${i !== 0}"
              class="demo-chip-filter"
              data-filter="${t}"
            >
              <ion-label>${t}</ion-label>
            </ion-chip>
          `).join('')}
        </div>
        <p id="filter-status" style="font-size:0.82rem;opacity:0.6;margin-top:6px;min-height:18px;">
          Filtro activo: "Todos"
        </p>
      </div>

      <!-- ── GRUPO: Con avatar ──────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Con ion-avatar</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_AVATAR)}</code></pre>
      </div>

      <!-- ── GRUPO: Código completo ─────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Código de referencia</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_BASICO)}</code></pre>
      </div>

      <!-- ── GRUPO: Eventos ─────────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Eventos desde JavaScript</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_EVENTO)}</code></pre>
      </div>

    </section>
  `;
}

// ─── init() ─────────────────────────────────────────────────────────────────
export function init(container) {
  // Chips cerrables
  const chipStatus = container.querySelector('#chip-status');
  container.querySelectorAll('.demo-chip-close-btn').forEach((icon) => {
    icon.addEventListener('click', (e) => {
      e.stopPropagation();
      const chip = icon.closest('ion-chip');
      const label = chip.querySelector('ion-label').textContent;
      chip.style.transition = 'opacity 0.2s, transform 0.2s';
      chip.style.opacity = '0';
      chip.style.transform = 'scale(0.8)';
      setTimeout(() => chip.remove(), 200);
      chipStatus.textContent = `Chip "${label}" eliminado`;
    });
  });

  // Filtros seleccionables
  const filterStatus = container.querySelector('#filter-status');
  container.querySelectorAll('.demo-chip-filter').forEach((chip) => {
    chip.addEventListener('click', () => {
      container.querySelectorAll('.demo-chip-filter').forEach((c) => {
        c.setAttribute('color', 'medium');
        c.setAttribute('outline', 'true');
      });
      chip.setAttribute('color', 'primary');
      chip.setAttribute('outline', 'false');
      filterStatus.textContent = `Filtro activo: "${chip.dataset.filter}"`;
    });
  });
}

// ─── Utilidad interna ────────────────────────────────────────────────────────
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
