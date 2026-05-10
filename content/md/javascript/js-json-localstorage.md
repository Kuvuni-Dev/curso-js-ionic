# JSON y localStorage

JSON permite intercambiar datos de forma legible y `localStorage` guardarlos en el navegador de forma persistente.

## JSON (JavaScript Object Notation)

### ¿Qué es JSON?

JSON es un formato de texto estandarizado para intercambiar datos. Aunque tiene aspecto similar a los objetos JavaScript, es solo texto.

```js
// JavaScript objeto
const usuario = { nombre: 'Ana', edad: 25, activo: true };

// JSON (es texto)
const json = '{"nombre":"Ana","edad":25,"activo":true}';
```

### JSON.stringify() - Objeto a JSON

Convierte un objeto JavaScript a texto JSON.

```js
const usuario = { nombre: 'Ana', edad: 25, ciudad: 'Madrid' };
const json = JSON.stringify(usuario);
console.log(json);
// {"nombre":"Ana","edad":25,"ciudad":"Madrid"}
```

#### Opciones de stringify

**Con indentación (para leer mejor):**

```js
const usuario = { nombre: 'Ana', edad: 25, hobbies: ['leer', 'correr'] };
const jsonFormato = JSON.stringify(usuario, null, 2);
console.log(jsonFormato);
/* Resultado:
{
  "nombre": "Ana",
  "edad": 25,
  "hobbies": [
    "leer",
    "correr"
  ]
}
*/
```

**Con filtro de propiedades (replacer):**

```js
const usuario = { nombre: 'Ana', edad: 25, password: 'secreto' };
const json = JSON.stringify(usuario, ['nombre', 'edad']);
console.log(json);
// {"nombre":"Ana","edad":25}
// Nota: 'password' se excluye
```

**Con función transformadora (replacer):**

```js
const datos = { nombre: 'Ana', precio: 19.99, fecha: new Date() };
const json = JSON.stringify(datos, (clave, valor) => {
  if (clave === 'precio') {
    return valor.toFixed(2); // Redondea precio
  }
  if (valor instanceof Date) {
    return valor.toISOString(); // Convierte fecha a ISO string
  }
  return valor;
});
console.log(json);
// {"nombre":"Ana","precio":"20.00","fecha":"2026-05-10T...Z"}
```

### JSON.parse() - JSON a objeto

Convierte texto JSON a un objeto JavaScript.

```js
const json = '{"nombre":"Ana","edad":25}';
const usuario = JSON.parse(json);
console.log(usuario.nombre); // Ana
console.log(typeof usuario); // object
```

#### parse() con reviver

Transforma valores mientras se parsean:

```js
const json = '{"nombre":"Ana","nacimiento":"1998-05-15"}';
const usuario = JSON.parse(json, (clave, valor) => {
  if (clave === 'nacimiento') {
    return new Date(valor); // Convierte string a Date
  }
  return valor;
});
console.log(usuario.nacimiento); // Date object
console.log(usuario.nacimiento.getFullYear()); // 1998
```

### Tipos de dato en JSON

JSON soporta:
- **Strings**: `"texto"`
- **Numbers**: `123`, `19.99`
- **Booleans**: `true`, `false`
- **null**: `null`
- **Arrays**: `[1, 2, 3]`
- **Objetos**: `{"clave": "valor"}`

**NO soporta:**
- Funciones, símbolos, undefined
- Fechas (se convierten a string)

```js
const datos = {
  nombre: 'Ana',
  activo: true,
  saldo: null,
  tags: ['js', 'ionic']
  // ❌ No puedes guardar funciones ni Date directamente
};
```

---

## localStorage

### ¿Qué es localStorage?

`localStorage` es un espacio de almacenamiento en el navegador que persiste incluso después de cerrar la pestaña.

- **Capacidad**: ~5-10 MB por dominio
- **Tipo de dato**: Solo strings
- **Duración**: Hasta que el usuario lo borre o limpie el caché

### Métodos de localStorage

**setItem(clave, valor)** - Guardar

```js
localStorage.setItem('tema', 'oscuro');
localStorage.setItem('usuario', JSON.stringify({ id: 1, nombre: 'Ana' }));
```

**getItem(clave)** - Obtener

```js
const tema = localStorage.getItem('tema');
console.log(tema); // 'oscuro'

const jsonUsuario = localStorage.getItem('usuario');
const usuario = JSON.parse(jsonUsuario);
console.log(usuario.nombre); // Ana
```

