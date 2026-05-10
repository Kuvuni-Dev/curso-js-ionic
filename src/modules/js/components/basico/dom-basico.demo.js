/**
 * @file dom-basico.demo.js
 * @description Demo interactivo: manipular elementos del DOM con JavaScript.
 */

// Utilidad: Consola simulada
class SimulatedConsole {
  constructor() {
    this.logs = [];
  }
  log(...args) {
    this.logs.push({ type: 'log', message: args.map(a => typeof a === 'string' ? a : JSON.stringify(a)).join(' ') });
  }
  warn(...args) {
    this.logs.push({ type: 'warn', message: args.map(a => String(a)).join(' ') });
  }
  error(...args) {
    this.logs.push({ type: 'error', message: args.map(a => String(a)).join(' ') });
  }
  clear() {
    this.logs = [];
  }
  render() {
    return this.logs.slice(-10).map(log => `<span style="color: ${log.type === 'error' ? '#d32f2f' : log.type === 'warn' ? '#f57c00' : '#1976d2'}">${log.type === 'error' ? '❌' : log.type === 'warn' ? '⚠️' : '✓'} ${log.message}</span>`).join('<br>');
  }
}

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>DOM básico</h2>
      <p class="js-subtitle">
        El <strong>DOM (Document Object Model)</strong> es la representación en árbol de tu HTML.
        JavaScript puede seleccionar elementos y modificarlos en tiempo real.
      </p>

      <!-- LABORATORIO INTERACTIVO -->
      <div class="js-section-title">Laboratorio: Manipula el DOM</div>

      <div style="border: 1px solid #ddd; padding: 12px; border-radius: 4px; margin-bottom: 16px;">
        <h4 style="margin: 0 0 8px 0;">Área de demostración:</h4>
        <div id="demo-box" style="
          background-color: #e0f2f1;
          padding: 16px;
          border-radius: 4px;
          text-align: center;
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: bold;
          color: #00897b;
        ">
          👋 Hola, soy un elemento del DOM
        </div>
      </div>

      <!-- ESCENARIO 1: CAMBIAR TEXTO -->
      <div class="js-section-title">Escenario 1: Cambiar contenido (textContent)</div>
      <ion-item>
        <ion-label position="stacked">Nuevo texto:</ion-label>
        <ion-input id="dom-input-text" value="Texto modificado" placeholder="Escribe algo"></ion-input>
      </ion-item>
      <ion-button expand="block" size="small" color="primary" id="dom-btn-texto">
        Cambiar textContent
      </ion-button>

      <!-- ESCENARIO 2: CAMBIAR HTML -->
      <div class="js-section-title">Escenario 2: Cambiar HTML (innerHTML)</div>
      <div class="js-controls">
        <ion-button size="small" color="secondary" id="dom-btn-html-simple">
          innerHTML simple
        </ion-button>
        <ion-button size="small" fill="outline" id="dom-btn-html-formato">
          innerHTML formateado
        </ion-button>
        <ion-button size="small" fill="outline" id="dom-btn-restore">
          Restaurar original
        </ion-button>
      </div>

      <!-- ESCENARIO 3: CAMBIAR ESTILOS -->
      <div class="js-section-title">Escenario 3: Cambiar estilos (style)</div>
      <div class="js-controls">
        <ion-button size="small" color="success" id="dom-btn-color">
          Cambiar color
        </ion-button>
        <ion-button size="small" fill="outline" id="dom-btn-size">
          Aumentar tamaño
        </ion-button>
        <ion-button size="small" fill="outline" id="dom-btn-clases">
          Toggle clase CSS
        </ion-button>
      </div>

      <!-- ESCENARIO 4: CREAR Y ELIMINAR -->
      <div class="js-section-title">Escenario 4: Crear/eliminar elementos</div>
      <div class="js-controls">
        <ion-button size="small" color="primary" id="dom-btn-crear">
          Crear elemento
        </ion-button>
        <ion-button size="small" color="danger" id="dom-btn-eliminar">
          Eliminar último
        </ion-button>
      </div>

      <div id="dom-lista" style="margin-top: 8px;"></div>

      <!-- MINI-RETOS -->
      <div class="js-section-title">🎯 Mini-retos</div>
      <div style="background: #fff9c4; padding: 12px; border-radius: 4px; border-left: 4px solid #fbc02d; font-size: 13px;">
        <strong>Reto 1:</strong> Cambia el backgroundColor a rojo usando style<br>
        <strong>Reto 2:</strong> Crea 5 elementos nuevos sin borrar nada<br>
        <strong>Reto 3:</strong> ¿Qué diferencia hay entre textContent e innerHTML?
      </div>

      <!-- CONSOLA SIMULADA -->
      <div class="js-section-title">Consola simulada</div>
      <div id="dom-console" style="
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
        <div style="color: #888;">// La salida aparece aquí</div>
      </div>

      <!-- CÓDIGO EJEMPLO -->
      <div class="js-section-title">Fragmento de referencia</div>
      <pre class="js-code-panel">// Seleccionar elemento
