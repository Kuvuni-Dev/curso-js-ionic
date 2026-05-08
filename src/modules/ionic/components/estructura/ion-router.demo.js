/**
 * @file ion-router.demo.js
 * @description Demo didáctico de ion-router e ion-router-outlet.
 *
 * ion-router es el router declarativo oficial de Ionic para apps sin framework
 * (vanilla) o con Stencil. Define las rutas mediante etiquetas HTML.
 *
 * ion-router-outlet es el punto del DOM donde el router inyecta la página
 * activa. Solo debe haber uno por app.
 *
 * ⚠️ NOTA IMPORTANTE:
 * ion-router está pensado para el modelo de componentes de Stencil/Angular.
 * En apps Ionic + Angular se usa el Router de Angular directamente.
 * En apps Ionic vanilla (como este proyecto) es habitual implementar un
 * router propio basado en hashchange (como hacemos en src/app/router.js).
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/router
 * https://ionicframework.com/docs/api/router-outlet
 */

const CODE_ROUTER = `<!-- ion-router define las rutas de forma declarativa -->
<ion-app>

  <ion-router use-hash="true">

    <!-- Ruta raíz → carga el componente app-home -->
    <ion-route url="/" component="app-home"></ion-route>

    <!-- Ruta con parámetro dinámico (:id) -->
    <ion-route url="/detalle/:id" component="app-detalle"></ion-route>

    <!-- Redirección -->
    <ion-route-redirect from="/" to="/home"></ion-route-redirect>

    <!-- Rutas anidadas (tabs) -->
    <ion-route url="/tabs" component="app-tabs">
      <ion-route url="/inicio"  component="tab-inicio"></ion-route>
      <ion-route url="/perfil" component="tab-perfil"></ion-route>
    </ion-route>

  </ion-router>

  <!-- Aquí se renderiza la página activa -->
  <ion-router-outlet></ion-router-outlet>

</ion-app>`;

const CODE_JS = `// Navegación programática desde JavaScript
const router = document.querySelector('ion-router');

// Navegar a una ruta
router.push('/detalle/42');

// Navegar hacia atrás
router.back();

// Escuchar cambios de ruta
router.addEventListener('ionRouteWillChange', (e) => {
  console.log('De:', e.detail.from);
  console.log('A:', e.detail.to);
});

router.addEventListener('ionRouteDidChange', (e) => {
  console.log('Navegación completada:', e.detail.to);
});`;

const CODE_VANILLA_ROUTER = `/**
 * En Ionic vanilla (sin Stencil/Angular), el patrón más común
 * es implementar un router propio con hashchange.
 *
 * Así funciona el router de ESTE proyecto (src/app/router.js):
 */

// Leer la ruta del hash: #/ionic/ion-button → { view: 'ionic', param: 'ion-button' }
function getRoute() {
  const hash = location.hash.replace('#/', '') || 'home';
  const [view, param] = hash.split('/');
  return { view, param };
}

// Al cambiar el hash, renderizar la vista correspondiente
window.addEventListener('hashchange', () => {
  const { view, param } = getRoute();
  const renderer = routes[view] || renderNotFound;
  renderer(param);
});

// Navegar cambiando el hash
function navigateTo(view, param) {
  location.hash = param ? \`#/\${view}/\${param}\` : \`#/\${view}\`;
}`;

/**
 * @returns {string}
 */
export function render() {
  return `
    <section class="demo-page">

      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-router · ion-router-outlet</h2>
        <p class="demo-desc">
          Router declarativo de Ionic para apps vanilla y Stencil.
          Define rutas como etiquetas HTML y renderiza la página activa
          en <code>ion-router-outlet</code>.
        </p>
      </div>

      <!-- ── GRUPO: Comparativa de enfoques ─────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">¿Qué router usar según el proyecto?</h3>
        <ion-list inset="true">
          <ion-item>
            <ion-icon slot="start" name="code-slash-outline" color="warning"></ion-icon>
            <ion-label>
              <h3>Ionic + Angular</h3>
              <p>Router de Angular (<code>RouterModule</code>). ion-router-outlet sí se usa.</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" name="logo-react" color="primary"></ion-icon>
            <ion-label>
              <h3>Ionic + React</h3>
              <p>React Router con <code>IonReactRouter</code>.</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" name="logo-vue" color="success"></ion-icon>
            <ion-label>
              <h3>Ionic + Vue</h3>
              <p>Vue Router con <code>IonRouterOutlet</code>.</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" name="globe-outline" color="tertiary"></ion-icon>
            <ion-label>
              <h3>Ionic vanilla (este proyecto)</h3>
              <p>Router propio basado en <code>hashchange</code>. Simple y sin dependencias.</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>

      <!-- ── GRUPO: Sintaxis declarativa ───────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Sintaxis declarativa (ion-router)</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_ROUTER)}</code></pre>
      </div>

      <!-- ── GRUPO: Navegación programática ────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Navegación programática</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_JS)}</code></pre>
      </div>

      <!-- ── GRUPO: Router vanilla ──────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Router hash propio (este proyecto)</h3>
        <p class="demo-group-desc">
          Para Ionic CDN sin framework, el patrón más sencillo es escuchar
          el evento <code>hashchange</code> y renderizar vistas manualmente.
          Es exactamente lo que hace <code>src/app/router.js</code>.
        </p>
        <pre class="demo-code"><code>${escapeHtml(CODE_VANILLA_ROUTER)}</code></pre>
      </div>

    </section>
  `;
}

/** @param {HTMLElement} _container */
export function init(_container) {}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
