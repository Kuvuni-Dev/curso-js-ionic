# Event loop y call stack

El event loop coordina la ejecución de código, callbacks y promesas en JavaScript.

## Call stack

Es donde se apilan las funciones activas.

```js
function a() { b(); }
function b() { c(); }
function c() { console.log('hola'); }
a();
```

## Cola de tareas

Las tareas asíncronas como `setTimeout` se ejecutan después de que la pila esté vacía.

```js
console.log('Inicio');
setTimeout(() => console.log('Timeout'), 0);
console.log('Fin');
```

Salida:

- Inicio
- Fin
- Timeout

## Microtask queue

Las promesas resueltas y `queueMicrotask` tienen prioridad sobre `setTimeout`.

```js
Promise.resolve().then(() => console.log('Promise'));
setTimeout(() => console.log('Timeout'), 0);
console.log('Script');
```

Salida:

- Script
- Promise
- Timeout

## Conclusión

- El call stack ejecuta el código síncrono.
- El event loop recoge las tareas pendientes.
- Las microtareas se procesan antes que las tareas normales.
