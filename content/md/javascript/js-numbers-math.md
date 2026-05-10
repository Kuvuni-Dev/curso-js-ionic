# Números y objeto Math

JavaScript usa el tipo `number` para enteros y decimales.

## Operaciones básicas

```js
const a = 10;
const b = 4;

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
```

## Redondeo y máximo/mínimo

```js
console.log(Math.round(4.6)); // 5
console.log(Math.floor(4.9)); // 4
console.log(Math.ceil(4.1)); // 5
console.log(Math.max(3, 8, 5)); // 8
console.log(Math.min(3, 8, 5)); // 3
```

## Potencias, raíces y valor absoluto

```js
console.log(Math.pow(2, 3)); // 8
console.log(Math.sqrt(81)); // 9
console.log(Math.abs(-12)); // 12
```

## Convertir texto a número

```js
const precioTexto = '19.95';
const edadTexto = '21';

console.log(Number(precioTexto)); // 19.95
console.log(parseInt(edadTexto, 10)); // 21
console.log(parseFloat(precioTexto)); // 19.95
```

## Formatear decimales

```js
const promedio = 8.4567;
console.log(promedio.toFixed(2)); // 8.46
```

Nota: `toFixed` devuelve string.

## Aleatorios

```js
const aleatorio = Math.random(); // 0 a 1
const dado = Math.floor(Math.random() * 6) + 1; // 1 a 6
```

## Precaución con decimales

```js
console.log(0.1 + 0.2); // 0.30000000000000004
```

Para dinero, redondea o usa librerías especializadas.

## Mini práctica

1. Genera un número aleatorio del 1 al 10.
2. Calcula el cuadrado y la raíz cuadrada de 49.
3. Convierte el texto `'150.5'` a número.
4. Formatea `12.9876` a 2 decimales.
