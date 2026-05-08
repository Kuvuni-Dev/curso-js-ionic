# Funciones de orden superior

Una función de orden superior recibe una función como argumento o devuelve otra función.

## Ejemplo: `map`

```js
const numeros = [1, 2, 3];
const dobles = numeros.map((n) => n * 2);
console.log(dobles); // [2, 4, 6]
```

## Función que recibe otra función

```js
function ejecutarOperacion(a, b, operacion) {
  return operacion(a, b);
}

const suma = (x, y) => x + y;
console.log(ejecutarOperacion(2, 3, suma)); // 5
```

## Función que devuelve otra función

```js
function crearMultiplicador(factor) {
  return (n) => n * factor;
}

const porTres = crearMultiplicador(3);
console.log(porTres(5)); // 15
```

## Ventajas

- Permiten abstracciones flexibles.
- Son la base de APIs como `map`, `filter` y `reduce`.
- Facilitan la composición de comportamiento.
