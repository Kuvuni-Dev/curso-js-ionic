# Mini Proyecto 1: App Todo Simple

## Objetivo
Crear una lista de tareas donde el usuario pueda **agregar** y **eliminar** tareas. Sin almacenamiento persistente (al recargar se pierde todo).

## Conceptos que practicarás
- ion-input, ion-button, ion-list, ion-item
- addEventListener, eventos de teclado
- Manipulación del DOM
- Arrays y renderizado dinámico

## Resultado esperado
```
┌───────────────────────────┐
│ ✅ Mis Tareas              │
├───────────────────────────┤
│ [Nueva tarea...   ] [+ ]   │
├───────────────────────────┤
│ ☐  Estudiar Ionic     [🗑] │
│ ☐  Hacer ejercicio    [🗑] │
│ ☐  Comprar pan        [🗑] │
└───────────────────────────┘
```

---

## Opción 1: Vanilla JavaScript

### Código completo

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo Simple</title>
  <link href="https://cdn.jsdelivr.net/npm/@ionic/core@latest/css/ionic.bundle.css" rel="stylesheet">
</head>
<body>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>✅ Mis Tareas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Formulario de entrada -->
      <ion-item>
        <ion-input id="input-tarea" placeholder="Nueva tarea..."></ion-input>
        <ion-button id="btn-agregar" slot="end" color="primary">
          <ion-icon name="add"></ion-icon>
        </ion-button>
      </ion-item>

      <!-- Lista de tareas -->
      <ion-list id="lista-tareas"></ion-list>

      <!-- Mensaje vacío -->
      <p id="mensaje-vacio" style="text-align:center; color: #aaa;">
        No tienes tareas. ¡Agrega una!
      </p>
    </ion-content>
  </ion-page>

  <script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core@latest/dist/ionic/ionic.esm.js"></script>
  <script nomodule src="https://cdn.jsdelivr.net/npm/@ionic/core@latest/dist/ionic/ionic.js"></script>

  <script>
    let tareas = [];

    function agregarTarea() {
      const input = document.getElementById('input-tarea');
      const texto = input.value.trim();
      if (!texto) return;

      tareas.push({ id: Date.now(), texto });
      input.value = '';
      renderizar();
    }

    function eliminarTarea(id) {
      tareas = tareas.filter(t => t.id !== id);
      renderizar();
    }

    function renderizar() {
      const lista = document.getElementById('lista-tareas');
      const mensaje = document.getElementById('mensaje-vacio');

      mensaje.style.display = tareas.length === 0 ? 'block' : 'none';
      lista.innerHTML = '';

      tareas.forEach(tarea => {
        const item = document.createElement('ion-item');
        item.innerHTML = `
          <ion-checkbox slot="start"></ion-checkbox>
          <ion-label>${tarea.texto}</ion-label>
          <ion-button slot="end" fill="clear" color="danger" class="btn-del" data-id="${tarea.id}">
            <ion-icon name="trash"></ion-icon>
          </ion-button>
        `;
        lista.appendChild(item);
      });

      document.querySelectorAll('.btn-del').forEach(btn => {
        btn.addEventListener('click', () => eliminarTarea(Number(btn.dataset.id)));
      });
    }

    document.getElementById('btn-agregar').addEventListener('click', agregarTarea);
    document.getElementById('input-tarea').addEventListener('keypress', e => {
      if (e.key === 'Enter') agregarTarea();
    });

    renderizar();
  </script>
</body>
</html>
```

---

## Opción 2: React + Ionic

### Instalación previa
```bash
ionic start mini-todo-react blank --type react
cd mini-todo-react
npm start
```

### src/pages/Home.tsx

```tsx
import { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonItem, IonInput, IonButton,
  IonIcon, IonList, IonLabel, IonCheckbox
} from '@ionic/react';
import { add, trash } from 'ionicons/icons';

interface Tarea {
  id: number;
  texto: string;
}

