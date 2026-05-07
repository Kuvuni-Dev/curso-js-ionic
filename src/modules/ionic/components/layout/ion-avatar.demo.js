/**
 * @file ion-avatar.demo.js
 * @description Demo didáctico de ion-avatar, ion-thumbnail e ion-img.
 *
 * Estos tres componentes muestran imágenes con estilos específicos:
 *  - ion-avatar:    imagen circular (perfil de usuario)
 *  - ion-thumbnail: imagen cuadrada con bordes redondeados (miniatura)
 *  - ion-img:       imagen estándar con lazy loading gestionado por Ionic
 *
 * Documentación oficial:
 *  https://ionicframework.com/docs/api/avatar
 *  https://ionicframework.com/docs/api/thumbnail
 *  https://ionicframework.com/docs/api/img
 */

// NOTA CDN: ion-avatar, ion-thumbnail e ion-img cargan chunks adicionales.
// Los previews usan divs/img con CSS equivalente; el código real va en bloques pre.

const CODE_AVATAR = `<!-- ion-avatar: imagen circular -->
<ion-avatar>
  <img src="https://i.pravatar.cc/100?u=1" alt="Ana García" />
</ion-avatar>

<!-- Dentro de un ion-item (muy habitual en listas de contactos) -->
<ion-item>
  <ion-avatar slot="start">
    <img src="avatar.jpg" alt="Ana García" />
  </ion-avatar>
  <ion-label>
    <h3>Ana García</h3>
    <p>Desarrolladora Front-end</p>
  </ion-label>
</ion-item>

<!-- Tamaño: se controla con CSS -->
<ion-avatar style="width: 64px; height: 64px;">
  <img src="avatar.jpg" alt="..." />
</ion-avatar>`;

const CODE_THUMBNAIL = `<!-- ion-thumbnail: miniatura cuadrada con bordes redondeados -->
<ion-thumbnail>
  <img src="foto.jpg" alt="Foto de montaña" />
</ion-thumbnail>

<!-- Dentro de un ion-item (listas de archivos, fotos, productos) -->
<ion-item>
  <ion-thumbnail slot="start">
    <img src="producto.jpg" alt="Camiseta azul" />
  </ion-thumbnail>
  <ion-label>
    <h3>Camiseta azul</h3>
    <p>Talla M · 29,99 €</p>
  </ion-label>
</ion-item>`;

const CODE_IMG = `<!-- ion-img: imagen con lazy loading gestionado por Ionic -->
<!--
  A diferencia del <img> nativo, ion-img:
  - Carga la imagen solo cuando está en el viewport (lazy loading)
  - Emite ionImgDidLoad cuando termina de cargar
  - Emite ionError si falla la carga
-->
<ion-img src="foto.jpg" alt="Descripción"></ion-img>

<!-- Escuchar eventos -->
<script>
  const img = document.querySelector('ion-img');

  img.addEventListener('ionImgDidLoad', () => {
    console.log('Imagen cargada');
  });

  img.addEventListener('ionError', () => {
    console.log('Error al cargar la imagen');
    img.src = 'placeholder.jpg'; // imagen de fallback
  });
</script>`;

const CODE_CSS_AVATAR = `/* Personalizar el tamaño con CSS */
ion-avatar {
  width:  56px;
  height: 56px;
}

ion-thumbnail {
  --size:         80px;   /* variable CSS de Ionic */
  --border-radius: 8px;   /* esquinas personalizadas */
}

/* Indicador de estado "online" sobre el avatar */
.avatar-wrapper {
  position: relative;
  display: inline-block;
}

.avatar-status {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: var(--ion-color-success);
  border-radius: 50%;
  border: 2px solid var(--ion-background-color);
}`;

