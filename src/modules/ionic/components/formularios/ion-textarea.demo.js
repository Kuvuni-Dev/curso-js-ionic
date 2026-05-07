/**
 * @file ion-textarea.demo.js
 * @description Demo didáctico del componente <ion-textarea> de Ionic.
 *
 * ion-textarea es el campo de texto multilínea de Ionic. Admite autosize
 * (crece con el contenido), contador de caracteres, debounce y todos los
 * atributos de <textarea> HTML. Emite ionChange e ionInput.
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/textarea
 */

const CODE_EXAMPLE = `<!-- Textarea básica -->
<ion-item>
  <ion-label position="stacked">Descripción</ion-label>
  <ion-textarea placeholder="Escribe aquí…"></ion-textarea>
</ion-item>

<!-- Con autosize (crece con el contenido) -->
<ion-item>
  <ion-label position="stacked">Bio</ion-label>
  <ion-textarea auto-grow="true" placeholder="Cuéntanos sobre ti…"></ion-textarea>
</ion-item>

<!-- Con maxlength y contador -->
<ion-item counter="true">
  <ion-label position="stacked">Comentario</ion-label>
  <ion-textarea maxlength="200" placeholder="Máx. 200 caracteres"></ion-textarea>
</ion-item>

<!-- Con filas y columnas fijas -->
<ion-item>
  <ion-label position="stacked">Mensaje</ion-label>
  <ion-textarea rows="6" cols="20" placeholder="Texto largo…"></ion-textarea>
</ion-item>

<!-- Solo lectura -->
<ion-item>
  <ion-label position="stacked">Notas del sistema</ion-label>
  <ion-textarea value="Este campo no es editable." readonly="true"></ion-textarea>
</ion-item>

<script>
  const ta = document.querySelector('ion-textarea');

  // ionInput se dispara en cada pulsación de tecla
  ta.addEventListener('ionInput', (e) => {
    console.log('Valor actual:', e.detail.value);
  });

  // ionChange se dispara al perder el foco
  ta.addEventListener('ionChange', (e) => {
    console.log('Valor final:', e.detail.value);
  });
</script>`;

