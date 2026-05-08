/**
 * @file ion-item-sliding.demo.js
 * @description Demo didáctico de <ion-item-sliding>, <ion-item-options>
 *              e <ion-item-option> de Ionic.
 *
 * ion-item-sliding envuelve un ion-item con opciones ocultas a izquierda
 * y/o derecha que se revelan al deslizar. Las opciones se definen con
 * ion-item-options (contenedor por lado) e ion-item-option (cada botón).
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/item-sliding
 */

const CODE_EXAMPLE = `<!-- Estructura básica -->
<ion-list>
  <ion-item-sliding>

    <!-- Opciones en el lado izquierdo (swipe derecha) -->
    <ion-item-options side="start">
      <ion-item-option color="success">
        <ion-icon slot="icon-only" name="star-outline"></ion-icon>
      </ion-item-option>
    </ion-item-options>

    <!-- Contenido principal -->
    <ion-item>
      <ion-label>Desliza para ver opciones</ion-label>
    </ion-item>

    <!-- Opciones en el lado derecho (swipe izquierda) -->
    <ion-item-options side="end">
      <ion-item-option color="danger">
        <ion-icon slot="icon-only" name="trash-outline"></ion-icon>
      </ion-item-option>
    </ion-item-options>

  </ion-item-sliding>
</ion-list>

<script>
  const sliding = document.querySelector('ion-item-sliding');

  // Cerrar programáticamente
  sliding.close();

  // Obtener el ratio de apertura (0-1 o mayor si expandable)
  const ratio = await sliding.getSlidingRatio();
</script>`;

const EMAIL_DATA = [
  { id: 1, from: 'María García',    subject: 'Reunión del lunes',         time: '09:15', avatar: '#7B61FF', initials: 'MG', unread: true  },
  { id: 2, from: 'Carlos López',    subject: 'Presupuesto Q2',            time: '08:42', avatar: '#22C55E', initials: 'CL', unread: true  },
  { id: 3, from: 'Ana Martínez',    subject: 'Novedades del producto',    time: 'Ayer',  avatar: '#F59E0B', initials: 'AM', unread: false },
  { id: 4, from: 'David Torres',    subject: 'Pull request revisado',     time: 'Ayer',  avatar: '#3B82F6', initials: 'DT', unread: false },
  { id: 5, from: 'Laura Sánchez',   subject: 'Invitación a evento',       time: 'Lun',   avatar: '#EC4899', initials: 'LS', unread: false },
];

const TASK_DATA = [
  { id: 1, text: 'Revisar diseño de onboarding',  done: false, priority: 'high'   },
  { id: 2, text: 'Actualizar dependencias npm',    done: true,  priority: 'low'    },
  { id: 3, text: 'Escribir tests de integración', done: false, priority: 'medium' },
  { id: 4, text: 'Preparar demo para cliente',    done: false, priority: 'high'   },
];

const PRIORITY_COLOR = { high: '#EF4444', medium: '#F59E0B', low: '#22C55E' };

/** Construye un item deslizable para la lista de emails. */
function emailItem(item) {
  return `
  <div class="demo-sl-item-wrap" id="sl-email-${item.id}">
    <!-- Acción izquierda: archivar -->
    <div class="demo-sl-action demo-sl-action--start demo-sl-action--success"
         data-action="archive" data-id="${item.id}">
      <ion-icon name="archive-outline"></ion-icon>
      <span>Archivar</span>
    </div>
    <!-- Contenido principal -->
    <div class="demo-sl-content" data-sliding="${item.id}">
      <div class="demo-avatar" style="background:${item.avatar};width:42px;height:42px;font-size:0.85rem">
        ${item.initials}
      </div>
      <div class="demo-sl-info">
        <div class="demo-sl-from">
          ${item.unread ? '<span class="demo-sl-dot"></span>' : ''}
          <strong>${item.from}</strong>
          <span class="demo-sl-time">${item.time}</span>
        </div>
        <div class="demo-sl-subject">${item.subject}</div>
      </div>
    </div>
    <!-- Acción derecha: eliminar + marcar -->
    <div class="demo-sl-actions-end">
      <div class="demo-sl-action demo-sl-action--end demo-sl-action--warning"
           data-action="flag" data-id="${item.id}">
        <ion-icon name="flag-outline"></ion-icon>
        <span>Marcar</span>
      </div>
      <div class="demo-sl-action demo-sl-action--end demo-sl-action--danger"
           data-action="delete" data-id="${item.id}">
        <ion-icon name="trash-outline"></ion-icon>
        <span>Borrar</span>
      </div>
    </div>
  </div>`;
}

