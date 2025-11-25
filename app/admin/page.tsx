'use client';

import React, { useState, useEffect } from 'react';
import { database } from '../lib/firebase';
import { ref, get, set } from 'firebase/database';
import { SectionTitle } from '../components';
import { Match } from '../types';

const AdminScreen: React.FC = () => {
  const [data, setData] = useState('');
  const [lastMatch, setLastMatch] = useState<Match | null>(null);
  const [nextMatch, setNextMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRef = ref(database, 'data');
        const snapshot = await get(dataRef);
        if (snapshot.exists()) {
          const allData = snapshot.val();
          setData(JSON.stringify(allData, null, 2));
          if (allData.lastMatch) {
            setLastMatch(allData.lastMatch);
          }
          if (allData.nextMatch) {
            setNextMatch(allData.nextMatch);
          }
        } else {
          setData('{}');
        }
      } catch (err) {
        setError('Failed to fetch data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSaveJson = async () => {
    setError('');
    setSuccess('');
    try {
      const parsedData = JSON.parse(data);
      const dataRef = ref(database, 'data');
      await set(dataRef, parsedData);
      setSuccess('Data saved successfully!');
    } catch (err) {
      setError('Failed to save data. Make sure it is valid JSON.');
      console.error(err);
    }
  };

  const handleSaveLastMatch = async () => {
    if (!lastMatch) return;
    setError('');
    setSuccess('');
    try {
      const lastMatchRef = ref(database, 'data/lastMatch');
      await set(lastMatchRef, lastMatch);
      setSuccess('Last match data saved successfully!');
    } catch (err) {
      setError('Failed to save last match data.');
      console.error(err);
    }
  };
  
  const handleSaveNextMatch = async () => {
    if (!nextMatch) return;
    setError('');
    setSuccess('');
    try {
      const nextMatchRef = ref(database, 'data/nextMatch');
      await set(nextMatchRef, nextMatch);
      setSuccess('Next match data saved successfully!');
    } catch (err) {
      setError('Failed to save next match data.');
      console.error(err);
    }
  };

  const handleLastMatchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!lastMatch) return;
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setLastMatch({
      ...lastMatch,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleNextMatchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!nextMatch) return;
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setNextMatch({
      ...nextMatch,
      [name]: type === 'checkbox' ? checked : value,
    });
  };


  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Admin Panel" subtitle="Manage application data" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Last Match Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Edit Last Match</h3>
            {lastMatch ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Opponent</label>
                  <input type="text" name="opponent" value={lastMatch.opponent} onChange={handleLastMatchChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Score</label>
                  <input type="text" name="score" value={lastMatch.score} onChange={handleLastMatchChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Result</label>
                  <select name="result" value={lastMatch.result} onChange={handleLastMatchChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                    <option>W</option>
                    <option>L</option>
                    <option>D</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" name="home" checked={lastMatch.home} onChange={handleLastMatchChange} className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                  <label htmlFor="home" className="ml-2 block text-sm text-gray-900">Home Game</label>
                </div>
                <div className="md:col-span-2">
                  <button onClick={handleSaveLastMatch} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg">Save Last Match</button>
                </div>
              </div>
            ) : <p>Loading last match data...</p>}
          </div>

          {/* Next Match Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Edit Next Match</h3>
            {nextMatch ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Opponent</label>
                  <input type="text" name="opponent" value={nextMatch.opponent} onChange={handleNextMatchChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input type="text" name="date" value={nextMatch.date} onChange={handleNextMatchChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
                </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <input type="text" name="time" value={nextMatch.time} onChange={handleNextMatchChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
                </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700">Stadium</label>
                  <input type="text" name="stadium" value={nextMatch.stadium} onChange={handleNextMatchChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
                </div>
                <div className="flex items-center">
                  <input type="checkbox" name="home" checked={nextMatch.home} onChange={handleNextMatchChange} className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                  <label htmlFor="home" className="ml-2 block text-sm text-gray-900">Home Game</label>
                </div>
                <div className="md:col-span-2">
                  <button onClick={handleSaveNextMatch} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg">Save Next Match</button>
                </div>
              </div>
            ) : <p>Loading next match data...</p>}
          </div>
        </div>

        {/* Raw JSON Editor */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Raw Data Editor</h3>
          {loading && <p>Loading data...</p>}
          <textarea
            className="w-full h-96 bg-gray-100 border border-gray-300 rounded-lg p-4 font-mono text-sm"
            value={data}
            onChange={(e) => setData(e.target.value)}
            disabled={loading}
          />
          <div className="mt-4">
            <button
              onClick={handleSaveJson}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              disabled={loading}
            >
              Save All Data
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 mt-4 fixed bottom-4 right-4 bg-white p-4 shadow-lg rounded-lg">{error}</p>}
        {success && <p className="text-green-500 mt-4 fixed bottom-4 right-4 bg-white p-4 shadow-lg rounded-lg">{success}</p>}
      </div>
    </div>
  );
};

export default AdminScreen;
