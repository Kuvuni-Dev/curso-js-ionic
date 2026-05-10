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
console.log(a % b); // resto de la división
```

## Entender el módulo (%)

El operador módulo devuelve el resto de una división.

```js
console.log(10 % 3); // 1
console.log(20 % 5); // 0
console.log(7 % 2); // 1
```

Uso típico: saber si un número es par o impar.

```js
const numero = 14;

if (numero % 2 === 0) {
	console.log('Es par');
} else {
	console.log('Es impar');
}
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

## Otros métodos útiles de Math

```js
console.log(Math.trunc(8.99)); // 8
console.log(Math.sign(-15)); // -1
console.log(Math.sign(0)); // 0
console.log(Math.sign(42)); // 1
console.log(Math.cbrt(27)); // 3
console.log(Math.hypot(3, 4)); // 5
```

Resumen rápido:

- Math.trunc elimina la parte decimal sin redondear.
- Math.sign indica si el número es negativo, cero o positivo.
- Math.cbrt calcula la raíz cúbica.
- Math.hypot calcula la hipotenusa (teorema de Pitágoras).

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

Con `toFixed(n)` puedes fijar exactamente `n` decimales:

```js
const precio = 12;
console.log(precio.toFixed(2)); // "12.00"

const pi = 3.141592;
console.log(pi.toFixed(4)); // "3.1416"
```

Nota importante: `toFixed` devuelve `string`, no `number`.

Si necesitas el valor como número:

```js
const valor = 9.8765;
const conDosDecimales = Number(valor.toFixed(2));

console.log(conDosDecimales); // 9.88
console.log(typeof conDosDecimales); // number
```

Ejemplo de función reutilizable:

```js
function fijarDecimales(numero, cantidad) {
	return Number(numero.toFixed(cantidad));
}

console.log(fijarDecimales(15.2399, 2)); // 15.24
```

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
