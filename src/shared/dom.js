export const appRoot = document.querySelector('#app');

export function renderNotFound() {
  appRoot.innerHTML = `
    <section class="page">
      <h2>Ruta no encontrada</h2>
      <ion-button onclick="location.hash='#/home'">Volver al inicio</ion-button>
    </section>
  `;
}
