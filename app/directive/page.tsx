'use client';

import React from 'react';
import {DataState, SectionTitle, DirectiveCard} from '../components';
import { Directive } from '../types';
import {useFirebaseCollection} from '../hooks/useFirebaseCollection';
import {isDirective} from '../lib/validation';

const DirectiveScreen: React.FC = () => {
  const {items: directive, loading, error, refetch} = useFirebaseCollection<Directive>(
    'data/directive',
    'No se pudo cargar la información de la directiva.',
    {validate: isDirective},
  );

  return (
    <>
      <section className="relative overflow-hidden bg-emerald-950 py-16 text-white md:py-20">
        <div className="absolute inset-0 bg-[url('/assets/textures/carbon-fibre.svg')] opacity-20" aria-hidden="true" />
      </section>
      <div className="pt-16 pb-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle title="Directiva" subtitle="Conoce a nuestro equipo directivo" />
          <DataState
            loading={loading}
            error={error}
            empty={directive.length === 0}
            loadingLabel="Cargando directiva..."
            emptyTitle="No hay información de la directiva"
            emptyMessage="Esta sección se actualizará próximamente."
            onRetry={() => void refetch()}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {directive.map((member) => (
                <DirectiveCard
                  key={member.id}
                  name={member.name}
                  role={member.role}
                  photoUrl={member.photoUrl}
                />
              ))}
            </div>
          </DataState>
        </div>
      </div>
    </>
  );
};

export default DirectiveScreen;
