/**
 * @file fetch-api.demo.js
 * @description Demo interactivo: Fetch API con peticiones HTTP reales.
 * Usa JSONPlaceholder como API pública de prueba.
 */

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Fetch API</h2>
      <p class="js-subtitle">
        <code>fetch()</code> es la API nativa para realizar peticiones HTTP.
        Devuelve una <strong>Promise</strong> que resuelve con un objeto <code>Response</code>.
        Los datos de esta demo son reales — se obtienen de
        <a href="https://jsonplaceholder.typicode.com" target="_blank" rel="noopener">JSONPlaceholder</a>.
      </p>

      <!-- GET POSTS -->
      <div class="js-section-title">1. GET — cargar posts</div>
      <div class="js-controls">
        <ion-button size="small" color="primary" id="btn-get-posts">
          <ion-icon slot="start" name="cloud-download-outline"></ion-icon>
          Cargar 5 posts
        </ion-button>
        <ion-button size="small" color="secondary" id="btn-get-user">
          Cargar usuario #1
        </ion-button>
      </div>
      <div id="fetch-out" class="js-output" style="min-height:60px;">
        Pulsa un botón para hacer una petición real.
      </div>

      <!-- GET CON ERROR -->
      <div class="js-section-title">2. Manejo de errores HTTP</div>
      <p style="font-size:14px;margin-bottom:8px;">
        <code>fetch()</code> <strong>NO</strong> rechaza la Promise por errores HTTP (404, 500…).
        Hay que comprobar <code>response.ok</code> manualmente.
      </p>
      <div class="js-controls">
        <ion-button size="small" color="danger" id="btn-404">Simular 404 (recurso inexistente)</ion-button>
        <ion-button size="small" color="warning" id="btn-network-err">Simular error de red</ion-button>
      </div>
      <div id="error-out" class="js-output" style="min-height:40px;"></div>

      <!-- CÓDIGO PATRÓN -->
      <div class="js-section-title">Patrón robusto para fetch</div>
      <pre class="js-code-panel">async function getData(url) {
  try {
    const response = await fetch(url);

    // fetch() NO lanza error por 4xx/5xx — debemos comprobarlo
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json(); // parsear JSON
    return data;

  } catch (err) {
    if (err instanceof TypeError) {
      // Error de red (sin conexión, CORS, URL inválida…)
      console.error('Error de red:', err.message);
    } else {
      // Error HTTP u otro
      console.error('Error en la petición:', err.message);
    }
    throw err; // re-lanzar para que el caller también pueda manejarlo
  }
}</pre>

      <!-- POST -->
      <div class="js-section-title">3. POST — enviar datos</div>
      <pre class="js-code-panel">// POST con fetch
const nuevoPost = { title: 'Hola', body: 'Texto', userId: 1 };

const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(nuevoPost),
});

const creado = await response.json();
console.log(creado); // { id: 101, title: 'Hola', body: 'Texto', userId: 1 }
// JSONPlaceholder simula la creación pero no persiste datos realmente</pre>
      <div class="js-controls">
        <ion-button size="small" color="success" id="btn-post">Simular POST</ion-button>
      </div>
      <div id="post-out" class="js-output" style="min-height:40px;"></div>
    </section>
  `;
}

export function init(root) {
  const fetchOut = root.querySelector('#fetch-out');
  const errorOut = root.querySelector('#error-out');
  const postOut  = root.querySelector('#post-out');

  function loading(el) {
    el.innerHTML = '<span style="color:var(--ion-color-medium)">⏳ Cargando…</span>';
  }

  // GET posts
  root.querySelector('#btn-get-posts').addEventListener('click', async () => {
    loading(fetchOut);
    try {
      const res = await fetch(`${BASE_URL}/posts?_limit=5`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const posts = await res.json();
      fetchOut.innerHTML = `✅ <strong>${posts.length} posts recibidos</strong> (${res.status} OK)<br>` +
        posts.map(p => `<div style="margin:4px 0;font-size:13px;">
          <strong>#${p.id}</strong>: ${p.title.slice(0, 50)}…
        </div>`).join('');
    } catch (err) {
      fetchOut.innerHTML = `❌ Error: ${err.message}`;
    }
  });

  // GET usuario
  root.querySelector('#btn-get-user').addEventListener('click', async () => {
    loading(fetchOut);
    try {
      const res = await fetch(`${BASE_URL}/users/1`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const u = await res.json();
      fetchOut.innerHTML = `✅ <strong>Usuario recibido</strong><br>
        <code>{ name: "${u.name}", email: "${u.email}", city: "${u.address.city}" }</code>`;
    } catch (err) {
      fetchOut.innerHTML = `❌ Error: ${err.message}`;
    }
  });

  // 404
  root.querySelector('#btn-404').addEventListener('click', async () => {
    loading(errorOut);
    try {
      const res = await fetch(`${BASE_URL}/posts/9999`);
      // JSONPlaceholder devuelve {} para ids que no existen, status 200
      // Simulamos una comprobación de body vacío
      const data = await res.json();
      const esVacio = Object.keys(data).length === 0;
      if (esVacio) throw new Error('Recurso no encontrado (body vacío)');
      errorOut.innerHTML = `✅ Datos: ${JSON.stringify(data)}`;
    } catch (err) {
      errorOut.innerHTML = `❌ <strong>Error detectado</strong>: "${err.message}"
        <br><small>⚠️ Importante: fetch() NO rechaza por 404.
        Debes comprobar <code>response.ok</code> o el contenido de la respuesta.</small>`;
    }
  });

  // Error de red simulado
  root.querySelector('#btn-network-err').addEventListener('click', async () => {
    loading(errorOut);
    try {
      // URL inválida → TypeError (error de red)
      await fetch('https://esta-url-no-existe-curso-js.invalid/api');
    } catch (err) {
      errorOut.innerHTML = `❌ <strong>TypeError (error de red)</strong>: "${err.message}"
        <br><small>Los errores de red (sin conexión, CORS, URL inválida) SÍ lanzan un TypeError.
        Estos son los únicos casos en que fetch() rechaza la Promise.</small>`;
    }
  });

  // POST
  root.querySelector('#btn-post').addEventListener('click', async () => {
    loading(postOut);
    try {
      const nuevoPost = { title: 'Mi post del curso', body: 'Aprendiendo Fetch API', userId: 1 };
      const res = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoPost),
      });
      const creado = await res.json();
      postOut.innerHTML = `✅ <strong>POST ${res.status} Created</strong><br>
        Servidor respondió con id asignado: <code>{ id: ${creado.id}, title: "${creado.title}" }</code>
        <br><small>JSONPlaceholder simula la creación (el id asignado es siempre 101).</small>`;
    } catch (err) {
      postOut.innerHTML = `❌ ${err.message}`;
    }
  });
}
