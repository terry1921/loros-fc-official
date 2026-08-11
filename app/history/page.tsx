import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight, Heart, Shield, Trophy} from 'lucide-react';
import {CURRENT_SEASON} from '../lib/seasons';

export const metadata = {
  title: 'Historia',
  description: 'Conoce la historia, identidad y valores de Loros Fútbol Club.',
};

const milestones = [
  {
    year: 'Desde 2020',
    title: 'Una identidad que vuela alto',
    description: 'Loros FC construye su camino alrededor de la pasión por el fútbol, la entrega en cada partido y el orgullo de representar a su comunidad.',
  },
  {
    year: 'Nuestra esencia',
    title: 'Pasión, entrega y comunidad',
    description: 'Cada temporada es una oportunidad para crecer, competir y fortalecer el vínculo entre el equipo, la afición y quienes acompañan este proyecto.',
  },
  {
    year: `Temporada ${CURRENT_SEASON}`,
    title: 'El siguiente capítulo',
    description: 'La historia continúa en la cancha y junto a nuestra afición. Seguimos trabajando para que cada jugada represente los colores de Loros FC.',
  },
];

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <section className="relative overflow-hidden bg-emerald-950 py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-[url('/assets/textures/carbon-fibre.svg')] opacity-20" aria-hidden="true" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-yellow-400/20 blur-3xl" aria-hidden="true" />
        <div className="container relative z-10 mx-auto grid items-center gap-12 px-4 md:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">Nuestra historia</p>
            <h1 className="max-w-3xl text-5xl font-black uppercase leading-none tracking-tight md:text-7xl">
              Un escudo. <span className="text-yellow-400">Una pasión.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-emerald-100 md:text-xl">
              Loros FC es una historia que se escribe en equipo: con trabajo, identidad y el respaldo de una afición que vive cada partido.
            </p>
          </div>
          <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full border-8 border-yellow-400 bg-white shadow-2xl md:h-60 md:w-60">
            <Image
              src="/assets/shields/loros_fc_shield.png"
              alt="Escudo de Loros FC"
              width={190}
              height={190}
              sizes="(min-width: 768px) 190px, 150px"
              className="h-auto w-4/5 object-contain"
              priority
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20" aria-labelledby="identity-title">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="identity-title" className="text-3xl font-black uppercase text-emerald-900 md:text-4xl">Una historia que se vive</h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded bg-yellow-400" />
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            Más que un equipo, somos una comunidad que encuentra en el fútbol una forma de compartir, competir y representar lo que nos une.
            Nuestra identidad se reconoce en la cancha, en la tribuna y en cada persona que lleva los colores de Loros FC.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {milestones.map((milestone) => (
            <article key={milestone.year} className="rounded-2xl border border-emerald-100 bg-white p-8 shadow-sm">
              <p className="text-sm font-black uppercase tracking-widest text-yellow-600">{milestone.year}</p>
              <h3 className="mt-4 text-2xl font-black text-emerald-900">{milestone.title}</h3>
              <p className="mt-4 leading-relaxed text-gray-600">{milestone.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-20" aria-labelledby="values-title">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 id="values-title" className="text-3xl font-black uppercase text-emerald-900 md:text-4xl">Lo que nos representa</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">Los valores que acompañan cada capítulo de Loros FC.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-emerald-950 p-8 text-white">
              <Heart className="mb-5 text-yellow-400" size={32} aria-hidden="true" />
              <h3 className="text-xl font-black">Pasión</h3>
              <p className="mt-3 text-emerald-100">Jugamos y acompañamos al club con el corazón.</p>
            </div>
            <div className="rounded-2xl bg-emerald-900 p-8 text-white">
              <Shield className="mb-5 text-yellow-400" size={32} aria-hidden="true" />
              <h3 className="text-xl font-black">Identidad</h3>
              <p className="mt-3 text-emerald-100">Defendemos nuestros colores dentro y fuera de la cancha.</p>
            </div>
            <div className="rounded-2xl bg-yellow-400 p-8 text-emerald-950">
              <Trophy className="mb-5 text-emerald-900" size={32} aria-hidden="true" />
              <h3 className="text-xl font-black">Ambición</h3>
              <p className="mt-3 text-emerald-900/80">Cada temporada abre una nueva oportunidad para crecer.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pt-20 text-center">
        <h2 className="text-3xl font-black uppercase text-emerald-900">La historia continúa contigo</h2>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600">Conoce al equipo, sigue las noticias y acompaña el siguiente capítulo de Loros FC.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/squad" className="inline-flex items-center gap-2 rounded-lg bg-emerald-900 px-6 py-3 font-bold text-white transition-colors hover:bg-emerald-800">
            Conoce al equipo <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/news" className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-6 py-3 font-bold text-emerald-800 transition-colors hover:bg-emerald-50">
            Ver noticias <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
