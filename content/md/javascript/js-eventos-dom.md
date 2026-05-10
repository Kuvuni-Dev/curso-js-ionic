# Eventos en el DOM

Los eventos reaccionan a acciones del usuario como clics, escritura o envío de formularios.

## Escuchar eventos

```js
const boton = document.querySelector('#btn-enviar');

boton.addEventListener('click', () => {
  console.log('Botón pulsado');
});
```

## Evento de formulario

```js
const form = document.querySelector('#form-registro');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('Formulario procesado');
});
```

## Leer valor de un input

```js
const inputNombre = document.querySelector('#nombre');

inputNombre.addEventListener('input', (event) => {
  console.log(event.target.value);
});
```

## Delegación de eventos

```js
document.querySelector('#lista').addEventListener('click', (event) => {
  if (event.target.matches('li')) {
    console.log('Click en item:', event.target.textContent);
  }
});
```

## Buenas prácticas

- Usa `event.preventDefault()` cuando necesites controlar el flujo del navegador.
- Limpia listeners si el elemento deja de existir en apps complejas.
