/**
 * @file ion-checkbox.demo.js
 * @description Demo didáctico del componente <ion-checkbox> de Ionic.
 *
 * ion-checkbox es una casilla de verificación. Soporta tres estados:
 * checked, unchecked e indeterminate. Se usa dentro de <ion-item>.
 * Emite el evento ionChange al cambiar.
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/checkbox
 */

const CODE_EXAMPLE = `<!-- Checkbox básico dentro de ion-item -->
<ion-item>
  <ion-checkbox slot="start"></ion-checkbox>
  <ion-label>Aceptar términos</ion-label>
</ion-item>

<!-- Marcado por defecto -->
<ion-item>
  <ion-checkbox slot="start" checked="true"></ion-checkbox>
  <ion-label>Recordar sesión</ion-label>
</ion-item>

<!-- Con color personalizado -->
<ion-item>
  <ion-checkbox slot="start" color="danger" checked="true"></ion-checkbox>
  <ion-label>Importante</ion-label>
</ion-item>

<!-- Estado indeterminate (tercer estado) -->
<ion-item>
  <ion-checkbox slot="start" indeterminate="true"></ion-checkbox>
  <ion-label>Seleccionar todo</ion-label>
</ion-item>

<!-- Deshabilitado -->
<ion-item>
  <ion-checkbox slot="start" disabled="true"></ion-checkbox>
  <ion-label>Opción bloqueada</ion-label>
</ion-item>

<!-- Escuchar cambios con ionChange -->
<script>
  const cb = document.querySelector('ion-checkbox');

  cb.addEventListener('ionChange', (e) => {
    console.log('Checked:', e.detail.checked); // true | false
  });
</script>`;

/**
 * Genera una fila de checkbox visual (simulado con CSS nativo).
 * @param {string} label
 * @param {boolean} checked
 * @param {string} color - Ionic color token
 * @param {boolean} indeterminate
 * @param {boolean} disabled
 * @returns {string}
 */
function cbRow(label, checked, color = 'primary', indeterminate = false, disabled = false) {
  const checkedAttr = checked ? 'checked' : '';
  const disabledAttr = disabled ? 'disabled' : '';
  const id = `cb-${label.replace(/\s/g, '-').toLowerCase()}`;
  return `
    <label class="demo-cb-item${disabled ? ' demo-cb-item--disabled' : ''}" for="${id}">
      <input type="checkbox" class="demo-cb-input" id="${id}" ${checkedAttr} ${disabledAttr}
             data-color="${color}" data-indeterminate="${indeterminate}">
      <span class="demo-cb-box demo-cb-box--${color}${indeterminate ? ' demo-cb-box--indet' : ''}">
        <ion-icon name="${indeterminate ? 'remove' : 'checkmark'}" class="demo-cb-icon"></ion-icon>
      </span>
      <span class="demo-cb-label">${label}</span>
    </label>`;
}

/**
 * Genera un ítem de lista de tareas interactivo.
 */
function taskRow(label, done) {
  return `
    <label class="demo-cb-task${done ? ' demo-cb-task--done' : ''}">
      <input type="checkbox" class="demo-cb-input demo-task-cb" ${done ? 'checked' : ''}>
      <span class="demo-cb-box demo-cb-box--success">
        <ion-icon name="checkmark" class="demo-cb-icon"></ion-icon>
      </span>
      <span class="demo-cb-label">${label}</span>
    </label>`;
}

