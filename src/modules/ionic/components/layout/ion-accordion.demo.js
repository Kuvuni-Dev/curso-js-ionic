/**
 * @file ion-accordion.demo.js
 * @description Demo didáctico de ion-accordion e ion-accordion-group.
 *
 * Los acordeones permiten mostrar/ocultar secciones de contenido de forma
 * controlada. ion-accordion-group gestiona cuál está abierto y si se permite
 * tener varios abiertos a la vez.
 *
 * Documentación oficial: https://ionicframework.com/docs/api/accordion
 */

// NOTA CDN: ion-accordion e ion-accordion-group cargan chunks adicionales.
// El preview interactivo se implementa con divs CSS/JS equivalentes.

const CODE_BASICO = `<ion-accordion-group>

  <ion-accordion value="primero">
    <!-- El slot "header" es el botón que expande/contrae -->
    <ion-item slot="header" color="light">
      <ion-label>Sección 1</ion-label>
    </ion-item>
    <!-- El slot "content" es el contenido expandible -->
    <div slot="content" class="ion-padding">
      Contenido de la primera sección.
    </div>
  </ion-accordion>

  <ion-accordion value="segundo">
    <ion-item slot="header" color="light">
      <ion-label>Sección 2</ion-label>
    </ion-item>
    <div slot="content" class="ion-padding">
      Contenido de la segunda sección.
    </div>
  </ion-accordion>

</ion-accordion-group>`;

const CODE_MULTIPLE = `<!-- multiple: permite abrir varios acordeones a la vez -->
<ion-accordion-group [multiple]="true" [value]="['primero', 'tercero']">
  ...
</ion-accordion-group>

<!-- value: controla cuál está abierto por defecto -->
<ion-accordion-group value="segundo">
  ...
</ion-accordion-group>`;

const CODE_EVENTO = `// Detectar cambios de estado
const group = document.querySelector('ion-accordion-group');

group.addEventListener('ionChange', (e) => {
  const abierto = e.detail.value; // string | string[] | undefined
  console.log('Acordeón abierto:', abierto);
});

// Abrir/cerrar programáticamente
group.value = 'segundo';   // abre el acordeón con value="segundo"
group.value = undefined;   // cierra todos`;

const CODE_ICONO = `<!-- El icono de la flecha se puede personalizar con CSS -->
ion-accordion {
  --ion-accordion-toggle-icon-color: var(--ion-color-primary);
}

/* Cambiar el icono de expansión -->
<ion-accordion toggle-icon="add-circle-outline"
               toggle-icon-slot="start">
  ...
</ion-accordion>`;

