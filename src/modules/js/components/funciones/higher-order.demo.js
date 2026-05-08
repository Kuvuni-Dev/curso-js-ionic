/**
 * @file higher-order.demo.js
 * @description Demo interactivo: Funciones de orden superior (map, filter, reduce).
 */

const PRODUCTOS = [
  { nombre: 'Laptop',    precio: 999,  categoria: 'Tech',    stock: 5  },
  { nombre: 'Teclado',   precio: 79,   categoria: 'Tech',    stock: 20 },
  { nombre: 'Mouse',     precio: 35,   categoria: 'Tech',    stock: 15 },
  { nombre: 'Mochila',   precio: 55,   categoria: 'Ropa',    stock: 8  },
  { nombre: 'Camiseta',  precio: 25,   categoria: 'Ropa',    stock: 50 },
  { nombre: 'Monitor',   precio: 450,  categoria: 'Tech',    stock: 3  },
  { nombre: 'Libreta',   precio: 12,   categoria: 'Oficina', stock: 100 },
  { nombre: 'Bolígrafo', precio: 3,    categoria: 'Oficina', stock: 200 },
];

export function render() {
  const rows = PRODUCTOS.map(p => `
    <tr>
      <td>${p.nombre}</td>
      <td>${p.categoria}</td>
      <td>${p.precio} €</td>
      <td>${p.stock}</td>
    </tr>`).join('');

  return `
    <section class="page">
      <ion-button fill="clear" onclick="location.hash='#/js'">
        <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
        JavaScript
      </ion-button>

      <h2>Funciones de orden superior</h2>
      <p class="js-subtitle">
        Una <strong>función de orden superior</strong> (HOF) es aquella que recibe
        otra función como argumento o que devuelve una función. <code>map</code>,
        <code>filter</code> y <code>reduce</code> son los ejemplos más usados en JavaScript.
      </p>

      <!-- DATASET -->
      <div class="js-section-title">Dataset de productos</div>
      <div style="overflow-x:auto;margin-bottom:12px;">
        <table class="js-table">
          <thead><tr><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th></tr></thead>
          <tbody id="table-body">${rows}</tbody>
        </table>
      </div>

      <!-- OPERACIONES -->
      <div class="js-section-title">Aplica una operación</div>
      <div class="js-controls">
        <ion-button size="small" color="primary"   id="btn-map">map → precios con IVA</ion-button>
        <ion-button size="small" color="secondary" id="btn-filter-tech">filter → solo Tech</ion-button>
        <ion-button size="small" color="tertiary"  id="btn-filter-price">filter → precio &lt; 100€</ion-button>
        <ion-button size="small" color="success"   id="btn-reduce-total">reduce → total inventario</ion-button>
        <ion-button size="small" color="warning"   id="btn-chain">map + filter + reduce (cadena)</ion-button>
        <ion-button size="small" color="medium"    id="btn-reset">Reset</ion-button>
      </div>
      <div id="hof-output" class="js-output" style="min-height:50px;"></div>
      <pre id="hof-code" class="js-code-panel" style="display:none;"></pre>

      <!-- TEORÍA -->
      <div class="js-section-title">¿Qué hace cada método?</div>
      <pre class="js-code-panel">// .map(fn)  — transforma cada elemento, devuelve nuevo array del mismo tamaño
const dobles = [1,2,3].map(n => n * 2);       // [2, 4, 6]

// .filter(fn) — filtra elementos, devuelve nuevo array (puede ser más pequeño)
const pares = [1,2,3,4].filter(n => n % 2 === 0); // [2, 4]

// .reduce(fn, inicial) — acumula un único valor a partir de todos los elementos
const suma = [1,2,3,4].reduce((acc, n) => acc + n, 0); // 10

// Las tres se pueden encadenar:
const resultado = datos
  .filter(p => p.categoria === 'Tech')   // 1. filtra
  .map(p => p.precio * 1.21)             // 2. transforma
  .reduce((total, p) => total + p, 0);   // 3. acumula</pre>
    </section>
  `;
}

