# Mini Proyecto 6: Camara con Capacitor (Guia completa para principiantes)

## Objetivo
Construir una app de camara paso a paso para 4 enfoques:

1. Vanilla JavaScript
2. React
3. Vue
4. Angular

La app permitira:

- Tomar foto con la camara
- Elegir foto desde galeria
- Mostrar vista previa
- Guardar la imagen en localStorage

> Esta guia esta pensada para alumnos que empiezan desde cero.

### Que significa Vanilla en esta guia

Cuando decimos `Vanilla JavaScript`, nos referimos a JavaScript puro:

1. Sin frameworks como React, Vue o Angular.
2. Sin abstracciones extra para el manejo de estado.
3. Trabajando directamente con el DOM (`document.getElementById`, `addEventListener`, etc.).

En resumen: Vanilla = JavaScript nativo del navegador.

---

## Antes de empezar (muy importante)

### Que debes tener instalado

```bash
# 1) Node.js (incluye npm)
# Verifica version instalada
node -v
npm -v

# 2) Ionic CLI (herramienta de linea de comandos)
npm install -g @ionic/cli

# 3) Verificar que Ionic CLI esta disponible
ionic -v
```

### Diferencias por sistema operativo

#### Windows

1. Recomendado usar PowerShell o CMD.
2. Android Studio funciona en Windows sin problema.
3. iOS no se puede compilar en Windows porque Xcode solo existe en macOS.
4. Para iOS desde Windows necesitas:
  - usar un Mac remoto, o
  - usar un servicio CI/CD en la nube.

### Que significa usar CI/CD en la nube para iOS (explicacion simple)

CI/CD en la nube significa que un servidor remoto (normalmente una Mac en internet)
ejecuta por ti los pasos de build y firma de iOS.

Tu trabajas desde Windows, pero el proceso pesado ocurre en la nube.

#### Flujo tipico (paso a paso)

1. Subes tu codigo a un repositorio (por ejemplo GitHub).
2. Conectas ese repositorio a una plataforma CI/CD.
3. Configuras un workflow de iOS (build + firma + export).
4. La plataforma levanta una Mac remota con Xcode.
5. Esa Mac instala dependencias, compila y genera el `.ipa`.
6. Descargas el `.ipa` o lo publica en TestFlight/App Store.

#### Que plataformas puedes usar

- Ionic Appflow
- Codemagic
- Bitrise
- GitHub Actions (con runners macOS)

#### Que necesitas preparar antes

1. Cuenta Apple Developer activa.
2. Certificados y perfiles de aprovisionamiento (signing).
3. Variables seguras en la plataforma CI/CD (tokens, claves, etc.).
4. Identificador de app consistente (por ejemplo `com.cursojs.minicamaravanilla`).

#### Ventajas para tus alumnos

1. No dependen de tener una Mac fisica.
2. El proceso de build queda automatizado y repetible.
3. Aprenden flujo profesional real de despliegue movil.

#### Limitacion importante

Aunque CI/CD compila iOS sin Mac local, para publicar en App Store o TestFlight
sigues necesitando cumplir reglas de Apple (cuenta, firma y revisiones).

#### macOS

1. Puedes usar Terminal o iTerm.
2. Puedes compilar Android (Android Studio) y tambien iOS (Xcode).
3. Para iOS necesitas instalar Xcode desde App Store y abrirlo al menos una vez.
4. Si usas chip Apple Silicon, todo funciona normalmente con Node y Capacitor actualizados.

### Conceptos base explicados simple

- `Ionic`: biblioteca de componentes de interfaz (botones, inputs, modales, etc.).
- `Capacitor`: puente entre JavaScript y funciones nativas del telefono (camara, GPS, etc.).
- `Plugin`: paquete que habilita una funcion nativa, por ejemplo `@capacitor/camera`.

---

## Flujo general que se repite en los 4 enfoques

1. Crear proyecto
2. Instalar plugin de camara
3. Sincronizar plataformas nativas
4. Programar interfaz y logica
5. Ejecutar en Android/iOS

---

## Permisos nativos (aplica a todos)

Capacitor suele agregarlos al sincronizar, pero conviene conocerlos.

