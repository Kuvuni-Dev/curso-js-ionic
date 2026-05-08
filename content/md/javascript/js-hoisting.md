# Hoisting y TDZ

El hoisting es el comportamiento donde las declaraciones se procesan antes de ejecutar el código.

## `var` y hoisting

```js
console.log(x); // undefined
var x = 10;
```

Internamente el motor eleva la declaración de `var`, pero no su inicialización.

## `let` y `const`

```js
console.log(y); // ReferenceError
let y = 5;
```

Las variables declaradas con `let` y `const` existen en la Temporal Dead Zone (TDZ) hasta su inicialización.

## Funciones declaradas

```js
saludar();

function saludar() {
  console.log('Hola');
}
```

Las declaraciones de función también se elevan completas, por lo que se pueden usar antes de aparecer en el código.

## Diferencias clave

- `var`: declaración hoisted, inicializada como `undefined`.
- `let/const`: declaradas en TDZ, lanzan `ReferenceError` antes de su inicialización.
- Funciones: totalmente elevadas si son declaraciones.
