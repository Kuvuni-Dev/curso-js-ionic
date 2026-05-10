# 3. Componentes básicos de Ionic

## Objetivo
Aprender a usar los 10 componentes que necesitarás en el 90% de tus proyectos.

## Los 10 componentes más usados

```
1. ion-button      (Botones)
2. ion-input       (Campos de texto)
3. ion-card        (Tarjetas)
4. ion-list        (Listas)
5. ion-item        (Elementos de lista)
6. ion-icon        (Iconos)
7. ion-label       (Etiquetas)
8. ion-grid        (Grillas)
9. ion-segment     (Tabulaciones)
10. ion-toggle     (Interruptores)
```

---

## 1. ion-button

### Botones básicos

```html
<ion-button>Botón normal</ion-button>
<ion-button color="primary">Primario</ion-button>
<ion-button color="secondary">Secundario</ion-button>
<ion-button color="success">Éxito</ion-button>
<ion-button color="danger">Peligro</ion-button>
```

### Variantes de estilo

```html
<!-- Sólido (default) -->
<ion-button>Sólido</ion-button>

<!-- Outline (solo borde) -->
<ion-button fill="outline">Outline</ion-button>

<!-- Clear (transparente) -->
<ion-button fill="clear">Transparente</ion-button>
```

### Tamaños

```html
<ion-button size="small">Pequeño</ion-button>
<ion-button>Normal</ion-button>
<ion-button size="large">Grande</ion-button>
```

### Ancho completo

```html
<!-- Ancho completo con expand -->
<ion-button expand="block">Ancho completo</ion-button>

<!-- Ancho flexible -->
<ion-button expand="full">Muy ancho</ion-button>
```

### Con icono

```html
<ion-button>
  <ion-icon slot="start" name="download"></ion-icon>
  Descargar
</ion-button>

<ion-button>
  Buscar
  <ion-icon slot="end" name="search"></ion-icon>
</ion-button>
```

### Con JavaScript

```html
<ion-button id="mi-boton">Click aquí</ion-button>

<script>
const boton = document.getElementById('mi-boton');
boton.addEventListener('click', () => {
  console.log('¡Hiciste click!');
});
</script>
```

---

## 2. ion-input

Campos de entrada de texto:

```html
<!-- Input básico -->
<ion-input placeholder="Escribe aquí"></ion-input>

<!-- Con label -->
<ion-item>
  <ion-label>Nombre</ion-label>
  <ion-input placeholder="Tu nombre"></ion-input>
</ion-item>

<!-- Tipos diferentes -->
<ion-input type="email" placeholder="tu@email.com"></ion-input>
<ion-input type="password" placeholder="Contraseña"></ion-input>
<ion-input type="number" placeholder="Edad"></ion-input>
<ion-input type="tel" placeholder="+34 123 456 789"></ion-input>
```

### Con icono

```html
<ion-item>
  <ion-label>Usuario</ion-label>
  <ion-input placeholder="username"></ion-input>
  <ion-icon name="person" slot="end"></ion-icon>
</ion-item>

<ion-item>
  <ion-icon name="mail" slot="start"></ion-icon>
  <ion-input type="email" placeholder="email@ejemplo.com"></ion-input>
</ion-item>
```

### Con JavaScript

```html
<ion-item>
  <ion-label>Tu nombre</ion-label>
  <ion-input id="input-nombre"></ion-input>
</ion-item>

<ion-button id="btn-guardar">Guardar</ion-button>

<script>
const input = document.getElementById('input-nombre');
const boton = document.getElementById('btn-guardar');

boton.addEventListener('click', () => {
  const valor = input.value; // Obtener valor
  console.log('Nombre:', valor);
});
</script>
```

---

## 3. ion-card

Tarjetas para mostrar información:

```html
<ion-card>
  <ion-card-header>
    <ion-card-title>Mi primer tarjeta</ion-card-title>
  </ion-card-header>
  <ion-card-content>
    Contenido de la tarjeta aquí.
  </ion-card-content>
</ion-card>
```

### Tarjeta con imagen

```html
<ion-card>
  <img src="assets/foto.jpg" alt="Foto">
  
  <ion-card-header>
    <ion-card-title>Producto</ion-card-title>
    <ion-card-subtitle>$19.99</ion-card-subtitle>
  </ion-card-header>
  
  <ion-card-content>
    Descripción del producto...
  </ion-card-content>
</ion-card>
```

