/**
 * @file json-localstorage.demo.js
 * @description Demo interactivo: JSON y localStorage para persistencia de datos.
 */

// Utilidad: Consola simulada
class SimulatedConsole {
  constructor() { this.logs = []; }
  log(...args) { this.logs.push({ type: 'log', message: args.map(a => typeof a === 'string' ? a : JSON.stringify(a)).join(' ') }); }
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

      <h2>JSON y localStorage</h2>
      <p class="js-subtitle">
        <strong>JSON</strong> es un formato de texto para datos. <strong>localStorage</strong>
        es un almacén del navegador que persiste datos incluso después de cerrar la página.
        Ideal para guardar preferencias, configuración, etc.
      </p>

      <!-- LABORATORIO INTERACTIVO -->
      <div class="js-section-title">Laboratorio: Guarda datos en el navegador</div>

      <!-- ESCENARIO 1: JSON STRINGIFY/PARSE -->
      <div class="js-section-title">Escenario 1: Convertir objeto ↔ JSON</div>
      <div class="js-controls">
        <ion-button size="small" color="primary" id="json-btn-stringify">
          Objeto → JSON
        </ion-button>
        <ion-button size="small" color="secondary" id="json-btn-parse">
          JSON → Objeto
        </ion-button>
      </div>

      <div style="
        background: #f5f5f5;
        padding: 12px;
        border-radius: 4px;
        margin-top: 8px;
        font-family: monospace;
        font-size: 12px;
        word-break: break-all;
      " id="json-output-formato"></div>

      <!-- ESCENARIO 2: GUARDAR EN LOCALSTORAGE -->
      <div class="js-section-title">Escenario 2: Guardar datos con localStorage</div>
      <ion-item>
        <ion-label position="stacked">Nombre (para guardar):</ion-label>
        <ion-input id="ls-input-nombre" placeholder="Tu nombre" value="Ana"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Tema preferido:</ion-label>
        <ion-select id="ls-select-tema" placeholder="Elige tema">
          <ion-select-option value="claro">☀️ Claro</ion-select-option>
          <ion-select-option value="oscuro">🌙 Oscuro</ion-select-option>
          <ion-select-option value="auto">🔄 Automático</ion-select-option>
        </ion-select>
      </ion-item>
      <div class="js-controls">
        <ion-button expand="block" size="small" color="success" id="ls-btn-guardar">
          💾 Guardar en localStorage
        </ion-button>
      </div>

      <!-- ESCENARIO 3: RECUPERAR DE LOCALSTORAGE -->
      <div class="js-section-title">Escenario 3: Recuperar datos guardados</div>
      <div class="js-controls">
        <ion-button expand="block" size="small" color="primary" id="ls-btn-cargar">
          📂 Cargar desde localStorage
        </ion-button>
        <ion-button expand="block" size="small" fill="outline" id="ls-btn-limpiar">
          🗑️ Limpiar localStorage
        </ion-button>
      </div>

      <div id="ls-output-cargar" style="
        background: #e8f5e9;
        padding: 12px;
        border-radius: 4px;
        margin-top: 8px;
      "></div>

      <!-- ESCENARIO 4: CONTADOR PERSISTENTE -->
      <div class="js-section-title">Escenario 4: Contador que persiste entre recargas</div>
      <div style="text-align: center; padding: 16px; background: #f3e5f5; border-radius: 4px;">
        <div style="font-size: 32px; font-weight: bold;" id="contador-display">0</div>
        <div style="font-size: 12px; color: #666; margin-top: 4px;">Contador persistente (recarga la página y verás que continúa)</div>
      </div>
      <div class="js-controls">
        <ion-button size="small" color="primary" id="ls-btn-incrementar">➕ +1</ion-button>
        <ion-button size="small" fill="outline" id="ls-btn-decrementar">➖ -1</ion-button>
        <ion-button size="small" color="danger" id="ls-btn-reset">🔄 Reset</ion-button>
      </div>

