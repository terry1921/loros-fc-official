'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { database } from '../lib/firebase';
import { ref, get } from 'firebase/database';
import { Product } from '../types';

const ShopScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = ref(database, 'data/products');
        const snapshot = await get(productsRef);
        if (snapshot.exists()) {
          const productsData = snapshot.val();
          const productsList = Object.values(productsData);
          setProducts(productsList as Product[]);
        } else {
          setError('No products found.');
        }
      } catch (err) {
        setError('Failed to fetch products.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="pt-32 pb-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800">Todos los productos</h1>
          <p className="text-gray-600 mt-4 text-lg">Explora nuestra colección completa de artículos hechos a mano de alta calidad.</p>
        </div>
        {loading ? (
          <p className="text-center">Cargando productos...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group flex flex-col">
                <div className="p-8 bg-gray-100 flex items-center justify-center h-64">
                  <Image src={product.image} alt={product.name} width={200} height={200} className="group-hover:scale-105 transition-transform duration-300 object-contain h-full"/>
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
        )}
      </div>
    </div>
  );
};

export default ShopScreen;
