/**
 * @file ion-reorder-group.demo.js
 * @description Demo didáctico de <ion-reorder-group> e <ion-reorder> de Ionic.
 *
 * ion-reorder-group envuelve una lista cuyos ítems pueden reordenarse
 * mediante drag & drop. Cada ítem debe tener un <ion-reorder> que actúa
 * como "asa" de arrastre. Emite ionItemReorder con los índices origen/destino.
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/reorder-group
 */

const CODE_EXAMPLE = `<!-- Reorder group básico -->
<ion-list>
  <ion-reorder-group disabled="false">

    <ion-item>
      <ion-label>Elemento 1</ion-label>
      <ion-reorder slot="end"></ion-reorder>
    </ion-item>

    <ion-item>
      <ion-label>Elemento 2</ion-label>
      <ion-reorder slot="end"></ion-reorder>
    </ion-item>

    <ion-item>
      <ion-label>Elemento 3</ion-label>
      <ion-reorder slot="end"></ion-reorder>
    </ion-item>

  </ion-reorder-group>
</ion-list>

<script>
  const reorderGroup = document.querySelector('ion-reorder-group');

  reorderGroup.addEventListener('ionItemReorder', (e) => {
    console.log('Desde índice:', e.detail.from);
    console.log('Hacia índice:', e.detail.to);

    // SIEMPRE llamar a complete() para finalizar la animación
    e.detail.complete();

    // O pasar true para mover el elemento en el DOM automáticamente:
    // e.detail.complete(true);
  });
</script>`;

const PLAYLIST_ITEMS = [
  { id: 1, title: 'Blinding Lights',    artist: 'The Weeknd',         duration: '3:20', icon: '🎵' },
  { id: 2, title: 'As It Was',          artist: 'Harry Styles',        duration: '2:37', icon: '🎶' },
  { id: 3, title: 'Stay',               artist: 'The Kid LAROI',       duration: '2:21', icon: '🎸' },
  { id: 4, title: 'Levitating',         artist: 'Dua Lipa',            duration: '3:23', icon: '🎹' },
  { id: 5, title: 'Peaches',            artist: 'Justin Bieber',       duration: '3:18', icon: '🥁' },
];

const STEPS_ITEMS = [
  { id: 1, title: 'Inicializar proyecto', desc: 'npm init o ionic start', icon: 'folder-open-outline' },
  { id: 2, title: 'Instalar dependencias', desc: 'npm install',           icon: 'download-outline' },
  { id: 3, title: 'Configurar rutas',      desc: 'Router hash/History',   icon: 'git-branch-outline' },
  { id: 4, title: 'Crear componentes',     desc: 'Pages y componentes',   icon: 'code-slash-outline' },
  { id: 5, title: 'Probar en dispositivo', desc: 'ionic capacitor run',   icon: 'phone-portrait-outline' },
  { id: 6, title: 'Publicar app',          desc: 'App Store / Play Store',icon: 'rocket-outline' },
];

function playlistRow(item, index) {
  return `
  <div class="demo-ro-item" data-id="${item.id}" draggable="true" data-index="${index}">
    <div class="demo-ro-handle" title="Arrastrar para reordenar">
      <ion-icon name="reorder-three-outline"></ion-icon>
    </div>
    <div class="demo-ro-num">${index + 1}</div>
    <div class="demo-ro-content">
      <span class="demo-ro-title">${item.icon} ${item.title}</span>
      <span class="demo-ro-desc">${item.artist}</span>
    </div>
    <span class="demo-ro-meta">${item.duration}</span>
  </div>`;
}