      <!-- MINI-RETOS -->
      <div class="js-section-title">🎯 Mini-retos</div>
      <div class="js-mini-retos-box">
        <strong>Reto 1:</strong> Recarga la página ¿persiste el contador?<br>
        <strong>Reto 2:</strong> Abre DevTools → Application → LocalStorage ¿Qué ves?<br>
        <strong>Reto 3:</strong> Crea un objeto más complejo y guárdalo
      </div>

      <!-- CONSOLA SIMULADA -->
      <div class="js-section-title">Consola simulada</div>
      <div id="json-console" style="
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
        <div style="color: #888;">// Los logs aparecen aquí</div>
      </div>

      <!-- CÓDIGO EJEMPLO -->
      <div class="js-section-title">Fragmento de referencia</div>
      <pre class="js-code-panel">// JSON.stringify: objeto → texto JSON
const usuario = { nombre: 'Ana', edad: 25 };
const json = JSON.stringify(usuario);
console.log(json);  // '{"nombre":"Ana","edad":25}'

// JSON.parse: texto JSON → objeto
const texto = '{"nombre":"Ana","edad":25}';
const obj = JSON.parse(texto);
console.log(obj.nombre);  // 'Ana'

// localStorage.setItem: guardar
localStorage.setItem('usuario', JSON.stringify(usuario));

// localStorage.getItem: recuperar
const guardado = localStorage.getItem('usuario');
const usuarioRecuperado = JSON.parse(guardado);

// localStorage.removeItem: eliminar
localStorage.removeItem('usuario');

// localStorage.clear: limpiar todo
localStorage.clear();</pre>

