# Closures

Un **closure** es una función que recuerda el entorno léxico en el que fue creada, incluso cuando se ejecuta fuera de ese entorno.

## Ejemplo básico

```js
function crearContador() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const contador = crearContador();
console.log(contador()); // 1
console.log(contador()); // 2
```

## ¿Por qué es útil?

- Encapsular estado privado sin clases.
- Crear funciones de fábrica.
- Implementar el patrón módulo.

## Casos de uso comunes

1. Callbacks con estado.
2. Memorización de valores.
3. Iteradores personalizados.
