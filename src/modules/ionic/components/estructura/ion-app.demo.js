/**
 * @file ion-app.demo.js
 * @description Demo didáctico de ion-app.
 *
 * ion-app es el elemento raíz de toda aplicación Ionic. Debe ser el primer
 * componente dentro del <body> y solo debe haber uno por página.
 *
 * Responsabilidades de ion-app:
 *  - Aplica el modo global (ios | md) a todos los componentes hijos.
 *  - Gestiona los overlays del sistema (modales, toasts, alerts…).
 *  - Ajusta el safe area en dispositivos con notch (iPhone X, etc.).
 *  - Habilita el controlador de menús (ion-menu-controller).
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/app
 */

const CODE_BASIC = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <!-- viewport con viewport-fit=cover para respetar el notch -->
  <meta name="viewport"
        content="width=device-width, initial-scale=1,
                 viewport-fit=cover" />
  <title>Mi App Ionic</title>

  <!-- Ionic CDN -->
  <script type="module"
    src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js">
  </script>
  <link rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css" />
</head>
<body>

  <!-- ion-app SIEMPRE es el primer hijo del body -->
  <ion-app>

    <ion-header>
      <ion-toolbar>
        <ion-title>Mi App</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <p>Contenido de la app...</p>
    </ion-content>

  </ion-app>

</body>
</html>`;

const CODE_MODE = `<!-- Forzar un modo global (se aplica a TODOS los componentes) -->
<ion-app mode="ios">  <!-- Estilo iOS en cualquier plataforma -->
<ion-app mode="md">   <!-- Estilo Material Design en cualquier plataforma -->

<!-- Si se omite mode, Ionic detecta la plataforma automáticamente -->
<ion-app>`;

/**
 * Safe Area — zonas reservadas por el sistema operativo que el contenido
 * no debe invadir:
 *
 *  iOS (iPhone X y posteriores):
 *    - Parte superior: notch/Dynamic Island + barra de estado (~44–59 px)
 *    - Parte inferior: barra de gestos (~34 px)
 *    - Laterales: en modo landscape, los sensores laterales (~44 px)
 *
 *  Android:
 *    - Parte superior: barra de estado (~24–28 dp) y, opcionalmente, barra
 *      de navegación si está en modo gesture o botones (~48 dp).
 *    - Parte inferior: barra de navegación por gestos o botones.
 *
 * Ionic las expone como variables CSS estándar del navegador:
 *
 *   env(safe-area-inset-top)
 *   env(safe-area-inset-bottom)
 *   env(safe-area-inset-left)
 *   env(safe-area-inset-right)
 *
 * REQUISITO: el viewport DEBE incluir viewport-fit=cover para que
 * el navegador exponga los valores reales en env():
 *
 *   <meta name="viewport"
 *         content="width=device-width, initial-scale=1,
 *                  viewport-fit=cover" />
 *
 * Ionic aplica automáticamente las safe areas al ion-header, ion-footer
 * y ion-content cuando ion-app está presente. En elementos propios (divs
 * flotantes, bottom sheets, FABs) hay que aplicarlas manualmente.
 */

const CODE_SAFE_AREA_CSS = `/* ── Uso manual en CSS ───────────────────────────────────────────

   env() devuelve el valor en px que el SO reserva en cada lado.
   Se usa con un fallback (0px) para navegadores que no lo soporten.

   Ejemplo: un elemento fijo en la parte inferior de la pantalla
   debe sumar el safe area inferior para no quedar bajo la barra
   de gestos de iOS/Android.
*/

.mi-fab-custom {
  position: fixed;
  bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  right:  calc(16px + env(safe-area-inset-right,  0px));
}

.mi-header-custom {
  padding-top: env(safe-area-inset-top, 0px);
}

/* ── Variables CSS de Ionic ──────────────────────────────────────

   Ionic también expone las safe areas como variables propias,
   útiles cuando se trabaja con sus componentes:
*/

:root {
  --ion-safe-area-top:    env(safe-area-inset-top,    0px);
  --ion-safe-area-bottom: env(safe-area-inset-bottom, 0px);
  --ion-safe-area-left:   env(safe-area-inset-left,   0px);
  --ion-safe-area-right:  env(safe-area-inset-right,  0px);
}

