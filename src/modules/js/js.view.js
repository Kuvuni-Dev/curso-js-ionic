/**
 * @file js.view.js
 * @description Catálogo de temas de JavaScript por niveles.
 *
 * Muestra una lista de temas agrupados por nivel. Al pulsar uno,
 * navega a #/js/:id y carga su demo individual.
 */

import { appRoot } from '../../shared/dom.js';
import { navigateTo } from '../../app/router.js';

/**
 * Catálogo de temas agrupado por categorías.
 * Cada categoría tiene: label, folder, color, icon, topics[].
 * Cada topic tiene: id, label, icon, description.
 */
const CATEGORIES = [
  {
    label: 'JS Basico',
    folder: 'basico',
    color: 'primary',
    icon: 'school-outline',
    topics: [
      { id: 'arrow-functions', label: 'Arrow functions',           icon: 'trending-up-outline',      description: 'Sintaxis concisa, this léxico y cuándo NO usarlas.' },
      { id: 'array-methods',   label: 'Array methods',             icon: 'list-outline',             description: 'map, filter, reduce, find y otros métodos clave para colecciones.' },
      { id: 'destructuring',   label: 'Destructuring',             icon: 'cut-outline',              description: 'Extraer valores de objetos y arrays con sintaxis clara.' },
      { id: 'spread-rest',     label: 'Spread y Rest',             icon: 'expand-outline',           description: 'Operador ... para combinar, clonar y recoger argumentos.' },
      { id: 'promises',        label: 'Promises',                  icon: 'checkmark-circle-outline', description: 'Asincronía basada en estados y encadenamiento.' },
      { id: 'async-await',     label: 'Async / Await',             icon: 'hourglass-outline',        description: 'Sintaxis más legible para flujo asíncrono con try/catch.' },
      { id: 'clases',          label: 'Clases y herencia',         icon: 'library-outline',          description: 'Introducción a class, constructor, extends y super.' },
      { id: 'hoisting',        label: 'Hoisting y TDZ',            icon: 'arrow-up-outline',         description: 'Comportamiento de declaración y zona muerta temporal.' },
    ],
  },
  {
    label: 'JS Avanzado',
    folder: 'avanzado',
    color: 'tertiary',
    icon: 'rocket-outline',
    topics: [
      { id: 'event-loop',        label: 'Event loop y call stack',      icon: 'refresh-circle-outline',  description: 'Call stack, task queue y microtask queue del runtime.' },
      { id: 'fetch-api',         label: 'Fetch API',                     icon: 'cloud-download-outline',   description: 'Peticiones HTTP con control de respuesta y errores.' },
      { id: 'optional-chaining', label: 'Optional chaining y ??',        icon: 'help-circle-outline',      description: 'Acceso seguro a propiedades y valores por defecto.' },
      { id: 'map-set',           label: 'Map y Set',                     icon: 'albums-outline',           description: 'Estructuras avanzadas para colecciones eficientes.' },
      { id: 'higher-order',      label: 'Funciones de orden superior',   icon: 'layers-outline',           description: 'Funciones que reciben o retornan otras funciones.' },
      { id: 'generators',        label: 'Generators e Iterators',        icon: 'repeat-outline',           description: 'Funciones pausables con yield e iteración custom.' },
      { id: 'currying',          label: 'Currying y composición',        icon: 'link-outline',             description: 'Transformación funcional para crear APIs expresivas.' },
      { id: 'closure',           label: 'Closures y scope léxico',       icon: 'lock-closed-outline',      description: 'Funciones que conservan su entorno de definición.' },
      { id: 'this-context',      label: 'El valor de this',              icon: 'locate-outline',           description: 'Binding implícito, explícito y comportamiento en arrow.' },
      { id: 'prototype',         label: 'Cadena de prototipos',          icon: 'git-merge-outline',        description: 'Herencia prototipal y delegación de propiedades.' },
      { id: 'regex',             label: 'Expresiones regulares',         icon: 'search-outline',           description: 'Patrones para búsqueda, validación y transformación.' },
      { id: 'es-modules',        label: 'import / export',               icon: 'share-outline',            description: 'Modularización con ES Modules y alcance por archivo.' },
      { id: 'dynamic-import',    label: 'import() dinámico',             icon: 'cloud-outline',            description: 'Carga diferida de módulos en tiempo de ejecución.' },
      { id: 'module-patterns',   label: 'Patrones de módulo',            icon: 'archive-outline',          description: 'IIFE y Revealing Module Pattern como base histórica.' },
      { id: 'privados',          label: 'Encapsulación con #',           icon: 'shield-checkmark-outline', description: 'Campos y métodos privados en clases modernas.' },
      { id: 'mixins',            label: 'Mixins y composición',          icon: 'swap-horizontal-outline',  description: 'Reutilización de comportamiento sin herencia rígida.' },
      { id: 'patron-singleton',  label: 'Patrón Singleton',              icon: 'radio-button-on-outline',  description: 'Una sola instancia compartida con acceso controlado.' },
      { id: 'patron-observer',   label: 'Patrón Observer',               icon: 'notifications-outline',    description: 'Suscripción y notificación desacoplada entre módulos.' },
      { id: 'patron-factory',    label: 'Patrón Factory',                icon: 'hammer-outline',           description: 'Creación de objetos sin exponer su construcción interna.' },
    ],
  },
];

