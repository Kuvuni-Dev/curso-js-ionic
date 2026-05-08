# Propiedades privadas con `#`

JavaScript permite campos privados de clase con la sintaxis `#`.

## Ejemplo básico

```js
class Cuenta {
  #saldo = 0;

  constructor(saldoInicial) {
    this.#saldo = saldoInicial;
  }

  depositar(cantidad) {
    this.#saldo += cantidad;
  }

  obtenerSaldo() {
    return this.#saldo;
  }
}

const cuenta = new Cuenta(100);
cuenta.depositar(50);
console.log(cuenta.obtenerSaldo()); // 150
```

## Características

- Los campos privados no son accesibles fuera de la clase.
- No se pueden leer con `this['#saldo']`.
- Son útiles para encapsular estado.
