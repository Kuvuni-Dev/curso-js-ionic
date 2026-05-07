/**
 * @file ion-loading.demo.js
 * @description Demo didáctico de <ion-loading>.
 */

const CODE_EXAMPLE = `const loading = await loadingController.create({
  message: 'Sincronizando datos...',
  spinner: 'crescent',
  backdropDismiss: false
});
await loading.present();

await fetchData();
await loading.dismiss();`;

export function render() {
  return `
    <section class="demo-page">
      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-loading</h2>
        <p class="demo-desc">
          <code>ion-loading</code> bloquea temporalmente la interfaz mientras
          se completa una tarea asíncrona.
        </p>
      </div>

      <div class="demo-group">
        <h3 class="demo-group-title">Demo interactivo: overlay de carga</h3>
        <ion-button id="loading-open-btn">
          <ion-icon slot="start" name="cloud-upload-outline"></ion-icon>
          Simular carga
        </ion-button>

        <div class="demo-load-overlay" id="loading-overlay" hidden>
          <div class="demo-load-card">
            <div class="demo-load-spinner"></div>
            <strong>Sincronizando...</strong>
            <p id="loading-step">Iniciando proceso</p>
          </div>
        </div>

        <div class="demo-nav-log" id="loading-log">Pulsa el botón para simular <code>loading.present()</code></div>
      </div>

      <div class="demo-group">
        <h3 class="demo-group-title">Opciones frecuentes</h3>
        <div class="demo-attr-table">
          <div class="demo-attr-row"><code>message</code><span>Texto informativo para el usuario.</span></div>
          <div class="demo-attr-row"><code>spinner</code><span>Tipo de spinner visual.</span></div>
          <div class="demo-attr-row"><code>duration</code><span>Cierre automático tras X ms (opcional).</span></div>
          <div class="demo-attr-row"><code>backdropDismiss</code><span>Si <code>false</code>, evita cerrar tocando fuera.</span></div>
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
  const openBtn = container.querySelector('#loading-open-btn');
  const overlay = container.querySelector('#loading-overlay');
  const step = container.querySelector('#loading-step');
  const log = container.querySelector('#loading-log');

  const steps = ['Validando sesión', 'Subiendo archivos', 'Actualizando índices', 'Finalizando'];

  openBtn?.addEventListener('click', () => {
    overlay.hidden = false;
    openBtn.disabled = true;
    log.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon> Evento simulado: <code>loading.present()</code>';

    let i = 0;
    const timer = setInterval(() => {
      if (i < steps.length) {
        step.textContent = steps[i];
        i++;
        return;
      }

      clearInterval(timer);
      overlay.hidden = true;
      openBtn.disabled = false;
      log.innerHTML = '<ion-icon name="checkmark-circle-outline"></ion-icon> Evento simulado: <code>loading.dismiss()</code>';
    }, 650);
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