function stepRow(item, index) {
  return `
  <div class="demo-ro-item demo-ro-item--steps" data-id="${item.id}" draggable="true" data-index="${index}">
    <div class="demo-ro-handle" title="Arrastrar para reordenar">
      <ion-icon name="reorder-three-outline"></ion-icon>
    </div>
    <div class="demo-ro-step-num">${index + 1}</div>
    <div class="demo-ro-content">
      <span class="demo-ro-title">
        <ion-icon name="${item.icon}" style="vertical-align:middle;margin-right:4px"></ion-icon>
        ${item.title}
      </span>
      <span class="demo-ro-desc">${item.desc}</span>
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
        <h2>ion-reorder-group / ion-reorder</h2>
        <p class="demo-desc">
          Lista reordenable por drag & drop. <code>ion-reorder</code> es el asa
          de arrastre en cada ítem. <code>ion-reorder-group</code> gestiona el
          evento <code>ionItemReorder</code> con los índices <code>from</code>
          y <code>to</code>.
        </p>
      </div>

      <!-- ── GRUPO: Funcionamiento ─────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Cómo funciona</h3>
        <div class="demo-attr-table">
          <div class="demo-attr-row">
            <code>ionItemReorder</code>
            <span>Emitido al soltar. <code>e.detail.from</code> = índice origen, <code>e.detail.to</code> = índice destino.</span>
          </div>
          <div class="demo-attr-row">
            <code>e.detail.complete()</code>
            <span>Se debe llamar siempre para finalizar la animación. Pasa <code>true</code> para mover el elemento en el DOM.</span>
          </div>
          <div class="demo-attr-row">
            <code>disabled</code>
            <span>Deshabilita el reordenamiento. Útil para alternar entre modo vista y modo edición.</span>
          </div>
          <div class="demo-attr-row">
            <code>ion-reorder[slot]</code>
            <span><code>start</code> o <code>end</code>. Posiciona el asa a la izquierda o derecha del ítem.</span>
          </div>
        </div>
      </div>

      <!-- ── GRUPO: Playlist ────────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Ejemplo: Playlist reordenable</h3>
        <p class="demo-group-desc">
          Arrastra el asa <ion-icon name="reorder-three-outline"></ion-icon>
          para cambiar el orden. Los números se actualizan automáticamente.
        </p>
        <div class="demo-ro-list" id="playlist-list">
          ${PLAYLIST_ITEMS.map((item, i) => playlistRow(item, i)).join('')}
        </div>
        <div class="demo-sl-log" id="playlist-log">
          Arrastra un ítem para ver el evento ionItemReorder…
        </div>
      </div>

      <!-- ── GRUPO: Pasos de proyecto ──────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Ejemplo: Pasos de un proyecto</h3>
        <div class="demo-ro-list" id="steps-list">
          ${STEPS_ITEMS.map((item, i) => stepRow(item, i)).join('')}
        </div>
        <ion-button size="small" fill="outline" id="steps-reset" style="margin-top:8px">
          <ion-icon slot="start" name="refresh-outline"></ion-icon>
          Resetear orden
        </ion-button>
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
  // Inicializa drag-and-drop para una lista
  function initDnD(listId, logId, onReorder) {
    const list = container.querySelector(`#${listId}`);
    const log  = logId ? container.querySelector(`#${logId}`) : null;
    if (!list) return;

    let dragSrc = null;

    list.addEventListener('dragstart', (e) => {
      const item = e.target.closest('.demo-ro-item');
      if (!item) return;
      dragSrc = item;
      item.classList.add('demo-ro-item--dragging');
      e.dataTransfer.effectAllowed = 'move';
    });

    list.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      const target = e.target.closest('.demo-ro-item');
      if (!target || target === dragSrc) return;
      const rect   = target.getBoundingClientRect();
      const midY   = rect.top + rect.height / 2;
      if (e.clientY < midY) {
        list.insertBefore(dragSrc, target);
      } else {
        list.insertBefore(dragSrc, target.nextSibling);
      }
    });

    list.addEventListener('dragend', (e) => {
      const item = e.target.closest('.demo-ro-item');
      if (!item) return;
      const oldIndex = parseInt(item.dataset.index);
      item.classList.remove('demo-ro-item--dragging');

      // Recalcular índices
      const items = [...list.querySelectorAll('.demo-ro-item')];
      const newIndex = items.indexOf(item);

      items.forEach((el, i) => {
        el.dataset.index = i;
        const numEl = el.querySelector('.demo-ro-num, .demo-ro-step-num');
        if (numEl) numEl.textContent = i + 1;
      });

      if (log) {
        log.innerHTML =
          `ionItemReorder → from: <strong>${oldIndex}</strong>, to: <strong>${newIndex}</strong>
           <br><small>e.detail.complete() llamado — DOM actualizado</small>`;
      }

      if (onReorder) onReorder(oldIndex, newIndex);
      dragSrc = null;
    });
  }

  initDnD('playlist-list', 'playlist-log');

  // Pasos con reset
  const originalSteps = [...STEPS_ITEMS]; // copia

  initDnD('steps-list', null);

  container.querySelector('#steps-reset').addEventListener('click', () => {
    const list = container.querySelector('#steps-list');
    list.innerHTML = originalSteps.map((item, i) => stepRow(item, i)).join('');
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
