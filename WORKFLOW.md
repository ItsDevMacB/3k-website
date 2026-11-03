# Flujo de trabajo con IA — Portafolio 3K

Este archivo se **versiona** y lo siguen las IA de **todos** (Mauricio, Brandon y Omar). Resumen ejecutable en `AGENTS.md`. Si cambias algo aquí, cámbialo allá y en `CONTEXT.md`.

## 1. La carpeta `docs/` es individual

`docs/` está en `.gitignore`: **cada persona tiene la suya, con sus propias tareas y preguntas**. No se comparte por GitHub. Todos respetan la **misma estructura y lógica** (formatos de §2) con sus propios datos, para que cualquier IA sepa leerla y mantenerla.

- Si `docs/` no existe o está vacía, la IA la crea con los formatos de §2, pregunta quién es el dueño (Mauricio, Brandon u Omar) y lo escribe en la cabecera de `docs/TASKS.md`.
- La cabecera de `docs/TASKS.md` y `docs/QUESTIONS.md` lleva `Dueño: <nombre>`.

## 2. Formatos de `docs/`

### `docs/TASKS.md`

```
# Tareas
Dueño: <Mauricio | Brandon | Omar>
Última actualización: AAAA-MM-DD

## Resumen (ordenado por prioridad)
| ID | Tarea | Prior. | Asignada a | Avance | Estado / bloqueo |

### T-NN · Título
- Prioridad: P0 | P1 | P2 | P3 (asignada por: usuario | IA)
- Estado: Pendiente | En curso | En revisión IA | Lista para verificar | Cerrada
- Avance: 0%
- Asignada a: Mauricio | Brandon | Omar
- Depende de:
- Descripción:
- Criterios de aceptación:
  - [ ] ...
- Falta para completar:
- Revisión IA: pendiente
- [ ] Verificado por el usuario

## Para otros (traspasos pendientes de enviar)
(mensajes listos para copiar, ver §5)

## Cerradas
```

### `docs/QUESTIONS.md`

```
# Preguntas abiertas
Dueño: <nombre>

- **Q-NN · Pregunta.** (afecta T-NN · quién debe responder)
  - Opciones o contexto
```

Las respondidas se **borran**; la información aclarada pasa a la tarea o a `CONTEXT.md`.

### `docs/README.md`
Índice de la carpeta y mapa de relaciones entre archivos.

## 3. Inicio de sesión, de workflow, o al cerrar una feature por completo

Siempre, en este orden:

1. Leer `CONTEXT.md`, `docs/TASKS.md` y `docs/QUESTIONS.md`; identificar al dueño.
2. Mostrar las **tareas pendientes** por prioridad (P0 → P3) con avance y bloqueos.
3. Mostrar las **preguntas abiertas**.
4. Preguntar: **¿hay tareas pendientes que los otros compañeros tengan contempladas para ti?** (siempre en un chat nuevo; con más énfasis si `docs/TASKS.md` está vacío). Quien asigna una tarea a otro se la manda por privado (§5).
5. Preguntar **cuál es la siguiente tarea** y resolver dudas.
6. Con las respuestas: actualizar las tareas con lo aclarado y **borrar** las preguntas respondidas; si cambia el estado del proyecto, actualizar `CONTEXT.md`.

## 4. Recibir una petición

| Tipo | Qué hace la IA |
| --- | --- |
| Pequeña y clara | La ejecuta |
| Ambigua | Pregunta; deja la duda en `QUESTIONS.md` si queda abierta |
| Grande (varios archivos, librerías, instalaciones) | Modo plan: plan editable + preguntas, y espera respuesta |
| Requiere skill o subagente nuevo | Lo pide al usuario; no lo agrega por su cuenta |
| Requiere instalar un paquete | Ver §8 |
| Cambio de UI/UX | Ver §6 |

## 5. Tareas para otra persona (traspasos)

Cuando la IA o el usuario detecta que una tarea la debería hacer otra persona (según los roles de `CONTEXT.md` §2):

1. Se registra en `docs/TASKS.md` con `Asignada a: <persona>` y prioridad.
2. Se agrega en «Para otros» un **mensaje listo para copiar** con: título, por qué le toca, contexto mínimo, criterios de aceptación, prioridad y fecha.
3. Quien asigna se lo manda **por privado**. La IA del receptor la incorporará a su `docs/TASKS.md` con este mismo formato (§3, paso 4).

