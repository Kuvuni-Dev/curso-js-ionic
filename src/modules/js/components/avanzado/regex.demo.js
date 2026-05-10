/**
 * @file regex.demo.js
 * @description Demo interactivo: Expresiones regulares en JavaScript.
 * Validación, búsqueda, reemplazo y extracción con regex.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Expresiones Regulares (Regex)</h2>
      <p class="js-subtitle">
        Las expresiones regulares son patrones de búsqueda poderosos para validar, 
        extraer y manipular texto. Usa <code>test()</code>, <code>match()</code>, 
        <code>replace()</code> y <code>split()</code>.
      </p>

      <!-- TEST -->
      <div class="js-section-title">1. test() - Comprobar si existe</div>
      <p style="font-size:14px;margin-bottom:8px;">Verifica si el patrón existe en el texto.</p>
      <div class="js-controls">
        <ion-button size="small" color="primary" id="btn-test-email">
          Validar email
        </ion-button>
        <ion-button size="small" color="secondary" id="btn-test-url">
          Validar URL
        </ion-button>
      </div>
      <div id="test-out" class="js-output" style="min-height:40px;"></div>

      <!-- MATCH -->
      <div class="js-section-title">2. match() - Extraer coincidencias</div>
      <p style="font-size:14px;margin-bottom:8px;">Encuentra todas las coincidencias de un patrón.</p>
      <div class="js-controls">
        <ion-button size="small" color="tertiary" id="btn-extract-numbers">
          Extraer números
        </ion-button>
        <ion-button size="small" color="warning" id="btn-extract-words">
          Extraer palabras
        </ion-button>
      </div>
      <div id="match-out" class="js-output" style="min-height:40px;"></div>

      <!-- REPLACE -->
      <div class="js-section-title">3. replace() - Reemplazar texto</div>
      <p style="font-size:14px;margin-bottom:8px;">Reemplaza coincidencias por nuevo texto.</p>
      <div class="js-controls">
        <ion-button size="small" color="success" id="btn-replace-spaces">
          Limpiar espacios
        </ion-button>
        <ion-button size="small" color="danger" id="btn-replace-censura">
          Censurar palabras
        </ion-button>
      </div>
      <div id="replace-out" class="js-output" style="min-height:40px;"></div>

      <!-- SPLIT -->
      <div class="js-section-title">4. split() - Dividir por patrón</div>
      <p style="font-size:14px;margin-bottom:8px;">Divide un string usando un patrón regex.</p>
      <div class="js-controls">
        <ion-button size="small" color="secondary" id="btn-split-csv">
          Dividir CSV
        </ion-button>
      </div>
      <div id="split-out" class="js-output" style="min-height:40px;"></div>

      <!-- GRUPOS Y CAPTURA -->
      <div class="js-section-title">5. Grupos de captura</div>
      <p style="font-size:14px;margin-bottom:8px;">Captura partes del patrón para reutilizarlas.</p>
      <div class="js-controls">
        <ion-button size="small" color="medium" id="btn-capture-email">
          Extraer usuario y dominio
        </ion-button>
      </div>
      <div id="capture-out" class="js-output" style="min-height:40px;"></div>

      <!-- PATRÓN COMÚN -->
      <div class="js-section-title">Patrones comunes</div>
      <pre class="js-code-panel">// Email
/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/

// URL
/^https?:\\/\\/.+/

// Teléfono (123-4567)
/\\d{3}-\\d{4}/

// Números
/\\d+/g

// Espacios en blanco
/\\s+/g

// Letras y números
/[a-zA-Z0-9]+/g</pre>

      <!-- TABLA DE FLAGS -->
      <div class="js-section-title">Flags y metacaracteres</div>
      <div style="overflow-x:auto;margin:10px 0;">
        <table style="width:100%;border-collapse:collapse;font-size:12px;">
          <tr style="background:#f0f0f0;border-bottom:1px solid #ddd;">
            <th style="padding:8px;text-align:left;">Flag</th>
            <th style="padding:8px;text-align:left;">Significado</th>
          </tr>
          <tr style="border-bottom:1px solid #ddd;">
            <td style="padding:8px;"><code>g</code></td>
            <td style="padding:8px;">Global (todas las coincidencias)</td>
          </tr>
          <tr style="border-bottom:1px solid #ddd;">
            <td style="padding:8px;"><code>i</code></td>
            <td style="padding:8px;">Case insensitive (sin importar mayúsculas)</td>
          </tr>
          <tr style="border-bottom:1px solid #ddd;">
            <td style="padding:8px;"><code>m</code></td>
            <td style="padding:8px;">Multilínea (^ y $ para cada línea)</td>
          </tr>
          <tr style="border-bottom:1px solid #ddd;">
            <td style="padding:8px;"><code>\\d</code></td>
            <td style="padding:8px;">Dígito (0-9)</td>
          </tr>
          <tr style="border-bottom:1px solid #ddd;">
            <td style="padding:8px;"><code>\\w</code></td>
            <td style="padding:8px;">Letra, dígito o guion bajo</td>
          </tr>
          <tr style="border-bottom:1px solid #ddd;">
            <td style="padding:8px;"><code>\\s</code></td>
            <td style="padding:8px;">Espacio en blanco</td>
          </tr>
        </table>
      </div>
    </section>
  `;
}

export function init(root) {
  const testOut = root.querySelector('#test-out');
  const matchOut = root.querySelector('#match-out');
  const replaceOut = root.querySelector('#replace-out');
  const splitOut = root.querySelector('#split-out');
  const captureOut = root.querySelector('#capture-out');

  // TEST: email
  root.querySelector('#btn-test-email').addEventListener('click', () => {
    const emails = ['usuario@ejemplo.com', 'invalido@', 'otro@dominio.es'];
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    testOut.innerHTML = emails.map(email =>
      `<code>${email}</code>: ${regex.test(email) ? '✅ válido' : '❌ inválido'}`
    ).join('<br>');
  });

  // TEST: URL
  root.querySelector('#btn-test-url').addEventListener('click', () => {
    const urls = ['https://ejemplo.com', 'http://google.com', 'ftp://files.com'];
    const regex = /^https?:\/\/.+/;
    testOut.innerHTML = urls.map(url =>
      `<code>${url}</code>: ${regex.test(url) ? '✅ válida' : '❌ inválida'}`
    ).join('<br>');
  });

  // MATCH: números
  root.querySelector('#btn-extract-numbers').addEventListener('click', () => {
    const texto = 'Tengo 25 años, 3 gatos y 2 perros. Teléfono: 555-1234';
    const regex = /\d+/g;
    const numeros = texto.match(regex);
    matchOut.innerHTML = `<strong>Texto:</strong> "${texto}"<br>
      <strong>Números encontrados:</strong> [${numeros.join(', ')}]`;
  });

  // MATCH: palabras
  root.querySelector('#btn-extract-words').addEventListener('click', () => {
    const texto = 'Hello World! JavaScript is awesome. 123 test.';
    const regex = /[a-z]+/gi;
    const palabras = texto.match(regex);
    matchOut.innerHTML = `<strong>Texto:</strong> "${texto}"<br>
      <strong>Palabras:</strong> [${palabras.join(', ')}]`;
  });

  // REPLACE: espacios
  root.querySelector('#btn-replace-spaces').addEventListener('click', () => {
    const texto = '  hola   mundo  ';
    const limpio = texto.replace(/\s+/g, ' ').trim();
    replaceOut.innerHTML = `<strong>Original:</strong> <code>"${texto}"</code><br>
      <strong>Limpio:</strong> <code>"${limpio}"</code>`;
  });

  // REPLACE: censura
  root.querySelector('#btn-replace-censura').addEventListener('click', () => {
    const texto = 'Este es un texto con palabras inapropiadas.';
    const censurado = texto.replace(/\b(palabras)\b/gi, '***');
    replaceOut.innerHTML = `<strong>Original:</strong> "${texto}"<br>
      <strong>Censurado:</strong> "${censurado}"`;
  });

  // SPLIT: CSV
  root.querySelector('#btn-split-csv').addEventListener('click', () => {
    const csv = 'nombre,edad,ciudad';
    const datos = csv.split(/,/);
    splitOut.innerHTML = `<strong>CSV:</strong> <code>"${csv}"</code><br>
      <strong>Array:</strong> [${datos.map(d => `"${d}"`).join(', ')}]`;
  });

  // CAPTURA: email
  root.querySelector('#btn-capture-email').addEventListener('click', () => {
    const email = 'usuario@ejemplo.com';
    const regex = /^(\w+)@(\w+)\.(\w+)$/;
    const match = email.match(regex);
    if (match) {
      captureOut.innerHTML = `<strong>Email:</strong> <code>${email}</code><br>
        <strong>Usuario:</strong> ${match[1]}<br>
        <strong>Dominio:</strong> ${match[2]}<br>
        <strong>Extensión:</strong> ${match[3]}`;
    }
  });
}
