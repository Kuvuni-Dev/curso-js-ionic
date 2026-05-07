/**
 * @file ion-select.demo.js
 * @description Demo didáctico de <ion-select> e <ion-select-option> de Ionic.
 *
 * ion-select es un selector desplegable que abre una interfaz nativa
 * según la plataforma (alert, action-sheet o popover). Las opciones se
 * definen con <ion-select-option>. Soporta selección simple y múltiple.
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/select
 * https://ionicframework.com/docs/api/select-option
 */

const CODE_EXAMPLE = `<!-- Select básico -->
<ion-item>
  <ion-label>País</ion-label>
  <ion-select placeholder="Seleccionar">
    <ion-select-option value="es">España</ion-select-option>
    <ion-select-option value="mx">México</ion-select-option>
    <ion-select-option value="ar">Argentina</ion-select-option>
  </ion-select>
</ion-item>

<!-- Con valor por defecto -->
<ion-item>
  <ion-label>Moneda</ion-label>
  <ion-select value="eur">
    <ion-select-option value="eur">Euro (€)</ion-select-option>
    <ion-select-option value="usd">Dólar ($)</ion-select-option>
    <ion-select-option value="gbp">Libra (£)</ion-select-option>
  </ion-select>
</ion-item>

<!-- Selección múltiple -->
<ion-item>
  <ion-label>Tecnologías</ion-label>
  <ion-select multiple="true" placeholder="Elegir varias">
    <ion-select-option value="ionic">Ionic</ion-select-option>
    <ion-select-option value="angular">Angular</ion-select-option>
    <ion-select-option value="react">React</ion-select-option>
    <ion-select-option value="vue">Vue</ion-select-option>
  </ion-select>
</ion-item>

<!-- Cambiar interfaz de presentación -->
<ion-item>
  <ion-label>Idioma</ion-label>
  <ion-select interface="popover">
    <ion-select-option value="es">Español</ion-select-option>
    <ion-select-option value="en">English</ion-select-option>
  </ion-select>
</ion-item>

<script>
  const sel = document.querySelector('ion-select');

  // ionChange se dispara al confirmar la selección
  sel.addEventListener('ionChange', (e) => {
    console.log('Valor:', e.detail.value);
  });
</script>`;

