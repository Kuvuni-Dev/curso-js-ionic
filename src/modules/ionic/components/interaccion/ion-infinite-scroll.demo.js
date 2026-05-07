/**
 * @file ion-infinite-scroll.demo.js
 * @description Demo didáctico del componente <ion-infinite-scroll> de Ionic.
 *
 * ion-infinite-scroll detecta cuando el usuario llega al final de una lista
 * y dispara el evento ionInfinite para cargar más contenido.
 * Debe llamarse a event.target.complete() cuando los datos están listos.
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/infinite-scroll
 */

const CODE_EXAMPLE = `<!-- Se coloca al final de ion-content o de la lista -->
<ion-content>
  <ion-list id="my-list">
    <!-- ítems cargados -->
  </ion-list>

  <ion-infinite-scroll>
    <ion-infinite-scroll-content
      loading-spinner="bubbles"
      loading-text="Cargando más…">
    </ion-infinite-scroll-content>
  </ion-infinite-scroll>
</ion-content>

<script>
  const infiniteScroll = document.querySelector('ion-infinite-scroll');

  infiniteScroll.addEventListener('ionInfinite', async (e) => {
    // Simular llamada a API
    const newItems = await fetchMoreItems();

    // Añadir ítems a la lista
    newItems.forEach(item => {
      const el = document.createElement('ion-item');
      el.textContent = item.name;
      document.querySelector('#my-list').appendChild(el);
    });

    // SIEMPRE llamar a complete() para ocultar el spinner
    e.target.complete();

    // Deshabilitar si no hay más datos
    if (allDataLoaded) {
      e.target.disabled = true;
    }
  });
</script>`;

// Banco de datos simulado
const ALL_PRODUCTS = Array.from({ length: 80 }, (_, i) => ({
  id:       i + 1,
  name:     ['Framework', 'Librería', 'Plugin', 'Componente', 'Servicio', 'API', 'SDK', 'Módulo'][i % 8]
            + ' ' + String.fromCharCode(65 + (i % 26)),
  category: ['Frontend', 'Backend', 'Mobile', 'DevOps', 'Testing'][i % 5],
  stars:    Math.floor(Math.random() * 5) + 1,
  new:      i % 7 === 0,
}));

const CATEGORY_COLOR = {
  Frontend: '#7B61FF', Backend: '#22C55E', Mobile: '#3B82F6',
  DevOps: '#F59E0B', Testing: '#EC4899',
};

const PAGE_SIZE = 10;

function productCard(item) {
  const stars = '★'.repeat(item.stars) + '☆'.repeat(5 - item.stars);
  return `
  <div class="demo-inf-card">
    <div class="demo-inf-card-header">
      <span class="demo-inf-cat-badge" style="background:${CATEGORY_COLOR[item.category]}20;color:${CATEGORY_COLOR[item.category]};border-color:${CATEGORY_COLOR[item.category]}40">
        ${item.category}
      </span>
      ${item.new ? '<span class="demo-inf-new-badge">NEW</span>' : ''}
      <span class="demo-inf-id">#${String(item.id).padStart(3, '0')}</span>
    </div>
    <div class="demo-inf-card-body">
      <strong>${item.name}</strong>
      <span class="demo-inf-stars">${stars}</span>
    </div>
  </div>`;
}

