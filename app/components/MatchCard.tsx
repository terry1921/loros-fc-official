import React from 'react';
import {Match, Scorer} from '../types';
import {Calendar, MapPin, Shield} from 'lucide-react';
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
        <div className="relative z-10 text-center">
          {isNext ? (
            <div className="flex justify-between items-center mb-6">
              <div className="text-center">
                <div
                  className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center backdrop-blur-sm">
                  <Image src="/assets/shields/loros.png" alt="Loros FC" className="object-cover" width={50} height={50}/>
                </div>
                <span className="text-white font-bold block">Loros FC</span>
              </div>
              <div className="text-2xl font-black text-yellow-400">VS</div>
              <div className="text-center">
                <div
                  className="w-16 h-16 bg-white/10 rounded-full mx-auto mb-2 flex items-center justify-center border border-white/20">
                  {data.opponentLogo ? (
                    <Image src={data.opponentLogo} alt={data.opponent} className="object-cover" width={50} height={50}/>
                  ) : (
                    <Shield size={32} className="text-white/50"/>
                  )}
                </div>
                <span className="text-white font-bold block opacity-80">{data.opponent}</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span className="font-bold text-emerald-500">Loros FC</span>
              <span className="text-3xl font-black text-gray-400">{data.score}</span>
              <span className="font-bold text-gray-100">{data.opponent}</span>
            </div>
          )}
        </div>
        {isNext ? (
          <div className="mt-4 pt-4 border-t border-white/20 text-gray-300 text-xs flex items-center justify-between">
            <div
              className="bg-emerald-900/50 rounded-lg p-3 inline-block w-full backdrop-blur-md border border-emerald-700">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                <Calendar size={16}/> {data.date} <span className="mx-2">|</span> {data.time} hrs
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-yellow-400 mt-1 font-bold">
                <div className="flex items-center gap-2 justify-center text-sm text-yellow-400 mt-1 ">
                  <MapPin size={14}/>
                  <span>{data.stadium}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={"mt-4 pt-4 border-t border-gray-100"}>
            {
              (data.scorers || []).map((n: Scorer) => (
                <div
                  key={n.name}
                  className="text-center text-sm text-green-600 font-medium flex items-center justify-center gap-2">
                  {Array.from({length: n.quantity}).map((_, index) => <span key={index + 'scorer'}>⚽</span>)}
                  <span>{n.name}</span>
                </div>
              ))
            }
          </div>
        )}
      </div>
    </div>
  );
}

export const MatchCard: React.FC<MatchCardProps> = ({data, type}) => {
  const isNext = type === 'next';

  if (!data) {
    return noDataAvailable(isNext);
  }

  return getMatchCard(isNext, data);
};