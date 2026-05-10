# Bucles

Los bucles repiten instrucciones para procesar colecciones o rangos de datos.

## `for`

```js
for (let i = 0; i < 3; i++) {
  console.log('Iteración', i);
}
```

## `while`

```js
let contador = 0;
while (contador < 3) {
  console.log(contador);
  contador++;
}
```

## `for...of` para arrays

```js
const frutas = ['manzana', 'pera', 'uva'];
for (const fruta of frutas) {
  console.log(fruta);
}
```

## `break` y `continue`

```js
for (let i = 1; i <= 5; i++) {
  if (i === 3) continue;
  if (i === 5) break;
  console.log(i);
}
```

## Consejo

Si recorres arrays, considera también métodos como `forEach`, `map` o `filter`.
