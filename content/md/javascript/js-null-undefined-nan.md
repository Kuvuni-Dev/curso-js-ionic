# null, undefined y NaN

Estos valores suelen causar dudas al comenzar con JavaScript.

## `undefined`

Aparece cuando una variable existe, pero aún no tiene valor.

```js
let ciudad;
console.log(ciudad); // undefined
```

## `null`

Representa ausencia intencional de valor.

```js
const usuario = null;
console.log(usuario); // null
```

## `NaN`

Significa Not a Number.

```js
const resultado = Number('hola');
console.log(resultado); // NaN
```

## Comprobar NaN correctamente

```js
console.log(Number.isNaN(resultado)); // true
```

## Regla práctica

- `undefined`: falta de inicialización.
- `null`: vaciado intencional.
- `NaN`: error en operación numérica.
