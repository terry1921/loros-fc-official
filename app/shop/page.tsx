import React from 'react';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../components';

const ShopScreen: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
            <ShoppingBag size={80} className="mx-auto text-emerald-200 mb-6" />
            <h2 className="text-4xl font-bold text-emerald-900 mb-4">Tienda Oficial</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">Estamos actualizando el inventario con la nueva colección 2024. ¡Vuelve pronto!</p>
            <Link href="/">
              <Button variant="primary">Volver al Inicio</Button>
            </Link>
        </div>
    </div>
  );
};

export default ShopScreen;
