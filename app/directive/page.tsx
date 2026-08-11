'use client';

import React from 'react';
import {DataState, SectionTitle, DirectiveCard} from '../components';
import { Directive } from '../types';
import {useFirebaseCollection} from '../hooks/useFirebaseCollection';

const DirectiveScreen: React.FC = () => {
  const {items: directive, loading, error, refetch} = useFirebaseCollection<Directive>(
    'data/directive',
    'No se pudo cargar la información de la directiva.',
  );

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
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
            {directive.map((member, index) => (
              <DirectiveCard
                key={index}
                name={member.name}
                role={member.role}
                photoUrl={member.photoUrl}
              />
            ))}
          </div>
        </DataState>
      </div>
    </div>
  );
};

export default DirectiveScreen;