/** Construye un item deslizable para la lista de tareas. */
function taskItem(item) {
  return `
  <div class="demo-sl-item-wrap demo-sl-item-wrap--task${item.done ? ' demo-sl-item-wrap--done' : ''}"
       id="sl-task-${item.id}">
    <div class="demo-sl-action demo-sl-action--start demo-sl-action--success"
         data-action="done" data-id="${item.id}" data-list="task">
      <ion-icon name="${item.done ? 'close-outline' : 'checkmark-outline'}"></ion-icon>
      <span>${item.done ? 'Deshacer' : 'Hecho'}</span>
    </div>
    <div class="demo-sl-content" data-sliding="task-${item.id}">
      <div class="demo-sl-priority" style="background:${PRIORITY_COLOR[item.priority]}"></div>
      <span class="demo-sl-task-text${item.done ? ' demo-sl-task-text--done' : ''}">${item.text}</span>
    </div>
    <div class="demo-sl-action demo-sl-action--end demo-sl-action--danger"
         data-action="remove" data-id="${item.id}" data-list="task">
      <ion-icon name="trash-outline"></ion-icon>
      <span>Borrar</span>
    </div>
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
        <h2>ion-item-sliding</h2>
        <p class="demo-desc">
          Desliza un <code>ion-item</code> para revelar acciones ocultas a izquierda
          y/o derecha. Las opciones se definen con
          <code>ion-item-options</code> (por lado) e
          <code>ion-item-option</code> (por botón).
        </p>
      </div>

      <!-- ── GRUPO: Anatomía ────────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Anatomía del componente</h3>
        <div class="demo-sl-anatomy">
          <div class="demo-sl-anatomy-layer demo-sl-anatomy-layer--start">
            <ion-icon name="star-outline"></ion-icon>
            <span>ion-item-options<br><small>side="start"</small></span>
          </div>
          <div class="demo-sl-anatomy-layer demo-sl-anatomy-layer--content">
            <ion-icon name="swap-horizontal-outline"></ion-icon>
            <span>ion-item (contenido principal)</span>
          </div>
          <div class="demo-sl-anatomy-layer demo-sl-anatomy-layer--end">
            <span>ion-item-options<br><small>side="end"</small></span>
            <ion-icon name="trash-outline"></ion-icon>
          </div>
        </div>
        <p class="demo-group-desc" style="margin-top:8px">
          Desliza ← o → sobre los items de abajo para ver las acciones.
          En desktop puedes usar el ratón (click y arrastrar).
        </p>
      </div>

      <!-- ── GRUPO: Email list ──────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Ejemplo: Bandeja de entrada</h3>
        <p class="demo-group-desc">
          → (deslizar derecha): <ion-badge color="success">Archivar</ion-badge> &nbsp;
          ← (deslizar izquierda): <ion-badge color="warning">Marcar</ion-badge>
          <ion-badge color="danger">Borrar</ion-badge>
        </p>
        <div class="demo-sl-list" id="email-list">
          ${EMAIL_DATA.map(emailItem).join('')}
        </div>
        <div class="demo-sl-log" id="email-log">
          Desliza un email para ver el evento…
        </div>
      </div>

      <!-- ── GRUPO: Lista de tareas ─────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Ejemplo: Lista de tareas</h3>
        <p class="demo-group-desc">
          → (deslizar derecha): <ion-badge color="success">Completar/Deshacer</ion-badge> &nbsp;
          ← (deslizar izquierda): <ion-badge color="danger">Eliminar</ion-badge>
        </p>
        <div class="demo-sl-list" id="task-list">
          ${TASK_DATA.map(taskItem).join('')}
        </div>
      </div>

      <!-- ── GRUPO: Atributos clave ─────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Atributos clave</h3>
        <div class="demo-attr-table">
          <div class="demo-attr-row">
            <code>ion-item-options[side]</code>
            <span><code>start</code> (izquierda) o <code>end</code> (derecha). Por defecto: <code>end</code>.</span>
          </div>
          <div class="demo-attr-row">
            <code>ion-item-option[color]</code>
            <span>Color Ionic del botón de acción.</span>
          </div>
          <div class="demo-attr-row">
            <code>ion-item-option[expandable]</code>
            <span>Al arrastrar más allá del umbral, la opción se expande y se dispara automáticamente.</span>
          </div>
          <div class="demo-attr-row">
            <code>sliding.close()</code>
            <span>Cierra el item programáticamente (método de instancia).</span>
          </div>
          <div class="demo-attr-row">
            <code>ionSwipe</code>
            <span>Evento del <code>ion-item-options</code> que se dispara cuando el item se desliza completamente (expandable).</span>
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
  // Constante de pixels necesarios para "activar" una acción
  const THRESHOLD = 72;

  /**
   * Convierte cualquier .demo-sl-item-wrap en deslizable
   * arrastrando con ratón o toque.
   */
  function makeSlidable(wrap) {
    const content = wrap.querySelector('.demo-sl-content');
    if (!content) return;

    let startX = 0, currentX = 0, dragging = false;

    const onStart = (e) => {
      startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
      dragging = true;
      content.style.transition = 'none';
    };

    const onMove = (e) => {
      if (!dragging) return;
      const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      currentX = Math.max(-2 * THRESHOLD, Math.min(THRESHOLD, x - startX));
      content.style.transform = `translateX(${currentX}px)`;
    };

    const onEnd = () => {
      if (!dragging) return;
      dragging = false;
      content.style.transition = 'transform 0.25s ease';

      if (Math.abs(currentX) >= THRESHOLD) {
        // Umbral superado → disparar acción
        const side = currentX > 0 ? 'start' : 'end';
        triggerAction(wrap, side);
      }
      // Siempre vuelve al centro
      content.style.transform = 'translateX(0)';
      currentX = 0;
    };

    content.addEventListener('mousedown',  onStart);
    content.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove',  onMove, { passive: true });
    window.addEventListener('mouseup',   onEnd);
    window.addEventListener('touchend',  onEnd);
  }

  /** Ejecuta la acción correspondiente al lado deslizado. */
  function triggerAction(wrap, side) {
    // Busca el primer botón de ese side
    const actionEl = wrap.querySelector(`.demo-sl-action--${side}`);
    if (actionEl) actionEl.click();
  }

  // ── Bandeja de entrada ─────────────────────────────────────
  const emailList = container.querySelector('#email-list');
  const emailLog  = container.querySelector('#email-log');

  emailList.querySelectorAll('.demo-sl-item-wrap').forEach(wrap => makeSlidable(wrap));

  emailList.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const { action, id } = btn.dataset;
    const wrap = container.querySelector(`#sl-email-${id}`);

    switch (action) {
      case 'archive':
        emailLog.innerHTML = `<ion-badge color="success">Archivar</ion-badge> Email de <strong>${wrap.querySelector('strong').textContent}</strong> archivado.`;
        wrap.style.animation = 'sl-remove 0.3s ease forwards';
        setTimeout(() => wrap.remove(), 310);
        break;
      case 'flag':
        emailLog.innerHTML = `<ion-badge color="warning">Marcar</ion-badge> Email de <strong>${wrap.querySelector('strong').textContent}</strong> marcado.`;
        break;
      case 'delete':
        emailLog.innerHTML = `<ion-badge color="danger">Borrar</ion-badge> Email de <strong>${wrap.querySelector('strong').textContent}</strong> eliminado.`;
        wrap.style.animation = 'sl-remove 0.3s ease forwards';
        setTimeout(() => wrap.remove(), 310);
        break;
    }
  });

  // ── Lista de tareas ────────────────────────────────────────
  const taskList = container.querySelector('#task-list');
  taskList.querySelectorAll('.demo-sl-item-wrap').forEach(wrap => makeSlidable(wrap));

  taskList.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action][data-list="task"]');
    if (!btn) return;
    const { action, id } = btn.dataset;
    const wrap = container.querySelector(`#sl-task-${id}`);

    if (action === 'done') {
      wrap.classList.toggle('demo-sl-item-wrap--done');
      const text = wrap.querySelector('.demo-sl-task-text');
      text.classList.toggle('demo-sl-task-text--done');
      btn.querySelector('ion-icon').name = wrap.classList.contains('demo-sl-item-wrap--done')
        ? 'close-outline' : 'checkmark-outline';
      btn.querySelector('span').textContent = wrap.classList.contains('demo-sl-item-wrap--done')
        ? 'Deshacer' : 'Hecho';
    } else if (action === 'remove') {
      wrap.style.animation = 'sl-remove 0.3s ease forwards';
      setTimeout(() => wrap.remove(), 310);
    }
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
