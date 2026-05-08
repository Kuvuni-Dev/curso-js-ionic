# Patrón Singleton

El singleton garantiza una única instancia compartida a lo largo de la aplicación.

## Ejemplo

```js
const AppConfig = (function () {
  let instancia;

  function crearInstancia() {
    return { tema: 'claro' };
  }

  return {
    obtenerInstancia() {
      if (!instancia) instancia = crearInstancia();
      return instancia;
    },
  };
})();

const config1 = AppConfig.obtenerInstancia();
const config2 = AppConfig.obtenerInstancia();
console.log(config1 === config2); // true
```

## Uso

- Configuraciones globales.
- Conexiones a base de datos.
- Cachés compartidos.
