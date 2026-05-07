/**
 * @file ionic.view.js
 * @description Catálogo principal de componentes Ionic.
 *
 * Muestra una lista de componentes disponibles. Al pulsar uno,
 * navega a #/ionic/:nombre y carga su demo individual.
 */

import { appRoot } from '../../shared/dom.js';
import { navigateTo } from '../../app/router.js';

/**
 * Catálogo de componentes agrupado por categorías.
 *
 * Cada categoría tiene:
 *  - label:      nombre de la sección
 *  - color:      color del chip de cabecera (tokens Ionic)
 *  - icon:       icono representativo de la categoría
 *  - components: lista de componentes
 *
 * Cada componente tiene:
 *  - id:         nombre usado en la ruta (#/ionic/:id). null = sin demo todavía.
 *  - label:      nombre visible
 *  - icon:       ion-icon
 *  - description descripción breve
 */
const CATEGORIES = [
  {
    label: 'Estructura',
    folder: 'estructura',
    color: 'tertiary',
    icon: 'layers-outline',
    components: [
      { id: 'ion-app',    label: 'ion-app',           icon: 'phone-portrait-outline',  description: 'Elemento raíz que envuelve toda la aplicación.' },
      { id: 'ion-page',   label: 'ion-page',          icon: 'document-outline',        description: 'Contenedor de cada pantalla de la app.' },
      { id: 'ion-router', label: 'ion-router',        icon: 'git-branch-outline',      description: 'Router declarativo para apps Ionic/Angular.' },
      { id: 'ion-router', label: 'ion-router-outlet', icon: 'swap-horizontal-outline', description: 'Punto de montaje donde se inyectan las páginas. Ver demo de ion-router.' },
      { id: 'ion-nav',    label: 'ion-nav',           icon: 'navigate-outline',        description: 'Pila de navegación programática (push/pop).' },
      { id: 'ion-split-pane', label: 'ion-split-pane',    icon: 'tablet-landscape-outline', description: 'Layout de dos columnas para pantallas anchas (tablet/escritorio).' },
      { id: 'ion-header',     label: 'ion-header',        icon: 'albums-outline',          description: 'Cabecera fija de una página.' },
      { id: 'ion-header',     label: 'ion-toolbar',       icon: 'menu-outline',            description: 'Barra dentro del header o footer. Ver demo de ion-header.' },
      { id: 'ion-header',     label: 'ion-title',         icon: 'text-outline',            description: 'Título centrado dentro de ion-toolbar. Ver demo de ion-header.' },
      { id: 'ion-header',     label: 'ion-buttons',       icon: 'ellipsis-horizontal-outline', description: 'Agrupa botones dentro de la toolbar (slot start/end). Ver demo de ion-header.' },
      { id: 'ion-footer',     label: 'ion-footer',        icon: 'remove-outline',          description: 'Pie fijo de una página.' },
      { id: 'ion-content',    label: 'ion-content',       icon: 'reader-outline',          description: 'Área de desplazamiento del contenido principal.' },
    ],
  },
  {
    label: 'Botones y acciones',
    folder: 'botones',
    color: 'primary',
    icon: 'hand-left-outline',
    components: [
      { id: 'ion-button',       label: 'ion-button',      icon: 'hand-left-outline',      description: 'Botones con variantes de color, relleno, tamaño e iconos.' },
      { id: 'ion-fab',          label: 'ion-fab',          icon: 'add-circle-outline',     description: 'Contenedor del botón de acción flotante (FAB).' },
      { id: 'ion-fab',          label: 'ion-fab-button',   icon: 'add-outline',            description: 'Botón circular flotante. Ver demo de ion-fab.' },
      { id: 'ion-fab',          label: 'ion-fab-list',     icon: 'list-circle-outline',    description: 'Acciones secundarias que se despliegan desde el FAB. Ver demo de ion-fab.' },
      { id: 'ion-back-button',  label: 'ion-back-button',  icon: 'arrow-back-outline',     description: 'Botón de retroceso con icono adaptado a la plataforma (iOS/MD).' },
      { id: 'ion-action-sheet', label: 'ion-action-sheet', icon: 'apps-outline',           description: 'Hoja de acciones deslizable desde la parte inferior.' },
    ],
  },
  {
    label: 'Formularios',
    folder: 'formularios',
    color: 'success',
    icon: 'create-outline',
    components: [
      { id: 'ion-input',    label: 'ion-input',           icon: 'create-outline',          description: 'Campo de texto con tipos, posiciones de label y eventos.' },
      { id: 'ion-toggle',   label: 'ion-toggle',          icon: 'toggle-outline',          description: 'Interruptor on/off con evento ionChange.' },
      { id: 'ion-checkbox', label: 'ion-checkbox',        icon: 'checkbox-outline',        description: 'Casilla de verificación con estados checked, unchecked e indeterminate.' },
      { id: 'ion-radio',    label: 'ion-radio',           icon: 'radio-button-on-outline', description: 'Opción única dentro de un grupo de radio.' },
      { id: 'ion-radio',    label: 'ion-radio-group',     icon: 'ellipse-outline',         description: 'Agrupa varios ion-radio para selección exclusiva.' },
      { id: 'ion-select',   label: 'ion-select',          icon: 'chevron-down-outline',    description: 'Selector desplegable con interfaz alert, action-sheet o popover.' },
      { id: 'ion-select',   label: 'ion-select-option',   icon: 'list-outline',            description: 'Opción individual dentro de un ion-select.' },
      { id: 'ion-textarea', label: 'ion-textarea',        icon: 'document-text-outline',   description: 'Área de texto multilínea con autosize y contador.' },
      { id: 'ion-range',    label: 'ion-range',           icon: 'options-outline',         description: 'Control deslizante de rango con pin, snaps y dual-knob.' },
      { id: 'ion-searchbar',label: 'ion-searchbar',       icon: 'search-outline',          description: 'Barra de búsqueda con filtrado en tiempo real y debounce.' },
      { id: 'ion-datetime', label: 'ion-datetime',        icon: 'calendar-outline',        description: 'Selector de fecha y hora con formato nativo iOS/Android.' },
      { id: 'ion-datetime', label: 'ion-datetime-button', icon: 'time-outline',            description: 'Botón que abre un ion-datetime en modal o popover.' },
      { id: 'ion-picker',   label: 'ion-picker',          icon: 'filter-outline',          description: 'Ruleta de selección estilo nativo iOS/Android.' },
    ],
  },
  {
    label: 'Layout y contenido',
    folder: 'layout',
    color: 'warning',
    icon: 'grid-outline',
    components: [
      { id: 'ion-card',        label: 'ion-card',            icon: 'card-outline',                description: 'Contenedor visual con cabecera, cuerpo e imágenes.' },
      { id: 'ion-list',        label: 'ion-list / ion-item',  icon: 'list-outline',                description: 'Listas con iconos, badges, notas e items clicables.' },
      { id: 'ion-list',        label: 'ion-item-divider',     icon: 'remove-circle-outline',       description: 'Separador visual con etiqueta dentro de una lista. Ver demo de ion-list.' },
      { id: 'ion-list',        label: 'ion-item-group',       icon: 'folder-open-outline',         description: 'Agrupa items con un divider de cabecera. Ver demo de ion-list.' },
      { id: 'ion-grid',        label: 'ion-grid',             icon: 'grid-outline',                description: 'Sistema de rejilla responsive de 12 columnas.' },
      { id: 'ion-grid',        label: 'ion-row',              icon: 'reorder-two-outline',         description: 'Fila horizontal dentro de ion-grid. Ver demo de ion-grid.' },
      { id: 'ion-grid',        label: 'ion-col',              icon: 'stop-outline',                description: 'Columna dentro de ion-row, con tamaños breakpoint. Ver demo de ion-grid.' },
      { id: 'ion-accordion',   label: 'ion-accordion',        icon: 'chevron-down-circle-outline', description: 'Elemento expandible/colapsable.' },
      { id: 'ion-accordion',   label: 'ion-accordion-group',  icon: 'layers-outline',              description: 'Agrupa acordeones con control de apertura única o múltiple. Ver demo de ion-accordion.' },
      { id: 'ion-chip',        label: 'ion-chip',             icon: 'pricetag-outline',            description: 'Etiqueta compacta con texto e icono opcionales.' },
      { id: 'ion-badge',       label: 'ion-badge',            icon: 'ellipse-outline',             description: 'Contador o indicador numérico.' },
      { id: 'ion-badge',       label: 'ion-note',             icon: 'information-circle-outline',  description: 'Texto secundario pequeño dentro de un item. Ver demo de ion-badge.' },
      { id: 'ion-badge',       label: 'ion-text',             icon: 'text-outline',                description: 'Aplica color de la paleta Ionic a texto en línea. Ver demo de ion-badge.' },
      { id: 'ion-badge',       label: 'ion-label',            icon: 'bookmark-outline',            description: 'Etiqueta de texto asociada a controles de formulario. Ver demo de ion-badge.' },
      { id: 'ion-avatar',      label: 'ion-avatar',           icon: 'person-circle-outline',       description: 'Imagen de perfil circular.' },
      { id: 'ion-avatar',      label: 'ion-thumbnail',        icon: 'image-outline',               description: 'Miniatura cuadrada de imagen. Ver demo de ion-avatar.' },
      { id: 'ion-avatar',      label: 'ion-img',              icon: 'image-outline',               description: 'Imagen con lazy loading nativo de Ionic. Ver demo de ion-avatar.' },
      { id: 'ion-icon',        label: 'ion-icon',             icon: 'star-outline',                description: 'Icono vectorial de la librería Ionicons.' },
      { id: 'ion-progress-bar',label: 'ion-progress-bar',     icon: 'stats-chart-outline',         description: 'Barra de progreso determinada o indeterminada.' },
    ],
  },
  {
    label: 'Interacción y scroll',
    folder: 'interaccion',
    color: 'medium',
    icon: 'finger-print-outline',
    components: [
      { id: 'ion-item-sliding',   label: 'ion-item-sliding',    icon: 'swap-horizontal-outline',     description: 'Item con acciones ocultas que se revelan al deslizar.' },
      { id: 'ion-item-sliding',   label: 'ion-item-options',    icon: 'ellipsis-horizontal-outline', description: 'Contenedor de las acciones deslizables de un item.' },
      { id: 'ion-item-sliding',   label: 'ion-item-option',     icon: 'hand-right-outline',          description: 'Botón individual dentro de ion-item-options.' },
      { id: 'ion-reorder-group',  label: 'ion-reorder',         icon: 'reorder-three-outline',       description: 'Asa de arrastre para reordenar items en una lista.' },
      { id: 'ion-reorder-group',  label: 'ion-reorder-group',   icon: 'move-outline',                description: 'Lista reordenable que gestiona el evento ionItemReorder.' },
      { id: 'ion-infinite-scroll', label: 'ion-infinite-scroll', icon: 'refresh-outline',            description: 'Carga más contenido al llegar al final de la lista.' },
      { id: 'ion-refresher',      label: 'ion-refresher',       icon: 'arrow-down-outline',          description: 'Gesto pull-to-refresh para recargar contenido.' },
    ],
  },
  {
    label: 'Navegación',
    folder: 'navegacion',
    color: 'secondary',
    icon: 'navigate-outline',
    components: [
      { id: null, label: 'ion-tabs',        icon: 'albums-outline',               description: 'Contenedor del sistema de pestañas.' },
      { id: null, label: 'ion-tab-bar',     icon: 'reorder-four-outline',         description: 'Barra inferior con los botones de pestaña.' },
      { id: null, label: 'ion-tab-button',  icon: 'apps-outline',                 description: 'Botón individual dentro de la tab bar.' },
      { id: null, label: 'ion-segment',     icon: 'git-commit-outline',           description: 'Selector de opciones en línea (como pestañas superiores).' },
      { id: null, label: 'ion-segment-button', icon: 'radio-button-on-outline',   description: 'Opción individual dentro de un ion-segment.' },
      { id: null, label: 'ion-breadcrumb',  icon: 'return-up-forward-outline',    description: 'Ruta de migas de pan para orientación en profundidad.' },
      { id: null, label: 'ion-breadcrumbs', icon: 'git-merge-outline',            description: 'Contenedor de ion-breadcrumb con desbordamiento configurable.' },
      { id: null, label: 'ion-menu',        icon: 'menu-outline',                 description: 'Menú lateral deslizable (drawer).' },
      { id: null, label: 'ion-menu-button', icon: 'menu-sharp',                   description: 'Botón que abre/cierra el ion-menu.' },
    ],
  },
  {
    label: 'Feedback y overlays',
    folder: 'feedback',
    color: 'danger',
    icon: 'chatbubble-ellipses-outline',
    components: [
      { id: null, label: 'ion-alert',         icon: 'alert-circle-outline',    description: 'Cuadro de diálogo modal con botones.' },
      { id: null, label: 'ion-toast',         icon: 'notifications-outline',   description: 'Notificación temporal no bloqueante.' },
      { id: null, label: 'ion-loading',       icon: 'hourglass-outline',       description: 'Indicador de carga con overlay.' },
      { id: null, label: 'ion-modal',         icon: 'browsers-outline',        description: 'Ventana modal que cubre la pantalla.' },
      { id: null, label: 'ion-popover',       icon: 'chatbox-outline',         description: 'Capa flotante anclada a un elemento.' },
      { id: null, label: 'ion-spinner',       icon: 'sync-outline',            description: 'Animación de carga con varios estilos.' },
      { id: null, label: 'ion-skeleton-text', icon: 'text-outline',            description: 'Placeholder animado mientras carga el contenido.' },
      { id: null, label: 'ion-progress-bar',  icon: 'stats-chart-outline',     description: 'Barra de progreso determinada o indeterminada (también en Layout).' },
    ],
  },
];