export function init(root) {
  const out  = root.querySelector('#hof-output');
  const code = root.querySelector('#hof-code');
  const tbody = root.querySelector('#table-body');

  function showResult(html, codeText) {
    out.innerHTML = html;
    code.style.display = 'block';
    code.textContent = codeText;
  }

  function resetTable() {
    tbody.innerHTML = PRODUCTOS.map(p => `
      <tr><td>${p.nombre}</td><td>${p.categoria}</td><td>${p.precio} €</td><td>${p.stock}</td></tr>
    `).join('');
  }

  root.querySelector('#btn-map').addEventListener('click', () => {
    const conIva = PRODUCTOS.map(p => ({ ...p, precioIva: +(p.precio * 1.21).toFixed(2) }));
    tbody.innerHTML = conIva.map(p => `
      <tr><td>${p.nombre}</td><td>${p.categoria}</td>
          <td>${p.precio} €</td>
          <td style="color:var(--ion-color-primary);font-weight:600">${p.precioIva} € (+IVA)</td></tr>
    `).join('');
    showResult(
      `<code>.map()</code> transformó ${conIva.length} productos añadiendo IVA (21%).`,
      `const conIva = productos.map(p => ({\n  ...p,\n  precioIva: +(p.precio * 1.21).toFixed(2)\n}));`
    );
  });

  root.querySelector('#btn-filter-tech').addEventListener('click', () => {
    const tech = PRODUCTOS.filter(p => p.categoria === 'Tech');
    tbody.innerHTML = tech.map(p => `
      <tr><td>${p.nombre}</td><td style="color:var(--ion-color-secondary);font-weight:600">${p.categoria}</td>
          <td>${p.precio} €</td><td>${p.stock}</td></tr>
    `).join('');
    showResult(
      `<code>.filter()</code> dejó ${tech.length} de ${PRODUCTOS.length} productos (solo Tech).`,
      `const tech = productos.filter(p => p.categoria === 'Tech');`
    );
  });

  root.querySelector('#btn-filter-price').addEventListener('click', () => {
    const baratos = PRODUCTOS.filter(p => p.precio < 100);
    tbody.innerHTML = baratos.map(p => `
      <tr><td>${p.nombre}</td><td>${p.categoria}</td>
          <td style="color:var(--ion-color-success);font-weight:600">${p.precio} €</td>
          <td>${p.stock}</td></tr>
    `).join('');
    showResult(
      `<code>.filter()</code> dejó ${baratos.length} productos con precio &lt; 100 €.`,
      `const baratos = productos.filter(p => p.precio < 100);`
    );
  });

  root.querySelector('#btn-reduce-total').addEventListener('click', () => {
    const total = PRODUCTOS.reduce((acc, p) => acc + p.precio * p.stock, 0);
    resetTable();
    showResult(
      `<code>.reduce()</code> calculó el valor total del inventario:
       <strong style="color:var(--ion-color-success);font-size:1.2em">${total.toLocaleString('es-ES')} €</strong>`,
      `const total = productos.reduce(\n  (acc, p) => acc + p.precio * p.stock,\n  0\n); // ${total} €`
    );
  });

  root.querySelector('#btn-chain').addEventListener('click', () => {
    const totalTechIva = PRODUCTOS
      .filter(p => p.categoria === 'Tech')
      .map(p => p.precio * 1.21)
      .reduce((acc, precio) => acc + precio, 0);
    resetTable();
    showResult(
      `Cadena <code>filter → map → reduce</code>:<br>
       Total productos Tech con IVA:
       <strong style="color:var(--ion-color-warning);font-size:1.2em">${totalTechIva.toFixed(2)} €</strong>`,
      `const totalTechIva = productos\n  .filter(p => p.categoria === 'Tech')\n  .map(p => p.precio * 1.21)\n  .reduce((acc, precio) => acc + precio, 0);`
    );
  });

  root.querySelector('#btn-reset').addEventListener('click', () => {
    resetTable();
    out.innerHTML = '';
    code.style.display = 'none';
  });
}
