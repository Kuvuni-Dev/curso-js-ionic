const appRoot = document.querySelector('#app');
const topNav = document.querySelector('#top-nav');

const routes = {
  home: renderHome,
  js: renderJsSection,
  ionic: renderIonicSection,
  docs: renderDocsIndex,
  doc: renderDocView,
};

init();

function init() {
  window.addEventListener('hashchange', onRouteChange);
  topNav.addEventListener('ionChange', onTopNavChange);

  if (!window.location.hash) {
    navigateTo('home');
    return;
  }

  onRouteChange();
}

function onTopNavChange(event) {
  const selected = event.detail.value;
  navigateTo(selected);
}

function onRouteChange() {
  const { view, param } = getRoute();
  const renderer = routes[view] || renderNotFound;

  updateTopNav(view);
  renderer(param);
}

function getRoute() {
  const raw = window.location.hash.replace('#/', '');
  const [view = 'home', param = ''] = raw.split('/');
  return { view, param };
}

function navigateTo(view, param = '') {
  const hash = param ? `#/${view}/${param}` : `#/${view}`;
  window.location.hash = hash;
}

function updateTopNav(view) {
  const value = ['home', 'js', 'ionic', 'docs'].includes(view) ? view : 'home';
  topNav.value = value;
}

function renderHome() {
  appRoot.innerHTML = `
    <section class="page hero">
      <h1>Bienvenido al curso</h1>
      <p>Esta aplicacion se ejecuta con Live Server y JavaScript puro.</p>
      <div class="cta-grid">
        <ion-button expand="block" onclick="location.hash='#/js'">Ir a JS avanzado</ion-button>
        <ion-button expand="block" color="tertiary" onclick="location.hash='#/ionic'">Ver componentes Ionic</ion-button>
        <ion-button expand="block" color="success" onclick="location.hash='#/docs'">Leer Markdown</ion-button>
      </div>
    </section>
  `;
}

function renderJsSection() {
  appRoot.innerHTML = `
    <section class="page">
      <h2>Bloque JavaScript avanzado</h2>
      <ion-list inset="true">
        <ion-item>
          <ion-label>
            <h3>Closures</h3>
            <p>Encapsulacion de estado con funciones.</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <h3>Programacion asincrona</h3>
            <p>Promises, async/await y manejo de errores.</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <h3>Patrones</h3>
            <p>Modulo, Observer y Composicion.</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </section>
  `;
}

function renderIonicSection() {
  appRoot.innerHTML = `
    <section class="page">
      <h2>Catalogo de componentes Ionic</h2>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Botones</ion-card-title>
        </ion-card-header>
        <ion-card-content class="component-row">
          <ion-button>Default</ion-button>
          <ion-button color="secondary">Secondary</ion-button>
          <ion-button fill="outline">Outline</ion-button>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Input</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-label position="stacked">Tu nombre</ion-label>
            <ion-input placeholder="Escribe aqui"></ion-input>
          </ion-item>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Lista</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item><ion-label>ion-button</ion-label></ion-item>
            <ion-item><ion-label>ion-input</ion-label></ion-item>
            <ion-item><ion-label>ion-card</ion-label></ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </section>
  `;
}

async function renderDocsIndex() {
  appRoot.innerHTML = `<section class="page"><ion-spinner name="crescent"></ion-spinner></section>`;

  try {
    const response = await fetch('./content/md/index.json');
    if (!response.ok) throw new Error('No se pudo cargar index.json');

    const data = await response.json();
    const items = data.items || [];

    appRoot.innerHTML = `
      <section class="page">
        <h2>Documentacion del curso (Markdown)</h2>
        <ion-list inset="true">
          ${items
            .map(
              (item) => `
                <ion-item button="true" detail="true" data-doc-id="${item.id}">
                  <ion-label>
                    <h3>${item.title}</h3>
                    <p>${(item.tags || []).join(', ')}</p>
                  </ion-label>
                </ion-item>
              `
            )
            .join('')}
        </ion-list>
      </section>
    `;

    const clickableItems = appRoot.querySelectorAll('[data-doc-id]');
    clickableItems.forEach((element) => {
      element.addEventListener('click', () => {
        const docId = element.getAttribute('data-doc-id');
        navigateTo('doc', docId);
      });
    });
  } catch (error) {
    appRoot.innerHTML = `
      <section class="page">
        <ion-text color="danger">Error cargando documentos Markdown.</ion-text>
        <pre>${error.message}</pre>
      </section>
    `;
  }
}

async function renderDocView(docId) {
  appRoot.innerHTML = `<section class="page"><ion-spinner name="crescent"></ion-spinner></section>`;

  try {
    const indexResponse = await fetch('./content/md/index.json');
    if (!indexResponse.ok) throw new Error('No se pudo leer el indice de documentos.');

    const indexData = await indexResponse.json();
    const item = (indexData.items || []).find((doc) => doc.id === docId);

    if (!item) {
      renderNotFound();
      return;
    }

    const markdownResponse = await fetch(`./${item.path}`);
    if (!markdownResponse.ok) throw new Error(`No se pudo leer ${item.path}`);

    const markdown = await markdownResponse.text();
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
    appRoot.innerHTML = `
      <section class="page">
        <ion-text color="danger">Error cargando el documento.</ion-text>
        <pre>${error.message}</pre>
      </section>
    `;
  }
}

function renderNotFound() {
  appRoot.innerHTML = `
    <section class="page">
      <h2>Ruta no encontrada</h2>
      <ion-button onclick="location.hash='#/home'">Volver al inicio</ion-button>
    </section>
  `;
}
