/**
 * @file optional-chaining.demo.js
 * @description Demo interactivo: Optional chaining (?.) y nullish coalescing (??).
 */

const USUARIOS = {
  activo: {
    nombre: 'Ana',
    contacto: {
      email: 'ana@email.com',
      telefono: { movil: '600-123-456', fijo: null },
    },
    perfil: { avatar: 'ana.jpg' },
  },
  incompleto: {
    nombre: 'Carlos',
    contacto: null,
  },
  minimo: {
    nombre: 'Elena',
  },
};

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Optional chaining (<code>?.</code>) y nullish coalescing (<code>??</code>)</h2>
      <p class="js-subtitle">
        <code>?.</code> permite acceder a propiedades anidadas sin lanzar un error si
        algún nodo intermedio es <code>null</code> o <code>undefined</code>.
        <code>??</code> proporciona un valor por defecto solo cuando el resultado
        es <code>null</code> o <code>undefined</code>.
      </p>

      <!-- SIN vs CON -->
      <div class="js-section-title">Acceso a propiedades anidadas — elige un usuario</div>
      <div class="js-controls">
        <ion-button size="small" color="primary"   id="btn-user-activo">usuario.activo</ion-button>
        <ion-button size="small" color="warning"   id="btn-user-incompleto">usuario.incompleto</ion-button>
        <ion-button size="small" color="danger"    id="btn-user-minimo">usuario.minimo</ion-button>
      </div>
      <div id="oc-out" class="js-output" style="min-height:80px;">👆 Selecciona un usuario.</div>

      <!-- NULLISH COALESCING -->
      <div class="js-section-title">Nullish coalescing (<code>??</code>) vs OR (<code>||</code>)</div>
      <div class="js-controls">
        <ion-button size="small" color="primary"   id="btn-null-null">valor = null</ion-button>
        <ion-button size="small" color="secondary" id="btn-null-0">valor = 0</ion-button>
        <ion-button size="small" color="tertiary"  id="btn-null-empty">valor = ""</ion-button>
        <ion-button size="small" color="success"   id="btn-null-false">valor = false</ion-button>
      </div>
      <div id="nc-out" class="js-output" style="min-height:60px;"></div>

      <!-- CASOS DE USO -->
      <div class="js-section-title">Casos de uso combinados</div>
      <pre class="js-code-panel">// Acceso a propiedades anidadas sin guardianes (código antiguo)
const telefono = usuario
  && usuario.contacto
  && usuario.contacto.telefono
  && usuario.contacto.telefono.movil;

// Con optional chaining (mucho más limpio)
const telefono = usuario?.contacto?.telefono?.movil;
// → "600-123-456" si existe, undefined si cualquier nodo es null/undefined

// Combinado con ?? para valor por defecto
const tel = usuario?.contacto?.telefono?.movil ?? 'Sin teléfono';

// También funciona con métodos:
const nombre = usuario?.getNombre?.(); // llama solo si existe la función

// Y con arrays:
const primerPost = usuario?.posts?.[0]?.titulo ?? 'Sin posts';

// ⚠️ La diferencia entre ?? y ||:
0     ?? 'defecto'  // → 0      (0 NO es null/undefined)
0     || 'defecto'  // → 'defecto' (0 es falsy en ||)

''    ?? 'defecto'  // → ''     (cadena vacía NO es null/undefined)
''    || 'defecto'  // → 'defecto' (cadena vacía es falsy en ||)

null  ?? 'defecto'  // → 'defecto' ✅
null  || 'defecto'  // → 'defecto' ✅</pre>
    </section>
  `;
}

export function init(root) {
  const ocOut = root.querySelector('#oc-out');
  const ncOut = root.querySelector('#nc-out');

  function mostrarUsuario(key) {
    const u = USUARIOS[key];
    // Sin optional chaining
    let sinOC = '❌ Habría lanzado TypeError';
    try {
      const t = u.contacto.telefono.movil; // puede fallar
      sinOC = `"${t}"`;
    } catch (e) {
      sinOC = `❌ TypeError: "${e.message}"`;
    }

    // Con optional chaining
    const email   = u?.contacto?.email          ?? 'Sin email';
    const movil   = u?.contacto?.telefono?.movil ?? 'Sin móvil';
    const fijo    = u?.contacto?.telefono?.fijo  ?? 'Sin fijo';
    const avatar  = u?.perfil?.avatar           ?? 'avatar-default.jpg';

    ocOut.innerHTML = `
      <strong>Usuario: ${u.nombre}</strong><br><br>
      <strong>Sin optional chaining</strong> (<code>u.contacto.telefono.movil</code>):<br>
      → ${sinOC}<br><br>
      <strong>Con optional chaining + ??</strong>:<br>
      → email:  <code>${email}</code><br>
      → móvil:  <code>${movil}</code><br>
      → fijo:   <code>${fijo}</code><br>
      → avatar: <code>${avatar}</code>
      <pre class="js-code-panel" style="margin-top:8px">const email  = u?.contacto?.email ?? 'Sin email';
const movil  = u?.contacto?.telefono?.movil ?? 'Sin móvil';
const avatar = u?.perfil?.avatar ?? 'avatar-default.jpg';</pre>
    `;
  }

  root.querySelector('#btn-user-activo').addEventListener('click', () => mostrarUsuario('activo'));
  root.querySelector('#btn-user-incompleto').addEventListener('click', () => mostrarUsuario('incompleto'));
  root.querySelector('#btn-user-minimo').addEventListener('click', () => mostrarUsuario('minimo'));

  // Nullish coalescing
  function mostrarNC(valor, etiqueta) {
    const conNN  = valor ?? 'VALOR POR DEFECTO';
    const conOR  = valor || 'VALOR POR DEFECTO';
    const esFalsy = !valor;
    const esNullish = valor === null || valor === undefined;

    ncOut.innerHTML = `
      valor = <strong>${etiqueta}</strong> (${typeof valor})
      &nbsp;|&nbsp; ¿falsy?: <strong>${esFalsy}</strong>
      &nbsp;|&nbsp; ¿null/undefined?: <strong>${esNullish}</strong><br><br>
      <code>valor ?? 'VALOR POR DEFECTO'</code> → <strong style="color:var(--ion-color-primary)">${JSON.stringify(conNN)}</strong><br>
      <code>valor || 'VALOR POR DEFECTO'</code> → <strong style="color:var(--ion-color-secondary)">${JSON.stringify(conOR)}</strong><br><br>
      <small>${esNullish
        ? '?? y || producen el mismo resultado: el valor es null/undefined.'
        : `El valor es <em>falsy</em> pero NO null/undefined. ?? lo respeta; || lo sustituye.
           <strong>?? es más preciso</strong> cuando 0, "" o false son valores válidos.`
      }</small>
    `;
  }

  root.querySelector('#btn-null-null').addEventListener('click', () => mostrarNC(null, 'null'));
  root.querySelector('#btn-null-0').addEventListener('click',    () => mostrarNC(0,    '0'));
  root.querySelector('#btn-null-empty').addEventListener('click',() => mostrarNC('',   '""'));
  root.querySelector('#btn-null-false').addEventListener('click',() => mostrarNC(false,'false'));
}