export function render() {
  const firstPage = ALL_PRODUCTS.slice(0, PAGE_SIZE);

  return `
    <section class="demo-page">

      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-infinite-scroll</h2>
        <p class="demo-desc">
          Carga más contenido automáticamente al llegar al final de la lista.
          Emite <code>ionInfinite</code> y requiere llamar a
          <code>event.target.complete()</code> tras insertar los datos.
        </p>
      </div>

      <!-- ── GRUPO: Flujo del componente ───────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Flujo del componente</h3>
        <div class="demo-inf-flow">
          <div class="demo-inf-flow-step">
            <ion-icon name="finger-print-outline" class="demo-inf-flow-icon"></ion-icon>
            <span>Usuario llega al final</span>
          </div>
          <ion-icon name="arrow-forward-outline" class="demo-inf-flow-arrow"></ion-icon>
          <div class="demo-inf-flow-step">
            <ion-icon name="flash-outline" class="demo-inf-flow-icon"></ion-icon>
            <span><code>ionInfinite</code> se dispara</span>
          </div>
          <ion-icon name="arrow-forward-outline" class="demo-inf-flow-arrow"></ion-icon>
          <div class="demo-inf-flow-step">
            <ion-icon name="cloud-download-outline" class="demo-inf-flow-icon"></ion-icon>
            <span>Petición a API</span>
          </div>
          <ion-icon name="arrow-forward-outline" class="demo-inf-flow-arrow"></ion-icon>
          <div class="demo-inf-flow-step">
            <ion-icon name="checkmark-circle-outline" class="demo-inf-flow-icon demo-inf-flow-icon--success"></ion-icon>
            <span><code>complete()</code> llamado</span>
          </div>
        </div>
      </div>

      <!-- ── GRUPO: Demo interactivo ────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Demo interactivo — Catálogo con infinite scroll</h3>
        <p class="demo-group-desc">
          Carga ${PAGE_SIZE} elementos por página. Haz scroll en la lista o
          pulsa el botón para cargar más (simula el evento <code>ionInfinite</code>).
        </p>

        <!-- Barra de estado -->
        <div class="demo-inf-statusbar">
          <span id="inf-count">${PAGE_SIZE}</span> de ${ALL_PRODUCTS.length} productos cargados
          <ion-badge color="primary" id="inf-page-badge">Página 1</ion-badge>
        </div>

        <!-- Lista scrollable -->
        <div class="demo-inf-scroll-area" id="inf-scroll-area">
          <div class="demo-inf-grid" id="inf-grid">
            ${firstPage.map(productCard).join('')}
          </div>

          <!-- Spinner de carga -->
          <div class="demo-inf-spinner" id="inf-spinner" style="display:none">
            <div class="demo-inf-dots">
              <span></span><span></span><span></span>
            </div>
            <span>Cargando más productos…</span>
          </div>

          <!-- Fin de lista -->
          <div class="demo-inf-end" id="inf-end" style="display:none">
            <ion-icon name="checkmark-done-outline"></ion-icon>
            Has cargado todos los productos
          </div>
        </div>

        <!-- Botón manual para simular scroll -->
        <ion-button size="small" fill="outline" id="inf-load-btn">
          <ion-icon slot="start" name="add-circle-outline"></ion-icon>
          Cargar más (ionInfinite)
        </ion-button>
        <ion-button size="small" fill="clear" color="medium" id="inf-reset-btn">
          <ion-icon slot="start" name="refresh-outline"></ion-icon>
          Resetear
        </ion-button>
      </div>

      <!-- ── GRUPO: Atributos clave ─────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Atributos clave</h3>
        <div class="demo-attr-table">
          <div class="demo-attr-row">
            <code>threshold</code>
            <span>Distancia del final para disparar el evento. Por defecto: <code>"15%"</code>. También acepta píxeles: <code>"100px"</code>.</span>
          </div>
          <div class="demo-attr-row">
            <code>position</code>
            <span><code>bottom</code> (defecto) o <code>top</code>. Útil para chats con scroll inverso.</span>
          </div>
          <div class="demo-attr-row">
            <code>disabled</code>
            <span>Deshabilita el componente cuando no hay más datos que cargar.</span>
          </div>
          <div class="demo-attr-row">
            <code>event.target.complete()</code>
            <span>Debe llamarse tras insertar los datos para ocultar el spinner y permitir nuevos eventos.</span>
          </div>
          <div class="demo-attr-row">
            <code>loading-spinner</code>
            <span>Tipo de spinner: <code>bubbles</code> · <code>circles</code> · <code>crescent</code> · <code>dots</code> · etc.</span>
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
  let currentPage = 1;
  let loading     = false;

  const grid     = container.querySelector('#inf-grid');
  const spinner  = container.querySelector('#inf-spinner');
  const endMsg   = container.querySelector('#inf-end');
  const countEl  = container.querySelector('#inf-count');
  const pageEl   = container.querySelector('#inf-page-badge');
  const loadBtn  = container.querySelector('#inf-load-btn');
  const resetBtn = container.querySelector('#inf-reset-btn');
  const area     = container.querySelector('#inf-scroll-area');

  function loadMore() {
    if (loading) return;
    const start = currentPage * PAGE_SIZE;
    if (start >= ALL_PRODUCTS.length) return;

    loading = true;
    spinner.style.display = '';
    loadBtn.disabled = true;

    // Simula latencia de API (800 ms)
    setTimeout(() => {
      const nextPage = ALL_PRODUCTS.slice(start, start + PAGE_SIZE);
      nextPage.forEach(item => {
        const tmp = document.createElement('div');
        tmp.innerHTML = productCard(item).trim();
        grid.appendChild(tmp.firstChild);
      });

      currentPage++;
      const loaded = Math.min(currentPage * PAGE_SIZE, ALL_PRODUCTS.length);
      countEl.textContent = loaded;
      pageEl.textContent  = `Página ${currentPage}`;

      spinner.style.display = 'none';
      loading = false;

      if (loaded >= ALL_PRODUCTS.length) {
        endMsg.style.display  = '';
        loadBtn.disabled = true;
      } else {
        loadBtn.disabled = false;
      }
    }, 800);
  }

  // Scroll dentro del área
  area.addEventListener('scroll', () => {
    if (loading) return;
    const { scrollTop, scrollHeight, clientHeight } = area;
    if (scrollTop + clientHeight >= scrollHeight - 40) {
      loadMore();
    }
  });

  loadBtn.addEventListener('click', loadMore);

  resetBtn.addEventListener('click', () => {
    currentPage = 1;
    loading     = false;
    grid.innerHTML   = ALL_PRODUCTS.slice(0, PAGE_SIZE).map(productCard).join('');
    countEl.textContent = PAGE_SIZE;
    pageEl.textContent  = 'Página 1';
    endMsg.style.display   = 'none';
    spinner.style.display  = 'none';
    loadBtn.disabled = false;
    area.scrollTop = 0;
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