### Android - `android/app/src/main/AndroidManifest.xml`

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
<!-- Compatibilidad para Android antiguos -->
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

### iOS - `ios/App/App/Info.plist`

```xml
<key>NSCameraUsageDescription</key>
<string>Necesitamos usar la camara para tomar fotos.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Necesitamos acceder a la galeria para elegir fotos.</string>
```

---

## Opcion A: Vanilla JavaScript (JavaScript puro) + Ionic Core + Capacitor

## Paso A1) Crear proyecto Vanilla

```bash
# Crea carpeta del proyecto (sin Vite)
mkdir mini-camara-vanilla
cd mini-camara-vanilla

# Inicializa package.json para poder instalar paquetes
npm init -y

# Instala dependencias base
npm install

# Instala Ionic Core para usar componentes ion-*
npm install @ionic/core ionicons

# Instala Capacitor (core + cli)
npm install @capacitor/core @capacitor/cli

# Inicializa Capacitor en el proyecto
npx cap init mini-camara-vanilla com.cursojs.minicamaravanilla

# Instala plugin de camara
npm install @capacitor/camera

# Agrega plataforma Android (puedes agregar iOS en macOS)
npx cap add android

# Sincroniza plugins y assets
npx cap sync
```

### Crear archivos base segun plataforma

#### Windows (PowerShell o CMD)

```bash
mkdir www
type nul > www\index.html
type nul > www\app.js
```

Explicacion comando por comando (Windows):

1. `mkdir www`
  - `mkdir` significa "make directory".
  - Crea una carpeta llamada `www` en la ruta actual.
  - Esa carpeta sera la base de tu app web estatica.

2. `type nul > www\index.html`
  - `type nul` genera salida vacia (texto en blanco).
  - `>` redirige esa salida vacia a un archivo.
  - Si `www\index.html` no existe, lo crea vacio.
  - Si existe, sobrescribe su contenido.

3. `type nul > www\app.js`
  - Hace exactamente lo mismo que el comando anterior,
    pero creando el archivo JavaScript `app.js`.

#### macOS (Terminal)

```bash
mkdir -p www
touch www/index.html
touch www/app.js
```

Explicacion comando por comando (macOS):

1. `mkdir -p www`
  - `mkdir` crea carpetas.
  - La opcion `-p` evita error si la carpeta ya existe.
  - Tambien crea carpetas intermedias si faltaran.

2. `touch www/index.html`
  - `touch` crea un archivo vacio si no existe.
  - Si ya existe, no borra contenido; solo actualiza fecha de modificacion.

3. `touch www/app.js`
  - Repite el mismo comportamiento de `touch`,
    pero para el archivo `app.js`.

Notas didacticas:

- En Windows se usa `\` como separador de rutas (`www\index.html`).
- En macOS se usa `/` como separador de rutas (`www/index.html`).
- El objetivo final es el mismo en ambos sistemas: tener dos archivos base,
  `index.html` (estructura visual) y `app.js` (logica de JavaScript).

## Paso A1.1) Trabajar con Live Server

1. Abre la carpeta `www` en VS Code.
2. Abre `www/index.html`.
3. Click derecho y selecciona `Open with Live Server`.
4. Para pruebas nativas reales, sigue usando `npx cap copy` y `npx cap open android/ios`.

## Paso A2) Reemplazar `www/index.html`

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mini camara Vanilla</title>
    <!-- CSS de Ionic Core -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css" />
    <style>
      /* Contenedor principal de la vista */
      #app {
        max-width: 720px;
        margin: 0 auto;
      }

      /* Imagen de preview */
      #preview {
        width: 100%;
        max-width: 420px;
        border-radius: 12px;
        display: none;
      }

      /* Caja placeholder cuando no hay imagen */
      #placeholder {
        width: 100%;
        max-width: 420px;
        height: 240px;
        border: 2px dashed #b8b8b8;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #888;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Camara - Vanilla</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <div style="display:flex; flex-direction:column; gap:12px; align-items:center;">
          <div id="placeholder">Aun no hay foto</div>
          <img id="preview" alt="Vista previa de foto" />
          <ion-note id="info"></ion-note>

          <div style="display:flex; gap:8px; flex-wrap:wrap; justify-content:center;">
            <ion-button id="btn-camara">Abrir camara</ion-button>
            <ion-button id="btn-galeria" fill="outline">Abrir galeria</ion-button>
            <ion-button id="btn-guardar" color="success" disabled>Guardar</ion-button>
          </div>
        </div>
      </ion-content>
    </div>

    <!-- JS de Ionic Core -->
    <script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js"></script>
    <script nomodule src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js"></script>

    <!-- Capacitor Core global para entorno web/nativo -->
    <script src="https://unpkg.com/@capacitor/core@latest/dist/capacitor.js"></script>
    <!-- Plugin Camera global -->
    <script src="https://unpkg.com/@capacitor/camera@latest/dist/plugin.js"></script>

    <!-- Tu codigo (sin Vite) -->
    <script src="./app.js"></script>
  </body>
</html>
```

