/**
 * @file ion-spinner.demo.js
 * @description Demo didáctico de <ion-spinner> y <ion-skeleton-text>.
 */

const CODE_EXAMPLE = `<!-- Spinner -->
<ion-spinner name="crescent"></ion-spinner>

<!-- Skeleton -->
<ion-item>
  <ion-avatar slot="start">
    <ion-skeleton-text animated="true"></ion-skeleton-text>
  </ion-avatar>
  <ion-label>
    <h3><ion-skeleton-text animated="true" style="width:80%"></ion-skeleton-text></h3>
    <p><ion-skeleton-text animated="true" style="width:60%"></ion-skeleton-text></p>
  </ion-label>
</ion-item>`;

const SPINNER_TYPES = ['crescent', 'dots', 'circles', 'bubbles'];

export function render() {
  return `
    <section class="demo-page">
      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-spinner</h2>
        <p class="demo-desc">
          <code>ion-spinner</code> indica actividad en curso.
          <code>ion-skeleton-text</code> da contexto visual mientras carga el contenido.
        </p>
      </div>

      <div class="demo-group">
        <h3 class="demo-group-title">Demo interactivo: loading state completo</h3>
        <div class="demo-fb-trigger-row">
          <ion-button size="small" id="spin-start-btn">Iniciar carga</ion-button>
          <ion-button size="small" fill="outline" id="spin-reset-btn">Reset</ion-button>
        </div>

        <div class="demo-spin-types">
          ${SPINNER_TYPES.map((t) => `<span class="demo-spin-chip">${t}</span>`).join('')}
        </div>

        <div class="demo-skel-list" id="skel-list">
          ${Array.from({ length: 4 }).map(() => `
            <div class="demo-skel-item">
              <div class="demo-skel-avatar"></div>
              <div class="demo-skel-lines">
                <div class="demo-skel-line demo-skel-line--lg"></div>
                <div class="demo-skel-line demo-skel-line--sm"></div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="demo-spin-done" id="spin-done" hidden>
          <ion-icon name="checkmark-done-outline"></ion-icon>
          Contenido cargado. Oculta skeleton y spinner.
        </div>

        <div class="demo-nav-log" id="spin-log">Inicia la carga para alternar estados</div>
      </div>

      <div class="demo-group">
        <h3 class="demo-group-title">Consejos de UX</h3>
        <div class="demo-attr-table">
          <div class="demo-attr-row"><code>Spinner para espera corta</code><span>Ideal en operaciones de 300ms a 2s.</span></div>
          <div class="demo-attr-row"><code>Skeleton para listas</code><span>Mejor percepción de rendimiento en carga de contenido.</span></div>
          <div class="demo-attr-row"><code>No bloquear en exceso</code><span>Combina estados locales en lugar de overlays globales cuando sea posible.</span></div>
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
  const startBtn = container.querySelector('#spin-start-btn');
  const resetBtn = container.querySelector('#spin-reset-btn');
  const skelList = container.querySelector('#skel-list');
  const done = container.querySelector('#spin-done');
  const log = container.querySelector('#spin-log');

  let busy = false;

  function setBusy(value) {
    busy = value;
    skelList.classList.toggle('demo-skel-list--busy', busy);
    done.hidden = busy;
    if (busy) {
      log.innerHTML = '<ion-icon name="sync-outline"></ion-icon> Estado: <code>loading=true</code> (spinner + skeleton visibles)';
    } else {
      log.innerHTML = '<ion-icon name="checkmark-circle-outline"></ion-icon> Estado: <code>loading=false</code> (contenido listo)';
    }
  }

  startBtn?.addEventListener('click', () => {
    if (busy) return;
    setBusy(true);
    startBtn.disabled = true;

    setTimeout(() => {
      setBusy(false);
      startBtn.disabled = false;
    }, 1800);
  });

  resetBtn?.addEventListener('click', () => {
    setBusy(true);
    startBtn.disabled = false;
  });

  setBusy(true);
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
