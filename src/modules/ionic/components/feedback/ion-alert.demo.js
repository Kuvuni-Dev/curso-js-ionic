/**
 * @file ion-alert.demo.js
 * @description Demo didáctico de <ion-alert>.
 */

const CODE_EXAMPLE = `const alert = await alertController.create({
  header: 'Eliminar tarea',
  message: 'Esta acción no se puede deshacer.',
  buttons: [
    { text: 'Cancelar', role: 'cancel' },
    { text: 'Eliminar', role: 'destructive', handler: () => removeTask() }
  ]
});
await alert.present();`;

const ALERT_TYPES = {
  info: {
    title: 'Sesión expira pronto',
    message: 'Tu sesión expirará en 2 minutos.',
    color: 'primary',
    icon: 'information-circle-outline',
    actions: ['Cerrar', 'Extender sesión'],
  },
  confirm: {
    title: 'Publicar cambios',
    message: 'Se guardará una nueva versión para los estudiantes.',
    color: 'success',
    icon: 'checkmark-circle-outline',
    actions: ['Cancelar', 'Publicar'],
  },
  danger: {
    title: 'Eliminar módulo',
    message: 'No podrás recuperar este módulo después.',
    color: 'danger',
    icon: 'warning-outline',
    actions: ['Cancelar', 'Eliminar'],
  },
};

function renderAlertCard(type) {
  return `
    <button class="demo-fb-trigger" data-alert="${type}">
      <ion-icon name="${ALERT_TYPES[type].icon}"></ion-icon>
      <span>${type.toUpperCase()}</span>
    </button>
  `;
}

export function render() {
  return `
    <section class="demo-page">
      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-alert</h2>
        <p class="demo-desc">
          <code>ion-alert</code> es un diálogo modal ligero para confirmar acciones,
          mostrar avisos o recoger decisiones rápidas.
        </p>
      </div>

      <div class="demo-group">
        <h3 class="demo-group-title">Demo interactivo: variantes de alerta</h3>
        <div class="demo-fb-trigger-row">
          ${Object.keys(ALERT_TYPES).map(renderAlertCard).join('')}
        </div>

        <div class="demo-alert-overlay" id="alert-overlay" hidden>
          <div class="demo-alert-card" id="alert-card">
            <div class="demo-alert-head" id="alert-head">
              <ion-icon id="alert-icon" name="information-circle-outline"></ion-icon>
              <strong id="alert-title">Título</strong>
            </div>
            <p id="alert-message">Mensaje</p>
            <div class="demo-alert-actions" id="alert-actions"></div>
          </div>
        </div>

        <div class="demo-nav-log" id="alert-log">
          Pulsa un botón para simular <code>alert.present()</code>
        </div>
      </div>

      <div class="demo-group">
        <h3 class="demo-group-title">Atributos y opciones clave</h3>
        <div class="demo-attr-table">
          <div class="demo-attr-row"><code>header / subHeader / message</code><span>Contenido textual del cuadro.</span></div>
          <div class="demo-attr-row"><code>buttons</code><span>Botones con texto, rol y callback <code>handler</code>.</span></div>
          <div class="demo-attr-row"><code>backdropDismiss</code><span>Permite o bloquea cierre al tocar fuera.</span></div>
          <div class="demo-attr-row"><code>inputs</code><span>Campos para alertas tipo prompt/radio/checkbox.</span></div>
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
  const overlay = container.querySelector('#alert-overlay');
  const head = container.querySelector('#alert-head');
  const icon = container.querySelector('#alert-icon');
  const title = container.querySelector('#alert-title');
  const msg = container.querySelector('#alert-message');
  const actions = container.querySelector('#alert-actions');
  const log = container.querySelector('#alert-log');

  function closeAlert(role) {
    overlay.hidden = true;
    log.innerHTML = `<ion-icon name="close-circle-outline"></ion-icon> Evento simulado: <code>onDidDismiss</code> (role: ${role})`;
  }

  container.querySelectorAll('[data-alert]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-alert');
      const data = ALERT_TYPES[type];
      if (!data) return;

      head.className = `demo-alert-head demo-alert-head--${data.color}`;
      icon.name = data.icon;
      title.textContent = data.title;
      msg.textContent = data.message;
      actions.innerHTML = data.actions
        .map((a, i) => `<button class="demo-alert-btn${i === data.actions.length - 1 ? ' demo-alert-btn--main' : ''}" data-role="${a}">${a}</button>`)
        .join('');

      overlay.hidden = false;
      log.innerHTML = `<ion-icon name="open-outline"></ion-icon> Evento simulado: <code>alert.present()</code> (${type})`;

      actions.querySelectorAll('[data-role]').forEach((b) => {
        b.addEventListener('click', () => closeAlert(b.getAttribute('data-role') || 'dismiss'));
      });
    });
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeAlert('backdrop');
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
