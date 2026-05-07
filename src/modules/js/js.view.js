import { appRoot } from '../../shared/dom.js';

export function renderJsSection() {
  appRoot.innerHTML = `
    <section class="page">
      <h2>Bloque JavaScript avanzado</h2>
      <ion-list inset="true">
        <ion-item>
          <ion-label>
            <h3>Closures</h3>
            <p>Encapsulación de estado con funciones.</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <h3>Programación asíncrona</h3>
            <p>Promises, async/await y manejo de errores.</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <h3>Patrones</h3>
            <p>Módulo, Observer y Composición.</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </section>
  `;
}
