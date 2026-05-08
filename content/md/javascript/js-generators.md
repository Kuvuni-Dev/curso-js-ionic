# Generators e iteradores

Los generators son funciones que pueden pausar su ejecución y reanudarla más tarde usando `yield`.

## Sintaxis básica

```js
function* contador() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const gen = contador();
console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
```

## Iterar con generator

```js
function* pares() {
  yield 2;
  yield 4;
  yield 6;
}

for (const n of pares()) {
  console.log(n);
}
```

## Alternativa a callbacks

```js
function* pasos() {
  yield 'cargar';
  yield 'procesar';
  yield 'mostrar';
}

const iterator = pasos();
console.log(iterator.next());
```

## Ventajas

- Control fino del flujo de ejecución.
- Ideal para streams y datos perezosos.
- Fácil de combinar con iteradores personalizados.
