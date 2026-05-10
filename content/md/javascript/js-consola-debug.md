# Consola y depuración

Depurar es encontrar y corregir errores en el código.

## ¿Qué es DevTools?

DevTools (Developer Tools) es el conjunto de herramientas de desarrollo que incluyen los navegadores.

Con DevTools puedes:

- Inspeccionar y editar HTML/CSS en tiempo real.
- Ver errores y mensajes de JavaScript en la consola.
- Depurar código con breakpoints.
- Revisar peticiones de red en la pestaña Network.
- Analizar rendimiento básico de la página.

Acceso rápido:

- `F12`
- `Ctrl + Shift + I` en Windows/Linux
- `Cmd + Option + I` en macOS

## Uso de consola

```js
console.log('Mensaje informativo');
console.warn('Aviso');
console.error('Error detectado');
```

## Más usos útiles de la consola

### Mostrar objetos de forma legible

```js
const usuario = { id: 1, nombre: 'Elena', activo: true };
console.dir(usuario);
```

### Contar cuántas veces ocurre algo

```js
function registrarClick() {
  console.count('click en botón');
}
```

### Medir tiempos de ejecución

```js
console.time('carga-datos');

for (let i = 0; i < 1000000; i++) {
  // simulación de trabajo
}

console.timeEnd('carga-datos');
```

### Agrupar logs relacionados

```js
console.group('Proceso de login');
console.log('Validando email');
console.log('Validando contraseña');
console.groupEnd();
```

### Ver el recorrido de llamadas (stack)

```js
function paso1() {
  paso2();
}

function paso2() {
  console.trace('Traza de ejecución');
}

paso1();
```

## Mostrar datos en tabla

```js
const alumnos = [
  { nombre: 'Ana', nota: 8 },
  { nombre: 'Luis', nota: 7 },
];

console.table(alumnos);
```

## ¿Qué es console.table?

`console.table` muestra arrays u objetos en formato de tabla dentro de la consola.

Es muy útil cuando tienes listas de datos, porque se leen mejor que con `console.log`.

```js
const productos = [
  { id: 1, nombre: 'Teclado', precio: 29.9 },
  { id: 2, nombre: 'Ratón', precio: 19.5 },
];

console.table(productos);
```

Cuándo usarlo:

- Cuando depuras arrays de objetos.
- Cuando quieres comparar columnas (id, nombre, precio, etc.).
- Cuando necesitas visualizar datos rápidamente en clase.

## Métodos console más comunes (resumen)

- `console.log`: mensaje general para seguimiento del flujo.
- `console.info`: mensaje informativo (similar a log).
- `console.warn`: advertencias que no detienen la ejecución.
- `console.error`: errores detectados.
- `console.table`: visualización tabular de datos.
- `console.dir`: inspección detallada de propiedades de un objeto.
- `console.count`: cuenta cuántas veces se ejecuta un punto de código.
- `console.time` y `console.timeEnd`: medir duración de procesos.
- `console.group` y `console.groupEnd`: agrupar mensajes relacionados.
- `console.trace`: mostrar el stack de llamadas.

Ejemplo rápido combinando varios:

```js
console.group('Validación formulario');
console.info('Inicio validación');
console.count('campo revisado');
console.warn('El email aún no tiene formato válido');
console.groupEnd();
```

## Breakpoints en DevTools

1. Abre las herramientas del navegador (F12).
2. Ve a la pestaña Sources.
3. Haz clic en el número de línea para crear un breakpoint.
4. Ejecuta el código y revisa variables paso a paso.

## `debugger`

`debugger` es una palabra clave de JavaScript que pausa la ejecución del programa en esa línea.

Cuando el navegador tiene DevTools abierto, al llegar a `debugger` el código se detiene y puedes:

- Ver el valor actual de variables.
- Avanzar línea por línea.
- Revisar el stack de llamadas.
- Entender por qué una condición entra o no entra.

```js
function calcular(a, b) {
  debugger;
  return a + b;
}
```

La ejecución se pausa cuando DevTools está abierto.

Ejemplo práctico:

```js
function aplicarDescuento(total, porcentaje) {
  debugger;
  const descuento = total * (porcentaje / 100);
  return total - descuento;
}
```

En ese punto puedes comprobar si `total` y `porcentaje` tienen los valores esperados.

Recomendación: usa `debugger` durante el desarrollo y elimínalo antes de publicar en producción.

## Guía rápida: Step over, Step into y Step out

Cuando el código está pausado en DevTools, estas acciones te ayudan a recorrer la ejecución:

- Step over: ejecuta la línea actual y pasa a la siguiente sin entrar en funciones internas.
- Step into: entra dentro de la función que se está llamando en la línea actual.
- Step out: sale de la función actual y vuelve al contexto que la llamó.

Ejemplo:

```js
function sumar(a, b) {
  return a + b;
}

function calcularTotal() {
  const subtotal = 50;
  const envio = 10;
  const total = sumar(subtotal, envio);
  debugger;
  return total;
}

calcularTotal();
```

Cómo practicar con este ejemplo:

1. Pausa en `debugger`.
2. Retrocede el breakpoint a la línea de `sumar(subtotal, envio)`.
3. Usa Step into para entrar en `sumar`.
4. Dentro de `sumar`, usa Step out para volver a `calcularTotal`.
5. Repite usando Step over para comparar el comportamiento.

## Recomendaciones para clase

1. Usa `console.log` al empezar, pero elimina logs innecesarios al finalizar.
2. Prefiere `console.table` cuando trabajes con arrays de objetos.
3. Usa `console.time` y `console.timeEnd` para comparar implementaciones.
4. Combina consola + breakpoints para entender mejor el flujo del programa.
