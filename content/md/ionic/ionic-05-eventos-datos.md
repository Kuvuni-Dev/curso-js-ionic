# 5. Eventos y manejo de datos en Ionic

## Objetivo
Manejar interacciones del usuario (clicks, cambios en inputs, envios de formularios) y trabajar con datos.

## Tipos de eventos en Ionic

### Eventos básicos
```html
<!-- Click -->
<ion-button id="btn">Click aquí</ion-button>

<!-- Cambio de input -->
<ion-input id="input"></ion-input>

<!-- Cambio de toggle -->
<ion-toggle id="toggle"></ion-toggle>

<!-- Cambio de select -->
<ion-select id="select">
  <ion-select-option value="1">Opción 1</ion-select-option>
  <ion-select-option value="2">Opción 2</ion-select-option>
</ion-select>

<!-- Envío de formulario -->
<ion-list>
  <ion-item>
    <ion-label>Email</ion-label>
    <ion-input type="email" id="email"></ion-input>
  </ion-item>
  <ion-button expand="block" id="btn-enviar">Enviar</ion-button>
</ion-list>
```

---

## Escuchar eventos con addEventListener

### Click simple
```js
const boton = document.getElementById('btn');
boton.addEventListener('click', () => {
  console.log('¡Hiciste click!');
});
```

### Ion-input change
```js
const input = document.getElementById('input');
input.addEventListener('ionChange', (e) => {
  console.log('Nuevo valor:', e.detail.value);
});

// O también:
input.addEventListener('input', (e) => {
  console.log('Escribiendo:', e.target.value);
});
```

### Ion-toggle change
```js
const toggle = document.getElementById('toggle');
toggle.addEventListener('ionChange', (e) => {
  const activado = e.detail.checked;
  console.log('Toggle:', activado ? 'ON' : 'OFF');
});
```

### Ion-select change
```js
const select = document.getElementById('select');
select.addEventListener('ionChange', (e) => {
  console.log('Seleccionaste:', e.detail.value);
});
```

---

## Obtener y establecer valores

### De un input
```html
<ion-input id="nombre" placeholder="Tu nombre"></ion-input>

<script>
const input = document.getElementById('nombre');

// Obtener valor
const valor = input.value;

// Establecer valor
input.value = 'Juan';
</script>
```

### De un select
```html
<ion-select id="opciones">
  <ion-select-option value="a">Opción A</ion-select-option>
  <ion-select-option value="b">Opción B</ion-select-option>
</ion-select>

<script>
const select = document.getElementById('opciones');

// Obtener valor seleccionado
const seleccionado = select.value;

// Establecer valor
select.value = 'a';
</script>
```

### De un toggle
```html
<ion-toggle id="notif"></ion-toggle>

<script>
const toggle = document.getElementById('notif');

// Obtener estado
const activado = toggle.checked;

// Cambiar estado
toggle.checked = true;
</script>
```

---

## Formularios

### Formulario básico
```html
<ion-list>
  <ion-item>
    <ion-label position="stacked">Nombre</ion-label>
    <ion-input id="nombre" placeholder="Tu nombre"></ion-input>
  </ion-item>
  
  <ion-item>
    <ion-label position="stacked">Email</ion-label>
    <ion-input id="email" type="email" placeholder="tu@email.com"></ion-input>
  </ion-item>
  
  <ion-item>
    <ion-label position="stacked">Mensaje</ion-label>
    <ion-textarea id="mensaje" placeholder="Tu mensaje"></ion-textarea>
  </ion-item>
  
  <ion-button id="btn-enviar" expand="block" color="primary">
    Enviar
  </ion-button>
</ion-list>

<script>
document.getElementById('btn-enviar').addEventListener('click', () => {
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const mensaje = document.getElementById('mensaje').value;
  
  if (!nombre || !email || !mensaje) {
    alert('Por favor completa todos los campos');
    return;
  }
  
  console.log('Formulario enviado:', { nombre, email, mensaje });
  alert('¡Mensaje enviado!');
});
</script>
```