**removeItem(clave)** - Eliminar una clave

```js
localStorage.removeItem('tema');
console.log(localStorage.getItem('tema')); // null
```

**clear()** - Borrar todo

```js
localStorage.clear(); // ⚠️ Borra TODOS los datos guardados
```

**key(indice)** - Obtener clave por índice

```js
localStorage.setItem('a', '1');
localStorage.setItem('b', '2');
console.log(localStorage.key(0)); // 'a' o 'b' (orden no garantizado)
```

**length** - Número de elementos

```js
console.log(localStorage.length); // 2
```

### Verificar si existe una clave

```js
if (localStorage.getItem('usuario')) {
  console.log('Usuario ya existe');
} else {
  console.log('No hay usuario guardado');
}
```

---

## sessionStorage vs localStorage

| Característica | localStorage | sessionStorage |
|---|---|---|
| **Duración** | Permanente (hasta limpiar) | Hasta cerrar pestaña/navegador |
| **Compartido entre pestañas** | Sí | No |
| **Capacidad** | ~5-10 MB | ~5-10 MB |
| **Caso de uso** | Preferencias, datos persistentes | Datos temporales, flujos de sesión |

```js
// Use localStorage para recordar preferencias
localStorage.setItem('idioma', 'es');

// Use sessionStorage para datos temporales
sessionStorage.setItem('filtros-busqueda', JSON.stringify({
  categoria: 'libros',
  pagina: 1
}));
```

---

## Manejo de errores

### Errores al parsear JSON

Siempre usa `try/catch` al hacer parse(), especialmente si la fuente es externa:

```js
const jsonString = localStorage.getItem('usuario');

try {
  const usuario = JSON.parse(jsonString);
  console.log(usuario.nombre);
} catch (error) {
  console.error('JSON inválido:', error.message);
  // Usar valor por defecto
  const usuario = { nombre: 'Invitado' };
}
```

### Error: Storage quota exceeded

Si intentas guardar más de lo permitido:

```js
try {
  localStorage.setItem('datos-gigantes', jsonGrande);
} catch (error) {
  if (error.name === 'QuotaExceededError') {
    console.error('Sin espacio en localStorage');
    // Borrar datos antiguos o mostrar advertencia
    localStorage.clear();
  }
}
```

---

## Casos prácticos

### Caso 1: Guardar preferencias de usuario

```js
// Guardar preferencias
function guardarPreferencias() {
  const preferencias = {
    tema: 'oscuro',
    idioma: 'es',
    notificaciones: true,
    tamaño_fuente: 14
  };
  localStorage.setItem('preferencias', JSON.stringify(preferencias));
}

// Cargar preferencias
function cargarPreferencias() {
  const json = localStorage.getItem('preferencias');
  if (json) {
    return JSON.parse(json);
  }
  // Valores por defecto si no existen
  return {
    tema: 'claro',
    idioma: 'es',
    notificaciones: true,
    tamaño_fuente: 12
  };
}

// Usar
const misTemas = cargarPreferencias();
document.body.className = misTemas.tema;
```

### Caso 2: Carrito de compras

```js
// Agregar producto al carrito
function agregarAlCarrito(producto) {
  let carrito = [];
  const json = localStorage.getItem('carrito');
  
  if (json) {
    carrito = JSON.parse(json);
  }
  
  carrito.push({
    id: producto.id,
    nombre: producto.nombre,
    precio: producto.precio,
    cantidad: 1,
    fecha_agregado: new Date().toISOString()
  });
  
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Ver carrito
function verCarrito() {
  const json = localStorage.getItem('carrito');
  return json ? JSON.parse(json) : [];
}

// Vaciar carrito
function vaciarCarrito() {
  localStorage.removeItem('carrito');
}
```

### Caso 3: Guardar datos de formulario

