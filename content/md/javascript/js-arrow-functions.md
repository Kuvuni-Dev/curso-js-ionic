# Arrow Functions

Las arrow functions ofrecen sintaxis más compacta y un `this` léxico.

## Sintaxis básica

```js
const sumar = (a, b) => a + b;
console.log(sumar(2, 3)); // 5
```

## Retorno implícito

```js
const doble = n => n * 2;
```

## `this` léxico

```js
const tarea = {
  nombre: 'Estudiar',
  iniciar() {
    setTimeout(() => {
      console.log(this.nombre);
    }, 1000);
  },
};
tarea.iniciar();
```

## Limitaciones

- No tienen `arguments`.
- No pueden usarse como constructoras con `new`.
- No tienen su propio `this` ni `super`.

## Uso recomendado

- Callbacks cortos.
- Funciones dentro de métodos.
- Expresiones como `map`, `filter` y `reduce`.
