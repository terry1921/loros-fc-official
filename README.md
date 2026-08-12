# Loros FC — Sitio oficial

Sitio oficial de Loros Fútbol Club, construido con Next.js, React, TypeScript, Tailwind CSS y Firebase Realtime Database.

El sitio permite consultar noticias, temporadas, plantilla, partidos, tienda, patrocinadores, directiva y recursos oficiales del club.

## Funcionalidades implementadas

### Contenido público

- Inicio con próximo partido, último resultado y noticias recientes.
- Plantilla del equipo con filtros por posición.
- Noticias agrupadas y filtrables por temporada.
- Detalle individual de noticias en `/news/[slug]`.
- Tienda oficial conectada a Firebase.
- Sección de patrocinadores y Media Kit 2026.
- Sección de directiva.
- Página institucional de Historia en `/history`.
- Galería de wallpapers descargables en `/wallpapers`.
- Páginas legales y de contacto:
  - `/privacy`
  - `/terms`
  - `/contact`
- Media Kit disponible en:
  - `/media-kit/Loros_FC_Media_Kit_Patrocinios_2026.pdf`

### Administración

Las siguientes rutas requieren autenticación:

- `/admin`
- `/login`
- `/news-admin`
- `/players-admin`
- `/products-admin`
- `/directive-admin`
- `/sponsors-admin`

El enlace de administración no aparece en la navegación pública ni en el footer.

## SEO y accesibilidad

- Idioma global configurado como `es-MX`.
- Metadata en español con títulos, descripciones y keywords.
- Open Graph y Twitter Cards.
- Imagen dinámica para compartir en `/opengraph-image`.
- Favicon con el escudo de Loros FC.
- Textos alternativos descriptivos para imágenes.
- Menú móvil con `aria-label`, `aria-expanded`, `aria-controls` y `aria-current`.
- Enlace para saltar directamente al contenido principal y un único `<main>` global.
- Estados de carga con `role="status"` y errores con `role="alert"`.
- Páginas globales de carga, error y 404 en español.
- Enlaces sociales con etiquetas accesibles.
- Estados vacíos para noticias, jugadores, productos, patrocinadores y directiva.

## Rendimiento

- Jugadores, wallpapers y recursos de noticias convertidos a WebP.
- Next.js configurado para negociar formatos AVIF y WebP.
- Uso de `next/image`, `sizes` y `fill` en las tarjetas responsivas.
- Textura local del hero en `public/assets/textures/carbon-fibre.svg`.
- Wallpapers optimizados ubicados en `public/assets/wallpaper`.
- Las rutas antiguas `.png` de jugadores, noticias y wallpapers se transforman a WebP mediante `app/lib/optimized-image.ts`.
- Los PNG originales se conservan como respaldo mientras Firebase pueda contener rutas históricas hacia ellos.
- Los logos de patrocinadores usan `next/image` con tamaños responsivos.

## Datos y Firebase

Las colecciones de Firebase pueden llegar como mapas u arreglos. La aplicación las normaliza a arreglos internos mediante:

- `app/lib/firebase-data.ts`
- `app/lib/validation.ts`
- `app/hooks/useFirebaseCollection.ts`
- `app/hooks/useFirebaseValue.ts`

Las colecciones se validan antes de renderizar o guardar, conservan IDs estables y las lecturas públicas principales usan consultas limitadas y caché ligera.

Los componentes de datos utilizan `app/components/DataState.tsx` para mostrar:

- Skeletons durante la carga.
- Mensajes vacíos cuando no hay información.
- Errores amigables en español.
- Botones de reintento cuando corresponde.

Los efectos asíncronos protegen las actualizaciones de estado cuando un componente se desmonta.

Las reglas versionadas están en `database.rules.json`. Las escrituras administrativas requieren el custom claim `admin`; el claim debe asignarse desde un entorno confiable y las reglas deben probarse con Firebase Rules Simulator o Emulator Suite antes de desplegar.

## SEO técnico

- `app/sitemap.ts` genera `sitemap.xml` con las rutas públicas y noticias publicadas.
- `app/robots.ts` excluye login y rutas administrativas.
- `SportsTeam` y `NewsArticle` se publican mediante JSON-LD con información verificada.
- `NEXT_PUBLIC_SITE_URL` debe configurarse en Vercel para que canonical, sitemap y tarjetas sociales usen el dominio real.

