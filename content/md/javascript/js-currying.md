# Currying y composición

El currying transforma una función de varios argumentos en una serie de funciones que reciben un argumento cada una.

## Ejemplo de currying

```js
function sumar(a) {
  return function (b) {
    return a + b;
  };
}

const sumarCinco = sumar(5);
console.log(sumarCinco(3)); // 8
```

## Currying con arrow functions

```js
const multiplicar = (a) => (b) => a * b;
console.log(multiplicar(4)(2)); // 8
```

## Composición de funciones

```js
const doble = (x) => x * 2;
const cuadrado = (x) => x * x;
const dobleCuadrado = (x) => doble(cuadrado(x));
console.log(dobleCuadrado(3)); // 18
```

## Uso práctico

- Configurar funciones con valores predeterminados.
- Separar lógica en pasos reutilizables.
- Crear APIs más declarativas.
