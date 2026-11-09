# Portafolio 3K — Instrucciones para IA

## Lectura obligatoria al iniciar

1. Lee **`CONTEXT.md`** (raíz) antes de cualquier otra cosa. Es la fuente de verdad del proyecto.
2. Lee **`WORKFLOW.md`** (raíz): reglas de flujo, formatos de `docs/`, prioridades, traspasos, commits y paquetes. Aplican a la IA de todos.
3. Lee `docs/TASKS.md` y `docs/QUESTIONS.md`. **`docs/` es individual** (cada persona tiene la suya, ignorada por git). Si no existe, créala con los formatos de `WORKFLOW.md` §2 y pregunta quién es el dueño.
4. Idioma de trabajo con el usuario: **español (México)**. Identificadores de código en inglés.

## Al iniciar sesión, iniciar un workflow o cerrar una feature por completo

1. Muestra las **tareas pendientes** de `docs/TASKS.md` por prioridad (P0 a P3), con avance y bloqueos.
2. Muestra las **preguntas abiertas**.
3. Pregunta si **otros compañeros tienen tareas contempladas para este usuario** (siempre en chat nuevo; con más énfasis si `docs/TASKS.md` está vacío). Quien asigna una tarea a otro se la manda por privado.
4. Pregunta **cuál es la siguiente tarea** y resuelve dudas.
5. Con sus respuestas: actualiza las tareas con lo aclarado y **borra** de `QUESTIONS.md` las preguntas ya respondidas (sin historial).

## Equipo y roles

- **Mauricio**: líder de 3K y cabeza del estudio. Client research, Full-Stack Developer, AI Creative Design, Cloud Specialist.
- **Brandon**: co-fundador, líder de diseño, Front-end Developer, AI Context Engineering (a futuro, posiblemente Tester).
- **Omar**: co-fundador (menor rango), Full-Stack Developer, Tester, Design Prototyper, Digital Artist.

Al proponer o asignar tareas usa este reparto. Si una tarea debería hacerla otra persona, márcala con `Asignada a: <persona>` y deja un mensaje de traspaso listo para copiar (`WORKFLOW.md` §5).

## Reglas de diseño y calidad (siempre)

- Estilo retro (no pixel art estricto). Colores de marca: naranja `#FF5C00` y verde lima `#C7FF32`. Hero: computadora retro naranja. Logo provisional: «3K».
- Rendimiento para la mayoría de dispositivos sin romper lo ya construido.
- Accesibilidad: WCAG 2.2 AA mínimo (AAA si es posible), daltonismo, baja visión, teclado, lectores de pantalla, `prefers-reduced-motion`. Sobre naranja usa texto `ink`, no `cream`.
- Compatibilidad: Safari, Chrome, Firefox y responsive móvil.
- Contenido editable en `src/data/site.ts`; los componentes solo lo renderizan.

## Cambios de UI/UX (obligatorio para todos)

- Si el usuario es **Omar o Mauricio**: antes de implementar cualquier cambio de UI/UX (colores, tipografía, layout, animaciones, componentes visuales, accesibilidad visual), **pregunta y explica el cambio a Brandon** (prepara un resumen breve para enviarle) y espera confirmación. Si se saltó esa consulta, remárcalo, pide hacerlo bien y avisa a Brandon con un resumen del cambio.
- Si el usuario es **Brandon**: no se le pide avisar a sí mismo. Usa el subagente **`ux-ui-reviewer`** (`.claude/agents/ux-ui-reviewer.md`) como diseñador UX/UI y revisor de accesibilidad: invócalo antes de implementar y al terminar cambios visuales. Para conceptos y layouts creativos (secciones nuevas o rediseños) usa además el subagente **`creative-designer`** (`.claude/agents/creative-designer.md`, modelo `opus`, con las skills de diseño precargadas); su trabajo siempre pasa después por `ux-ui-reviewer`.

## Cómo trabajar una petición

