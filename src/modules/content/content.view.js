import { appRoot } from '../../shared/dom.js';
import { navigateTo } from '../../app/router.js';
import { fetchDocsIndex, fetchDoc } from './content.service.js';

const CATEGORIES = [
  { key: 'javascript', label: 'JavaScript', color: 'warning' },
  { key: 'ionic',      label: 'Ionic',      color: 'primary' },
  { key: 'general',    label: 'General',    color: 'success' },
];

export async function renderDocsIndex() {
  appRoot.innerHTML = `<section class="page"><ion-spinner name="crescent"></ion-spinner></section>`;

  try {
    const items = await fetchDocsIndex();

    const sections = CATEGORIES.map(({ key, label, color }) => {
      const group = items.filter((i) => i.category === key);
      if (!group.length) return '';
      return `
        <ion-card>
          <ion-card-header>
            <ion-chip color="${color}" style="margin-bottom:4px;">
              <ion-label>${label}</ion-label>
            </ion-chip>
            <ion-card-title>${label}</ion-card-title>
          </ion-card-header>
          <ion-card-content style="padding:0;">
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
          </ion-card-content>
        </ion-card>
      `;
    }).join('');

    appRoot.innerHTML = `
      <section class="page">
        <h2>Documentación del curso</h2>
        ${sections}
      </section>
    `;

    appRoot.querySelectorAll('[data-doc-id]').forEach((el) => {
      el.addEventListener('click', () => navigateTo('doc', el.getAttribute('data-doc-id')));
    });
  } catch (error) {
    renderError(error.message);
  }
}

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
        <ion-button fill="clear" onclick="location.hash='#/docs'">Volver</ion-button>
        <h2>${item.title}</h2>
        <article class="markdown-body">${sanitized}</article>
      </section>
    `;
  } catch (error) {
    renderError(error.message);
  }
}

function renderError(message) {
  appRoot.innerHTML = `
    <section class="page">
      <ion-text color="danger">Error cargando el documento.</ion-text>
      <pre>${message}</pre>
    </section>
  `;
}

