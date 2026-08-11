'use client';

import React, {Suspense} from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {DataState, PlayerCard, SectionTitle} from '../components';
import { Player } from '../types';
import { CURRENT_SEASON } from '../lib/seasons';
import {useFirebaseCollection} from '../hooks/useFirebaseCollection';

const filterOptions: { label: string; value?: Player['position'] }[] = [
  { label: 'Todos' },
  { label: 'Porteros', value: 'Goalkeeper' },
  { label: 'Defensas', value: 'Defender' },
  { label: 'Medios', value: 'Midfielder' },
  { label: 'Delanteros', value: 'Forward' },
];

function getPlayerView(loading: boolean, error: string, selectedPosition: string, filteredPlayers: Player[], retry: () => void) {
  return (
    <DataState
      loading={loading}
      error={error}
      empty={filteredPlayers.length === 0}
      loadingLabel="Cargando jugadores..."
      emptyTitle="No hay jugadores disponibles"
      emptyMessage={selectedPosition ? 'No hay jugadores registrados en esta posición.' : 'La plantilla se publicará próximamente.'}
      onRetry={retry}
    >
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {filterOptions.map(option => {
          const isActive = option.value === selectedPosition || (!option.value && !selectedPosition);
          const href = option.value ? `/squad?position=${encodeURIComponent(option.value)}` : '/squad';
          return (
            <Link
              key={option.label}
              href={href}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                isActive ? 'bg-emerald-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {option.label}
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredPlayers.map(player => (
          <PlayerCard key={player.id} player={player}/>
        ))}
      </div>
    </DataState>
  );
}

const SquadContent: React.FC = () => {
  const searchParams = useSearchParams();
  const {items: players, loading, error, refetch} = useFirebaseCollection<Player>(
    'data/players',
    'No se pudieron cargar los jugadores.',
  );
  const selectedPosition: string = searchParams.get('position') || '';
  const filteredPlayers = selectedPosition ? players.filter(player => player.position === selectedPosition) : players;

  return getPlayerView(loading, error, selectedPosition, filteredPlayers, () => void refetch());
};

const SquadPage: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle title={`Plantilla ${CURRENT_SEASON}`} subtitle="Conoce a los guerreros que defienden nuestros colores" />
        <Suspense fallback={<div className="text-center" role="status">Cargando filtros...</div>}>
          <SquadContent />
        </Suspense>
      </div>
    </div>
  );
}

export default SquadPage;
