'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Shield, X } from 'lucide-react';
import { Button } from '../Button';

const CustomNavLink = ({ href, label, closeMenu }: { href: string, label: string, closeMenu: () => void }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={closeMenu}
      className={`text-sm font-bold uppercase tracking-wider hover:text-yellow-400 transition-colors ${isActive ? 'text-yellow-400' : 'text-white'}`}>
      {label}
    </Link>
  );
};

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
      setIsMenuOpen(false);
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-emerald-900 shadow-lg py-2' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-emerald-900 shadow-lg border-2 border-white">
            <Shield size={24} fill="currentColor" />
          </div>
          <span className={`text-2xl font-black tracking-tighter text-white italic`}>
            LOROS<span className="text-yellow-400">FC</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <CustomNavLink href="/" label="Inicio" closeMenu={closeMenu} />
          <CustomNavLink href="/squad" label="Equipo" closeMenu={closeMenu} />
          <CustomNavLink href="/news" label="Noticias" closeMenu={closeMenu} />
          <CustomNavLink href="/shop" label="Tienda" closeMenu={closeMenu} />
          {/*<Button variant="primary" className="ml-4 text-sm">Boletos</Button>*/}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-emerald-900 border-t border-emerald-800 p-6 flex flex-col gap-6 shadow-2xl">
          <CustomNavLink href="/" label="Inicio" closeMenu={closeMenu} />
          <CustomNavLink href="/squad" label="Equipo" closeMenu={closeMenu} />
          <CustomNavLink href="/news" label="Noticias" closeMenu={closeMenu} />
          <CustomNavLink href="/shop" label="Tienda" closeMenu={closeMenu} />
          <Button variant="primary" className="w-full justify-center">Comprar Boletos</Button>
        </div>
      )}
    </nav>
  );
};