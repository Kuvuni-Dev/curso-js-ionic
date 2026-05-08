# Spread y Rest

Los operadores spread y rest usan `...` para expandir o recoger valores.

## Spread en arrays

```js
const a = [1, 2];
const b = [...a, 3, 4];
console.log(b); // [1, 2, 3, 4]
```

## Spread en objetos

```js
const user = { nombre: 'Ana' };
const updated = { ...user, edad: 25 };
console.log(updated);
```

## Rest en parámetros

```js
function sumar(...numeros) {
  return numeros.reduce((acc, n) => acc + n, 0);
}
console.log(sumar(1, 2, 3)); // 6
```

## Rest en destructuring

```js
const [primero, ...resto] = [1, 2, 3, 4];
console.log(primero); // 1
console.log(resto); // [2, 3, 4]
```