      <div id="json-output" class="js-output" style="min-height:50px;">👆 Interactúa con los botones para ver JSON y localStorage.</div>
    </section>
  `;
}

export function init(root) {
  const simConsole = new SimulatedConsole();
  const consoleDisplay = root.querySelector('#json-console');
  const out = root.querySelector('#json-output');

  const updateConsole = () => {
    consoleDisplay.innerHTML = simConsole.render() || '<div style="color: #888;">// Vacío</div>';
  };

  // Objeto de ejemplo
  const usuario = {
    nombre: 'Usuario ejemplo',
    edad: 25,
    temas: ['JavaScript', 'Web', 'Ionic'],
    activo: true
  };

  // Escenario 1: JSON stringify/parse
  root.querySelector('#json-btn-stringify').addEventListener('click', () => {
    simConsole.clear();
    const json = JSON.stringify(usuario, null, 2);
    simConsole.log('JSON.stringify(objeto):');
    simConsole.log(json);
    updateConsole();
    root.querySelector('#json-output-formato').innerHTML = `<strong>Objeto → JSON:</strong><br><br>${json.replace(/</g, '&lt;').replace(/>/g, '&gt;')}`;
    out.innerHTML = `✅ JSON.stringify convierte objeto a texto`;
  });

  root.querySelector('#json-btn-parse').addEventListener('click', () => {
    simConsole.clear();
    const json = JSON.stringify(usuario);
    const parsed = JSON.parse(json);
    simConsole.log('JSON.parse(texto):');
    simConsole.log('Propiedades accesibles:', Object.keys(parsed));
    updateConsole();
    root.querySelector('#json-output-formato').innerHTML = `
      <strong>JSON → Objeto:</strong><br><br>
      Ahora puedes acceder propiedades:<br>
      • nombre: ${parsed.nombre}<br>
      • edad: ${parsed.edad}<br>
      • temas: ${parsed.temas.join(', ')}
    `;
    out.innerHTML = `✅ JSON.parse convierte texto a objeto`;
  });

  // Escenario 2: Guardar en localStorage
  root.querySelector('#ls-btn-guardar').addEventListener('click', () => {
    simConsole.clear();
    const nombre = root.querySelector('#ls-input-nombre').value?.trim() || 'anónimo';
    const tema = root.querySelector('#ls-select-tema').value || 'claro';
    
    if (!nombre || !tema) {
      simConsole.warn('Llena todos los campos primero');
      updateConsole();
      out.innerHTML = `⚠️ Completa nombre y tema`;
      return;
    }

    const datos = {
      nombre: nombre,
      tema: tema,
      fechaGuardada: new Date().toLocaleString()
    };

    localStorage.setItem('misDatos', JSON.stringify(datos));
    simConsole.log(`localStorage.setItem('misDatos', ...)`);
    simConsole.log(`Datos guardados: ${JSON.stringify(datos)}`);
    updateConsole();
    out.innerHTML = `✅ localStorage.setItem('misDatos', ...) ✓`;
  });

  // Escenario 3: Cargar de localStorage
  root.querySelector('#ls-btn-cargar').addEventListener('click', () => {
    simConsole.clear();
    const guardado = localStorage.getItem('misDatos');
    if (guardado) {
      const datos = JSON.parse(guardado);
      simConsole.log('localStorage.getItem("misDatos")');
      simConsole.log(`Recuperados: ${JSON.stringify(datos)}`);
      updateConsole();
      root.querySelector('#ls-output-cargar').innerHTML = `
        ✅ Datos recuperados:<br>
        📝 Nombre: <strong>${datos.nombre}</strong><br>
        🎨 Tema: <strong>${datos.tema}</strong><br>
        ⏰ Guardado: <strong>${datos.fechaGuardada}</strong>
      `;
      out.innerHTML = `✅ localStorage.getItem() ✓`;
    } else {
      simConsole.warn('No hay datos guardados');
      updateConsole();
      root.querySelector('#ls-output-cargar').innerHTML = `⚠️ No hay datos guardados. Guarda primero.`;
      out.innerHTML = `⚠️ localStorage vacío`;
    }
  });

  root.querySelector('#ls-btn-limpiar').addEventListener('click', () => {
    simConsole.clear();
    localStorage.removeItem('misDatos');
    simConsole.log('localStorage.removeItem("misDatos")');
    simConsole.log('Datos eliminados ✓');
    updateConsole();
    root.querySelector('#ls-output-cargar').innerHTML = `🗑️ Datos eliminados`;
    out.innerHTML = `✅ localStorage.removeItem() ✓`;
  });

  // Escenario 4: Contador persistente
  const actualizarContador = () => {
    const contador = localStorage.getItem('contador') || '0';
    root.querySelector('#contador-display').textContent = contador;
  };

  actualizarContador();  // Cargar al iniciar

  root.querySelector('#ls-btn-incrementar').addEventListener('click', () => {
    try {
      let contador = parseInt(localStorage.getItem('contador') || '0');
      contador++;
      localStorage.setItem('contador', contador.toString());
      actualizarContador();
      simConsole.log(`Contador ++: ${contador}`);
      updateConsole();
      out.innerHTML = `✅ Contador incrementado a ${contador}`;
    } catch (e) {
      simConsole.error('Error:', e.message);
      updateConsole();
    }
  });

  root.querySelector('#ls-btn-decrementar').addEventListener('click', () => {
    try {
      let contador = parseInt(localStorage.getItem('contador') || '0');
      contador--;
      localStorage.setItem('contador', contador.toString());
      actualizarContador();
      simConsole.log(`Contador --: ${contador}`);
      updateConsole();
      out.innerHTML = `✅ Contador decrementado a ${contador}`;
    } catch (e) {
      simConsole.error('Error:', e.message);
      updateConsole();
    }
  });

  root.querySelector('#ls-btn-reset').addEventListener('click', () => {
    simConsole.clear();
    localStorage.setItem('contador', '0');
    actualizarContador();
    simConsole.log('Contador reseteado a 0');
    updateConsole();
    out.innerHTML = `✅ Contador reseteado a 0`;
  });
}
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>JSON y localStorage</h2>
      <p class="js-subtitle">
        <strong>JSON</strong> es un formato de texto para datos. <strong>localStorage</strong>
        es un almacén del navegador que persiste datos incluso después de cerrar la página.
        Ideal para guardar preferencias, configuración, etc.
      </p>

      <!-- LABORATORIO INTERACTIVO -->
      <div class="js-section-title">Laboratorio: Guarda datos en el navegador</div>

      <!-- ESCENARIO 1: JSON STRINGIFY/PARSE -->
      <div class="js-section-title">Escenario 1: Convertir objeto ↔ JSON</div>
      <div class="js-controls">
        <ion-button size="small" color="primary" id="json-btn-stringify">
          Objeto → JSON
        </ion-button>
        <ion-button size="small" color="secondary" id="json-btn-parse">
          JSON → Objeto
        </ion-button>
      </div>

      <div style="
        background: #f5f5f5;
        padding: 12px;
        border-radius: 4px;
        margin-top: 8px;
        font-family: monospace;
        font-size: 12px;
        word-break: break-all;
      " id="json-output-formato"></div>

      <!-- ESCENARIO 2: GUARDAR EN LOCALSTORAGE -->
      <div class="js-section-title">Escenario 2: Guardar datos con localStorage</div>
      <ion-item>
        <ion-label position="stacked">Nombre (para guardar):</ion-label>
        <ion-input id="ls-input-nombre" placeholder="Tu nombre" value="Ana"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Tema preferido:</ion-label>
        <ion-select id="ls-select-tema" placeholder="Elige tema">
          <ion-select-option value="claro">☀️ Claro</ion-select-option>
          <ion-select-option value="oscuro">🌙 Oscuro</ion-select-option>
          <ion-select-option value="auto">🔄 Automático</ion-select-option>
        </ion-select>
      </ion-item>
      <div class="js-controls">
        <ion-button expand="block" size="small" color="success" id="ls-btn-guardar">
          💾 Guardar en localStorage
        </ion-button>
      </div>

      <!-- ESCENARIO 3: RECUPERAR DE LOCALSTORAGE -->
      <div class="js-section-title">Escenario 3: Recuperar datos guardados</div>
      <div class="js-controls">
        <ion-button expand="block" size="small" color="primary" id="ls-btn-cargar">
          📂 Cargar desde localStorage
        </ion-button>
        <ion-button expand="block" size="small" fill="outline" id="ls-btn-limpiar">
          🗑️ Limpiar localStorage
        </ion-button>
      </div>

      <div id="ls-output-cargar" style="
        background: #e8f5e9;
        padding: 12px;
        border-radius: 4px;
        margin-top: 8px;
      "></div>

      <!-- ESCENARIO 4: CONTADOR PERSISTENTE -->
      <div class="js-section-title">Escenario 4: Contador que persiste entre recargas</div>
      <div style="text-align: center; padding: 16px; background: #f3e5f5; border-radius: 4px;">
        <div style="font-size: 32px; font-weight: bold;" id="contador-display">0</div>
        <div style="font-size: 12px; color: #666; margin-top: 4px;">Contador persistente (recarga la página y verás que continúa)</div>
      </div>
      <div class="js-controls">
        <ion-button size="small" color="primary" id="ls-btn-incrementar">➕ +1</ion-button>
        <ion-button size="small" fill="outline" id="ls-btn-decrementar">➖ -1</ion-button>
        <ion-button size="small" color="danger" id="ls-btn-reset">🔄 Reset</ion-button>
      </div>

      <!-- CÓDIGO EJEMPLO -->
      <div class="js-section-title">Fragmento de referencia</div>
      <pre class="js-code-panel">// JSON.stringify: objeto → texto JSON
const usuario = { nombre: 'Ana', edad: 25 };
const json = JSON.stringify(usuario);
console.log(json);  // '{"nombre":"Ana","edad":25}'

// JSON.parse: texto JSON → objeto
const texto = '{"nombre":"Ana","edad":25}';
const obj = JSON.parse(texto);
console.log(obj.nombre);  // 'Ana'

// localStorage.setItem: guardar
localStorage.setItem('usuario', JSON.stringify(usuario));

// localStorage.getItem: recuperar
const guardado = localStorage.getItem('usuario');
const usuarioRecuperado = JSON.parse(guardado);

// localStorage.removeItem: eliminar
localStorage.removeItem('usuario');

// localStorage.clear: limpiar todo
localStorage.clear();</pre>

      <div id="json-output" class="js-output" style="min-height:50px;">👆 Interactúa con los botones para ver JSON y localStorage.</div>
    </section>
  `;
}

