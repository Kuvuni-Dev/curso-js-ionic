# Fechas y tiempo con Date

El objeto `Date` permite trabajar con fechas y horas.

## Crear fechas

```js
const ahora = new Date();
const inicioCurso = new Date('2026-09-01');
console.log(ahora, inicioCurso);
```

## Obtener partes de la fecha

```js
const hoy = new Date();
console.log(hoy.getFullYear());
console.log(hoy.getMonth()); // 0-11
console.log(hoy.getDate()); // 1-31
```

## Formatear fecha

```js
const fecha = new Date();
console.log(fecha.toLocaleDateString('es-ES'));
console.log(fecha.toLocaleTimeString('es-ES'));
```

## Operar con milisegundos

```js
const msDia = 24 * 60 * 60 * 1000;
const manana = new Date(Date.now() + msDia);
console.log(manana.toLocaleDateString('es-ES'));
```

Para proyectos grandes, suele usarse una librería de fechas cuando aumenta la complejidad.