/**
 * Renderiza el catálogo de temas JS agrupado por categorías.
 */
export function renderJsSection() {
  const categoriesHtml = CATEGORIES.map((cat) => {
    const itemsHtml = cat.topics.map((t) => {
      const hasDemo = t.id !== null;
      return `
        <ion-item
          ${hasDemo ? `button="true" detail="true" data-topic-id="${t.id}"` : ''}
          ${hasDemo ? '' : 'disabled="true"'}
        >
          <ion-icon slot="start" name="${t.icon}" color="${hasDemo ? cat.color : 'medium'}"></ion-icon>
          <ion-label>
            <h3>${t.label}</h3>
            <p>${t.description}</p>
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
      <h2>JavaScript</h2>
      <p style="margin-bottom:20px;">
        Selecciona un tema por nivel para ver su explicación interactiva y ejemplos de código en vivo.
      </p>
      ${categoriesHtml}
    </section>
  `;

  appRoot.querySelectorAll('[data-topic-id]').forEach((el) => {
    el.addEventListener('click', () => {
      navigateTo('js', el.getAttribute('data-topic-id'));
    });
  });
}

/**
 * Mapa topicId → carpeta de categoría.
 * Se construye dinámicamente para no duplicar información.
 */
const TOPIC_FOLDER = (() => {
  const map = {};
  for (const cat of CATEGORIES) {
    for (const t of cat.topics) {
      if (t.id && !map[t.id]) map[t.id] = cat.folder;
    }
  }
  return map;
})();

/**
 * Carga y renderiza el demo de un tema JS específico.
 * Importa dinámicamente el archivo *.demo.js de su subcarpeta.
 *
 * @param {string} topicId - El id del tema (ej: 'closure')
 */
export async function renderJsComponent(topicId) {
  appRoot.innerHTML = `<section class="page"><ion-spinner name="crescent"></ion-spinner></section>`;

  try {
    const folder = TOPIC_FOLDER[topicId];
    if (!folder) throw new Error(`Carpeta desconocida para: ${topicId}`);

    const module = await import(`./components/${folder}/${topicId}.demo.js`);
    appRoot.innerHTML = module.render();
    module.init(appRoot);
  } catch {
    appRoot.innerHTML = `
      <section class="page">
        <ion-button fill="clear" onclick="location.hash='#/js'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          JavaScript
        </ion-button>
        <p><ion-text color="danger">Tema no encontrado: <code>${topicId}</code></ion-text></p>
      </section>
    `;
  }
}
