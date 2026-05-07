/**
 * @file ion-breadcrumbs.demo.js
 * @description Demo didactico de <ion-breadcrumbs> e <ion-breadcrumb>.
 */

const CODE_EXAMPLE = `<ion-breadcrumbs max-items="4" items-before-collapse="1" items-after-collapse="2">
  <ion-breadcrumb href="/home">Inicio</ion-breadcrumb>
  <ion-breadcrumb href="/cursos">Cursos</ion-breadcrumb>
  <ion-breadcrumb href="/ionic">Ionic</ion-breadcrumb>
  <ion-breadcrumb href="/modulos">Modulo 4</ion-breadcrumb>
  <ion-breadcrumb active="true">Navegacion</ion-breadcrumb>
</ion-breadcrumbs>`;

const PATHS = {
  corto: ['Inicio', 'Cursos', 'Ionic'],
  medio: ['Inicio', 'Cursos', 'Ionic', 'Modulo 4', 'Navegacion'],
  largo: ['Inicio', 'Cursos', 'Ionic', 'Avanzado', 'Modulo 4', 'Semana 2', 'Navegacion'],
};

function crumb(item, index, total) {
  const isLast = index === total - 1;
  return `
    <button class="demo-crumb${isLast ? ' demo-crumb--active' : ''}" data-crumb="${index}">
      ${item}
    </button>
  `;
}

export function render() {
  const items = PATHS.medio;

  return `
    <section class="demo-page">
      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catalogo
        </ion-button>
        <h2>ion-breadcrumbs</h2>
        <p class="demo-desc">
          <code>ion-breadcrumbs</code> muestra la ruta jerarquica actual.
          Cada paso se representa con <code>ion-breadcrumb</code>.
        </p>
      </div>

      <div class="demo-group">
        <h3 class="demo-group-title">Demo interactivo: ruta y colapso</h3>
        <p class="demo-group-desc">
          Cambia la profundidad para simular como se colapsan rutas largas.
        </p>

        <div class="demo-bc-controls">
          <ion-button size="small" fill="outline" data-path="corto">Ruta corta</ion-button>
          <ion-button size="small" fill="outline" data-path="medio">Ruta media</ion-button>
          <ion-button size="small" fill="outline" data-path="largo">Ruta larga</ion-button>
        </div>

        <div class="demo-bc-wrap" id="bc-wrap">
          ${items.map((it, i) => crumb(it, i, items.length)).join('<span class="demo-bc-sep">/</span>')}
        </div>

        <div class="demo-bc-preview" id="bc-preview">
          <ion-icon name="document-text-outline"></ion-icon>
          Estas en: <strong>Navegacion</strong>
        </div>

        <div class="demo-nav-log" id="bc-log">
          Ruta activa: Inicio / Cursos / Ionic / Modulo 4 / Navegacion
        </div>
      </div>

      <div class="demo-group">
        <h3 class="demo-group-title">Atributos clave</h3>
        <div class="demo-attr-table">
          <div class="demo-attr-row">
            <code>max-items</code>
            <span>Numero maximo de migas visibles antes de colapsar.</span>
          </div>
          <div class="demo-attr-row">
            <code>items-before-collapse</code>
            <span>Cuantas migas mostrar al inicio cuando se colapsa.</span>
          </div>
          <div class="demo-attr-row">
            <code>items-after-collapse</code>
            <span>Cuantas migas mostrar al final cuando se colapsa.</span>
          </div>
          <div class="demo-attr-row">
            <code>active</code>
            <span>Marca la miga actual (normalmente la ultima).</span>
          </div>
        </div>
      </div>

      <div class="demo-group">
        <h3 class="demo-group-title">Codigo de ejemplo</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_EXAMPLE)}</code></pre>
      </div>
    </section>
  `;
}

export function init(container) {
  let currentPath = [...PATHS.medio];
  const wrap = container.querySelector('#bc-wrap');
  const log = container.querySelector('#bc-log');
  const preview = container.querySelector('#bc-preview');

  function collapsedPath(items) {
    if (items.length <= 5) return items;
    return [items[0], items[1], '...', items[items.length - 2], items[items.length - 1]];
  }

  function renderPath(items) {
    const visual = collapsedPath(items);
    wrap.innerHTML = visual
      .map((it, i) => {
        if (it === '...') return '<span class="demo-crumb demo-crumb--ellipsis">...</span>';
        const isLast = i === visual.length - 1;
        return `<button class="demo-crumb${isLast ? ' demo-crumb--active' : ''}" data-nav="${it}">${it}</button>`;
      })
      .join('<span class="demo-bc-sep">/</span>');

    const last = items[items.length - 1];
    preview.innerHTML = `<ion-icon name="document-text-outline"></ion-icon> Estas en: <strong>${last}</strong>`;
    log.textContent = `Ruta activa: ${items.join(' / ')}`;

    wrap.querySelectorAll('[data-nav]').forEach((el) => {
      el.addEventListener('click', () => {
        const label = el.getAttribute('data-nav');
        if (!label) return;
        log.innerHTML = `<ion-icon name="return-up-forward-outline"></ion-icon> Navegacion simulada a: <code>${label}</code>`;
      });
    });
  }

  container.querySelectorAll('[data-path]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-path');
      if (!key || !PATHS[key]) return;
      currentPath = [...PATHS[key]];
      renderPath(currentPath);
    });
  });

  renderPath(currentPath);
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
