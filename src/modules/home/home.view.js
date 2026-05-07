import { appRoot } from '../../shared/dom.js';

export function renderHome() {
  appRoot.innerHTML = `
    <section class="page hero">
      <h1>Bienvenido al curso</h1>
      <p>Esta aplicación se ejecuta con Live Server y JavaScript puro.</p>
      <div class="cta-grid">
        <ion-button expand="block" onclick="location.hash='#/js'">Ir a JS avanzado</ion-button>
        <ion-button expand="block" color="tertiary" onclick="location.hash='#/ionic'">Ver componentes Ionic</ion-button>
        <ion-button expand="block" color="success" onclick="location.hash='#/docs'">Leer Documentación</ion-button>
      </div>
    </section>
  `;
}
