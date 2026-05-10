# Mini Proyecto 4: Notas CRUD

## Objetivo
Implementar un **CRUD completo** (Create, Read, Update, Delete) para una app de notas con título, contenido y persistencia en localStorage.

## Conceptos nuevos
- CRUD completo: crear, leer, editar, borrar
- Formulario de edición en modal
- Estado de edición (modo crear vs editar)
- Confirmación antes de borrar (ion-alert)

## Resultado esperado
```
┌─────────────────────────────┐
│ 📝 Mis Notas          [+ ]  │
├─────────────────────────────┤
│ ┌──────────────────────┐    │
│ │ Compras              │    │
│ │ Leche, pan, huevos...│ ✏️ 🗑│
│ └──────────────────────┘    │
│ ┌──────────────────────┐    │
│ │ Ideas proyecto       │    │
│ │ Usar Ionic con Vue...│ ✏️ 🗑│
│ └──────────────────────┘    │
└─────────────────────────────┘
```

---

## Opción 1: Vanilla JavaScript

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Notas CRUD</title>
  <link href="https://cdn.jsdelivr.net/npm/@ionic/core@latest/css/ionic.bundle.css" rel="stylesheet">
</head>
<body>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>📝 Mis Notas</ion-title>
        <ion-buttons slot="end">
          <ion-button id="btn-nueva">
            <ion-icon name="add" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div id="lista-notas"></div>
    </ion-content>

    <!-- Modal crear/editar -->
    <ion-modal id="modal-nota">
      <ion-header>
        <ion-toolbar>
          <ion-title id="modal-titulo-label">Nueva nota</ion-title>
          <ion-buttons slot="start">
            <ion-button id="btn-cancelar">Cancelar</ion-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button id="btn-guardar" strong="true">Guardar</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <ion-label position="stacked">Título</ion-label>
          <ion-input id="campo-titulo" placeholder="Título de la nota"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Contenido</ion-label>
          <ion-textarea id="campo-contenido" rows="6" placeholder="Escribe aquí..."></ion-textarea>
        </ion-item>
      </ion-content>
    </ion-modal>
  </ion-page>

  <script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core@latest/dist/ionic/ionic.esm.js"></script>
  <script nomodule src="https://cdn.jsdelivr.net/npm/@ionic/core@latest/dist/ionic/ionic.js"></script>

  <script>
    const STORAGE_KEY = 'notas';
    let notas = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    let editandoId = null;

    const modal = document.getElementById('modal-nota');
    const campoTitulo = document.getElementById('campo-titulo');
    const campoContenido = document.getElementById('campo-contenido');

    function guardar() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notas));
    }

    function abrirModal(nota = null) {
      editandoId = nota ? nota.id : null;
      document.getElementById('modal-titulo-label').textContent = nota ? 'Editar nota' : 'Nueva nota';
      campoTitulo.value = nota ? nota.titulo : '';
      campoContenido.value = nota ? nota.contenido : '';
      modal.present();
    }

    function cerrarModal() {
      modal.dismiss();
      editandoId = null;
    }

    function guardarNota() {
      const titulo = campoTitulo.value.trim();
      const contenido = campoContenido.value.trim();
      if (!titulo) return alert('El título es obligatorio');

      if (editandoId) {
        const nota = notas.find(n => n.id === editandoId);
        if (nota) { nota.titulo = titulo; nota.contenido = contenido; nota.fecha = new Date().toISOString(); }
      } else {
        notas.unshift({ id: Date.now(), titulo, contenido, fecha: new Date().toISOString() });
      }

      guardar();
      cerrarModal();
      renderizar();
    }

    async function confirmarEliminar(id) {
      const alerta = document.createElement('ion-alert');
      alerta.header = '¿Eliminar nota?';
      alerta.message = 'Esta acción no se puede deshacer.';
      alerta.buttons = [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Eliminar', role: 'destructive', handler: () => { eliminar(id); } }
      ];
      document.body.appendChild(alerta);
      await alerta.present();
    }

    function eliminar(id) {
      notas = notas.filter(n => n.id !== id);
      guardar();
      renderizar();
    }

    function formatearFecha(iso) {
      return new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
    }

    function renderizar() {
      const contenedor = document.getElementById('lista-notas');
      if (!notas.length) {
        contenedor.innerHTML = '<p style="text-align:center; color:#aaa;">Sin notas. ¡Crea una!</p>';
        return;
      }
      contenedor.innerHTML = notas.map(nota => `
        <ion-card>
          <ion-card-header>
            <ion-card-subtitle>${formatearFecha(nota.fecha)}</ion-card-subtitle>
            <ion-card-title>${nota.titulo}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>${nota.contenido || '<em>Sin contenido</em>'}</p>
            <div style="display:flex; gap:8px; margin-top:12px;">
              <ion-button fill="outline" size="small" class="btn-editar" data-id="${nota.id}">
                <ion-icon name="pencil" slot="start"></ion-icon> Editar
              </ion-button>
              <ion-button fill="outline" size="small" color="danger" class="btn-borrar" data-id="${nota.id}">
                <ion-icon name="trash" slot="start"></ion-icon> Borrar
              </ion-button>
            </div>
          </ion-card-content>
        </ion-card>
      `).join('');

      document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', () => {
          const nota = notas.find(n => n.id === Number(btn.dataset.id));
          if (nota) abrirModal(nota);
        });
      });
      document.querySelectorAll('.btn-borrar').forEach(btn => {
        btn.addEventListener('click', () => confirmarEliminar(Number(btn.dataset.id)));
      });
    }

    document.getElementById('btn-nueva').addEventListener('click', () => abrirModal());
    document.getElementById('btn-guardar').addEventListener('click', guardarNota);
    document.getElementById('btn-cancelar').addEventListener('click', cerrarModal);

    renderizar();
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
  IonCardSubtitle, IonCardContent, IonModal, IonItem,
  IonLabel, IonInput, IonTextarea, useIonAlert
} from '@ionic/react';
import { add, pencil, trash } from 'ionicons/icons';