## Paso A3) Crear `www/app.js` con comentarios detallados

```js
// 0) Obtener referencias globales que inyectan los scripts CDN
// window.Capacitor: API base de Capacitor
const CapacitorGlobal = window.Capacitor;

// En modo plugin global, Camera suele estar en Capacitor.Plugins
const Camera = CapacitorGlobal?.Plugins?.Camera;

// Constantes de apoyo para no escribir strings sueltos
const CameraResultType = {
  DataUrl: 'dataUrl',
};

const CameraSource = {
  Camera: 'CAMERA',
  Photos: 'PHOTOS',
};

// 1) Referencias a elementos del DOM para manipular la UI
const preview = document.getElementById('preview');
const placeholder = document.getElementById('placeholder');
const info = document.getElementById('info');
const btnGuardar = document.getElementById('btn-guardar');

// 2) Variable para recordar la ultima imagen capturada/seleccionada
let ultimaFoto = '';

// 3) Funcion util para mostrar mensajes rapidos al usuario
async function mostrarToast(mensaje, color = 'primary') {
  const toast = document.createElement('ion-toast');
  toast.message = mensaje;
  toast.duration = 2200;
  toast.color = color;
  document.body.appendChild(toast);
  await toast.present();
}

// 4) Funcion que abre camara o galeria segun parametro
async function obtenerFoto(source) {
  // Si el plugin no esta disponible, avisamos al alumno
  if (!Camera) {
    await mostrarToast('Plugin Camera no disponible. Verifica scripts CDN o entorno nativo.', 'danger');
    return;
  }

  try {
    // 4.1) Pedimos foto al plugin nativo de Capacitor
    const foto = await Camera.getPhoto({
      // DataUrl: devuelve la imagen como texto base64 lista para <img src>
      resultType: CameraResultType.DataUrl,
      // source define si abrimos camara o galeria
      source,
      // quality controla compresion JPEG (0 a 100)
      quality: 90,
      // width limita el ancho para reducir peso
      width: 1024,
      // false para no mostrar editor despues de tomar foto
      allowEditing: false,
    });

    // 4.2) Guardamos la foto en memoria
    ultimaFoto = foto.dataUrl || '';

    // 4.3) Pintamos la imagen en pantalla
    preview.src = ultimaFoto;
    preview.style.display = 'block';
    placeholder.style.display = 'none';

    // 4.4) Mostramos datos utiles para debug y aprendizaje
    info.textContent = `Formato: ${foto.format} | Plataforma: ${Capacitor.getPlatform()}`;

    // 4.5) Habilitamos boton guardar solo si hay imagen
    btnGuardar.disabled = !ultimaFoto;
  } catch (error) {
    // Si el usuario cancela, no lo tratamos como error grave
    console.error(error);
    await mostrarToast('No se pudo obtener foto. Puede ser cancelacion o permiso denegado.', 'warning');
  }
}

// 5) Funcion para guardar la foto actual en localStorage
function guardarFoto() {
  if (!ultimaFoto) return;

  // 5.1) Leemos fotos previas; si no hay, usamos array vacio
  const almacenadas = JSON.parse(localStorage.getItem('fotos') || '[]');

  // 5.2) Agregamos nuevo registro
  almacenadas.push({
    id: Date.now(),
    dataUrl: ultimaFoto,
    fecha: new Date().toISOString(),
  });

  // 5.3) Persistimos
  localStorage.setItem('fotos', JSON.stringify(almacenadas));
  mostrarToast('Foto guardada en localStorage', 'success');
}

// 6) Suscripcion de eventos de botones
document.getElementById('btn-camara').addEventListener('click', () => {
  obtenerFoto(CameraSource.Camera);
});

document.getElementById('btn-galeria').addEventListener('click', () => {
  obtenerFoto(CameraSource.Photos);
});

btnGuardar.addEventListener('click', guardarFoto);

// 7) Mensaje inicial para orientar al alumno
if (CapacitorGlobal?.getPlatform && CapacitorGlobal.getPlatform() === 'web') {
  mostrarToast('Estas en web. Para camara real, prueba en Android/iOS.', 'medium');
}
```

