/**
 * @file ion-input.demo.js
 * @description Demo didáctico del componente <ion-input> de Ionic.
 *
 * ion-input es el campo de texto estándar de Ionic. Se usa siempre dentro
 * de un <ion-item> para obtener el estilo y comportamiento correcto.
 * Soporta todos los tipos de input HTML y añade atributos propios de Ionic.
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/input
 */

const CODE_EXAMPLE = `<!-- Input básico dentro de ion-item -->
<ion-item>
  <ion-label position="stacked">Nombre</ion-label>
  <ion-input placeholder="Escribe tu nombre"></ion-input>
</ion-item>

<!-- Tipos de input -->
<ion-item>
  <ion-label position="stacked">Email</ion-label>
  <ion-input type="email" placeholder="correo@ejemplo.com"></ion-input>
</ion-item>

<ion-item>
  <ion-label position="stacked">Contraseña</ion-label>
  <ion-input type="password" placeholder="••••••••"></ion-input>
</ion-item>

<ion-item>
  <ion-label position="stacked">Número</ion-label>
  <ion-input type="number" min="0" max="100" placeholder="0-100"></ion-input>
</ion-item>

<!-- Posiciones del label -->
<ion-item>
  <ion-label position="floating">Flotante</ion-label>
  <ion-input></ion-input>
</ion-item>

<ion-item>
  <ion-label position="fixed">Fijo</ion-label>
  <ion-input placeholder="Label siempre visible"></ion-input>
</ion-item>

<!-- Con valor por defecto y solo lectura -->
<ion-item>
  <ion-label position="stacked">Solo lectura</ion-label>
  <ion-input value="Valor fijo" readonly="true"></ion-input>
</ion-item>

<!-- Deshabilitado -->
<ion-item>
  <ion-label position="stacked">Deshabilitado</ion-label>
  <ion-input value="No editable" disabled="true"></ion-input>
</ion-item>`;

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
        <h2>ion-input</h2>
        <p class="demo-desc">
          Campo de texto de Ionic. Siempre debe ir dentro de un
          <code>ion-item</code> para obtener el estilo y comportamiento correcto.
        </p>
      </div>

      <!-- ── GRUPO: Tipos ───────────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Tipos de input</h3>
        <p class="demo-group-desc">
          El atributo <code>type</code> acepta los mismos valores que el
          <code>&lt;input&gt;</code> nativo de HTML.
        </p>
        <ion-list inset="true">
          <ion-item>
            <ion-label position="stacked">Texto (por defecto)</ion-label>
            <ion-input placeholder="Escribe algo..."></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Email</ion-label>
            <ion-input type="email" placeholder="correo@ejemplo.com"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Contraseña</ion-label>
            <ion-input type="password" placeholder="••••••••"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Número</ion-label>
            <ion-input type="number" min="0" max="100" placeholder="0 – 100"></ion-input>
          </ion-item>
        </ion-list>
      </div>

      <!-- ── GRUPO: Posición del label ──────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Posición del label</h3>
        <p class="demo-group-desc">
          <code>position="stacked"</code> → encima del campo.<br>
          <code>position="floating"</code> → flota al enfocar.<br>
          <code>position="fixed"</code> → siempre visible a la izquierda.
        </p>
        <ion-list inset="true">
          <ion-item>
            <ion-label position="stacked">Stacked</ion-label>
            <ion-input placeholder="Label encima"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Floating</ion-label>
            <ion-input></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="fixed">Fixed</ion-label>
            <ion-input placeholder="Label fijo"></ion-input>
          </ion-item>
        </ion-list>
      </div>

      <!-- ── GRUPO: Estados ─────────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Estados</h3>
        <ion-list inset="true">
          <ion-item>
            <ion-label position="stacked">Solo lectura</ion-label>
            <ion-input value="Valor fijo" readonly="true"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Deshabilitado</ion-label>
            <ion-input value="No editable" disabled="true"></ion-input>
          </ion-item>
        </ion-list>
      </div>

      <!-- ── GRUPO: Demo interactivo ────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Demo interactivo</h3>
        <p class="demo-group-desc">
          Escucha el evento <code>ionInput</code> para reaccionar en tiempo real
          a los cambios del usuario.
        </p>
        <ion-list inset="true">
          <ion-item>
            <ion-label position="stacked">Escribe tu nombre</ion-label>
            <ion-input id="input-live" placeholder="Nombre..."></ion-input>
          </ion-item>
        </ion-list>
        <p style="margin-top:8px;">
          Resultado en tiempo real: <strong id="input-live-output">—</strong>
        </p>
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
  const inputLive = container.querySelector('#input-live');
  const output = container.querySelector('#input-live-output');

  // ionInput se dispara en cada pulsación de tecla, a diferencia de
  // ionChange que solo se dispara al perder el foco.
  inputLive.addEventListener('ionInput', (e) => {
    const valor = e.detail.value || '';
    output.textContent = valor.length ? valor : '—';
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
