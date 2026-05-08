# Plugins de Capacitor

Los plugins de Capacitor permiten acceder a funcionalidades nativas del dispositivo.

## Plugins oficiales más usados

### Cámara

```bash
npm install @capacitor/camera
npx cap sync
```

Uso:

```js
import { Camera, CameraResultType } from '@capacitor/camera';

async function tomarFoto() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri,
  });
  console.log('Foto:', image.webPath);
}
```

### Geolocalización

```bash
npm install @capacitor/geolocation
npx cap sync
```

Uso:

```js
import { Geolocation } from '@capacitor/geolocation';

async function obtenerPosicion() {
  const coordinates = await Geolocation.getCurrentPosition();
  console.log('Latitud:', coordinates.coords.latitude);
  console.log('Longitud:', coordinates.coords.longitude);
}
```

### Almacenamiento

```bash
npm install @capacitor/preferences
npx cap sync
```

Uso:

```js
import { Preferences } from '@capacitor/preferences';

// Guardar
await Preferences.set({ key: 'usuario', value: 'Ana' });

// Obtener
const { value } = await Preferences.get({ key: 'usuario' });
console.log(value); // Ana
```

### Notificaciones push

```bash
npm install @capacitor/push-notifications
npx cap sync
```

Configuración en `capacitor.config.json`:

```json
{
  "plugins": {
    "PushNotifications": {
      "presentationOptions": ["badge", "sound", "alert"]
    }
  }
}
```

### Información del dispositivo

```bash
npm install @capacitor/device
npx cap sync
```

Uso:

```js
import { Device } from '@capacitor/device';

const info = await Device.getInfo();
console.log('Sistema:', info.operatingSystem);
console.log('Modelo:', info.model);
```

### Vibración

```bash
npm install @capacitor/haptics
npx cap sync
```

Uso:

```js
import { Haptics, ImpactStyle } from '@capacitor/haptics';

await Haptics.vibrate();
await Haptics.impact({ style: ImpactStyle.Heavy });
```

## Plugins comunitarios

Hay cientos de plugins comunitarios en [Capacitor Community](https://github.com/capacitor-community).

## Permisos

### Android

Edita `android/app/src/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

### iOS

Edita `Info.plist` en Xcode:

- `NSCameraUsageDescription`
- `NSLocationWhenInUseUsageDescription`
- etc.

## Manejo de errores

```js
try {
  const image = await Camera.getPhoto({...});
  console.log('Éxito:', image);
} catch (err) {
  console.error('Error:', err.message);
}
```

## Verificar disponibilidad

```js
import { Capacitor } from '@capacitor/core';

if (Capacitor.getPlatform() === 'web') {
  console.log('Corriendo en web');
} else if (Capacitor.getPlatform() === 'android') {
  console.log('Corriendo en Android');
}
```