### Tarjeta con botones

```html
<ion-card>
  <ion-card-header>
    <ion-card-title>Confirmación</ion-card-title>
  </ion-card-header>
  
  <ion-card-content>
    ¿Estás seguro?
  </ion-card-content>
  
  <ion-button color="primary">Sí</ion-button>
  <ion-button color="danger" fill="outline">No</ion-button>
</ion-card>
```

---

## 4. ion-list

Contenedor para listas:

```html
<ion-list>
  <ion-item>Elemento 1</ion-item>
  <ion-item>Elemento 2</ion-item>
  <ion-item>Elemento 3</ion-item>
</ion-list>
```

### Con iconos

```html
<ion-list>
  <ion-item>
    <ion-icon name="home" slot="start"></ion-icon>
    <ion-label>Inicio</ion-label>
  </ion-item>
  
  <ion-item>
    <ion-icon name="settings" slot="start"></ion-icon>
    <ion-label>Configuración</ion-label>
  </ion-item>
  
  <ion-item>
    <ion-icon name="help-circle" slot="start"></ion-icon>
    <ion-label>Ayuda</ion-label>
  </ion-item>
</ion-list>
```

### Con información secundaria

```html
<ion-list>
  <ion-item>
    <ion-label>
      <h2>Juan</h2>
      <p>juan@email.com</p>
    </ion-label>
    <span slot="end">12:30</span>
  </ion-item>
  
  <ion-item>
    <ion-label>
      <h2>María</h2>
      <p>maria@email.com</p>
    </ion-label>
    <span slot="end">11:45</span>
  </ion-item>
</ion-list>
```

### Generar dinámicamente

```html
<ion-list id="mi-lista"></ion-list>

<script>
const datos = ['Elemento 1', 'Elemento 2', 'Elemento 3'];
const lista = document.getElementById('mi-lista');

datos.forEach(dato => {
  const item = document.createElement('ion-item');
  item.textContent = dato;
  lista.appendChild(item);
});
</script>
```

---

## 5. ion-icon

Iconos (Ionic usa Ionicons library):

```html
<!-- Iconos comunes -->
<ion-icon name="home"></ion-icon>
<ion-icon name="settings"></ion-icon>
<ion-icon name="search"></ion-icon>
<ion-icon name="menu"></ion-icon>
<ion-icon name="close"></ion-icon>
<ion-icon name="arrow-back"></ion-icon>
<ion-icon name="add"></ion-icon>
<ion-icon name="trash"></ion-icon>
<ion-icon name="star"></ion-icon>
<ion-icon name="heart"></ion-icon>
```

### Con color y tamaño

```html
<!-- Color -->
<ion-icon name="star" color="primary"></ion-icon>
<ion-icon name="heart" color="danger"></ion-icon>

<!-- Tamaño -->
<ion-icon name="settings" size="small"></ion-icon>
<ion-icon name="settings"></ion-icon>
<ion-icon name="settings" size="large"></ion-icon>
```

### En botones

```html
<ion-button>
  <ion-icon slot="start" name="download"></ion-icon>
  Descargar
</ion-button>

<ion-fab-button>
  <ion-icon name="add"></ion-icon>
</ion-fab-button>
```

**Ver más iconos:** https://ionic.io/ionicons

---

## 6. ion-label

Etiquetas para formatos:

```html
<!-- Básico -->
<ion-label>Mi etiqueta</ion-label>

<!-- Con item -->
<ion-item>
  <ion-label>Nombre</ion-label>
  <ion-input></ion-input>
</ion-item>

<!-- Posiciones -->
<ion-item>
  <ion-label position="stacked">Nombre (arriba)</ion-label>
  <ion-input></ion-input>
</ion-item>

<ion-item>
  <ion-label position="floating">Nombre (flotante)</ion-label>
  <ion-input></ion-input>
</ion-item>
```

---

## 7. ion-grid

Sistema de columnas (responsive):

```html
<!-- Grilla básica -->
<ion-grid>
  <ion-row>
    <ion-col>Columna 1</ion-col>
    <ion-col>Columna 2</ion-col>
    <ion-col>Columna 3</ion-col>
  </ion-row>
</ion-grid>
```

### Ancho personalizado

```html
<ion-grid>
  <ion-row>
    <ion-col size="12" size-md="6" size-lg="4">
      Responsivo: 12 en móvil, 6 en tablet, 4 en desktop
    </ion-col>
    <ion-col size="12" size-md="6" size-lg="8">
      Otra columna
    </ion-col>
  </ion-row>
</ion-grid>
```

