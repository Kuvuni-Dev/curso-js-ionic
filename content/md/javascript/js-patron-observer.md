# Patrón Observer

El patrón observer permite notificar a varios suscriptores cuando ocurre un evento.

## Ejemplo simple

```js
class Evento {
  constructor() {
    this.suscriptores = [];
  }

  suscribir(fn) {
    this.suscriptores.push(fn);
  }

  notificar(datos) {
    this.suscriptores.forEach((fn) => fn(datos));
  }
}

const evento = new Evento();
evento.suscribir((dato) => console.log('Listener 1:', dato));
evento.notificar('Hola');
```

## Uso típico

- Interfaces de usuario reactivas.
- Gestión de eventos personalizados.
- Pub/Sub simple.