---

## Opcion B: React + Ionic + Capacitor

## Paso B1) Crear proyecto React

```bash
# Crea proyecto Ionic con React y Capacitor
ionic start mini-camara-react blank --type=react --capacitor

# Entra al proyecto
cd mini-camara-react

# Instala plugin de camara
npm install @capacitor/camera

# Sincroniza plugins
npx cap sync
```

## Paso B2) Reemplazar `src/pages/Home.tsx`

```tsx
import { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonToast,
  IonText,
} from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

const Home: React.FC = () => {
  // Estado para guardar la imagen (string base64)
  const [fotoActual, setFotoActual] = useState<string>('');
  // Estado para mensajes toast
  const [toast, setToast] = useState<string>('');

  // Funcion reutilizable para abrir camara o galeria
  const obtenerFoto = async (source: CameraSource) => {
    try {
      // Solicita imagen al plugin nativo
      const foto = await Camera.getPhoto({
        source,
        resultType: CameraResultType.DataUrl,
        quality: 90,
        width: 1024,
      });

      // Guardamos en estado; React rerenderiza automaticamente
      setFotoActual(foto.dataUrl || '');
    } catch (error) {
      console.error(error);
      setToast('No se pudo obtener foto. Revisa permisos o cancelacion.');
    }
  };

  // Guardar en localStorage
  const guardarFoto = () => {
    if (!fotoActual) return;
    const fotos = JSON.parse(localStorage.getItem('fotos') || '[]');
    fotos.push({ id: Date.now(), dataUrl: fotoActual, fecha: new Date().toISOString() });
    localStorage.setItem('fotos', JSON.stringify(fotos));
    setToast('Foto guardada correctamente.');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Camara - React</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Texto de apoyo para alumno */}
        <IonText color="medium">
          <p>Plataforma actual: {Capacitor.getPlatform()}</p>
        </IonText>

        {/* Render condicional: si hay foto la mostramos, si no mostramos placeholder */}
        {fotoActual ? (
          <img src={fotoActual} alt="Vista previa" style={{ width: '100%', maxWidth: '420px', borderRadius: '12px' }} />
        ) : (
          <div style={{ width: '100%', maxWidth: '420px', height: '220px', border: '2px dashed #bbb', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Aun no hay foto
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
          <IonButton onClick={() => obtenerFoto(CameraSource.Camera)}>Abrir camara</IonButton>
          <IonButton fill="outline" onClick={() => obtenerFoto(CameraSource.Photos)}>Abrir galeria</IonButton>
          <IonButton color="success" onClick={guardarFoto} disabled={!fotoActual}>Guardar</IonButton>
        </div>

        {/* Toast para feedback visual */}
        <IonToast isOpen={!!toast} message={toast} duration={2200} onDidDismiss={() => setToast('')} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
```

---

## Opcion C: Vue + Ionic + Capacitor

## Paso C1) Crear proyecto Vue

```bash
# Crea proyecto Ionic con Vue y Capacitor
ionic start mini-camara-vue blank --type=vue --capacitor

# Entra al proyecto
cd mini-camara-vue

# Instala plugin de camara
npm install @capacitor/camera

# Sincroniza plugins
npx cap sync
```

