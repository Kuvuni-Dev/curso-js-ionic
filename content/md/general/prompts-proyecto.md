# Historial de prompts del proyecto

Esta página recoge todos los mensajes clave enviados al asistente de IA (GitHub Copilot) durante el desarrollo de esta aplicación didáctica. Sirve como referencia de cómo se construyó el proyecto paso a paso usando prompts en lenguaje natural.

---

## Fase 1 — Arranque y estructura del proyecto

### Prompt 1
> Quiero crear una aplicación con Ionic vanilla (sin framework) que se sirva con Live Server. La carpeta del proyecto es `d:\CursoIonic\ProyectosJS\curso-js-ionic`. El proyecto es didáctico, para un curso de JavaScript avanzado e Ionic de 30 horas. Al final del curso se desplegará en Android e iOS con Capacitor.

**Resultado:** Estructura de carpetas completa, `index.html` con Ionic CDN, configuración de Live Server (`.vscode/settings.json`, `.vscode/extensions.json`) y `.gitignore`.

---

### Prompt 2
> Crea el app shell: header con logo y título, segmento de navegación (Inicio / JS / Ionic / Documentación) y un área de contenido principal.

**Resultado:** `index.html` con `ion-header`, `ion-toolbar`, `ion-segment` de 4 pestañas y `<main id="app">`.

---

### Prompt 3
> Modulariza el JavaScript. Quiero archivos separados para el router, el tema claro/oscuro y cada sección de la app.

**Resultado:** 8 módulos ES: `main.js`, `router.js`, `theme.js`, `home.view.js`, `js.view.js`, `ionic.view.js`, `content.service.js`, `content.view.js`, `dom.js`.

---

## Fase 2 — Tema y estilos

### Prompt 4
> Añade un toggle de modo claro/oscuro en el header. La etiqueta debe decir "Claro" u "Oscuro" según el estado activo.

**Resultado:** `theme.js` con `initTheme()`, detección de `prefers-color-scheme` y toggle de la clase `ion-palette-dark` en `<html>`.

**Problema resuelto:** El toggle mostraba "ClaroOscuro" porque `ion-label` con shadow DOM acumulaba texto. Se sustituyó por un `<span>` nativo.

---

### Prompt 5
> Define una paleta de colores completa para la app: violeta, cian y rosa para modo claro; lavanda sobre fondo navy para modo oscuro.

**Resultado:** `themes.css` con todos los tokens de Ionic (`--ion-color-primary`, etc.) más variables propias (`--app-bg`, `--app-accent`, `--app-surface`, `--app-border`, `--app-code-bg`).

---

### Prompt 6
> Las pestañas del segmento de navegación no se ven en modo oscuro. Corrígelo.

**Resultado:** Reglas CSS explícitas en `ion-segment-button` con color negro para modo claro y blanco para modo oscuro. Se añadieron también correcciones para `ion-card-title` e `ion-label` en modo oscuro.

---

## Fase 3 — Header, footer y favicon

### Prompt 7
> Añade un favicon. Usa el archivo `assets/logo.png`.

**Resultado:** `<link rel="icon" href="assets/logo.png">` en `index.html`.

---

### Prompt 8
> Añade un footer con copyright "KuvuniDev - Julián González" y links a GitHub (`https://github.com/Kuvuni-Dev`) y LinkedIn (`https://linkedin.com/in/juliangm`) con sus iconos SVG.

**Resultado:** `ion-footer` con `.app-footer`, `.footer-links` y dos `<a>` con SVGs inline de GitHub y LinkedIn.

---

## Fase 4 — Lector de documentación Markdown

### Prompt 9
> Quiero una sección de documentación que lea archivos Markdown y los muestre formateados. Los documentos deben organizarse por categorías: JavaScript, Ionic y General.

**Resultado:** `content.service.js` con `fetchDocsIndex()` y `fetchDoc()`, `content.view.js` con agrupación por categorías y cards con chips de colores, `content/md/index.json` como índice.

---

### Prompt 10
> Crea 5 documentos Markdown de contenido real para el curso: introducción general, closures, programación asíncrona, guía de componentes Ionic y navegación en Ionic.

**Resultado:** 5 archivos `.md` en `content/md/general/`, `content/md/javascript/` y `content/md/ionic/`.

---

### Prompt 11
> Organiza los archivos Markdown en subcarpetas por categoría: `general/`, `javascript/`, `ionic/`. Actualiza las rutas en `index.json`.

**Resultado:** Archivos movidos a subcarpetas y `path` actualizado en `index.json` para cada documento.

---

## Fase 5 — Demos interactivos de componentes Ionic

### Prompt 12
> Quiero demos individuales para cada componente Ionic. Cada demo debe mostrar variantes visuales, código de ejemplo y un elemento interactivo. Crea los demos para: `ion-button`, `ion-input`, `ion-card`, `ion-list` y `ion-toggle`.

