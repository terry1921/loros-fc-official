'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { database } from '../lib/firebase';
import { ref, get, set, push, remove } from 'firebase/database';
import { SectionTitle } from '../components';
import { Product, Category } from '../types';
import withAuth from '../components/withAuth';

const ProductsAdminScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productsRef = ref(database, 'data/products');
      const snapshot = await get(productsRef);
      if (snapshot.exists()) {
        const productsData = snapshot.val();
        const productsList = Object.keys(productsData).map(key => ({ ...productsData[key], id: key }));
        setProducts(productsList);
      } else {
        setProducts([]);
      }
    } catch (err) {
      setError('Failed to fetch products.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProduct = async () => {
    if (!activeProduct) return;
    setError('');
    setSuccess('');
    try {
      const productToSave = { ...activeProduct };
      const productRef = productToSave.id ? ref(database, `data/products/${productToSave.id}`) : push(ref(database, 'data/products'));

      const { id, ...dbProduct } = productToSave;
      
      await set(productRef, dbProduct);
      setSuccess('Product saved successfully!');
      setActiveProduct(null);
      fetchProducts();
    } catch (err) {
      setError('Failed to save product.');
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setError('');
      setSuccess('');
      try {
        const productRef = ref(database, `data/products/${id}`);
        await remove(productRef);
        setSuccess('Product deleted successfully!');
        fetchProducts();
      } catch (err) {
        setError('Failed to delete product.');
        console.error(err);
      }
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setActiveProduct(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleFeatureChange = (index: number, value: string) => {
    setActiveProduct(prev => {
        if (!prev) return null;
        const updatedFeatures = [...prev.features];
        updatedFeatures[index] = value;
        return { ...prev, features: updatedFeatures };
    });
  };

  const addFeature = () => {
    setActiveProduct(prev => prev ? { ...prev, features: [...prev.features, ''] } : null);
  };

  const removeFeature = (index: number) => {
    setActiveProduct(prev => {
        if (!prev) return null;
        const updatedFeatures = prev.features.filter((_, i) => i !== index);
        return { ...prev, features: updatedFeatures };
    });
  };

  const openEditForm = (product: Product) => {
    setActiveProduct(product);
  };

  const openAddForm = () => {
    setActiveProduct({
      id: '',
      name: '',
      category: 'Playera',
      image: '',
      features: [],
      url: ''
    });
  };

  const categories: Category[] = ['Playera', 'Sticker', 'Pin', 'Iman', 'Bumper Sticker'];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <SectionTitle title="Manage Products" subtitle="Add, edit, or delete products" />
          <Link href="/admin" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">
            Back to Admin
          </Link>
        </div>

        {activeProduct && (
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h3 className="text-xl font-bold mb-4">{activeProduct.id ? 'Edit Product' : 'Add New Product'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" value={activeProduct.name} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select name="category" value={activeProduct.category} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input type="text" name="image" value={activeProduct.image} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Product URL</label>
                <input type="text" name="url" value={activeProduct.url} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Features</label>
                {activeProduct.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 mt-2">
                    <input type="text" placeholder="Feature" value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
                    <button onClick={() => removeFeature(index)} className="text-red-500">Remove</button>
                  </div>
                ))}
                <button onClick={addFeature} className="mt-2 text-emerald-600">Add Feature</button>
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              <button onClick={handleSaveProduct} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg">Save Product</button>
              <button onClick={() => setActiveProduct(null)} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">Cancel</button>
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Product List</h3>
            <button onClick={openAddForm} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg">
              Add New Product
            </button>
          </div>
          {loading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map(product => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => openEditForm(product)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                        <button onClick={() => handleDeleteProduct(product.id)} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {error && <p className="text-red-500 mt-4 fixed bottom-4 right-4 bg-white p-4 shadow-lg rounded-lg">{error}</p>}
        {success && <p className="text-green-500 mt-4 fixed bottom-4 right-4 bg-white p-4 shadow-lg rounded-lg">{success}</p>}
      </div>
    </div>
  );
};

export default withAuth(ProductsAdminScreen);