## Paso C2) Reemplazar `src/views/HomePage.vue`

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Camara - Vue</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Texto de orientacion -->
      <p style="color:#666;">Plataforma actual: {{ plataforma }}</p>

      <!-- Si hay foto mostramos imagen; si no, placeholder -->
      <img
        v-if="fotoActual"
        :src="fotoActual"
        alt="Vista previa"
        style="width:100%; max-width:420px; border-radius:12px;"
      />
      <div
        v-else
        style="width:100%; max-width:420px; height:220px; border:2px dashed #bbb; border-radius:12px; display:flex; align-items:center; justify-content:center;"
      >
        Aun no hay foto
      </div>

      <div style="display:flex; gap:8px; margin-top:14px; flex-wrap:wrap;">
        <ion-button @click="obtenerFoto(CameraSource.Camera)">Abrir camara</ion-button>
        <ion-button fill="outline" @click="obtenerFoto(CameraSource.Photos)">Abrir galeria</ion-button>
        <ion-button color="success" :disabled="!fotoActual" @click="guardarFoto">Guardar</ion-button>
      </div>

      <ion-toast :is-open="mostrarToast" :message="mensajeToast" :duration="2200" @didDismiss="mostrarToast = false" />
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonToast,
} from '@ionic/vue';

// Estado reactivo en Vue
const fotoActual = ref('');
const mostrarToast = ref(false);
const mensajeToast = ref('');
const plataforma = Capacitor.getPlatform();

// Funcion para mostrar mensajes
function lanzarToast(texto) {
  mensajeToast.value = texto;
  mostrarToast.value = true;
}

// Funcion para abrir camara o galeria
async function obtenerFoto(source) {
  try {
    const foto = await Camera.getPhoto({
      source,
      resultType: CameraResultType.DataUrl,
      quality: 90,
      width: 1024,
    });
    fotoActual.value = foto.dataUrl || '';
  } catch (error) {
    console.error(error);
    lanzarToast('No se pudo obtener foto.');
  }
}

// Guardar imagen actual
function guardarFoto() {
  if (!fotoActual.value) return;
  const fotos = JSON.parse(localStorage.getItem('fotos') || '[]');
  fotos.push({ id: Date.now(), dataUrl: fotoActual.value, fecha: new Date().toISOString() });
  localStorage.setItem('fotos', JSON.stringify(fotos));
  lanzarToast('Foto guardada correctamente.');
}
</script>
```

---

## Opcion D: Angular + Ionic + Capacitor

## Paso D1) Crear proyecto Angular

```bash
# Crea proyecto Ionic con Angular y Capacitor
ionic start mini-camara-angular blank --type=angular --capacitor

# Entra al proyecto
cd mini-camara-angular

# Instala plugin de camara
npm install @capacitor/camera

# Sincroniza plugins
npx cap sync
```

## Paso D2) Reemplazar `src/app/home/home.page.ts`

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonToast,
} from '@ionic/angular/standalone';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonToast, CommonModule],
})
export class HomePage {
  // Estado de la vista
  fotoActual = '';
  mostrarToast = false;
  mensajeToast = '';
  plataforma = Capacitor.getPlatform();

  // Helper para mostrar toast
  lanzarToast(texto: string) {
    this.mensajeToast = texto;
    this.mostrarToast = true;
  }

  // Abrir camara o galeria
  async obtenerFoto(source: CameraSource) {
    try {
      const foto = await Camera.getPhoto({
        source,
        resultType: CameraResultType.DataUrl,
        quality: 90,
        width: 1024,
      });

      this.fotoActual = foto.dataUrl || '';
    } catch (error) {
      console.error(error);
      this.lanzarToast('No se pudo obtener foto.');
    }
  }

  // Guardar foto en localStorage
  guardarFoto() {
    if (!this.fotoActual) return;
    const fotos = JSON.parse(localStorage.getItem('fotos') || '[]');
    fotos.push({ id: Date.now(), dataUrl: this.fotoActual, fecha: new Date().toISOString() });
    localStorage.setItem('fotos', JSON.stringify(fotos));
    this.lanzarToast('Foto guardada correctamente.');
  }
}
```

## Paso D3) Reemplazar `src/app/home/home.page.html`

