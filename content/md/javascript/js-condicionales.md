# Condicionales

Los condicionales permiten ejecutar diferentes bloques según una condición.

## `if`, `else if`, `else`

```js
const nota = 8;

if (nota >= 9) {
  console.log('Excelente');
} else if (nota >= 5) {
  console.log('Aprobado');
} else {
  console.log('Suspenso');
}
```

## Operador ternario

```js
const edad = 17;
const mensaje = edad >= 18 ? 'Mayor de edad' : 'Menor de edad';
console.log(mensaje);
```

## `switch`

```js
const rol = 'admin';

switch (rol) {
  case 'admin':
    console.log('Acceso total');
    break;
  case 'editor':
    console.log('Acceso de edición');
    break;
  default:
    console.log('Acceso básico');
}
```

## Buenas prácticas

- Mantén condiciones simples y legibles.
- Evita anidar muchos `if`; extrae funciones cuando sea necesario.