export function init(root) {
  const out = root.querySelector('#json-output');

  // Objeto de ejemplo
  const usuario = {
    nombre: 'Usuario ejemplo',
    edad: 25,
    temas: ['JavaScript', 'Web', 'Ionic'],
    activo: true
  };

  // Escenario 1: JSON stringify/parse
  root.querySelector('#json-btn-stringify').addEventListener('click', () => {
    const json = JSON.stringify(usuario, null, 2);  // null, 2 = formato legible
    root.querySelector('#json-output-formato').innerHTML = `<strong>Objeto → JSON:</strong><br><br>${json}`;
    out.innerHTML = `✅ JSON.stringify convierte objeto a texto`;
  });

  root.querySelector('#json-btn-parse').addEventListener('click', () => {
    const json = JSON.stringify(usuario);
    const parsed = JSON.parse(json);
    root.querySelector('#json-output-formato').innerHTML = `
      <strong>JSON → Objeto:</strong><br><br>
      JSON original:<br>
      ${json}<br><br>
      Parseado:<br>
      nombre: ${parsed.nombre}<br>
      edad: ${parsed.edad}<br>
      temas: ${parsed.temas.join(', ')}
    `;
    out.innerHTML = `✅ JSON.parse convierte texto a objeto (ahora puedes acceder propiedades)`;
  });

  // Escenario 2: Guardar en localStorage
  root.querySelector('#ls-btn-guardar').addEventListener('click', () => {
    const nombre = root.querySelector('#ls-input-nombre').value || 'anónimo';
    const tema = root.querySelector('#ls-select-tema').value || 'claro';
    
    const datos = {
      nombre: nombre,
      tema: tema,
      fechaGuardada: new Date().toLocaleString()
    };

    localStorage.setItem('misDatos', JSON.stringify(datos));
    out.innerHTML = `✅ localStorage.setItem('misDatos', '${JSON.stringify(datos)}')`;
  });

  // Escenario 3: Cargar de localStorage
  root.querySelector('#ls-btn-cargar').addEventListener('click', () => {
    const guardado = localStorage.getItem('misDatos');
    if (guardado) {
      const datos = JSON.parse(guardado);
      root.querySelector('#ls-output-cargar').innerHTML = `
        ✅ Datos recuperados:<br>
        📝 Nombre: <strong>${datos.nombre}</strong><br>
        🎨 Tema: <strong>${datos.tema}</strong><br>
        ⏰ Guardado: <strong>${datos.fechaGuardada}</strong>
      `;
      out.innerHTML = `✅ localStorage.getItem('misDatos') recuperó los datos`;
    } else {
      root.querySelector('#ls-output-cargar').innerHTML = `⚠️ No hay datos guardados`;
      out.innerHTML = `⚠️ localStorage vacío. Primero guarda datos.`;
    }
  });

  root.querySelector('#ls-btn-limpiar').addEventListener('click', () => {
    localStorage.removeItem('misDatos');
    root.querySelector('#ls-output-cargar').innerHTML = `🗑️ Datos eliminados`;
    out.innerHTML = `✅ localStorage.removeItem('misDatos')`;
  });

  // Escenario 4: Contador persistente
  const actualizarContador = () => {
    const contador = localStorage.getItem('contador') || '0';
    root.querySelector('#contador-display').textContent = contador;
  };

  actualizarContador();  // Cargar al iniciar

  root.querySelector('#ls-btn-incrementar').addEventListener('click', () => {
    let contador = parseInt(localStorage.getItem('contador') || '0');
    contador++;
    localStorage.setItem('contador', contador.toString());
    actualizarContador();
    out.innerHTML = `✅ Contador incrementado a ${contador}`;
  });

  root.querySelector('#ls-btn-decrementar').addEventListener('click', () => {
    let contador = parseInt(localStorage.getItem('contador') || '0');
    contador--;
    localStorage.setItem('contador', contador.toString());
    actualizarContador();
    out.innerHTML = `✅ Contador decrementado a ${contador}`;
  });

  root.querySelector('#ls-btn-reset').addEventListener('click', () => {
    localStorage.setItem('contador', '0');
    actualizarContador();
    out.innerHTML = `✅ Contador reseteado a 0`;
  });
}

