# Prototipos en JavaScript

JavaScript utiliza prototipos para heredar propiedades y métodos entre objetos. Cada objeto tiene un enlace interno a su prototipo, que forma una cadena de herencia.

## Ejemplo con objetos literales

```js
const persona = { nombre: 'Ana' };
const empleado = Object.create(persona);
empleado.cargo = 'Desarrollador';

console.log(empleado.nombre); // Ana
```

## `prototype` de funciones constructoras

```js
function Usuario(nombre) {
  this.nombre = nombre;
}

Usuario.prototype.saludar = function () {
  return `Hola, soy ${this.nombre}`;
};

const u = new Usuario('María');
console.log(u.saludar());
```

## Cadena de prototipos

- `empleado` busca `nombre` en sí mismo.
- Si no lo encuentra, lo busca en su prototipo (`persona`).
- Si tampoco está allí, sigue subiendo la cadena.

## Por qué es útil

- Reusar métodos entre instancias.
- Implementar herencia sin clases.
- Optimizar memoria usando un único prototipo compartido.
