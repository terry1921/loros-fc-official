import {readdir} from 'node:fs/promises';
import path from 'node:path';
import Image from 'next/image';
import {Download} from 'lucide-react';
import {SectionTitle} from '../components/SectionTitle';

export const metadata = {
  title: 'Wallpapers',
  description: 'Descarga wallpapers oficiales de Loros Fútbol Club para tu celular o computadora.',
};

const wallpaperDirectory = path.join(process.cwd(), 'public/assets/wallpaper');

async function getWallpapers() {
  const files = await readdir(wallpaperDirectory);

  return files
    .filter((file) => /\.(webp|avif)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, 'es'))
    .map((file) => ({
      file,
      title: file.replace(/\.(webp|avif)$/i, '').replace(/[-_]/g, ' '),
      src: `/assets/wallpaper/${encodeURIComponent(file)}`,
    }));
}

export default async function WallpapersPage() {
  const wallpapers = await getWallpapers();

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-20">
      <section className="relative overflow-hidden bg-emerald-950 py-20 text-white md:py-24">
        <div className="absolute inset-0 bg-[url('/assets/textures/carbon-fibre.svg')] opacity-20" aria-hidden="true" />
        <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-yellow-400/20 blur-3xl" aria-hidden="true" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">Lleva los colores contigo</p>
          <h1 className="text-5xl font-black uppercase tracking-tight md:text-7xl">Wallpapers oficiales</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-emerald-100">
            Descarga fondos oficiales de Loros FC para personalizar tu celular o computadora y llevar nuestra pasión a todas partes.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20" aria-label="Galería de wallpapers oficiales">
        <SectionTitle title="Elige tu favorito" subtitle="Descarga cada diseño en formato optimizado para compartir y usar como fondo." />

        {wallpapers.length === 0 ? (
          <div className="rounded-2xl border border-emerald-100 bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-black text-emerald-900">No hay wallpapers disponibles</h2>
            <p className="mt-2 text-gray-600">Pronto agregaremos nuevos diseños para la afición.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
            {wallpapers.map(({file, title, src}) => (
              <article key={file} className="overflow-hidden rounded-2xl bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[9/16] bg-emerald-950">
                  <Image
                    src={src}
                    alt={`Wallpaper de Loros FC: ${title}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="object-contain"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 p-4">
                  <h2 className="truncate text-sm font-bold capitalize text-emerald-900" title={title}>{title}</h2>
                  <a
                    href={src}
                    download={file}
                    aria-label={`Descargar wallpaper de Loros FC: ${title}`}
                    className="inline-flex shrink-0 items-center justify-center rounded-lg bg-yellow-400 p-2 text-emerald-950 transition-colors hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                  >
                    <Download size={18} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
