import { appRoot } from '../../shared/dom.js';

export function renderIonicSection() {
  appRoot.innerHTML = `
    <section class="page">
      <h2>Catálogo de componentes Ionic</h2>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Botones</ion-card-title>
        </ion-card-header>
        <ion-card-content class="component-row">
          <ion-button>Default</ion-button>
          <ion-button color="secondary">Secondary</ion-button>
          <ion-button fill="outline">Outline</ion-button>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Input</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-label position="stacked">Tu nombre</ion-label>
            <ion-input placeholder="Escribe aquí"></ion-input>
          </ion-item>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Lista</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item><ion-label>ion-button</ion-label></ion-item>
            <ion-item><ion-label>ion-input</ion-label></ion-item>
            <ion-item><ion-label>ion-card</ion-label></ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </section>
  `;
}