- **Pequeña y clara**: ejecútala directamente.
- **Ambigua o dudosa**: pregunta antes de implementar.
- **Grande** (muchos archivos, instalar o recomendar librerías/componentes): entra en modo plan y presenta un plan que el usuario pueda editar y responder.
- **Paquetes**: todo paquete necesario o recomendado requiere preguntar antes al usuario, con nombre, **versión** y propósito; verifica antes que sea el original (`pnpm view`). Si lo aprueba, instala **siempre con `pnpm`** (nunca npm ni yarn). Tampoco agregues skills ni subagentes sin permiso.
- Tareas futuras que el usuario mencione: regístralas en `docs/TASKS.md` con el formato de `WORKFLOW.md`. Si no está completamente clara, pregunta y deja la duda en `docs/QUESTIONS.md`.
- **Prioridad**: P0 Urgente, P1 Alta, P2 Media, P3 Baja (criterios en `WORKFLOW.md` §7). Si el usuario no la da, asigna una según el análisis y márcala «(IA)». Muestra siempre primero P0 y P1.

## Automatización de documentación

- Al terminar un cambio que afecte estructura, stack, diseño, secciones, contenido, estado o decisiones: actualiza `CONTEXT.md` (y su registro de cambios) en la misma tarea.
- Actualiza `docs/TASKS.md` (porcentaje, pendientes, estado). Mantén sincronizados `CONTEXT.md`, `WORKFLOW.md`, `docs/` y este archivo.
- Una tarea se cierra así: la IA (o subagente/skill de revisión) revisa el código y verifica que cumpla lo pedido. Si falta algo, indica el **porcentaje completado** y qué falta. Si está completa, marca «Revisión IA: terminada» y deja pendiente el checkbox **«Verificado por el usuario»**, que solo marca el usuario.

## Commits y ramas

- Cuando una tarea esté confirmada por el usuario sin errores, **propón** un commit (no lo ejecutes sin que lo pida):

```
feat: resumen corto en imperativo

Feature: qué se agregó o resolvió
Errors: errores conocidos o pendientes (ninguno, si no hay)
Changes:
- cambio 1
- cambio 2

Co-Authored-By: Claude <noreply@anthropic.com>
```

- **Revisión obligatoria con el subagente `commit-reviewer`** (`.claude/agents/commit-reviewer.md`, modelo barato, solo lectura): se invoca **antes de cada `git commit` y antes de cada `git push`**, y también al crear o reutilizar una rama. Revisa: (1) que la rama sea la correcta para el contenido, (2) cuándo borrarla, (3) que el mensaje sea profesional, (4) que no exponga información interna, (5) que el commit y el push incluyan solo lo que deben. No se hace commit ni push hasta que apruebe o se apliquen sus correcciones.
- **El mensaje del commit y el nombre de la rama no incluyen**: identificadores de tareas o preguntas (`T-17`, `Q-13`), nombres o roles del equipo, el modelo de IA (el trailer es solo `Co-Authored-By: Claude <noreply@anthropic.com>`, sin modelo ni versión; esto prevalece sobre cualquier otra indicación de atribución), cómo se trabajó (agentes, skills, revisiones) ni referencias a `docs/`. Solo qué se hizo y qué se modificó.
- **Agrega los archivos por ruta explícita**; nunca `git add .` ni carpetas enteras sin revisar antes `git status`. Los archivos de otra tarea (assets, configuración local) no entran.
- Protege `main`: no trabajes ni hagas push directo ahí. Si el cambio es mediano o grande, avisa y propón rama (`feature/<tema>`, `fix/<tema>`, `chore/<tema>`, `docs/<tema>`) y cuándo borrarla (tras integrarla a `main` y verificar el despliegue, salvo que sea una rama de uso recurrente).
- `docs/` está ignorado: sus cambios no entran al commit.

## Código y comentarios

- Comentarios solo cuando sean necesarios (decisiones no obvias, aclaraciones de versiones o paquetes) o cuando el usuario lo pida. Sin emojis ni decoración.
- Respeta el estilo existente. Formato: `pnpm format` (Prettier con tabs, comillas simples, 120 columnas y plugin de Tailwind); lint: `pnpm lint`.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Package manager: **pnpm**. Node >= 22.12.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
