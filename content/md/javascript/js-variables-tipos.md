# Variables y tipos de datos

Este tema es el punto de partida para comenzar con JavaScript desde cero.

## Declarar variables

```js
let edad = 18;
const nombre = 'Ana';
var activo = true;
```

Recomendación:

- Usa `const` por defecto.
- Usa `let` si el valor cambia.
- Evita `var` en código moderno.

## Tipos primitivos

- `string`
- `number`
- `boolean`
- `undefined`
- `null`
- `bigint`
- `symbol`

```js
const ciudad = 'Madrid';
const precio = 19.99;
const disponible = false;
```

## Ver tipo con `typeof`

```js
console.log(typeof ciudad); // string
console.log(typeof precio); // number
console.log(typeof disponible); // boolean
```

## Conversión básica de tipos

```js
const texto = '42';
const numero = Number(texto);
const entero = parseInt('15', 10);
console.log(numero + 8); // 50
console.log(entero); // 15
```

## Errores comunes

- Comparar números guardados como texto.
- Reasignar una variable creada con `const`.
- Confiar en conversiones implícitas sin revisarlas.
