import { renderNotFound } from '../shared/dom.js';

let _routes = {};
let _topNav;

/**
 * Inicializa el router con el mapa de rutas y el control de navegación superior.
 * @param {Record<string, Function>} routes
 * @param {HTMLElement} topNav
 */
export function initRouter(routes, topNav) {
  _routes = routes;
  _topNav = topNav;
  window.addEventListener('hashchange', onRouteChange);
  topNav.addEventListener('ionChange', (e) => navigateTo(e.detail.value));
}

/**
 * Navega a una vista, opcionalmente con un parámetro dinámico.
 * @param {string} view
 * @param {string} [param='']
 */
export function navigateTo(view, param = '') {
  const hash = param ? `#/${view}/${param}` : `#/${view}`;
  window.location.hash = hash;
}

/**
 * Resuelve la ruta actual y ejecuta el renderer correspondiente.
 */
export function onRouteChange() {
  const { view, param } = getRoute();
  let routeKey;
  // Selecciona la subruta correcta para demos de Ionic y JavaScript.
  if (view === 'ionic' && param) routeKey = 'ionic-component';
  else if (view === 'js' && param)  routeKey = 'js-component';
  else                              routeKey = view;
  const renderer = _routes[routeKey] || renderNotFound;
  updateTopNav(view);
  renderer(param);
}

/**
 * Interpreta el hash actual y extrae vista y parámetro.
 * @returns {{view: string, param: string}}
 */
export function getRoute() {
  const raw = window.location.hash.replace('#/', '');
  const [view = 'home', param = ''] = raw.split('/');
  return { view, param };
}

/**
 * Sincroniza el estado del menú superior con la vista activa.
 * @param {string} view
 */
function updateTopNav(view) {
  const value = ['home', 'js', 'ionic', 'docs'].includes(view) ? view : 'home';
  _topNav.value = value;
}
