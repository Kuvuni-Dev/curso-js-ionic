/**
 * @file ion-toast.demo.js
 * @description Demo didáctico de <ion-toast>.
 */

const CODE_EXAMPLE = `const toast = await toastController.create({
  message: 'Guardado correctamente',
  duration: 1800,
  color: 'success',
  position: 'bottom',
  buttons: [{ text: 'Deshacer', role: 'cancel' }]
});
await toast.present();`;

const TOASTS = {
  success: { icon: 'checkmark-circle-outline', text: 'Cambios guardados', color: 'success' },
  warning: { icon: 'warning-outline', text: 'Conexión inestable', color: 'warning' },
  danger: { icon: 'alert-circle-outline', text: 'Error al sincronizar', color: 'danger' },
};

export function render() {
  return `
    <section class="demo-page">
      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-toast</h2>
        <p class="demo-desc">
          <code>ion-toast</code> muestra notificaciones cortas, no bloqueantes,
          con cierre automático y acciones opcionales.
        </p>
      </div>

      <div class="demo-group">
        <h3 class="demo-group-title">Demo interactivo: toasts por severidad</h3>
        <div class="demo-fb-trigger-row">
          <button class="demo-fb-trigger" data-toast="success"><ion-icon name="checkmark-outline"></ion-icon><span>Success</span></button>
          <button class="demo-fb-trigger" data-toast="warning"><ion-icon name="warning-outline"></ion-icon><span>Warning</span></button>
          <button class="demo-fb-trigger" data-toast="danger"><ion-icon name="close-outline"></ion-icon><span>Danger</span></button>
        </div>

        <div class="demo-toast-stack" id="toast-stack"></div>
        <div class="demo-nav-log" id="toast-log">Pulsa un botón para simular <code>toast.present()</code></div>
      </div>

      <div class="demo-group">
        <h3 class="demo-group-title">Propiedades clave</h3>
        <div class="demo-attr-table">
          <div class="demo-attr-row"><code>message</code><span>Texto principal del toast.</span></div>
          <div class="demo-attr-row"><code>duration</code><span>Tiempo de vida en ms antes de cerrarse.</span></div>
          <div class="demo-attr-row"><code>position</code><span><code>top</code>, <code>middle</code> o <code>bottom</code>.</span></div>
          <div class="demo-attr-row"><code>buttons</code><span>Acciones rápidas como "Deshacer".</span></div>
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
  const stack = container.querySelector('#toast-stack');
  const log = container.querySelector('#toast-log');

  function pushToast(kind) {
    const data = TOASTS[kind];
    if (!data) return;

    const el = document.createElement('div');
    el.className = `demo-toast demo-toast--${data.color}`;
    el.innerHTML = `
      <ion-icon name="${data.icon}"></ion-icon>
      <span>${data.text}</span>
      <button data-close>OK</button>
    `;

    stack.prepend(el);
    log.innerHTML = `<ion-icon name="notifications-outline"></ion-icon> Evento simulado: <code>toast.present()</code> (${kind})`;

    const remove = () => {
      el.classList.add('demo-toast--out');
      setTimeout(() => el.remove(), 180);
    };

    el.querySelector('[data-close]')?.addEventListener('click', remove);
    setTimeout(remove, 1800);
  }

  container.querySelectorAll('[data-toast]').forEach((btn) => {
    btn.addEventListener('click', () => pushToast(btn.getAttribute('data-toast')));
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
