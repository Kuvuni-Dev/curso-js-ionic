# Git y GitHub para principiantes

Esta guía explica desde cero cómo usar Git (control de versiones) y GitHub (repositorio remoto en la nube) dentro de tu flujo de trabajo.

## ¿Qué es Git?

Git es una herramienta para:

- Guardar versiones de tu código.
- Volver atrás si rompes algo.
- Trabajar en equipo sin sobrescribir cambios de otros.

Piensa en Git como el historial de cambios de tu proyecto.

## ¿Qué es GitHub?

GitHub es una plataforma online donde subes tus repositorios Git para:

- Tener copia en la nube.
- Compartir código.
- Colaborar con otros desarrolladores.
- Gestionar cambios con Pull Requests.

## Diferencia rápida

- Git: herramienta local en tu computadora.
- GitHub: servicio remoto en internet.

---

## Instalación y verificación

### 1) Instalar Git

Descarga e instala Git desde: [https://git-scm.com/downloads](https://git-scm.com/downloads)

### 2) Verificar instalación

```bash
git --version
```

Si aparece una versión (por ejemplo `git version 2.x.x`), está listo.

---

## Configuración inicial (solo una vez)

Git necesita tu nombre y correo para firmar commits.

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-correo@ejemplo.com"
```

Ver configuración actual:

```bash
git config --list
```

---

## Flujo básico de Git (local)

## Paso 1: Inicializar repositorio

```bash
git init
```

Crea una carpeta oculta `.git` con el historial del proyecto.

## Paso 2: Ver estado del proyecto

```bash
git status
```

Muestra:

- Archivos nuevos.
- Archivos modificados.
- Archivos listos para commit.

## Paso 3: Añadir cambios al área de preparación

```bash
git add archivo.js
```

O añadir todo:

```bash
git add .
```

## Paso 4: Crear commit

```bash
git commit -m "Agrega vista inicial de la app"
```

Un commit es una foto del estado de tus archivos en ese momento.

## Paso 5: Ver historial

```bash
git log --oneline
```

---

## Flujo con GitHub (remoto)

## Paso 1: Crear repositorio en GitHub

1. Entra a [https://github.com](https://github.com)
2. Click en `New repository`
3. Elige nombre y créalo

## Paso 2: Conectar tu proyecto local a GitHub

```bash
git remote add origin https://github.com/tu-usuario/tu-repo.git
```

Verificar remoto:

```bash
git remote -v
```

## Paso 3: Subir tu rama principal

```bash
git branch -M main
git push -u origin main
```

Después de esta primera vez, normalmente usarás:

```bash
git push
```

---

## Ciclo diario recomendado

Cada vez que avances en tu proyecto:

```bash
git status
git add .
git commit -m "Describe claramente tu cambio"
git push
```

Ejemplos de mensajes de commit:

- `Agrega formulario de login`
- `Corrige validación de email`
- `Actualiza estilos responsive en home`

---

## Trabajar con ramas (básico)

Las ramas te permiten trabajar sin romper la rama principal.

Crear una rama:

```bash
git checkout -b feature/camara-capacitor
```

Cambiar de rama:

```bash
git checkout main
git checkout feature/camara-capacitor
```

Subir rama a GitHub:

```bash
git push -u origin feature/camara-capacitor
```

---

## Comandos útiles de diagnóstico

Ver diferencias sin commit:

```bash
git diff
```

Ver ramas:

```bash
git branch
```

Traer cambios del remoto:

```bash
git pull
```

Eliminar archivo del stage (sin borrar archivo):

```bash
git restore --staged archivo.js
```

---

## Buenas prácticas

- Haz commits pequeños y frecuentes.
- Usa mensajes de commit claros.
- Haz `pull` antes de empezar si trabajas en equipo.
- No subas secretos (tokens, contraseñas, `.env`).
- Usa `.gitignore` para excluir archivos temporales.

Ejemplo de `.gitignore` básico:

```gitignore
node_modules/
.env
dist/
.DS_Store
```

---

## Errores comunes y cómo resolverlos

## "fatal: not a git repository"

No estás dentro de una carpeta con `.git`.

Solución:

```bash
cd ruta/de/tu/proyecto
git init
```

## "rejected" al hacer push

El remoto tiene cambios que tú no tienes.

Solución típica:

```bash
git pull --rebase
git push
```

## Commit con mensaje incorrecto

Si aún no hiciste push:

```bash
git commit --amend -m "Mensaje corregido"
```

---

## Mini práctica guiada

1. Crea una carpeta de prueba con un `index.html`.
2. Ejecuta `git init`.
3. Haz tu primer commit.
4. Crea un repo en GitHub.
5. Conecta remoto y haz `push`.
6. Modifica el archivo y repite el ciclo `add/commit/push`.

Al terminar esta práctica, ya dominas el flujo esencial de Git + GitHub.
