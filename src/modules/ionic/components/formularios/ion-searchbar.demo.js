/**
 * @file ion-searchbar.demo.js
 * @description Demo didáctico del componente <ion-searchbar> de Ionic.
 *
 * ion-searchbar es una barra de búsqueda especializada con icono, botón
 * de limpiar y gestión de foco. Emite ionInput en cada pulsación e
 * ionClear al borrar. Ideal para filtrar listas en tiempo real.
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/searchbar
 */

const CODE_EXAMPLE = `<!-- Searchbar básica -->
<ion-searchbar placeholder="Buscar…"></ion-searchbar>

<!-- Con debounce (espera antes de emitir) -->
<ion-searchbar debounce="300" placeholder="Buscar con debounce…"></ion-searchbar>

<!-- Sin botón de limpiar -->
<ion-searchbar show-clear-button="never"></ion-searchbar>

<!-- Con icono personalizado -->
<ion-searchbar search-icon="filter-outline"></ion-searchbar>

<!-- Cancelar en iOS-style -->
<ion-searchbar show-cancel-button="focus"
               cancel-button-text="Cancelar">
</ion-searchbar>

<!-- Animada (search-icon aparece al enfocar) -->
<ion-searchbar animated="true"></ion-searchbar>

<script>
  const sb = document.querySelector('ion-searchbar');

  // ionInput: se dispara en cada cambio de valor
  sb.addEventListener('ionInput', (e) => {
    const query = e.detail.value;
    filterList(query);
  });

  // ionClear: al pulsar el botón X
  sb.addEventListener('ionClear', () => {
    filterList('');
  });

  function filterList(query) {
    const items = document.querySelectorAll('.list-item');
    items.forEach(item => {
      const match = item.textContent.toLowerCase().includes(query.toLowerCase());
      item.style.display = match ? '' : 'none';
    });
  }
</script>`;

const COUNTRIES = [
  'Alemania', 'Argentina', 'Australia', 'Austria', 'Bélgica', 'Bolivia',
  'Brasil', 'Canadá', 'Chile', 'China', 'Colombia', 'Corea del Sur',
  'Costa Rica', 'Cuba', 'Dinamarca', 'Ecuador', 'Egipto', 'España',
  'Estados Unidos', 'Filipinas', 'Finlandia', 'Francia', 'Grecia',
  'Guatemala', 'India', 'Indonesia', 'Irlanda', 'Israel', 'Italia',
  'Japón', 'México', 'Noruega', 'Nueva Zelanda', 'Países Bajos',
  'Panamá', 'Paraguay', 'Perú', 'Polonia', 'Portugal', 'Puerto Rico',
  'Reino Unido', 'República Dominicana', 'Rusia', 'Suecia', 'Suiza',
  'Turquía', 'Uruguay', 'Venezuela',
];