## Observabilidad

Vercel Speed Insights está instalado e integrado en el layout raíz mediante:

```tsx
import {SpeedInsights} from '@vercel/speed-insights/next';
```

La medición funciona después de desplegar el proyecto en Vercel y habilitar Speed Insights desde el dashboard. No recopila datos durante el desarrollo local.

## Stack técnico

- [Next.js 16](https://nextjs.org/) con App Router.
- [React 19](https://react.dev/).
- [TypeScript](https://www.typescriptlang.org/).
- [Tailwind CSS](https://tailwindcss.com/).
- [Firebase Realtime Database](https://firebase.google.com/docs/database).
- [Lucide React](https://lucide.dev/).
- [Vercel Speed Insights](https://vercel.com/docs/speed-insights).

## Estructura principal

```text
loros-fc-official/
├── app/
│   ├── components/       # Componentes reutilizables y layout
│   ├── hooks/            # Hooks de Firebase y estado de datos
│   ├── lib/              # Firebase, temporadas, normalización e imágenes
│   ├── types/            # Tipos TypeScript
│   ├── history/          # Historia del club
│   ├── wallpapers/       # Galería descargable
│   ├── news/             # Noticias por temporada
│   ├── squad/            # Plantilla
│   ├── shop/             # Tienda
│   ├── sponsors/         # Patrocinadores y Media Kit
│   ├── directive/        # Directiva
│   ├── privacy/          # Aviso de privacidad
│   ├── terms/            # Términos de uso
│   ├── contact/          # Contacto
│   ├── layout.tsx        # Layout raíz, metadata y Speed Insights
│   └── page.tsx          # Página de inicio
├── public/
│   ├── assets/           # Imágenes, texturas y wallpapers
│   └── media-kit/        # Media Kit de patrocinio
├── AGENTS.md             # Guía operativa para agentes
├── database.rules.json   # Reglas versionadas de Realtime Database
├── .github/workflows/    # Validaciones automáticas de calidad
├── docs/superpowers/     # Planes ejecutables para agentes
├── next.config.mjs       # Configuración de Next.js e imágenes
└── package.json          # Dependencias y scripts
```

## Instalación

Requisitos:

- Node.js compatible con Next.js 16.
- Acceso a la configuración de Firebase del proyecto.

Instala las dependencias:

```bash
npm install
```

Configura las variables de Firebase en `.env.local` según las claves utilizadas por `app/lib/firebase.ts`. No subas secretos al repositorio.

Para que las URLs canónicas y sociales apunten al dominio real en producción, configura también:

```env
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com

# También se requieren las variables NEXT_PUBLIC_FIREBASE_* utilizadas por app/lib/firebase.ts.
```

## Desarrollo

Inicia el servidor local:

```bash
npm run dev
```

La aplicación estará disponible normalmente en `http://localhost:3000`.

## Validación y producción

Comprueba tipos:

```bash
npm run typecheck
```

Ejecuta ESLint:

```bash
npm run lint
```

Genera el build de producción:

```bash
npm run build
```

Inicia la versión compilada:

```bash
npm run start
```

Revisa el formato del cambio:

```bash
git diff --check
```

El build puede mostrar advertencias informativas de Baseline Browser Mapping y Browserslist. No deben confundirse con errores de compilación. La integración continua ejecuta `npm ci`, `npm run typecheck`, `npm run lint` y `npm run build` en cada pull request y push a `main` o `master`.

Después de ejecutar el build, conservar en `next-env.d.ts` la referencia de desarrollo:

```ts
import "./.next/dev/types/routes.d.ts";
```

## Reglas de contenido

- La interfaz pública debe mantenerse en español de México.
- El canal formal del club es `lorosfcqro@gmail.com`.
- No inventar campeonatos, fechas, fundadores, estadísticas o logros.
- Si falta información histórica o deportiva, usar redacción institucional prudente o un estado vacío.
- Mantener las noticias separadas por temporada.
- No eliminar datos o assets originales sin autorización explícita.

Para instrucciones operativas más completas, consultar [AGENTS.md](./AGENTS.md).

## Licencia

Este proyecto es propiedad de Loros Fútbol Club y se utiliza para el sitio oficial del club.
