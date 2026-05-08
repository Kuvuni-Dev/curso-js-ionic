# Async / Await

`async` y `await` permiten escribir código asíncrono con una sintaxis parecida al código síncrono.

## Función `async`

```js
async function fetchData() {
  return 'datos';
}

fetchData().then(console.log);
```

## `await` para resolver promesas

```js
async function cargar() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  console.log(data);
}
```

## Manejo de errores

```js
async function cargarDatos() {
  try {
    const res = await fetch('https://api.example.com/data');
    if (!res.ok) throw new Error('HTTP error');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
```

## Ventajas

- Código más legible que `.then()` encadenados.
- Permite usar `try/catch` para errores.
- Facilita el flujo de operaciones dependientes.
