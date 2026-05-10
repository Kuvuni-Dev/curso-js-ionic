# 2. Layout esencial: Header, Content y Footer

## Objetivo
Construir el layout básico que usan el 90% de las aplicaciones Ionic.

## Los 3 pilares del layout Ionic

Casi toda app Ionic usa este estructura:

```
┌─────────────────┐
│ HEADER          │  ← Encabezado (título, botones)
├─────────────────┤
│                 │
│  CONTENT        │  ← Contenido principal (desplazable)
│                 │
├─────────────────┤
│ FOOTER          │  ← Pie de página (nav, botones)
└─────────────────┘
```

---

## 1. ion-page (El contenedor raíz)

Toda pantalla debe estar dentro de `<ion-page>`:

```html
<ion-page>
  <!-- Tu contenido aquí -->
</ion-page>
```

**¿Por qué?**
- Define el área de la pantalla
- Ionic maneja el tamaño, estilos y transiciones automáticamente
- Sin `ion-page`, los estilos no funcionan bien

---

## 2. ion-header (Encabezado)

Va al **inicio** de la página, siempre visible arriba:

```html
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-title>Mi Aplicación</ion-title>
    </ion-toolbar>
  </ion-header>
</ion-page>
```

### Header con más opciones

```html
<ion-header>
  <ion-toolbar>
    <!-- Botón izquierda -->
    <ion-buttons slot="start">
      <ion-back-button></ion-back-button>
    </ion-buttons>
    
    <!-- Título central -->
    <ion-title>Detalles</ion-title>
    
    <!-- Botón derecha -->
    <ion-buttons slot="end">
      <ion-button>
        <ion-icon name="settings"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
```

**Slots disponibles:**
- `slot="start"` - Izquierda
- `slot="end"` - Derecha
- Omitir slot - Centro

### Tipos de toolbar

**Toolbar claro (default):**
```html
<ion-toolbar>
  <ion-title>Claro</ion-title>
</ion-toolbar>
```

**Toolbar con color:**
```html
<ion-toolbar color="primary">
  <ion-title>Primario</ion-title>
</ion-toolbar>
```

**Toolbar oscuro:**
```html
<ion-toolbar color="dark">
  <ion-title>Oscuro</ion-title>
</ion-toolbar>
```

---

## 3. ion-content (Contenido principal)

El área **desplazable** donde va todo tu contenido:

```html
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-title>Inicio</ion-title>
    </ion-toolbar>
  </ion-header>
  
  <ion-content>
    <h1>Mi contenido</h1>
    <p>Texto largo que se puede desplazar...</p>
    <p>Más contenido aquí...</p>
  </ion-content>
</ion-page>
```

### Propiedades útiles de ion-content

**Padding (espaciado interno):**
```html
<ion-content class="ion-padding">
  <!-- Añade padding alrededor -->
</ion-content>
```

**Scroll vertical deshabilitado:**
```html
<ion-content scroll-y="false">
  <!-- Sin desplazamiento vertical -->
</ion-content>
```

**Color de fondo:**
```html
<ion-content color="light">
  <!-- Fondo claro -->
</ion-content>
```

**Centrado vertical:**
```html
<ion-content class="ion-align-items-center ion-justify-content-center">
  <!-- Contenido centrado -->
</ion-content>
```

---

## 4. ion-footer (Pie de página)

Va al **final** de la página, siempre visible abajo:

```html
<ion-page>
  <ion-header>
    <ion-toolbar>
      <ion-title>Inicio</ion-title>
    </ion-toolbar>
  </ion-header>
  
  <ion-content>
    <!-- Tu contenido -->
  </ion-content>
  
  <ion-footer>
    <ion-toolbar>
      <ion-title>Pie de página</ion-title>
    </ion-toolbar>
  </ion-footer>
</ion-page>
```

### Footer con navegación (tabbar)

Muy común para navegar entre secciones:

```html
<ion-footer>
  <ion-tabs>
    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="home">
        <ion-icon name="home"></ion-icon>
        <ion-label>Inicio</ion-label>
      </ion-tab-button>
      
      <ion-tab-button tab="explore">
        <ion-icon name="search"></ion-icon>
        <ion-label>Explorar</ion-label>
      </ion-tab-button>
      
      <ion-tab-button tab="profile">
        <ion-icon name="person"></ion-icon>
        <ion-label>Perfil</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</ion-footer>
```