### Limpiar formulario
```js
function limpiarFormulario() {
  document.getElementById('nombre').value = '';
  document.getElementById('email').value = '';
  document.getElementById('mensaje').value = '';
}

// Usar
document.getElementById('btn-enviar').addEventListener('click', () => {
  // ... procesar datos ...
  limpiarFormulario();
});
```

---

## Actualizar HTML dinámicamente

### Cambiar texto
```html
<p id="mensaje">Cargando...</p>

<script>
document.getElementById('mensaje').textContent = '¡Listo!';
// O:
document.getElementById('mensaje').innerText = '¡Listo!';
</script>
```

### Cambiar HTML (cuidado con XSS)
```html
<div id="contenido"></div>

<script>
// ⚠️ PELIGRO: Puede introducir código malicioso
document.getElementById('contenido').innerHTML = '<h1>Título</h1>';

// ✅ MEJOR: Crear elementos seguros
const div = document.getElementById('contenido');
const h1 = document.createElement('h1');
h1.textContent = 'Título';
div.appendChild(h1);
</script>
```

### Cambiar clases CSS
```html
<div id="mi-div" class="normal">Contenido</div>

<script>
const div = document.getElementById('mi-div');

// Agregar clase
div.classList.add('activo');

// Quitar clase
div.classList.remove('normal');

// Toggle (agregar si no existe, quitar si existe)
div.classList.toggle('visible');

// Verificar si tiene clase
if (div.classList.contains('activo')) {
  console.log('Tiene clase activo');
}
</script>
```

---

## Ejemplo: Contador interactivo

```html
<ion-page>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>Contador</ion-title>
    </ion-toolbar>
  </ion-header>
  
  <ion-content class="ion-align-items-center ion-justify-content-center">
    <h1 id="numero">0</h1>
    
    <ion-button id="btn-menos" fill="outline">
      Menos
    </ion-button>
    <ion-button id="btn-mas" color="primary">
      Más
    </ion-button>
    <ion-button id="btn-reset" color="danger">
      Reiniciar
    </ion-button>
  </ion-content>
</ion-page>

<script>
let contador = 0;

function actualizar() {
  document.getElementById('numero').textContent = contador;
  // Cambiar color según valor
  const h1 = document.querySelector('h1');
  if (contador > 10) {
    h1.style.color = 'green';
  } else if (contador < -10) {
    h1.style.color = 'red';
  } else {
    h1.style.color = 'black';
  }
}

document.getElementById('btn-mas').addEventListener('click', () => {
  contador++;
  actualizar();
});

document.getElementById('btn-menos').addEventListener('click', () => {
  contador--;
  actualizar();
});

document.getElementById('btn-reset').addEventListener('click', () => {
  contador = 0;
  actualizar();
});
</script>
```

---

## Ejemplo: Lista de tareas

