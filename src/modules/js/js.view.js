/**
 * @file js.view.js
 * @description Catálogo de temas de JavaScript avanzado.
 *
 * Muestra una lista de temas agrupados por categorías. Al pulsar uno,
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
    label: 'Fundamentos avanzados',
    folder: 'fundamentos',
    color: 'primary',
    icon: 'code-slash-outline',
    topics: [
      { id: 'closure',      label: 'Closures y scope léxico',   icon: 'lock-closed-outline',      description: 'Funciones que recuerdan su entorno léxico de creación.' },
      { id: 'prototype',    label: 'Cadena de prototipos',       icon: 'git-merge-outline',        description: 'Herencia basada en prototipos: [[Prototype]] y Object.create.' },
      { id: 'this-context', label: 'El valor de this',           icon: 'locate-outline',           description: 'Cómo varía this: global, método, arrow y binding explícito.' },
      { id: 'hoisting',     label: 'Hoisting y TDZ',             icon: 'arrow-up-outline',         description: 'Elevación de var, function, let/const y la zona muerta temporal.' },
    ],
  },
  {
    label: 'Funciones avanzadas',
    folder: 'funciones',
    color: 'secondary',
    icon: 'git-branch-outline',
    topics: [
      { id: 'arrow-functions', label: 'Arrow functions',              icon: 'trending-up-outline',   description: 'Sintaxis concisa, this léxico y cuándo NO usarlas.' },
      { id: 'higher-order',    label: 'Funciones de orden superior',  icon: 'layers-outline',        description: 'map, filter, reduce y funciones que reciben o devuelven funciones.' },
      { id: 'currying',        label: 'Currying y composición',       icon: 'link-outline',          description: 'Transformar funciones de n argumentos en cadenas de 1 argumento.' },
      { id: 'generators',      label: 'Generators e Iterators',       icon: 'repeat-outline',        description: 'Funciones pausables con yield e iteradores personalizados.' },
    ],
  },
  {
    label: 'Asincronía',
    folder: 'asincronia',
    color: 'tertiary',
    icon: 'timer-outline',
    topics: [
      { id: 'event-loop',  label: 'Event loop y call stack',  icon: 'refresh-circle-outline',   description: 'El motor de ejecución: call stack, task queue y microtask queue.' },
      { id: 'promises',    label: 'Promises',                 icon: 'checkmark-circle-outline',  description: 'Creación, encadenamiento y manejo de errores con Promises.' },
      { id: 'async-await', label: 'Async / Await',            icon: 'hourglass-outline',         description: 'Sintaxis síncrona para código asíncrono con try/catch.' },
      { id: 'fetch-api',   label: 'Fetch API',                icon: 'cloud-download-outline',    description: 'Peticiones HTTP nativas con fetch, manejo de JSON y errores.' },
    ],
  },
  {
    label: 'Datos modernos',
    folder: 'datos',
    color: 'success',
    icon: 'filter-outline',
    topics: [
      { id: 'destructuring',     label: 'Destructuring',              icon: 'cut-outline',           description: 'Extraer valores de objetos y arrays con sintaxis concisa.' },
      { id: 'spread-rest',       label: 'Spread y Rest',              icon: 'expand-outline',        description: 'Operadores ... para clonar, mezclar y recoger argumentos.' },
      { id: 'array-methods',     label: 'Array methods avanzados',    icon: 'list-outline',          description: 'flatMap, find, findIndex, some, every, at y más.' },
      { id: 'map-set',           label: 'Map y Set',                  icon: 'albums-outline',        description: 'Colecciones clave-valor y de valores únicos del estándar ES6.' },
      { id: 'optional-chaining', label: 'Optional chaining y ??',    icon: 'help-circle-outline',   description: 'Acceso seguro a propiedades anidadas y valores por defecto.' },
    ],
  },
  {
    label: 'Orientación a objetos',
    folder: 'oop',
    color: 'warning',
    icon: 'shapes-outline',
    topics: [
      { id: 'clases',   label: 'Clases y herencia',     icon: 'school-outline',           description: 'class, constructor, extends, super y polimorfismo.' },
      { id: 'privados', label: 'Encapsulación con #',   icon: 'shield-checkmark-outline', description: 'Campos y métodos privados con la sintaxis # de ES2022.' },
      { id: 'mixins',   label: 'Mixins y composición',  icon: 'swap-horizontal-outline',  description: 'Herencia múltiple funcional mediante composición de objetos.' },
   ],
  },
  {
    label: 'Módulos ES',
    folder: 'modulos',
    color: 'danger',
    icon: 'cube-outline',
    topics: [
      { id: 'es-modules',      label: 'import / export',       icon: 'share-outline',     description: 'Named y default exports, module scope e importaciones nombradas.' },
      { id: 'dynamic-import',  label: 'import() dinámico',     icon: 'cloud-outline',     description: 'Carga diferida de módulos con import() que devuelve una Promise.' },
      { id: 'module-patterns', label: 'Patrones de módulo',    icon: 'archive-outline',   description: 'IIFE y Revealing Module Pattern antes de los ES Modules.' },
    ],
  },
  {
    label: 'Patrones de diseño',
    folder: 'patrones',
    color: 'medium',
    icon: 'construct-outline',
    topics: [
      { id: 'patron-singleton', label: 'Singleton',  icon: 'radio-button-on-outline', description: 'Garantizar una única instancia global de un objeto.' },
      { id: 'patron-observer',  label: 'Observer',   icon: 'notifications-outline',   description: 'Suscripción y notificación entre objetos desacoplados.' },
      { id: 'patron-factory',   label: 'Factory',    icon: 'hammer-outline',          description: 'Creación de objetos sin exponer la lógica de construcción.' },
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
      <h2>JavaScript avanzado</h2>
      <p style="margin-bottom:20px;">
        Selecciona un tema para ver su explicación interactiva y ejemplos de código en vivo.
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