## 6. Cambios de UI/UX

- **Si quien trabaja es Omar o Mauricio**: antes de implementar cualquier cambio de UI/UX (colores, tipografía, layout, animaciones, componentes visuales, accesibilidad visual), la IA **pregunta y explica el cambio a Brandon** (le prepara un resumen breve para enviarle) y espera confirmación de que se consultó. Si se salta esa consulta, la IA lo remarca, pide hacerlo bien y avisa a Brandon con un resumen del cambio.
- **Si quien trabaja es Brandon**: no se le pide aviso a sí mismo. Se usa el subagente **`ux-ui-reviewer`** (`.claude/agents/ux-ui-reviewer.md`) como diseñador UX/UI y revisor de accesibilidad independiente que cuida el contexto, la paleta y WCAG.
- En cualquier sesión el subagente puede revisar el cambio; no sustituye la consulta a Brandon.

## 7. Prioridades

| Nivel | Cuándo |
| --- | --- |
| **P0 Urgente** | Bloquea publicar o daña al usuario final: datos falsos en producción, sitio roto, falla legal/seguridad |
| **P1 Alta** | Afecta objetivos centrales (accesibilidad AA, rendimiento, SEO/lanzamiento, compatibilidad) o es prerrequisito de otras tareas |
| **P2 Media** | Mejora real, no bloquea el lanzamiento |
| **P3 Baja** | Pulido, marca a futuro, ideas |

Si el usuario fija una prioridad, manda la suya; si no, la IA asigna una según el análisis y lo marca «(IA)». Siempre se muestran primero P0 y P1. Una tarea bloqueada conserva su prioridad.

## 8. Dependencias y paquetes

- **Todo paquete que la IA necesite o recomiende requiere pregunta previa al usuario**, con nombre, **versión** y propósito. Antes de proponerlo, verificar que sea el original (`pnpm view <paquete>`: mantenedores, repositorio, licencia, fecha de publicación).
- Si se aprueba, **siempre `pnpm`** (nunca npm/yarn).
- Tras instalar: actualizar `CONTEXT.md` (stack) y revisar el diff del lockfile.

## 9. Cerrar una tarea

1. Se implementa.
2. La IA (o subagente/skill de testeo) revisa el código y ejecuta lo que aplique (`pnpm lint`, `pnpm format:check`, build, criterios).
3. Resultado:
   - **Incompleta**: se actualiza `Avance` (%) y `Falta para completar`.
   - **Completa**: `Revisión IA: terminada (fecha)` y estado «Lista para verificar».
4. Solo el **usuario** marca `[x] Verificado por el usuario`; entonces pasa a «Cerrada».
5. Al quedar cerrada: actualizar `CONTEXT.md`, **proponer el commit** (§10) y repetir §3.

## 10. Commits y ramas

La IA **propone** el commit solo cuando una tarea está confirmada por el usuario sin errores. Solo lo ejecuta (y hace push) si el usuario lo pide.

```
feat: resumen corto en imperativo

Feature: qué se agregó o resolvió
Errors: errores conocidos o pendientes (ninguno, si no hay)
Changes:
- cambio 1 (archivo o área)
- cambio 2
```

- `docs/` está ignorado: sus cambios nunca entran al commit; `CONTEXT.md`, `AGENTS.md`, `WORKFLOW.md` y `.claude/agents/` sí.
- **`main` se protege**: nada de trabajo directo ni push forzado a `main`. Para cambios medianos o grandes, riesgosos o que toquen varias áreas, la IA avisa y propone rama `feature/<tema>`, `fix/<tema>`, `chore/<tema>` o `docs/<tema>`, y cuándo borrarla (después de integrarla a `main` y verificar el despliegue), con el comando y esperando confirmación.

## 11. Mantener la documentación

Tras cualquier tarea que cambie estructura, stack, diseño, secciones, contenido o estado: actualizar `CONTEXT.md` (secciones, fecha y registro), `docs/TASKS.md` y `docs/QUESTIONS.md`. Si cambian las reglas de trabajo: `AGENTS.md` y este archivo.
