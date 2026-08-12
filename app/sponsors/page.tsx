'use client';

import React from 'react';
import Image from 'next/image';
import {DataState, SectionTitle} from '../components';
import { Sponsor } from '../types';
import {useFirebaseCollection} from '../hooks/useFirebaseCollection';
import {getOptimizedImageSource, isAllowedImageSource, isSafeHttpsUrl} from '../lib/optimized-image';
import {isSponsor} from '../lib/validation';

const SponsorsScreen: React.FC = () => {
  const {items: sponsors, loading, error, refetch} = useFirebaseCollection<Sponsor>(
    'data/sponsors',
    'No se pudo cargar la información de patrocinadores.',
    {validate: isSponsor},
  );
  const safeSponsors = sponsors.filter((sponsor) => isSafeHttpsUrl(sponsor.url));

  return (
    <div className="pt-32 pb-20 min-h-screen bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle title="Patrocinadores" subtitle="Gracias a nuestros patrocinadores por su apoyo" />
        <div className="mb-12 rounded-2xl bg-emerald-950 p-6 text-white shadow-lg md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-yellow-400">Temporada 2026</p>
            <h2 className="text-2xl font-black md:text-3xl">Media Kit de Patrocinios</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-emerald-100 md:text-base">
              Conoce las opciones para que tu marca forme parte de Loros F.C. dentro y fuera de la cancha.
            </p>
          </div>
          <a
            href="/media-kit/Loros_FC_Media_Kit_Patrocinios_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir Media Kit de Patrocinios 2026 en una nueva pestaña"
            className="mt-5 inline-flex shrink-0 items-center justify-center rounded-lg bg-yellow-400 px-5 py-3 text-center font-bold text-emerald-950 transition-colors hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-emerald-950 md:mt-0"
          >
            Ver Media Kit 2026
          </a>
        </div>
        <DataState
          loading={loading}
          error={error}
          empty={safeSponsors.length === 0}
          loadingLabel="Cargando patrocinadores..."
          emptyTitle="Aún no hay patrocinadores disponibles"
          emptyMessage="Estamos preparando esta sección con enlaces e imágenes válidas."
          onRetry={() => void refetch()}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {safeSponsors.map((sponsor) => (
              <a href={sponsor.url} key={sponsor.id} target="_blank" rel="noopener noreferrer" className="flex min-h-32 items-center justify-center rounded-lg bg-cyan-900 p-4 shadow-md transition-shadow hover:shadow-lg" aria-label={`Visitar el sitio de ${sponsor.name} en una nueva pestaña`}>
                {isAllowedImageSource(sponsor.logoUrl) ? (
                  <Image
                    src={getOptimizedImageSource(sponsor.logoUrl)}
                    alt={`Logotipo de ${sponsor.name}`}
                    width={240}
                    height={96}
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="max-h-24 w-auto object-contain"
                  />
                ) : (
                  <span className="text-center text-sm font-bold text-white">{sponsor.name}</span>
                )}
              </a>
            ))}
          </div>
        </DataState>
      </div>
    </div>
  );
};

export default SponsorsScreen;
