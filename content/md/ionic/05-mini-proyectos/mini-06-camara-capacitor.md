# Mini Proyecto 6: Cámara con Capacitor

## Objetivo
Acceder a la **cámara nativa del dispositivo** usando el plugin `@capacitor/camera` en una app Ionic con JavaScript puro. Tomar una foto o elegirla de la galería y mostrarla en pantalla.

> ⚠️ Este proyecto **requiere Capacitor** y ejecutarse en un dispositivo o emulador.  
> No funciona con solo `ionic serve` en el navegador (excepto con `CameraSource.Photos` en PWA limitado).

---

## Conceptos nuevos
- Plugin `@capacitor/camera`
- `Camera.getPhoto()` con opciones
- `CameraResultType` (Uri, Base64, DataUrl)
- `CameraSource` (Camera, Photos, Prompt)
- Manejo de permisos de cámara
- `Capacitor.isNativePlatform()` para detectar plataforma

---

## Resultado esperado
```
┌──────────────────────────────┐
│ 📸 Cámara con Capacitor      │
├──────────────────────────────┤
│                              │
│   [Sin foto todavía]         │
│                              │
│   ┌────────────────────┐     │
│   │                    │     │
│   │     foto.jpg       │     │  ← imagen tomada
│   │                    │     │
│   └────────────────────┘     │
│                              │
│  [📷 Cámara] [🖼️ Galería]    │
└──────────────────────────────┘
```

---

## Paso 1: Crear el proyecto base

```bash
# 1. Crear proyecto Ionic con Capacitor
ionic start mini-camara blank --type=react --capacitor
cd mini-camara

# O si usas un proyecto existente, asegúrate de tener Capacitor configurado
npm install @ionic/core @capacitor/core @capacitor/cli

# 2. Instalar el plugin de cámara
npm install @capacitor/camera

# 3. Sincronizar con la plataforma nativa
npx cap sync
```

---

## Paso 2: Permisos nativos

### Android — `android/app/src/main/AndroidManifest.xml`
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
<!-- Para Android < 13: -->
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

### iOS — `ios/App/App/Info.plist`
```xml
<key>NSCameraUsageDescription</key>
<string>Necesitamos acceso a la cámara para tomar fotos.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Necesitamos acceso a la galería para seleccionar fotos.</string>
```

> Estos permisos se añaden automáticamente con `npx cap sync` al instalar el plugin.

---

## Código: Vanilla JavaScript

### `index.html`
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cámara con Capacitor</title>
  <link href="https://cdn.jsdelivr.net/npm/@ionic/core@latest/css/ionic.bundle.css" rel="stylesheet">
  <style>
    #preview-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px 16px;
      gap: 16px;
    }
    #foto-preview {
      width: 100%;
      max-width: 400px;
      border-radius: 12px;
      display: none;
    }
    #placeholder {
      width: 100%;
      max-width: 400px;
      height: 250px;
      border: 2px dashed #ccc;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #aaa;
      font-size: 14px;
    }
    .botones {
      display: flex;
      gap: 12px;
    }
  </style>
</head>
<body>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>📸 Cámara con Capacitor</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div id="preview-container">
        <div id="placeholder">
          <span>Sin foto todavía</span>
        </div>
        <img id="foto-preview" alt="Foto tomada">

        <ion-note id="nombre-archivo" color="medium"></ion-note>

        <div class="botones">
          <ion-button id="btn-camara" expand="block">
            <ion-icon name="camera" slot="start"></ion-icon>
            Cámara
          </ion-button>
          <ion-button id="btn-galeria" expand="block" fill="outline">
            <ion-icon name="images" slot="start"></ion-icon>
            Galería
          </ion-button>
        </div>

        <ion-button id="btn-guardar" color="success" expand="block" disabled>
          <ion-icon name="save" slot="start"></ion-icon>
          Guardar foto
        </ion-button>
      </div>
    </ion-content>
  </ion-page>

  <script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core@latest/dist/ionic/ionic.esm.js"></script>
  <script nomodule src="https://cdn.jsdelivr.net/npm/@ionic/core@latest/dist/ionic/ionic.js"></script>

  <!-- Importar Capacitor y el plugin de cámara como módulos ES -->
  <script type="module">
    import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
    import { Capacitor } from '@capacitor/core';

    // ─── Referencias al DOM ───────────────────
    const preview     = document.getElementById('foto-preview');
    const placeholder = document.getElementById('placeholder');
    const nombreLabel = document.getElementById('nombre-archivo');
    const btnGuardar  = document.getElementById('btn-guardar');

    // ─── Función principal: tomar/seleccionar foto ─
    async function obtenerFoto(fuente) {
      try {
        const foto = await Camera.getPhoto({
          resultType: CameraResultType.DataUrl, // Devuelve base64 como data URL
          source: fuente,                        // Camera | Photos | Prompt
          quality: 90,                           // Calidad de compresión (0-100)
          allowEditing: false,                   // No mostrar editor
          width: 800,                            // Ancho máximo en px
        });

        // Mostrar la imagen
        preview.src = foto.dataUrl;
        preview.style.display = 'block';
        placeholder.style.display = 'none';
        nombreLabel.textContent = `Formato: ${foto.format} | Plataforma: ${Capacitor.getPlatform()}`;
        btnGuardar.disabled = false;

      } catch (error) {
        // El usuario canceló → no mostrar error
        if (error.message !== 'User cancelled photos app') {
          mostrarToast('No se pudo acceder a la cámara: ' + error.message, 'danger');
          console.error(error);
        }
      }
    }

    // ─── Guardar foto en localStorage ────────
    function guardarFoto() {
      if (!preview.src) return;
      const fotos = JSON.parse(localStorage.getItem('fotos_guardadas') || '[]');
      fotos.push({
        id: Date.now(),
        dataUrl: preview.src,
        fecha: new Date().toISOString()
      });
      localStorage.setItem('fotos_guardadas', JSON.stringify(fotos));
      mostrarToast('Foto guardada correctamente', 'success');
    }

    // ─── Toast helper ─────────────────────────
    async function mostrarToast(mensaje, color = 'primary') {
      const toast = document.createElement('ion-toast');
      toast.message = mensaje;
      toast.duration = 2500;
      toast.color = color;
      toast.position = 'bottom';
      document.body.appendChild(toast);
      await toast.present();
    }

    // ─── Eventos ──────────────────────────────
    document.getElementById('btn-camara').addEventListener('click', () => {
      obtenerFoto(CameraSource.Camera);
    });

    document.getElementById('btn-galeria').addEventListener('click', () => {
      obtenerFoto(CameraSource.Photos);
    });

    btnGuardar.addEventListener('click', guardarFoto);

    // ─── Info de plataforma al iniciar ────────
    const plataforma = Capacitor.getPlatform(); // 'ios' | 'android' | 'web'
    if (plataforma === 'web') {
      mostrarToast('Ejecuta la app en un dispositivo nativo para usar la cámara real.', 'warning');
    }
  </script>
