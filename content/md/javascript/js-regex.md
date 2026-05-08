# Expresiones regulares (Regex)

Las expresiones regulares son patrones de búsqueda que permiten validar, buscar y reemplazar texto.

## Sintaxis básica

```js
const regex = /patrón/flags;
const regex2 = new RegExp('patrón', 'flags');
```

## Flags comunes

- `g`: global (encontrar todas las coincidencias)
- `i`: insensible a mayúsculas
- `m`: multilínea

## Métodos principales

### `test()` - Comprueba si existe

```js
const regex = /hola/i;
console.log(regex.test('HOLA mundo')); // true
```

### `match()` - Encuentra coincidencias

```js
const texto = 'tengo 25 años y 3 gatos';
const numeros = texto.match(/\d+/g);
console.log(numeros); // ['25', '3']
```

### `replace()` - Reemplaza texto

```js
const texto = 'hola mundo';
const nuevo = texto.replace(/mundo/, 'universo');
console.log(nuevo); // hola universo
```

### `split()` - Divide por patrón

```js
const texto = 'uno,dos,tres';
const array = texto.split(/,/);
console.log(array); // ['uno', 'dos', 'tres']
```

## Patrones comunes

### Números
```js
/\d/      // un dígito
/\d+/     // uno o más dígitos
/^\d{3}-\d{4}$/  // exacto: 123-4567
```

### Letras
```js
/[a-z]/   // letra minúscula
/[A-Z]/   // letra mayúscula
/[a-zA-Z]/  // cualquier letra
```

### Email
```js
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

### URL
```js
/^https?:\/\/.+/
```

## Ejemplos prácticos

### Validar email
```js
function esEmailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

### Extraer números
```js
const texto = 'Llamar al 555-1234 o 555-5678';
const telefonos = texto.match(/\d{3}-\d{4}/g);
```

### Limpiar espacios
```js
const texto = '  hola   mundo  ';
const limpio = texto.replace(/\s+/g, ' ').trim();
```

## Caracteres especiales

| Carácter | Significado |
|---|---|
| `.` | Cualquier carácter excepto salto de línea |
| `*` | 0 o más veces |
| `+` | 1 o más veces |
| `?` | 0 o 1 vez |
| `^` | Inicio de línea |
| `$` | Final de línea |
| `[abc]` | a, b o c |
| `[^abc]` | Cualquiera excepto a, b, c |
| `\d` | Dígito |
| `\D` | No dígito |
| `\w` | Letra, dígito o guion bajo |
| `\s` | Espacio en blanco |

## Grupos y captura

```js
const regex = /(\w+)@(\w+)/;
const match = 'usuario@ejemplo'.match(regex);
console.log(match[1]); // usuario
console.log(match[2]); // ejemplo
```
# Expresiones regulares en JavaScript

Las expresiones regulares (regex) son patrones que permiten buscar, validar y manipular texto.

## Sintaxis básica

```js
const regex = /patron/flags;
const regex2 = new RegExp('patron', 'flags');
```

## Métodos principales

### `test()` - Verifica si el patrón existe

```js
const regex = /hola/;
console.log(regex.test('hola mundo')); // true
console.log(regex.test('adiós')); // false
```

### `exec()` - Obtiene detalles del match

```js
const regex = /(\w+)@(\w+)/;
const resultado = regex.exec('juan@example.com');
console.log(resultado[1]); // juan
console.log(resultado[2]); // example
```

### `String.match()` - Busca en un string

```js
const texto = 'hola mundo hola';
const matches = texto.match(/hola/g);
console.log(matches); // ['hola', 'hola']
```

### `String.replace()` - Reemplaza matches

```js
const texto = 'hola mundo';
const nuevo = texto.replace(/hola/, 'adiós');
console.log(nuevo); // adiós mundo
```

### `String.split()` - Divide por patrón

```js
const texto = 'a,b;c:d';
const partes = texto.split(/[,;:]/);
console.log(partes); // ['a', 'b', 'c', 'd']
```

## Caracteres especiales

- `.` - Cualquier carácter (excepto salto de línea)
- `^` - Inicio de string
- `$` - Fin de string
- `*` - 0 o más repeticiones
- `+` - 1 o más repeticiones
- `?` - 0 o 1 repetición
- `\d` - Dígito (0-9)
- `\w` - Letra, dígito o _ (a-z, A-Z, 0-9, _)
- `\s` - Espacio en blanco
- `[abc]` - Cualquiera de estos caracteres
- `(abc)` - Grupo de captura

## Flags

- `g` - Global (encuentra todas las coincidencias)
- `i` - Insensible a mayúsculas
- `m` - Multilínea

## Ejemplos prácticos

### Validar email

```js
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(emailRegex.test('juan@example.com')); // true
```

### Validar teléfono

```js
const phoneRegex = /^(\+\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
console.log(phoneRegex.test('+1 (555) 123-4567')); // true
```

### Extraer números

```js
const texto = 'precio: $99.99, descuento: $10';
const numeros = texto.match(/\$\d+\.?\d*/g);
console.log(numeros); // ['$99.99', '$10']
```

## Casos de uso comunes

- Validación de formularios
- Búsqueda y reemplazo en texto
- Extracción de datos
- Formateo de strings
- Parseo de URLs
