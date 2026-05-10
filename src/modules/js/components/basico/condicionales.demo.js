/**
 * @file condicionales.demo.js
 * @description Demo interactivo: if/else y operador ternario.
 */

function evaluarNota(nota) {
  if (nota >= 9) return 'Excelente';
  if (nota >= 5) return 'Aprobado';
  return 'Suspenso';
}

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Condicionales</h2>
      <p class="js-subtitle">
        Transforma reglas de negocio en decisiones usando <code>if / else</code>
        y el operador ternario para casos simples.
      </p>

      <div class="js-section-title">Laboratorio interactivo</div>
      <ion-item>
        <ion-label position="stacked">Nota (0-10)</ion-label>
        <ion-input id="cond-nota" type="number" value="8"></ion-input>
      </ion-item>

      <ion-button expand="block" id="cond-if">Evaluar con if/else</ion-button>
      <ion-button expand="block" fill="outline" id="cond-ternario">Evaluar con ternario</ion-button>

      <div id="condicionales-output" class="js-output" style="min-height:70px;">Pulsa un método para evaluar la nota.</div>

      <div class="js-section-title">Fragmento base</div>
      <pre class="js-code-panel">if (nota >= 9) {
  return 'Excelente';
} else if (nota >= 5) {
  return 'Aprobado';
} else {
  return 'Suspenso';
}

const estado = nota >= 5 ? 'Aprobado' : 'Suspenso';</pre>
    </section>
  `;
}

export function init(root) {
  const out = root.querySelector('#condicionales-output');
  const getNota = () => Number(root.querySelector('#cond-nota').value);

  root.querySelector('#cond-if').addEventListener('click', () => {
    const nota = getNota();
    out.innerHTML = `if/else -> <strong>${evaluarNota(nota)}</strong>`;
  });

  root.querySelector('#cond-ternario').addEventListener('click', () => {
    const nota = getNota();
    const res = nota >= 5 ? 'Aprobado' : 'Suspenso';
    out.innerHTML = `ternario -> <strong>${res}</strong>`;
  });
}
