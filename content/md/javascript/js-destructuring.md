# Destructuring

El destructuring extrae valores de arrays y objetos en variables de forma sencilla.

## Destructuring con arrays

```js
const [a, b] = [1, 2];
console.log(a, b); // 1 2
```

## Destructuring con objetos

```js
const usuario = { nombre: 'Ana', age: 30 };
const { nombre, age } = usuario;
console.log(nombre, age);
```

## Valores por defecto

```js
const { x = 10, y = 20 } = { x: 5 };
console.log(x, y); // 5 20
```

## Destructuring anidado

```js
const data = { perfil: { email: 'hola@ejemplo.com' } };
const { perfil: { email } } = data;
console.log(email);
```
