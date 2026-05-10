# Booleanos, truthy y falsy

Los booleanos son `true` o `false`.

## Ejemplo básico

```js
const esMayor = 20 >= 18;
console.log(esMayor); // true
```

## Valores falsy en JavaScript

- `false`
- `0`
- `''` (string vacío)
- `null`
- `undefined`
- `NaN`

## Valores truthy

Casi cualquier otro valor es truthy.

```js
if ('hola') {
  console.log('Se ejecuta porque es truthy');
}
```

## Uso práctico

```js
const nombre = '';
const etiqueta = nombre || 'Invitado';
console.log(etiqueta); // Invitado
```

Comprender truthy/falsy ayuda a escribir validaciones más claras.