export function render() {
  return `
    <section class="demo-page">

      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-checkbox</h2>
        <p class="demo-desc">
          Casilla de verificación con tres estados: <code>checked</code>,
          <code>unchecked</code> e <code>indeterminate</code>.
          Emite <code>ionChange</code> con <code>e.detail.checked</code>.
        </p>
      </div>

      <!-- ── GRUPO: Variantes visuales ─────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Variantes</h3>
        <div class="demo-cb-list">
          ${cbRow('Sin marcar (por defecto)', false)}
          ${cbRow('Marcado', true)}
          ${cbRow('Color secondary', true, 'secondary')}
          ${cbRow('Color success', true, 'success')}
          ${cbRow('Color danger', true, 'danger')}
          ${cbRow('Color warning', true, 'warning')}
          ${cbRow('Indeterminate (tercer estado)', false, 'primary', true)}
          ${cbRow('Deshabilitado', false, 'medium', false, true)}
        </div>
      </div>

      <!-- ── GRUPO: Atributos clave ─────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Atributos clave</h3>
        <div class="demo-attr-table">
          <div class="demo-attr-row">
            <code>checked</code>
            <span>Estado inicial marcado. <code>boolean</code></span>
          </div>
          <div class="demo-attr-row">
            <code>indeterminate</code>
            <span>Tercer estado (ni sí ni no). Útil para "seleccionar todo" parcial.</span>
          </div>
          <div class="demo-attr-row">
            <code>color</code>
            <span>Token de color Ionic: primary · secondary · success · danger · warning · medium</span>
          </div>
          <div class="demo-attr-row">
            <code>disabled</code>
            <span>Deshabilita la interacción.</span>
          </div>
          <div class="demo-attr-row">
            <code>ionChange</code>
            <span>Evento. <code>e.detail.checked</code> contiene el nuevo estado booleano.</span>
          </div>
        </div>
      </div>

      <!-- ── GRUPO: Lista de tareas interactiva ─────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Lista de tareas — demo interactivo</h3>
        <p class="demo-group-desc">
          Haz clic para marcar/desmarcar. El evento <code>ionChange</code>
          (aquí simulado con <code>change</code> nativo) actualiza el contador.
        </p>
        <div class="demo-cb-task-list" id="task-list">
          ${taskRow('Aprender ion-checkbox', true)}
          ${taskRow('Crear formulario de registro', false)}
          ${taskRow('Añadir validación al formulario', false)}
          ${taskRow('Probar en iOS y Android', false)}
          ${taskRow('Publicar en App Store', false)}
        </div>
        <div class="demo-cb-counter">
          <ion-badge color="success" id="task-badge">1</ion-badge>
          <span id="task-counter-label">de 5 tareas completadas</span>
        </div>
      </div>

      <!-- ── GRUPO: Seleccionar todo (indeterminate) ────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Patrón "Seleccionar todo"</h3>
        <p class="demo-group-desc">
          Cuando algunos (pero no todos) están seleccionados, el checkbox
          principal usa el estado <code>indeterminate</code>.
        </p>
        <div class="demo-cb-list">
          <label class="demo-cb-item" id="cb-select-all">
            <input type="checkbox" class="demo-cb-input" id="cb-all">
            <span class="demo-cb-box demo-cb-box--primary" id="cb-all-box">
              <ion-icon name="checkmark" class="demo-cb-icon" id="cb-all-icon"></ion-icon>
            </span>
            <span class="demo-cb-label"><strong>Seleccionar todos</strong></span>
          </label>
        </div>
        <div class="demo-cb-list" style="padding-left:24px;" id="cb-sub-list">
          ${['JavaScript', 'TypeScript', 'Angular', 'Ionic'].map((t, i) => `
          <label class="demo-cb-item">
            <input type="checkbox" class="demo-cb-input demo-sub-cb" ${i < 2 ? 'checked' : ''}>
            <span class="demo-cb-box demo-cb-box--primary">
              <ion-icon name="checkmark" class="demo-cb-icon"></ion-icon>
            </span>
            <span class="demo-cb-label">${t}</span>
          </label>`).join('')}
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
  // ── Lista de tareas ────────────────────────────────────────
  const taskCbs = container.querySelectorAll('.demo-task-cb');
  const badge   = container.querySelector('#task-badge');
  const label   = container.querySelector('#task-counter-label');

  function updateTaskCounter() {
    const done = [...taskCbs].filter(cb => cb.checked).length;
    badge.textContent = done;
    label.textContent = `de ${taskCbs.length} tareas completadas`;
    badge.color = done === taskCbs.length ? 'success' : 'primary';
  }

  taskCbs.forEach(cb => {
    cb.addEventListener('change', (e) => {
      cb.closest('.demo-cb-task').classList.toggle('demo-cb-task--done', e.target.checked);
      updateTaskCounter();
    });
  });

  // ── Seleccionar todos ──────────────────────────────────────
  const cbAll     = container.querySelector('#cb-all');
  const cbAllBox  = container.querySelector('#cb-all-box');
  const cbAllIcon = container.querySelector('#cb-all-icon');
  const subCbs    = container.querySelectorAll('.demo-sub-cb');

  function updateAllState() {
    const checked = [...subCbs].filter(cb => cb.checked).length;
    const indet = checked > 0 && checked < subCbs.length;
    const allChecked = checked === subCbs.length;

    cbAll.checked = allChecked;
    cbAllBox.classList.toggle('demo-cb-box--indet', indet);
    cbAllIcon.name = indet ? 'remove' : 'checkmark';
    cbAllBox.classList.toggle('demo-cb-box--primary', allChecked || indet);
  }

  subCbs.forEach(cb => cb.addEventListener('change', updateAllState));

  cbAll.addEventListener('change', (e) => {
    subCbs.forEach(cb => {
      cb.checked = e.target.checked;
      cb.closest('.demo-cb-item').classList.remove('demo-cb-box--indet');
    });
    cbAllBox.classList.remove('demo-cb-box--indet');
    cbAllIcon.name = 'checkmark';
  });

  updateAllState();
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
