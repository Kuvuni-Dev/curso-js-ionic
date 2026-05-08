# Debugging de apps Capacitor

Técnicas para depurar y solucionar problemas en apps Capacitor.

## Debugging en web

El debugging en web es igual al desarrollo normal:

```bash
npm run dev
```

Abre DevTools (F12) y usa console, Network, Performance, etc.

## Debugging en dispositivo físico

### Android

#### Via USB

1. Habilita "Developer mode" en tu dispositivo
2. Conecta por USB
3. Autoriza debugging

En Android Studio:

```
View → Tool Windows → Logcat
```

O via terminal:

```bash
adb logcat
```

Ver logs específicos:

```bash
adb logcat *:E  # Solo errores
adb logcat | grep "mi-app"
```

### iOS

#### Via Xcode

1. Conecta el dispositivo
2. Abre el proyecto en Xcode
3. Product → Scheme → Edit Scheme
4. Run → Console (para ver logs)

#### Via web inspector remoto

Abre Safari en Mac:
- Develop → [tu dispositivo] → [tu app]

## Logs en Capacitor

### Desde JavaScript

```js
console.log('Mensaje normal');
console.warn('Advertencia');
console.error('Error importante');

// Con objeto
console.log('Data:', { usuario: 'Ana', edad: 25 });
```

### Logs nativos

Android:

```java
Log.d("MiApp", "Mensaje de debug");
```

iOS:

```swift
print("Mensaje de debug")
```

## Plugin de debugging

Usa el plugin de Capacitor Debug:

```bash
npm install @capacitor/debug
```

## Breakpoints y pasos

### Android Studio

1. Haz clic en el número de línea para crear un breakpoint
2. Run → Debug
3. Usa controles de paso (Step Over, Step Into, etc)

### Xcode

1. Haz clic en el número de línea para crear un breakpoint
2. Product → Scheme → Edit Scheme → Run → Debug
3. Usa controles similares

## Errores comunes

### "Plugin not found"

```bash
npx cap update
npx cap sync
```

### Permisos denegados

Verifica que los permisos están solicitados:

```js
import { Camera } from '@capacitor/camera';

try {
  const image = await Camera.getPhoto({...});
} catch (err) {
  if (err.message === 'User cancelled photos app') {
    console.log('Usuario canceló');
  }
}
```

### Crash sin mensaje de error

Revisa los logs del dispositivo:

```bash
adb logcat *:E  # Android
# iOS: Xcode Console
```

### Datos no persisten

Verifica que usas `Preferences` o bases de datos:

```js
import { Preferences } from '@capacitor/preferences';

await Preferences.set({ key: 'myData', value: JSON.stringify(data) });
```

## DevTools remoto (Android)

Puedes inspeccionar WebViews remotos:

1. En Chrome: `chrome://inspect`
2. Busca tu dispositivo/app
3. Click en "inspect"

## Pruebas automatizadas

Usa Detox o Appium para automatizar tests en dispositivos reales.

```bash
npm install detox detox-cli --save-dev
```

## Performance profiling

### Android

En Logcat, busca "frame drops" o usa:

```bash
adb shell dumpsys gfxinfo
```

### iOS

En Xcode:
- Debug → View Memory Hierarchy
- Instruments (para profiling detallado)

## Monitoreo en producción

Considera usar servicios como:

- **Sentry**: Captura errores
- **Firebase Crashlytics**: Análisis de crashes
- **LogRocket**: Session replay