interface Nota { id: number; titulo: string; contenido: string; fecha: string; }
const KEY = 'notas';

const Home: React.FC = () => {
  const [notas, setNotas] = useState<Nota[]>(() => JSON.parse(localStorage.getItem(KEY) || '[]'));
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editando, setEditando] = useState<Nota | null>(null);
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [presentAlert] = useIonAlert();

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(notas)); }, [notas]);

  const abrirModal = (nota?: Nota) => {
    setEditando(nota || null);
    setTitulo(nota?.titulo || '');
    setContenido(nota?.contenido || '');
    setModalAbierto(true);
  };

  const guardarNota = () => {
    if (!titulo.trim()) return;
    const fecha = new Date().toISOString();
    if (editando) {
      setNotas(prev => prev.map(n => n.id === editando.id ? { ...n, titulo, contenido, fecha } : n));
    } else {
      setNotas(prev => [{ id: Date.now(), titulo, contenido, fecha }, ...prev]);
    }
    setModalAbierto(false);
  };

  const eliminar = (id: number) => {
    presentAlert({
      header: '¿Eliminar nota?',
      message: 'Esta acción no se puede deshacer.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Eliminar', role: 'destructive', handler: () => setNotas(prev => prev.filter(n => n.id !== id)) }
      ]
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>📝 Mis Notas</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => abrirModal()}>
              <IonIcon icon={add} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {notas.length === 0 && <p style={{ textAlign:'center', color:'#aaa' }}>Sin notas. ¡Crea una!</p>}
        {notas.map(nota => (
          <IonCard key={nota.id}>
            <IonCardHeader>
              <IonCardSubtitle>{new Date(nota.fecha).toLocaleDateString('es-ES')}</IonCardSubtitle>
              <IonCardTitle>{nota.titulo}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>{nota.contenido || <em>Sin contenido</em>}</p>
              <div style={{ display:'flex', gap:'8px', marginTop:'12px' }}>
                <IonButton fill="outline" size="small" onClick={() => abrirModal(nota)}>
                  <IonIcon icon={pencil} slot="start" /> Editar
                </IonButton>
                <IonButton fill="outline" size="small" color="danger" onClick={() => eliminar(nota.id)}>
                  <IonIcon icon={trash} slot="start" /> Borrar
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>

      <IonModal isOpen={modalAbierto} onDidDismiss={() => setModalAbierto(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{editando ? 'Editar nota' : 'Nueva nota'}</IonTitle>
            <IonButtons slot="start"><IonButton onClick={() => setModalAbierto(false)}>Cancelar</IonButton></IonButtons>
            <IonButtons slot="end"><IonButton strong onClick={guardarNota}>Guardar</IonButton></IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonLabel position="stacked">Título</IonLabel>
            <IonInput value={titulo} onIonInput={e => setTitulo(e.detail.value!)} placeholder="Título" />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Contenido</IonLabel>
            <IonTextarea value={contenido} onIonInput={e => setContenido(e.detail.value!)} rows={6} />
          </IonItem>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default Home;
```

---

## Opción 3: Vue + Ionic

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>📝 Mis Notas</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="abrirModal()">
            <ion-icon :icon="addIcon" slot="icon-only" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <p v-if="notas.length === 0" style="text-align:center; color:#aaa;">Sin notas. ¡Crea una!</p>
      <ion-card v-for="nota in notas" :key="nota.id">
        <ion-card-header>
          <ion-card-subtitle>{{ formatearFecha(nota.fecha) }}</ion-card-subtitle>
          <ion-card-title>{{ nota.titulo }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>{{ nota.contenido || 'Sin contenido' }}</p>
          <div style="display:flex; gap:8px; margin-top:12px;">
            <ion-button fill="outline" size="small" @click="abrirModal(nota)">
              <ion-icon :icon="pencilIcon" slot="start" /> Editar
            </ion-button>
            <ion-button fill="outline" size="small" color="danger" @click="confirmarEliminar(nota.id)">
              <ion-icon :icon="trashIcon" slot="start" /> Borrar
            </ion-button>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>

    <ion-modal :is-open="modalAbierto" @didDismiss="modalAbierto = false">
      <ion-header>
        <ion-toolbar>
          <ion-title>{{ editando ? 'Editar nota' : 'Nueva nota' }}</ion-title>
          <ion-buttons slot="start"><ion-button @click="modalAbierto = false">Cancelar</ion-button></ion-buttons>
          <ion-buttons slot="end"><ion-button strong @click="guardarNota">Guardar</ion-button></ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <ion-label position="stacked">Título</ion-label>
          <ion-input v-model="formTitulo" placeholder="Título de la nota" />
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Contenido</ion-label>
          <ion-textarea v-model="formContenido" :rows="6" />
        </ion-item>
      </ion-content>
    </ion-modal>

    <ion-alert
      :is-open="alertaAbierta"
      header="¿Eliminar nota?"
      message="Esta acción no se puede deshacer."
      :buttons="botonesAlerta"
      @didDismiss="alertaAbierta = false"
    />
  </ion-page>
</template>

<script setup>
import { ref, watch } from 'vue';
import { add as addIcon, pencil as pencilIcon, trash as trashIcon } from 'ionicons/icons';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonCardContent, IonModal, IonItem,
  IonLabel, IonInput, IonTextarea, IonAlert
} from '@ionic/vue';

const KEY = 'notas';
const notas = ref(JSON.parse(localStorage.getItem(KEY) || '[]'));
const modalAbierto = ref(false);
const alertaAbierta = ref(false);
const editando = ref(null);
const formTitulo = ref('');
const formContenido = ref('');
let idPendienteEliminar = null;

watch(notas, val => localStorage.setItem(KEY, JSON.stringify(val)), { deep: true });

function abrirModal(nota = null) {
  editando.value = nota;
  formTitulo.value = nota?.titulo || '';
  formContenido.value = nota?.contenido || '';
  modalAbierto.value = true;
}

function guardarNota() {
  if (!formTitulo.value.trim()) return;
  const fecha = new Date().toISOString();
  if (editando.value) {
    const i = notas.value.findIndex(n => n.id === editando.value.id);
    if (i >= 0) notas.value[i] = { ...notas.value[i], titulo: formTitulo.value, contenido: formContenido.value, fecha };
  } else {
    notas.value.unshift({ id: Date.now(), titulo: formTitulo.value, contenido: formContenido.value, fecha });
  }
  modalAbierto.value = false;
}

const botonesAlerta = [
  { text: 'Cancelar', role: 'cancel' },
  { text: 'Eliminar', role: 'destructive', handler: () => {
    notas.value = notas.value.filter(n => n.id !== idPendienteEliminar);
  }}
];

function confirmarEliminar(id) {
  idPendienteEliminar = id;
  alertaAbierta.value = true;
}

function formatearFecha(iso) {
  return new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}
</script>
```

---

## Opción 4: Angular + Ionic

### home.page.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonCardContent, IonModal, IonItem,
  IonLabel, IonInput, IonTextarea, IonAlert, AlertController
} from '@ionic/angular/standalone';

interface Nota { id: number; titulo: string; contenido: string; fecha: string; }

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonPage, IonHeader, IonToolbar, IonTitle,
    IonContent, IonButtons, IonButton, IonIcon, IonCard, IonCardHeader,
    IonCardTitle, IonCardSubtitle, IonCardContent, IonModal, IonItem,
    IonLabel, IonInput, IonTextarea
  ]
})
export class HomePage implements OnInit {
  notas: Nota[] = [];
  modalAbierto = false;
  editando: Nota | null = null;
  formTitulo = '';
  formContenido = '';

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {
    this.notas = JSON.parse(localStorage.getItem('notas') || '[]');
  }

  guardar() { localStorage.setItem('notas', JSON.stringify(this.notas)); }

  abrirModal(nota?: Nota) {
    this.editando = nota || null;
    this.formTitulo = nota?.titulo || '';
    this.formContenido = nota?.contenido || '';
    this.modalAbierto = true;
  }

  guardarNota() {
    if (!this.formTitulo.trim()) return;
    const fecha = new Date().toISOString();
    if (this.editando) {
      const i = this.notas.findIndex(n => n.id === this.editando!.id);
      if (i >= 0) this.notas[i] = { ...this.notas[i], titulo: this.formTitulo, contenido: this.formContenido, fecha };
    } else {
      this.notas.unshift({ id: Date.now(), titulo: this.formTitulo, contenido: this.formContenido, fecha });
    }
    this.guardar();
    this.modalAbierto = false;
  }

  async confirmarEliminar(id: number) {
    const alerta = await this.alertCtrl.create({
      header: '¿Eliminar nota?',
      message: 'Esta acción no se puede deshacer.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Eliminar', role: 'destructive', handler: () => {
          this.notas = this.notas.filter(n => n.id !== id);
          this.guardar();
        }}
      ]
    });
    await alerta.present();
  }

  formatearFecha(iso: string) {
    return new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  }
}
```

---

## Resumen de conceptos nuevos

| Concepto | Implementación por framework |
|---|---|
| **Crear alerta** | Vanilla: `createElement('ion-alert')`<br>React: `useIonAlert()`<br>Vue: `ion-alert` declarativo<br>Angular: `AlertController.create()` |
| **Modo editar/crear** | Vanilla: variable `editandoId`<br>React: estado `editando`<br>Vue: `ref(null)`<br>Angular: propiedad `editando` |
| **Actualizar item** | Vanilla: `.find()` + mutación<br>React: `map()` inmutable<br>Vue: `findIndex()` + asignación<br>Angular: `findIndex()` + asignación |
| **Patrón CRUD** | Vanilla: funciones independientes<br>React: handlers en componente<br>Vue: funciones en `<script setup>`<br>Angular: métodos de clase |

---

## Próximo mini-proyecto
📍 **Mini 5: Consumo de API** → Obtener datos reales de una API pública con `fetch`, manejar estados de carga y errores.
