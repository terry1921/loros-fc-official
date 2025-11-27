import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Facebook, Instagram} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-950 text-white pt-20 pb-10 border-t border-emerald-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Image src="/assets/shields/loros_fc_shield.png" alt="Loros FC" className="object-cover" width={32} height={32} />
              <span className="text-2xl font-black italic tracking-tighter">LOROS<span
                className="text-yellow-400">FC</span></span>
            </div>
            <p className="text-emerald-400/60 text-sm leading-relaxed mb-6">
              El orgullo de la ciudad. Pasión, entrega y fútbol desde 2020.
            </p>
            <div className="flex gap-4">
              <div
                className="w-10 h-10 bg-emerald-900 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-emerald-900 transition-colors cursor-pointer">
                <Link href={'https://www.facebook.com/profile.php?id=61583836440400'} target="_blank" rel="noopener noreferrer"><Facebook size={18}/></Link></div>
              <div
                className="w-10 h-10 bg-emerald-900 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-emerald-900 transition-colors cursor-pointer">
                <Link href={'https://www.instagram.com/lorosfcqro/'}><Instagram size={18}/></Link></div>
              {/*<div
                className="w-10 h-10 bg-emerald-900 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-emerald-900 transition-colors cursor-pointer">
                <Twitter size={18}/></div>
              <div
                className="w-10 h-10 bg-emerald-900 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-emerald-900 transition-colors cursor-pointer">
                <Youtube size={18}/></div>*/}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Club</h4>
            <ul className="space-y-3 text-emerald-400/60 text-sm">
              <li className="hover:text-yellow-400"><Link href="#">Historia</Link></li>
              <li className="hover:text-yellow-400"><Link href="#">Estadio</Link></li>
              <li className="hover:text-yellow-400"><Link href="#">Directiva</Link></li>
              <li className="hover:text-yellow-400"><Link href="#">Patrocinadores</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Afición</h4>
            <ul className="space-y-3 text-emerald-400/60 text-sm">
              {/*<li className="hover:text-yellow-400"><Link href="#">Membresías</Link></li>
              <li className="hover:text-yellow-400"><Link href="#">Boletos</Link></li>*/}
              <li className="hover:text-yellow-400"><Link href="/shop">Tienda</Link></li>
              <li className="hover:text-yellow-400"><Link href="#">Wallpapers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Newsletter</h4>
            <p className="text-sm text-emerald-400/60 mb-4">Recibe noticias y promociones exclusivas.</p>
            <div className="flex">
              <input type="email" placeholder="Tu correo"
                     className="bg-emerald-900 border-none text-white px-4 py-2 rounded-l-lg w-full focus:ring-2 focus:ring-yellow-400 outline-none text-sm"/>
              <button
                className="bg-yellow-400 text-emerald-900 font-bold px-4 py-2 rounded-r-lg hover:bg-yellow-300 text-sm">OK
              </button>
            </div>
          </div>
        </div>

        <div
          className="border-t border-emerald-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-emerald-600">
          <p>&copy; 2024 Loros Fútbol Club. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="#">Privacidad</Link>
            <Link href="#">Términos</Link>
            <Link href="#">Contacto</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