// ─── render() ───────────────────────────────────────────────────────────────
export function render() {
  // Avatares simulados con iniciales y colores
  const avatarData = [
    { initials: 'AG', color: '#4c8dff', name: 'Ana García',     role: 'Front-end',   online: true  },
    { initials: 'MC', color: '#2fdf75', name: 'Mario Castro',   role: 'Back-end',    online: true  },
    { initials: 'LR', color: '#ff4961', name: 'Laura Ruiz',     role: 'UX Design',   online: false },
    { initials: 'JM', color: '#ffd534', name: 'Jorge Molina',   role: 'DevOps',      online: true  },
    { initials: 'SV', color: '#7c5cfc', name: 'Sara Vázquez',   role: 'iOS Dev',     online: false },
  ];

  const contactosHtml = avatarData.map(({ initials, color, name, role, online }) => `
    <div class="demo-contact-item">
      <div class="demo-avatar-wrap">
        <div class="demo-avatar" style="background:${color};">${initials}</div>
        <span class="demo-avatar-status ${online ? 'demo-avatar-status--online' : ''}"></span>
      </div>
      <div class="demo-contact-info">
        <strong>${name}</strong>
        <small>${role}</small>
      </div>
    </div>
  `).join('');

  // Thumbnails simulados (productos)
  const productos = [
    { color: '#4c8dff', emoji: '👕', name: 'Camiseta azul',   price: '29,99 €' },
    { color: '#2fdf75', emoji: '👟', name: 'Zapatillas',      price: '89,99 €' },
    { color: '#ff4961', emoji: '🎒', name: 'Mochila roja',    price: '49,99 €' },
    { color: '#ffd534', emoji: '⌚', name: 'Reloj dorado',    price: '149 €'   },
  ];

  const productosHtml = productos.map(({ color, emoji, name, price }) => `
    <div class="demo-thumbnail-item">
      <div class="demo-thumbnail" style="background:${color};">
        <span style="font-size:1.8rem;">${emoji}</span>
      </div>
      <div class="demo-thumbnail-info">
        <strong>${name}</strong>
        <small>${price}</small>
      </div>
    </div>
  `).join('');

  return `
    <section class="demo-page">

      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-avatar · ion-thumbnail · ion-img</h2>
        <p class="demo-desc">
          Tres componentes para mostrar imágenes con estilos predefinidos:
          circular (avatar), cuadrado (thumbnail) o con lazy loading (img).
          Se usan habitualmente dentro de <code>ion-item</code>.
        </p>
      </div>

      <!-- ── GRUPO: ion-avatar ──────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">ion-avatar</h3>
        <p class="demo-group-desc">
          Imagen circular para perfiles de usuario. El tamaño por defecto
          es 40×40 px y se controla con CSS.
        </p>

        <!-- Tamaños -->
        <div class="demo-row demo-row--align-center" style="gap:16px;margin-bottom:12px;">
          ${[28, 40, 56, 72, 90].map((s, i) => {
            const colors = ['#4c8dff','#2fdf75','#ff4961','#ffd534','#7c5cfc'];
            const initials = ['XS','SM','MD','LG','XL'];
            return `
              <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
                <div class="demo-avatar" style="width:${s}px;height:${s}px;font-size:${s*0.3}px;background:${colors[i]};">
                  ${initials[i]}
                </div>
                <small style="font-size:0.7rem;opacity:0.6;">${s}px</small>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Lista de contactos -->
        <div class="demo-contact-list">
          ${contactosHtml}
        </div>

        <pre class="demo-code" style="margin-top:12px;"><code>${escapeHtml(CODE_AVATAR)}</code></pre>
      </div>

      <!-- ── GRUPO: ion-thumbnail ───────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">ion-thumbnail</h3>
        <p class="demo-group-desc">
          Imagen cuadrada con bordes ligeramente redondeados. Ideal para
          listas de productos, archivos o galería.
        </p>

        <div class="demo-product-list">
          ${productosHtml}
        </div>

        <pre class="demo-code" style="margin-top:12px;"><code>${escapeHtml(CODE_THUMBNAIL)}</code></pre>
      </div>

      <!-- ── GRUPO: ion-img ─────────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">ion-img (lazy loading)</h3>
        <p class="demo-group-desc">
          <code>ion-img</code> pospone la carga de la imagen hasta que entra
          en el viewport, mejorando el rendimiento en listas largas.
        </p>
        <ion-list inset="true">
          <ion-item>
            <ion-icon slot="start" name="flash-outline" color="success"></ion-icon>
            <ion-label>
              <h3>Lazy loading automático</h3>
              <p>Solo carga la imagen cuando el usuario la ve. Vital en listas largas.</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" name="alert-circle-outline" color="warning"></ion-icon>
            <ion-label>
              <h3>ionError: imagen de fallback</h3>
              <p>Emite <code>ionError</code> si la URL falla, para mostrar un placeholder.</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" name="checkmark-circle-outline" color="primary"></ion-icon>
            <ion-label>
              <h3>ionImgDidLoad: saber cuándo cargó</h3>
              <p>Útil para animaciones de entrada o para medir tiempos de carga.</p>
            </ion-label>
          </ion-item>
        </ion-list>
        <pre class="demo-code" style="margin-top:12px;"><code>${escapeHtml(CODE_IMG)}</code></pre>
      </div>

      <!-- ── GRUPO: CSS personalizado ──────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Personalización con CSS</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_CSS_AVATAR)}</code></pre>
      </div>

    </section>
  `;
}

// ─── init() ─────────────────────────────────────────────────────────────────
export function init(_container) {}

// ─── Utilidad interna ────────────────────────────────────────────────────────
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