/**
 * Renderiza el catálogo agrupado por categorías.
 * Los componentes con demo son clicables; los demás muestran "Próximamente".
 */
export function renderIonicSection() {
  const categoriesHtml = CATEGORIES.map((cat) => {
    const itemsHtml = cat.components.map((c) => {
      const hasDemo = c.id !== null;
      return `
        <ion-item
          ${hasDemo ? `button="true" detail="true" data-component-id="${c.id}"` : ''}
          ${hasDemo ? '' : 'disabled="true"'}
        >
          <ion-icon slot="start" name="${c.icon}" color="${hasDemo ? cat.color : 'medium'}"></ion-icon>
          <ion-label>
            <h3>${c.label}</h3>
            <p>${c.description}</p>
          </ion-label>
          ${hasDemo ? '' : '<ion-badge slot="end" color="medium">Próximamente</ion-badge>'}
        </ion-item>
      `;
    }).join('');

    return `
      <div class="catalog-category">
        <div class="catalog-category-header">
          <ion-chip color="${cat.color}" style="pointer-events:none;">
            <ion-icon name="${cat.icon}"></ion-icon>
            <ion-label>${cat.label}</ion-label>
          </ion-chip>
        </div>
        <ion-list inset="true">
          ${itemsHtml}
        </ion-list>
      </div>
    `;
  }).join('');

  appRoot.innerHTML = `
    <section class="page">
      <h2>Catálogo de componentes Ionic</h2>
      <p style="margin-bottom:20px;">
        Selecciona un componente para ver su demo interactivo y código de ejemplo.
        Los marcados como <em>Próximamente</em> se irán añadiendo a lo largo del curso.
      </p>
      ${categoriesHtml}
    </section>
  `;

  // Adjuntar navegación solo a los items con demo
  appRoot.querySelectorAll('[data-component-id]').forEach((el) => {
    el.addEventListener('click', () => {
      navigateTo('ionic', el.getAttribute('data-component-id'));
    });
  });
}

