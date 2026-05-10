# Instalación y setup de frameworks para Ionic

## Guía de instalación de React, Vue y Angular con Ionic

Una vez domines Ionic con **Vanilla JavaScript**, puedes usar el mismo conocimiento en otros frameworks.

---

## 0. Pre-requisitos (para todos)

Necesitas tener instalado:
- **Node.js** (v16+): https://nodejs.org
- **npm** (incluido con Node)
- **Ionic CLI**: 

```bash
npm install -g @ionic/cli
```

Verificar instalación:
```bash
node --version
npm --version
ionic --version
```

---

## 1. React + Ionic

### Instalación

```bash
# Crear proyecto Ionic con React
ionic start mi-app-react tabs --type react

# Entrar a la carpeta
cd mi-app-react

# Instalar dependencias (si no se instalan automáticamente)
npm install

# Iniciar servidor de desarrollo
npm start
```

### Estructura del proyecto

```
mi-app-react/
├── src/
│   ├── index.js              ← Punto de entrada
│   ├── App.js                ← Componente raíz
│   ├── App.css
│   ├── pages/
│   │   ├── Home.jsx          ← Página Home
│   │   ├── Home.css
│   │   ├── About.jsx
│   │   └── About.css
│   ├── components/           ← Componentes reutilizables
│   └── theme/
│       ├── variables.css
│       └── globals.css
├── public/
│   └── index.html
├── package.json
└── ionic.config.json
```

### Ejemplo básico: Contador

**src/pages/Home.jsx:**
```jsx
import { IonContent, IonPage, IonButton } from '@ionic/react';
import { useState } from 'react';

export default function Home() {
  const [contador, setContador] = useState(0);
  
  return (
    <IonPage>
      <IonContent>
        <h1>Contador: {contador}</h1>
        <IonButton onClick={() => setContador(contador + 1)}>
          Más
        </IonButton>
      </IonContent>
    </IonPage>
  );
}
```

### Routing en React + Ionic

**src/App.js:**
```jsx
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

export default function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}
```

### Recursos útiles

- Documentación React: https://react.dev
- Documentación Ionic React: https://ionicframework.com/docs/react
- Hooks de React: useState, useEffect, useContext

---

## 2. Vue + Ionic

### Instalación

```bash
# Crear proyecto Ionic con Vue
ionic start mi-app-vue tabs --type vue

# Entrar a la carpeta
cd mi-app-vue

# Instalar dependencias
npm install

# Iniciar servidor
npm run dev
```

### Estructura del proyecto

```
mi-app-vue/
├── src/
│   ├── main.js               ← Punto de entrada
│   ├── App.vue               ← Componente raíz
│   ├── pages/
│   │   ├── Home.vue          ← Página Home
│   │   └── About.vue
│   ├── components/           ← Componentes reutilizables
│   └── theme/
│       ├── variables.css
│       └── globals.css
├── public/
│   └── index.html
├── package.json
└── ionic.config.json
```

### Ejemplo básico: Contador

**src/pages/Home.vue:**
```vue
<template>
  <ion-page>
    <ion-content>
      <h1>Contador: {{ contador }}</h1>
      <ion-button @click="contador++">
        Más
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import { ref } from 'vue';

const contador = ref(0);
</script>
```

### Routing en Vue + Ionic

**src/router/index.js:**
```js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import About from '../pages/About.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
```

**src/App.vue:**
```vue
<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>
```

### Recursos útiles

- Documentación Vue: https://vuejs.org
- Documentación Ionic Vue: https://ionicframework.com/docs/vue
- Composables: ref, computed, watch

---

## 3. Angular + Ionic

### Instalación

```bash
# Crear proyecto Ionic con Angular
ionic start mi-app-angular tabs --type angular

# Entrar a la carpeta
cd mi-app-angular

# Instalar dependencias
npm install

# Iniciar servidor
ng serve
# O:
npm start
```

### Estructura del proyecto

