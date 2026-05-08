/**
 * @file ion-range.demo.js
 * @description Demo didáctico del componente <ion-range> de Ionic.
 *
 * ion-range es un control deslizante. Soporta valor mínimo/máximo,
 * paso personalizado, pin con el valor, marcas (snaps), dual knob
 * (dos controles para seleccionar un rango) y etiquetas en los extremos.
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/range
 */

const CODE_EXAMPLE = `<!-- Range básico -->
<ion-item>
  <ion-range min="0" max="100" value="50"></ion-range>
</ion-item>

<!-- Con etiquetas en extremos (slot="start" / slot="end") -->
<ion-item>
  <ion-range min="0" max="100" value="60">
    <ion-icon slot="start" name="volume-low-outline"></ion-icon>
    <ion-icon slot="end"   name="volume-high-outline"></ion-icon>
  </ion-range>
</ion-item>

<!-- Con pin (muestra el valor mientras se arrastra) -->
<ion-item>
  <ion-range pin="true" min="0" max="100" value="40"></ion-range>
</ion-item>

<!-- Con snaps y ticks (saltos fijos) -->
<ion-item>
  <ion-range snaps="true" ticks="true" step="25" min="0" max="100" value="25"></ion-range>
</ion-item>

<!-- Dual knob (rango entre dos valores) -->
<ion-item>
  <ion-range dual-knobs="true" min="0" max="100"
             value='{"lower": 20, "upper": 80}'></ion-range>
</ion-item>

<script>
  const range = document.querySelector('ion-range');

  // ionChange: valor final al soltar el dedo
  range.addEventListener('ionChange', (e) => {
    console.log('Valor:', e.detail.value); // number o { lower, upper }
  });

  // ionInput: valor mientras se arrastra
  range.addEventListener('ionInput', (e) => {
    console.log('Arrastrando:', e.detail.value);
  });
</script>`;

/**
 * Construye una fila de range con track, fill y pin simulados.
 * @param {string} id
 * @param {number} min
 * @param {number} max
 * @param {number} value
 * @param {string} color - Ionic color token
 * @param {string} [startIcon] - nombre de ion-icon
 * @param {string} [endIcon]
 */
