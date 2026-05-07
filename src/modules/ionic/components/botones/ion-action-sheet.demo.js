/**
 * @file ion-action-sheet.demo.js
 * @description Demo didáctico del componente <ion-action-sheet> de Ionic.
 *
 * ion-action-sheet es una hoja de acciones que se desliza desde la parte
 * inferior de la pantalla. Se presenta siempre de forma programática
 * (no existe una etiqueta HTML estática que lo active solo).
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/action-sheet
 */

const CODE_BASICO = `// Presentar un action sheet desde JavaScript
const actionSheet = document.createElement('ion-action-sheet');

actionSheet.header   = '¿Qué quieres hacer?';
actionSheet.subHeader = 'Elige una opción'; // opcional

actionSheet.buttons = [
  {
    text:    'Eliminar',
    role:    'destructive',      // se muestra en rojo
    icon:    'trash-outline',
    handler: () => { console.log('Eliminado'); },
  },
  {
    text:    'Compartir',
    icon:    'share-outline',
    handler: () => { console.log('Compartido'); },
  },
  {
    text:    'Cancelar',
    role:    'cancel',           // siempre aparece al final
    icon:    'close-outline',
  },
];

// Debe montarse como hijo de ion-app
document.querySelector('ion-app').appendChild(actionSheet);
await actionSheet.present();`;

const CODE_BUTTONS = `// Cada botón puede tener:
{
  text:        'Texto visible',
  icon:        'name-del-icono',    // Ionicons
  role:        'destructive',       // 'destructive' | 'cancel' | undefined
  cssClass:    'mi-clase-extra',    // clase CSS adicional
  disabled:    false,               // deshabilitar sin quitar
  data:        { id: 42 },          // datos arbitrarios que se reciben en el evento
  handler: () => {
    // Se ejecuta al pulsar. Retornar false evita el cierre.
    return true; // permite el cierre (por defecto)
  },
}

// Roles especiales:
//  'cancel'      → siempre se coloca al final y cierra la hoja al pulsar
//  'destructive' → se muestra en color rojo de advertencia`;

const CODE_EVENTO = `// Escuchar el resultado de forma asíncrona
const { data, role } = await actionSheet.onDidDismiss();

console.log('Cerrado con rol:', role);    // 'cancel' | 'destructive' | 'backdrop'
console.log('Datos del botón:', data);   // el campo data del botón pulsado

// También puedes usar eventos DOM:
actionSheet.addEventListener('ionActionSheetDidDismiss', (e) => {
  console.log(e.detail.role, e.detail.data);
});`;

const CODE_BACKDROP = `// El toque en el fondo (backdrop) cierra la hoja por defecto.
// Para desactivarlo:
actionSheet.backdropDismiss = false;

// Modo translúcido en iOS
actionSheet.translucent = true;

// CSS personalizado (debe declararse en un archivo global, no scoped)
actionSheet.cssClass = 'mi-action-sheet';`;

