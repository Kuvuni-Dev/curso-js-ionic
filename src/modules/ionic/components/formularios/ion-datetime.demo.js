/**
 * @file ion-datetime.demo.js
 * @description Demo didáctico de <ion-datetime> e <ion-datetime-button> de Ionic.
 *
 * ion-datetime es un selector de fecha y hora con formato nativo de iOS/Android.
 * Puede presentarse inline, en un modal o en un popover, activado con
 * ion-datetime-button. Admite rango de fechas, múltiples fechas y formato ISO 8601.
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/datetime
 * https://ionicframework.com/docs/api/datetime-button
 */

const CODE_EXAMPLE = `<!-- Datetime inline (presentación directa) -->
<ion-datetime presentation="date"></ion-datetime>

<!-- Solo tiempo -->
<ion-datetime presentation="time"></ion-datetime>

<!-- Con fecha inicial -->
<ion-datetime value="2025-06-15" presentation="date"></ion-datetime>

<!-- Con rango min/max -->
<ion-datetime
  min="2024-01-01"
  max="2026-12-31"
  presentation="date">
</ion-datetime>

<!-- Multiple (varias fechas) -->
<ion-datetime multiple="true" presentation="date"></ion-datetime>

<!-- ion-datetime-button abre el datetime en un modal -->
<ion-datetime-button datetime="dt1"></ion-datetime-button>
<ion-modal [keepContentsMounted]="true">
  <ng-template>
    <ion-datetime id="dt1"></ion-datetime>
  </ng-template>
</ion-modal>

<script>
  const dt = document.querySelector('ion-datetime');

  // ionChange se dispara al confirmar la selección
  dt.addEventListener('ionChange', (e) => {
    // Valor en formato ISO 8601: "2025-06-15T00:00:00.000Z"
    console.log('Fecha:', e.detail.value);
  });
</script>`;

const MONTHS = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
];
const WEEKDAYS = ['Lu','Ma','Mi','Ju','Vi','Sá','Do'];

/**
 * Genera la cuadrícula de días para un mes/año dado.
 */
function buildCalendar(year, month, selected) {
  // getDay() → 0=Dom, queremos 0=Lun → offset
  const firstDow = new Date(year, month, 1).getDay(); // 0=Dom
  const offset   = (firstDow + 6) % 7;               // 0=Lun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  let cells = '';
  for (let i = 0; i < offset; i++) {
    cells += '<span class="demo-cal-day demo-cal-day--empty"></span>';
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = today.getFullYear() === year &&
                    today.getMonth()    === month &&
                    today.getDate()     === d;
    const isSel   = selected &&
                    selected.y === year &&
                    selected.m === month &&
                    selected.d === d;
    const cls = [
      'demo-cal-day',
      isToday ? 'demo-cal-day--today'    : '',
      isSel   ? 'demo-cal-day--selected' : '',
    ].join(' ');
    cells += `<button class="${cls}" data-day="${d}">${d}</button>`;
  }
  return cells;
}

