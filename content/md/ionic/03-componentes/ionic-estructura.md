# Estructura de una app Ionic

Ionic utiliza una jerarquía de componentes para estructurar cada pantalla.

## Elemento raíz

`ion-app` envuelve toda la aplicación y asegura que los estilos y el comportamiento de Ionic funcionen correctamente.

## Páginas y contenido

- `ion-page`: cada vista principal de la app debe estar dentro de un `ion-page`.
- `ion-header`: cabecera fija de la página.
- `ion-content`: área desplazable para el contenido principal.
- `ion-footer`: pie de página fijo.

## Layout recomendado

```html
<ion-app>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mi página</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- contenido -->
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-title>Pie</ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</ion-app>
```

## Uso de `ion-router-outlet`

`ion-router-outlet` funciona como punto de montaje cuando usas el router oficial de Ionic.