/* Uso con la variable de Ionic */
.mi-elemento {
  padding-bottom: var(--ion-safe-area-bottom);
}`;

const CODE_SAFE_AREA_CAPACITOR = `/* ── Con Capacitor (build nativo) ───────────────────────────────

   Capacitor inyecta las safe areas reales del dispositivo
   en el WebView. Las mismas variables env() funcionan igual.

   iOS — la safe area superior varía según el modelo:
     iPhone SE (sin notch)   →  top: 20px
     iPhone X/11/12/13/14    →  top: 44px
     iPhone 14 Pro (island)  →  top: 59px

   Android — depende del launcher y la configuración:
     Con barra de estado estándar  →  top: ~24–28px
     Con barra de navegación       →  bottom: ~48px
     Sin barra (full gesture nav)  →  bottom: 0–16px

   Comprobación en tiempo de ejecución desde JS:
*/

import { SafeArea } from '@capacitor-community/safe-area';

const insets = await SafeArea.getSafeAreaInsets();
console.log(insets.top);    // px superior
console.log(insets.bottom); // px inferior

/* Sin el plugin, también se puede leer via CSS computed: */
const style = getComputedStyle(document.documentElement);
const bottom = style.getPropertyValue('--ion-safe-area-bottom');
console.log('safe-area-bottom:', bottom);`;

const CODE_JS = `// Desde JavaScript se puede acceder al elemento ion-app para:

// 1. Detectar si la app ya está preparada
document.querySelector('ion-app').componentOnReady().then(() => {
  console.log('ion-app listo');
});

