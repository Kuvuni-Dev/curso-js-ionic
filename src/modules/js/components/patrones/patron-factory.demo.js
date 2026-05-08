/**
 * @file patron-factory.demo.js
 * @description Demo interactivo: Patrón Factory.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Patrón Factory</h2>
      <p class="js-subtitle">
        El <strong>Factory</strong> encapsula la lógica de creación de objetos.
        En lugar de usar <code>new Clase()</code> directamente, delega la decisión
        a una función o clase. Útil cuando el tipo de objeto a crear depende de
        parámetros en tiempo de ejecución.
      </p>

      <!-- DEMO: USER FACTORY -->
      <div class="js-section-title">UserFactory — crear usuarios según su rol</div>
      <div class="js-controls">
        <ion-button size="small" color="primary"   id="btn-create-guest">Crear Guest</ion-button>
        <ion-button size="small" color="secondary" id="btn-create-user">Crear User</ion-button>
        <ion-button size="small" color="tertiary"  id="btn-create-admin">Crear Admin</ion-button>
        <ion-button size="small" color="success"   id="btn-create-super">Crear Superadmin</ion-button>
      </div>
      <div id="factory-out" class="js-output" style="min-height:80px;">👆 Crea diferentes tipos de usuario.</div>

      <pre class="js-code-panel">// Clases concretas
class Guest {
  constructor(ip) { this.ip = ip; this.permisos = ['leer']; }
  puedeEditar() { return false; }
  descripcion()  { return \`Invitado desde ${this.ip}\`; }
}

class User {
  constructor(nombre, email) {
    this.nombre = nombre;
    this.email = email;
    this.permisos = ['leer', 'escribir', 'comentar'];
  }
  puedeEditar() { return true; }
  descripcion()  { return \`Usuario: ${this.nombre} <${this.email}>\`; }
}

class Admin extends User {
  constructor(nombre, email, departamento) {
    super(nombre, email);
    this.departamento = departamento;
    this.permisos = [...this.permisos, 'eliminar', 'gestionar-usuarios'];
  }
  descripcion() { return \`Admin [${this.departamento}]: ${this.nombre}\`; }
}

// Factory — centraliza la creación
class UserFactory {
  static crear(tipo, datos = {}) {
    switch (tipo) {
      case 'guest':      return new Guest(datos.ip ?? '0.0.0.0');
      case 'user':       return new User(datos.nombre, datos.email);
      case 'admin':      return new Admin(datos.nombre, datos.email, datos.departamento);
      case 'superadmin': {
        const a = new Admin(datos.nombre, datos.email, 'ROOT');
        a.permisos.push('acceso-total');
        return a;
      }
      default: throw new Error(\`Tipo de usuario desconocido: \${tipo}\`);
    }
  }
}

// Uso
const u1 = UserFactory.crear('guest', { ip: '192.168.1.5' });
const u2 = UserFactory.crear('user',  { nombre: 'Ana', email: 'ana@js.com' });
const u3 = UserFactory.crear('admin', { nombre: 'Carlos', email: 'c@js.com', departamento: 'IT' });
</pre>

      <!-- FACTORY PARA ELEMENTOS UI -->
      <div class="js-section-title">Factory para elementos de UI</div>
      <pre class="js-code-panel">// Crear diferentes tipos de notificación dinámicamente
class NotificationFactory {
  static crear(tipo, mensaje) {
    const base = { mensaje, ts: new Date().toISOString() };
    switch (tipo) {
      case 'info':    return { ...base, icono: 'ℹ️', color: '#3498db', duracion: 3000 };
      case 'success': return { ...base, icono: '✅', color: '#2ecc71', duracion: 2000 };
      case 'warning': return { ...base, icono: '⚠️', color: '#f39c12', duracion: 5000 };
      case 'error':   return { ...base, icono: '❌', color: '#e74c3c', duracion: 8000 };
      default: throw new Error(\`Tipo desconocido: \${tipo}\`);
    }
  }
}
</pre>

      <!-- DIFERENCIA CON NEW -->
      <div class="js-section-title">Factory vs new directo</div>
      <pre class="js-code-panel">// ❌ Sin factory — el consumidor decide la clase concreta
function registrar(tipo, datos) {
  let usuario;
  if (tipo === 'admin') usuario = new Admin(datos.nombre, datos.email, datos.dept);
  else                  usuario = new User(datos.nombre, datos.email);
  db.guardar(usuario);
}

// ✅ Con factory — el consumidor no sabe qué clase se usa internamente
function registrar(tipo, datos) {
  const usuario = UserFactory.crear(tipo, datos);  // sin if, sin new directo
  db.guardar(usuario);
}
// Ventajas:
// — La lógica de construcción está en un solo lugar (DRY)
// — Fácil de extender: un nuevo tipo solo requiere modificar el factory
// — Los tests solo deben mockear UserFactory.crear, no todas las clases</pre>
    </section>
  `;
}

export function init(root) {
  class Guest {
    constructor(ip) { this.tipo = 'guest'; this.ip = ip; this.permisos = ['leer']; }
    puedeEditar() { return false; }
    descripcion() { return `Invitado desde ${this.ip}`; }
  }
  class User {
    constructor(nombre, email) {
      this.tipo = 'user'; this.nombre = nombre; this.email = email;
      this.permisos = ['leer', 'escribir', 'comentar'];
    }
    puedeEditar() { return true; }
    descripcion() { return `Usuario: ${this.nombre} <${this.email}>`; }
  }
  class Admin extends User {
    constructor(nombre, email, departamento) {
      super(nombre, email); this.tipo = 'admin'; this.departamento = departamento;
      this.permisos = [...this.permisos, 'eliminar', 'gestionar-usuarios'];
    }
    descripcion() { return `Admin [${this.departamento}]: ${this.nombre}`; }
  }

  class UserFactory {
    static crear(tipo, datos = {}) {
      switch (tipo) {
        case 'guest':      return new Guest(datos.ip ?? '192.168.0.1');
        case 'user':       return new User(datos.nombre, datos.email);
        case 'admin':      return new Admin(datos.nombre, datos.email, datos.departamento);
        case 'superadmin': {
          const a = new Admin(datos.nombre, datos.email, 'ROOT');
          a.tipo = 'superadmin';
          a.permisos.push('acceso-total');
          return a;
        }
        default: throw new Error(`Tipo desconocido: ${tipo}`);
      }
    }
  }

  const out = root.querySelector('#factory-out');

  function mostrar(u) {
    const iconos = { guest: '👤', user: '🧑', admin: '🔑', superadmin: '👑' };
    out.innerHTML = `
      ${iconos[u.tipo] ?? '❓'} <strong>${u.descripcion()}</strong><br>
      Tipo: <code>${u.tipo}</code><br>
      Permisos: ${u.permisos.map(p => `<ion-chip color="primary"><ion-label>${p}</ion-label></ion-chip>`).join(' ')}<br>
      <code>puedeEditar()</code> → <strong>${u.puedeEditar()}</strong><br>
      <code>instanceof User</code> → <strong>${u instanceof User}</strong><br>
      <code>UserFactory.crear('${u.tipo}', { … })</code> — sin saber qué clase se usó internamente.
    `;
  }

  root.querySelector('#btn-create-guest').addEventListener('click', () => {
    mostrar(UserFactory.crear('guest', { ip: '10.0.0.42' }));
  });
  root.querySelector('#btn-create-user').addEventListener('click', () => {
    mostrar(UserFactory.crear('user', { nombre: 'Ana García', email: 'ana@curso.com' }));
  });
  root.querySelector('#btn-create-admin').addEventListener('click', () => {
    mostrar(UserFactory.crear('admin', { nombre: 'Carlos López', email: 'carlos@curso.com', departamento: 'IT' }));
  });
  root.querySelector('#btn-create-super').addEventListener('click', () => {
    mostrar(UserFactory.crear('superadmin', { nombre: 'Superadmin', email: 'root@sistema.com' }));
  });
}
