/**
 * @file consola-debug.demo.js
 * @description Demo interactivo: Consola y depuración básica.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Consola y depuración</h2>
      <p class="js-subtitle">
        Practica depuración básica enviando distintos niveles de mensajes a DevTools,
        tal como se hace en un flujo real de desarrollo.
      </p>

      <div class="js-section-title">Laboratorio interactivo</div>

      <div class="js-controls">
        <ion-button size="small" color="primary" id="console-log">console.log/info</ion-button>
        <ion-button size="small" color="warning" id="console-warn">console.warn/error</ion-button>
      </div>

      <div id="console-output" class="js-output" style="min-height:70px;">Abre DevTools (F12) y pulsa un botón.</div>

      <div class="js-section-title">Fragmento base</div>
      <pre class="js-code-panel">console.log('Carga correcta');
console.info('Información de estado');
console.warn('Advertencia de validación');
console.error('Error simulado para depuración');</pre>
    </section>
  `;
}

export function init(root) {
  const out = root.querySelector('#console-output');

  root.querySelector('#console-log').addEventListener('click', () => {
    console.log('Mensaje log: variables cargadas correctamente');
    console.info('Mensaje info: proceso en curso');
    out.innerHTML = 'Se enviaron mensajes log/info a la consola del navegador.';
  });

  root.querySelector('#console-warn').addEventListener('click', () => {
    console.warn('Mensaje warn: valor inesperado');
    console.error('Mensaje error: fallo simulado para depuración');
    out.innerHTML = 'Se enviaron mensajes warn/error a la consola del navegador.';
  });
}
