/**
 * @file ion-radio.demo.js
 * @description Demo didáctico de <ion-radio> e <ion-radio-group> de Ionic.
 *
 * ion-radio se usa SIEMPRE dentro de ion-radio-group, que gestiona la
 * selección exclusiva. Solo puede haber un radio seleccionado a la vez.
 * ion-radio-group emite ionChange con e.detail.value al cambiar.
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/radio
 * https://ionicframework.com/docs/api/radio-group
 */

const CODE_EXAMPLE = `<!-- ion-radio-group con ion-radio -->
<ion-radio-group value="standard">

  <ion-list-header>
    <ion-label>Método de envío</ion-label>
  </ion-list-header>

  <ion-item>
    <ion-radio slot="start" value="standard"></ion-radio>
    <ion-label>Estándar (5-7 días)</ion-label>
  </ion-item>

  <ion-item>
    <ion-radio slot="start" value="express"></ion-radio>
    <ion-label>Express (1-2 días)</ion-label>
  </ion-item>

  <ion-item>
    <ion-radio slot="start" value="same-day"></ion-radio>
    <ion-label>Same-day</ion-label>
  </ion-item>

</ion-radio-group>

<script>
  const group = document.querySelector('ion-radio-group');

  // ionChange se dispara cuando cambia la selección del grupo
  group.addEventListener('ionChange', (e) => {
    console.log('Seleccionado:', e.detail.value); // 'standard' | 'express' | ...
  });
</script>`;

/**
 * Crea un grupo de radio buttons simulados con HTML nativo.
 */
function radioGroup(name, options, defaultValue) {
  return options.map(opt => `
    <label class="demo-rb-item${opt.disabled ? ' demo-rb-item--disabled' : ''}" for="${name}-${opt.value}">
      <input type="radio" class="demo-rb-input" name="${name}" id="${name}-${opt.value}"
             value="${opt.value}" ${opt.value === defaultValue ? 'checked' : ''}
             ${opt.disabled ? 'disabled' : ''}>
      <span class="demo-rb-dot${opt.color ? ' demo-rb-dot--' + opt.color : ''}">
        <span class="demo-rb-inner"></span>
      </span>
      <span class="demo-rb-label">
        ${opt.label}
        ${opt.desc ? `<small>${opt.desc}</small>` : ''}
      </span>
    </label>`).join('');
}

export function render() {
  const shippingOptions = [
    { value: 'standard', label: 'Estándar', desc: '5-7 días hábiles · Gratis' },
    { value: 'express',  label: 'Express',  desc: '1-2 días hábiles · €4.99' },
    { value: 'sameday',  label: 'Same-day', desc: 'Hoy antes de las 22:00 · €9.99' },
  ];
  const planOptions = [
    { value: 'free',    label: 'Free',    desc: 'Hasta 3 proyectos' },
    { value: 'pro',     label: 'Pro',     desc: 'Proyectos ilimitados', color: 'primary' },
    { value: 'team',    label: 'Team',    desc: 'Facturación por equipo', color: 'secondary' },
    { value: 'legacy',  label: 'Legacy',  desc: 'Plan retirado', disabled: true },
  ];
  const colorOptions = [
    { value: 'primary',   label: 'Primary (defecto)', color: 'primary' },
    { value: 'secondary', label: 'Secondary',          color: 'secondary' },
    { value: 'success',   label: 'Success',            color: 'success' },
    { value: 'danger',    label: 'Danger',             color: 'danger' },
    { value: 'warning',   label: 'Warning',            color: 'warning' },
  ];

  return `
    <section class="demo-page">

      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-radio / ion-radio-group</h2>
        <p class="demo-desc">
          <code>ion-radio</code> permite selección exclusiva dentro de un
          <code>ion-radio-group</code>. Solo un radio puede estar activo a la vez.
          El grupo emite <code>ionChange</code> con <code>e.detail.value</code>.
        </p>
      </div>

      <!-- ── GRUPO: Método de envío ─────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Ejemplo: Método de envío</h3>
        <div class="demo-rb-group" id="group-shipping">
          ${radioGroup('shipping', shippingOptions, 'standard')}
        </div>
        <p class="demo-rb-status">
          Seleccionado: <ion-badge color="primary" id="shipping-val">standard</ion-badge>
        </p>
      </div>

      <!-- ── GRUPO: Plan de suscripción ─────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Ejemplo: Plan de suscripción (con colores)</h3>
        <div class="demo-rb-group" id="group-plan">
          ${radioGroup('plan', planOptions, 'pro')}
        </div>
        <p class="demo-rb-status">
          Plan elegido: <ion-badge color="secondary" id="plan-val">pro</ion-badge>
        </p>
      </div>

      <!-- ── GRUPO: Colores ─────────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Atributo <code>color</code></h3>
        <div class="demo-rb-group" id="group-colors">
          ${radioGroup('colors', colorOptions, 'primary')}
        </div>
      </div>

      <!-- ── GRUPO: Atributos clave ─────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Atributos clave</h3>
        <div class="demo-attr-table">
          <div class="demo-attr-row">
            <code>value</code>
            <span>Valor del radio. El grupo utiliza este valor para identificar la opción activa.</span>
          </div>
          <div class="demo-attr-row">
            <code>ion-radio-group[value]</code>
            <span>Valor seleccionado inicial. Debe coincidir con el <code>value</code> de un radio.</span>
          </div>
          <div class="demo-attr-row">
            <code>ionChange</code>
            <span>Emitido por el <strong>grupo</strong>. <code>e.detail.value</code> es el valor nuevo.</span>
          </div>
          <div class="demo-attr-row">
            <code>color</code>
            <span>Aplica al radio individual: primary · secondary · success · danger · warning</span>
          </div>
          <div class="demo-attr-row">
            <code>disabled</code>
            <span>Deshabilita un radio individual o todo el grupo si se aplica al <code>ion-radio-group</code>.</span>
          </div>
        </div>
      </div>

      <!-- ── CÓDIGO ─────────────────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Código de ejemplo</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_EXAMPLE)}</code></pre>
      </div>

    </section>
  `;
}

export function init(container) {
  // Grupo: envío
  container.querySelectorAll('[name="shipping"]').forEach(rb => {
    rb.addEventListener('change', (e) => {
      container.querySelector('#shipping-val').textContent = e.target.value;
    });
  });

  // Grupo: plan
  container.querySelectorAll('[name="plan"]').forEach(rb => {
    rb.addEventListener('change', (e) => {
      container.querySelector('#plan-val').textContent = e.target.value;
    });
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