function rangeRow(id, min, max, value, color = 'primary', startIcon = '', endIcon = '') {
  const pct = ((value - min) / (max - min)) * 100;
  return `
    <div class="demo-rng-row">
      ${startIcon ? `<ion-icon name="${startIcon}" class="demo-rng-side-icon"></ion-icon>` : ''}
      <div class="demo-rng-wrap">
        <div class="demo-rng-track">
          <div class="demo-rng-fill demo-rng-fill--${color}" id="${id}-fill"
               style="width:${pct}%"></div>
          <div class="demo-rng-knob demo-rng-knob--${color}" id="${id}-knob"
               style="left:${pct}%"></div>
        </div>
        <input type="range" class="demo-rng-input" id="${id}"
               min="${min}" max="${max}" value="${value}"
               data-color="${color}">
      </div>
      ${endIcon ? `<ion-icon name="${endIcon}" class="demo-rng-side-icon"></ion-icon>` : ''}
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
        <h2>ion-range</h2>
        <p class="demo-desc">
          Control deslizante de valor numérico. Soporta <code>pin</code>,
          <code>snaps</code>, <code>dual-knobs</code> y etiquetas en extremos.
          Emite <code>ionInput</code> mientras se arrastra e
          <code>ionChange</code> al soltar.
        </p>
      </div>

      <!-- ── GRUPO: Colores ─────────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Colores y variantes</h3>
        <div class="demo-rng-list">
          ${rangeRow('rng-primary',   0, 100, 60,  'primary')}
          ${rangeRow('rng-secondary', 0, 100, 40,  'secondary')}
          ${rangeRow('rng-success',   0, 100, 75,  'success')}
          ${rangeRow('rng-danger',    0, 100, 30,  'danger')}
          ${rangeRow('rng-warning',   0, 100, 55,  'warning')}
        </div>
      </div>

      <!-- ── GRUPO: Con iconos ──────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Con iconos en extremos (<code>slot="start"</code> / <code>slot="end"</code>)</h3>
        <div class="demo-rng-list">
          ${rangeRow('rng-vol',    0, 100, 65, 'primary', 'volume-low-outline',    'volume-high-outline')}
          ${rangeRow('rng-bright', 0, 100, 45, 'warning', 'sunny-outline',         'sunny')}
          ${rangeRow('rng-font',   0, 100, 50, 'secondary', 'text-outline',        'reorder-two-outline')}
        </div>
      </div>

      <!-- ── GRUPO: Demo interactivo ────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Demo interactivo — Ecualizador</h3>
        <p class="demo-group-desc">
          Mueve las bandas. Cada <code>ionInput</code> actualiza el valor en
          tiempo real. El botón resetea todos los valores al centro.
        </p>
        <div class="demo-eq" id="eq-board">
          ${['60Hz','250Hz','1kHz','4kHz','16kHz'].map((band, i) => `
          <div class="demo-eq-band">
            <span class="demo-eq-val" id="eq-val-${i}">0</span>
            <div class="demo-rng-wrap demo-rng-wrap--vertical">
              <div class="demo-rng-track demo-rng-track--vertical">
                <div class="demo-rng-fill demo-rng-fill--primary demo-rng-fill--vertical"
                     id="eq-fill-${i}" style="height:50%"></div>
                <div class="demo-rng-knob demo-rng-knob--primary demo-rng-knob--vertical"
                     id="eq-knob-${i}" style="top:50%"></div>
              </div>
              <input type="range" class="demo-rng-input demo-rng-input--vertical demo-eq-rng"
                     id="eq-rng-${i}" min="-12" max="12" value="0" step="1"
                     data-band="${i}">
            </div>
            <span class="demo-eq-band-label">${band}</span>
          </div>`).join('')}
        </div>
        <ion-button size="small" fill="outline" id="eq-reset">
          <ion-icon slot="start" name="refresh-outline"></ion-icon>
          Reset
        </ion-button>
      </div>

      <!-- ── GRUPO: Dual knob ───────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Dual Knob (<code>dual-knobs="true"</code>)</h3>
        <p class="demo-group-desc">
          Permite seleccionar un rango entre dos valores.
          El evento devuelve <code>{ lower, upper }</code>.
        </p>
        <div class="demo-rng-dual-row">
          <div class="demo-rng-dual-track">
            <div class="demo-rng-dual-fill" id="dual-fill"></div>
            <div class="demo-rng-knob demo-rng-knob--primary" id="dual-knob-lo"></div>
            <div class="demo-rng-knob demo-rng-knob--secondary" id="dual-knob-hi"></div>
          </div>
          <input type="range" class="demo-rng-input demo-rng-dual-lo" id="dual-lo"
                 min="0" max="100" value="20">
          <input type="range" class="demo-rng-input demo-rng-dual-hi" id="dual-hi"
                 min="0" max="100" value="75">
        </div>
        <div class="demo-sel-feedback" id="dual-feedback">
          lower: <strong id="dual-lo-val">20</strong> —
          upper: <strong id="dual-hi-val">75</strong>
        </div>
      </div>

      <!-- ── GRUPO: Atributos clave ─────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Atributos clave</h3>
        <div class="demo-attr-table">
          <div class="demo-attr-row"><code>min / max</code><span>Límites del rango.</span></div>
          <div class="demo-attr-row"><code>step</code><span>Incremento por cada movimiento. Por defecto <code>1</code>.</span></div>
          <div class="demo-attr-row"><code>pin</code><span>Muestra el valor actual sobre el knob mientras se arrastra.</span></div>
          <div class="demo-attr-row"><code>snaps</code><span>El knob salta a posiciones definidas por <code>step</code>.</span></div>
          <div class="demo-attr-row"><code>ticks</code><span>Muestra marcas en las posiciones de snap.</span></div>
          <div class="demo-attr-row"><code>dual-knobs</code><span>Activa dos knobs. El valor devuelto es <code>{ lower, upper }</code>.</span></div>
          <div class="demo-attr-row"><code>ionInput</code><span>Se dispara en cada movimiento. <code>e.detail.value</code> = valor actual.</span></div>
          <div class="demo-attr-row"><code>ionChange</code><span>Se dispara al soltar el knob.</span></div>
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
  // ── Rangos básicos y con iconos ────────────────────────────
  const simpleRanges = container.querySelectorAll('.demo-rng-input:not(.demo-rng-input--vertical):not(.demo-rng-dual-lo):not(.demo-rng-dual-hi)');
  simpleRanges.forEach(input => {
    const id    = input.id;
    const fill  = container.querySelector(`#${id}-fill`);
    const knob  = container.querySelector(`#${id}-knob`);
    if (!fill || !knob) return;
    input.addEventListener('input', () => {
      const pct = ((input.value - input.min) / (input.max - input.min)) * 100;
      fill.style.width = pct + '%';
      knob.style.left  = pct + '%';
    });
  });

  // ── Ecualizador ────────────────────────────────────────────
  const eqRanges = container.querySelectorAll('.demo-eq-rng');
  eqRanges.forEach(input => {
    const i    = input.dataset.band;
    const fill = container.querySelector(`#eq-fill-${i}`);
    const knob = container.querySelector(`#eq-knob-${i}`);
    const val  = container.querySelector(`#eq-val-${i}`);

    const update = () => {
      const pct = ((input.value - input.min) / (input.max - input.min)) * 100;
      // vertical: fill parte del centro (50%) hacia el valor
      const center = 50;
      if (pct >= center) {
        fill.style.top    = center + '%';
        fill.style.height = (pct - center) + '%';
      } else {
        fill.style.top    = pct + '%';
        fill.style.height = (center - pct) + '%';
      }
      knob.style.top  = pct + '%';
      val.textContent = (input.value > 0 ? '+' : '') + input.value;
    };
    input.addEventListener('input', update);
    update();
  });

  container.querySelector('#eq-reset').addEventListener('click', () => {
    eqRanges.forEach(input => {
      input.value = 0;
      input.dispatchEvent(new Event('input'));
    });
  });

  // ── Dual knob ──────────────────────────────────────────────
  const dualLo    = container.querySelector('#dual-lo');
  const dualHi    = container.querySelector('#dual-hi');
  const dualFill  = container.querySelector('#dual-fill');
  const dualKnobLo = container.querySelector('#dual-knob-lo');
  const dualKnobHi = container.querySelector('#dual-knob-hi');
  const loVal     = container.querySelector('#dual-lo-val');
  const hiVal     = container.querySelector('#dual-hi-val');

  function updateDual() {
    let lo = parseFloat(dualLo.value);
    let hi = parseFloat(dualHi.value);
    if (lo > hi) { [lo, hi] = [hi, lo]; }
    const pctLo = lo;
    const pctHi = hi;
    dualFill.style.left  = pctLo + '%';
    dualFill.style.width = (pctHi - pctLo) + '%';
    dualKnobLo.style.left = pctLo + '%';
    dualKnobHi.style.left = pctHi + '%';
    loVal.textContent = Math.round(lo);
    hiVal.textContent = Math.round(hi);
  }
  dualLo.addEventListener('input', updateDual);
  dualHi.addEventListener('input', updateDual);
  updateDual();
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