export function render() {
  return `
    <section class="demo-page">

      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-textarea</h2>
        <p class="demo-desc">
          Campo de texto multilínea. Admite <code>auto-grow</code>,
          <code>maxlength</code> con contador y <code>debounce</code>.
          Emite <code>ionInput</code> (cada tecla) e <code>ionChange</code> (al perder foco).
        </p>
      </div>

      <!-- ── GRUPO: Textarea básica ─────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Textarea básica</h3>
        <div class="demo-ta-field">
          <label class="demo-ta-label" for="ta-basic">Descripción</label>
          <textarea id="ta-basic" class="demo-ta" rows="3"
                    placeholder="Escribe aquí…"></textarea>
        </div>
      </div>

      <!-- ── GRUPO: Auto-grow ───────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Auto-grow (<code>auto-grow="true"</code>)</h3>
        <p class="demo-group-desc">
          La textarea crece automáticamente para mostrar todo el contenido
          sin necesidad de scroll interno.
        </p>
        <div class="demo-ta-field">
          <label class="demo-ta-label" for="ta-grow">Bio</label>
          <textarea id="ta-grow" class="demo-ta demo-ta--autogrow" rows="2"
                    placeholder="Cuéntanos sobre ti…&#10;(el campo crece al escribir)"></textarea>
        </div>
      </div>

      <!-- ── GRUPO: Contador de caracteres ─────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Contador de caracteres (<code>counter</code> + <code>maxlength</code>)</h3>
        <p class="demo-group-desc">
          Con <code>counter="true"</code> y <code>maxlength</code> Ionic muestra
          automáticamente el contador al pie del campo.
        </p>
        <div class="demo-ta-field">
          <label class="demo-ta-label" for="ta-count">Comentario</label>
          <textarea id="ta-count" class="demo-ta" rows="3"
                    maxlength="200"
                    placeholder="Máx. 200 caracteres…"></textarea>
          <div class="demo-ta-counter">
            <span id="ta-chars">0</span> / 200
          </div>
        </div>
      </div>

      <!-- ── GRUPO: Demo interactivo ────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Demo interactivo — ionInput vs ionChange</h3>
        <p class="demo-group-desc">
          <code>ionInput</code> se dispara en cada pulsación.
          <code>ionChange</code> solo al perder el foco.
        </p>
        <div class="demo-ta-field">
          <label class="demo-ta-label" for="ta-events">Escribe algo</label>
          <textarea id="ta-events" class="demo-ta" rows="3"
                    placeholder="Escribe y haz clic fuera para ver la diferencia…"></textarea>
        </div>
        <div class="demo-ta-log" id="ta-log">
          <div class="demo-ta-log-row"><span class="demo-ta-log-tag demo-ta-log-tag--input">ionInput</span> esperando…</div>
          <div class="demo-ta-log-row"><span class="demo-ta-log-tag demo-ta-log-tag--change">ionChange</span> esperando…</div>
        </div>
      </div>

      <!-- ── GRUPO: Atributos clave ─────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Atributos clave</h3>
        <div class="demo-attr-table">
          <div class="demo-attr-row">
            <code>auto-grow</code>
            <span>La textarea crece con el contenido. Sin scroll interno.</span>
          </div>
          <div class="demo-attr-row">
            <code>rows</code>
            <span>Número de filas visibles por defecto.</span>
          </div>
          <div class="demo-attr-row">
            <code>maxlength</code>
            <span>Límite de caracteres. Combinado con <code>counter="true"</code> muestra el conteo.</span>
          </div>
          <div class="demo-attr-row">
            <code>debounce</code>
            <span>Retardo en ms antes de emitir <code>ionChange</code>. Útil para llamadas a API.</span>
          </div>
          <div class="demo-attr-row">
            <code>ionInput</code>
            <span>Se dispara en cada cambio (cada tecla).</span>
          </div>
          <div class="demo-attr-row">
            <code>ionChange</code>
            <span>Se dispara al confirmar/perder foco. <code>e.detail.value</code> es el string final.</span>
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
  // ── Auto-grow ──────────────────────────────────────────────
  const taGrow = container.querySelector('#ta-grow');
  taGrow.addEventListener('input', () => {
    taGrow.style.height = 'auto';
    taGrow.style.height = taGrow.scrollHeight + 'px';
  });

  // ── Contador de caracteres ─────────────────────────────────
  const taCount   = container.querySelector('#ta-count');
  const taChars   = container.querySelector('#ta-chars');
  taCount.addEventListener('input', () => {
    const len = taCount.value.length;
    taChars.textContent = len;
    taChars.style.color = len > 180
      ? 'var(--ion-color-danger)'
      : len > 150
        ? 'var(--ion-color-warning)'
        : 'inherit';
  });

  // ── ionInput vs ionChange ──────────────────────────────────
  const taEvents = container.querySelector('#ta-events');
  const taLog    = container.querySelector('#ta-log');

  taEvents.addEventListener('input', (e) => {
    taLog.children[0].innerHTML =
      `<span class="demo-ta-log-tag demo-ta-log-tag--input">ionInput</span>
       valor: <strong>"${escapeHtml(e.target.value.slice(0, 40))}${e.target.value.length > 40 ? '…' : ''}"</strong>
       (${e.target.value.length} chars)`;
  });

  taEvents.addEventListener('blur', (e) => {
    taLog.children[1].innerHTML =
      `<span class="demo-ta-log-tag demo-ta-log-tag--change">ionChange</span>
       valor final: <strong>"${escapeHtml(e.target.value.slice(0, 40))}${e.target.value.length > 40 ? '…' : ''}"</strong>`;
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
