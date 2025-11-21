import React from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { Button, MatchCard, NewsCard } from './components';
import { MOCK_DATA } from './data/mock';

const HomeScreen: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden bg-emerald-900 pt-32 pb-20 md:pt-40 md:pb-24">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-black"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-yellow-400 rounded-full blur-[120px] opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
            <span className="inline-block px-4 py-1 bg-emerald-800/50 border border-emerald-500 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
              Temporada 2024/25
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-6 italic">
              VUELA ALTO <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                  CON PASIÓN
              </span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
              El sitio oficial de Loros FC. Sigue cada jugada, conoce a nuestros jugadores y vive la intensidad desde la cancha.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button variant="primary">Ver Calendario</Button>
              <Button variant="outline">Hacerse Socio</Button>
            </div>
          </div>

          {/* Dynamic Match Center Card Floating */}
          <div className="md:w-1/2 flex flex-col items-center md:items-end gap-6 w-full">
             <div className="w-full max-w-md transform hover:-translate-y-2 transition-transform duration-300">
                <MatchCard data={MOCK_DATA.nextMatch} type="next" />
             </div>
             <div className="w-full max-w-md transform hover:-translate-y-2 transition-transform duration-300">
                <MatchCard data={MOCK_DATA.lastMatch} type="last" />
             </div>
          </div>
        </div>
      </section>

      {/* Latest News Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
              <div>
                  <h2 className="text-2xl md:text-3xl font-black text-emerald-900 uppercase">Últimas Noticias</h2>
                  <div className="h-1 w-20 bg-yellow-400 mt-2"></div>
              </div>
              <Link
                  href="/news"
                  className="hidden md:flex items-center gap-2 text-emerald-700 font-bold hover:text-emerald-900"
              >
                  Ver todas <ArrowRight size={20}/>
              </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_DATA.news.map((news) => (
              <NewsCard key={news.id} item={news} />
            ))}
          </div>
          <Link
              href="/news"
              className="md:hidden w-full mt-8 py-3 border border-emerald-200 text-emerald-700 font-bold rounded-lg text-center"
          >
              Ver todas las noticias
          </Link>
        </div>
      </section>

      {/* CTA Shop */}
      <section className="py-24 bg-emerald-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-400 via-transparent to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
              <ShoppingBag size={48} className="mx-auto text-yellow-400 mb-6" />
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 italic">LLEVA LOS COLORES</h2>
              <p className="text-emerald-200 mb-8 max-w-2xl mx-auto text-lg">
                  El nuevo jersey oficial 2024 ya está disponible en nuestra tienda en línea. Personalízalo con tu nombre y número.
              </p>
              <Link href="/shop">
                <Button variant="primary">Ir a la Tienda Oficial</Button>
              </Link>
          </div>
      </section>
    </>
  );
};

export default HomeScreen;