```
mi-app-angular/
├── src/
│   ├── index.html
│   ├── main.ts               ← Punto de entrada
│   ├── app/
│   │   ├── app.component.ts  ← Componente raíz
│   │   ├── app.module.ts     ← Módulo principal
│   │   ├── app-routing.module.ts
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   │   ├── home.component.ts
│   │   │   │   ├── home.component.html
│   │   │   │   └── home.component.scss
│   │   │   └── about/
│   │   └── services/         ← Servicios
│   └── theme/
│       ├── variables.scss
│       └── global.scss
├── angular.json
├── tsconfig.json
└── package.json
```

### Ejemplo básico: Contador

**src/app/pages/home/home.component.ts:**
```typescript
import { Component } from '@angular/core';
import { IonContent, IonPage, IonButton } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  template: `
    <ion-page>
      <ion-content>
        <h1>Contador: {{ contador }}</h1>
        <ion-button (click)="contador = contador + 1">
          Más
        </ion-button>
      </ion-content>
    </ion-page>
  `,
  standalone: true,
  imports: [IonPage, IonContent, IonButton, CommonModule]
})
export class HomePage {
  contador = 0;
}
```

### Routing en Angular + Ionic

**src/app/app-routing.module.ts:**
```typescript
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.component';
import { AboutPage } from './pages/about/about.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'about', component: AboutPage }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

**src/app/app.component.html:**
```html
<ion-app>
  <ion-router-outlet></ion-router-outlet>
</ion-app>
```

### Recursos útiles

- Documentación Angular: https://angular.io
- Documentación Ionic Angular: https://ionicframework.com/docs/angular
- Decoradores: @Component, @Injectable
- Dependency Injection, RxJS Observables

---

## Comparación de setup

| Aspecto | React | Vue | Angular |
|---|---|---|---|
| **Comando inicial** | `ionic start ... --type react` | `ionic start ... --type vue` | `ionic start ... --type angular` |
| **Archivo componente** | `.jsx` | `.vue` | `.ts` |
| **Punto entrada** | `index.js` | `main.js` | `main.ts` |
| **Routing** | React Router | Vue Router | Angular Router |
| **Estado** | useState, Context | ref, reactive | @Input/@Output, Services |
| **Build** | `npm run build` | `npm run build` | `ng build` |

---

## Comandos comunes

### React
```bash
npm start                 # Iniciar dev
npm run build            # Build producción
npm test                 # Tests
```

### Vue
```bash
npm run dev              # Iniciar dev
npm run build            # Build producción
npm run test             # Tests
```

### Angular
```bash
ng serve                 # Iniciar dev
ng build                 # Build producción
ng test                  # Tests
ng generate component MyComponent  # Generar componente
```

---

## Siguiente paso: Mini-Proyectos

Después de entender la instalación de cada framework, irás a los **mini-proyectos**:

1. **Mini 1: Todo Simple**
   - Crear, listar tareas
   - Implementado en: Vanilla, React, Vue, Angular

2. **Mini 2: Todo con localStorage**
   - Persistencia de datos
   - En 4 sabores

3. **Mini 3: Galería de imágenes**
   - Cards, grillas
   - En 4 sabores

4. **Mini 4: Notas CRUD**
   - Create, Read, Update, Delete
   - En 4 sabores

5. **Mini 5: Consumo de API**
   - Fetch, promesas
   - En 4 sabores

---

## Tips importantes

### Para React
- Aprende hooks primero (useState, useEffect)
- React Router para navegación
- Context API o Redux para estado global

### Para Vue
- Aprende composables (ref, reactive)
- Vue Router para navegación
- Pinia para estado global

### Para Angular
- Aprende Dependency Injection desde el inicio
- RxJS Observables es importante
- Servicios para lógica compartida

### Para todos
- Instala **DevTools** de tu framework
- Lee documentación oficial (no tutoriales viejos)
- Practica con proyectos pequeños primero