const box = document.getElementById('demo-box');
// O: document.querySelector('#demo-box')

// Cambiar texto (solo texto, sin HTML)
box.textContent = 'Nuevo texto';

// Cambiar HTML (reemplaza contenido)
box.innerHTML = '&lt;strong&gt;Negrita&lt;/strong&gt;';

// Cambiar estilos
box.style.backgroundColor = 'red';
box.style.fontSize = '24px';

// Crear elemento nuevo
const nuevo = document.createElement('div');
nuevo.textContent = 'Soy nuevo';
document.body.appendChild(nuevo);

// Eliminar elemento
box.remove();</pre>

      <div id="dom-output" class="js-output" style="min-height:50px;">👆 Interactúa con los botones para ver cambios en tiempo real.</div>
    </section>
  `;
}

export function init(root) {
  const simConsole = new SimulatedConsole();
  const consoleDisplay = root.querySelector('#dom-console');
  const box = root.querySelector('#demo-box');
  const out = root.querySelector('#dom-output');
  const originalHTML = box.innerHTML;
  let createdCount = 0;

  const updateConsole = () => {
    consoleDisplay.innerHTML = simConsole.render() || '<div style="color: #888;">// Vacío</div>';
  };

  const logAction = (method, result) => {
    simConsole.log(`${method}: ${result}`);
    updateConsole();
  };

  // Escenario 1: Cambiar texto
  root.querySelector('#dom-btn-texto').addEventListener('click', () => {
    try {
      const newText = root.querySelector('#dom-input-text').value || 'vacío';
      if (!newText.trim()) {
        simConsole.warn('⚠️ El campo está vacío, escribe algo primero');
        updateConsole();
        out.innerHTML = `⚠️ Por favor, escribe algo en el campo`;
        return;
      }
      box.textContent = newText;
      logAction('textContent', `"${newText}"`);
      out.innerHTML = `✅ textContent = "<strong>${newText}</strong>"`;
    } catch (e) {
      simConsole.error('Error:', e.message);
      updateConsole();
      out.innerHTML = `<span style="color: red;">❌ ${e.message}</span>`;
    }
  });

  // Escenario 2: Cambiar HTML
  root.querySelector('#dom-btn-html-simple').addEventListener('click', () => {
    try {
      box.innerHTML = '✨ HTML modificado con <strong>etiquetas</strong>!';
      logAction('innerHTML', 'con etiquetas HTML');
      out.innerHTML = `✅ innerHTML cambiado a: &lt;strong&gt;HTML&lt;/strong&gt;`;
    } catch (e) {
      out.innerHTML = `<span style="color: red;">❌ Error: ${e.message}</span>`;
    }
  });

  root.querySelector('#dom-btn-html-formato').addEventListener('click', () => {
    try {
      box.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 8px; align-items: center;">
          <span style="font-size: 24px;">🎨</span>
          <span>HTML con estructura compleja</span>
          <span style="font-size: 12px; color: #666;">Varios elementos anidados</span>
        </div>
      `;
      logAction('innerHTML', 'estructura HTML compleja');
      out.innerHTML = `✅ innerHTML con estructura HTML compleja`;
    } catch (e) {
      out.innerHTML = `<span style="color: red;">❌ Error: ${e.message}</span>`;
    }
  });

  root.querySelector('#dom-btn-restore').addEventListener('click', () => {
    try {
      box.innerHTML = originalHTML;
      logAction('innerHTML', 'restaurado al original');
      out.innerHTML = `✅ Restaurado al original: "${originalHTML}"`;
    } catch (e) {
      out.innerHTML = `<span style="color: red;">❌ Error: ${e.message}</span>`;
    }
  });

  // Escenario 3: Cambiar estilos
  root.querySelector('#dom-btn-color').addEventListener('click', () => {
    try {
      const colors = ['#e0f2f1', '#fff3e0', '#f3e5f5', '#e8f5e9'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      box.style.backgroundColor = randomColor;
      logAction('style.backgroundColor', randomColor);
      out.innerHTML = `✅ style.backgroundColor = "${randomColor}"`;
    } catch (e) {
      out.innerHTML = `<span style="color: red;">❌ Error: ${e.message}</span>`;
    }
  });

  root.querySelector('#dom-btn-size').addEventListener('click', () => {
    try {
      const currentSize = parseInt(box.style.fontSize) || 18;
      const newSize = currentSize + 6;
      box.style.fontSize = newSize + 'px';
      logAction('style.fontSize', `${newSize}px`);
      out.innerHTML = `✅ style.fontSize = "${newSize}px"`;
    } catch (e) {
      out.innerHTML = `<span style="color: red;">❌ Error: ${e.message}</span>`;
    }
  });

  root.querySelector('#dom-btn-clases').addEventListener('click', () => {
    try {
      box.style.fontWeight = box.style.fontWeight === 'bold' ? 'normal' : 'bold';
      const estado = box.style.fontWeight === 'bold' ? 'agregada' : 'removida';
      logAction('classList', `'bold' ${estado}`);
      out.innerHTML = `✅ Clase 'bold' ${estado}`;
    } catch (e) {
      out.innerHTML = `<span style="color: red;">❌ Error: ${e.message}</span>`;
    }
  });

  // Escenario 4: Crear/eliminar
  root.querySelector('#dom-btn-crear').addEventListener('click', () => {
    try {
      if (createdCount >= 10) {
        simConsole.warn('⚠️ Máximo 10 elementos');
        updateConsole();
        out.innerHTML = `⚠️ Ya creaste muchos elementos (máx 10)`;
        return;
      }
      createdCount++;
      const lista = root.querySelector('#dom-lista');
      const item = document.createElement('div');
      item.style.cssText = 'background: #fff; padding: 8px; margin: 4px 0; border-left: 4px solid #00897b;';
      item.textContent = `📌 Elemento creado #${createdCount}`;
      item.className = 'dom-created-item';
      lista.appendChild(item);
      logAction('appendChild', `elemento #${createdCount}`);
      out.innerHTML = `✅ Elemento #${createdCount} creado con appendChild()`;
    } catch (e) {
      out.innerHTML = `<span style="color: red;">❌ Error: ${e.message}</span>`;
    }
  });

  root.querySelector('#dom-btn-eliminar').addEventListener('click', () => {
    try {
      const items = root.querySelectorAll('.dom-created-item');
      if (items.length > 0) {
        items[items.length - 1].remove();
        createdCount--;
        logAction('remove', `último elemento (${createdCount} quedan)`);
        out.innerHTML = `✅ Último elemento eliminado con remove()`;
      } else {
        simConsole.warn('⚠️ No hay elementos para eliminar');
        updateConsole();
        out.innerHTML = `⚠️ No hay elementos para eliminar`;
      }
    } catch (e) {
      out.innerHTML = `<span style="color: red;">❌ Error: ${e.message}</span>`;
    }
  });
}
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>DOM básico</h2>
      <p class="js-subtitle">
        El <strong>DOM (Document Object Model)</strong> es la representación en árbol de tu HTML.
        JavaScript puede seleccionar elementos y modificarlos en tiempo real.
      </p>

      <!-- LABORATORIO INTERACTIVO -->
      <div class="js-section-title">Laboratorio: Manipula el DOM</div>

      <div style="border: 1px solid #ddd; padding: 12px; border-radius: 4px; margin-bottom: 16px;">
        <h4 style="margin: 0 0 8px 0;">Área de demostración:</h4>
        <div id="demo-box" style="
          background-color: #e0f2f1;
          padding: 16px;
          border-radius: 4px;
          text-align: center;
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: bold;
          color: #00897b;
        ">
          👋 Hola, soy un elemento del DOM
        </div>
      </div>

      <!-- ESCENARIO 1: CAMBIAR TEXTO -->
      <div class="js-section-title">Escenario 1: Cambiar contenido (textContent)</div>
      <ion-item>
        <ion-label position="stacked">Nuevo texto:</ion-label>
        <ion-input id="dom-input-text" value="Texto modificado" placeholder="Escribe algo"></ion-input>
      </ion-item>
      <ion-button expand="block" size="small" color="primary" id="dom-btn-texto">
        Cambiar textContent
      </ion-button>

      <!-- ESCENARIO 2: CAMBIAR HTML -->
      <div class="js-section-title">Escenario 2: Cambiar HTML (innerHTML)</div>
      <div class="js-controls">
        <ion-button size="small" color="secondary" id="dom-btn-html-simple">
          innerHTML simple
        </ion-button>
        <ion-button size="small" fill="outline" id="dom-btn-html-formato">
          innerHTML formateado
        </ion-button>
        <ion-button size="small" fill="outline" id="dom-btn-restore">
          Restaurar original
        </ion-button>
      </div>

      <!-- ESCENARIO 3: CAMBIAR ESTILOS -->
      <div class="js-section-title">Escenario 3: Cambiar estilos (style)</div>
      <div class="js-controls">
        <ion-button size="small" color="success" id="dom-btn-color">
          Cambiar color
        </ion-button>
        <ion-button size="small" fill="outline" id="dom-btn-size">
          Aumentar tamaño
        </ion-button>
        <ion-button size="small" fill="outline" id="dom-btn-clases">
          Toggle clase CSS
        </ion-button>
      </div>

      <!-- ESCENARIO 4: CREAR Y ELIMINAR -->
      <div class="js-section-title">Escenario 4: Crear/eliminar elementos</div>
      <div class="js-controls">
        <ion-button size="small" color="primary" id="dom-btn-crear">
          Crear elemento
        </ion-button>
        <ion-button size="small" color="danger" id="dom-btn-eliminar">
          Eliminar último
        </ion-button>
      </div>

      <div id="dom-lista" style="margin-top: 8px;"></div>

      <!-- CÓDIGO EJEMPLO -->
      <div class="js-section-title">Fragmento de referencia</div>
      <pre class="js-code-panel">// Seleccionar elemento
