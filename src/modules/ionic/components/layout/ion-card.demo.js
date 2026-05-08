/**
 * @file ion-card.demo.js
 * @description Demo didáctico del componente <ion-card> de Ionic.
 *
 * ion-card es un contenedor visual con sombra y bordes redondeados.
 * Se compone de sub-elementos opcionales que estructuran su contenido:
 *
 *  - ion-card-header  → cabecera (title + subtitle)
 *  - ion-card-content → cuerpo principal
 *  - ion-card-title   → título dentro del header
 *  - ion-card-subtitle → subtítulo dentro del header
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/card
 */

const CODE_EXAMPLE = `<!-- Card básica -->
<ion-card>
  <ion-card-header>
    <ion-card-title>Título de la card</ion-card-title>
    <ion-card-subtitle>Subtítulo opcional</ion-card-subtitle>
  </ion-card-header>
  <ion-card-content>
    Contenido libre. Puede incluir texto, listas, botones o cualquier HTML.
  </ion-card-content>
</ion-card>

<!-- Card con imagen -->
<ion-card>
  <img src="https://picsum.photos/400/200" alt="Imagen de ejemplo" />
  <ion-card-header>
    <ion-card-title>Card con imagen</ion-card-title>
  </ion-card-header>
  <ion-card-content>
    La imagen se coloca fuera de ion-card-content para ocupar el ancho completo.
  </ion-card-content>
</ion-card>

<!-- Card con botones de acción -->
<ion-card>
  <ion-card-header>
    <ion-card-title>Card con acciones</ion-card-title>
  </ion-card-header>
  <ion-card-content>
    Texto de contenido...
  </ion-card-content>
  <div style="padding: 0 16px 16px;">
    <ion-button fill="clear">Acción 1</ion-button>
    <ion-button fill="clear" color="danger">Eliminar</ion-button>
  </div>
</ion-card>`;

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
        <h2>ion-card</h2>
        <p class="demo-desc">
          Contenedor visual con sombra y bordes redondeados. Ideal para
          agrupar información relacionada con jerarquía clara.
        </p>
      </div>

      <!-- ── GRUPO: Card básica ─────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Card básica</h3>
        <p class="demo-group-desc">
          Estructura mínima: <code>ion-card-header</code> con título
          y <code>ion-card-content</code> con el cuerpo.
        </p>
        <ion-card>
          <ion-card-header>
            <ion-card-title>Título de la card</ion-card-title>
            <ion-card-subtitle>Subtítulo opcional</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            Contenido libre. Puede incluir texto, listas, botones o cualquier HTML.
          </ion-card-content>
        </ion-card>
      </div>

      <!-- ── GRUPO: Card con imagen ─────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Card con imagen</h3>
        <p class="demo-group-desc">
          La imagen se coloca <strong>fuera</strong> de <code>ion-card-content</code>
          para ocupar el ancho completo de la card.
        </p>
        <ion-card>
          <img src="https://picsum.photos/seed/ionic/600/200" alt="Imagen de ejemplo" style="width:100%;display:block;" />
          <ion-card-header>
            <ion-card-title>Card con imagen</ion-card-title>
            <ion-card-subtitle>La imagen va antes del header</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            La imagen ocupa todo el ancho porque está fuera de los márgenes del contenido.
          </ion-card-content>
        </ion-card>
      </div>

      <!-- ── GRUPO: Card con acciones ───────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Card con acciones</h3>
        <p class="demo-group-desc">
          Los botones de acción se colocan al final de la card, fuera de
          <code>ion-card-content</code> para que no hereden el padding interior.
        </p>
        <ion-card>
          <ion-card-header>
            <ion-card-title>Card con acciones</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            Texto descriptivo del contenido de la card.
          </ion-card-content>
          <div style="padding: 0 16px 16px; display:flex; gap:8px;">
            <ion-button fill="clear">Ver más</ion-button>
            <ion-button fill="clear" color="danger" id="btn-card-eliminar">Eliminar</ion-button>
          </div>
        </ion-card>
      </div>

      <!-- ── GRUPO: Card con lista interna ──────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Card con lista interna</h3>
        <p class="demo-group-desc">
          Las cards pueden contener cualquier componente Ionic en su interior,
          incluidas listas.
        </p>
        <ion-card>
          <ion-card-header>
            <ion-card-title>Lenguajes del curso</ion-card-title>
          </ion-card-header>
          <ion-card-content style="padding:0;">
            <ion-list lines="inset">
              <ion-item>
                <ion-icon slot="start" name="logo-javascript" color="warning"></ion-icon>
                <ion-label>JavaScript</ion-label>
              </ion-item>
              <ion-item>
                <ion-icon slot="start" name="phone-portrait-outline" color="primary"></ion-icon>
                <ion-label>Ionic</ion-label>
              </ion-item>
              <ion-item>
                <ion-icon slot="start" name="logo-android" color="success"></ion-icon>
                <ion-label>Android (Capacitor)</ion-label>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
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
  const btnEliminar = container.querySelector('#btn-card-eliminar');

  // Ejemplo de interacción: el botón "Eliminar" muestra una confirmación
  btnEliminar.addEventListener('click', () => {
    btnEliminar.textContent = '¡Eliminado!';
    btnEliminar.disabled = true;
    // Restaurar después de 2 segundos para que el demo sea reutilizable
    setTimeout(() => {
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.disabled = false;
    }, 2000);
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
