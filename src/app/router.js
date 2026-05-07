import { renderNotFound } from '../shared/dom.js';

let _routes = {};
let _topNav;

export function initRouter(routes, topNav) {
  _routes = routes;
  _topNav = topNav;
  window.addEventListener('hashchange', onRouteChange);
  topNav.addEventListener('ionChange', (e) => navigateTo(e.detail.value));
}

export function navigateTo(view, param = '') {
  const hash = param ? `#/${view}/${param}` : `#/${view}`;
  window.location.hash = hash;
}

export function onRouteChange() {
  const { view, param } = getRoute();
  // Si la vista es 'ionic' y hay parámetro, cargamos el demo del componente
  const routeKey = view === 'ionic' && param ? 'ionic-component' : view;
  const renderer = _routes[routeKey] || renderNotFound;
  updateTopNav(view);
  renderer(param);
}

export function getRoute() {
  const raw = window.location.hash.replace('#/', '');
  const [view = 'home', param = ''] = raw.split('/');
  return { view, param };
}

function updateTopNav(view) {
  const value = ['home', 'js', 'ionic', 'docs'].includes(view) ? view : 'home';
  _topNav.value = value;
}
