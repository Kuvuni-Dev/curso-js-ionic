# Import dinámico

`import()` permite cargar módulos de forma dinámica y asíncrona.

## Ejemplo básico

```js
async function cargarModulo() {
  const modulo = await import('./utils.js');
  modulo.saludar();
}

cargarModulo();
```

## Ventajas

- Carga diferida de código solo cuando se necesita.
- Mejora el rendimiento inicial.
- Útil para secciones bajo demanda.

## Nota

`import()` devuelve una promesa que resuelve con el objeto del módulo.
