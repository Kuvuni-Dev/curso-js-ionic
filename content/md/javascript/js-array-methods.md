# Métodos de array avanzados

Los arrays tienen métodos que permiten manipular datos de forma declarativa.

## `map`

```js
const nums = [1, 2, 3];
const dobles = nums.map((n) => n * 2);
console.log(dobles); // [2, 4, 6]
```

## `filter`

```js
const pares = nums.filter((n) => n % 2 === 0);
console.log(pares); // [2]
```

## `reduce`

```js
const suma = nums.reduce((acc, n) => acc + n, 0);
console.log(suma); // 6
```

## `find`, `findIndex`, `some`, `every`

```js
const mayorQueDos = nums.find((n) => n > 2);
const existePar = nums.some((n) => n % 2 === 0);
console.log(mayorQueDos, existePar);
```
