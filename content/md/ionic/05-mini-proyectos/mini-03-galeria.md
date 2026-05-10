# Mini Proyecto 3: Galería de imágenes

## Objetivo
Mostrar una galería de imágenes en tarjetas con grilla responsive. Al hacer click, se abre un **modal** con la imagen ampliada.

## Conceptos nuevos
- `ion-grid`, `ion-row`, `ion-col`
- `ion-card` con imagen
- `ion-modal` para ver detalle
- Datos simulados (sin API)

## Resultado esperado
```
┌────────────────────────────┐
│ 🖼️ Galería                 │
├────────────────────────────┤
│  [Foto 1]   [Foto 2]       │
│  Montaña    Playa          │
│  [Foto 3]   [Foto 4]       │
│  Ciudad     Bosque         │
└────────────────────────────┘
```

---

## Datos de ejemplo (compartidos en todos los sabores)

```js
const fotos = [
  { id: 1, titulo: 'Montaña', url: 'https://picsum.photos/seed/montana/400/300', descripcion: 'Vista de los Alpes al amanecer.' },
  { id: 2, titulo: 'Playa',   url: 'https://picsum.photos/seed/playa/400/300',   descripcion: 'Costa mediterránea en verano.' },
  { id: 3, titulo: 'Ciudad',  url: 'https://picsum.photos/seed/ciudad/400/300',  descripcion: 'Skyline nocturno de una gran metrópolis.' },
  { id: 4, titulo: 'Bosque',  url: 'https://picsum.photos/seed/bosque/400/300',  descripcion: 'Bosque de pinos en otoño.' },
  { id: 5, titulo: 'Desierto',url: 'https://picsum.photos/seed/desert/400/300',  descripcion: 'Dunas del Sáhara al atardecer.' },
  { id: 6, titulo: 'Nevado',  url: 'https://picsum.photos/seed/nieve/400/300',   descripcion: 'Cumbres nevadas de los Pirineos.' },
];
```

---

## Opción 1: Vanilla JavaScript

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Galería</title>
  <link href="https://cdn.jsdelivr.net/npm/@ionic/core@latest/css/ionic.bundle.css" rel="stylesheet">
  <style>
    ion-card img { width: 100%; height: 160px; object-fit: cover; }
    #modal-img { width: 100%; max-height: 60vh; object-fit: contain; }
  </style>
</head>
<body>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>🖼️ Galería</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-grid id="galeria"></ion-grid>
    </ion-content>

    <!-- Modal de detalle -->
    <ion-modal id="modal-detalle">
      <ion-header>
        <ion-toolbar>
          <ion-title id="modal-titulo"></ion-title>
          <ion-buttons slot="end">
            <ion-button id="btn-cerrar">Cerrar</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <img id="modal-img" src="" alt="">
        <p id="modal-desc" style="margin-top:16px; text-align:center;"></p>
      </ion-content>
    </ion-modal>
  </ion-page>

  <script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core@latest/dist/ionic/ionic.esm.js"></script>
  <script nomodule src="https://cdn.jsdelivr.net/npm/@ionic/core@latest/dist/ionic/ionic.js"></script>

  <script>
    const fotos = [
      { id: 1, titulo: 'Montaña', url: 'https://picsum.photos/seed/montana/400/300', descripcion: 'Vista de los Alpes al amanecer.' },
      { id: 2, titulo: 'Playa',   url: 'https://picsum.photos/seed/playa/400/300',   descripcion: 'Costa mediterránea en verano.' },
      { id: 3, titulo: 'Ciudad',  url: 'https://picsum.photos/seed/ciudad/400/300',  descripcion: 'Skyline nocturno de una gran metrópolis.' },
      { id: 4, titulo: 'Bosque',  url: 'https://picsum.photos/seed/bosque/400/300',  descripcion: 'Bosque de pinos en otoño.' },
      { id: 5, titulo: 'Desierto',url: 'https://picsum.photos/seed/desert/400/300',  descripcion: 'Dunas del Sáhara al atardecer.' },
      { id: 6, titulo: 'Nevado',  url: 'https://picsum.photos/seed/nieve/400/300',   descripcion: 'Cumbres nevadas de los Pirineos.' },
    ];

    const galeria = document.getElementById('galeria');
    const modal = document.getElementById('modal-detalle');

    function abrirModal(foto) {
      document.getElementById('modal-titulo').textContent = foto.titulo;
      document.getElementById('modal-img').src = foto.url;
      document.getElementById('modal-img').alt = foto.titulo;
      document.getElementById('modal-desc').textContent = foto.descripcion;
      modal.present();
    }

    document.getElementById('btn-cerrar').addEventListener('click', () => modal.dismiss());

    // Renderizar grilla de 2 columnas
    let html = '<ion-row>';
    fotos.forEach(foto => {
      html += `
        <ion-col size="6">
          <ion-card button="true" data-id="${foto.id}" style="cursor:pointer;">
            <img src="${foto.url}" alt="${foto.titulo}" loading="lazy">
            <ion-card-header>
              <ion-card-title style="font-size:14px;">${foto.titulo}</ion-card-title>
            </ion-card-header>
          </ion-card>
        </ion-col>
      `;
    });
    html += '</ion-row>';
    galeria.innerHTML = html;

    galeria.querySelectorAll('ion-card').forEach(card => {
      card.addEventListener('click', () => {
        const foto = fotos.find(f => f.id === Number(card.dataset.id));
        if (foto) abrirModal(foto);
      });
    });
  </script>
