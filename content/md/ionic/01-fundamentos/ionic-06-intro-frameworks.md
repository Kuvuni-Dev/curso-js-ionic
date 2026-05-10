# 6. Introducción a frameworks: React, Vue y Angular

## Objetivo
Entender qué es cada framework y sus diferencias básicas con vanilla JavaScript.

## ¿Qué es un framework?

Un **framework** es una estructura que te ayuda a organizar código de forma más eficiente.

Sin framework (vanilla):
- Tienes que manejar todo manualmente
- Más código
- Fácil para proyectos pequeños

Con framework:
- Estructura predefinida
- Menos código repetitivo
- Mejor para proyectos grandes

---

## Comparación rápida

| Aspecto | Vanilla | React | Vue | Angular |
|---|---|---|---|---|
| **Curva aprendizaje** | Fácil | Media | Fácil | Difícil |
| **Líneas de código** | Muchas | Menos | Menos | Menos |
| **Tamaño final** | Pequeño | Grande | Mediano | Muy grande |
| **Popularidad** | - | Altísima | Alta | Media |
| **Mejor para** | Demos | Grandes apps | Medianas | Enterprise |
| **Comunidad** | - | Gigante | Buena | Grande |

---

## Vanilla JavaScript (Baseline)

### Contar clics

```js
let contador = 0;

document.getElementById('boton').addEventListener('click', () => {
  contador++;
  document.getElementById('numero').textContent = contador;
});
```

**Características:**
- ✅ Directo y claro
- ✅ Máximo control
- ❌ Mucho código manual
- ❌ Difícil de mantener en proyectos grandes

---

## React

### ¿Qué es?

React es una librería para construir interfaces con **componentes reutilizables**.

**Idea principal:** Tu UI = Función(datos)

```
datos → función → UI
```

### Contar clics con React

```jsx
import { useState } from 'react';

function Contador() {
  const [contador, setContador] = useState(0);
  
  return (
    <div>
      <h1>{contador}</h1>
      <button onClick={() => setContador(contador + 1)}>
        Más
      </button>
    </div>
  );
}

export default Contador;
```

**Características:**
- ✅ Componentes reutilizables
- ✅ Estado con hooks (useState, useEffect)
- ✅ Virtual DOM (más rápido)
- ✅ Comunidad gigante
- ❌ Curva de aprendizaje media
- ❌ Requiere más dependencias

### Concepto: Hooks

Los **hooks** son funciones especiales que manejan estado y efectos:

```jsx
const [valor, setValor] = useState(inicial);  // Estado
useEffect(() => { ... }, []);                  // Efecto secundario
```

### Con Ionic

```jsx
import { IonButton, IonContent, IonPage } from '@ionic/react';
import { useState } from 'react';

export default function Home() {
  const [contador, setContador] = useState(0);
  
  return (
    <IonPage>
      <IonContent>
        <h1>{contador}</h1>
        <IonButton onClick={() => setContador(contador + 1)}>
          Más
        </IonButton>
      </IonContent>
    </IonPage>
  );
}
```

---

## Vue

### ¿Qué es?

Vue es un framework para construir UIs con **sintaxis más sencilla** que React.

**Idea:** Template + Script + Styles en un archivo

### Contar clics con Vue

```vue
<template>
  <div>
    <h1>{{ contador }}</h1>
    <button @click="contador++">
      Más
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const contador = ref(0);
</script>

<style scoped>
h1 { color: blue; }
</style>
```

**Características:**
- ✅ Sintaxis más simple que React
- ✅ Archivos .vue (HTML, JS, CSS juntos)
- ✅ Reactividadautomática
- ✅ Muy eficiente
- ❌ Comunidad más pequeña
- ❌ Menos empleos que React

### Concepto: ref

**ref** es similar a useState de React:

```js
const contador = ref(0);  // Reactivo
contador.value++;         // Cambiar valor
```

### Con Ionic

```vue
<template>
  <IonPage>
    <IonContent>
      <h1>{{ contador }}</h1>
      <IonButton @click="contador++">
        Más
      </IonButton>
    </IonContent>
  </IonPage>
</template>

<script setup>
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import { ref } from 'vue';

const contador = ref(0);
</script>
```

---

## Angular

### ¿Qué es?

Angular es un **framework completo** de Google para aplicaciones grandes.

