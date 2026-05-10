# Funciones básicas

Una función agrupa lógica reutilizable y mejora la organización del código.

## Declaración de función

```js
function saludar(nombre) {
  return `Hola, ${nombre}`;
}

console.log(saludar('Lucía'));
```

## Parámetros y valores por defecto

```js
function crearUsuario(nombre, rol = 'alumno') {
  return { nombre, rol };
}

console.log(crearUsuario('Mario'));
```

## Expresión de función

```js
const sumar = function (a, b) {
  return a + b;
};

console.log(sumar(4, 6));
```

## Alcance (scope) básico

```js
let global = 'visible';

function prueba() {
  let local = 'solo dentro';
  console.log(global);
  console.log(local);
}
```

## Recomendación

Usa nombres de función claros que indiquen acción: `calcularTotal`, `validarEmail`, `renderLista`.
