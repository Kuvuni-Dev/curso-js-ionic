# Configuración de Capacitor

Pasos para setup inicial de Capacitor en tu proyecto.

## Requisitos previos

- Node.js y npm instalados
- Proyecto Ionic o web existente
- Para iOS: Mac con Xcode
- Para Android: Android Studio

## Instalación inicial

### 1. Instalar Capacitor CLI y core

```bash
npm install @capacitor/core @capacitor/cli
```

### 2. Inicializar Capacitor

```bash
npx cap init
```

Te pedirá:
- Nombre de la app
- Identificador (ej: com.example.myapp)
- Directorio web (usualmente `dist` o `build`)

Esto crea `capacitor.config.json`:

```json
{
  "appId": "com.example.myapp",
  "appName": "Mi App",
  "webDir": "dist",
  "server": {
    "url": "http://localhost:8100"
  }
}
```

### 3. Agregar plataformas

```bash
npx cap add android
npx cap add ios
```

Esto crea carpetas `android/` e `ios/`.

## Configuración de desarrollo

### Modo live reload en emulador

Edita `capacitor.config.json`:

```json
{
  "server": {
    "url": "http://192.168.1.100:8100",
    "cleartext": true
  }
}
```

Luego sincroniza:

```bash
npx cap copy
npx cap open android
```

## Primeros pasos

### Compilar web

```bash
npm run build
```

### Sincronizar cambios

```bash
npx cap sync
```

### Abrir en IDE

```bash
npx cap open android    # Abre Android Studio
npx cap open ios        # Abre Xcode
```

## Archivo de configuración completo

```json
{
  "appId": "com.example.myapp",
  "appName": "Mi App",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "server": {
    "url": "http://localhost:8100",
    "cleartext": true
  },
  "plugins": {
    "SplashScreen": {
      "launchAutoHide": true
    }
  }
}
```

## Solución de problemas comunes

### "Cannot find android directory"
Ejecuta `npx cap add android` de nuevo.

### Live reload no funciona
Verifica que ambas máquinas estén en la misma red y el puerto 8100 esté abierto.

### Errores de permisos en iOS
Abre Xcode y actualiza los permisos en `Info.plist`.
