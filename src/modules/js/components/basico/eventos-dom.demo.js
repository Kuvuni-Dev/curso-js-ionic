/**
 * @file eventos-dom.demo.js
 * @description Demo interactivo: responder a eventos del usuario (click, input, change, submit).
 */

// Utilidad: Consola simulada
class SimulatedConsole {
  constructor() { this.logs = []; }
  log(...args) { this.logs.push({ type: 'log', message: args.map(a => String(a)).join(' ') }); }
  warn(...args) { this.logs.push({ type: 'warn', message: args.map(a => String(a)).join(' ') }); }
  error(...args) { this.logs.push({ type: 'error', message: args.map(a => String(a)).join(' ') }); }
  clear() { this.logs = []; }
  render() { return this.logs.slice(-8).map(l => `<span style="color: ${l.type === 'error' ? '#d32f2f' : l.type === 'warn' ? '#f57c00' : '#1976d2'}">${l.type === 'error' ? '❌' : l.type === 'warn' ? '⚠️' : '✓'} ${l.message}</span>`).join('<br>'); }
}

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Eventos del DOM</h2>
      <p class="js-subtitle">
        Los <strong>eventos</strong> son acciones del usuario (clicks, escritura, cambios, etc.).
        Con <code>addEventListener()</code>, JavaScript puede reaccionar a esas acciones en tiempo real.
      </p>

      <!-- LABORATORIO INTERACTIVO -->
      <div class="js-section-title">Laboratorio: Maneja eventos</div>

      <!-- ESCENARIO 1: CLICK -->
      <div class="js-section-title">Escenario 1: Evento click</div>
      <ion-button expand="block" size="small" color="primary" id="evt-btn-click">
        Haz clic aquí 🖱️
      </ion-button>

      <!-- ESCENARIO 2: INPUT (escritura en tiempo real) -->
      <div class="js-section-title">Escenario 2: Evento input (escritura en vivo)</div>
      <ion-item>
        <ion-label position="stacked">Escribe tu nombre:</ion-label>
        <ion-input id="evt-input-nombre" placeholder="Escribe mientras ves cambios..."></ion-input>
      </ion-item>
      <div id="evt-output-nombre" style="
        padding: 12px;
        background: #f5f5f5;
        border-radius: 4px;
        margin-top: 8px;
        text-align: center;
      ">
        👋 Saludo aquí...
      </div>

      <!-- ESCENARIO 3: CHANGE (cuando el usuario "termina" -->
      <div class="js-section-title">Escenario 3: Evento change (selector/select)</div>
      <ion-item>
        <ion-label>Elige un sabor:</ion-label>
        <ion-select id="evt-select-sabor" placeholder="Elige sabor">
          <ion-select-option value="fresa">🍓 Fresa</ion-select-option>
          <ion-select-option value="limon">🍋 Limón</ion-select-option>
          <ion-select-option value="chocolate">🍫 Chocolate</ion-select-option>
          <ion-select-option value="vainilla">🍦 Vainilla</ion-select-option>
        </ion-select>
      </ion-item>
      <div id="evt-output-sabor" style="
        padding: 12px;
        background: #f5f5f5;
        border-radius: 4px;
        margin-top: 8px;
        text-align: center;
      ">
        Selecciona un sabor...
      </div>

      <!-- ESCENARIO 4: FORMULARIO (SUBMIT) -->
      <div class="js-section-title">Escenario 4: Evento submit (formulario)</div>
      <form id="evt-formulario" style="display: flex; flex-direction: column; gap: 8px;">
        <ion-item>
          <ion-label position="stacked">Correo:</ion-label>
          <ion-input type="email" id="evt-email" placeholder="tu@email.com"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Edad:</ion-label>
          <ion-input type="number" id="evt-edad" placeholder="18"></ion-input>
        </ion-item>
        <ion-button type="submit" expand="block" color="success">
          Enviar formulario
        </ion-button>
      </form>
      <div id="evt-output-form" style="
        padding: 12px;
        background: #f5f5f5;
        border-radius: 4px;
        margin-top: 8px;
        text-align: center;
      ">
        Los datos aparecerán aquí...
      </div>

      <!-- ESCENARIO 5: MOUSEOVER/MOUSELEAVE -->
      <div class="js-section-title">Escenario 5: Eventos mouseover y mouseleave</div>
      <div id="evt-hover-box" style="
        padding: 20px;
        background: #e0f2f1;
        border-radius: 4px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        user-select: none;
      ">
        🎯 Pasa el mouse por aquí
      </div>

      <!-- MINI-RETOS -->
      <div class="js-section-title">🎯 Mini-retos</div>
      <div class="js-mini-retos-box">
        <strong>Reto 1:</strong> Crea un botón que cuente clicks (sin recargarse)<br>
        <strong>Reto 2:</strong> Implementa validación de email en el formulario<br>
        <strong>Reto 3:</strong> Diferencia entre 'input' y 'change'
      </div>

      <!-- CONSOLA SIMULADA -->
      <div class="js-section-title">Consola simulada</div>
      <div id="eventos-console" style="
        background: #1e1e1e;
        color: #d4d4d4;
        padding: 12px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        font-size: 12px;
        max-height: 100px;
        overflow-y: auto;
        border: 1px solid #333;
      ">
        <div style="color: #888;">// Los eventos aparecen aquí</div>
      </div>

      <!-- CÓDIGO EJEMPLO -->
      <div class="js-section-title">Fragmento de referencia</div>
      <pre class="js-code-panel">// Seleccionar elemento
const btn = document.getElementById('mi-btn');

// Escuchar evento click
btn.addEventListener('click', (evento) => {
  console.log('¡Click detectado!');
});

// Input en tiempo real (mientras se escribe)
const input = document.getElementById('mi-input');
input.addEventListener('input', (evento) => {
  console.log('Valor:', evento.target.value);
});

// Change (cuando el usuario termina de escribir/seleccionar)
const select = document.getElementById('mi-select');
select.addEventListener('change', (evento) => {
  console.log('Valor nuevo:', evento.target.value);
});

// Submit de formulario
const form = document.getElementById('mi-form');
form.addEventListener('submit', (evento) => {
  evento.preventDefault();  // Evita recarga de página
  console.log('Formulario enviado');
});</pre>

      <div id="eventos-output" class="js-output" style="min-height:50px;">👆 Interactúa con los elementos para ver eventos detectados.</div>
    </section>
  `;
}

export function init(root) {
  const simConsole = new SimulatedConsole();
  const consoleDisplay = root.querySelector('#eventos-console');
  const out = root.querySelector('#eventos-output');
  let clickCount = 0;

  const updateConsole = () => {
    consoleDisplay.innerHTML = simConsole.render() || '<div style="color: #888;">// Vacío</div>';
  };

  const logEvent = (eventName, details = '') => {
    simConsole.log(`addEventListener('${eventName}')${details ? ': ' + details : ''}`);
    updateConsole();
  };

  // Escenario 1: Click
  root.querySelector('#evt-btn-click').addEventListener('click', () => {
    try {
      clickCount++;
      logEvent('click', `clicks totales: ${clickCount}`);
      out.innerHTML = `✅ Evento 'click' #${clickCount} detectado!`;
    } catch (e) {
      simConsole.error('Error:', e.message);
      updateConsole();
    }
  });

  // Escenario 2: Input
  root.querySelector('#evt-input-nombre').addEventListener('input', (e) => {
    try {
      const nombre = e.target.value || 'anónimo';
      root.querySelector('#evt-output-nombre').innerHTML = `👋 ¡Hola, ${nombre}!`;
      logEvent('input', `"${nombre}"`);
      out.innerHTML = `✅ Evento 'input': ${nombre.length} caracteres`;
    } catch (e) {
      simConsole.error('Error:', e.message);
      updateConsole();
    }
  });

  // Escenario 3: Change en select
  root.querySelector('#evt-select-sabor').addEventListener('change', (e) => {
    try {
      const sabor = e.target.value;
      const emojis = { fresa: '🍓', limon: '🍋', chocolate: '🍫', vainilla: '🍦' };
      root.querySelector('#evt-output-sabor').innerHTML = `${emojis[sabor]} Sabor elegido: <strong>${sabor}</strong>`;
      logEvent('change', `"${sabor}"`);
      out.innerHTML = `✅ Evento 'change': ${sabor}`;
    } catch (e) {
      simConsole.error('Error:', e.message);
      updateConsole();
    }
  });

  // Escenario 4: Submit
  root.querySelector('#evt-formulario').addEventListener('submit', (e) => {
    e.preventDefault();
    try {
      const email = root.querySelector('#evt-email').value;
      const edad = root.querySelector('#evt-edad').value;
      
      if (!email || !edad) {
        simConsole.warn('Campos vacíos, llena todos');
        updateConsole();
        root.querySelector('#evt-output-form').innerHTML = `⚠️ Llena todos los campos`;
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        simConsole.warn('Email inválido');
        updateConsole();
        root.querySelector('#evt-output-form').innerHTML = `⚠️ Email no válido`;
        return;
      }

      if (edad < 1 || edad > 120) {
        simConsole.warn('Edad fuera de rango');
        updateConsole();
        root.querySelector('#evt-output-form').innerHTML = `⚠️ Edad no realista`;
        return;
      }

      logEvent('submit', `email="${email}", edad=${edad}`);
      root.querySelector('#evt-output-form').innerHTML = `
        ✅ Formulario recibido:<br>
        📧 Email: <strong>${email}</strong><br>
        🎂 Edad: <strong>${edad}</strong>
      `;
      out.innerHTML = `✅ Evento 'submit' (página NO recargó)`;
    } catch (e) {
      simConsole.error('Error:', e.message);
      updateConsole();
    }
  });

  // Escenario 5: Hover
  const hoverBox = root.querySelector('#evt-hover-box');
  hoverBox.addEventListener('mouseover', () => {
    try {
      hoverBox.style.backgroundColor = '#80cbc4';
      hoverBox.style.transform = 'scale(1.05)';
      hoverBox.style.color = '#ffffff';
      logEvent('mouseover');
      out.innerHTML = `✅ Evento 'mouseover'`;
    } catch (e) {
      simConsole.error('Error:', e.message);
      updateConsole();
    }
  });

  hoverBox.addEventListener('mouseleave', () => {
    try {
      hoverBox.style.backgroundColor = '#e0f2f1';
      hoverBox.style.transform = 'scale(1)';
      hoverBox.style.color = 'inherit';
      logEvent('mouseleave');
      out.innerHTML = `✅ Evento 'mouseleave'`;
    } catch (e) {
      simConsole.error('Error:', e.message);
      updateConsole();
    }
  });
}

