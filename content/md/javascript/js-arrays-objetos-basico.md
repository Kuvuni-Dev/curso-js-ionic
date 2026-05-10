# Arrays y objetos (básico)

Arrays y objetos son estructuras fundamentales para trabajar con datos.

## Arrays

```js
const alumnos = ['Ana', 'Luis', 'Marta'];
alumnos.push('Pablo');
console.log(alumnos.length); // 4
```

Operaciones comunes:

- `push` agrega al final.
- `pop` elimina el último.
- `includes` verifica existencia.

## Más métodos de arrays (nivel inicial)

```js
const frutas = ['manzana', 'pera', 'uva'];

// Agregar y quitar al inicio
frutas.unshift('naranja');
frutas.shift();

// Buscar posición
console.log(frutas.indexOf('pera')); // 1

// Unir en texto
console.log(frutas.join(', ')); // manzana, pera, uva
```

## Recorrer arrays con forEach

```js
const precios = [10, 25, 40];

precios.forEach((precio, indice) => {
  console.log(`Producto ${indice + 1}: ${precio} EUR`);
});
```

## Transformar datos con map (introducción)

```js
const notas = [6, 7, 8];
const notasSobre10 = notas.map((n) => n * 10);
console.log(notasSobre10); // [60, 70, 80]
```

## Filtrar datos con filter (introducción)

```js
const edades = [14, 18, 21, 16];
const mayoresEdad = edades.filter((e) => e >= 18);
console.log(mayoresEdad); // [18, 21]
```

## Objetos

```js
const curso = {
  nombre: 'JavaScript básico',
  horas: 30,
  activo: true,
};

console.log(curso.nombre);
curso.horas = 32;
```

## Recorrer datos

```js
for (const alumno of alumnos) {
  console.log(alumno);
}

for (const clave in curso) {
  console.log(clave, curso[clave]);
}
```

## Cuándo usar cada uno

- Array: listas ordenadas.
- Objeto: datos con propiedades nombradas.

## Mini práctica

1. Crea un array `compras` con 5 productos.
2. Muestra cuántos elementos tiene con `length`.
3. Convierte el array a un string con `join(' | ')`.
4. Usa `filter` para quedarte solo con productos que incluyan la letra `a`.
