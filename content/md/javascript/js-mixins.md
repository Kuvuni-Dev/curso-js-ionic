# Mixins y composición

Los mixins permiten añadir comportamiento a clases sin herencia múltiple tradicional.

## Ejemplo de mixin

```js
const hablador = (Base) =>
  class extends Base {
    saludar() {
      return 'Hola';
    }
  };

class Persona {}
class PersonaHabladora extends hablador(Persona) {}

const p = new PersonaHabladora();
console.log(p.saludar()); // Hola
```

## Ventaja

- Combinar funcionalidades de forma flexible.
- Evitar jerarquías profundas de herencia.
