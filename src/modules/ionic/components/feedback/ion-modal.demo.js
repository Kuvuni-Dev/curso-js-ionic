/**
 * @file ion-modal.demo.js
 * @description Demo didáctico de <ion-modal> y <ion-popover>.
 */

const CODE_EXAMPLE = `// Modal
const modal = await modalController.create({
  component: UserProfilePage,
  breakpoints: [0, 0.5, 1],
  initialBreakpoint: 0.5
});
await modal.present();

// Popover
const popover = await popoverController.create({
  component: QuickActions,
  event,
  translucent: true
});
await popover.present();`;

export function render() {
  return `
    <section class="demo-page">
      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-modal</h2>
        <p class="demo-desc">
          <code>ion-modal</code> y <code>ion-popover</code> son overlays para
          contenido secundario. Modal para tareas amplias; popover para acciones breves.
        </p>
      </div>

      <div class="demo-group">
        <h3 class="demo-group-title">Demo interactivo: modal y popover</h3>
        <div class="demo-fb-trigger-row">
          <ion-button id="open-modal-btn"><ion-icon slot="start" name="browsers-outline"></ion-icon>Abrir modal</ion-button>
          <ion-button id="open-pop-btn" fill="outline"><ion-icon slot="start" name="chatbox-outline"></ion-icon>Abrir popover</ion-button>
        </div>

        <div class="demo-modal-overlay" id="modal-overlay" hidden>
          <div class="demo-modal-card">
            <div class="demo-modal-head">
              <strong>Editar perfil</strong>
              <button id="modal-close-btn" aria-label="Cerrar">x</button>
            </div>
            <p>Contenido del modal: formulario, detalles o flujo multi-paso.</p>
            <ion-button size="small" id="modal-save-btn">Guardar</ion-button>
          </div>
        </div>

        <div class="demo-popover" id="popover" hidden>
          <button data-pop-action="duplicar">Duplicar</button>
          <button data-pop-action="compartir">Compartir</button>
          <button data-pop-action="archivar">Archivar</button>
        </div>

        <div class="demo-nav-log" id="modal-log">Prueba los botones para disparar overlays simulados</div>
      </div>

      <div class="demo-group">
        <h3 class="demo-group-title">Diferencias rápidas</h3>
        <div class="demo-attr-table">
          <div class="demo-attr-row"><code>ion-modal</code><span>Overlay grande, bloquea foco y centra contenido principal.</span></div>
          <div class="demo-attr-row"><code>ion-popover</code><span>Overlay pequeño anclado a un trigger/evento.</span></div>
          <div class="demo-attr-row"><code>breakpoints</code><span>Alturas intermedias para modals tipo sheet.</span></div>
          <div class="demo-attr-row"><code>dismissOnSelect</code><span>En popover, cierra al elegir opción.</span></div>
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
  const openModalBtn = container.querySelector('#open-modal-btn');
  const openPopBtn = container.querySelector('#open-pop-btn');
  const modalOverlay = container.querySelector('#modal-overlay');
  const closeModalBtn = container.querySelector('#modal-close-btn');
  const saveBtn = container.querySelector('#modal-save-btn');
  const popover = container.querySelector('#popover');
  const log = container.querySelector('#modal-log');

  const closeModal = (role) => {
    modalOverlay.hidden = true;
    log.innerHTML = `<ion-icon name="close-circle-outline"></ion-icon> Evento simulado: <code>modal.dismiss()</code> (${role})`;
  };

  openModalBtn?.addEventListener('click', () => {
    modalOverlay.hidden = false;
    popover.hidden = true;
    log.innerHTML = '<ion-icon name="open-outline"></ion-icon> Evento simulado: <code>modal.present()</code>';
  });

  closeModalBtn?.addEventListener('click', () => closeModal('close-btn'));
  saveBtn?.addEventListener('click', () => closeModal('save'));

  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal('backdrop');
  });

  openPopBtn?.addEventListener('click', () => {
    const rect = openPopBtn.getBoundingClientRect();
    popover.style.top = `${Math.round(rect.bottom + window.scrollY + 8)}px`;
    popover.style.left = `${Math.round(rect.left + window.scrollX)}px`;
    popover.hidden = false;
    modalOverlay.hidden = true;
    log.innerHTML = '<ion-icon name="chatbox-outline"></ion-icon> Evento simulado: <code>popover.present()</code>';
  });

  popover?.querySelectorAll('[data-pop-action]').forEach((el) => {
    el.addEventListener('click', () => {
      const action = el.getAttribute('data-pop-action') || 'acción';
      popover.hidden = true;
      log.innerHTML = `<ion-icon name="checkmark-outline"></ion-icon> Popover acción: <code>${action}</code> + <code>popover.dismiss()</code>`;
    });
  });

  document.addEventListener('click', (e) => {
    if (popover.hidden) return;
    if (e.target === openPopBtn || popover.contains(e.target)) return;
    popover.hidden = true;
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
