# Optional chaining y Nullish coalescing

Estas dos sintaxis modernas ayudan a trabajar con datos opcionales y valores nulos.

## Optional chaining `?.`

```js
const usuario = { perfil: { email: 'hola@ejemplo.com' } };
console.log(usuario.perfil?.email); // hola@ejemplo.com
console.log(usuario.datos?.telefono); // undefined
```

Permite acceder a propiedades anidadas sin lanzar `TypeError` si un valor es `null` o `undefined`.

## Nullish coalescing `??`

```js
const valor = null ?? 'valor por defecto';
console.log(valor); // valor por defecto
```

A diferencia de `||`, `??` sólo considera `null` y `undefined` como valores nulos.

## Ejemplo combinado

```js
const config = { theme: null };
const theme = config.theme ?? 'light';
console.log(theme); // light
```

## Cuándo usarlo

- Cuando hay objetos anidados que podrían no existir.
- Para valores de configuración opcionales.
- Para evitar comprobaciones largas con operadores lógicos.
