# 4. Navegación básica en Ionic

## Objetivo
Navegar entre páginas sin recargar toda la aplicación (SPA - Single Page Application).

## ¿Qué es la navegación en Ionic?

En Ionic, **no cambias de archivo HTML**, en lugar de eso:
1. El usuario hace click
2. Se muestra/oculta contenido
3. La URL cambia (sin recargar)
4. Las transiciones son suaves

Esto se llama **SPA (Single Page Application)**.

---

## Los 3 conceptos clave

### 1. Ion-Router
Componente que **mantiene control de rutas**:

```html
<ion-router>
  <ion-route path="/" component="page-home"></ion-route>
  <ion-route path="/about" component="page-about"></ion-route>
  <ion-route path="/contact" component="page-contact"></ion-route>
</ion-router>
```

### 2. Ion-Route-Link
**Link para navegar** (como `<a>` pero sin recargar):

```html
<ion-route-link href="/about">
  Ir a About
</ion-route-link>

<ion-button routerLink="/about">
  Sobre nosotros
</ion-button>
```

### 3. Parámetros en URL
**Pasar datos a través de la URL**:

```
/usuario/123        ← 123 es el parámetro
/producto/abc       ← abc es el parámetro
/comentario/5       ← 5 es el parámetro
```

---

## Estructura de navegación básica

```html
<!DOCTYPE html>
<html>
<head>
  <title>Mi App</title>
  <link href="https://cdn.jsdelivr.net/npm/@ionic/core@latest/css/ionic.bundle.css" rel="stylesheet">
</head>
<body>
  <ion-app>
    
    <!-- ROUTER: Controla las rutas -->
    <ion-router>
      <ion-route path="/" component="home-page"></ion-route>
      <ion-route path="/about" component="about-page"></ion-route>
      <ion-route path="/contact" component="contact-page"></ion-route>
    </ion-router>
    
    <!-- CONTENEDOR: Aquí se muestra el contenido -->
    <ion-router-outlet></ion-router-outlet>
    
  </ion-app>

  <script src="https://cdn.jsdelivr.net/npm/@ionic/core@latest/dist/ionic.js"></script>
  <script src="main.js"></script>
</body>
</html>
```

---

## Ejemplo 1: Navegación simple

### HTML
```html
<ion-page id="home-page">
  <ion-header>
    <ion-toolbar>
      <ion-title>Inicio</ion-title>
    </ion-toolbar>
  </ion-header>
  
  <ion-content class="ion-padding">
    <h1>¡Bienvenido!</h1>
    
    <ion-button color="primary" routerLink="/about">
      Ver About
    </ion-button>
  </ion-content>
</ion-page>
```

### JavaScript
```js
// No necesita JavaScript especial
// Ionic maneja todo automáticamente
```

---

## Ejemplo 2: Con parámetros

### HTML
```html
<!-- Página de detalles con parámetro :id -->
<ion-page id="detalle-page">
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons>
      <ion-title>Detalle</ion-title>
    </ion-toolbar>
  </ion-header>
  
  <ion-content class="ion-padding">
    <h1>Usuario #<span id="user-id"></span></h1>
    <p id="user-info"></p>
  </ion-content>
</ion-page>
```

### Definir ruta con parámetro
```html
<ion-router>
  <ion-route path="/" component="home-page"></ion-route>
  <ion-route path="/usuario/:id" component="detalle-page"></ion-route>
</ion-router>
```

### Navegar con parámetro
```html
<!-- Link con parámetro -->
<ion-route-link href="/usuario/123">Ver usuario 123</ion-route-link>
<ion-route-link href="/usuario/456">Ver usuario 456</ion-route-link>
```

### JavaScript para obtener parámetro
```js
// Obtener parámetro de la URL
function extraerParametro() {
  const pathname = window.location.pathname;
  const id = pathname.split('/usuario/')[1];
  
  document.getElementById('user-id').textContent = id;
  document.getElementById('user-info').textContent = `Cargando datos de usuario ${id}...`;
}

// Llamar cuando cambie la ruta
window.addEventListener('ionRouteDidChange', extraerParametro);
document.addEventListener('DOMContentLoaded', extraerParametro);
```

---

## Ejemplo 3: Navegación programática

### Ir a una página desde JavaScript
```html
<ion-button id="btn-ir">Ir a About</ion-button>

<script>
document.getElementById('btn-ir').addEventListener('click', () => {
  // Opción 1: Cambiar location directamente
  window.location.href = '#/about';
  
  // Opción 2: Usar router (si tienes acceso)
  // router.push('/about');
});
</script>
```

### Volver atrás
```html
<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <!-- Botón back automático -->
      <ion-back-button></ion-back-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
```

O manualmente:
```html
<ion-button id="btn-volver">Volver</ion-button>

<script>
document.getElementById('btn-volver').addEventListener('click', () => {
  window.history.back();
});
</script>
```

