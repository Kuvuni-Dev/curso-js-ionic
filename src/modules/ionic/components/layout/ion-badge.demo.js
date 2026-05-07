/**
 * @file ion-badge.demo.js
 * @description Demo didáctico de ion-badge, ion-note, ion-text e ion-label.
 *
 * Estos cuatro componentes son "inline" — se usan dentro de otros componentes
 * (ion-item, ion-button, ion-chip…) para añadir información complementaria,
 * contadores o formato de texto con colores de la paleta Ionic.
 *
 * Documentación oficial:
 *  https://ionicframework.com/docs/api/badge
 *  https://ionicframework.com/docs/api/note
 *  https://ionicframework.com/docs/api/text
 *  https://ionicframework.com/docs/api/label
 */

const CODE_BADGE = `<!-- ion-badge: contador o indicador visual compacto -->

<!-- Dentro de ion-item (slot end = derecha del item) -->
<ion-item>
  <ion-label>Mensajes</ion-label>
  <ion-badge slot="end" color="danger">12</ion-badge>
</ion-item>

<!-- Dentro de ion-button -->
<ion-button>
  Notificaciones
  <ion-badge slot="end" color="warning">3</ion-badge>
</ion-button>

<!-- Colores disponibles -->
<ion-badge color="primary">5</ion-badge>
<ion-badge color="success">✓</ion-badge>
<ion-badge color="danger">!</ion-badge>
<ion-badge color="warning">9+</ion-badge>`;

const CODE_NOTE = `<!-- ion-note: texto secundario en tono gris, más pequeño -->

<!-- Dentro de un ion-item (como subtítulo o metadata) -->
<ion-item>
  <ion-label>
    <h2>Archivo.pdf</h2>
    <ion-note>Modificado hace 2 horas</ion-note>
  </ion-label>
  <ion-note slot="end">2.4 MB</ion-note>
</ion-item>

<!-- Con color explícito -->
<ion-note color="danger">Campo requerido</ion-note>`;

const CODE_TEXT = `<!-- ion-text: aplica un color de la paleta Ionic a cualquier texto -->

<p>
  El estado es
  <ion-text color="success"><strong>activo</strong></ion-text>
  y la conexión es
  <ion-text color="danger">inestable</ion-text>.
</p>

<h2>
  <ion-text color="primary">Bienvenido</ion-text> al curso
</h2>`;

const CODE_LABEL = `<!-- ion-label: etiqueta asociada a controles de formulario -->

<!-- Posición stacked (sobre el input) -->
<ion-item>
  <ion-label position="stacked">Email</ion-label>
  <ion-input type="email"></ion-input>
</ion-item>

<!-- Posición floating (animada, sube al escribir) -->
<ion-item>
  <ion-label position="floating">Contraseña</ion-label>
  <ion-input type="password"></ion-input>
</ion-item>

<!-- Posición fixed (columna izquierda fija) -->
<ion-item>
  <ion-label position="fixed">País</ion-label>
  <ion-select>...</ion-select>
</ion-item>`;

