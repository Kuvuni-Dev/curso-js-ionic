/**
 * @file funciones-basicas.demo.js
 * @description Demo interactivo: Funciones básicas y parámetros por defecto.
 */

function saludar(nombre, rol = 'alumno') {
  return `Hola, ${nombre}. Rol: ${rol}.`;
}

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Funciones básicas</h2>
      <p class="js-subtitle">
        Aprende a encapsular lógica en funciones reutilizables y a definir
        parámetros por defecto para evitar valores vacíos.
      </p>

      <div class="js-section-title">Laboratorio interactivo</div>
      <ion-item>
        <ion-label position="stacked">Nombre</ion-label>
        <ion-input id="fn-nombre" value="Lucia"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Rol (opcional)</ion-label>
        <ion-input id="fn-rol" value=""></ion-input>
      </ion-item>

      <ion-button expand="block" id="fn-run">Ejecutar función</ion-button>
      <div id="funciones-output" class="js-output" style="min-height:70px;">Pulsa Ejecutar función para ver el resultado.</div>

      <div class="js-section-title">Fragmento base</div>
      <pre class="js-code-panel">function saludar(nombre, rol = 'alumno') {
  return `Hola, ${nombre}. Rol: ${rol}.`;
}

saludar('Lucia');
saludar('Carlos', 'profesor');</pre>
    </section>
  `;
}

export function init(root) {
  const out = root.querySelector('#funciones-output');

  root.querySelector('#fn-run').addEventListener('click', () => {
    const nombre = root.querySelector('#fn-nombre').value || 'Invitado';
    const rol = root.querySelector('#fn-rol').value;
    const mensaje = rol ? saludar(nombre, rol) : saludar(nombre);

    out.innerHTML = `
      <pre class="js-code-panel">function saludar(nombre, rol = 'alumno') {
  return \`Hola, \${nombre}. Rol: \${rol}.\`;
}</pre>
      <strong>Salida:</strong> ${mensaje}
    `;
  });
}
