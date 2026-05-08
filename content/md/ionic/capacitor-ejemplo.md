# Proyectos Capacitor paso a paso

Ejemplo completo de una app con Capacitor.

## Proyecto: App de fotos con geolocalización

### Requisitos

- Tomar fotos
- Mostrar ubicación GPS
- Guardar localmente
- Mostrar galería

### Paso 1: Crear base del proyecto

```bash
npm create ionic@latest mi-app-fotos
cd mi-app-fotos
npm install @capacitor/core @capacitor/cli
npx cap init
```

### Paso 2: Instalar plugins

```bash
npm install @capacitor/camera
npm install @capacitor/geolocation
npm install @capacitor/preferences
npx cap sync
```

### Paso 3: Componente con formulario

```html
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-title>Mi Galería</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-button expand="block" color="primary" id="btn-foto">
      <ion-icon slot="start" name="camera-outline"></ion-icon>
      Tomar foto
    </ion-button>
    
    <ion-button expand="block" color="secondary" id="btn-ubicacion">
      <ion-icon slot="start" name="location-outline"></ion-icon>
      Obtener ubicación
    </ion-button>

    <div id="fotos" style="margin-top:20px;">
      <!-- Fotos aquí -->
    </div>
  </ion-content>
</ion-page>
```

### Paso 4: Lógica JavaScript

```js
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Preferences } from '@capacitor/preferences';

let fotos = [];

// Tomar foto
document.getElementById('btn-foto').addEventListener('click', async () => {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });
    
    fotos.push({
      id: Date.now(),
      src: image.webPath,
      timestamp: new Date().toLocaleString(),
    });
    
    guardarFotos();
    mostrarFotos();
  } catch (err) {
    console.error('Error:', err);
  }
});

// Obtener ubicación
document.getElementById('btn-ubicacion').addEventListener('click', async () => {
  try {
    const coords = await Geolocation.getCurrentPosition();
    alert(`Ubicación: ${coords.coords.latitude}, ${coords.coords.longitude}`);
  } catch (err) {
    console.error('Error:', err);
  }
});

// Guardar localmente
async function guardarFotos() {
  await Preferences.set({
    key: 'misFotos',
    value: JSON.stringify(fotos),
  });
}

// Mostrar fotos
function mostrarFotos() {
  const contenedor = document.getElementById('fotos');
  contenedor.innerHTML = fotos.map(foto => `
    <ion-card>
      <img src="${foto.src}" alt="Foto">
      <ion-card-content>
        <p>${foto.timestamp}</p>
      </ion-card-content>
    </ion-card>
  `).join('');
}

// Cargar al iniciar
async function cargarFotos() {
  const { value } = await Preferences.get({ key: 'misFotos' });
  if (value) {
    fotos = JSON.parse(value);
    mostrarFotos();
  }
}

cargarFotos();
```

### Paso 5: Permisos (Android)

Edita `android/app/src/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

### Paso 6: Permisos (iOS)

En Xcode, edita Info.plist:

```
NSCameraUsageDescription: "Usamos la cámara para tomar fotos"
NSLocationWhenInUseUsageDescription: "Usamos tu ubicación para guardarla con cada foto"
```

### Paso 7: Compilar

```bash
npm run build
npx cap sync
npx cap open android  # o npx cap open ios
```

### Paso 8: Probar en emulador/dispositivo

Android Studio o Xcode compilan y despliegan automáticamente.

## Mejoras posibles

- Agregar botón para eliminar fotos
- Usar IndexedDB para más datos
- Compartir fotos vía email/WhatsApp
- Sincronizar con nube (Firebase, etc)
- Mostrar mapa con ubicaciones
