/**
 * @file strings-template-literals.demo.js
 * @description Demo interactivo: Strings y template literals.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Strings y template literals</h2>
      <p class="js-subtitle">
        Compara concatenación tradicional y template literals para crear mensajes
        más claros y fáciles de mantener.
      </p>

      <div class="js-section-title">Laboratorio interactivo</div>

      <ion-item>
        <ion-label position="stacked">Nombre</ion-label>
        <ion-input id="str-name" value="Maria"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Curso</ion-label>
        <ion-input id="str-course" value="JavaScript"></ion-input>
      </ion-item>

      <ion-button expand="block" id="str-run">Generar mensajes</ion-button>
      <div id="strings-output" class="js-output" style="min-height:70px;">Completa los campos y genera mensajes.</div>

      <div class="js-section-title">Fragmento base</div>
      <pre class="js-code-panel">const nombre = 'Maria';
const curso = 'JavaScript';

const concat = 'Hola ' + nombre + ', bienvenida a ' + curso;
const template = `Hola ${nombre}, bienvenida a ${curso}`;</pre>
    </section>
  `;
}

export function init(root) {
  const out = root.querySelector('#strings-output');

  root.querySelector('#str-run').addEventListener('click', () => {
    const nombre = root.querySelector('#str-name').value;
    const curso = root.querySelector('#str-course').value;
    const concat = 'Hola ' + nombre + ', bienvenida a ' + curso;
    const template = `Hola ${nombre}, bienvenida a ${curso}`;

    out.innerHTML = `
      Concatenación: <strong>${concat}</strong><br>
      Template literal: <strong>${template}</strong>
    `;
  });
}