```html
<ion-page>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>Mis tareas</ion-title>
    </ion-toolbar>
  </ion-header>
  
  <ion-content class="ion-padding">
    <!-- Entrada para nueva tarea -->
    <ion-item>
      <ion-input id="nueva-tarea" placeholder="Nueva tarea..."></ion-input>
      <ion-button id="btn-agregar" slot="end">Agregar</ion-button>
    </ion-item>
    
    <!-- Lista de tareas -->
    <ion-list id="lista-tareas"></ion-list>
  </ion-content>
</ion-page>

<script>
let tareas = [];
let idContador = 0;

function agregarTarea() {
  const input = document.getElementById('nueva-tarea');
  const texto = input.value.trim();
  
  if (!texto) {
    alert('Por favor escribe una tarea');
    return;
  }
  
  const tarea = {
    id: idContador++,
    texto: texto,
    completada: false
  };
  
  tareas.push(tarea);
  input.value = '';
  renderizar();
}

function eliminarTarea(id) {
  tareas = tareas.filter(t => t.id !== id);
  renderizar();
}

function marcarCompleta(id) {
  const tarea = tareas.find(t => t.id === id);
  if (tarea) {
    tarea.completada = !tarea.completada;
    renderizar();
  }
}

function renderizar() {
  const lista = document.getElementById('lista-tareas');
  lista.innerHTML = '';
  
  tareas.forEach(tarea => {
    const item = document.createElement('ion-item');
    item.innerHTML = `
      <ion-checkbox 
        slot="start" 
        ${tarea.completada ? 'checked' : ''}
        class="checkbox-tarea"
        data-id="${tarea.id}">
      </ion-checkbox>
      <ion-label style="${tarea.completada ? 'text-decoration: line-through' : ''}">
        ${tarea.texto}
      </ion-label>
      <ion-button 
        slot="end" 
        color="danger" 
        fill="clear"
        class="btn-eliminar"
        data-id="${tarea.id}">
        <ion-icon name="trash"></ion-icon>
      </ion-button>
    `;
    lista.appendChild(item);
  });
  
  // Agregar eventos
  document.querySelectorAll('.checkbox-tarea').forEach(cb => {
    cb.addEventListener('ionChange', (e) => {
      marcarCompleta(parseInt(e.target.dataset.id));
    });
  });
  
  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', () => {
      eliminarTarea(parseInt(btn.dataset.id));
    });
  });
}

document.getElementById('btn-agregar').addEventListener('click', agregarTarea);

// Permitir Enter
document.getElementById('nueva-tarea').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    agregarTarea();
  }
});

// Iniciar
renderizar();
</script>
```

---

## Trabajar con datos globales

### Variable global (simple)
```js
// Guardar en variable global
window.usuarioActual = {
  id: 1,
  nombre: 'Juan',
  email: 'juan@email.com'
};

// Acceder desde cualquier página
console.log(window.usuarioActual.nombre);
```

### Objeto de datos (mejor)
```js
const app = {
  usuario: {
    id: 1,
    nombre: 'Juan'
  },
  
  setUsuario(usuario) {
    this.usuario = usuario;
  },
  
  getUsuario() {
    return this.usuario;
  }
};

// Usar
app.setUsuario({ id: 2, nombre: 'María' });
console.log(app.getUsuario());
```

### Usar localStorage (persistente)
```js
function guardarUsuario(usuario) {
  localStorage.setItem('usuario', JSON.stringify(usuario));
}

function obtenerUsuario() {
  const json = localStorage.getItem('usuario');
  return json ? JSON.parse(json) : null;
}

// Usar
guardarUsuario({ id: 1, nombre: 'Juan' });
const usuario = obtenerUsuario();
console.log(usuario);
```

---

## Event delegation (para elementos dinámicos)

Cuando agregas elementos dinámicamente, los eventos no funcionan.

```html
<ion-list id="lista"></ion-list>

<script>
// ❌ INCORRECTO: No funciona para elementos agregados después
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', () => {
    console.log('Clickeaste');
  });
});

// ✅ CORRECTO: Event delegation
document.getElementById('lista').addEventListener('click', (e) => {
  const item = e.target.closest('.item');
  if (item) {
    console.log('Clickeaste', item);
  }
});
</script>
```

---

## Resumen de eventos

| Evento | Cuándo | Ejemplo |
|---|---|---|
| `click` | Click | Botón |
| `ionChange` | Cambio en componente | Input, Toggle, Select |
| `input` | Escribiendo | Input |
| `keypress` | Presionar tecla | Enter, Escape |
| `submit` | Enviar form | Form |
| `ionRouteDidChange` | Cambio de página | Navegación |

---

## Próximos pasos

1. ✅ Estructura de proyecto
2. ✅ Layout esencial
3. ✅ Componentes básicos
4. ✅ Navegación básica
5. ✅ Eventos y datos (AHORA)
6. 📍 Introducción a frameworks (React, Vue, Angular)