export function render() {
  const now = new Date();
  const y   = now.getFullYear();
  const m   = now.getMonth();

  const weekdayHeaders = WEEKDAYS.map(d => `<span class="demo-cal-wday">${d}</span>`).join('');

  return `
    <section class="demo-page">

      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-datetime / ion-datetime-button</h2>
        <p class="demo-desc">
          Selector de fecha y hora con formato nativo iOS/Android. Puede presentarse
          inline o en un <em>modal/popover</em> activado por
          <code>ion-datetime-button</code>. Emite <code>ionChange</code>
          con valor ISO 8601.
        </p>
      </div>

      <!-- ── GRUPO: Calendario interactivo ─────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Presentación inline (<code>presentation="date"</code>)</h3>
        <p class="demo-group-desc">
          Navega entre meses con las flechas y selecciona un día.
          <code>ionChange</code> devuelve la fecha en ISO 8601.
        </p>
        <div class="demo-cal" id="demo-cal">
          <div class="demo-cal-hdr">
            <button class="demo-cal-nav" id="cal-prev">
              <ion-icon name="chevron-back-outline"></ion-icon>
            </button>
            <span class="demo-cal-title" id="cal-title">${MONTHS[m]} ${y}</span>
            <button class="demo-cal-nav" id="cal-next">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </button>
          </div>
          <div class="demo-cal-weekdays">${weekdayHeaders}</div>
          <div class="demo-cal-grid" id="cal-grid">
            ${buildCalendar(y, m, null)}
          </div>
        </div>
        <div class="demo-sel-feedback" id="cal-feedback">
          Selecciona un día para ver el valor ISO 8601…
        </div>
      </div>

      <!-- ── GRUPO: Selector de hora ────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Presentación de hora (<code>presentation="time"</code>)</h3>
        <p class="demo-group-desc">
          En Ionic real el usuario gira una ruleta. Aquí lo simulamos
          con dos inputs numéricos.
        </p>
        <div class="demo-time-picker" id="time-picker">
          <div class="demo-time-col">
            <button class="demo-pkr-btn" data-target="tp-h" data-dir="-1">
              <ion-icon name="chevron-up-outline"></ion-icon>
            </button>
            <span class="demo-time-val" id="tp-h">10</span>
            <button class="demo-pkr-btn" data-target="tp-h" data-dir="1">
              <ion-icon name="chevron-down-outline"></ion-icon>
            </button>
          </div>
          <span class="demo-time-sep">:</span>
          <div class="demo-time-col">
            <button class="demo-pkr-btn" data-target="tp-m" data-dir="-1">
              <ion-icon name="chevron-up-outline"></ion-icon>
            </button>
            <span class="demo-time-val" id="tp-m">00</span>
            <button class="demo-pkr-btn" data-target="tp-m" data-dir="1">
              <ion-icon name="chevron-down-outline"></ion-icon>
            </button>
          </div>
        </div>
        <div class="demo-sel-feedback" id="time-feedback">
          Hora seleccionada: <strong id="time-iso">T10:00:00</strong>
        </div>
      </div>

      <!-- ── GRUPO: ion-datetime-button ────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">ion-datetime-button — Activar desde botón</h3>
        <p class="demo-group-desc">
          <code>ion-datetime-button</code> muestra la fecha y hora seleccionadas
          y abre el <code>ion-datetime</code> en un modal o popover al pulsarlo.
        </p>
        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
          <button class="demo-dt-btn" id="dt-btn-date">
            <ion-icon name="calendar-outline"></ion-icon>
            <span id="dt-btn-date-label">15 jun 2025</span>
          </button>
          <button class="demo-dt-btn" id="dt-btn-time">
            <ion-icon name="time-outline"></ion-icon>
            <span id="dt-btn-time-label">10:00</span>
          </button>
        </div>
        <p class="demo-group-desc" style="margin-top:8px">
          En Ionic real los botones anteriores abrirían un
          <code>ion-modal</code> con el <code>ion-datetime</code> dentro.
          <code>ion-datetime-button</code> gestiona esta conexión
          automáticamente vía el atributo <code>datetime="id"</code>.
        </p>
        <pre class="demo-code" style="margin-top:8px"><code>${escapeHtml(
`<ion-datetime-button datetime="my-dt"></ion-datetime-button>

<ion-modal [keepContentsMounted]="true">
  <ng-template>
    <ion-datetime id="my-dt" value="2025-06-15T10:00:00">
      <ion-buttons slot="buttons">
        <ion-button (click)="modal.dismiss()">Cancelar</ion-button>
        <ion-button (click)="confirm()">Confirmar</ion-button>
      </ion-buttons>
    </ion-datetime>
  </ng-template>
</ion-modal>`)}</code></pre>
      </div>

      <!-- ── GRUPO: Atributos clave ─────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Atributos clave</h3>
        <div class="demo-attr-table">
          <div class="demo-attr-row"><code>presentation</code><span><code>date</code> · <code>time</code> · <code>date-time</code> · <code>month</code> · <code>year</code> · <code>month-year</code></span></div>
          <div class="demo-attr-row"><code>value</code><span>Fecha/hora en formato ISO 8601. Ej: <code>"2025-06-15T10:30:00"</code>.</span></div>
          <div class="demo-attr-row"><code>min / max</code><span>Límites de selección en ISO 8601.</span></div>
          <div class="demo-attr-row"><code>multiple</code><span>Permite seleccionar varias fechas. El valor es un array ISO.</span></div>
          <div class="demo-attr-row"><code>first-day-of-week</code><span><code>0</code> = Domingo (defecto), <code>1</code> = Lunes.</span></div>
          <div class="demo-attr-row"><code>ionChange</code><span>Valor ISO 8601 al confirmar. Ej: <code>"2025-06-15T00:00:00.000Z"</code>.</span></div>
          <div class="demo-attr-row"><code>ion-datetime-button[datetime]</code><span>ID del <code>ion-datetime</code> que debe controlar.</span></div>
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
  // ── Calendario ─────────────────────────────────────────────
  const now = new Date();
  let calYear  = now.getFullYear();
  let calMonth = now.getMonth();
  let selected = null;

  function refreshCal() {
    const grid  = container.querySelector('#cal-grid');
    const title = container.querySelector('#cal-title');
    grid.innerHTML  = buildCalendar(calYear, calMonth, selected);
    title.textContent = `${MONTHS[calMonth]} ${calYear}`;

    grid.querySelectorAll('.demo-cal-day[data-day]').forEach(btn => {
      btn.addEventListener('click', () => {
        selected = { y: calYear, m: calMonth, d: parseInt(btn.dataset.day) };
        const iso = `${selected.y}-${String(selected.m + 1).padStart(2, '0')}-${String(selected.d).padStart(2, '0')}T00:00:00.000Z`;
        container.querySelector('#cal-feedback').innerHTML =
          `ionChange → e.detail.value = <strong>"${iso}"</strong>`;
        refreshCal();
      });
    });
  }

  container.querySelector('#cal-prev').addEventListener('click', () => {
    calMonth--;
    if (calMonth < 0) { calMonth = 11; calYear--; }
    refreshCal();
  });
  container.querySelector('#cal-next').addEventListener('click', () => {
    calMonth++;
    if (calMonth > 11) { calMonth = 0; calYear++; }
    refreshCal();
  });
  refreshCal();

  // ── Selector de hora ───────────────────────────────────────
  let tpHour = 10, tpMin = 0;

  function updateTime() {
    container.querySelector('#tp-h').textContent = String(tpHour).padStart(2, '0');
    container.querySelector('#tp-m').textContent = String(tpMin).padStart(2, '0');
    const iso = `T${String(tpHour).padStart(2, '0')}:${String(tpMin).padStart(2, '0')}:00`;
    container.querySelector('#time-iso').textContent = iso;
    container.querySelector('#dt-btn-time-label').textContent =
      `${String(tpHour).padStart(2, '0')}:${String(tpMin).padStart(2, '0')}`;
  }

  container.querySelector('#time-picker').addEventListener('click', (e) => {
    const btn = e.target.closest('.demo-pkr-btn');
    if (!btn) return;
    const dir    = parseInt(btn.dataset.dir);
    const target = btn.dataset.target;
    if (target === 'tp-h') {
      tpHour = (tpHour + dir + 24) % 24;
    } else {
      tpMin = (tpMin + dir * 5 + 60) % 60;
    }
    updateTime();
  });
  updateTime();
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
