'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {DataState} from '../components';
import { Product } from '../types';
import {useFirebaseCollection} from '../hooks/useFirebaseCollection';

const ShopScreen: React.FC = () => {
  const {items: products, loading, error, refetch} = useFirebaseCollection<Product>(
    'data/products',
    'No se pudieron cargar los productos.',
  );

  return (
    <>
      <section className="relative overflow-hidden bg-emerald-950 py-16 text-white md:py-20">
        <div className="absolute inset-0 bg-[url('/assets/textures/carbon-fibre.svg')] opacity-20" aria-hidden="true" />
      </section>
      <div className="pt-16 pb-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800">Todos los productos</h1>
          <p className="text-gray-600 mt-4 text-lg">Explora nuestra colección completa de artículos hechos a mano de alta calidad.</p>
        </div>
        <DataState
          loading={loading}
          error={error}
          empty={products.length === 0}
          loadingLabel="Cargando productos..."
          emptyTitle="No hay productos disponibles"
          emptyMessage="La tienda se actualizará próximamente."
          onRetry={() => void refetch()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group flex flex-col">
                <div className="p-8 bg-gray-100 flex items-center justify-center h-64">
                  <Image src={product.image} alt={product.name} width={200} height={200} sizes="(min-width: 1024px) 200px, 50vw" className="group-hover:scale-105 transition-transform duration-300 object-contain h-full"/>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                  <span className="text-sm text-gray-600 bg-gray-200/80 px-3 py-1 rounded-full self-start my-4">{product.category}</span>
                  <ul className="mt-auto space-y-2 text-gray-700 text-sm list-disc list-inside">
                    {product.features.map(feature => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link href={product.url} target='_blank'>
                      <span className="block w-full text-center bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-bold text-lg">
                        Ver Producto
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DataState>
      </div>
    </div>
    </>
  );
};

export default ShopScreen;
