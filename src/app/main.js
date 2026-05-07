import { initRouter, navigateTo, onRouteChange } from './router.js';
import { initTheme } from './theme.js';
import { renderHome } from '../modules/home/home.view.js';
import { renderJsSection, renderJsComponent } from '../modules/js/js.view.js';
import { renderIonicSection, renderIonicComponent } from '../modules/ionic/ionic.view.js';
import { renderDocsIndex, renderDocView } from '../modules/content/content.view.js';

const routes = {
  home: renderHome,
  js: renderJsSection,
  'js-component': renderJsComponent,
  ionic: renderIonicSection,
  // 'ionic' con parámetro carga el demo individual del componente
  'ionic-component': renderIonicComponent,
  docs: renderDocsIndex,
  doc: renderDocView,
};

customElements.whenDefined('ion-toggle').then(init);

function init() {
  const topNav = document.querySelector('#top-nav');
  const themeToggle = document.querySelector('#theme-toggle');
  const themeLabel = document.querySelector('#theme-label');

  initTheme(themeToggle, themeLabel);
  initRouter(routes, topNav);

  if (!window.location.hash) {
    navigateTo('home');
    return;
  }

  onRouteChange();
}