// ─── render() ───────────────────────────────────────────────────────────────
export function render() {
  return `
    <section class="demo-page">

      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-badge · ion-note · ion-text · ion-label</h2>
        <p class="demo-desc">
          Componentes <em>inline</em> que añaden información complementaria dentro
          de otros componentes. Se usan dentro de <code>ion-item</code>,
          <code>ion-button</code>, <code>ion-chip</code> y elementos de texto.
        </p>
      </div>

      <!-- ══════════════════════════════════════════════════════
           ion-badge
      ═══════════════════════════════════════════════════════ -->
      <div class="demo-group">
        <h3 class="demo-group-title">ion-badge</h3>
        <p class="demo-group-desc">
          Muestra un contador o indicador pequeño. Se coloca con
          <code>slot="end"</code> en ion-item o ion-button.
        </p>

        <!-- Colores -->
        <div class="demo-row" style="flex-wrap:wrap;align-items:center;gap:10px;">
          <ion-badge color="primary">1</ion-badge>
          <ion-badge color="secondary">2</ion-badge>
          <ion-badge color="tertiary">3</ion-badge>
          <ion-badge color="success">✓</ion-badge>
          <ion-badge color="warning">9+</ion-badge>
          <ion-badge color="danger">!</ion-badge>
          <ion-badge color="medium">0</ion-badge>
          <ion-badge color="light">new</ion-badge>
        </div>

        <!-- En listas -->
        <ion-list inset="true" style="margin-top:12px;">
          <ion-item>
            <ion-icon slot="start" name="mail-outline" color="primary"></ion-icon>
            <ion-label>Bandeja de entrada</ion-label>
            <ion-badge slot="end" color="danger">12</ion-badge>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" name="notifications-outline" color="warning"></ion-icon>
            <ion-label>Notificaciones</ion-label>
            <ion-badge slot="end" color="warning">3</ion-badge>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" name="chatbubble-outline" color="success"></ion-icon>
            <ion-label>Mensajes</ion-label>
            <ion-badge slot="end" color="success">0</ion-badge>
          </ion-item>
        </ion-list>

        <!-- Demo interactivo: contador con badge -->
        <div style="display:flex;align-items:center;gap:16px;margin-top:12px;flex-wrap:wrap;">
          <ion-button id="badge-btn" color="primary">
            <ion-icon slot="start" name="notifications-outline"></ion-icon>
            Notificaciones
            <ion-badge slot="end" color="danger" id="badge-counter">0</ion-badge>
          </ion-button>
          <ion-button fill="outline" id="badge-reset" size="small">Resetear</ion-button>
        </div>
        <p id="badge-log" style="font-size:0.82rem;opacity:0.6;margin-top:6px;min-height:18px;"></p>

        <pre class="demo-code" style="margin-top:12px;"><code>${escapeHtml(CODE_BADGE)}</code></pre>
      </div>

      <!-- ══════════════════════════════════════════════════════
           ion-note
      ═══════════════════════════════════════════════════════ -->
      <div class="demo-group">
        <h3 class="demo-group-title">ion-note</h3>
        <p class="demo-group-desc">
          Texto secundario en tono apagado. Ideal para metadatos, fechas,
          descripciones breves o mensajes de error en formularios.
        </p>

        <ion-list inset="true">
          <ion-item>
            <ion-icon slot="start" name="document-outline" color="medium"></ion-icon>
            <ion-label>
              <h3>Informe-Q1.pdf</h3>
              <ion-note>Modificado hace 2 horas · PDF</ion-note>
            </ion-label>
            <ion-note slot="end">2.4 MB</ion-note>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" name="image-outline" color="medium"></ion-icon>
            <ion-label>
              <h3>foto-verano.jpg</h3>
              <ion-note color="success">Sincronizado</ion-note>
            </ion-label>
            <ion-note slot="end">1.1 MB</ion-note>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" name="musical-note-outline" color="medium"></ion-icon>
            <ion-label>
              <h3>cancion.mp3</h3>
              <ion-note color="danger">Error al subir</ion-note>
            </ion-label>
            <ion-note slot="end">8.7 MB</ion-note>
          </ion-item>
        </ion-list>

        <pre class="demo-code" style="margin-top:12px;"><code>${escapeHtml(CODE_NOTE)}</code></pre>
      </div>

      <!-- ══════════════════════════════════════════════════════
           ion-text
      ═══════════════════════════════════════════════════════ -->
      <div class="demo-group">
        <h3 class="demo-group-title">ion-text</h3>
        <p class="demo-group-desc">
          Aplica un color de la paleta Ionic a fragmentos de texto en línea
          sin generar estilos CSS adicionales.
        </p>

        <div class="demo-preview" style="padding:16px;font-size:1rem;line-height:1.8;">
          <p>
            Estado del servidor:
            <ion-text color="success"><strong>operativo</strong></ion-text> —
            Última sincronización:
            <ion-text color="medium">hace 5 min</ion-text>
          </p>
          <p>
            <ion-text color="danger">⚠ Atención:</ion-text>
            el contrato vence
            <ion-text color="warning"><strong>mañana</strong></ion-text>.
          </p>
          <p>
            Bienvenido a
            <ion-text color="primary"><strong>Ionic</strong></ion-text>
            — el framework
            <ion-text color="tertiary">multiplataforma</ion-text>.
          </p>
        </div>

        <pre class="demo-code"><code>${escapeHtml(CODE_TEXT)}</code></pre>
      </div>

      <!-- ══════════════════════════════════════════════════════
           ion-label
      ═══════════════════════════════════════════════════════ -->
      <div class="demo-group">
        <h3 class="demo-group-title">ion-label</h3>
        <p class="demo-group-desc">
          Etiqueta asociada a controles de formulario. El atributo
          <code>position</code> controla cómo se coloca respecto al input.
        </p>
        <pre class="demo-code"><code>${escapeHtml(CODE_LABEL)}</code></pre>
      </div>

    </section>
  `;
}

// ─── init() ─────────────────────────────────────────────────────────────────
export function init(container) {
  const counter = container.querySelector('#badge-counter');
  const logEl   = container.querySelector('#badge-log');
  const btn     = container.querySelector('#badge-btn');
  const reset   = container.querySelector('#badge-reset');
  let count = 0;

  btn.addEventListener('click', () => {
    count++;
    counter.textContent = count > 99 ? '99+' : count;
    logEl.textContent = `badge actualizado → ${counter.textContent} notificaciones`;
  });

  reset.addEventListener('click', () => {
    count = 0;
    counter.textContent = '0';
    logEl.textContent = 'badge reseteado → 0';
  });
}

// ─── Utilidad interna ────────────────────────────────────────────────────────
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