**Resultado:** 5 archivos `*.demo.js` en `src/modules/ionic/components/`. Cada uno exporta `render()` (HTML) e `init(container)` (listeners). Incluyen comentarios JSDoc para el alumno.

---

### Prompt 13
> Reescribe `ionic.view.js` como catálogo dinámico. Debe mostrar la lista de componentes disponibles y navegar a `#/ionic/:nombre` al pulsar uno. Añade la ruta correspondiente al router y los estilos CSS necesarios para los demos.

**Resultado:**
- `ionic.view.js` reescrito con array `COMPONENTS` y `renderIonicComponent()` con `import()` dinámico.
- `router.js` actualizado: si `view === 'ionic'` y hay `param`, usa la ruta `'ionic-component'`.
- `main.js` actualizado: importa `renderIonicComponent` y la registra en el objeto de rutas.
- `styles.css` ampliado con `.demo-page`, `.demo-header`, `.demo-group`, `.demo-group-title`, `.demo-group-desc`, `.demo-row`, `.demo-row--align-center`, `.demo-code`.

---

### Prompt 14
> Añade también un documento de todos los prompts que hemos realizado para este proyecto.

**Resultado:** Este archivo (`prompts-proyecto.md`), registrado en `index.json` bajo la categoría `general`.

---

## Fase 6 — Catálogo por categorías

### Prompt 15
> Vamos a categorizar los componentes de Ionic por categorías. Si añadimos también estructura (ion-app, ion-page, ion-router, ...).

**Resultado:** `ionic.view.js` reescrito con un array `CATEGORIES` de 6 grupos. Cada categoría tiene `label`, `color`, `icon` y una lista de componentes. Los componentes con demo son clicables; los demás aparecen deshabilitados con el badge "Próximamente". Se añadieron los estilos `.catalog-category` y `.catalog-category-header` en `styles.css`.

**Categorías creadas:**

| Categoría | Color | Destacados |
|---|---|---|
| Estructura | Tertiary | `ion-app`, `ion-page`, `ion-router`, `ion-content`, `ion-header`... |
| Botones y acciones | Primary | `ion-button` ✅, `ion-fab`, `ion-back-button` |
| Formularios | Success | `ion-input` ✅, `ion-toggle` ✅, `ion-checkbox`, `ion-select`... |
| Layout y contenido | Warning | `ion-card` ✅, `ion-list` ✅, `ion-grid`, `ion-chip`... |
| Navegación | Secondary | `ion-tabs`, `ion-segment`, `ion-menu`... |
| Feedback y overlays | Danger | `ion-alert`, `ion-toast`, `ion-modal`... |

---

### Prompt 16
> Añade más componentes de UI.

**Resultado:** Catálogo ampliado de 37 a **68 componentes**. Se añadió una 7.ª categoría **Interacción y scroll**. Principales incorporaciones:

- `ion-split-pane`, `ion-title`, `ion-buttons` → Estructura
- `ion-fab-list`, `ion-action-sheet` → Botones y acciones
- `ion-radio-group`, `ion-select-option`, `ion-datetime`, `ion-datetime-button`, `ion-picker` → Formularios
- `ion-accordion/group`, `ion-item-divider/group`, `ion-row`, `ion-col`, `ion-note`, `ion-text`, `ion-label`, `ion-img`, `ion-icon`, `ion-progress-bar` → Layout y contenido
- `ion-item-sliding/options/option`, `ion-reorder/group`, `ion-infinite-scroll`, `ion-refresher` → Interacción y scroll *(categoría nueva)*
- `ion-segment-button`, `ion-breadcrumbs`, `ion-menu-button` → Navegación

---

### Prompt 17
> Añade los últimos prompts al proyecto.

**Resultado:** Este mismo archivo actualizado con los prompts 15, 16 y 17.

---

## Patrones aprendidos durante el desarrollo

| Problema | Solución |
|---|---|
| Toggle no funcionaba al cargar | `customElements.whenDefined('ion-toggle').then(init)` — esperar a que Ionic registre el elemento |
| Etiqueta acumulaba texto duplicado | Usar `<span>` nativo en lugar de `<ion-label>` para texto fuera de listas |
| Demos JS cargaban todos al inicio | `import()` dinámico: cada demo se importa solo cuando el alumno lo abre |
| Contraste en modo oscuro | Variables CSS explícitas para cada componente problemático |

---

## Pendiente

- [ ] Demos interactivos para la sección JavaScript (closures, async/await, patrones)
- [ ] Demos de componentes: `ion-modal`, `ion-toast`, `ion-alert`, `ion-tabs`, `ion-select`, `ion-checkbox`, `ion-range`, `ion-accordion`...
- [ ] Integración con Capacitor para build web, Android e iOS
