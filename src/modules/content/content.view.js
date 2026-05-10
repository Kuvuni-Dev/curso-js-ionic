import { appRoot } from '../../shared/dom.js';
import { navigateTo } from '../../app/router.js';
import { fetchDocsIndex, fetchDoc } from './content.service.js';

const CATEGORIES = [
  { key: 'javascript-basico', label: 'JavaScript básico', color: 'warning' },
  { key: 'javascript-avanzado', label: 'JavaScript avanzado', color: 'tertiary' },
  { key: 'ionic-fundamentos', label: 'Ionic - Fundamentos', color: 'primary' },
  { key: 'ionic-instalacion', label: 'Ionic - Instalación de frameworks', color: 'primary' },
  { key: 'ionic-componentes', label: 'Ionic - Componentes y ejemplos', color: 'primary' },
  { key: 'ionic-capacitor', label: 'Ionic - Capacitor', color: 'primary' },
  { key: 'ionic-mini-proyectos', label: 'Ionic - Mini Proyectos', color: 'primary' },
  { key: 'general',    label: 'General',    color: 'success' },
];

/**
 * Renderiza categorías de documentación o, si llega una categoría,
 * los documentos de esa categoría.
 * @param {string} [categoryKey='']
 * @returns {Promise<void>}
 */
export async function renderDocsIndex(categoryKey = '') {
  appRoot.innerHTML = `<section class="page"><ion-spinner name="crescent"></ion-spinner></section>`;

  try {
    const items = await fetchDocsIndex();

    if (!categoryKey) {
      const categoriesMarkup = CATEGORIES.map(({ key, label, color }) => {
        const count = items.filter((i) => i.category === key).length;
        if (!count) return '';
        return `
          <ion-card button="true" data-category-key="${key}" style="cursor:pointer;">
            <ion-card-header>
              <ion-chip color="${color}" style="margin-bottom:4px;">
                <ion-label>${label}</ion-label>
              </ion-chip>
              <ion-card-title>${label}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>${count} documento(s)</p>
            </ion-card-content>
          </ion-card>
        `;
      }).join('');

      appRoot.innerHTML = `
        <section class="page">
          <h2>Documentación del curso</h2>
          <p>Selecciona una categoría para ver sus documentos.</p>
          ${categoriesMarkup}
        </section>
      `;

      appRoot.querySelectorAll('[data-category-key]').forEach((el) => {
        el.addEventListener('click', () => navigateTo('docs', el.getAttribute('data-category-key')));
      });
      return;
    }

    const category = CATEGORIES.find((c) => c.key === categoryKey);
    const group = items.filter((i) => i.category === categoryKey);

    if (!category || !group.length) {
      appRoot.innerHTML = `
        <section class="page">
          <ion-button fill="clear" onclick="location.hash='#/docs'">Volver a categorías</ion-button>
          <p>Categoría no encontrada o sin documentos.</p>
        </section>
      `;
      return;
    }

    appRoot.innerHTML = `
      <section class="page">
        <ion-button fill="clear" onclick="location.hash='#/docs'">Volver a categorías</ion-button>
        <h2>${category.label}</h2>
        <ion-list lines="inset">
          ${group.map((item) => `
            <ion-item button="true" detail="true" data-doc-id="${item.id}">
              <ion-label>
                <h3>${item.title}</h3>
                <p>${(item.tags || []).join(', ')}</p>
              </ion-label>
            </ion-item>
          `).join('')}
        </ion-list>
      </section>
    `;

    appRoot.querySelectorAll('[data-doc-id]').forEach((el) => {
      el.addEventListener('click', () => navigateTo('doc', el.getAttribute('data-doc-id')));
    });
  } catch (error) {
    renderError(error.message);
  }
}

/**
 * Renderiza un documento markdown por su id.
 * @param {string} docId
 * @returns {Promise<void>}
 */
export async function renderDocView(docId) {
  appRoot.innerHTML = `<section class="page"><ion-spinner name="crescent"></ion-spinner></section>`;

  try {
    const result = await fetchDoc(docId);
    if (!result) {
      appRoot.innerHTML = `<section class="page"><p>Documento no encontrado.</p></section>`;
      return;
    }

    const { item, markdown } = result;
    const html = window.marked.parse(markdown);
    const sanitized = window.DOMPurify.sanitize(html);

    appRoot.innerHTML = `
      <section class="page markdown-page">
        <ion-button fill="clear" onclick="location.hash='#/docs/${item.category}'">Volver</ion-button>
        <h2>${item.title}</h2>
        <article class="markdown-body">${sanitized}</article>
        <ion-button
          color="primary"
          style="position:fixed; right:clamp(16px, 8vw, 50px); bottom:calc(84px + env(safe-area-inset-bottom)); z-index:1000; box-shadow:0 6px 16px rgba(0,0,0,.2);"
          onclick="location.hash='#/docs/${item.category}'"
        >
          Volver
        </ion-button>
      </section>
    `;
  } catch (error) {
    renderError(error.message);
  }
}

/**
 * Muestra un estado de error amigable en la vista actual.
 * @param {string} message
 */
function renderError(message) {
  appRoot.innerHTML = `
    <section class="page">
      <ion-text color="danger">Error cargando el documento.</ion-text>
      <pre>${message}</pre>
    </section>
  `;
}