/**
 * Mapa componentId → carpeta de categoría.
 * Se construye a partir de CATEGORIES para no duplicar información.
 * Si un id aparece en varias categorías (no debería), prevalece el primero.
 */
const COMPONENT_FOLDER = (() => {
  /** @type {Record<string, string>} */
  const map = {};
  for (const cat of CATEGORIES) {
    for (const c of cat.components) {
      if (c.id && !map[c.id]) map[c.id] = cat.folder;
    }
  }
  return map;
})();

/**
 * Carga y renderiza el demo de un componente específico.
 * Importa dinámicamente el archivo *.demo.js de su subcarpeta de categoría.
 *
 * @param {string} componentId - El id del componente (ej: 'ion-button')
 */
export async function renderIonicComponent(componentId) {
  appRoot.innerHTML = `<section class="page"><ion-spinner name="crescent"></ion-spinner></section>`;

  try {
    // Resuelve la subcarpeta según la categoría a la que pertenece el componente.
    const folder = COMPONENT_FOLDER[componentId];
    if (!folder) throw new Error(`Carpeta desconocida para: ${componentId}`);

    // import() dinámico: carga solo el módulo que se necesita en ese momento.
    const module = await import(`./components/${folder}/${componentId}.demo.js`);

    // Cada demo exporta render() e init()
    appRoot.innerHTML = module.render();

    // init() conecta los listeners interactivos una vez que el HTML está en el DOM
    module.init(appRoot);
  } catch {
    appRoot.innerHTML = `
      <section class="page">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <p><ion-text color="danger">Componente no encontrado: <code>${componentId}</code></ion-text></p>
      </section>
    `;
  }
}

