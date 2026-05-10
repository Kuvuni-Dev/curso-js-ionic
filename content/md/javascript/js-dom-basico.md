# DOM básico

El DOM (Document Object Model) permite manipular la interfaz desde JavaScript.

## Seleccionar elementos

```js
const titulo = document.querySelector('h1');
const boton = document.getElementById('btn-guardar');
```

## Cambiar contenido y estilos

```js
titulo.textContent = 'Curso actualizado';
titulo.style.color = '#2f7d32';
```

## Crear y agregar elementos

```js
const item = document.createElement('li');
item.textContent = 'Nuevo tema';
document.querySelector('#lista-temas').appendChild(item);
```

## Manipular clases CSS

```js
const tarjeta = document.querySelector('.card');
tarjeta.classList.add('activa');
tarjeta.classList.toggle('resaltada');
```

## Consejo

Evita repetir selectores muchas veces; guarda referencias en variables.
