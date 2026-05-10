# Interacción y scroll en Ionic

Los componentes de scroll e interacción mejoran la experiencia móvil.

## Refresher

`ion-refresher` permite el gesto pull-to-refresh.

```html
<ion-refresher slot="fixed">
  <ion-refresher-content></ion-refresher-content>
</ion-refresher>
```

## Infinite scroll

`ion-infinite-scroll` carga más contenido al llegar al final.

```html
<ion-infinite-scroll threshold="100px">
  <ion-infinite-scroll-content></ion-infinite-scroll-content>
</ion-infinite-scroll>
```

## Reordenar items

`ion-reorder-group` y `ion-reorder` permiten arrastrar elementos para cambiar el orden.

## Sliding items

`ion-item-sliding` revela acciones ocultas al deslizar un item.
