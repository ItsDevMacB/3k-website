# CONTEXT — Portafolio 3K

> **Lo primero que se lee en cada conversación.** Fuente de verdad del proyecto. Si algo del código contradice este archivo, se corrige el que esté mal y se anota en el [Registro de cambios](#13-registro-de-cambios).
> Última verificación contra el código: **2026-11-02** (commit `5d4ec18` + cambios sin commitear).
> **Reglas fijas:** (1) todo paquete necesario o recomendado por la IA se **pregunta al usuario primero** (nombre y versión) y, si se aprueba, se instala **siempre con `pnpm`** por seguridad; (2) `main` se protege (ver `WORKFLOW.md` §10); (3) al iniciar sesión se muestran tareas pendientes y se pregunta cuál sigue, y si otros compañeros tienen tareas contempladas para el usuario; (4) **cambios de UI/UX**: Omar y Mauricio siempre preguntan y explican a Brandon antes de implementar; en sesiones de Brandon se usa el subagente `ux-ui-reviewer`; (5) `docs/` es individual por persona con el mismo formato (`WORKFLOW.md` §1–2).

Archivos relacionados: [`AGENTS.md`](AGENTS.md) (`CLAUDE.md` es un symlink a este) · [`WORKFLOW.md`](WORKFLOW.md) (flujo de sesión, formatos de `docs/`, prioridades, traspasos, commits y paquetes; compartido por todos) · [`.claude/agents/ux-ui-reviewer.md`](.claude/agents/ux-ui-reviewer.md) (subagente UX/UI y accesibilidad) · `docs/` (**individual por persona**, local, no se sube a GitHub): `docs/README.md`, `docs/TASKS.md`, `docs/QUESTIONS.md`.

---

## 1. Qué es

Sitio portafolio de **3K** (nombre provisional del estudio). One-page en español (México), estilo **retro** (no pixel art estricto), con una **computadora retro naranja** como imagen del hero. Estudio digital independiente de 3 personas en Puebla, MX: sitios web, e-commerce, sistemas a medida, automatización y soporte.

Dominio de producción: **https://3k.software/**.

Lema actual del hero: «Hacemos cosas digitales que se quedan.» Concepto interno de marca: **Digital Playground**.

## 2. Equipo y roles

| Persona | Cargo y roles | Se encarga de |
| --- | --- | --- |
| **Mauricio** | Líder de 3K y cabeza del estudio. Client research, Full-Stack Developer, AI Creative Design, Cloud Specialist | Dirección, clientes, producto/marca, prioridades, nube y hosting (Cloudflare, dominio, despliegue), back |
| **Brandon** | Co-fundador. Líder de diseño, Front-end Developer, AI Context Engineering (a futuro, posiblemente Tester) | UI/UX, sistema visual, componentes, animaciones, accesibilidad visual, contexto para IA |
| **Omar** | Co-fundador (menor rango). Full-Stack Developer, Tester, Design Prototyper, Digital Artist | Desarrollo full-stack, pruebas, prototipos de diseño, arte visual/ilustración, integraciones |

Al asignar o proponer tareas, usar este reparto (campo *Asignada a* en `docs/TASKS.md`; traspasos en `WORKFLOW.md` §5). Estos roles también alimentan la sección Equipo del sitio (T-13). En `src/data/site.ts` los roles públicos hoy son «Líder del estudio», «Diseño» y «Desarrollo» (decisión: se dejan así por ahora; como los tres son developers, la sección Equipo se redefinirá en T-13).

## 3. Stack

| Capa | Tecnología | Versión (package.json) |
| --- | --- | --- |
| Framework | Astro (sitio estático, sin adaptador activo) | ^7.2.8 |
| Estilos | Tailwind CSS v4 vía `@tailwindcss/vite` (config en CSS con `@theme`, sin `tailwind.config`) | ^4.3.3 |
| Scroll suave | Lenis | ^1.3.26 |
| Hosting | Cloudflare (`wrangler.json`, `pages_build_output_dir: ./dist`); dominio `3k.software`. Pages vs Workers por confirmar (T-12) | wrangler ^4.126.0 |
| Calidad | ESLint 10 (flat) + typescript-eslint + eslint-plugin-astro, Prettier 3 + prettier-plugin-astro + prettier-plugin-tailwindcss (0.8.1, instalado 2026-11-02; verificado como paquete oficial de `tailwindlabs`) | ver package.json |
| Paquetes | **pnpm** (`pnpm-workspace.yaml`), Node ≥ 22.12 (`.nvmrc`: v26.7.0) | — |
| Lenguaje | TypeScript estricto (`astro/tsconfigs/strict`) | — |

Subagente de IA del proyecto: `ux-ui-reviewer` (`.claude/agents/`), revisor UX/UI y accesibilidad; actúa como Brandon cuando él no está.

Sin framework de UI (React/Vue/etc.): todo es `.astro` + `<script>` con TypeScript vanilla. Sin tests, sin CI, sin backend.

Scripts (`package.json`): `dev`, `build`, `preview`, `astro`, `generate-types`, `lint`, `lint:fix`, `format`, `format:check`. `pnpm lint`, `pnpm format` y `pnpm format:check` funcionan (T-02).

## 4. Estructura del proyecto

```
/
├── AGENTS.md / CLAUDE.md(symlink)   instrucciones para IA
├── CONTEXT.md                       este archivo
├── docs/                            (gitignored) tareas, preguntas, flujo
├── astro.config.mjs                 solo plugin Tailwind (vite)
├── wrangler.json                    Cloudflare Pages
├── eslint.config.js · .prettierrc.json · tsconfig.json
├── public/
│   ├── favicon.svg
│   └── cursors/{arrow,hand}.svg     cursores pixelados
└── src/
    ├── pages/index.astro            única página; ensambla secciones + script de reveal
    ├── layouts/Layout.astro         <head>, fuentes, Lenis, overlay CRT, flags ?static/#figmacapture
    ├── styles/global.css            tokens @theme + utilidades (.btn, .window, .kicker, .dither, .boil…)
    ├── data/site.ts                 TODO el contenido editable (textos, proyectos, equipo, contacto)
    ├── components/                  ver §6
    └── assets/
        ├── retro-computer.png       1024×1024 RGBA (hero y stop motion)
        ├── projects/*.jpg           1264×848 (bordicrea, egresados, 3k-studio, mathmass)
        └── icons/*.svg              computer, cursor, facebook, instagram, tiktok
```

Regla: el **contenido va en `src/data/site.ts`**, los componentes solo renderizan. Los estilos globales y tokens en `global.css`; estilos específicos de un componente en su `<style>` (scoped).

## 5. Diseño

### 5.1 Paleta (tokens `@theme` en `global.css`)

| Token | Hex | Uso |
| --- | --- | --- |
| `orange` | `#FF5C00` | **Color de marca principal**: CTAs, acentos, scrollbar, footer |
| `lime` | `#C7FF32` | **Color de marca secundario**: resaltados, pills, estados «ok» |
| `orange-dark` | `#D94E00` | Reservado (sin uso relevante hoy) |
| `cream` | `#F4F3EF` | Fondo base del body |
| `stone` | `#D6D5D1` | Paneles neutros (equipo) |
| `ink` | `#101010` | Texto, bordes, sombras pixel, secciones oscuras |
| `ink-2` / `ink-3` | `#1F222A` / `#35383F` | Superficies oscuras secundarias |
| `phosphor` | `#9DFF6A` | Verde fósforo CRT (reservado) |

**Contraste medido (WCAG 2.x):** ink/cream 17.1 · ink/orange 6.2 · ink/lime 16.1 · **cream/orange 2.8 (falla AA)** · **orange/cream 2.8 (falla AA)** · **orange/stone 2.1 (falla)** · **lime/cream 1.1 (falla)**.

Reglas de color (propuestas, detalle y 20 incumplimientos ubicados en `docs/TASKS.md` T-09):
1. Sobre naranja, texto `ink` (6.15), nunca `cream`; con opacidad, mínimo `ink/80`.
2. Naranja como texto solo sobre `ink`.
3. Lima como texto solo sobre `ink`; como fondo, con texto `ink`.
4. `orange-dark` `#D94E00` no sirve para texto (3.75 con cream); alternativas oscuras: `#B83F00` (5.04 sobre cream) o `#9C3500` (4.89 sobre stone).
5. AAA (7:1) solo es alcanzable sobre cream/ink; sobre naranja el máximo es AA.
Estado: hoy el sitio incumple AA en esos puntos; se corrige en T-09 (pendiente de Q-11).

### 5.2 Tipografías

Cargadas desde **Google Fonts** (externo, `display=swap`) en `Layout.astro`:

| Token | Fuente | Rol |
| --- | --- | --- |
| `font-display` | Archivo Black | Títulos, nombres, botones grandes |
| `font-sans` | Inter 400/500/600/700 | Texto corrido |
| `font-mono` | JetBrains Mono 500/700 | Kickers `[ SECCIÓN ]`, botones, etiquetas |
| `font-pixel` | VT323 | Pantallas CRT, comandos, ventanas, reloj |

Notas: VT323 no tiene `↗` (usar mono). Hay textos de 10–11 px (kickers, etiquetas) que no cumplen tamaño recomendado para baja visión (T-09).

### 5.3 Estilo y lenguaje visual

- Retro «sistema operativo clásico»: ventanas (`.window` + `.window-bar` con nombres tipo `archivo.exe`), barra de tareas en el footer con reloj y estado «en línea», comandos de terminal (`$ 3k build --web`), código Konami.
- Bordes gruesos `2px ink`, **sombras pixel duras** (`--shadow-pixel` 6px, `-sm` 3px), esquinas medianas/redondas, botones tipo píldora que «se presionan».
- Fondos con cuadrícula (`.grid-bg`), puntos (`.dots-bg`), transiciones de tramado **dither** entre secciones (`.dither`, `.dither-up`).
- Overlay **CRT** global muy sutil (`.crt-overlay`, scanlines), scrollbar gruesa naranja/ink, cursores pixelados (solo con mouse fino).
- Textos en mayúsculas para títulos; títulos con «pixel wipe». Tono: cercano, con humor, español de México, tuteo.
- Logo provisional: texto **«3K_»** (Archivo Black, guion bajo naranja parpadeante) en una píldora cream con borde y sombra pixel; favicon SVG. Se redefinirá cuando exista identidad final.

### 5.4 Animaciones y efectos (inventario)

| Efecto | Dónde | Notas de rendimiento / a11y |
| --- | --- | --- |
| Boot screen BIOS (typewriter + apagado CRT) | `BootScreen.astro` | 1.ª visita por sesión (`sessionStorage`), omitida con reduced-motion y `?static`; clic para saltar; failsafe CSS a 4 s |
| Scroll suave | Lenis en `Layout.astro` | Omitido con reduced-motion / `?static`; `anchors` con offset −96 |
| Reveal al scroll (`[data-reveal]`, `="pop"`, `--d` delay) y «pixel wipe» (`[data-wipe]`) | `index.astro` + `global.css` | IntersectionObserver; `.no-js` y reduced-motion lo desactivan |
| Computadora hero: flotación, power-on, flicker, scanlines, glare, LED, glitch al clic, tilt 3D con el cursor, chips flotantes | `RetroComputer.astro` | Tilt solo `pointer: fine`; texto de pantalla tipo terminal en bucle; **escribir en el teclado se refleja en la pantalla** (solo con hero visible) |
| Stop motion «cuadro por cuadro» (24 frames, 8 FPS, tira de película, controles VCR prev/pausa/next) | `StopMotion.astro` | Pausa si sale de pantalla (IntersectionObserver); `role="img"` + aria-label |
| `boil` (temblor de stop motion) | pills, iniciales, iconos | `steps(1)` |
| Estela de píxeles del cursor | `RetroFx.astro` | Solo mouse fino y sin reduced-motion; máx. 18 nodos |
| Código Konami → modo turbo (`html.turbo` invierte colores) + toast `role="status"` | `RetroFx.astro` | Easter egg |
| Marquee, progreso «instalador», flip de tarjetas del equipo (hover/focus-within), píxeles que suben en el footer, reloj en vivo | varios | Marquee/píxeles no tienen botón de pausa (T-09) |
| Modos de depuración | `?static` (sin animaciones), `#figmacapture` (script de Figma) | Útiles para capturas/QA |

`prefers-reduced-motion` reduce animaciones globalmente en `global.css`.

## 6. Secciones y componentes (orden en `index.astro`)

| # | Sección | Componente | Ancla | Contenido |
| --- | --- | --- | --- | --- |
| 0 | Boot screen | `BootScreen` | — | Pantalla de arranque |
| 1 | Navegación fija | `Nav` | — | Logo 3K_, píldora con Trabajo/Servicios/Proceso/Equipo + «Iniciar ↗» (WhatsApp); menú móvil `menu.exe` |
| 2 | Hero | `Hero` + `RetroComputer` | `#top` | H1, párrafo, 2 CTAs, computadora retro |
| 3 | Marquee | `Marquee` | — | 6 servicios en cinta inclinada |
| 4 | Trabajo | `Projects` | `#trabajo` | 4 proyectos en ventanas con imagen y overlay terminal |
| 5 | Servicios | `Services` | `#servicios` | 5 servicios en lista (fondo ink) |
| 6 | Proceso | `Process` | `#proceso` | 4 pasos + barra de progreso |
| 7 | Stop motion | `StopMotion` | `#stop-motion` | Animación interactiva |
| 8 | Equipo | `Team` | `#equipo` | 3 tarjetas flip con «stats» |
| 9 | Contacto / footer | `Contact` | `#contacto` | CTA WhatsApp, correo, redes, barra de tareas |
| — | Efectos globales | `RetroFx` | — | Estela de cursor, Konami, toast |

Proyectos mostrados: **Bordicrea** (e-commerce/web), **App Egresados** (web app), **3K Studio** (marca), **MathMass** (PWA). Servicios: Desarrollo web, Catálogos y e-commerce, Sistemas web a medida, Automatización e integraciones, Mantenimiento y soporte.

## 7. Especificaciones y convenciones técnicas

- **Idioma del código**: identificadores en inglés; contenido y comentarios en español. Todo texto visible vive en `site.ts` o en el componente (hay textos sueltos en componentes: pendiente moverlos para i18n, T-03).
- **Formato**: Prettier con tabs, comillas simples, `printWidth: 120`, plugin Astro y plugin Tailwind (ordena clases). `.md` y `docs/` están en `.prettierignore`.
- **ESLint**: `astro/no-set-html-directive: error`; override para `src/components/Seo.astro` que **aún no existe** (se prevé un componente SEO, T-07; no es un error). `pnpm lint` pasa sin errores.
- **Imágenes**: usar `astro:assets` (`<Image>`), con `widths`/`sizes`. Hero con `loading="eager"` y `fetchpriority="high"`.
- **Interacción**: el JS es progresivo; el sitio debe poder leerse con `.no-js` y con `?static`.
- **Comentarios en código**: solo los necesarios (aclaraciones de versiones/paquetes, decisiones no obvias). Sin emojis ni decoración (regla del equipo).
- **Cloudflare**: `@astrojs/cloudflare` está instalado pero `astro.config.mjs` **no lo usa** (build estático). Se activará (T-12, pendiente, decisión del usuario: para después) para: detectar el país con `CF-IPCountry` (i18n, T-03), cabeceras/caché personalizadas y futuros endpoints (formulario de contacto). Hasta entonces el sitio es 100 % estático.
- **Paquetes**: antes de instalar cualquier cosa se pregunta al usuario (nombre + versión); instalación solo con `pnpm`. Se verifica la versión con `pnpm view <paquete> version` y se registra en este archivo.
- Navegadores objetivo: Safari, Chrome y Firefox actuales + móvil. Sin verificación formal aún (T-10).

## 8. Requisitos transversales (aplican a TODA tarea)

1. **Rendimiento**: funcionar bien en la mayor cantidad de dispositivos sin romper lo ya hecho. Presupuesto a definir (Q-05); vigilar JS, fuentes, imágenes, animaciones continuas y `filter`/`mix-blend`.
2. **Accesibilidad**: sordos (alternativas textuales a audio/video si se agregan), ciegos (semántica, ARIA, foco, lectores), **daltonismo** (opción sin alterar los colores de marca por defecto), **baja visión** (WCAG 2.2 **AA** mínimo, AAA cuando sea posible; tamaños y contraste), reduced-motion, teclado.
3. **Compatibilidad**: Safari, Chrome, Firefox y responsive móvil.
4. **Diseño**: animaciones y tendencias actuales con resultado visual unificado.
5. **Idioma**: nativo Español (MX); i18n pendiente (§9).

## 9. i18n planeado (pendiente, T-03)

Decisiones: **una sola URL** (sin `/en/`), detección vía **Cloudflare** (se hará más adelante, depende de T-12) y selector manual para alternar. Idioma según ubicación de la conexión del visitante:

- **Español**: Latinoamérica y España.
- **Inglés (US)**: Estados Unidos, Canadá y **el resto del mundo** (Rusia, Asia, India, etc.).
- La detección es una sugerencia inicial; el usuario siempre puede cambiar y se recuerda su elección. Detalle en `docs/TASKS.md` (T-03).

## 10. Estado actual (resumen)

**Hecho:** setup (Astro+Tailwind v4+Lenis+Cloudflare+ESLint+Prettier), todas las secciones del one-page, sistema visual retro, animaciones del §5.4, stop motion, easter eggs, reveal on scroll, soporte básico de reduced-motion y `no-js`, imágenes optimizadas con `astro:assets`.

**Pendiente principal, por prioridad** (detalle y % en `docs/TASKS.md` de cada persona; esta lista es el estado del proyecto al 2026-11-02):
- **P0**: datos reales de contacto (se mantienen como *placeholders* hasta que el usuario los dé; T-01).
- **P1**: build roto por `sharp` (T-16), contraste AA (T-09), adaptador Cloudflare (T-12), fuentes autoalojadas (T-05), rendimiento (T-06), SEO (T-07), pruebas cross-browser/móvil (T-10), accesibilidad restante (T-14).
- **P2**: i18n (T-03), roles de la sección Equipo (T-13), enlaces de proyectos (T-08), daltonismo (T-04), convención de `docs/` individuales y traspasos (T-15, lista para verificar).
- **P3**: logo y nombre definitivos (T-11).

## 11. Problemas conocidos detectados en el análisis

- `contact.whatsapp = '520000000000'`, `email = 'hola@3kstudio.mx'` y redes (`instagram.com/` genérico) son *placeholders* (decisión: se dejan así hasta que se pidan cambios; faltan listados en T-01).
- Contraste: 20 puntos incumplen AA (botón primario, nav «Iniciar», kickers, tarjeta 2 de Proceso, H2 del footer, foco, textos con opacidad…); lista completa con sustituciones en T-09.
- Marquee y píxeles del footer se mueven sin control de pausa (WCAG 2.2.2); la pantalla de arranque solo se salta con clic.
- Fuentes desde Google Fonts: dependencia externa, costo de rendimiento y de privacidad.
- Sin `<link rel="canonical">`, `og:image`, `twitter:*`, sitemap, robots ni 404.
- `pnpm build` **falla en este entorno** con `MissingSharp` (ocurre también en `main` sin cambios): `sharp` no es dependencia directa y Astro 7 no lo encuentra al generar imágenes. Pendiente de aprobar `pnpm add sharp@0.35.4` (T-16).
- `eslint.config.js` apunta a un `Seo.astro` futuro (T-07).
- Velocidad de carga: hero dependiente de JS para mostrarse (retrasa LCP), imagen del hero sin `widths`, animaciones infinitas sin pausar fuera de pantalla, overlay CRT con `mix-blend-mode` a pantalla completa. Plan de mejora en T-06.
- Modo turbo con `filter: invert` sobre `main`/`footer` puede ser costoso en dispositivos modestos.
- Proyectos no enlazan a ningún sitio/caso de estudio (la flecha ↗ es decorativa).

## 12. Cómo se mantiene este archivo (auto-actualizable)

Ver `AGENTS.md` y `WORKFLOW.md`. Resumen: al terminar cualquier cambio que afecte estructura, stack, diseño, secciones, contenido, estado o decisiones, la IA **actualiza este archivo en la misma tarea**, ajusta `docs/TASKS.md` y agrega una línea al registro. Si algo no queda claro, pregunta antes de escribir.

## 13. Registro de cambios

| Fecha | Cambio |
| --- | --- |
| 2026-11-02 | Tercera ronda: instalado `prettier-plugin-tailwindcss@0.8.1` con pnpm (verificado oficial) y `printWidth: 120`; código reformateado con `pnpm format`; `docs/` pasa a ser individual por persona; `WORKFLOW.md` movido a la raíz (compartido) con formatos de `docs/`, traspasos y reglas UI/UX; creado subagente `ux-ui-reviewer`; roles del equipo actualizados; detectado build roto por `sharp` (T-16). |
| 2026-11-02 | Segunda ronda: prioridades P0–P3 en tareas; T-09 con auditoría de contraste (20 puntos y sustituciones); nuevas tareas T-12 a T-15; plan de rendimiento en T-06; scripts `lint`/`lint:fix`/`format`/`format:check` en `package.json`; dominio `3k.software`; decisiones: una sola URL para i18n, Cloudflare para después, roles públicos sin cambios por ahora; reglas de paquetes (preguntar + `pnpm`), commits/ramas y arranque de sesión en `AGENTS.md` y `docs/WORKFLOW.md`; `QUESTIONS.md` solo conserva abiertas. |
| 2026-11-02 | Creación de `CONTEXT.md`, `docs/` (README, TASKS, QUESTIONS, WORKFLOW), actualización de `AGENTS.md`/`CLAUDE.md` y `.gitignore` (`docs/`). Análisis completo del proyecto. |