/** Genera un wrapper nativo estilizado para simular ion-select. */
function nativeSelect(id, label, options, multiple = false, defaultVal = '') {
  const opts = options.map(o =>
    `<option value="${o.value}" ${o.value === defaultVal ? 'selected' : ''}>${o.label}</option>`
  ).join('\n        ');
  return `
    <div class="demo-sel-row">
      <span class="demo-sel-label">${label}</span>
      <div class="demo-sel-wrap">
        <select id="${id}" class="demo-sel"${multiple ? ' multiple size="4"' : ''}>
          ${opts}
        </select>
        ${!multiple ? '<ion-icon name="chevron-down-outline" class="demo-sel-chevron"></ion-icon>' : ''}
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
        <h2>ion-select / ion-select-option</h2>
        <p class="demo-desc">
          Selector desplegable con interfaz nativa o personalizada.
          Las opciones se definen con <code>&lt;ion-select-option&gt;</code>.
          Soporta selección simple y múltiple. Emite <code>ionChange</code>.
        </p>
      </div>

      <!-- ── GRUPO: Selects básicos ─────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Selects básicos</h3>
        <p class="demo-group-desc">
          La interfaz nativa del navegador simula el comportamiento de
          <code>ion-select</code>. En Ionic real se abre como
          <em>alert</em>, <em>action-sheet</em> o <em>popover</em>.
        </p>
        <div class="demo-sel-list" id="sel-basic-group">
          ${nativeSelect('sel-country', 'País', [
            {value:'',   label:'Seleccionar...'},
            {value:'es', label:'España'},
            {value:'mx', label:'México'},
            {value:'ar', label:'Argentina'},
            {value:'co', label:'Colombia'},
            {value:'cl', label:'Chile'},
          ])}
          ${nativeSelect('sel-currency', 'Moneda', [
            {value:'eur', label:'Euro (€)'},
            {value:'usd', label:'Dólar ($)'},
            {value:'gbp', label:'Libra (£)'},
            {value:'mxn', label:'Peso MXN'},
          ], false, 'eur')}
          ${nativeSelect('sel-lang', 'Idioma', [
            {value:'es', label:'Español'},
            {value:'en', label:'English'},
            {value:'fr', label:'Français'},
            {value:'de', label:'Deutsch'},
          ], false, 'es')}
        </div>
        <div class="demo-sel-feedback" id="sel-feedback">
          Selecciona una opción para ver el valor…
        </div>
      </div>

      <!-- ── GRUPO: Selección múltiple ─────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Selección múltiple (<code>multiple="true"</code>)</h3>
        <p class="demo-group-desc">
          Con <code>multiple</code> el usuario puede elegir varios valores.
          El resultado es un array. En desktops mantén
          <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> para seleccionar múltiples opciones.
        </p>
        ${nativeSelect('sel-techs', 'Tecnologías', [
          {value:'ionic',   label:'Ionic'},
          {value:'angular', label:'Angular'},
          {value:'react',   label:'React'},
          {value:'vue',     label:'Vue'},
          {value:'svelte',  label:'Svelte'},
          {value:'capacitor', label:'Capacitor'},
        ], true)}
        <div class="demo-sel-feedback" id="multi-feedback">
          Ninguna tecnología seleccionada.
        </div>
      </div>

      <!-- ── GRUPO: Interfaz de presentación ───────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Atributo <code>interface</code></h3>
        <div class="demo-attr-table">
          <div class="demo-attr-row">
            <code>alert</code>
            <span>Abre un dialog de alerta con las opciones. <strong>Por defecto.</strong></span>
          </div>
          <div class="demo-attr-row">
            <code>action-sheet</code>
            <span>Abre un action sheet desde abajo. Recomendado en móvil.</span>
          </div>
          <div class="demo-attr-row">
            <code>popover</code>
            <span>Abre un popover cerca del elemento. Ideal en escritorio/tablet.</span>
          </div>
        </div>
      </div>

      <!-- ── GRUPO: Atributos clave ─────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Atributos clave</h3>
        <div class="demo-attr-table">
          <div class="demo-attr-row">
            <code>value</code>
            <span>Valor seleccionado por defecto. Debe coincidir con el <code>value</code> de una opción.</span>
          </div>
          <div class="demo-attr-row">
            <code>multiple</code>
            <span>Permite seleccionar varios ítems. El valor es un array.</span>
          </div>
          <div class="demo-attr-row">
            <code>placeholder</code>
            <span>Texto mostrado cuando no hay selección.</span>
          </div>
          <div class="demo-attr-row">
            <code>interface</code>
            <span>Modo de presentación: <code>alert</code> (defecto) · <code>action-sheet</code> · <code>popover</code></span>
          </div>
          <div class="demo-attr-row">
            <code>ionChange</code>
            <span>Emitido al confirmar. <code>e.detail.value</code> contiene el valor (o array si es múltiple).</span>
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
  // Feedback para selects básicos
  ['sel-country', 'sel-currency', 'sel-lang'].forEach(id => {
    const sel = container.querySelector(`#${id}`);
    if (!sel) return;
    sel.addEventListener('change', () => {
      const val = sel.value;
      const text = val
        ? `ionChange → e.detail.value = <strong>"${val}"</strong>`
        : 'Selecciona una opción para ver el valor…';
      container.querySelector('#sel-feedback').innerHTML = text;
    });
  });

  // Feedback para select múltiple
  const multiSel = container.querySelector('#sel-techs');
  if (multiSel) {
    multiSel.addEventListener('change', () => {
      const selected = [...multiSel.selectedOptions].map(o => o.value);
      const fb = container.querySelector('#multi-feedback');
      fb.innerHTML = selected.length
        ? `ionChange → e.detail.value = <strong>[${selected.map(v => `"${v}"`).join(', ')}]</strong>`
        : 'Ninguna tecnología seleccionada.';
    });
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
