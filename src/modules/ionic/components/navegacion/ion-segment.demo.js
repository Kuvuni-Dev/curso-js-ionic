/**
 * @file ion-segment.demo.js
 * @description Demo didáctico de <ion-segment> e <ion-segment-button>.
 */

const CODE_EXAMPLE = `<ion-segment value="mensual" (ionChange)="onSegmentChange($event)">
  <ion-segment-button value="mensual">
    <ion-label>Mensual</ion-label>
  </ion-segment-button>
  <ion-segment-button value="anual">
    <ion-label>Anual</ion-label>
  </ion-segment-button>
</ion-segment>

<script>
  function onSegmentChange(ev) {
    console.log('Nuevo valor:', ev.detail.value);
  }
</script>`;

const SEGMENTS = [
  {
    value: 'resumen',
    label: 'Resumen',
    icon: 'bar-chart-outline',
    title: 'Vista de resumen',
    text: 'Muestra métricas principales en una sola pantalla para lectura rápida.',
  },
  {
    value: 'detalle',
    label: 'Detalle',
    icon: 'list-outline',
    title: 'Vista detallada',
    text: 'Incluye desgloses por sección, tablas y estado de cada item.',
  },
  {
    value: 'historial',
    label: 'Historial',
    icon: 'time-outline',
    title: 'Línea temporal',
    text: 'Ideal para auditoría de cambios y seguimiento de actividad reciente.',
  },
];

function segmentBtn(item, active) {
  return `
    <button class="demo-seg-btn${active ? ' demo-seg-btn--active' : ''}" data-seg="${item.value}">
      <ion-icon name="${item.icon}"></ion-icon>
      <span>${item.label}</span>
    </button>
  `;
}

export function render() {
  const active = SEGMENTS[0];

  return `
    <section class="demo-page">
      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-segment</h2>
        <p class="demo-desc">
          <code>ion-segment</code> permite alternar entre vistas cercanas
          sin cambiar de ruta. Cada opción vive en
          <code>ion-segment-button</code>.
        </p>
      </div>

      <div class="demo-group">
        <h3 class="demo-group-title">Cuándo usarlo</h3>
        <div class="demo-attr-table">
          <div class="demo-attr-row">
            <code>Mismo contexto</code>
            <span>Para cambiar entre sub-vistas de una misma pantalla.</span>
          </div>
          <div class="demo-attr-row">
            <code>Pocas opciones</code>
            <span>Recomendado entre 2 y 5 botones para no saturar.</span>
          </div>
          <div class="demo-attr-row">
            <code>value + ionChange</code>
            <span>Controla el estado con <code>value</code> y escucha <code>ionChange</code>.</span>
          </div>
        </div>
      </div>

      <div class="demo-group">
        <h3 class="demo-group-title">Demo interactivo: panel segmentado</h3>
        <div class="demo-seg-wrap">
          <div class="demo-seg" id="seg-control">
            ${SEGMENTS.map((s, i) => segmentBtn(s, i === 0)).join('')}
          </div>

          <div class="demo-seg-panel" id="seg-panel">
            <h4 id="seg-title">${active.title}</h4>
            <p id="seg-text">${active.text}</p>
          </div>
        </div>

        <div class="demo-nav-log" id="seg-log">
          Evento simulado: ionChange -> resumen
        </div>
      </div>

      <div class="demo-group">
        <h3 class="demo-group-title">Código de ejemplo</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_EXAMPLE)}</code></pre>
      </div>
    </section>
  `;
}

export function init(container) {
  let current = SEGMENTS[0].value;
  const panel = container.querySelector('#seg-panel');
  const title = container.querySelector('#seg-title');
  const text = container.querySelector('#seg-text');
  const log = container.querySelector('#seg-log');

  container.querySelectorAll('[data-seg]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = btn.getAttribute('data-seg');
      if (!next || next === current) return;

      current = next;
      const segment = SEGMENTS.find((s) => s.value === next);
      if (!segment) return;

      container.querySelectorAll('[data-seg]').forEach((b) => b.classList.remove('demo-seg-btn--active'));
      btn.classList.add('demo-seg-btn--active');

      panel.classList.add('demo-nav-fade');
      setTimeout(() => {
        title.textContent = segment.title;
        text.textContent = segment.text;
        panel.classList.remove('demo-nav-fade');
      }, 120);

      log.innerHTML = `<ion-icon name="git-commit-outline"></ion-icon> Evento simulado: <code>ionChange</code> -> ${segment.value}`;
    });
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
