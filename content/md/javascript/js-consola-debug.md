# Consola y depuración

Depurar es encontrar y corregir errores en el código.

## Uso de consola

```js
console.log('Mensaje informativo');
console.warn('Aviso');
console.error('Error detectado');
```

## Mostrar datos en tabla

```js
const alumnos = [
  { nombre: 'Ana', nota: 8 },
  { nombre: 'Luis', nota: 7 },
];

console.table(alumnos);
```

## Breakpoints en DevTools

1. Abre las herramientas del navegador (F12).
2. Ve a la pestaña Sources.
3. Haz clic en el número de línea para crear un breakpoint.
4. Ejecuta el código y revisa variables paso a paso.

## `debugger`

```js
function calcular(a, b) {
  debugger;
  return a + b;
}
```

La ejecución se pausa cuando DevTools está abierto.