```html
<ion-page>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>Camara - Angular</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding">
    <p style="color:#666;">Plataforma actual: {{ plataforma }}</p>

    <img
      *ngIf="fotoActual"
      [src]="fotoActual"
      alt="Vista previa"
      style="width:100%; max-width:420px; border-radius:12px;"
    />

    <div
      *ngIf="!fotoActual"
      style="width:100%; max-width:420px; height:220px; border:2px dashed #bbb; border-radius:12px; display:flex; align-items:center; justify-content:center;"
    >
      Aun no hay foto
    </div>

    <div style="display:flex; gap:8px; margin-top:14px; flex-wrap:wrap;">
      <ion-button (click)="obtenerFoto(1)">Abrir camara</ion-button>
      <ion-button fill="outline" (click)="obtenerFoto(2)">Abrir galeria</ion-button>
      <ion-button color="success" (click)="guardarFoto()" [disabled]="!fotoActual">Guardar</ion-button>
    </div>

    <ion-toast [isOpen]="mostrarToast" [message]="mensajeToast" [duration]="2200" (didDismiss)="mostrarToast = false"></ion-toast>
  </ion-content>
</ion-page>
```

> Nota didactica Angular: en `(click)="obtenerFoto(1)"`, el valor `1` equivale a `CameraSource.Camera`.
> Si prefieres mayor claridad, puedes exponer `CameraSource` como propiedad publica en el componente.

---

## Paso final (igual para los 4 enfoques): correr en dispositivo

```bash
# 1) Genera version web
npm run build

# 2) Copia assets a nativo
npx cap copy

# 3) Abre Android Studio
npx cap open android

# 4) (Opcional en macOS) abre Xcode
npx cap open ios
```

### Ejecucion en Windows

```bash
# 1) Build web
npm run build

# 2) Copiar a nativo
npx cap copy

# 3) Abrir Android Studio
npx cap open android

# 4) Ejecutar en dispositivo Android conectado
npx cap run android
```

Nota: en Windows no puedes ejecutar `npx cap run ios`.

### Ejecucion en macOS

```bash
# 1) Build web
npm run build

# 2) Copiar a nativo
npx cap copy

# 3) Android (opcional)
npx cap open android

# 4) iOS (requiere Xcode instalado)
npx cap open ios

# 5) Ejecutar directo si quieres
npx cap run android
npx cap run ios
```

---

## Ejecucion en navegador (limitaciones)

```bash
ionic serve
```

- En web suele funcionar seleccionar desde archivos/galeria.
- La camara nativa real se prueba mejor en Android/iOS.

Si quieres mejorar soporte web:

```bash
npm install @ionic/pwa-elements
```

Y en tu entrada principal:

```js
import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);
```

---

## Explicacion simple de `Camera.getPhoto()`

```js
const foto = await Camera.getPhoto({
  // CameraSource.Camera: abre camara
  // CameraSource.Photos: abre galeria
  source: CameraSource.Camera,

  // DataUrl devuelve string base64 listo para <img src>
  resultType: CameraResultType.DataUrl,

  // Calidad y tamano para optimizar peso de imagen
  quality: 90,
  width: 1024,
});
```

---

## Resumen comparativo

| Aspecto | Implementacion por framework |
|---|---|
| Estado de foto | Vanilla: variable normal<br>React: `useState`<br>Vue: `ref`<br>Angular: propiedad de clase |
| Render condicional | Vanilla: `style.display`<br>React: ternario JSX<br>Vue: `v-if`<br>Angular: `*ngIf` |
| Eventos click | Vanilla: `addEventListener`<br>React: `onClick`<br>Vue: `@click`<br>Angular: `(click)` |
| Persistencia | Todos usan `localStorage` con `JSON.stringify/parse` |

---

## Ejercicios para tus alumnos

1. Agregar boton "Eliminar foto actual".
2. Mostrar contador de fotos guardadas.
3. Crear galeria de miniaturas con las fotos guardadas.
4. Permitir borrar una foto especifica de localStorage.

---

## Volver a mini proyectos

Mini 5: Consumo de API (anterior)
Mini 6: Camara con Capacitor (actual)