Incluye todo: routing, forms, HTTP, validación, etc.

**Idea:** TypeScript + Decoradores + Módulos

### Contar clics con Angular

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-contador',
  template: `
    <div>
      <h1>{{ contador }}</h1>
      <button (click)="contador = contador + 1">
        Más
      </button>
    </div>
  `
})
export class ContadorComponent {
  contador = 0;
}
```

**Características:**
- ✅ Framework completo
- ✅ Muy modular y estructurado
- ✅ TypeScript (tipado)
- ✅ Excelente para aplicaciones grandes
- ❌ Curva de aprendizaje difícil
- ❌ Mucho boilerplate (código repetitivo)
- ❌ Compilación lenta

### Concepto: Decoradores

Los **decoradores** son sintaxis especial de TypeScript:

```typescript
@Component(...)   // Define componente
@Injectable()     // Define servicio
@NgModule(...)    // Define módulo
```

### Con Ionic

```typescript
import { Component } from '@angular/core';
import { IonButton, IonContent, IonPage } from '@ionic/angular';

@Component({
  selector: 'app-home',
  template: `
    <ion-page>
      <ion-content>
        <h1>{{ contador }}</h1>
        <ion-button (click)="contador = contador + 1">
          Más
        </ion-button>
      </ion-content>
    </ion-page>
  `,
  standalone: true,
  imports: [IonPage, IonContent, IonButton]
})
export class HomePage {
  contador = 0;
}
```

---

## Comparación lado a lado: Contador

### Vanilla JavaScript
```js
let contador = 0;
document.getElementById('boton').addEventListener('click', () => {
  contador++;
  document.getElementById('numero').textContent = contador;
});
```
**Líneas:** 4

### React
```jsx
function Contador() {
  const [contador, setContador] = useState(0);
  return (
    <div>
      <h1>{contador}</h1>
      <button onClick={() => setContador(contador + 1)}>Más</button>
    </div>
  );
}
```
**Líneas:** 8

### Vue
```vue
<template>
  <div>
    <h1>{{ contador }}</h1>
    <button @click="contador++">Más</button>
  </div>
</template>

<script setup>
const contador = ref(0);
</script>
```
**Líneas:** 10 (pero más legible)

### Angular
```typescript
@Component({
  selector: 'app-contador',
  template: `
    <div>
      <h1>{{ contador }}</h1>
      <button (click)="contador = contador + 1">Más</button>
    </div>
  `
})
export class ContadorComponent {
  contador = 0;
}
```
**Líneas:** 12

---

## ¿Cuál elegir?

### Elige **Vanilla JS** si:
- Proyecto muy pequeño (< 500 líneas)
- Presupuesto limitado
- Aprendiendo a programar
- App sencilla sin mucho estado

### Elige **React** si:
- Proyecto mediano-grande
- Necesitas comunidad amplia
- Empleabilidad importante
- Mucho estado que manejar

### Elige **Vue** si:
- Prefieres sintaxis simple
- Proyecto mediano
- Quieres rapidez de desarrollo
- No necesitas mucha documentación corporate

### Elige **Angular** si:
- Aplicación enterprise grande
- Necesitas TypeScript
- Estructura muy definida
- Equipo numeroso

---

## Próximos pasos

Una vez domines **vanilla con Ionic**, aprenderás a usar el mismo concepto en:

1. ✅ Vanilla + Ionic (HECHO)
2. 📍 React + Ionic (guía de instalación)
3. 📍 Vue + Ionic (guía de instalación)
4. 📍 Angular + Ionic (guía de instalación)

Luego irás a los **mini-proyectos** donde implementarás lo mismo en los 4 "sabores".

---

## Resumen conceptual

| Framework | Filosofía |
|---|---|
| **Vanilla** | Manual, total control |
| **React** | UI = Función(estado) |
| **Vue** | Template reactivo |
| **Angular** | TypeScript + decoradores |

**Recuerda:** La lógica es la misma en los 4. Solo cambia la sintaxis.

---

## Próximos pasos

1. ✅ Estructura de proyecto
2. ✅ Layout esencial
3. ✅ Componentes básicos
4. ✅ Navegación básica
5. ✅ Eventos y datos
6. ✅ Introducción a frameworks (AHORA)
7. 📍 Guía de instalación: React, Vue, Angular
