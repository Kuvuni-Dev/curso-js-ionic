# JSON y localStorage

JSON permite intercambiar datos y `localStorage` guardarlos en el navegador.

## Convertir objeto a JSON

```js
const usuario = { nombre: 'Ana', nivel: 'básico' };
const json = JSON.stringify(usuario);
console.log(json);
```

## Convertir JSON a objeto

```js
const original = JSON.parse(json);
console.log(original.nombre);
```

## Guardar en localStorage

```js
localStorage.setItem('usuario', json);
```

## Leer de localStorage

```js
const guardado = localStorage.getItem('usuario');
const usuarioGuardado = guardado ? JSON.parse(guardado) : null;
console.log(usuarioGuardado);
```

## Eliminar datos

```js
localStorage.removeItem('usuario');
```

`localStorage` es útil para recordar preferencias simples del usuario.
