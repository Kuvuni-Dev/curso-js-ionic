# FAQ - Preguntas frecuentes

Respuestas a dudas comunes del curso.

## Sobre el curso

### ¿Cuál es el requisito previo?
Necesitas conocer JavaScript básico (variables, funciones, objetos). Si no lo tienes, revisa MDN JavaScript antes de comenzar.

### ¿Cuánto tiempo toma completar el curso?
- **Rápido**: 6-8 semanas (2-3 horas/semana)
- **Normal**: 10-12 semanas (4-5 horas/semana)
- **Profundo**: 15-20 semanas (8-10 horas/semana)

### ¿Puedo saltar algunos temas?
Sí, pero ten cuidado. Algunos temas dependen de otros:
- Async/await requiere entender Promises
- Clases usan Prototypes
- Ionic requiere JavaScript sólido

## Sobre las demos

### La demo no funciona. ¿Qué hago?
1. Abre la consola del navegador (F12)
2. Busca mensajes de error en rojo
3. Lee el error y busca en la documentación
4. Si aún no funciona, revisa los requisitos de tu navegador

### ¿Cómo copio el código de la demo?
- Selecciona y copia del área de código
- O usa "Inspeccionar elemento" (F12) para ver el HTML
- O descarga los archivos .demo.js del repositorio

### ¿Puedo modificar el código de la demo?
¡Sí! Eso es lo ideal. Experimenta, rompe cosas, aprende de los errores.

## Sobre JavaScript

### ¿Qué diferencia hay entre `const`, `let` y `var`?
- `var`: función-scope, hoisted, mutable (evita usar)
- `let`: bloque-scope, no hoisted, mutable
- `const`: bloque-scope, no hoisted, inmutable

### ¿Cuándo usar arrow functions y cuándo funciones normales?
- **Arrow**: callbacks, corto, no necesitas `this`
- **Normal**: métodos de objeto, constructoras, cuando necesites `this` dinámico

### ¿Qué es una promesa?
Un objeto que representa una operación futura que puede completarse (fulfilled) o fallar (rejected).

### ¿Es async/await mejor que promises?
No, son lo mismo. Async/await es syntax sugar sobre promises. Usa el que te sientas más cómodo.

## Sobre Ionic

### ¿Necesito React, Vue o Angular para usar Ionic?
No. Ionic funciona con vanilla JavaScript (como en este curso), pero también con React, Vue o Angular.

### ¿La app funciona en iOS y Android?
Las demos aquí son web-only. Para compilar apps reales, necesitas usar `ionic build`.

### ¿Cómo uso mis datos reales en Ionic?
Conecta tu API con `fetch()` o `XMLHttpRequest` en los eventos de tu componente.

### ¿Puedo guardar datos localmente?
Sí, con `localStorage` (datos de texto) o `indexedDB` (datos complejos).

## Problemas comunes

### "Cannot find module" o "Module not found"
La ruta del módulo es incorrecta. Verifica:
- Nombre del archivo (mayúsculas/minúsculas)
- Extensión `.js`
- Ruta relativa correcta

### Mi código se ejecuta dos veces
Posible causa: evento disparado dos veces. Usa `removeEventListener` o verifica que solo hay un listener.

### Fetch devuelve error CORS
Es un problema de seguridad del navegador. Usa APIs con soporte CORS o un proxy.

### ¿Por qué `this` es undefined?
Porque no se llamó dentro de un objeto. Usa `.bind()`, arrow functions, o llamalo como método.

### La app carga lenta
- Usa DevTools para perfilar (Performance tab)
- Reduce tamaño de imágenes
- Implementa lazy loading
- Minimiza el código

## Herramientas y entorno

### ¿Qué editor recomiendan?
VS Code es ideal: gratuito, poderoso, gran comunidad. Sublime Text y WebStorm también son buenos.

### ¿Necesito Node.js?
Opcional para este curso básico. Adelante, instálalo; será útil para proyectos futuros.

### ¿Cómo lanzo un servidor local?
Opción 1: Usa Live Server en VS Code (clic derecho → Open with Live Server)
Opción 2: `python -m http.server 8000` (si tienes Python)
Opción 3: Herramientas online como CodePen, Replit

### ¿Git es obligatorio?
No, pero sí recomendado. Aprenderlo ahora te ayudará en el futuro.

## Después del curso

### ¿Qué hago después de terminar?
- Construye un proyecto personal
- Contribuye a open source
- Prepárate para una entrevista técnica
- Explora frameworks (React, Vue, Angular)

### ¿Cómo me preparo para una entrevista de junior?
- Domina los temas del curso
- Practica problemas de algoritmos en LeetCode
- Prepara explicaciones claras de tus proyectos
- Estudia HTML, CSS y Git

### ¿Hay certificación?
No hay certificación formal aquí, pero completa el proyecto capstone como evidencia de aprendizaje.

## Contacto y soporte

### ¿Dónde pido ayuda?
- Documentación del curso en "Recursos"
- Stack Overflow para dudas técnicas
- Comunidades de desarrollo (Dev.to, Reddit)
- Pregunta a compañeros de clase

### ¿Hay actualizaciones al curso?
Sí. Este curso se actualiza regularmente con nuevos temas y correcciones.

---

¿No encontraste tu pregunta? ¡Búscala en los recursos o pregunta en la comunidad!
