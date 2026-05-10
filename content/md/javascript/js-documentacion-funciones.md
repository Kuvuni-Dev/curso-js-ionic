# Documentar funciones en JavaScript (JSDoc)

Documentar funciones ayuda a que el código sea más fácil de mantener y entender, especialmente cuando se trabaja en equipo.

## Cuándo documentar

- Siempre en funciones públicas/exportadas.
- En funciones internas con lógica no evidente.
- Cuando una función tiene parámetros opcionales o retorna objetos complejos.

## Estructura mínima recomendada

```js
/**
 * Describe brevemente qué hace la función.
 * @param {string} nombre
 * @returns {string}
 */
function saludar(nombre) {
  return `Hola, ${nombre}`;
}
```

## Etiquetas JSDoc más útiles

- `@param` para parámetros.
- `@returns` para el valor de retorno.
- `@throws` si puede lanzar errores.
- `@example` para un ejemplo rápido de uso.

## Ejemplo con varios parámetros

```js
/**
 * Calcula el total con impuesto incluido.
 * @param {number} subtotal
 * @param {number} impuestoPorcentaje
 * @returns {number}
 */
function calcularTotal(subtotal, impuestoPorcentaje) {
  return subtotal + subtotal * (impuestoPorcentaje / 100);
}
```

## Ejemplo con objeto de retorno

```js
/**
 * Construye un perfil básico de usuario.
 * @param {string} nombre
 * @param {string} rol
 * @returns {{nombre: string, rol: string, activo: boolean}}
 */
function crearPerfil(nombre, rol) {
  return { nombre, rol, activo: true };
}
```

## Comentarios de intención dentro de la función

Además de JSDoc, puedes usar un comentario corto para explicar decisiones de negocio o transformaciones importantes.

```js
function normalizarEmail(email) {
  // Estandariza para comparar registros sin errores por mayúsculas.
  return email.trim().toLowerCase();
}
```

## Buenas prácticas

1. Mantén los comentarios cortos y útiles.
2. No repitas lo obvio del código.
3. Actualiza la documentación cuando cambie la función.
4. Usa nombres claros para reducir la necesidad de comentarios largos.

## Mini práctica

1. Elige una función de tu proyecto.
2. Añade JSDoc con `@param` y `@returns`.
3. Si tiene lógica especial, añade un comentario de intención.
4. Revisa que el comentario siga siendo válido tras cualquier refactor.