---

## Ejemplo completo: App con 3 páginas

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi App Multi-página</title>
  <link href="https://cdn.jsdelivr.net/npm/@ionic/core@latest/css/ionic.bundle.css" rel="stylesheet">
</head>
<body>
  <ion-app>
    
    <!-- RUTAS -->
    <ion-router>
      <ion-route path="/" component="home-page"></ion-route>
      <ion-route path="/about" component="about-page"></ion-route>
      <ion-route path="/producto/:id" component="detalle-page"></ion-route>
    </ion-router>
    
    <!-- CONTENEDOR DE PÁGINAS -->
    <ion-router-outlet></ion-router-outlet>
    
  </ion-app>

  <!-- PÁGINA 1: Home -->
  <template id="home-page">
    <ion-page>
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Inicio</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-content class="ion-padding">
        <h1>¡Bienvenido!</h1>
        
        <ion-button expand="block" color="primary" routerLink="/about">
          Ir a About
        </ion-button>
        
        <h2>Productos</h2>
        <ion-list>
          <ion-item routerLink="/producto/1">
            <ion-label>Producto 1</ion-label>
          </ion-item>
          <ion-item routerLink="/producto/2">
            <ion-label>Producto 2</ion-label>
          </ion-item>
          <ion-item routerLink="/producto/3">
            <ion-label>Producto 3</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-page>
  </template>

  <!-- PÁGINA 2: About -->
  <template id="about-page">
    <ion-page>
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button></ion-back-button>
          </ion-buttons>
          <ion-title>Acerca de</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-content class="ion-padding">
        <h1>Sobre esta app</h1>
        <p>Esta es una aplicación Ionic de ejemplo.</p>
        <p>Demuestra navegación entre páginas sin recargar.</p>
        
        <ion-button expand="block" fill="outline" routerLink="/">
          Volver a inicio
        </ion-button>
      </ion-content>
    </ion-page>
  </template>

  <!-- PÁGINA 3: Detalle de producto -->
  <template id="detalle-page">
    <ion-page>
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button></ion-back-button>
          </ion-buttons>
          <ion-title>Detalle</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-content class="ion-padding">
        <h1>Producto #<span id="producto-id"></span></h1>
        <p>ID: <span id="producto-info"></span></p>
        <p>Precio: $19.99</p>
        
        <ion-button expand="block" color="success">
          Comprar
        </ion-button>
      </ion-content>
    </ion-page>
  </template>

  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/@ionic/core@latest/dist/ionic.js"></script>
  
  <script>
    // Renderizar templates como páginas
    document.querySelectorAll('template').forEach(template => {
      const id = template.id;
      const component = `<${id}></${id}>`;
      
      // Crear elemento desde template
      const element = template.content.cloneNode(true);
      window.customElements.define(id, class extends HTMLElement {
        constructor() {
          super();
          this.appendChild(element.cloneNode(true));
        }
      });
    });
    
    // Actualizar ID cuando cambie la ruta
    window.addEventListener('ionRouteDidChange', () => {
      const id = window.location.pathname.split('/producto/')[1];
      if (id) {
        document.getElementById('producto-id').textContent = id;
        document.getElementById('producto-info').textContent = id;
      }
    });
  </script>
</body>
</html>
```

---

## Transiciones de página

Ionic añade transiciones automáticamente:

```html
<!-- Animación iOS (default) -->
<ion-router>
  <ion-route path="/" component="home-page"></ion-route>
</ion-router>

<!-- Cambiar animación -->
<ion-router animation="fade">
  <ion-route path="/" component="home-page"></ion-route>
</ion-router>
```

Animaciones disponibles:
- `ios` (default en iOS)
- `md` (default en Android)
- `fade`

---

## Parámetros query vs path params

### Path parameters (en la ruta)
```
/usuario/123     ← 123 es path param
```

```html
<ion-route path="/usuario/:id" component="user-page"></ion-route>
```

### Query parameters (en la query string)
```
/usuario?id=123&nombre=juan
```

```html
<ion-route-link href="/usuario?id=123&nombre=juan">
  Ver usuario
</ion-route-link>

<script>
const params = new URLSearchParams(window.location.search);
console.log(params.get('id'));       // 123
console.log(params.get('nombre'));  // juan
</script>
```

---

## Resumen de navegación

| Elemento | Función |
|---|---|
| `<ion-router>` | Define rutas |
| `<ion-route>` | Define una ruta |
| `<ion-route-link>` | Link para navegar |
| `<ion-router-outlet>` | Contenedor de página actual |
| `<ion-back-button>` | Botón volver |
| `routerLink` | Atributo para navegar |

---

## Próximos pasos

1. ✅ Estructura de proyecto
2. ✅ Layout esencial
3. ✅ Componentes básicos
4. ✅ Navegación básica (AHORA)
5. 📍 Eventos y manejo de datos
