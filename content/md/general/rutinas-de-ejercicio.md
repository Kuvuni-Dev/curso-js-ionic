# Rutinas de ejercicio

Ejercicios propuestos para reforzar conceptos. Intenta resolverlos sin mirar el código del curso.

## Nivel 1: Fundamentos (Semana 1-2)

### Closures
Crea una función que devuelva un contador que pueda incrementarse y resetarse.

```js
const contador = crearContador(0);
console.log(contador.incrementar()); // 1
console.log(contador.incrementar()); // 2
console.log(contador.obtener());     // 2
console.log(contador.resetear());    // 0
```

### Scope y this
Define un objeto con métodos que usen `this` correctamente. Luego, crea una versión con arrow functions.

## Nivel 2: Asincronía (Semana 3-4)

### Promises
Crea una función que devuelva una promesa que se resuelva después de 2 segundos.

```js
const miPromesa = esperar(2000);
miPromesa.then(() => console.log('¡Listo!'));
```

### Fetch API
Obtén datos de [JSONPlaceholder](https://jsonplaceholder.typicode.com) y muestra un listado de usuarios.

```js
async function cargarUsuarios() {
  // Tu código aquí
}
```

## Nivel 3: Patrones (Semana 5-6)

### Observer
Implementa un sistema de suscriptores que notifique cambios en una lista de tareas.

```js
const tareas = crearGestorTareas();
tareas.suscribir((evento) => console.log(evento));
tareas.agregar('Estudiar');
tareas.agregar('Practicar');
```

### Singleton
Crea un objeto de configuración global que solo pueda existir una vez.

## Nivel 4: Ionic (Semana 7-8)

### Formulario simple
Construye un formulario con `ion-input`, `ion-toggle`, `ion-select` y `ion-button`.

### Lista interactiva
Muestra un listado de items con `ion-item-sliding` para eliminar o editar.

### Componente personalizado
Crea un componente Ionic que acepte propiedades y dispare eventos.

## Proyecto capstone (Semana 9-10)

### App de gestión de tareas

Requisitos:
- ✅ Listar tareas con Ionic
- ✅ Agregar tareas (fetch a backend simulado)
- ✅ Eliminar tareas
- ✅ Marcar como completada
- ✅ Usar async/await
- ✅ Mostrar alertas y toasts
- ✅ Guardar en localStorage

### Tecnologías
- HTML, CSS, JavaScript
- Ionic (componentes y layout)
- Fetch API o XMLHttpRequest
- localStorage

### Criterios de evaluación
- Funcionalidad completa
- Código limpio y comentado
- Buenas prácticas JavaScript
- Interfaz responsive
- Manejo de errores

## Mini-desafíos semanales

### Semana 1
Implementa el patrón módulo IIFE con una calculadora.

### Semana 2
Crea un generador que produzca números Fibonacci.

### Semana 3
Haz una función que intente reconectar a una API cada 5 segundos si falla.

### Semana 4
Construye un debounce para un input de búsqueda.

### Semana 5
Combina map, filter y reduce en una sola función compleja.

### Semana 6
Implementa una clase con herencia y métodos privados.

### Semana 7
Crea un componente Ionic reutilizable (tarjeta, modal, etc).

### Semana 8
Integra una API real en una app Ionic.

### Semana 9
Refactoriza tu código anterior con best practices.

### Semana 10
Presenta tu proyecto final.

## Checklist de habilidades

Marca ✅ cuando domines:

### JavaScript
- [ ] Closures y scope léxico
- [ ] Promises y async/await
- [ ] Fetch API y manejo de errores
- [ ] Destructuring y spread
- [ ] Array methods (map, filter, reduce)
- [ ] Clases y herencia
- [ ] Patrones de diseño
- [ ] Módulos ES

### Ionic
- [ ] Estructura ion-app, ion-page, ion-content
- [ ] Formularios y validación
- [ ] Navegación con router
- [ ] Listas y cards
- [ ] Overlays (alert, toast, modal)
- [ ] Componentes personalizados
- [ ] Responsive design
- [ ] Integración de APIs

## Recursos para resolver ejercicios

- Documentación oficial
- DevTools del navegador
- Experimenta en console
- Stack Overflow para dudas
- Pide feedback en comunidades
