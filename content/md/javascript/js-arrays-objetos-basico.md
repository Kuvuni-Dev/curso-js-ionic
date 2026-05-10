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