export function render() {
  const countryItems = COUNTRIES.map(c => `
    <div class="demo-sb-item" data-name="${c.toLowerCase()}">
      <ion-icon name="flag-outline" style="flex-shrink:0;opacity:.5"></ion-icon>
      <span>${c}</span>
    </div>`).join('');

  return `
    <section class="demo-page">

      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-searchbar</h2>
        <p class="demo-desc">
          Barra de búsqueda con icono, limpieza integrada y soporte de
          <code>debounce</code>. Emite <code>ionInput</code> en cada
          pulsación e <code>ionClear</code> al borrar.
        </p>
      </div>

      <!-- ── GRUPO: Anatomía visual ─────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Anatomía del componente</h3>
        <div class="demo-sb-anatomy">
          <div class="demo-sb-wrap demo-sb-wrap--focused">
            <ion-icon name="search-outline" class="demo-sb-icon"></ion-icon>
            <span class="demo-sb-placeholder">Buscar…</span>
            <ion-icon name="close-circle" class="demo-sb-clear-icon"></ion-icon>
          </div>
          <div class="demo-sb-anatomy-labels">
            <span>← search-icon</span>
            <span>input</span>
            <span>clear-button →</span>
          </div>
        </div>
      </div>

      <!-- ── GRUPO: Variantes visuales ─────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Variantes</h3>

        <p class="demo-group-desc" style="margin-bottom:6px">Básica</p>
        <div class="demo-sb-wrap" id="sb-basic-wrap">
          <ion-icon name="search-outline" class="demo-sb-icon"></ion-icon>
          <input type="text" class="demo-sb-input" id="sb-basic"
                 placeholder="Buscar…">
          <button class="demo-sb-clear" id="sb-basic-clear" style="display:none">
            <ion-icon name="close-circle"></ion-icon>
          </button>
        </div>

        <p class="demo-group-desc" style="margin-top:12px;margin-bottom:6px">Con icono personalizado</p>
        <div class="demo-sb-wrap">
          <ion-icon name="filter-outline" class="demo-sb-icon"></ion-icon>
          <input type="text" class="demo-sb-input" placeholder="Filtrar resultados…">
        </div>

        <p class="demo-group-desc" style="margin-top:12px;margin-bottom:6px">Botón Cancelar (iOS)</p>
        <div class="demo-sb-ios-row">
          <div class="demo-sb-wrap demo-sb-ios" id="sb-ios-wrap">
            <ion-icon name="search-outline" class="demo-sb-icon"></ion-icon>
            <input type="text" class="demo-sb-input" id="sb-ios-input"
                   placeholder="Buscar…">
          </div>
          <button class="demo-sb-cancel" id="sb-cancel" style="display:none">Cancelar</button>
        </div>
      </div>

      <!-- ── GRUPO: Filtro en tiempo real ──────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Filtro en tiempo real — ionInput</h3>
        <p class="demo-group-desc">
          Cada pulsación llama al filtro. Prueba a escribir el nombre
          de un país. La búsqueda es insensible a mayúsculas.
        </p>
        <div class="demo-sb-wrap" id="sb-filter-wrap">
          <ion-icon name="search-outline" class="demo-sb-icon"></ion-icon>
          <input type="text" class="demo-sb-input" id="sb-filter"
                 placeholder="Buscar país…">
          <button class="demo-sb-clear" id="sb-filter-clear" style="display:none">
            <ion-icon name="close-circle"></ion-icon>
          </button>
        </div>
        <div class="demo-sb-count" id="sb-count">${COUNTRIES.length} países</div>
        <div class="demo-sb-results" id="sb-list">
          ${countryItems}
        </div>
      </div>

      <!-- ── GRUPO: Atributos clave ─────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Atributos clave</h3>
        <div class="demo-attr-table">
          <div class="demo-attr-row"><code>debounce</code><span>Milisegundos de espera antes de emitir <code>ionInput</code>. Por defecto <code>250</code>.</span></div>
          <div class="demo-attr-row"><code>show-clear-button</code><span><code>always</code> · <code>focus</code> (defecto) · <code>never</code></span></div>
          <div class="demo-attr-row"><code>show-cancel-button</code><span><code>never</code> (defecto) · <code>focus</code> · <code>always</code></span></div>
          <div class="demo-attr-row"><code>animated</code><span>El icono de búsqueda aparece con animación al enfocar.</span></div>
          <div class="demo-attr-row"><code>search-icon</code><span>Nombre de ion-icon a mostrar. Por defecto <code>search-outline</code>.</span></div>
          <div class="demo-attr-row"><code>ionInput</code><span>Cada cambio de texto. <code>e.detail.value</code> es el texto actual.</span></div>
          <div class="demo-attr-row"><code>ionClear</code><span>Al pulsar el botón de limpiar. Ideal para resetear filtros.</span></div>
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
  // ── Searchbar básica con botón clear ───────────────────────
  setupClear(container, '#sb-basic', '#sb-basic-clear');

  // ── iOS cancelar ───────────────────────────────────────────
  const iosInput  = container.querySelector('#sb-ios-input');
  const iosCancel = container.querySelector('#sb-cancel');
  iosInput.addEventListener('focus', () => { iosCancel.style.display = ''; });
  iosCancel.addEventListener('click', () => {
    iosInput.value = '';
    iosInput.blur();
    iosCancel.style.display = 'none';
  });

  // ── Filtro en tiempo real ──────────────────────────────────
  const sbFilter = container.querySelector('#sb-filter');
  const sbClear  = container.querySelector('#sb-filter-clear');
  const sbList   = container.querySelector('#sb-list');
  const sbCount  = container.querySelector('#sb-count');
  const items    = sbList.querySelectorAll('.demo-sb-item');

  function filter(query) {
    const q = query.toLowerCase().trim();
    let visible = 0;
    items.forEach(item => {
      const match = item.dataset.name.includes(q);
      item.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    sbCount.textContent = q
      ? `${visible} resultado${visible !== 1 ? 's' : ''} para "${query}"`
      : `${COUNTRIES.length} países`;
    sbClear.style.display = query ? '' : 'none';
  }

  sbFilter.addEventListener('input', (e) => filter(e.target.value));
  sbClear.addEventListener('click', () => {
    sbFilter.value = '';
    filter('');
    sbFilter.focus();
  });
}

/** Conecta el botón clear de una searchbar simulada. */
function setupClear(container, inputSel, clearSel) {
  const input = container.querySelector(inputSel);
  const clear = container.querySelector(clearSel);
  if (!input || !clear) return;
  input.addEventListener('input', () => {
    clear.style.display = input.value ? '' : 'none';
  });
  clear.addEventListener('click', () => {
    input.value = '';
    clear.style.display = 'none';
    input.focus();
  });
}

const COUNTRIES_REF = COUNTRIES; // evitar re-declaration en init

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
