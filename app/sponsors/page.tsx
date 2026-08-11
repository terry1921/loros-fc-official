'use client';

import React, { useState, useEffect } from 'react';
import { database } from '../lib/firebase';
import { ref, get } from 'firebase/database';
import { SectionTitle } from '../components';
import { Sponsor } from '../types';

const SponsorsScreen: React.FC = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const sponsorsRef = ref(database, 'data/sponsors');
        const snapshot = await get(sponsorsRef);
        if (snapshot.exists()) {
          setSponsors(Object.values(snapshot.val()));
        } else {
          setError('No se encontró información de patrocinadores.');
        }
      } catch (err) {
        setError('No se pudo cargar la información de patrocinadores.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

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
        {loading ? (
          <p className="text-center" role="status">Cargando...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {sponsors.map((sponsor, index) => (
              <a href={sponsor.url} key={index} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-cyan-900 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img src={sponsor.logoUrl} alt={sponsor.name} className="max-h-24" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SponsorsScreen;
