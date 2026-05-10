# Mini Proyecto 5: Consumo de API

## Objetivo
Obtener datos reales de una **API pública** usando `fetch` y `async/await`. Gestionar los estados de carga, datos y error.

## Conceptos nuevos
- `fetch` + `async/await`
- Estados: `loading`, `data`, `error`
- `ion-spinner` para indicar carga
- `try/catch` para manejo de errores
- API pública: `https://jsonplaceholder.typicode.com/posts`

## Resultado esperado
```
┌─────────────────────────────┐
│ 🌐 Posts                [🔄]│
├─────────────────────────────┤
│ ⏳ Cargando...              │  ← estado loading
├─────────────────────────────┤
│ ┌───────────────────────┐   │
│ │ Post título #1        │   │  ← datos cargados
│ │ Texto del post...     │   │
│ └───────────────────────┘   │
│ ...                         │
└─────────────────────────────┘
```

---

## API de ejemplo

Usamos [JSONPlaceholder](https://jsonplaceholder.typicode.com), una API pública gratuita sin clave:

```
GET https://jsonplaceholder.typicode.com/posts
```

Devuelve un array de objetos:
```json
[
  { "userId": 1, "id": 1, "title": "...", "body": "..." },
  ...
]
```

---

## Opción 1: Vanilla JavaScript

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Consumo de API</title>
  <link href="https://cdn.jsdelivr.net/npm/@ionic/core@latest/css/ionic.bundle.css" rel="stylesheet">
</head>
<body>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>🌐 Posts</ion-title>
        <ion-buttons slot="end">
          <ion-button id="btn-reload">
            <ion-icon name="refresh" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding" id="content">
      <!-- El contenido se inyecta aquí -->
    </ion-content>
  </ion-page>

  <script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core@latest/dist/ionic/ionic.esm.js"></script>
  <script nomodule src="https://cdn.jsdelivr.net/npm/@ionic/core@latest/dist/ionic/ionic.js"></script>

  <script>
    const API = 'https://jsonplaceholder.typicode.com/posts';
    const content = document.getElementById('content');

    function mostrarCargando() {
      content.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; margin-top:60px; gap:16px;">
          <ion-spinner name="crescent"></ion-spinner>
          <p style="color:#888;">Cargando posts...</p>
        </div>
      `;
    }

    function mostrarError(mensaje) {
      content.innerHTML = `
        <div style="text-align:center; margin-top:60px; color:#eb445a;">
          <ion-icon name="alert-circle" style="font-size:48px;"></ion-icon>
          <p>${mensaje}</p>
          <ion-button onclick="cargar()">Reintentar</ion-button>
        </div>
      `;
    }

    function mostrarPosts(posts) {
      content.innerHTML = posts.slice(0, 20).map(post => `
        <ion-card>
          <ion-card-header>
            <ion-card-subtitle>Post #${post.id}</ion-card-subtitle>
            <ion-card-title style="font-size:16px; text-transform:capitalize;">
              ${post.title}
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>${post.body}</ion-card-content>
        </ion-card>
      `).join('');
    }

    async function cargar() {
      mostrarCargando();
      try {
        const respuesta = await fetch(API);
        if (!respuesta.ok) throw new Error(`Error ${respuesta.status}`);
        const posts = await respuesta.json();
        mostrarPosts(posts);
      } catch (error) {
        mostrarError('No se pudieron cargar los posts. Verifica tu conexión.');
        console.error(error);
      }
    }

    document.getElementById('btn-reload').addEventListener('click', cargar);
    cargar(); // Cargar al iniciar
  </script>
</body>
</html>
```

---

## Opción 2: React + Ionic

```tsx
import { useState, useEffect } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonCardContent, IonSpinner
} from '@ionic/react';
import { refresh } from 'ionicons/icons';

const API = 'https://jsonplaceholder.typicode.com/posts';

interface Post { id: number; title: string; body: string; }

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargar = async () => {
    setCargando(true);
    setError(null);
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const datos: Post[] = await res.json();
      setPosts(datos.slice(0, 20));
    } catch (err) {
      setError('No se pudieron cargar los posts. Verifica tu conexión.');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { cargar(); }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>🌐 Posts</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={cargar} disabled={cargando}>
              <IonIcon icon={refresh} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {cargando && (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', marginTop:'60px', gap:'16px' }}>
            <IonSpinner name="crescent" />
            <p style={{ color:'#888' }}>Cargando posts...</p>
          </div>
        )}

        {error && !cargando && (
          <div style={{ textAlign:'center', marginTop:'60px', color:'#eb445a' }}>
            <p>{error}</p>
            <IonButton onClick={cargar}>Reintentar</IonButton>
          </div>
        )}

        {!cargando && !error && posts.map(post => (
          <IonCard key={post.id}>
            <IonCardHeader>
              <IonCardSubtitle>Post #{post.id}</IonCardSubtitle>
              <IonCardTitle style={{ fontSize:'16px' }}>{post.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{post.body}</IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
```

### Patrón de 3 estados
```tsx
// Los 3 estados para cualquier petición a una API:
const [cargando, setCargando] = useState(false);  // ¿Está cargando?
const [error, setError]       = useState(null);   // ¿Hubo un error?
const [datos, setDatos]       = useState([]);     // ¿Qué datos tenemos?
```

---

## Opción 3: Vue + Ionic

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>🌐 Posts</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="cargar" :disabled="cargando">
            <ion-icon :icon="refreshIcon" slot="icon-only" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Estado: cargando -->
      <div v-if="cargando" style="display:flex; flex-direction:column; align-items:center; margin-top:60px; gap:16px;">
        <ion-spinner name="crescent" />
        <p style="color:#888;">Cargando posts...</p>
      </div>

      <!-- Estado: error -->
      <div v-else-if="error" style="text-align:center; margin-top:60px; color:#eb445a;">
        <p>{{ error }}</p>
        <ion-button @click="cargar">Reintentar</ion-button>
      </div>

      <!-- Estado: datos -->
      <template v-else>
        <ion-card v-for="post in posts" :key="post.id">
          <ion-card-header>
            <ion-card-subtitle>Post #{{ post.id }}</ion-card-subtitle>
            <ion-card-title style="font-size:16px;">{{ post.title }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>{{ post.body }}</ion-card-content>
        </ion-card>
      </template>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { refresh as refreshIcon } from 'ionicons/icons';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonCardContent, IonSpinner
} from '@ionic/vue';

const API = 'https://jsonplaceholder.typicode.com/posts';
const posts = ref([]);
const cargando = ref(false);
const error = ref(null);

async function cargar() {
  cargando.value = true;
  error.value = null;
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    const datos = await res.json();
    posts.value = datos.slice(0, 20);
  } catch (err) {
    error.value = 'No se pudieron cargar los posts. Verifica tu conexión.';
    console.error(err);
  } finally {
    cargando.value = false;
  }
}

// onMounted: equivale a useEffect(fn, []) en React
onMounted(() => cargar());
</script>
```

---

## Opción 4: Angular + Ionic

### home.page.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonCardContent, IonSpinner
} from '@ionic/angular/standalone';

interface Post { id: number; title: string; body: string; }

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [
    CommonModule, IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonCardContent, IonSpinner
  ]
})
export class HomePage implements OnInit {
  posts: Post[] = [];
  cargando = false;
  error: string | null = null;

  readonly API = 'https://jsonplaceholder.typicode.com/posts';

  ngOnInit() { this.cargar(); }

  async cargar() {
    this.cargando = true;
    this.error = null;
    try {
      const res = await fetch(this.API);
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const datos: Post[] = await res.json();
      this.posts = datos.slice(0, 20);
    } catch (err) {
      this.error = 'No se pudieron cargar los posts. Verifica tu conexión.';
      console.error(err);
    } finally {
      this.cargando = false;
    }
  }
}
```

### home.page.html

```html
<ion-page>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>🌐 Posts</ion-title>
      <ion-buttons slot="end">
        <ion-button (click)="cargar()" [disabled]="cargando">
          <ion-icon name="refresh" slot="icon-only"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <!-- Estado: cargando -->
    <div *ngIf="cargando" style="display:flex; flex-direction:column; align-items:center; margin-top:60px; gap:16px;">
      <ion-spinner name="crescent"></ion-spinner>
      <p style="color:#888;">Cargando posts...</p>
    </div>

    <!-- Estado: error -->
    <div *ngIf="error && !cargando" style="text-align:center; margin-top:60px; color:#eb445a;">
      <p>{{ error }}</p>
      <ion-button (click)="cargar()">Reintentar</ion-button>
    </div>

    <!-- Estado: datos -->
    <ng-container *ngIf="!cargando && !error">
      <ion-card *ngFor="let post of posts">
        <ion-card-header>
          <ion-card-subtitle>Post #{{ post.id }}</ion-card-subtitle>
          <ion-card-title style="font-size:16px;">{{ post.title }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>{{ post.body }}</ion-card-content>
      </ion-card>
    </ng-container>
  </ion-content>
</ion-page>
```

> **Nota**: En proyectos Angular de producción se usa `HttpClient` en lugar de `fetch` nativo, ya que se integra mejor con el sistema de inyección de dependencias y permite el uso de interceptores.

---

## Resumen de conceptos nuevos

| Concepto | Implementación por framework |
|---|---|
| **Fetch inicial** | Vanilla: llamada directa al cargar<br>React: `useEffect(fn, [])`<br>Vue: `onMounted(fn)`<br>Angular: `ngOnInit()` |
| **Estado cargando** | Vanilla: `innerHTML = spinner`<br>React: `useState(false)`<br>Vue: `ref(false)`<br>Angular: propiedad de clase |
| **Manejo de error** | Vanilla: `try/catch` + `innerHTML`<br>React: `useState(null)`<br>Vue: `ref(null)`<br>Angular: propiedad de clase |
| **Render condicional** | Vanilla: manual con `if`<br>React: ternario JSX<br>Vue: `v-if/v-else-if/v-else`<br>Angular: `*ngIf` |
| **Reintentar** | Vanilla: `onclick="cargar()"`<br>React: `onClick={cargar}`<br>Vue: `@click="cargar"`<br>Angular: `(click)="cargar()"` |

---

## Has completado los 5 mini-proyectos

| Mini-proyecto | Conceptos principales |
|---|---|
| **Mini 1**: Todo simple | Estado, render, eventos |
| **Mini 2**: Todo con localStorage | Persistencia, efectos secundarios |
| **Mini 3**: Galería | Cards, grilla responsive, modales |
| **Mini 4**: Notas CRUD | Create/Read/Update/Delete, formularios |
| **Mini 5**: Consumo de API | fetch, async/await, estados loading/error/data |

¡Ahora estás listo para construir aplicaciones Ionic reales con cualquiera de los 4 frameworks!