const box = document.getElementById('demo-box');
// O: document.querySelector('#demo-box')

// Cambiar texto (solo texto, sin HTML)
box.textContent = 'Nuevo texto';

// Cambiar HTML (reemplaza contenido)
box.innerHTML = '&lt;strong&gt;Negrita&lt;/strong&gt;';

// Cambiar estilos
box.style.backgroundColor = 'red';
box.style.fontSize = '24px';

// Crear elemento nuevo
const nuevo = document.createElement('div');
nuevo.textContent = 'Soy nuevo';
document.body.appendChild(nuevo);

// Eliminar elemento
box.remove();</pre>

      <div id="dom-output" class="js-output" style="min-height:50px;">👆 Interactúa con los botones para ver cambios en tiempo real.</div>
    </section>
  `;
}

export function init(root) {
  const box = root.querySelector('#demo-box');
  const out = root.querySelector('#dom-output');
  const originalHTML = box.innerHTML;
  let createdCount = 0;

  // Escenario 1: Cambiar texto
  root.querySelector('#dom-btn-texto').addEventListener('click', () => {
    const newText = root.querySelector('#dom-input-text').value;
    box.textContent = newText;
    out.innerHTML = `✅ textContent = "<strong>${newText}</strong>"`;
  });

  // Escenario 2: Cambiar HTML
  root.querySelector('#dom-btn-html-simple').addEventListener('click', () => {
    box.innerHTML = '✨ HTML modificado con <strong>etiquetas</strong>!';
    out.innerHTML = `✅ innerHTML cambiado a: &lt;strong&gt;HTML&lt;/strong&gt;`;
  });

  root.querySelector('#dom-btn-html-formato').addEventListener('click', () => {
    box.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 8px; align-items: center;">
        <span style="font-size: 24px;">🎨</span>
        <span>HTML con estructura compleja</span>
        <span style="font-size: 12px; color: #666;">Varios elementos anidados</span>
      </div>
    `;
    out.innerHTML = `✅ innerHTML con estructura HTML compleja`;
  });

  root.querySelector('#dom-btn-restore').addEventListener('click', () => {
    box.innerHTML = originalHTML;
    out.innerHTML = `✅ Restaurado al original: "${originalHTML}"`;
  });

  // Escenario 3: Cambiar estilos
  root.querySelector('#dom-btn-color').addEventListener('click', () => {
    const colors = ['#e0f2f1', '#fff3e0', '#f3e5f5', '#e8f5e9'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    box.style.backgroundColor = randomColor;
    out.innerHTML = `✅ style.backgroundColor = "${randomColor}"`;
  });

  root.querySelector('#dom-btn-size').addEventListener('click', () => {
    const currentSize = parseInt(box.style.fontSize) || 18;
    const newSize = currentSize + 6;
    box.style.fontSize = newSize + 'px';
    out.innerHTML = `✅ style.fontSize = "${newSize}px"`;
  });

  root.querySelector('#dom-btn-clases').addEventListener('click', () => {
    box.style.fontWeight = box.style.fontWeight === 'bold' ? 'normal' : 'bold';
    const estado = box.style.fontWeight === 'bold' ? 'agregada' : 'removida';
    out.innerHTML = `✅ Clase 'bold' ${estado}`;
  });

  // Escenario 4: Crear/eliminar
  root.querySelector('#dom-btn-crear').addEventListener('click', () => {
    createdCount++;
    const lista = root.querySelector('#dom-lista');
    const item = document.createElement('div');
    item.style.cssText = 'background: #fff; padding: 8px; margin: 4px 0; border-left: 4px solid #00897b;';
    item.textContent = `📌 Elemento creado #${createdCount}`;
    item.className = 'dom-created-item';
    lista.appendChild(item);
    out.innerHTML = `✅ Elemento #${createdCount} creado con appendChild()`;
  });

  root.querySelector('#dom-btn-eliminar').addEventListener('click', () => {
    const items = root.querySelectorAll('.dom-created-item');
    if (items.length > 0) {
      items[items.length - 1].remove();
      out.innerHTML = `✅ Último elemento eliminado con remove()`;
    } else {
      out.innerHTML = `⚠️ No hay elementos para eliminar`;
    }
  });
}
