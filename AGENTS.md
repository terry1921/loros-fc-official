# Guía de trabajo para agentes — Loros FC

## Propósito

Este proyecto es el sitio oficial de Loros Fútbol Club. Los agentes deben mantener una experiencia rápida, clara, accesible y completamente en español de México, sin inventar información institucional, deportiva o legal.

## Stack y estructura

- Next.js con App Router, React y TypeScript.
- Tailwind CSS para estilos.
- Firebase Realtime Database para noticias, jugadores, partidos, productos, directiva y patrocinadores.
- `app/` contiene rutas, componentes, hooks, tipos y utilidades.
- `public/assets/` contiene escudos, jugadores, patrocinadores, noticias, wallpapers y texturas locales.
- El correo formal del club es `lorosfcqro@gmail.com`.
- La temporada actual se obtiene desde `app/lib/seasons.ts`.

## Estado actual del sitio

Ya están implementados:

- Páginas de Privacidad, Términos y Contacto.
- Página de Historia en `/history`.
- Página de Wallpapers en `/wallpapers`.
- Media Kit 2026 en la sección de patrocinadores y footer.
- Noticias separadas por temporada.
- Metadata en español, Open Graph, Twitter Cards y página Open Graph.
- `lang="es-MX"`.
- Estados de carga, error y vacío para las principales colecciones de Firebase.
- Normalización de colecciones Firebase en `app/lib/firebase-data.ts`.
- Conversión de assets pesados a WebP y textura local del hero.
- Footer público sin enlace a Admin.

## Prioridad de próximos trabajos

### P0 — SEO técnico

1. Crear `app/sitemap.ts` con las rutas públicas.
2. Crear `app/robots.ts` y excluir rutas administrativas.
3. Configurar `NEXT_PUBLIC_SITE_URL` en el entorno de producción.
4. Añadir datos estructurados para el club como `SportsTeam` u `Organization`.
5. Revisar títulos, descripciones y canonical de cada página pública.

**Criterio de aceptación:** las rutas públicas aparecen en el sitemap, `/admin` y páginas administrativas no se indexan, y las metadata sociales generan URLs absolutas del dominio real.

### P1 — Contenido y conversión

1. Crear páginas individuales para noticias con URLs amigables.
2. Crear una página de próximos partidos y resultados históricos.
3. Hacer funcional el formulario de contacto.
4. Hacer funcional el newsletter o retirarlo hasta tener un proveedor conectado.
5. Fortalecer la llamada a la acción para patrocinadores.

**Criterio de aceptación:** ningún botón público debe parecer funcional si no tiene una acción real y todas las páginas deben tener estados de carga, vacío y error.

### P1 — Seguridad de Firebase

1. Revisar reglas de lectura y escritura de Realtime Database.
2. Confirmar que solo usuarios autenticados puedan escribir desde las rutas administrativas.
3. Validar campos obligatorios y formatos antes de guardar.
4. No exponer secretos ni credenciales en el repositorio.
5. No mostrar errores crudos de Firebase al público.

**Criterio de aceptación:** un visitante anónimo puede consultar solo la información pública y no puede modificar datos.

### P2 — Rendimiento

1. Mantener WebP/AVIF para jugadores, noticias y wallpapers.
2. Usar `next/image`, `sizes`, `fill` o dimensiones reales según el componente.
3. Migrar rutas antiguas PNG en Firebase antes de eliminar los PNG de respaldo.
4. Optimizar logotipos de patrocinadores que aún sean pesados.
5. Añadir caché prolongada para assets versionados o con nombres inmutables.

**Criterio de aceptación:** no se deben introducir imágenes nuevas de más de 500 KB sin una razón documentada.

### P2 — Accesibilidad

1. Añadir enlace “Saltar al contenido”.
2. Revisar navegación completa con teclado y estados de foco.
3. Usar `aria-live` o `role="alert"` para errores y `role="status"` para cargas.
4. Mantener textos alternativos descriptivos.
5. Revisar contraste y jerarquía de encabezados.
6. Evitar enlaces `href="#"` en contenido visible.

