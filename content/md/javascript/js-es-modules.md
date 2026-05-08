# Módulos ES

Los módulos ES permiten dividir el código en archivos y compartir funciones, clases y valores.

## Exportaciones nombradas

```js
export function saludar() {
  return 'Hola';
}
```

```js
import { saludar } from './saludos.js';
console.log(saludar());
```

## Exportación por defecto

```js
export default class Usuario {
  constructor(nombre) {
    this.nombre = nombre;
  }
}
```

```js
import Usuario from './Usuario.js';
const u = new Usuario('Ana');
```

## Import dinámico

```js
const modulo = await import('./utils.js');
modulo.saludar();
```

## Ventajas

- Código más modular y mantenible.
- Carga diferida con `import()`.
- Cada módulo tiene su propio scope.

## Nota

Para que los módulos funcionen en el navegador, el script debe usarse con `type="module"`.
