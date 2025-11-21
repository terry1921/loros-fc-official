import React from 'react';
import { MOCK_DATA } from '../data/mock';
import { PlayerCard, SectionTitle } from '../components';

const SquadScreen: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Plantilla 2024" subtitle="Conoce a los guerreros que defienden nuestros colores" />

        {/* Filters (Mock) */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['Todos', 'Porteros', 'Defensas', 'Medios', 'Delanteros'].map((filter, idx) => (
              <button key={idx} className={`px-4 py-2 rounded-full text-sm font-bold ${idx === 0 ? 'bg-emerald-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
                  {filter}
              </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_DATA.players.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
          {/* Duplicating for UI grid effect */}
          {MOCK_DATA.players.map((player) => (
            <PlayerCard key={`dup-${player.id}`} player={{...player, name: player.name + " (Reserva)"}} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SquadScreen;