```js
// Guardar automáticamente cada 5 segundos
const formulario = document.querySelector('form');
let timerGuardado;

formulario.addEventListener('input', () => {
  clearTimeout(timerGuardado);
  timerGuardado = setTimeout(() => {
    const datos = new FormData(formulario);
    const objeto = {
      nombre: datos.get('nombre'),
      email: datos.get('email'),
      mensaje: datos.get('mensaje'),
      fecha_guardado: new Date().toISOString()
    };
    localStorage.setItem('borrador-formulario', JSON.stringify(objeto));
    console.log('Borrador guardado');
  }, 5000);
});

// Restaurar datos si existen
function restaurarFormulario() {
  const json = localStorage.getItem('borrador-formulario');
  if (json) {
    const datos = JSON.parse(json);
    formulario.nombre.value = datos.nombre;
    formulario.email.value = datos.email;
    formulario.mensaje.value = datos.mensaje;
  }
}

// Al cargar página
window.addEventListener('load', restaurarFormulario);
```

---

## Limitaciones y consideraciones

### Capacidad de almacenamiento

- **localStorage**: Aproximadamente 5-10 MB por dominio
- No es suficiente para datos muy grandes
- Para aplicaciones grandes, considera **IndexedDB**

```js
// Comprobar cuánto espacio usas
function calcularUso() {
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const clave = localStorage.key(i);
    const valor = localStorage.getItem(clave);
    total += clave.length + valor.length;
  }
  return total + ' bytes'; // Aproximado
}
```

### Sincronización entre pestañas

`localStorage` se sincroniza automáticamente entre pestañas del mismo dominio:

```js
// En pestaña 1
localStorage.setItem('mensaje', 'Hola');

// En pestaña 2 - se recibe evento
window.addEventListener('storage', (evento) => {
  console.log(`${evento.key} cambió a ${evento.newValue}`);
});
```

### Seguridad

⚠️ **localStorage no es seguro para datos sensibles:**
- No está encriptado
- Es visible en DevTools
- No almacenes contraseñas, tokens de API, datos personales sensibles

```js
// ❌ MAL
localStorage.setItem('token-api', 'abc123xyz'); // No hagas esto

// ✅ MEJOR
// Almacena en cookies HttpOnly (del servidor)
// O en sessionStorage como máximo
```

### Incognito/Privado

En modo incógnito, `localStorage` generalmente está vacío y los cambios se descartan.

---

## Ejercicios prácticos

### Ejercicio 1: Contador persistente

Crea un contador que se guarde automáticamente:

```js
// Obtener contador del localStorage o crear uno nuevo
let contador = parseInt(localStorage.getItem('contador')) || 0;

// Aumentar y guardar
function incrementar() {
  contador++;
  localStorage.setItem('contador', contador);
  console.log('Contador:', contador);
}

// Usar
incrementar(); // 1
incrementar(); // 2
// Si recargas la página, sigue en 2
```

### Ejercicio 2: Lista de tareas

```js
function agregarTarea(texto) {
  const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
  tareas.push({
    id: Date.now(),
    texto: texto,
    completado: false,
    fecha: new Date().toISOString()
  });
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

function marcarCompleta(id) {
  const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
  const tarea = tareas.find(t => t.id === id);
  if (tarea) {
    tarea.completado = true;
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }
}

function obtenerTareas() {
  return JSON.parse(localStorage.getItem('tareas')) || [];
}
```

### Ejercicio 3: Validar y parsear con seguridad

```js
function obtenerSeguro(clave, tipo = 'objeto') {
  try {
    const json = localStorage.getItem(clave);
    if (!json) return null;
    
    const parsed = JSON.parse(json);
    
    // Validar tipo
    if (tipo === 'objeto' && typeof parsed !== 'object') {
      throw new Error('No es un objeto');
    }
    if (tipo === 'array' && !Array.isArray(parsed)) {
      throw new Error('No es un array');
    }
    
    return parsed;
  } catch (error) {
    console.error(`Error al obtener ${clave}:`, error.message);
    return null;
  }
}

// Usar
const usuario = obtenerSeguro('usuario', 'objeto');
const tareas = obtenerSeguro('tareas', 'array');
```

---

## Resumen

| Método | Uso |
|---|---|
| `JSON.stringify()` | Convertir objeto a texto JSON |
| `JSON.parse()` | Convertir texto JSON a objeto |
| `localStorage.setItem()` | Guardar dato |
| `localStorage.getItem()` | Obtener dato |
| `localStorage.removeItem()` | Borrar un dato |
| `localStorage.clear()` | Borrar todo |
| `sessionStorage` | Datos temporales por sesión |

**Recuerda:**
- localStorage almacena solo strings
- Siempre usa try/catch con JSON.parse()
- Usa JSON.stringify() al guardar objetos
- Verifica si el dato existe antes de parsear