---

## Ejemplo completo: Layout básico

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi App</title>
  <link href="https://cdn.jsdelivr.net/npm/@ionic/core@latest/css/ionic.bundle.css" rel="stylesheet">
  <style>
    body { margin: 0; padding: 0; }
  </style>
</head>
<body>
  <!-- ESTRUCTURA BÁSICA -->
  <ion-page>
    
    <!-- HEADER -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Mi Aplicación</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <!-- CONTENT (parte desplazable) -->
    <ion-content class="ion-padding">
      <h1>¡Bienvenido!</h1>
      <p>Este es el contenido principal de la aplicación.</p>
      <p>Puedes desplazarte arriba y abajo si hay contenido suficiente.</p>
      
      <!-- Botón -->
      <ion-button expand="block" color="primary">
        Mi primer botón Ionic
      </ion-button>
      
      <!-- Más contenido para probar scroll -->
      <h2>Sección 2</h2>
      <p>Lorem ipsum dolor sit amet...</p>
      <h2>Sección 3</h2>
      <p>Lorem ipsum dolor sit amet...</p>
    </ion-content>
    
    <!-- FOOTER -->
    <ion-footer>
      <ion-toolbar>
        <ion-title>© 2024 Mi App</ion-title>
      </ion-toolbar>
    </ion-footer>
    
  </ion-page>

  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/@ionic/core@latest/dist/ionic.js"></script>
</body>
</html>
```

---

## Responsive: Adaptarse a diferentes tamaños

Los layouts de Ionic se adaptan automáticamente a móvil, tablet y desktop:

```html
<!-- Visible solo en móvil -->
<div class="ion-hide-md-up">
  Solo móvil
</div>

<!-- Visible en tablet y desktop -->
<div class="ion-hide-sm">
  Tablet y desktop
</div>

<!-- Clases disponibles -->
.ion-hide-sm     /* Ocultar en móvil */
.ion-hide-md     /* Ocultar en tablet */
.ion-hide-lg     /* Ocultar en desktop */
.ion-hide-sm-up  /* Ocultar en móvil y más grande */
.ion-hide-md-up  /* Ocultar en tablet y más grande */
```

---

## Espaciado y utilidades

Ionic incluye clases útiles:

**Padding:**
```html
<div class="ion-padding">
  Padding en todos los lados
</div>

<div class="ion-padding-top">
  Solo arriba
</div>

<div class="ion-padding-horizontal">
  Solo izquierda y derecha
</div>
```

**Margen:**
```html
<div class="ion-margin">
  Margen en todos los lados
</div>

<div class="ion-margin-vertical">
  Solo arriba y abajo
</div>
```

**Texto:**
```html
<div class="ion-text-center">
  Texto centrado
</div>

<div class="ion-text-right">
  Texto a la derecha
</div>

<div class="ion-text-uppercase">
  MAYÚSCULAS
</div>
```

---

## Orden de elementos (¡importante!)

El orden debe ser siempre:

```html
<ion-page>
  1. <ion-header>...</ion-header>
  2. <ion-content>...</ion-content>
  3. <ion-footer>...</ion-footer>
</ion-page>
```

**❌ INCORRECTO:**
```html
<ion-page>
  <ion-footer>...</ion-footer>  <!-- Arriba primero = mal -->
  <ion-content>...</ion-content>
  <ion-header>...</ion-header>
</ion-page>
```

---

## Resumen

| Componente | Ubicación | Función |
|---|---|---|
| `<ion-page>` | Raíz | Contenedor de la pantalla |
| `<ion-header>` | Arriba | Encabezado fijo |
| `<ion-content>` | Centro | Contenido desplazable |
| `<ion-footer>` | Abajo | Pie de página fijo |
| `<ion-toolbar>` | Header/Footer | Barra de herramientas |
| `<ion-title>` | Dentro toolbar | Título |

---

## Próximos pasos

1. ✅ Estructura de proyecto
2. ✅ Layout esencial (AHORA)
3. 📍 Componentes básicos (buttons, inputs, lists)
4. Navegación
5. Eventos y manejo de datos
