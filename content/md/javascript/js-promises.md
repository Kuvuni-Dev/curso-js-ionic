# Promesas en JavaScript

Una promesa representa una operación asíncrona que puede completarse o fallar.

## Crear una promesa

```js
const promesa = new Promise((resolve, reject) => {
  const ok = true;
  if (ok) resolve('Éxito');
  else reject('Error');
});
```

## Consumir una promesa

```js
promesa
  .then((resultado) => console.log(resultado))
  .catch((error) => console.error(error));
```

## Encadenamiento

```js
fetch('https://api.example.com/data')
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

## Estados de una promesa

- `pending`: pendiente.
- `fulfilled`: cumplida.
- `rejected`: rechazada.

## Atajos útiles

- `Promise.all([p1, p2])`
- `Promise.race([p1, p2])`
- `Promise.allSettled([p1, p2])`