// ─── render() ───────────────────────────────────────────────────────────────
export function render() {
  return `
    <section class="demo-page">

      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-action-sheet</h2>
        <p class="demo-desc">
          Hoja de acciones que se desliza desde la parte inferior de la pantalla.
          Presenta al usuario un conjunto de opciones relacionadas con el contexto
          actual. Siempre se instancia y presenta desde <strong>JavaScript</strong>.
        </p>
      </div>

      <!-- ── GRUPO: Anatomía ────────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Anatomía de un action sheet</h3>
        <p class="demo-group-desc">
          La hoja se compone de un <em>header</em> opcional, un sub-header
          opcional y una lista de botones con roles diferenciados.
        </p>

        <!-- Diagrama visual estático -->
        <div class="demo-as-diagram">
          <div class="demo-as-diagram__backdrop">
            <div class="demo-as-diagram__sheet">
              <div class="demo-as-diagram__header">
                <strong>¿Qué quieres hacer?</strong>
                <small>Elige una opción</small>
              </div>
              <div class="demo-as-diagram__btn demo-as-diagram__btn--destructive">
                <ion-icon name="trash-outline"></ion-icon>
                <span>Eliminar</span>
                <ion-badge color="danger" style="font-size:0.65rem;">destructive</ion-badge>
              </div>
              <div class="demo-as-diagram__btn">
                <ion-icon name="share-outline"></ion-icon>
                <span>Compartir</span>
              </div>
              <div class="demo-as-diagram__btn">
                <ion-icon name="pencil-outline"></ion-icon>
                <span>Editar</span>
              </div>
              <div class="demo-as-diagram__separator"></div>
              <div class="demo-as-diagram__btn demo-as-diagram__btn--cancel">
                <ion-icon name="close-outline"></ion-icon>
                <span>Cancelar</span>
                <ion-badge color="medium" style="font-size:0.65rem;">cancel</ion-badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── GRUPO: Código de presentación ─────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Cómo presentarlo</h3>
        <p class="demo-group-desc">
          No hay etiqueta HTML estática. Se crea el elemento, se configura
          y se monta como hijo de <code>ion-app</code>.
        </p>
        <pre class="demo-code"><code>${escapeHtml(CODE_BASICO)}</code></pre>
      </div>

      <!-- ── GRUPO: Demo interactivo ────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Demo interactivo</h3>
        <p class="demo-group-desc">
          Simulación de un action sheet completo.
          Pulsa el botón para ver la animación de entrada y seleccionar una acción.
        </p>

        <div style="text-align:center;">
          <ion-button id="open-as-btn" color="primary">
            <ion-icon slot="start" name="apps-outline"></ion-icon>
            Mostrar Action Sheet
          </ion-button>
        </div>

        <!-- Overlay simulado -->
        <div class="demo-as-overlay" id="as-overlay" aria-hidden="true">
          <div class="demo-as-overlay__backdrop" id="as-backdrop"></div>
          <div class="demo-as-overlay__sheet" id="as-sheet" role="dialog">
            <div class="demo-as-overlay__header">
              <strong>¿Qué quieres hacer?</strong>
            </div>
            <button class="demo-as-overlay__btn demo-as-overlay__btn--destructive" data-action="eliminar">
              <ion-icon name="trash-outline"></ion-icon>
              Eliminar
            </button>
            <button class="demo-as-overlay__btn" data-action="compartir">
              <ion-icon name="share-outline"></ion-icon>
              Compartir
            </button>
            <button class="demo-as-overlay__btn" data-action="editar">
              <ion-icon name="pencil-outline"></ion-icon>
              Editar
            </button>
            <div class="demo-as-overlay__separator"></div>
            <button class="demo-as-overlay__btn demo-as-overlay__btn--cancel" data-action="cancel">
              <ion-icon name="close-outline"></ion-icon>
              Cancelar
            </button>
          </div>
        </div>

        <p id="as-result" style="text-align:center;font-size:0.85rem;opacity:0.65;min-height:22px;margin-top:8px;"></p>
      </div>

      <!-- ── GRUPO: Opciones de botones ────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Opciones de cada botón</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_BUTTONS)}</code></pre>
      </div>

      <!-- ── GRUPO: Escuchar el resultado ───────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Escuchar el resultado (onDidDismiss)</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_EVENTO)}</code></pre>
      </div>

      <!-- ── GRUPO: Opciones adicionales ───────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Backdrop y personalización CSS</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_BACKDROP)}</code></pre>
      </div>

    </section>
  `;
}

// ─── init() ─────────────────────────────────────────────────────────────────
export function init(container) {
  const openBtn  = container.querySelector('#open-as-btn');
  const overlay  = container.querySelector('#as-overlay');
  const backdrop = container.querySelector('#as-backdrop');
  const sheet    = container.querySelector('#as-sheet');
  const result   = container.querySelector('#as-result');

  function openSheet() {
    overlay.style.display = 'flex';
    // Forzar reflow para que la transición CSS funcione
    // eslint-disable-next-line no-unused-expressions
    sheet.offsetHeight;
    overlay.classList.add('demo-as-overlay--open');
    result.textContent = '';
  }

  function closeSheet(action) {
    overlay.classList.remove('demo-as-overlay--open');
    setTimeout(() => { overlay.style.display = 'none'; }, 280);

    const messages = {
      eliminar: '🗑 role: "destructive" — data: { action: "eliminar" }',
      compartir: '↗ role: undefined — data: { action: "compartir" }',
      editar:   '✏ role: undefined — data: { action: "editar" }',
      cancel:   '✕ role: "cancel" — acción cancelada',
      backdrop: '✕ role: "backdrop" — cerrado al tocar fuera',
    };
    if (action) result.textContent = messages[action] || '';
  }

  openBtn.addEventListener('click', openSheet);
  backdrop.addEventListener('click', () => closeSheet('backdrop'));

  sheet.querySelectorAll('[data-action]').forEach((btn) => {
    btn.addEventListener('click', () => closeSheet(btn.dataset.action));
  });
}

// ─── Utilidad interna ────────────────────────────────────────────────────────
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
