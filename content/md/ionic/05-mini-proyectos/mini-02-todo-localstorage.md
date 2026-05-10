# Mini Proyecto 2: Todo con localStorage

## Objetivo
Igual que el Mini 1, pero ahora las tareas **se guardan en el navegador**. Al recargar la página, los datos persisten.

## Conceptos nuevos respecto al Mini 1
- `localStorage.setItem` / `getItem`
- `JSON.stringify` / `JSON.parse`
- Cargar datos al iniciar la app

## Resultado esperado
```
┌───────────────────────────┐
│ 💾 Mis Tareas              │
├───────────────────────────┤
│ [Nueva tarea...   ] [+ ]   │
├───────────────────────────┤
│ ✅  Estudiar Ionic     [🗑] │
│ ☐   Hacer ejercicio   [🗑] │
│ ☐   Comprar pan       [🗑] │
│                            │
│  2 pendientes, 1 completa  │
└───────────────────────────┘
```

---

## Opción 1: Vanilla JavaScript

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo localStorage</title>
  <link href="https://cdn.jsdelivr.net/npm/@ionic/core@latest/css/ionic.bundle.css" rel="stylesheet">
</head>
<body>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>💾 Mis Tareas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item>
        <ion-input id="input-tarea" placeholder="Nueva tarea..."></ion-input>
        <ion-button id="btn-agregar" slot="end">
          <ion-icon name="add"></ion-icon>
        </ion-button>
      </ion-item>

      <ion-list id="lista-tareas"></ion-list>
      <p id="contador" style="text-align:center; color:#888;"></p>
    </ion-content>
  </ion-page>

  <script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core@latest/dist/ionic/ionic.esm.js"></script>
  <script nomodule src="https://cdn.jsdelivr.net/npm/@ionic/core@latest/dist/ionic/ionic.js"></script>

  <script>
    // ─── Persistencia ────────────────────────
    function cargarTareas() {
      try {
        return JSON.parse(localStorage.getItem('tareas')) || [];
      } catch {
        return [];
      }
    }

    function guardarTareas(tareas) {
      localStorage.setItem('tareas', JSON.stringify(tareas));
    }

    // ─── Estado ──────────────────────────────
    let tareas = cargarTareas();

    // ─── Lógica ──────────────────────────────
    function agregarTarea() {
      const input = document.getElementById('input-tarea');
      const texto = input.value.trim();
      if (!texto) return;

      tareas.push({ id: Date.now(), texto, completada: false });
      input.value = '';
      guardarTareas(tareas);
      renderizar();
    }

    function toggleTarea(id) {
      const tarea = tareas.find(t => t.id === id);
      if (tarea) {
        tarea.completada = !tarea.completada;
        guardarTareas(tareas);
        renderizar();
      }
    }

    function eliminarTarea(id) {
      tareas = tareas.filter(t => t.id !== id);
      guardarTareas(tareas);
      renderizar();
    }

    // ─── UI ──────────────────────────────────
    function renderizar() {
      const lista = document.getElementById('lista-tareas');
      const contador = document.getElementById('contador');

      const pendientes = tareas.filter(t => !t.completada).length;
      const completas = tareas.filter(t => t.completada).length;
      contador.textContent = tareas.length
        ? `${pendientes} pendiente(s), ${completas} completa(s)`
        : 'Sin tareas';

      lista.innerHTML = '';
      tareas.forEach(tarea => {
        const item = document.createElement('ion-item');
        item.innerHTML = `
          <ion-checkbox slot="start" ${tarea.completada ? 'checked' : ''} data-id="${tarea.id}"></ion-checkbox>
          <ion-label style="${tarea.completada ? 'text-decoration:line-through; color:#aaa' : ''}">
            ${tarea.texto}
          </ion-label>
          <ion-button slot="end" fill="clear" color="danger" data-id="${tarea.id}" class="btn-del">
            <ion-icon name="trash"></ion-icon>
          </ion-button>
        `;
        lista.appendChild(item);
      });

      document.querySelectorAll('ion-checkbox[data-id]').forEach(cb => {
        cb.addEventListener('ionChange', () => toggleTarea(Number(cb.dataset.id)));
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

### src/pages/Home.tsx

```tsx
import { useState, useEffect } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonInput, IonButton, IonIcon,
  IonList, IonLabel, IonCheckbox
} from '@ionic/react';
import { add, trash } from 'ionicons/icons';

interface Tarea {
  id: number;
  texto: string;
  completada: boolean;
}

const STORAGE_KEY = 'tareas';

const Home: React.FC = () => {
  const [tareas, setTareas] = useState<Tarea[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  });
  const [texto, setTexto] = useState('');

  // Guardar automáticamente al cambiar las tareas
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
  }, [tareas]);

  const agregarTarea = () => {
    if (!texto.trim()) return;
    setTareas(prev => [...prev, { id: Date.now(), texto, completada: false }]);
    setTexto('');
  };

  const toggleTarea = (id: number) => {
    setTareas(prev => prev.map(t => t.id === id ? { ...t, completada: !t.completada } : t));
  };

  const eliminarTarea = (id: number) => {
    setTareas(prev => prev.filter(t => t.id !== id));
  };

  const pendientes = tareas.filter(t => !t.completada).length;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>💾 Mis Tareas</IonTitle>
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

        <p style={{ textAlign: 'center', color: '#888' }}>
          {tareas.length ? `${pendientes} pendiente(s)` : 'Sin tareas'}
        </p>

        <IonList>
          {tareas.map(tarea => (
            <IonItem key={tarea.id}>
              <IonCheckbox
                slot="start"
                checked={tarea.completada}
                onIonChange={() => toggleTarea(tarea.id)}
              />
              <IonLabel style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}>
                {tarea.texto}
              </IonLabel>
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

### Concepto nuevo: useEffect
```tsx
// Se ejecuta cada vez que cambia "tareas"
useEffect(() => {
  localStorage.setItem('tareas', JSON.stringify(tareas));
}, [tareas]);
```

---

## Opción 3: Vue + Ionic

### src/views/HomePage.vue

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>💾 Mis Tareas</ion-title>
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

      <p style="text-align:center; color:#888;">
        {{ tareas.length ? `${pendientes} pendiente(s)` : 'Sin tareas' }}
      </p>

      <ion-list>
        <ion-item v-for="tarea in tareas" :key="tarea.id">
          <ion-checkbox
            slot="start"
            :checked="tarea.completada"
            @ionChange="toggleTarea(tarea.id)"
          />
          <ion-label :style="{ textDecoration: tarea.completada ? 'line-through' : 'none' }">
            {{ tarea.texto }}
          </ion-label>
          <ion-button slot="end" fill="clear" color="danger" @click="eliminarTarea(tarea.id)">
            <ion-icon :icon="trashIcon" />
          </ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { add as addIcon, trash as trashIcon } from 'ionicons/icons';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonInput, IonButton, IonIcon, IonList, IonLabel, IonCheckbox
} from '@ionic/vue';

const STORAGE_KEY = 'tareas';

function cargar() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

const tareas = ref(cargar());
const nuevaTarea = ref('');
const pendientes = computed(() => tareas.value.filter(t => !t.completada).length);

// Guardar automáticamente al cambiar
watch(tareas, val => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
}, { deep: true });

function agregarTarea() {
  if (!nuevaTarea.value.trim()) return;
  tareas.value.push({ id: Date.now(), texto: nuevaTarea.value, completada: false });
  nuevaTarea.value = '';
}

function toggleTarea(id) {
  const t = tareas.value.find(t => t.id === id);
  if (t) t.completada = !t.completada;
}

function eliminarTarea(id) {
  tareas.value = tareas.value.filter(t => t.id !== id);
}
</script>
```

### Concepto nuevo: watch y computed
```js
// watch: se ejecuta cuando cambia el valor
watch(tareas, val => localStorage.setItem('tareas', JSON.stringify(val)), { deep: true });

// computed: calcula valor derivado del estado
const pendientes = computed(() => tareas.value.filter(t => !t.completada).length);
```

---

## Opción 4: Angular + Ionic

### src/app/home/home.page.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonInput, IonButton, IonIcon, IonList, IonLabel, IonCheckbox
} from '@ionic/angular/standalone';

interface Tarea {
  id: number;
  texto: string;
  completada: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonInput, IonButton, IonIcon, IonList, IonLabel, IonCheckbox
  ]
})
export class HomePage implements OnInit {
  tareas: Tarea[] = [];
  nuevaTarea = '';

