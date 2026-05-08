# Programación asíncrona

JavaScript es de un solo hilo, pero gestiona operaciones lentas (red, disco) de forma no bloqueante mediante el **event loop**.

## Callbacks

```js
setTimeout(() => {
  console.log('Ejecutado después de 1 segundo');
}, 1000);
```

## Promises

```js
fetch('https://api.ejemplo.com/datos')
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

## Async / Await

```js
async function cargarDatos() {
  try {
    const res = await fetch('https://api.ejemplo.com/datos');
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

## Comparativa

| Técnica | Legibilidad | Encadenamiento |
|---|---|---|
| Callbacks | Baja | Difícil |
| Promises | Media | Fluido |
| Async/Await | Alta | Natural |
