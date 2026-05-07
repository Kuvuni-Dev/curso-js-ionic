/**
 * @file ion-progress-bar.demo.js
 * @description Demo didáctico del componente <ion-progress-bar> de Ionic.
 *
 * ion-progress-bar muestra el progreso de una operación. Tiene dos modos:
 *  - determinate:   se conoce el porcentaje de avance (0-1)
 *  - indeterminate: la duración es desconocida (animación infinita)
 * También soporta un modo "buffer" para streaming/prefetch.
 *
 * Documentación oficial: https://ionicframework.com/docs/api/progress-bar
 */

// NOTA CDN: ion-progress-bar carga chunks adicionales del CDN de Ionic.
// Los previews usan divs con CSS equivalente; el código real va en bloques pre.

const CODE_BASICO = `<!-- Modo determinate: valor entre 0 y 1 -->
<ion-progress-bar value="0.5"></ion-progress-bar>   <!-- 50% -->
<ion-progress-bar value="0.75"></ion-progress-bar>  <!-- 75% -->
<ion-progress-bar value="1"></ion-progress-bar>     <!-- 100% completo -->

<!-- Modo indeterminate: la barra se anima infinitamente -->
<ion-progress-bar type="indeterminate"></ion-progress-bar>

<!-- Modo buffer: barra de progreso + barra de precarga -->
<ion-progress-bar type="buffer" value="0.4" buffer="0.7"></ion-progress-bar>`;

const CODE_COLOR = `<!-- Colores -->
<ion-progress-bar value="0.6" color="primary"></ion-progress-bar>
<ion-progress-bar value="0.6" color="success"></ion-progress-bar>
<ion-progress-bar value="0.6" color="warning"></ion-progress-bar>
<ion-progress-bar value="0.6" color="danger"></ion-progress-bar>

<!-- Invertida: el progreso va de derecha a izquierda -->
<ion-progress-bar value="0.6" reversed="true"></ion-progress-bar>`;

const CODE_JS = `// Actualizar el valor desde JavaScript
const bar = document.querySelector('ion-progress-bar');

// Simular carga progresiva
let progress = 0;
const interval = setInterval(() => {
  progress += 0.05;
  bar.value = Math.min(progress, 1);

  if (progress >= 1) {
    clearInterval(interval);
    console.log('Carga completa');
  }
}, 200);

// Cambiar de modo dinámicamente
bar.type = 'indeterminate'; // durante la espera
bar.type = 'determinate';   // cuando se conoce el progreso`;

const CODE_CSS_VAR = `/* Variables CSS de ion-progress-bar */
ion-progress-bar {
  --progress-background: var(--ion-color-primary);  /* color de la barra */
  --buffer-background:   rgba(var(--ion-color-primary-rgb), 0.2);
  --background:          rgba(var(--ion-color-primary-rgb), 0.1);
  height: 8px;          /* grosor de la barra (no hay variable, se usa CSS directo) */
  border-radius: 4px;
}`;

