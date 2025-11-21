import React from 'react';
import { MOCK_DATA } from '../data/mock';
import { SectionTitle } from '../components';
import { Shield } from 'lucide-react';

const NewsScreen: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
            <SectionTitle title="Noticias del Club" subtitle="Mantente informado del día a día" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Featured News */}
                <div className="md:col-span-2 relative rounded-2xl overflow-hidden h-96 group cursor-pointer">
                    <div className="absolute inset-0 bg-emerald-900"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
                    <div className="absolute bottom-0 left-0 p-8 z-20 max-w-3xl">
                        <span className="bg-yellow-400 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">Destacado</span>
                        <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                            Comienza la pretemporada en la playa: Entrevista exclusiva con el DT
                        </h3>
                        <p className="text-gray-300 mb-4 hidden md:block">
                            El equipo viajó esta mañana para comenzar los trabajos físicos de cara al torneo clausura.
                        </p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                        <Shield size={200} className="text-white" />
                    </div>
                </div>

                {/* Standard News Grid */}
                {[...MOCK_DATA.news, ...MOCK_DATA.news].map((news, i) => (
                    <div key={i} className="flex gap-4 bg-white p-4 rounded-xl shadow hover:shadow-md transition-shadow">
                        <div className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center bg-emerald-100">
                            <Shield className="text-emerald-300" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-xs text-emerald-600 font-bold uppercase mb-1">{news.category}</span>
                            <h4 className="text-lg font-bold text-gray-800 leading-tight mb-2">{news.title}</h4>
                            <span className="text-xs text-gray-400">{news.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default NewsScreen;