  get pendientes() {
    return this.tareas.filter(t => !t.completada).length;
  }

  ngOnInit() {
    try {
      this.tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
    } catch {
      this.tareas = [];
    }
  }

  guardar() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }

  agregarTarea() {
    if (!this.nuevaTarea.trim()) return;
    this.tareas.push({ id: Date.now(), texto: this.nuevaTarea, completada: false });
    this.nuevaTarea = '';
    this.guardar();
  }

  toggleTarea(id: number) {
    const t = this.tareas.find(t => t.id === id);
    if (t) { t.completada = !t.completada; this.guardar(); }
  }

  eliminarTarea(id: number) {
    this.tareas = this.tareas.filter(t => t.id !== id);
    this.guardar();
  }
}
```

### src/app/home/home.page.html

```html
<ion-page>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>💾 Mis Tareas</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-item>
      <ion-input [(ngModel)]="nuevaTarea" placeholder="Nueva tarea..."
        (keypress)="$event.key === 'Enter' && agregarTarea()">
      </ion-input>
      <ion-button slot="end" (click)="agregarTarea()">
        <ion-icon name="add"></ion-icon>
      </ion-button>
    </ion-item>

    <p style="text-align:center; color:#888;">
      {{ tareas.length ? pendientes + ' pendiente(s)' : 'Sin tareas' }}
    </p>

    <ion-list>
      <ion-item *ngFor="let tarea of tareas">
        <ion-checkbox slot="start" [checked]="tarea.completada"
          (ionChange)="toggleTarea(tarea.id)">
        </ion-checkbox>
        <ion-label [style.textDecoration]="tarea.completada ? 'line-through' : 'none'">
          {{ tarea.texto }}
        </ion-label>
        <ion-button slot="end" fill="clear" color="danger" (click)="eliminarTarea(tarea.id)">
          <ion-icon name="trash"></ion-icon>
        </ion-button>
      </ion-item>
    </ion-list>
  </ion-content>
</ion-page>
```

### Concepto nuevo: ngOnInit y getter
```typescript
// ngOnInit: se ejecuta al inicializar el componente (similar a useEffect[])
ngOnInit() {
  this.tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
}

// getter: propiedad calculada (similar a computed en Vue)
get pendientes() {
  return this.tareas.filter(t => !t.completada).length;
}
```

---

## Resumen de novedades vs Mini 1

| Concepto | Implementación por framework |
|---|---|
| **Cargar datos** | Vanilla: `cargarTareas()` al inicio<br>React: initializer en `useState`<br>Vue: `cargar()` en `ref`<br>Angular: `ngOnInit()` |
| **Guardar datos** | Vanilla: `guardarTareas()` manual<br>React: `useEffect([tareas])`<br>Vue: `watch(tareas, ...)`<br>Angular: `guardar()` manual |
| **Valor derivado** | Vanilla: cálculo en `renderizar()`<br>React: variable calculada en JSX<br>Vue: `computed()`<br>Angular: getter de clase |

---

## Próximo mini-proyecto
📍 **Mini 3: Galería de imágenes** → Introducción a cards, grillas responsive e ion-modal.