// 2. Los overlays (modals, toasts…) se montan como hijos de ion-app
//    automáticamente, sin necesidad de referencia explícita.
const toast = document.createElement('ion-toast');
toast.message = 'Hola desde ion-app';
toast.duration = 2000;
document.querySelector('ion-app').appendChild(toast);
toast.present();`;

/**
 * @returns {string}
 */
export function render() {
  return `
    <section class="demo-page">

      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-app</h2>
        <p class="demo-desc">
          Elemento raíz de toda aplicación Ionic. Debe ser el primer hijo del
          <code>&lt;body&gt;</code>. Gestiona los overlays, el modo visual y el
          safe area del dispositivo.
        </p>
      </div>

      <!-- ── GRUPO: Responsabilidades ──────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">¿Qué hace ion-app?</h3>
        <ion-list inset="true">
          <ion-item>
            <ion-icon slot="start" name="color-palette-outline" color="tertiary"></ion-icon>
            <ion-label>
              <h3>Modo visual global</h3>
              <p>Aplica <code>ios</code> o <code>md</code> a todos los componentes hijos.</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" name="layers-outline" color="primary"></ion-icon>
            <ion-label>
              <h3>Gestión de overlays</h3>
              <p>Modales, toasts, alerts y popovers se montan como hijos de ion-app.</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" name="phone-portrait-outline" color="success"></ion-icon>
            <ion-label>
              <h3>Safe area (notch)</h3>
              <p>Reserva el espacio del notch y la barra de inicio en dispositivos modernos.</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" name="menu-outline" color="warning"></ion-icon>
            <ion-label>
              <h3>Controlador de menús</h3>
              <p>Habilita <code>menuController</code> para gestionar <code>ion-menu</code>.</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>

      <!-- ── GRUPO: Estructura mínima ──────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Estructura mínima de un index.html</h3>
        <p class="demo-group-desc">
          <code>ion-app</code> siempre debe ser el primer elemento dentro de
          <code>&lt;body&gt;</code> para que los overlays funcionen correctamente.
        </p>
        <pre class="demo-code"><code>${escapeHtml(CODE_BASIC)}</code></pre>
      </div>

      <!-- ── GRUPO: Atributo mode ───────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Atributo mode</h3>
        <p class="demo-group-desc">
          Fuerza el estilo visual de todos los componentes. Sin él, Ionic
          detecta la plataforma automáticamente (iOS en Safari/iOS, MD en el resto).
        </p>
        <div class="demo-row">
          <ion-chip color="tertiary">
            <ion-icon name="logo-apple"></ion-icon>
            <ion-label>mode="ios"</ion-label>
          </ion-chip>
          <ion-chip color="primary">
            <ion-icon name="logo-android"></ion-icon>
            <ion-label>mode="md"</ion-label>
          </ion-chip>
        </div>
        <pre class="demo-code" style="margin-top:10px;"><code>${escapeHtml(CODE_MODE)}</code></pre>
      </div>
      <!-- ── GRUPO: Safe Area ────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Safe Area (notch y barra de gestos)</h3>
        <p class="demo-group-desc">
          Las <strong>safe areas</strong> son zonas reservadas por iOS y Android
          que el contenido no debe invadir (notch, Dynamic Island, barra de gestos).
          Ionic las gestiona automáticamente en sus componentes, pero en elementos
          propios hay que aplicarlas manualmente con <code>env()</code>.
        </p>

        <!-- Diagrama visual de safe areas -->
        <div class="demo-safe-area-diagram">
          <div class="demo-safe-area-diagram__top">
            <span>env(safe-area-inset-top)</span>
            <ion-chip color="warning" style="pointer-events:none;height:22px;font-size:0.7rem;">
              <ion-label>notch / status bar</ion-label>
            </ion-chip>
          </div>
          <div class="demo-safe-area-diagram__sides">
            <div class="demo-safe-area-diagram__left">
              <span style="writing-mode:vertical-lr;transform:rotate(180deg);font-size:0.7rem;">
                inset-left
              </span>
            </div>
            <div class="demo-safe-area-diagram__content">
              <p style="text-align:center;opacity:0.6;font-size:0.85rem;">Zona segura<br/>del contenido</p>
            </div>
            <div class="demo-safe-area-diagram__right">
              <span style="writing-mode:vertical-lr;font-size:0.7rem;">
                inset-right
              </span>
            </div>
          </div>
          <div class="demo-safe-area-diagram__bottom">
            <ion-chip color="warning" style="pointer-events:none;height:22px;font-size:0.7rem;">
              <ion-label>gesture bar / nav bar</ion-label>
            </ion-chip>
            <span>env(safe-area-inset-bottom)</span>
          </div>
        </div>

        <!-- Tabla iOS vs Android -->
        <ion-list inset="true" style="margin-top:12px;">
          <ion-item>
            <ion-icon slot="start" name="logo-apple" color="tertiary"></ion-icon>
            <ion-label>
              <h3>iOS (iPhone X y posteriores)</h3>
              <p>Superior: ~44–59 px (notch / Dynamic Island). Inferior: ~34 px (barra de gestos). Laterales en landscape: ~44 px.</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" name="logo-android" color="success"></ion-icon>
            <ion-label>
              <h3>Android</h3>
              <p>Superior: ~24–28 dp (status bar). Inferior: 0–48 dp según el modo de navegación (gestos vs botones).</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" name="globe-outline" color="primary"></ion-icon>
            <ion-label>
              <h3>Web (Live Server / PWA)</h3>
              <p>Los valores de <code>env()</code> son 0 en navegadores de escritorio. Se ven los valores reales solo en dispositivo real o simulador.</p>
            </ion-label>
          </ion-item>
        </ion-list>

        <p class="demo-group-desc" style="margin-top:10px;">
          ⚠️ El viewport <strong>debe</strong> incluir <code>viewport-fit=cover</code>
          para que <code>env()</code> devuelva los valores reales.
        </p>
        <pre class="demo-code"><code>${escapeHtml(CODE_SAFE_AREA_CSS)}</code></pre>
      </div>

      <!-- ── GRUPO: Safe Area con Capacitor ─────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Safe Area en builds nativos (Capacitor)</h3>
        <p class="demo-group-desc">
          Al compilar con Capacitor los valores reales del dispositivo se inyectan
          en el WebView. Las mismas variables <code>env()</code> funcionan,
          y existen plugins para leerlos desde JavaScript.
        </p>
        <pre class="demo-code"><code>${escapeHtml(CODE_SAFE_AREA_CAPACITOR)}</code></pre>
      </div>
      <!-- ── GRUPO: Acceso desde JS ─────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Acceso desde JavaScript</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_JS)}</code></pre>
      </div>

    </section>
  `;
}

/** @param {HTMLElement} _container */
export function init(_container) {}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
