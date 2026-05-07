/**
 * @file ion-picker.demo.js
 * @description Demo didáctico del componente <ion-picker> de Ionic.
 *
 * ion-picker es una rueda/tambor de selección estilo nativo iOS/Android.
 * Se crea programáticamente en JavaScript, definiendo columnas con opciones.
 * Puede tener múltiples columnas dependientes o independientes.
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/picker
 */

const CODE_EXAMPLE = `<!-- ion-picker se crea con JavaScript (no como etiqueta HTML) -->

<ion-button id="open-picker">Abrir Picker</ion-button>

<script>
  const openBtn = document.querySelector('#open-picker');

  openBtn.addEventListener('click', async () => {
    // Crear el picker
    const picker = document.createElement('ion-picker');
    document.body.appendChild(picker);

    // Definir columnas
    picker.columns = [
      {
        name: 'animal',
        options: [
          { text: 'Gato',   value: 'cat'  },
          { text: 'Perro',  value: 'dog'  },
          { text: 'Pájaro', value: 'bird' },
        ],
      },
    ];

    // Definir botones
    picker.buttons = [
      { text: 'Cancelar', role: 'cancel' },
      {
        text: 'Confirmar',
        handler: (value) => {
          // value = { animal: { text: 'Gato', value: 'cat' } }
          console.log('Seleccionado:', value.animal.value);
        },
      },
    ];

    await picker.present();
  });
</script>

<!-- Picker con múltiples columnas -->
<script>
  picker.columns = [
    {
      name: 'hour',
      options: Array.from({ length: 24 }, (_, i) => ({
        text:  String(i).padStart(2, '0'),
        value: i,
      })),
    },
    {
      name: 'minute',
      options: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(m => ({
        text:  String(m).padStart(2, '0'),
        value: m,
      })),
    },
  ];
</script>`;

const HOURS   = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const MINUTES = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
const MONTHS_SHORT = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const DAYS    = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
const YEARS   = Array.from({ length: 10 }, (_, i) => String(2020 + i));

/**
 * Genera una columna de picker simulada.
 * @param {string} id
 * @param {string[]} items
 * @param {number} initialIndex
 */
function pickerCol(id, items, initialIndex = 0) {
  return `
    <div class="demo-pkr-col-wrap">
      <button class="demo-pkr-btn" data-col="${id}" data-dir="-1">
        <ion-icon name="chevron-up-outline"></ion-icon>
      </button>
      <div class="demo-pkr-window">
        <div class="demo-pkr-highlight"></div>
        <div class="demo-pkr-strip" id="pkr-strip-${id}">
          ${items.map((item, i) =>
            `<div class="demo-pkr-item${i === initialIndex ? ' demo-pkr-item--selected' : ''}"
                  data-index="${i}">${item}</div>`
          ).join('')}
        </div>
      </div>
      <button class="demo-pkr-btn" data-col="${id}" data-dir="1">
        <ion-icon name="chevron-down-outline"></ion-icon>
      </button>
    </div>`;
}

export function render() {
  return `
    <section class="demo-page">

      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-picker</h2>
        <p class="demo-desc">
          Rueda de selección estilo nativo iOS/Android. Se crea
          programáticamente con columnas y botones.
          Ideal para valores discretos: horas, meses, años, tallas, etc.
        </p>
      </div>

      <!-- ── GRUPO: Selector de hora ────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Picker — Hora (2 columnas)</h3>
        <p class="demo-group-desc">
          Usa los botones arriba/abajo para cambiar el valor de cada columna,
          igual que en el picker nativo de iOS/Android.
        </p>
        <div class="demo-pkr" id="pkr-time">
          ${pickerCol('h', HOURS, 10)}
          <span class="demo-pkr-sep">:</span>
          ${pickerCol('m', MINUTES, 0)}
        </div>
        <div class="demo-sel-feedback" id="pkr-time-feedback">
          value = <strong id="pkr-time-val">{ hour: "10", minute: "00" }</strong>
        </div>
      </div>

      <!-- ── GRUPO: Selector de fecha ──────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Picker — Fecha (3 columnas)</h3>
        <div class="demo-pkr" id="pkr-date">
          ${pickerCol('day',   DAYS,         14)}
          ${pickerCol('month', MONTHS_SHORT,  4)}
          ${pickerCol('year',  YEARS,         5)}
        </div>
        <div class="demo-sel-feedback" id="pkr-date-feedback">
          value = <strong id="pkr-date-val">{ day: "15", month: "May", year: "2025" }</strong>
        </div>
      </div>

      <!-- ── GRUPO: Cómo funciona ──────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Cómo funciona</h3>
        <div class="demo-attr-table">
          <div class="demo-attr-row">
            <code>columns</code>
            <span>Array de objetos con <code>name</code> y <code>options[]</code>. Cada opción tiene <code>text</code> y <code>value</code>.</span>
          </div>
          <div class="demo-attr-row">
            <code>buttons</code>
            <span>Array de botones. El handler del botón "confirmar" recibe un objeto con la selección de cada columna.</span>
          </div>
          <div class="demo-attr-row">
            <code>picker.present()</code>
            <span>Muestra el picker (retorna una Promise). Se llama tras configurar <code>columns</code> y <code>buttons</code>.</span>
          </div>
          <div class="demo-attr-row">
            <code>handler(value)</code>
            <span>El argumento <code>value</code> es un objeto: <code>{ nombreColumna: { text, value } }</code>.</span>
          </div>
        </div>
      </div>

      <!-- ── CÓDIGO ─────────────────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Código de ejemplo</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_EXAMPLE)}</code></pre>
      </div>

    </section>
  `;
}

export function init(container) {
  // Estado de cada columna
  const state = {
    h:     { items: HOURS,         index: 10 },
    m:     { items: MINUTES,       index: 0  },
    day:   { items: DAYS,          index: 14 },
    month: { items: MONTHS_SHORT,  index: 4  },
    year:  { items: YEARS,         index: 5  },
  };

  function updateCol(colId) {
    const s     = state[colId];
    const strip = container.querySelector(`#pkr-strip-${colId}`);
    strip.querySelectorAll('.demo-pkr-item').forEach((item, i) => {
      item.classList.toggle('demo-pkr-item--selected', i === s.index);
    });
  }

  function updateFeedback() {
    const h = state.h.items[state.h.index];
    const m = state.m.items[state.m.index];
    container.querySelector('#pkr-time-val').textContent =
      `{ hour: "${h}", minute: "${m}" }`;

    const d  = state.day.items[state.day.index];
    const mo = state.month.items[state.month.index];
    const y  = state.year.items[state.year.index];
    container.querySelector('#pkr-date-val').textContent =
      `{ day: "${d}", month: "${mo}", year: "${y}" }`;
  }

  // Delegación de eventos en todos los botones del picker
  ['pkr-time', 'pkr-date'].forEach(wrapperId => {
    const wrapper = container.querySelector(`#${wrapperId}`);
    wrapper.addEventListener('click', (e) => {
      const btn = e.target.closest('.demo-pkr-btn');
      if (!btn) return;
      const colId = btn.dataset.col;
      const dir   = parseInt(btn.dataset.dir);
      const s     = state[colId];
      s.index = (s.index + dir + s.items.length) % s.items.length;
      updateCol(colId);
      updateFeedback();
    });
  });

  updateFeedback();
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