// ─── render() ───────────────────────────────────────────────────────────────
export function render() {
  return `
    <section class="demo-page">

      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-progress-bar</h2>
        <p class="demo-desc">
          Barra de progreso horizontal. Soporta tres modos:
          <em>determinate</em> (porcentaje conocido),
          <em>indeterminate</em> (duración desconocida) y
          <em>buffer</em> (progreso + precarga, típico en streaming).
        </p>
      </div>

      <!-- ── GRUPO: Modos ───────────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Los tres modos</h3>

        <!-- Determinate -->
        <p class="demo-group-desc"><strong>determinate</strong> — porcentaje conocido (value: 0–1)</p>
        <div class="demo-pb-row">
          <div class="demo-pb-track"><div class="demo-pb-fill" style="width:25%;background:var(--ion-color-primary);"></div></div>
          <span class="demo-pb-label">25%</span>
        </div>
        <div class="demo-pb-row">
          <div class="demo-pb-track"><div class="demo-pb-fill" style="width:60%;background:var(--ion-color-primary);"></div></div>
          <span class="demo-pb-label">60%</span>
        </div>
        <div class="demo-pb-row">
          <div class="demo-pb-track"><div class="demo-pb-fill" style="width:100%;background:var(--ion-color-success);"></div></div>
          <span class="demo-pb-label">100%</span>
        </div>

        <!-- Indeterminate -->
        <p class="demo-group-desc" style="margin-top:12px;"><strong>indeterminate</strong> — duración desconocida (animación infinita)</p>
        <div class="demo-pb-row">
          <div class="demo-pb-track demo-pb-track--indeterminate">
            <div class="demo-pb-indeterminate"></div>
          </div>
          <span class="demo-pb-label">∞</span>
        </div>

        <!-- Buffer -->
        <p class="demo-group-desc" style="margin-top:12px;"><strong>buffer</strong> — progreso + zona de precarga (streaming)</p>
        <div class="demo-pb-row">
          <div class="demo-pb-track" style="position:relative;overflow:hidden;">
            <div class="demo-pb-fill" style="width:70%;background:color-mix(in srgb, var(--ion-color-primary) 30%, transparent);"></div>
            <div class="demo-pb-fill" style="width:40%;background:var(--ion-color-primary);position:absolute;left:0;top:0;height:100%;"></div>
          </div>
          <span class="demo-pb-label">buffer</span>
        </div>

        <pre class="demo-code" style="margin-top:12px;"><code>${escapeHtml(CODE_BASICO)}</code></pre>
      </div>

      <!-- ── GRUPO: Colores ─────────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Colores</h3>
        ${['primary','secondary','success','warning','danger'].map((c) => `
          <div class="demo-pb-row" style="margin-bottom:6px;">
            <div class="demo-pb-track">
              <div class="demo-pb-fill" style="width:65%;background:var(--ion-color-${c});"></div>
            </div>
            <span class="demo-pb-label" style="color:var(--ion-color-${c});">${c}</span>
          </div>
        `).join('')}
        <pre class="demo-code" style="margin-top:12px;"><code>${escapeHtml(CODE_COLOR)}</code></pre>
      </div>

      <!-- ── GRUPO: Demo interactivo ────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Demo interactivo</h3>
        <p class="demo-group-desc">Simula operaciones con los distintos modos de la barra.</p>

        <!-- Barra de demo -->
        <div class="demo-pb-row" style="margin-bottom:12px;">
          <div class="demo-pb-track demo-pb-track--tall" id="demo-pb-track">
            <div id="demo-pb-fill"       class="demo-pb-fill" style="width:0%;background:var(--ion-color-primary);transition:width 0.3s;"></div>
            <div id="demo-pb-indeterminate-el" class="demo-pb-indeterminate" style="display:none;"></div>
          </div>
          <span class="demo-pb-label" id="demo-pb-pct">0%</span>
        </div>
        <p id="demo-pb-status" style="text-align:center;font-size:0.82rem;opacity:0.6;min-height:18px;margin-bottom:12px;"></p>

        <div class="demo-row" style="flex-wrap:wrap;gap:8px;justify-content:center;">
          <ion-button id="pb-btn-load" size="small" color="primary">
            <ion-icon slot="start" name="cloud-download-outline"></ion-icon>
            Simular descarga
          </ion-button>
          <ion-button id="pb-btn-indet" size="small" color="warning" fill="outline">
            <ion-icon slot="start" name="refresh-outline"></ion-icon>
            Indeterminate
          </ion-button>
          <ion-button id="pb-btn-reset" size="small" color="medium" fill="outline">
            <ion-icon slot="start" name="close-outline"></ion-icon>
            Resetear
          </ion-button>
        </div>
      </div>

      <!-- ── GRUPO: Control desde JS ───────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Control desde JavaScript</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_JS)}</code></pre>
      </div>

      <!-- ── GRUPO: CSS variables ───────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Personalización con CSS</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_CSS_VAR)}</code></pre>
      </div>

    </section>
  `;
}

// ─── init() ─────────────────────────────────────────────────────────────────
export function init(container) {
  const fill    = container.querySelector('#demo-pb-fill');
  const indet   = container.querySelector('#demo-pb-indeterminate-el');
  const pctEl   = container.querySelector('#demo-pb-pct');
  const status  = container.querySelector('#demo-pb-status');
  const btnLoad = container.querySelector('#pb-btn-load');
  const btnIndet= container.querySelector('#pb-btn-indet');
  const btnReset= container.querySelector('#pb-btn-reset');

  let intervalId = null;
  let running    = false;

  function reset() {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
    running = false;
    fill.style.display = '';
    fill.style.width   = '0%';
    fill.style.background = 'var(--ion-color-primary)';
    indet.style.display   = 'none';
    pctEl.textContent     = '0%';
    status.textContent    = '';
    btnLoad.disabled  = false;
    btnIndet.disabled = false;
  }

  btnLoad.addEventListener('click', () => {
    if (running) return;
    reset();
    running = true;
    btnLoad.disabled  = true;
    btnIndet.disabled = true;
    let val = 0;
    status.textContent = 'type="determinate" — descargando…';
    intervalId = setInterval(() => {
      val += Math.random() * 0.06 + 0.02;
      val = Math.min(val, 1);
      fill.style.width  = `${(val * 100).toFixed(1)}%`;
      pctEl.textContent = `${Math.round(val * 100)}%`;
      if (val >= 1) {
        clearInterval(intervalId);
        intervalId = null;
        running = false;
        fill.style.background = 'var(--ion-color-success)';
        status.textContent = 'Completado — value = 1';
        btnLoad.disabled  = false;
        btnIndet.disabled = false;
      }
    }, 150);
  });

  btnIndet.addEventListener('click', () => {
    if (running) return;
    reset();
    running = true;
    btnLoad.disabled  = true;
    btnIndet.disabled = true;
    fill.style.display    = 'none';
    indet.style.display   = '';
    pctEl.textContent     = '∞';
    status.textContent    = 'type="indeterminate" — operación en curso…';
    intervalId = setTimeout(() => {
      reset();
      status.textContent = 'Operación finalizada';
    }, 4000);
  });

  btnReset.addEventListener('click', reset);
}

// ─── Utilidad interna ────────────────────────────────────────────────────────
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
