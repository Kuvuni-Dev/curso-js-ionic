# El valor de `this`

El valor de `this` depende de cómo se llama la función, no de dónde se define.

## Como método de un objeto

```js
const app = {
  nombre: 'Mi App',
  mostrar() {
    console.log(this.nombre);
  },
};
app.mostrar(); // Mi App
```

## En una función normal suelta

```js
function saludo() {
  console.log(this);
}
saludo(); // window en navegador o undefined en modo estricto
```

## Flechas y `this` léxico

Las arrow functions no crean su propio `this`; heredan el valor del contexto superior.

```js
const usuario = {
  nombre: 'Luis',
  mostrar: function () {
    const interno = () => {
      console.log(this.nombre);
    };
    interno();
  },
};
usuario.mostrar(); // Luis
```

## `call`, `apply` y `bind`

```js
function saludo(saludo) {
  console.log(`${saludo}, soy ${this.nombre}`);
}

const perfil = { nombre: 'Ana' };
saludo.call(perfil, 'Hola');
```

## Resumen rápido

- Método: `this` apunta al objeto antes del punto.
- Función normal: `this` depende de la llamada.
- Arrow function: `this` es léxico.
- `bind` fija el valor de `this`.
