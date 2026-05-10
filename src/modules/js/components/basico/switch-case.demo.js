/**
 * @file switch-case.demo.js
 * @description Demo interactivo: switch case en JavaScript básico.
 */

function evaluarDia(dia) {
  switch (dia) {
    case 'lunes':
      return 'Inicio de semana: organiza tareas clave.';
    case 'martes':
      return 'Buen día para avanzar en práctica.';
    case 'miercoles':
      return 'Mitad de semana: revisa progreso.';
    case 'jueves':
      return 'Refuerza conceptos con ejercicios.';
    case 'viernes':
      return 'Cierra pendientes y documenta aprendizajes.';
    case 'sabado':
    case 'domingo':
      return 'Fin de semana: repaso ligero y descanso.';
    default:
      return 'Día no reconocido.';
  }
}

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>switch case</h2>
      <p class="js-subtitle">
        Usa <code>switch</code> para evaluar múltiples casos de forma más clara que una cadena
        extensa de <code>if / else if</code> cuando comparas un mismo valor.
      </p>

      <div class="js-section-title">Laboratorio interactivo</div>
      <ion-item>
        <ion-label position="stacked">Selecciona un día</ion-label>
        <ion-select id="sw-day" value="lunes" interface="popover">
          <ion-select-option value="lunes">Lunes</ion-select-option>
          <ion-select-option value="martes">Martes</ion-select-option>
          <ion-select-option value="miercoles">Miércoles</ion-select-option>
          <ion-select-option value="jueves">Jueves</ion-select-option>
          <ion-select-option value="viernes">Viernes</ion-select-option>
          <ion-select-option value="sabado">Sábado</ion-select-option>
          <ion-select-option value="domingo">Domingo</ion-select-option>
        </ion-select>
      </ion-item>

      <div class="js-controls">
        <ion-button size="small" color="primary" id="sw-run">Evaluar con switch</ion-button>
        <ion-button size="small" color="medium" id="sw-default">Probar default</ion-button>
      </div>

      <div id="switch-output" class="js-output" style="min-height:70px;">Selecciona un valor y pulsa un botón.</div>

      <div class="js-section-title">Fragmento base</div>
      <pre class="js-code-panel">switch (dia) {
  case 'lunes':
    return 'Inicio de semana';
  case 'martes':
    return 'Buen día para avanzar';
  case 'miercoles':
    return 'Mitad de semana';
  case 'sabado':
  case 'domingo':
    return 'Fin de semana';
  default:
    return 'Día no reconocido';
}</pre>
    </section>
  `;
}

export function init(root) {
  const out = root.querySelector('#switch-output');

  root.querySelector('#sw-run').addEventListener('click', () => {
    const dia = root.querySelector('#sw-day').value;
    const resultado = evaluarDia(dia);

    out.innerHTML = `
      <code>dia = '${dia}'</code><br>
      <strong>Resultado:</strong> ${resultado}
      <br><small>Tip: switch compara por igualdad estricta (<code>===</code>).</small>
    `;
  });

  root.querySelector('#sw-default').addEventListener('click', () => {
    const resultado = evaluarDia('feriado');
    out.innerHTML = `
      <code>dia = 'feriado'</code><br>
      <strong>Resultado:</strong> ${resultado}
      <br><small>El bloque <code>default</code> cubre valores no contemplados en los <code>case</code>.</small>
    `;
  });
}