</body>
</html>
```

---

## Explicación de las opciones de `Camera.getPhoto()`

```js
const foto = await Camera.getPhoto({
  // Tipo de resultado que devuelve el plugin:
  resultType: CameraResultType.DataUrl,
  //  ├── CameraResultType.Uri      → ruta al archivo en el sistema (más eficiente)
  //  ├── CameraResultType.Base64   → string base64 puro (sin prefijo)
  //  └── CameraResultType.DataUrl  → "data:image/jpeg;base64,..." (listo para <img>)

  // Fuente de la imagen:
  source: CameraSource.Camera,
  //  ├── CameraSource.Camera  → abre la cámara directamente
  //  ├── CameraSource.Photos  → abre la galería del dispositivo
  //  └── CameraSource.Prompt  → pregunta al usuario (cámara o galería)

  quality: 90,        // Calidad JPEG del 0 al 100
  width: 800,         // Redimensiona al ancho indicado (mantiene proporción)
  allowEditing: true, // Muestra recortador tras capturar (solo iOS nativo)
  saveToGallery: true // Guarda la foto en la galería del dispositivo
});
```

---

## Usar `CameraResultType.Uri` (recomendado para producción)

`DataUrl` carga toda la imagen en memoria. En producción es mejor usar `Uri`:

```js
const foto = await Camera.getPhoto({
  resultType: CameraResultType.Uri,
  source: CameraSource.Camera,
  quality: 90,
});

// foto.webPath → URL que el navegador WebView puede cargar
preview.src = Capacitor.convertFileSrc(foto.path);
```

---

## Comprobar y solicitar permisos manualmente

```js
import { Camera } from '@capacitor/camera';

async function verificarPermisos() {
  // Consultar estado actual de los permisos
  const permisos = await Camera.checkPermissions();
  // permisos.camera: 'granted' | 'denied' | 'prompt' | 'limited'
  // permisos.photos: 'granted' | 'denied' | 'prompt' | 'limited'

  if (permisos.camera !== 'granted') {
    // Solicitar permiso al usuario
    const resultado = await Camera.requestPermissions({ permissions: ['camera'] });
    if (resultado.camera !== 'granted') {
      alert('Sin permiso de cámara la app no puede funcionar.');
      return false;
    }
  }
  return true;
}

// Usar antes de llamar a Camera.getPhoto()
document.getElementById('btn-camara').addEventListener('click', async () => {
  const tienePermiso = await verificarPermisos();
  if (tienePermiso) obtenerFoto(CameraSource.Camera);
});
```

---

## Ejecutar en dispositivo

```bash
# Compilar el proyecto web
npm run build

# Copiar assets al proyecto nativo
npx cap copy

# Abrir Android Studio / Xcode
npx cap open android
npx cap open ios

# O ejecutar directamente (requiere dispositivo conectado)
npx cap run android
npx cap run ios
```

---

## Probar en el navegador (limitado)

```bash
ionic serve
```

En el navegador, `CameraSource.Photos` mostrará el selector de archivos del sistema operativo. `CameraSource.Camera` **no funciona** en web a menos que se configure el plugin PWA de cámara:

```bash
npm install @ionic/pwa-elements
```

```js
// En tu archivo de entrada (main.js)
import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);
```

---

## Resumen de conceptos

| Concepto | Descripción |
|---|---|
| `Camera.getPhoto()` | Abre cámara/galería y devuelve la imagen |
| `CameraResultType` | Formato del resultado: Uri, Base64 o DataUrl |
| `CameraSource` | Origen: cámara, galería o pregunta al usuario |
| `Camera.checkPermissions()` | Consulta el estado de los permisos |
| `Camera.requestPermissions()` | Solicita permisos al usuario |
| `Capacitor.getPlatform()` | Detecta si es `ios`, `android` o `web` |
| `Capacitor.convertFileSrc()` | Convierte ruta nativa a URL accesible por WebView |

---

## Extensión: galería de fotos guardadas

Tras completar este mini-proyecto puedes ampliar la app para:

1. Mostrar todas las fotos guardadas en localStorage como una galería (ver Mini 3)
2. Eliminar fotos de la galería con confirmación (ver Mini 4)
3. Subir la foto a un servidor (ver Mini 5 para el patrón fetch)

---

## Volver a los mini-proyectos
📍 **Mini 5: Consumo de API** ← anterior  
📍 Este es el último mini-proyecto del curso.
