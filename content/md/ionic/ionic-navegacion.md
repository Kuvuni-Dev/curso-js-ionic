# Navegación en Ionic

Ionic vanilla utiliza el hash de la URL para gestionar la navegación sin recargar la página.

## Estructura de rutas

```
#/home        → Página de inicio
#/js          → Bloque JavaScript
#/ionic       → Catálogo de componentes
#/docs        → Documentación
#/doc/:id     → Vista de documento
```

## Cambiar de vista por código

```js
location.hash = '#/ionic';
```

## ion-segment como navegación superior

```html
<ion-segment value="home" id="top-nav">
  <ion-segment-button value="home">
    <ion-label>Inicio</ion-label>
  </ion-segment-button>
</ion-segment>
```

## Escuchar cambios de ruta

```js
window.addEventListener('hashchange', () => {
  const hash = window.location.hash;
  // renderizar la vista correspondiente
});
```