// ─── render() ───────────────────────────────────────────────────────────────
export function render() {
  return `
    <section class="demo-page">

      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-accordion / ion-accordion-group</h2>
        <p class="demo-desc">
          Componentes de acordeón para mostrar u ocultar secciones de contenido.
          <code>ion-accordion-group</code> actúa como controlador de estado:
          gestiona cuál está abierto y si se permiten múltiples a la vez.
        </p>
      </div>

      <!-- ── GRUPO: Estructura ──────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Estructura de componentes</h3>
        <ion-list inset="true">
          <ion-item>
            <ion-icon slot="start" name="layers-outline" color="warning"></ion-icon>
            <ion-label>
              <h3>ion-accordion-group</h3>
              <p>Contenedor que gestiona el estado de apertura. Emite <code>ionChange</code> al cambiar.</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" name="chevron-down-circle-outline" color="warning"></ion-icon>
            <ion-label>
              <h3>ion-accordion</h3>
              <p>Elemento individual. Requiere un atributo <code>value</code> para identificarlo.</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" name="albums-outline" color="medium"></ion-icon>
            <ion-label>
              <h3>slot="header"</h3>
              <p>Zona clicable que expande/contrae. Suele ser un <code>ion-item</code>.</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" name="reader-outline" color="medium"></ion-icon>
            <ion-label>
              <h3>slot="content"</h3>
              <p>Contenido que se muestra u oculta. Puede ser cualquier HTML.</p>
            </ion-label>
          </ion-item>
        </ion-list>
        <pre class="demo-code"><code>${escapeHtml(CODE_BASICO)}</code></pre>
      </div>

      <!-- ── GRUPO: Demo interactivo (acordeón único) ───────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Demo interactivo — solo uno abierto</h3>
        <p class="demo-group-desc">
          Por defecto, abrir un acordeón cierra el que estaba abierto.
        </p>

        <div class="demo-accordion" id="acc-single">
          ${[
            { value: 'js',     title: '¿Qué es JavaScript?',     icon: 'logo-javascript', color: '#f7df1e', text: 'Lenguaje de programación interpretado, orientado a objetos y de tipado dinámico, utilizado principalmente en el navegador.' },
            { value: 'ts',     title: '¿Qué es TypeScript?',     icon: 'code-slash-outline', color: 'var(--ion-color-primary)', text: 'Superconjunto de JavaScript que añade tipado estático opcional y características de OOP. Se compila a JavaScript.' },
            { value: 'ionic',  title: '¿Qué es Ionic?',          icon: 'logo-ionic', color: 'var(--ion-color-tertiary)', text: 'Framework de UI basado en componentes web estándar para crear apps móviles y PWA con tecnologías web.' },
          ].map(({ value, title, icon, color, text }) => `
            <div class="demo-accordion__item" data-value="${value}">
              <button class="demo-accordion__header" aria-expanded="false">
                <ion-icon name="${icon}" style="color:${color};font-size:1.2rem;"></ion-icon>
                <span>${title}</span>
                <ion-icon name="chevron-down-outline" class="demo-accordion__arrow"></ion-icon>
              </button>
              <div class="demo-accordion__content">
                <p>${text}</p>
              </div>
            </div>
          `).join('')}
        </div>
        <p id="acc-single-log" style="text-align:center;font-size:0.82rem;opacity:0.6;margin-top:6px;min-height:18px;"></p>
      </div>

      <!-- ── GRUPO: Demo interactivo (múltiple) ────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Demo interactivo — múltiples abiertos</h3>
        <p class="demo-group-desc">
          Con <code>multiple="true"</code> se pueden abrir varios acordeones
          simultáneamente.
        </p>

        <div class="demo-accordion demo-accordion--multiple" id="acc-multi">
          ${[
            { value: 'a', title: 'Ventaja 1: rendimiento', text: 'Solo renderiza el contenido visible, mejorando la velocidad de carga inicial.' },
            { value: 'b', title: 'Ventaja 2: UX clara',    text: 'Reduce el ruido visual al colapsar contenido secundario, dejando visible lo esencial.' },
            { value: 'c', title: 'Ventaja 3: accesible',   text: 'Ionic implementa ARIA automáticamente: aria-expanded, role="button", gestión de foco.' },
          ].map(({ value, title, text }) => `
            <div class="demo-accordion__item" data-value="${value}">
              <button class="demo-accordion__header" aria-expanded="false">
                <ion-icon name="checkmark-circle-outline" color="warning"></ion-icon>
                <span>${title}</span>
                <ion-icon name="add-outline" class="demo-accordion__arrow"></ion-icon>
              </button>
              <div class="demo-accordion__content">
                <p>${text}</p>
              </div>
            </div>
          `).join('')}
        </div>
        <p id="acc-multi-log" style="text-align:center;font-size:0.82rem;opacity:0.6;margin-top:6px;min-height:18px;"></p>

        <pre class="demo-code" style="margin-top:12px;"><code>${escapeHtml(CODE_MULTIPLE)}</code></pre>
      </div>

      <!-- ── GRUPO: Control desde JS ───────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Control desde JavaScript</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_EVENTO)}</code></pre>
      </div>

      <!-- ── GRUPO: Icono personalizado ───────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Personalización del icono</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_ICONO)}</code></pre>
      </div>

    </section>
  `;
}

// ─── init() ─────────────────────────────────────────────────────────────────
export function init(container) {
  // Acordeón de un solo abierto
  initAccordion(
    container.querySelector('#acc-single'),
    container.querySelector('#acc-single-log'),
    false
  );
  // Acordeón múltiple
  initAccordion(
    container.querySelector('#acc-multi'),
    container.querySelector('#acc-multi-log'),
    true
  );
}

function initAccordion(groupEl, logEl, multiple) {
  if (!groupEl) return;
  groupEl.querySelectorAll('.demo-accordion__item').forEach((item) => {
    const btn     = item.querySelector('.demo-accordion__header');
    const content = item.querySelector('.demo-accordion__content');
    const arrow   = item.querySelector('.demo-accordion__arrow');

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('demo-accordion__item--open');

      if (!multiple) {
        // Cerrar todos primero
        groupEl.querySelectorAll('.demo-accordion__item--open').forEach((el) => {
          el.classList.remove('demo-accordion__item--open');
          el.querySelector('.demo-accordion__header').setAttribute('aria-expanded', 'false');
        });
      }

      if (!isOpen) {
        item.classList.add('demo-accordion__item--open');
        btn.setAttribute('aria-expanded', 'true');
      }

      // Log de estado
      const openValues = [...groupEl.querySelectorAll('.demo-accordion__item--open')]
        .map((el) => el.dataset.value);
      logEl.textContent = openValues.length
        ? `ionChange → value: "${openValues.join('", "')}"`
        : 'ionChange → value: undefined (todos cerrados)';
    });
  });
}

// ─── Utilidad interna ────────────────────────────────────────────────────────
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
