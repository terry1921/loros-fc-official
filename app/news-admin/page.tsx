'use client';

import React, {useState} from 'react';
import {database} from '../lib/firebase';
import {ref, set} from 'firebase/database';
import {SectionTitle} from '../components';
import {News} from '../types';
import withAuth from '../components/withAuth';
import {useNews} from '../hooks/useNews';

const generateUniqueId = () => `news_${new Date().getTime()}`;

const NewsAdminScreen: React.FC = () => {
  const { news, loading, error: newsError, refetch } = useNews();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [editingNews, setEditingNews] = useState<News | null>(null);

  const handleSaveNews = async (newsToSave: News) => {
    if (!newsToSave.id) return;
    setError('');
    setSuccess('');
    try {
      const newsRef = ref(database, `data/news/${newsToSave.id}`);
      const finalNews = newsToSave.id.startsWith('news_')
        ? { ...newsToSave, date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }
        : newsToSave;

      await set(newsRef, finalNews);
      setSuccess(`News article "${finalNews.title}" saved successfully!`);
      setEditingNews(null);
      refetch();
    } catch (err) {
      setError('Failed to save news article.');
      console.error(err);
    }
  };

  const handleDeleteNews = async (newsId: string) => {
    if (!window.confirm("Are you sure you want to delete this news article?")) return;
    setError('');
    setSuccess('');
    try {
      const newsRef = ref(database, `data/news/${newsId}`);
      await set(newsRef, null);
      setSuccess('News article deleted successfully!');
      refetch();
    } catch (err) {
      setError('Failed to delete news article.');
      console.error(err);
    }
  };

  const handleAddNewNews = () => {
    setEditingNews({
      id: generateUniqueId(),
      title: '',
      date: '',
      image: '/assets/news/default.png',
      category: '',
      content: '',
      summary: '',
      active: true,
    });
  };

  const NewsForm = ({ newsItem, onSave }: { newsItem: News, onSave: (news: News) => void }) => {
    const [formData, setFormData] = useState(newsItem);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="text-xl font-bold mb-4">{newsItem.id.startsWith('news_') ? 'Add New Article' : 'Edit Article'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea name="content" value={formData.content} onChange={handleChange} rows={6} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm">
                <option></option>
                <option>Torneo Fut 6</option>
                <option>Liga Premier</option>
              </select>
            </div>
            <div className="flex items-center">
                <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} className="h-4 w-4 rounded border-gray-300" />
                <label htmlFor="active" className="ml-2 block text-sm text-gray-900">Active</label>
            </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
            <button onClick={() => setEditingNews(null)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg">Cancel</button>
            <button onClick={() => onSave(formData)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg">Save Article</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="News Admin" subtitle="Manage your news articles" />

        {editingNews ? (
            <NewsForm newsItem={editingNews} onSave={handleSaveNews} />
        ) : (
            <div className="flex justify-end mb-4">
                <button onClick={handleAddNewNews} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg">+ Add New Article</button>
            </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Current Articles</h3>
            {loading ? <p>Loading articles...</p> : (
                <div className="space-y-4">
                    {Object.values(news).reverse().map(article => (
                        <div key={article.id} className="p-4 border rounded-lg flex justify-between items-center">
                            <div>
                                <p className="font-bold">{article.title}</p>
                                <p className="text-sm text-gray-600">{article.date}</p>
                                <p className={`text-sm font-semibold ${article.active ? 'text-green-600' : 'text-red-600'}`}>
                                    {article.active ? 'Active' : 'Inactive'}
                                </p>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                                <button onClick={() => setEditingNews(article)} className="text-blue-500 hover:underline">Edit</button>
                                <button onClick={() => handleDeleteNews(article.id)} className="text-red-500 hover:underline">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {newsError && <p className="text-red-500 mt-4 fixed bottom-4 right-4 bg-white p-4 shadow-lg rounded-lg">{newsError}</p>}
        {error && <p className="text-red-500 mt-4 fixed bottom-4 right-4 bg-white p-4 shadow-lg rounded-lg">{error}</p>}
        {success && <p className="text-green-500 mt-4 fixed bottom-4 right-4 bg-white p-4 shadow-lg rounded-lg">{success}</p>}
      </div>
    </div>
  );
};

export default withAuth(NewsAdminScreen);
