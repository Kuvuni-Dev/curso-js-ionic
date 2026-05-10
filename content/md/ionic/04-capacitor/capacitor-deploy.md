# Compilación y despliegue con Capacitor

Proceso completo para compilar tu app para iOS y Android.

## Flujo general

```
Código web
    ↓
npm run build
    ↓
npx cap sync
    ↓
Compilar en Xcode o Android Studio
    ↓
App .ipa (iOS) o .apk (Android)
```

## Compilar para Android

### 1. Preparar proyecto

```bash
npm run build
npx cap sync
npx cap open android
```

### 2. En Android Studio

- Abre `android/app` (carpeta del proyecto)
- Espera a que gradle sincronice
- Build → Build Bundle(s) / APK(s) → Build APK(s)

### 3. Ubicación del APK

```
android/app/build/outputs/apk/debug/app-debug.apk
```

### 4. Instalar en dispositivo

```bash
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

## Compilar para iOS

### 1. Preparar proyecto

```bash
npm run build
npx cap sync
npx cap open ios
```

### 2. En Xcode

- Abre el proyecto
- Selecciona un dispositivo o simulador
- Product → Build
- Product → Run

### 3. Generar IPA para App Store

- Product → Build
- Window → Organizer
- Distribute App
- Sigue el asistente

## Configuración de versión

Edita `capacitor.config.json`:

```json
{
  "appId": "com.example.myapp",
  "appName": "Mi App",
  "webDir": "dist",
  "bundledWebRuntime": false
}
```

O edita directamente en los IDEs:

**Android**: `android/app/build.gradle`
- `versionCode`
- `versionName`

**iOS**: Xcode → Target → General
- Version
- Build

## Optimizaciones para producción

### 1. Minificar código

```bash
npm run build -- --prod
```

### 2. Reducir tamaño de imágenes

Usa herramientas como ImageOptim o TinyPNG.

### 3. Lazy loading de componentes

Carga componentes solo cuando se necesitan.

### 4. Deshabilitar logs

En `capacitor.config.json`:

```json
{
  "plugins": {
    "CapacitorCookies": {
      "enabled": true
    }
  }
}
```

## Despliegue

### Google Play Store

1. Crea una cuenta de desarrollador
2. Genera un keystore (contraseña segura)
3. Firma el APK
4. Sube a Google Play Console

### Apple App Store

1. Crea una cuenta de desarrollador
2. Crea un certificado de distribución
3. Genera el IPA
4. Sube a App Store Connect

## Verificar compilación local

### Android emulator

```bash
npm run build
npx cap copy
npx cap open android
# En Android Studio: Run → Run 'app'
```

### iOS simulator

```bash
npm run build
npx cap copy
npx cap open ios
# En Xcode: Product → Run
```

## Troubleshooting

### "Command 'pod' not found" (iOS)
```bash
sudo gem install cocoapods
```

### "Gradle build failed" (Android)
```bash
cd android
./gradlew clean
cd ..
npx cap sync
```

### Cambios no reflejados en app
```bash
npx cap clean
npm run build
npx cap sync
```
