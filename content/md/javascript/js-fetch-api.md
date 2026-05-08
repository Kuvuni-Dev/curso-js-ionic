# Fetch API

`fetch()` es la API nativa del navegador para realizar peticiones HTTP.

## Ejemplo GET

```js
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then((res) => {
    if (!res.ok) throw new Error('Error HTTP');
    return res.json();
  })
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

## Ejemplo POST

```js
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Hola', body: 'Texto', userId: 1 }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));
```

## Errores comunes

- `fetch()` no rechaza por estados HTTP 4xx/5xx.
- Hay que comprobar `res.ok`.
- Los errores de red sí rechazan la promesa.

## Buen patrón

```js
async function getData(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```
