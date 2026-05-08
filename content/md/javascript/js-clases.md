# Clases en JavaScript

Las clases son azúcar sintáctico para constructoras y prototipos.

## Definición básica

```js
class Persona {
  constructor(nombre) {
    this.nombre = nombre;
  }

  saludar() {
    return `Hola, soy ${this.nombre}`;
  }
}

const p = new Persona('Ana');
console.log(p.saludar());
```

## Herencia

```js
class Empleado extends Persona {
  constructor(nombre, cargo) {
    super(nombre);
    this.cargo = cargo;
  }
}
```
