# Introducción a Capacitor

Capacitor es un framework que permite construir aplicaciones nativas para iOS, Android y web usando tecnologías web (HTML, CSS, JavaScript).

## ¿Qué es Capacitor?

Capacitor actúa como un puente entre tu código web y las APIs nativas del dispositivo. Puedes acceder a:

- Cámara
- Geolocalización
- Micrófono
- Almacenamiento
- Contactos
- Notificaciones push
- Y mucho más

## Capacitor vs Ionic

- **Ionic**: Framework para construir UI con componentes visuales
- **Capacitor**: Framework para acceder a APIs nativas del dispositivo

**Combinados**: La dupla perfecta para apps móviles. Ionic construye la interfaz, Capacitor accede al hardware.

## Instalación

```bash
npm install @capacitor/core @capacitor/cli
npx cap init
```

## Estructura de una app Capacitor

```
mi-app/
├── android/        # Proyecto Android nativo
├── ios/            # Proyecto iOS nativo
├── web/            # Código web
├── capacitor.config.json
└── package.json
```

## Flujo de desarrollo

1. Escribe código web con Ionic
2. Instala plugins de Capacitor según necesites
3. Compila para web: `npm run build`
4. Sincroniza con plataformas nativas: `npx cap sync`
5. Prueba en emulador o dispositivo real

## Ventajas

- ✅ Un solo código para web, iOS y Android
- ✅ Acceso completo a APIs nativas
- ✅ Progresivo: puedes añadir Capacitor después
- ✅ Basado en standards web
- ✅ Soportado por Ionic team

## Nota importante

Para compilar apps de iOS necesitas un Mac. Para Android, necesitas Android Studio.
