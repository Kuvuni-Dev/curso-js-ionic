# Manejo de errores con try/catch

Capturar errores evita que la aplicación se rompa de forma inesperada.

## Estructura básica

```js
try {
  const data = JSON.parse('{"ok":true}');
  console.log(data);
} catch (error) {
  console.error('Error al parsear JSON:', error.message);
}
```

## `finally`

```js
try {
  console.log('Intentando operación');
} catch (error) {
  console.error(error);
} finally {
  console.log('Este bloque siempre se ejecuta');
}
```

## Lanzar errores propios

```js
function dividir(a, b) {
  if (b === 0) {
    throw new Error('No se puede dividir entre cero');
  }
  return a / b;
}
```

## Recomendación

Captura errores donde tenga sentido recuperarse y muestra mensajes comprensibles.
