import React from 'react';
import { PlayerCard, SectionTitle } from '../components';
import { database } from '../lib/firebase';
import { get, ref } from 'firebase/database';
import {Player} from "../types";

async function getRealtimeData() {
  const refData = ref(database, '/players');
  const snapshot = await get(refData);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return [];
  }
}

const SquadScreen: React.FC = async () => {
  const players = await getRealtimeData();

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
          {Array.isArray(players) && players.map((player: Player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SquadScreen;
