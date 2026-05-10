# Operadores en JavaScript

Los operadores permiten crear expresiones y tomar decisiones en el programa.

## Operadores aritméticos

- `+`, `-`, `*`, `/`, `%`, `**`

```js
const a = 10;
const b = 3;
console.log(a + b); // 13
console.log(a % b); // 1
console.log(a ** b); // 1000
```

## Operadores de comparación

- `===`, `!==`, `>`, `<`, `>=`, `<=`

```js
console.log(5 === '5'); // false
console.log(5 == '5'); // true (evitar en proyectos reales)
```

## Operadores lógicos

- `&&` (y)
- `||` (o)
- `!` (negación)

```js
const tieneCuenta = true;
const tieneSaldo = false;
console.log(tieneCuenta && tieneSaldo); // false
```

## Asignación compuesta

- `+=`, `-=`, `*=`, `/=`

```js
let puntos = 10;
puntos += 5;
console.log(puntos); // 15
```

## Recomendación

Prioriza `===` y `!==` para evitar comparaciones ambiguas.
