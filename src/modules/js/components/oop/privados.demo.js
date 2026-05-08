/**
 * @file privados.demo.js
 * @description Demo interactivo: Campos privados con # en clases ES2022.
 */

export function render() {
  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Encapsulación con campos privados (<code>#</code>)</h2>
      <p class="js-subtitle">
        Desde ES2022, JavaScript soporta campos y métodos verdaderamente privados
        usando el prefijo <code>#</code>. Son inaccesibles desde fuera de la clase —
        el motor lanza un <strong>SyntaxError</strong> si intentas acceder a ellos directamente.
      </p>

      <!-- BANCO -->
      <div class="js-section-title">Cuenta bancaria con balance privado</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">
        <div>
          <div style="font-size:12px;color:var(--ion-color-medium);margin-bottom:4px;">Importe (€)</div>
          <input id="bank-amount" type="number" value="100" min="1" class="js-input" />
        </div>
        <div>
          <div style="font-size:12px;color:var(--ion-color-medium);margin-bottom:4px;">Contraseña</div>
          <input id="bank-pin" type="password" value="1234" class="js-input" />
        </div>
      </div>
      <div class="js-controls">
        <ion-button size="small" color="success"   id="btn-depositar">Depositar</ion-button>
        <ion-button size="small" color="warning"   id="btn-retirar">Retirar</ion-button>
        <ion-button size="small" color="primary"   id="btn-saldo">Ver saldo</ion-button>
        <ion-button size="small" color="danger"    id="btn-acceso-directo">Acceso directo a #balance</ion-button>
      </div>
      <div id="bank-out" class="js-output" style="min-height:60px;"></div>

      <!-- CÓDIGO -->
      <div class="js-section-title">Implementación con campos privados</div>
      <pre class="js-code-panel">class CuentaBancaria {
  #balance = 0;           // campo privado (no accesible desde fuera)
  #pin;                   // campo privado sin valor inicial
  #historial = [];        // campo privado

  constructor(pinInicial, saldoInicial = 0) {
    this.#pin = pinInicial;
    this.#balance = saldoInicial;
  }

  // Getter público — solo lectura del balance
  get saldo() { return this.#balance; }

  // Método privado — solo usado internamente
  #validarPin(pin) {
    return pin === this.#pin;
  }

  depositar(importe) {
    if (importe <= 0) throw new Error('El importe debe ser positivo');
    this.#balance += importe;
    this.#historial.push(`+${importe}€`);
    return this.#balance;
  }

  retirar(importe, pin) {
    if (!this.#validarPin(pin)) throw new Error('PIN incorrecto');
    if (importe > this.#balance) throw new Error('Saldo insuficiente');
    this.#balance -= importe;
    this.#historial.push(`-${importe}€`);
    return this.#balance;
  }

  historial() { return [...this.#historial]; } // copia, no referencia
}

const cuenta = new CuentaBancaria('1234', 500);
cuenta.saldo;              // 500 (getter público)
cuenta.#balance;           // ❌ SyntaxError: acceso privado denegado
cuenta.#validarPin('1234');// ❌ SyntaxError</pre>
    </section>
  `;
}

export function init(root) {
  class CuentaBancaria {
    #balance = 0;
    #pin;
    #historial = [];

    constructor(pinInicial, saldoInicial = 0) {
      this.#pin = pinInicial;
      this.#balance = saldoInicial;
    }

    get saldo() { return this.#balance; }

    #validarPin(pin) { return String(pin) === String(this.#pin); }

    depositar(importe) {
      if (importe <= 0) throw new Error('El importe debe ser positivo');
      this.#balance += importe;
      this.#historial.push(`+${importe}€`);
      return this.#balance;
    }

    retirar(importe, pin) {
      if (!this.#validarPin(pin)) throw new Error('PIN incorrecto');
      if (importe > this.#balance) throw new Error('Saldo insuficiente');
      this.#balance -= importe;
      this.#historial.push(`-${importe}€`);
      return this.#balance;
    }

    historial() { return [...this.#historial]; }
  }

  const cuenta = new CuentaBancaria('1234', 1000);
  const out = root.querySelector('#bank-out');

  function getImporte() { return Number(root.querySelector('#bank-amount').value) || 0; }
  function getPin()     { return root.querySelector('#bank-pin').value; }

  function mostrarEstado(mensaje, color = 'primary') {
    const hist = cuenta.historial();
    out.innerHTML = `
      <span style="color:var(--ion-color-${color})">${mensaje}</span><br><br>
      <strong>Saldo actual:</strong>
      <strong style="font-size:1.3em;color:var(--ion-color-${cuenta.saldo >= 0 ? 'success' : 'danger'})">${cuenta.saldo} €</strong><br>
      ${hist.length ? `<strong>Historial:</strong> ${hist.join(', ')}` : ''}
    `;
  }

  root.querySelector('#btn-depositar').addEventListener('click', () => {
    try {
      const nuevo = cuenta.depositar(getImporte());
      mostrarEstado(`✅ Depósito realizado. Nuevo saldo: ${nuevo} €`, 'success');
    } catch (e) {
      mostrarEstado(`❌ ${e.message}`, 'danger');
    }
  });

  root.querySelector('#btn-retirar').addEventListener('click', () => {
    try {
      const nuevo = cuenta.retirar(getImporte(), getPin());
      mostrarEstado(`✅ Retirada realizada. Nuevo saldo: ${nuevo} €`, 'warning');
    } catch (e) {
      mostrarEstado(`❌ ${e.message}`, 'danger');
    }
  });

  root.querySelector('#btn-saldo').addEventListener('click', () => {
    mostrarEstado(`Saldo consultado: ${cuenta.saldo} €`, 'primary');
  });

  root.querySelector('#btn-acceso-directo').addEventListener('click', () => {
    // No podemos realmente escribir cuenta.#balance en tiempo de ejecución
    // porque es un SyntaxError en tiempo de parseo.
    // Mostramos la explicación didáctica.
    out.innerHTML = `
      ❌ <strong>SyntaxError: campo privado inaccesible</strong><br><br>
      <pre class="js-code-panel" style="margin:0">cuenta.#balance;
// → SyntaxError: Private field '#balance' must be declared in an enclosing class</pre>
      <br>Los campos privados con <code>#</code> son verificados en <strong>tiempo de parseo</strong>,
      no en tiempo de ejecución. Es imposible acceder a ellos desde fuera,
      incluso con <code>Object.keys()</code> o reflexión. Son verdaderamente privados. ✅
    `;
  });

  // Estado inicial
  mostrarEstado('Cuenta creada con saldo inicial de 1000 €');
}