---

## 8. ion-segment

Tabuladores o pestañas:

```html
<ion-segment value="home">
  <ion-segment-button value="home">
    <ion-label>Inicio</ion-label>
  </ion-segment-button>
  <ion-segment-button value="about">
    <ion-label>Acerca de</ion-label>
  </ion-segment-button>
  <ion-segment-button value="contact">
    <ion-label>Contacto</ion-label>
  </ion-segment-button>
</ion-segment>

<script>
const segment = document.querySelector('ion-segment');
segment.addEventListener('ionChange', (e) => {
  console.log('Seleccionaste:', e.detail.value);
});
</script>
```

---

## 9. ion-toggle

Interruptores on/off:

```html
<!-- Básico -->
<ion-toggle></ion-toggle>

<!-- Con label -->
<ion-item>
  <ion-label>Notificaciones</ion-label>
  <ion-toggle slot="end" id="notif"></ion-toggle>
</ion-item>

<!-- Pre-activado -->
<ion-toggle checked="true"></ion-toggle>

<!-- Con colores -->
<ion-toggle color="primary"></ion-toggle>
<ion-toggle color="danger"></ion-toggle>
```

### Con JavaScript

```html
<ion-item>
  <ion-label>Modo oscuro</ion-label>
  <ion-toggle id="tema-toggle" slot="end"></ion-toggle>
</ion-item>

<script>
const toggle = document.getElementById('tema-toggle');

toggle.addEventListener('ionChange', (e) => {
  if (e.detail.checked) {
    console.log('Modo oscuro activado');
    document.body.style.filter = 'invert(1)';
  } else {
    console.log('Modo claro');
    document.body.style.filter = 'invert(0)';
  }
});
</script>
```

---

## 10. ion-item

Elemento versatil de lista (ya lo vimos con otros):

```html
<!-- Simple -->
<ion-item>Texto simple</ion-item>

<!-- Con contenido múltiple -->
<ion-item>
  <ion-label>Título</ion-label>
  <span slot="end">Valor</span>
</ion-item>

<!-- Con input -->
<ion-item>
  <ion-label>Usuario</ion-label>
  <ion-input></ion-input>
</ion-item>

<!-- Clicable -->
<ion-item button="true" onclick="alert('Clickeaste!')">
  Haz click aquí
</ion-item>
```

---

## Ejemplo completo: Mini formulario

```html
<ion-page>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>Nuevo usuario</ion-title>
    </ion-toolbar>
  </ion-header>
  
  <ion-content class="ion-padding">
    <!-- Nombre -->
    <ion-item>
      <ion-label position="stacked">Nombre</ion-label>
      <ion-input id="nombre" placeholder="Tu nombre"></ion-input>
    </ion-item>
    
    <!-- Email -->
    <ion-item>
      <ion-label position="stacked">Email</ion-label>
      <ion-input id="email" type="email" placeholder="tu@email.com"></ion-input>
    </ion-item>
    
    <!-- Términos -->
    <ion-item>
      <ion-label>Acepto términos</ion-label>
      <ion-toggle id="terminos" slot="end"></ion-toggle>
    </ion-item>
    
    <!-- Botón -->
    <ion-button id="btn-enviar" expand="block" color="primary">
      Registrarse
    </ion-button>
  </ion-content>
</ion-page>

<script>
document.getElementById('btn-enviar').addEventListener('click', () => {
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const terminos = document.getElementById('terminos').checked;
  
  console.log('Datos:', { nombre, email, terminos });
});
</script>
```

---

## Resumen de componentes

| Componente | Uso |
|---|---|
| `ion-button` | Botones interactivos |
| `ion-input` | Campos de texto |
| `ion-card` | Tarjetas de contenido |
| `ion-list` | Contenedor de listas |
| `ion-item` | Elemento de lista |
| `ion-icon` | Iconos |
| `ion-label` | Etiquetas y textos |
| `ion-grid` | Grillas responsivas |
| `ion-segment` | Tabuladores |
| `ion-toggle` | Interruptores |

---

## Próximos pasos

1. ✅ Estructura de proyecto
2. ✅ Layout esencial
3. ✅ Componentes básicos (AHORA)
4. 📍 Navegación entre páginas
5. Eventos y manejo de datos
