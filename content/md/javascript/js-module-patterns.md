# Patrones de módulo

Los patrones de módulo organizan código en espacios de nombres y encapsulan estado.

## Módulo IIFE

```js
const calculadora = (function () {
  let total = 0;

  function sumar(n) {
    total += n;
  }

  function obtenerTotal() {
    return total;
  }

  return { sumar, obtenerTotal };
})();

calculadora.sumar(5);
console.log(calculadora.obtenerTotal()); // 5
```

## Ventajas

- Encapsula variables privadas.
- Evita contaminar el scope global.
- Crea una interfaz pública clara.
