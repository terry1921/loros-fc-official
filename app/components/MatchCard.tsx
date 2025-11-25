import React from 'react';
import { Match } from '../types';
import { MapPin } from 'lucide-react';
import Image from "next/image";

interface MatchCardProps {
  data: Match;
  type: 'next' | 'last';
}

function noDataAvailable(isNext: boolean) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
      <div className={`p-4 ${isNext ? 'bg-emerald-800/50' : 'bg-gray-800/50'}`}>
        <h3 className="text-white font-bold text-sm uppercase tracking-widest">
          {isNext ? 'Próximo Partido' : 'Último Resultado'}
        </h3>
      </div>
      <div className="p-6">
        <p className="text-white text-center">No information available</p>
      </div>
    </div>
  );
}

function getMatchCard(isNext: boolean, data: Match) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
      <div className={`p-4 ${isNext ? 'bg-emerald-800/50' : 'bg-gray-800/50'}`}>
        <h3 className="text-white font-bold text-sm uppercase tracking-widest">
          {isNext ? 'Próximo Partido' : 'Último Resultado'}
        </h3>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/*<Shield size={40} className="text-yellow-400"/>*/}
            <Image src="/assets/loros_fc_shield.png" alt="Loros FC" className="object-cover" width={40} height={40} />
            <div>
              <p className="text-gray-300 text-sm">{isNext ? (data.home ? 'vs' : '@') : 'vs'}</p>
              <p className="text-white font-bold text-xl">{data.opponent}</p>
            </div>
          </div>
          {isNext ? (
            <div className="text-right">
              <p className="text-white font-bold text-2xl">{data.time}</p>
              <p className="text-gray-300 text-sm">{data.date}</p>
            </div>
          ) : (
            <div className={`text-right ${data.result === 'W' ? 'text-green-400' : 'text-red-400'}`}>
              <p className="text-white font-bold text-3xl">{data.score}</p>
              <p className="font-bold text-sm">{data.result}</p>
            </div>
          )}
        </div>
        {isNext && (
          <div className="mt-4 pt-4 border-t border-white/20 text-gray-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin size={14}/>
              <span>{data.stadium}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const MatchCard: React.FC<MatchCardProps> = ({ data, type }) => {
  const isNext = type === 'next';

  if (!data) {
    return noDataAvailable(isNext);
  }

  return getMatchCard(isNext, data);
};