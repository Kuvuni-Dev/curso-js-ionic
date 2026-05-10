# 1. Estructura de un proyecto Ionic

## Objetivo
Entender cómo está organizado un proyecto Ionic y qué función tiene cada carpeta y archivo.

## ¿Qué es la estructura de un proyecto?

Cuando creas una app Ionic, se genera automáticamente una serie de carpetas y archivos que trabajan juntos. Es como la "anatomía" de tu aplicación.

---

## Estructura de carpetas (proyecto vanilla)

```
mi-app-ionic/
├── index.html          ← Página principal (punto de entrada)
├── package.json        ← Dependencias y scripts
├── ionic.config.json   ← Configuración de Ionic
├── tsconfig.json       ← (Si usas TypeScript)
│
├── src/
│   ├── index.html      ← HTML raíz
│   ├── main.js         ← Script de entrada
│   ├── styles/
│   │   ├── global.css  ← Estilos globales
│   │   └── variables.css ← Colores, tamaños (temas)
│   │
│   ├── pages/          ← Pantallas de tu app
│   │   ├── home/
│   │   │   ├── home.html
│   │   │   ├── home.js
│   │   │   └── home.css
│   │   └── about/
│   │       ├── about.html
│   │       ├── about.js
│   │       └── about.css
│   │
│   └── components/     ← Componentes reutilizables
│       ├── header.js
│       ├── footer.js
│       └── card.js
│
├── assets/             ← Imágenes, iconos, fuentes
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── www/                ← Archivos compilados (generados)
└── node_modules/       ← Dependencias (no editar)
```

---

## Archivos importantes

### `index.html` (en src/)

Es la **página HTML que carga Ionic**. Aquí va todo:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi App Ionic</title>
  
  <!-- Estilos de Ionic -->
  <link href="https://cdn.jsdelivr.net/npm/@ionic/core@latest/css/ionic.bundle.css" rel="stylesheet">
  <!-- Tus estilos -->
  <link rel="stylesheet" href="styles/global.css">
</head>
<body>
  <!-- Aquí va tu app -->
  <div id="app"></div>
  
  <!-- Ionic Core JS -->
  <script src="https://cdn.jsdelivr.net/npm/@ionic/core@latest/dist/ionic.js"></script>
  <!-- Tu script principal -->
  <script type="module" src="main.js"></script>
</body>
</html>
```

### `main.js`

El **punto de entrada** de tu aplicación:

```js
// main.js
import { setupIonicReact } from '@ionic/react';
import { Router } from './router.js';
import './styles/global.css';

// Inicializar Ionic
setupIonicReact();

// Cargar router y mostrar app
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  app.innerHTML = '<ion-app><ion-router></ion-router></ion-app>';
  
  // Inicializar rutas
  Router.init();
});
```

### `package.json`

Define las dependencias (librerías que necesita tu app):

```json
{
  "name": "mi-app-ionic",
  "version": "1.0.0",
  "scripts": {
    "start": "ionic serve",
    "build": "ionic build",
    "test": "npm run test"
  },
  "dependencies": {
    "@ionic/core": "^7.0.0",
    "@ionic/react": "^7.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

**Comandos importantes:**
- `npm start` - Inicia servidor de desarrollo
- `npm run build` - Compila para producción
- `npm install` - Instala dependencias

### `ionic.config.json`

Configuración específica de Ionic:

```json
{
  "name": "mi-app-ionic",
  "integrations": {
    "cordova": {}
  },
  "type": "react",
  "proxies": [
    {
      "path": "/api",
      "proxyUrl": "https://api.ejemplo.com"
    }
  ]
}
```

### `variables.css`

Define **colores y temas** globales:

```css
/* variables.css */
:root {
  --ion-color-primary: #3880ff;
  --ion-color-secondary: #3dc2ff;
  --ion-color-danger: #f04141;
  --ion-color-warning: #ffce00;
  --ion-color-success: #10dc60;
  --ion-color-dark: #222428;
  --ion-color-light: #f4f5f8;
}
```

Luego los usas en CSS:

```css
ion-button {
  background-color: var(--ion-color-primary);
}
```

---

## Estructura de una página (page)

Cada página tiene 3 archivos:

### home.html
```html
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-title>Inicio</ion-title>
    </ion-toolbar>
  </ion-header>
  
  <ion-content>
    <h1>Bienvenido a mi app</h1>
    <button id="btn-click">Haz click</button>
  </ion-content>
</ion-page>
```

### home.js
```js
// Lógica de la página
export function initHomePage() {
  const btn = document.getElementById('btn-click');
  btn.addEventListener('click', () => {
    console.log('¡Click!');
  });
}
```

### home.css
```css
/* Estilos específicos */
ion-content {
  --padding: 20px;
}

h1 {
  color: var(--ion-color-primary);
}
```

---

## Flujo de carga

Cuando abres tu app, esto sucede en orden:

```
1. Navegador carga index.html
        ↓
2. Se cargan estilos (CSS)
        ↓
3. Se carga main.js
        ↓
4. main.js inicializa Ionic
        ↓
5. Se configura el router
        ↓
6. Se muestra la primera página
        ↓
7. Usuario interactúa → se cargan más páginas
```

---

## Buenas prácticas

✅ **DO:**
- Mantén cada página en su propia carpeta
- Usa nombres descriptivos (home, about, productos, etc.)
- Agrupa componentes relacionados
- Guarda assets en la carpeta `assets/`

❌ **DON'T:**
- Editar archivos en `www/` (se regeneran)
- Editar `node_modules/` (se sobrescriben)
- Mezclar HTML, JS y CSS en un solo archivo (para proyectos grandes)
- Ignorar `ionic.config.json`

---

## Resumen

| Carpeta/Archivo | Función |
|---|---|
| `index.html` | Punto de entrada HTML |
| `main.js` | Inicializa la app |
| `src/pages/` | Pantallas |
| `src/components/` | Componentes reutilizables |
| `src/styles/` | Estilos globales |
| `assets/` | Imágenes, fuentes |
| `package.json` | Dependencias |
| `www/` | Compilado final (no editar) |

---

## Próximos pasos

Una vez domines la estructura, aprenderás:
1. ✅ Estructura de proyecto (AHORA)
2. 📍 Layout esencial (header, content, footer)
3. Componentes básicos
4. Navegación
5. Eventos y manejo de datos
