# Map y Set

Map y Set son colecciones modernas de ES6 con comportamiento diferente a los objetos y arrays.

## `Map`

```js
const map = new Map();
map.set('nombre', 'Ana');
console.log(map.get('nombre')); // Ana
```

## `Set`

```js
const set = new Set([1, 2, 2, 3]);
console.log(set); // Set { 1, 2, 3 }
```

## Usos comunes

- `Map`: pares clave/valor donde la clave puede ser cualquier tipo.
- `Set`: colecciones de valores únicos.

## Métodos útiles

- `map.has(key)`
- `map.delete(key)`
- `set.add(value)`
- `set.has(value)`
