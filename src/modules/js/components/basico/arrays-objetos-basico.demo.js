/**
 * @file arrays-objetos-basico.demo.js
 * @description Demo interactivo: Arrays y objetos en nivel básico.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Arrays y objetos (básico)</h2>
      <p class="js-subtitle">
        Trabaja con las dos estructuras más usadas en JavaScript: arrays para listas
        y objetos para datos con propiedades.
      </p>

      <div class="js-section-title">Laboratorio interactivo</div>

      <ion-button expand="block" id="arr-run">Operar array</ion-button>
      <ion-button expand="block" fill="outline" id="obj-run">Mostrar objeto</ion-button>

      <div id="arrays-objetos-output" class="js-output" style="min-height:70px;">Pulsa un botón para ejecutar un ejemplo.</div>

      <div class="js-section-title">Fragmento base</div>
      <pre class="js-code-panel">const alumnos = ['Ana', 'Luis', 'Marta'];
alumnos.push('Pablo');
alumnos.pop();
alumnos.includes('Ana');

const curso = {
  nombre: 'JavaScript',
  nivel: 'Básico',
  horas: 30
};</pre>
    </section>
  `;
}

export function init(root) {
  const out = root.querySelector('#arrays-objetos-output');

  root.querySelector('#arr-run').addEventListener('click', () => {
    const alumnos = ['Ana', 'Luis', 'Marta'];
    alumnos.push('Pablo');
    const eliminado = alumnos.pop();
    const incluyeAna = alumnos.includes('Ana');

    out.innerHTML = `
      <strong>Array:</strong> [${alumnos.join(', ')}]<br>
      eliminado con pop(): ${eliminado}<br>
      includes('Ana'): ${incluyeAna}
    `;
  });

  root.querySelector('#obj-run').addEventListener('click', () => {
    const curso = { nombre: 'JavaScript', nivel: 'Básico', horas: 30 };
    out.innerHTML = `<pre class="js-code-panel">${JSON.stringify(curso, null, 2)}</pre>`;
  });
}
