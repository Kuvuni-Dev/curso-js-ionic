# Patrón Factory

El patrón factory crea objetos sin exponer la lógica de construcción al cliente.

## Ejemplo de factory

```js
function crearUsuario(tipo) {
  if (tipo === 'admin') {
    return { rol: 'admin', permisos: ['leer', 'escribir'] };
  }
  return { rol: 'usuario', permisos: ['leer'] };
}

const usuario = crearUsuario('admin');
console.log(usuario);
```

## Ventajas

- Desacopla la creación de objetos.
- Permite seleccionar la implementación más adecuada.
- Facilita pruebas y extensión.