**Criterio de aceptación:** las rutas públicas deben poder recorrerse con teclado y los estados dinámicos deben ser anunciados por lectores de pantalla.

### P2 — Calidad y mantenimiento

1. Ejecutar Lighthouse en Inicio, Noticias, Equipo, Tienda, Patrocinadores y Wallpapers.
2. Añadir pruebas de enlaces, menú móvil y descargas.
3. Configurar CI para ejecutar TypeScript, build y pruebas antes de desplegar.
4. Revisar periódicamente rutas rotas y assets faltantes.

## Convenciones técnicas obligatorias

### Firebase y tipos

- Las colecciones deben tratarse internamente como arreglos.
- Normalizar datos externos con `app/lib/firebase-data.ts`.
- Usar `useFirebaseCollection` o `useFirebaseValue` cuando corresponda.
- No usar `Object.values()` como solución repetida en cada pantalla.
- Si una colección puede llegar como mapa o arreglo, cubrir ambos formatos en la normalización.
- Proteger efectos asíncronos para no actualizar estado después del desmontaje.

### Estados de interfaz

- Usar `DataState` para skeleton, error, vacío y reintento.
- Los errores visibles deben ser amigables y estar en español.
- No renderizar listas vacías sin explicar al usuario qué ocurre.
- Los formularios administrativos deben conservar los cambios locales hasta que el usuario confirme Guardar.

### Componentes y Server Components

- Preferir Server Components cuando no se necesite estado o eventos del navegador.
- Importar componentes directamente desde su archivo en Server Components; evitar importar el barrel `app/components/index.ts` si arrastra componentes cliente.
- Usar `'use client'` solo donde sea necesario.
- Evitar definir componentes complejos dentro del cuerpo de otro componente.

### Imágenes

- Usar `next/image` siempre que sea posible.
- Incluir `alt` descriptivo, `sizes` y dimensiones o `fill` correctamente.
- Preferir recursos locales sobre URLs externas.
- El directorio real de wallpapers es `public/assets/wallpaper`.
- Los recursos locales antiguos `.png` de jugadores, noticias y wallpapers se convierten mediante `app/lib/optimized-image.ts`.
- No eliminar PNG de respaldo hasta confirmar que Firebase ya no contiene rutas históricas hacia ellos.

### Idioma y contenido

- La interfaz pública debe estar en español de México.
- Mantener `lang="es-MX"`.
- Usar `lorosfcqro@gmail.com` como canal formal.
- No inventar campeonatos, fechas, fundadores, estadísticas o logros. Si falta información, usar redacción institucional general o dejar un estado pendiente.
- Mantener las noticias agrupadas por temporada.

### Navegación pública

- Admin no debe aparecer en la navegación pública ni en el footer.
- Las páginas públicas deben estar enlazadas desde la navegación o footer cuando sean relevantes.
- Los enlaces externos deben usar `target="_blank"` y `rel="noopener noreferrer"` cuando corresponda.

## Validación antes de entregar

Ejecutar desde la raíz del proyecto:

```bash
npx tsc --noEmit --incremental false
npm run build
git diff --check
```

El build puede mostrar advertencias existentes sobre `eslint` en `next.config.mjs`, `baseline-browser-mapping`, Browserslist y `metadataBase`. No deben confundirse con errores de compilación.

Después de ejecutar el build, comprobar que `next-env.d.ts` conserve esta referencia:

```ts
import "./.next/dev/types/routes.d.ts";
```

## Definición de terminado

Antes de cerrar una tarea, el agente debe confirmar:

- La funcionalidad solicitada está implementada y enlazada.
- No se rompieron rutas existentes.
- Los datos de Firebase aceptan mapas y arreglos cuando corresponda.
- Hay estados de carga, vacío y error.
- La interfaz es responsive y accesible.
- Las imágenes tienen `alt`, formato y tamaños adecuados.
- TypeScript, build y `git diff --check` pasan.
- No se eliminaron datos o assets originales sin autorización explícita.
- La respuesta final incluye archivos modificados, validaciones y cualquier configuración pendiente.
