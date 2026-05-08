# Feedback y overlays en Ionic

Ionic ofrece componentes para mostrar información al usuario sin cambiar de pantalla.

## Alerts

`ion-alert` muestra un diálogo modal con botones.

```js
const alert = document.createElement('ion-alert');
alert.header = 'Confirmación';
alert.message = '¿Estás seguro?';
alert.buttons = ['Cancelar', 'Aceptar'];
document.body.appendChild(alert);
await alert.present();
```

## Toasts

`ion-toast` es una notificación breve y no bloqueante.

```js
const toast = document.createElement('ion-toast');
toast.message = 'Guardado correctamente';
toast.duration = 2000;
document.body.appendChild(toast);
await toast.present();
```

## Loading

`ion-loading` muestra un spinner mientras se carga contenido.

## Modals y popovers

- `ion-modal`: ventana emergente a pantalla completa.
- `ion-popover`: panel flotante anclado a un elemento.
