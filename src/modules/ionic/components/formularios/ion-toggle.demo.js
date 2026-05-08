/**
 * @file ion-toggle.demo.js
 * @description Demo didáctico del componente <ion-toggle> de Ionic.
 *
 * ion-toggle es un interruptor de encendido/apagado (switch).
 * Emite el evento ionChange cuando cambia su estado.
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/toggle
 */

const CODE_EXAMPLE = `<!-- Toggle básico -->
<ion-item>
  <ion-label>Notificaciones</ion-label>
  <ion-toggle slot="end"></ion-toggle>
</ion-item>

<!-- Toggle activado por defecto -->
<ion-item>
  <ion-label>Wi-Fi</ion-label>
  <ion-toggle slot="end" checked="true"></ion-toggle>
</ion-item>

<!-- Con color personalizado -->
<ion-item>
  <ion-label>Modo especial</ion-label>
  <ion-toggle slot="end" color="secondary"></ion-toggle>
</ion-item>

<!-- Deshabilitado -->
<ion-item>
  <ion-label>Opción bloqueada</ion-label>
  <ion-toggle slot="end" disabled="true"></ion-toggle>
</ion-item>

<!-- Escuchar cambios desde JavaScript -->
<script>
  const toggle = document.querySelector('ion-toggle');

  // ionChange se dispara al cambiar el estado del toggle
  toggle.addEventListener('ionChange', (e) => {
    console.log('Estado:', e.detail.checked); // true | false
  });
</script>`;

/**
 * Genera el HTML completo del demo.
 * @returns {string} HTML listo para insertar con innerHTML.
 */
export function render() {
  return `
    <section class="demo-page">

      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-toggle</h2>
        <p class="demo-desc">
          Interruptor de encendido/apagado. Emite <code>ionChange</code>
          con <code>e.detail.checked</code> al cambiar su estado.
        </p>
      </div>

      <!-- ── GRUPO: Variantes básicas ───────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Variantes</h3>
        <ion-list inset="true">
          <ion-item>
            <ion-label>Desactivado (por defecto)</ion-label>
            <ion-toggle slot="end"></ion-toggle>
          </ion-item>
          <ion-item>
            <ion-label>Activado por defecto</ion-label>
            <ion-toggle slot="end" checked="true"></ion-toggle>
          </ion-item>
          <ion-item>
            <ion-label>Color secondary</ion-label>
            <ion-toggle slot="end" color="secondary" checked="true"></ion-toggle>
          </ion-item>
          <ion-item>
            <ion-label>Color success</ion-label>
            <ion-toggle slot="end" color="success" checked="true"></ion-toggle>
          </ion-item>
          <ion-item>
            <ion-label>Color danger</ion-label>
            <ion-toggle slot="end" color="danger" checked="true"></ion-toggle>
          </ion-item>
          <ion-item>
            <ion-label>Deshabilitado</ion-label>
            <ion-toggle slot="end" disabled="true"></ion-toggle>
          </ion-item>
        </ion-list>
      </div>

      <!-- ── GRUPO: Demo interactivo ────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Demo interactivo</h3>
        <p class="demo-group-desc">
          Cada toggle actualiza su estado en tiempo real usando el evento
          <code>ionChange</code>.
        </p>
        <ion-list inset="true">
          <ion-item>
            <ion-icon slot="start" name="notifications-outline" color="primary"></ion-icon>
            <ion-label>Notificaciones</ion-label>
            <ion-toggle slot="end" id="toggle-notif"></ion-toggle>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" name="moon-outline" color="tertiary"></ion-icon>
            <ion-label>Modo oscuro simulado</ion-label>
            <ion-toggle slot="end" id="toggle-dark"></ion-toggle>
          </ion-item>
        </ion-list>
        <div id="toggle-status" style="margin-top:10px;padding:10px;border-radius:8px;background:var(--app-surface);">
          <p>🔔 Notificaciones: <strong id="status-notif">desactivadas</strong></p>
          <p>🌙 Modo oscuro: <strong id="status-dark">desactivado</strong></p>
        </div>
      </div>

      <!-- ── BLOQUE DE CÓDIGO ───────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Código de ejemplo</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_EXAMPLE)}</code></pre>
      </div>

    </section>
  `;
}

/**
 * Adjunta los listeners interactivos del demo.
 * @param {HTMLElement} container
 */
export function init(container) {
  const toggleNotif = container.querySelector('#toggle-notif');
  const toggleDark = container.querySelector('#toggle-dark');
  const statusNotif = container.querySelector('#status-notif');
  const statusDark = container.querySelector('#status-dark');

  // ionChange proporciona e.detail.checked (boolean)
  toggleNotif.addEventListener('ionChange', (e) => {
    statusNotif.textContent = e.detail.checked ? 'activadas' : 'desactivadas';
    statusNotif.style.color = e.detail.checked ? 'var(--ion-color-success)' : 'inherit';
  });

  toggleDark.addEventListener('ionChange', (e) => {
    statusDark.textContent = e.detail.checked ? 'activado' : 'desactivado';
    statusDark.style.color = e.detail.checked ? 'var(--ion-color-tertiary)' : 'inherit';
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
