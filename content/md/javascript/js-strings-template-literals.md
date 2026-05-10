# Strings y template literals

Los strings representan texto.

## Crear strings

```js
const nombre = 'María';
const curso = "JavaScript";
```

## Concatenación

```js
const mensaje = 'Hola ' + nombre + ', bienvenida a ' + curso;
console.log(mensaje);
```

## Template literals

```js
const mensaje2 = `Hola ${nombre}, bienvenida a ${curso}`;
console.log(mensaje2);
```

## Métodos útiles

```js
const texto = '  JavaScript básico  ';
console.log(texto.trim());
console.log(texto.toUpperCase());
console.log(texto.includes('básico'));
```

## Más métodos de strings (muy usados)

```js
const frase = 'Curso de JavaScript';

console.log(frase.toLowerCase()); // curso de javascript
console.log(frase.startsWith('Curso')); // true
console.log(frase.endsWith('Script')); // true
console.log(frase.replace('JavaScript', 'Ionic')); // Curso de Ionic
```

## Extraer partes de texto

```js
const codigo = 'ALUMNO-2026';

console.log(codigo.slice(0, 6)); // ALUMNO
console.log(codigo.substring(7)); // 2026
```

## Dividir y unir

```js
const lista = 'html,css,javascript';
const tecnologias = lista.split(',');

console.log(tecnologias); // ['html', 'css', 'javascript']
console.log(tecnologias.join(' - ')); // html - css - javascript
```

## Plantillas multilínea

```js
const nombreAlumno = 'Elena';
const resumen = `
Alumno: ${nombreAlumno}
Módulo: JavaScript básico
Estado: Activo
`;

console.log(resumen);
```

## Cuándo usar template literals

Úsalos cuando necesites interpolar variables o crear texto multilínea de forma legible.

## Mini práctica

1. Crea una variable `email` con espacios al principio y al final.
2. Limpia el valor con `trim`.
3. Comprueba si contiene `@` con `includes`.
4. Separa usuario y dominio con `split('@')`.