</body>
</html>
```

---

## Opción 2: React + Ionic

```tsx
import { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle,
  IonModal, IonButton, IonButtons
} from '@ionic/react';

const fotos = [
  { id: 1, titulo: 'Montaña', url: 'https://picsum.photos/seed/montana/400/300', descripcion: 'Vista de los Alpes al amanecer.' },
  { id: 2, titulo: 'Playa',   url: 'https://picsum.photos/seed/playa/400/300',   descripcion: 'Costa mediterránea en verano.' },
  { id: 3, titulo: 'Ciudad',  url: 'https://picsum.photos/seed/ciudad/400/300',  descripcion: 'Skyline nocturno de una gran metrópolis.' },
  { id: 4, titulo: 'Bosque',  url: 'https://picsum.photos/seed/bosque/400/300',  descripcion: 'Bosque de pinos en otoño.' },
  { id: 5, titulo: 'Desierto',url: 'https://picsum.photos/seed/desert/400/300',  descripcion: 'Dunas del Sáhara al atardecer.' },
  { id: 6, titulo: 'Nevado',  url: 'https://picsum.photos/seed/nieve/400/300',   descripcion: 'Cumbres nevadas de los Pirineos.' },
];

const Gallery: React.FC = () => {
  const [fotoSeleccionada, setFotoSeleccionada] = useState(null);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>🖼️ Galería</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            {fotos.map(foto => (
              <IonCol size="6" key={foto.id}>
                <IonCard button onClick={() => setFotoSeleccionada(foto)}>
                  <img src={foto.url} alt={foto.titulo} style={{ width:'100%', height:'160px', objectFit:'cover' }} />
                  <IonCardHeader>
                    <IonCardTitle style={{ fontSize: '14px' }}>{foto.titulo}</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>

      {/* Modal */}
      <IonModal isOpen={!!fotoSeleccionada} onDidDismiss={() => setFotoSeleccionada(null)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{fotoSeleccionada?.titulo}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setFotoSeleccionada(null)}>Cerrar</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {fotoSeleccionada && (
            <>
              <img src={fotoSeleccionada.url} alt={fotoSeleccionada.titulo} style={{ width:'100%' }} />
              <p style={{ textAlign:'center', marginTop:'16px' }}>{fotoSeleccionada.descripcion}</p>
            </>
          )}
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default Gallery;
```

---

## Opción 3: Vue + Ionic

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>🖼️ Galería</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col size="6" v-for="foto in fotos" :key="foto.id">
            <ion-card button @click="seleccionar(foto)">
              <img :src="foto.url" :alt="foto.titulo" style="width:100%; height:160px; object-fit:cover;">
              <ion-card-header>
                <ion-card-title style="font-size:14px;">{{ foto.titulo }}</ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>

    <ion-modal :is-open="!!fotoSeleccionada" @didDismiss="fotoSeleccionada = null">
      <ion-header>
        <ion-toolbar>
          <ion-title>{{ fotoSeleccionada?.titulo }}</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="fotoSeleccionada = null">Cerrar</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <img v-if="fotoSeleccionada" :src="fotoSeleccionada.url" style="width:100%;">
        <p v-if="fotoSeleccionada" style="text-align:center; margin-top:16px;">
          {{ fotoSeleccionada.descripcion }}
        </p>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle,
  IonModal, IonButton, IonButtons
} from '@ionic/vue';

const fotos = [
  { id: 1, titulo: 'Montaña', url: 'https://picsum.photos/seed/montana/400/300', descripcion: 'Vista de los Alpes al amanecer.' },
  { id: 2, titulo: 'Playa',   url: 'https://picsum.photos/seed/playa/400/300',   descripcion: 'Costa mediterránea en verano.' },
  { id: 3, titulo: 'Ciudad',  url: 'https://picsum.photos/seed/ciudad/400/300',  descripcion: 'Skyline nocturno de una gran metrópolis.' },
  { id: 4, titulo: 'Bosque',  url: 'https://picsum.photos/seed/bosque/400/300',  descripcion: 'Bosque de pinos en otoño.' },
  { id: 5, titulo: 'Desierto',url: 'https://picsum.photos/seed/desert/400/300',  descripcion: 'Dunas del Sáhara al atardecer.' },
  { id: 6, titulo: 'Nevado',  url: 'https://picsum.photos/seed/nieve/400/300',   descripcion: 'Cumbres nevadas de los Pirineos.' },
];

const fotoSeleccionada = ref(null);
function seleccionar(foto) { fotoSeleccionada.value = foto; }
</script>
```

---

## Opción 4: Angular + Ionic

### home.page.ts

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle,
  IonModal, IonButton, IonButtons
} from '@ionic/angular/standalone';

interface Foto {
  id: number; titulo: string; url: string; descripcion: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [
    CommonModule, IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle,
    IonModal, IonButton, IonButtons
  ]
})
export class HomePage {
  fotos: Foto[] = [
    { id: 1, titulo: 'Montaña', url: 'https://picsum.photos/seed/montana/400/300', descripcion: 'Vista de los Alpes al amanecer.' },
    { id: 2, titulo: 'Playa',   url: 'https://picsum.photos/seed/playa/400/300',   descripcion: 'Costa mediterránea en verano.' },
    { id: 3, titulo: 'Ciudad',  url: 'https://picsum.photos/seed/ciudad/400/300',  descripcion: 'Skyline nocturno de una gran metrópolis.' },
    { id: 4, titulo: 'Bosque',  url: 'https://picsum.photos/seed/bosque/400/300',  descripcion: 'Bosque de pinos en otoño.' },
    { id: 5, titulo: 'Desierto',url: 'https://picsum.photos/seed/desert/400/300',  descripcion: 'Dunas del Sáhara al atardecer.' },
    { id: 6, titulo: 'Nevado',  url: 'https://picsum.photos/seed/nieve/400/300',   descripcion: 'Cumbres nevadas de los Pirineos.' },
  ];

  fotoSeleccionada: Foto | null = null;
  seleccionar(foto: Foto) { this.fotoSeleccionada = foto; }
  cerrar() { this.fotoSeleccionada = null; }
}
```

### home.page.html

```html
<ion-page>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>🖼️ Galería</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-grid>
      <ion-row>
        <ion-col size="6" *ngFor="let foto of fotos">
          <ion-card button (click)="seleccionar(foto)">
            <img [src]="foto.url" [alt]="foto.titulo" style="width:100%; height:160px; object-fit:cover;">
            <ion-card-header>
              <ion-card-title style="font-size:14px;">{{ foto.titulo }}</ion-card-title>
            </ion-card-header>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>

  <ion-modal [isOpen]="!!fotoSeleccionada" (didDismiss)="cerrar()">
    <ng-template>
      <ion-header>
        <ion-toolbar>
          <ion-title>{{ fotoSeleccionada?.titulo }}</ion-title>
          <ion-buttons slot="end">
            <ion-button (click)="cerrar()">Cerrar</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <img [src]="fotoSeleccionada?.url" style="width:100%;">
        <p style="text-align:center; margin-top:16px;">{{ fotoSeleccionada?.descripcion }}</p>
      </ion-content>
    </ng-template>
  </ion-modal>
</ion-page>
```

---

## Resumen de conceptos nuevos

| Concepto | Implementación por framework |
|---|---|
| **Grilla** | Vanilla: `ion-grid/row/col` + `innerHTML`<br>React: `IonGrid/Row/Col`<br>Vue: `ion-grid/row/col` + `v-for`<br>Angular: `ion-grid/row/col` + `*ngFor` |
| **Modal** | Vanilla: `.present()` / `.dismiss()`<br>React: `isOpen={!!estado}`<br>Vue: `:is-open="!!estado"`<br>Angular: `[isOpen]="!!estado"` |
| **Selección** | Vanilla: `dataset.id` + `find`<br>React: `onClick(() => setState(foto))`<br>Vue: `@click="seleccionar(foto)"`<br>Angular: `(click)="seleccionar(foto)"` |

---

## Próximo mini-proyecto
📍 **Mini 4: Notas CRUD** → CRUD completo con formulario de edición, modal de creación y persistencia en localStorage.
