# Botones y acciones en Ionic

Ionic ofrece varios componentes para interactuar con el usuario mediante botones y hojas de acción.

## Botones básicos

`ion-button` admite variantes como `fill`, `shape`, `color` y `size`.

```html
<ion-button expand="block" color="primary">Enviar</ion-button>
```

## Botones flotantes

`ion-fab` crea un botón de acción flotante, útil para acciones primarias.

```html
<ion-fab vertical="bottom" horizontal="end" slot="fixed">
  <ion-fab-button color="secondary">
    <ion-icon name="add"></ion-icon>
  </ion-fab-button>
</ion-fab>
```

## Acción de retroceso

`ion-back-button` permite regresar en la navegación con estilo de plataforma.

```html
<ion-buttons slot="start">
  <ion-back-button defaultHref="/home"></ion-back-button>
</ion-buttons>
```

## Action sheet

`ion-action-sheet` muestra opciones desde abajo y es ideal para decisiones rápidas.