const Home: React.FC = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [texto, setTexto] = useState('');

  const agregarTarea = () => {
    if (!texto.trim()) return;
    setTareas([...tareas, { id: Date.now(), texto }]);
    setTexto('');
  };

  const eliminarTarea = (id: number) => {
    setTareas(tareas.filter(t => t.id !== id));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>✅ Mis Tareas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            value={texto}
            placeholder="Nueva tarea..."
            onIonInput={e => setTexto(e.detail.value!)}
            onKeyPress={e => e.key === 'Enter' && agregarTarea()}
          />
          <IonButton slot="end" onClick={agregarTarea}>
            <IonIcon icon={add} />
          </IonButton>
        </IonItem>

        {tareas.length === 0 && (
          <p style={{ textAlign: 'center', color: '#aaa' }}>
            No tienes tareas. ¡Agrega una!
          </p>
        )}

        <IonList>
          {tareas.map(tarea => (
            <IonItem key={tarea.id}>
              <IonCheckbox slot="start" />
              <IonLabel>{tarea.texto}</IonLabel>
              <IonButton slot="end" fill="clear" color="danger" onClick={() => eliminarTarea(tarea.id)}>
                <IonIcon icon={trash} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
```

### Diferencias clave con Vanilla
- El estado se gestiona con `useState` en lugar de arrays manuales
- La UI se **rerenderiza automáticamente** al cambiar el estado
- No necesitas `renderizar()` ni `innerHTML`

---

## Opción 3: Vue + Ionic

### Instalación previa
```bash
ionic start mini-todo-vue blank --type vue
cd mini-todo-vue
npm run dev
```

### src/views/HomePage.vue

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>✅ Mis Tareas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item>
        <ion-input
          v-model="nuevaTarea"
          placeholder="Nueva tarea..."
          @keypress.enter="agregarTarea"
        />
        <ion-button slot="end" @click="agregarTarea">
          <ion-icon :icon="addIcon" />
        </ion-button>
      </ion-item>

      <p v-if="tareas.length === 0" style="text-align:center; color:#aaa;">
        No tienes tareas. ¡Agrega una!
      </p>

      <ion-list>
        <ion-item v-for="tarea in tareas" :key="tarea.id">
          <ion-checkbox slot="start" />
          <ion-label>{{ tarea.texto }}</ion-label>
          <ion-button slot="end" fill="clear" color="danger" @click="eliminarTarea(tarea.id)">
            <ion-icon :icon="trashIcon" />
          </ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { add as addIcon, trash as trashIcon } from 'ionicons/icons';
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonItem, IonInput, IonButton,
  IonIcon, IonList, IonLabel, IonCheckbox
} from '@ionic/vue';

const tareas = ref([]);
const nuevaTarea = ref('');

function agregarTarea() {
  if (!nuevaTarea.value.trim()) return;
  tareas.value.push({ id: Date.now(), texto: nuevaTarea.value });
  nuevaTarea.value = '';
}

function eliminarTarea(id) {
  tareas.value = tareas.value.filter(t => t.id !== id);
}
</script>
```

### Diferencias clave con Vanilla
- `v-model` sincroniza automáticamente el input con la variable
- `v-for` renderiza la lista reactivamente
- `v-if` muestra/oculta elementos con lógica declarativa

---

## Opción 4: Angular + Ionic

### Instalación previa
```bash
ionic start mini-todo-angular blank --type angular
cd mini-todo-angular
ng serve
```

### src/app/home/home.page.ts

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonItem, IonInput, IonButton,
  IonIcon, IonList, IonLabel, IonCheckbox
} from '@ionic/angular/standalone';

interface Tarea {
  id: number;
  texto: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonPage, IonHeader, IonToolbar, IonTitle,
    IonContent, IonItem, IonInput, IonButton,
    IonIcon, IonList, IonLabel, IonCheckbox
  ]
})
export class HomePage {
  tareas: Tarea[] = [];
  nuevaTarea = '';

  agregarTarea() {
    if (!this.nuevaTarea.trim()) return;
    this.tareas.push({ id: Date.now(), texto: this.nuevaTarea });
    this.nuevaTarea = '';
  }

  eliminarTarea(id: number) {
    this.tareas = this.tareas.filter(t => t.id !== id);
  }
}
```

### src/app/home/home.page.html

```html
<ion-page>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>✅ Mis Tareas</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding">
    <ion-item>
      <ion-input
        [(ngModel)]="nuevaTarea"
        placeholder="Nueva tarea..."
        (keypress)="$event.key === 'Enter' && agregarTarea()">
      </ion-input>
      <ion-button slot="end" (click)="agregarTarea()">
        <ion-icon name="add"></ion-icon>
      </ion-button>
    </ion-item>

    <p *ngIf="tareas.length === 0" style="text-align:center; color:#aaa;">
      No tienes tareas. ¡Agrega una!
    </p>

    <ion-list>
      <ion-item *ngFor="let tarea of tareas">
        <ion-checkbox slot="start"></ion-checkbox>
        <ion-label>{{ tarea.texto }}</ion-label>
        <ion-button slot="end" fill="clear" color="danger" (click)="eliminarTarea(tarea.id)">
          <ion-icon name="trash"></ion-icon>
        </ion-button>
      </ion-item>
    </ion-list>
  </ion-content>
</ion-page>
```

### Diferencias clave con Vanilla
- `[(ngModel)]` = two-way binding (equivale a `v-model` en Vue)
- `*ngFor` renderiza listas (equivale a `v-for`)
- `*ngIf` muestra/oculta (equivale a `v-if`)
- Lógica en TypeScript tipado

---

## Resumen comparativo

| Aspecto | Implementación por framework |
|---|---|
| **Estado** | Vanilla: variable + `renderizar()`<br>React: `useState`<br>Vue: `ref()`<br>Angular: propiedad de clase |
| **Renderizar lista** | Vanilla: `forEach + innerHTML`<br>React: `array.map()` en JSX<br>Vue: `v-for`<br>Angular: `*ngFor` |
| **Mostrar/ocultar** | Vanilla: `style.display`<br>React: `&&` en JSX<br>Vue: `v-if`<br>Angular: `*ngIf` |
| **Input binding** | Vanilla: `input.value` manual<br>React: `onIonInput` + state<br>Vue: `v-model`<br>Angular: `[(ngModel)]` |
| **Archivos** | Vanilla: 1 HTML<br>React: `Home.tsx`<br>Vue: `HomePage.vue`<br>Angular: `home.page.ts + .html` |

---

## Próximo mini-proyecto
📍 **Mini 2: Todo con localStorage** → Igual que este pero los datos persisten al recargar la página.
