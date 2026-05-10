# Ionic CLI: comandos esenciales

Esta guía resume los comandos más usados de Ionic CLI para iniciar, desarrollar y preparar proyectos.

## Requisitos previos

```bash
node -v
npm -v
```

Instalar Ionic CLI de forma global:

```bash
npm install -g @ionic/cli
ionic -v
```

## Crear un proyecto nuevo

```bash
ionic start mi-app tabs --type=angular
cd mi-app
```

Plantillas comunes:

- blank
- sidemenu
- tabs

Frameworks soportados:

- angular
- react
- vue

## Versiones específicas por framework

### Ionic + Angular

Crear proyecto:

```bash
ionic start curso-ionic-angular tabs --type=angular
cd curso-ionic-angular
```

Desarrollo:

```bash
ionic serve
```

Generación con CLI de Ionic (disponible en Angular):

```bash
ionic g page dashboard
ionic g component shared/user-card
ionic g service core/api
```

### Ionic + React

Crear proyecto:

```bash
ionic start curso-ionic-react tabs --type=react
cd curso-ionic-react
```

Desarrollo:

```bash
ionic serve
```

Generación recomendada de componentes (React):

```bash
mkdir src/components
```

Nota: en React, `ionic generate` no se usa como en Angular; normalmente se crean archivos y componentes con la estructura propia de React.

### Ionic + Vue

Crear proyecto:

```bash
ionic start curso-ionic-vue tabs --type=vue
cd curso-ionic-vue
```

Desarrollo:

```bash
ionic serve
```

Generación recomendada de componentes (Vue):

```bash
mkdir src/components
```

Nota: en Vue, `ionic generate` tampoco es el flujo principal; se crean componentes `.vue` siguiendo la convención del proyecto.

### Ionic + JS puro (vanilla)

Ionic CLI no ofrece un template oficial con `--type=javascript`.
Para JS puro, el flujo recomendado es crear el proyecto con Vite e instalar Ionic Core.

Crear proyecto:

```bash
npm create vite@latest curso-ionic-js -- --template vanilla
cd curso-ionic-js
npm install
npm install @ionic/core ionicons
```

Desarrollo:

```bash
npm run dev
```

Si quieres empaquetar con Capacitor:

```bash
npm install @capacitor/core @capacitor/cli
npx cap init
```

### Usar Live Server con JS puro

Para clases o demos rápidas con archivos HTML/CSS/JS, también puedes usar Live Server en VS Code.

1. Instala la extensión Live Server.
2. Abre el archivo `index.html`.
3. Haz clic en `Go Live` (esquina inferior derecha).

Alternativa desde menú contextual:

1. Clic derecho sobre `index.html`.
2. Selecciona `Open with Live Server`.

Configuración recomendada (opcional) en `.vscode/settings.json`:

```json
{
	"liveServer.settings.port": 5500,
	"liveServer.settings.root": "/"
}
```

Notas prácticas:

- Live Server funciona muy bien para JS puro y contenido estático.
- Si usas Vite, prioriza `npm run dev` para tener mejor experiencia de desarrollo y manejo de módulos.
- No mezcles Live Server y Vite al mismo tiempo en el mismo proyecto para evitar confusiones de puertos y rutas.

## Tabla comparativa: Angular vs React vs Vue vs JS puro

| Aspecto | Ionic + Angular | Ionic + React | Ionic + Vue | Ionic + JS puro |
|---|---|---|---|---|
| Crear proyecto | `ionic start app tabs --type=angular` | `ionic start app tabs --type=react` | `ionic start app tabs --type=vue` | `npm create vite@latest app -- --template vanilla` + `npm i @ionic/core ionicons` |
| Servidor de desarrollo | `ionic serve` | `ionic serve` | `ionic serve` | `npm run dev` |
| Generación por CLI | `ionic g page/component/service` | No es flujo principal | No es flujo principal | No aplica |
| UI Ionic | `@ionic/angular` | `@ionic/react` | `@ionic/vue` | `@ionic/core` (Web Components) |
| Curva de aprendizaje | Media | Media | Media | Alta si no usas framework |
| Ideal para | Apps enterprise con estructura fuerte | Equipos React existentes | Equipos Vue existentes | Demo ligera o control total del DOM |

## Levantar entorno de desarrollo

```bash
ionic serve
```

Opciones útiles:

```bash
ionic serve --open
ionic serve --lab
ionic serve --port=8101
```

## Generar elementos (Angular)

```bash
ionic generate page perfil
ionic generate component avatar
ionic generate service auth
```

Atajo:

```bash
ionic g page ajustes
```

## Integración con Capacitor

Inicializar Capacitor:

```bash
ionic build
npx cap init
```

Agregar plataformas:

```bash
npx cap add android
npx cap add ios
```

Sincronizar cambios web con plataformas nativas:

```bash
ionic build
npx cap sync
```

Abrir IDE nativo:

```bash
npx cap open android
npx cap open ios
```

## Utilidades de mantenimiento

```bash
ionic info
ionic doctor check
ionic repair
```

Actualizar dependencias principales (según proyecto):

```bash
npm update
```

## Flujo recomendado para clase

1. Crear proyecto con `ionic start`.
2. Desarrollar en navegador con `ionic serve`.
3. Construir con `ionic build`.
4. Sincronizar nativo con `npx cap sync`.
5. Probar en Android/iOS con `npx cap open ...`.

## Errores frecuentes

- `ionic: command not found`: reinstalar CLI global o revisar PATH.
- Puerto ocupado: usar `ionic serve --port=8101`.
- Cambios no reflejados en nativo: ejecutar `ionic build` y luego `npx cap sync`.
