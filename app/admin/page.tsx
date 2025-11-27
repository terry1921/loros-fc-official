'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { database, auth } from '../lib/firebase';
import { ref, get, set } from 'firebase/database';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { SectionTitle } from '../components';
import { Match, Scorer } from '../types';

const AdminScreen: React.FC = () => {
  const [lastMatch, setLastMatch] = useState<Match | null>(null);
  const [nextMatch, setNextMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRef = ref(database, 'data');
        const snapshot = await get(dataRef);
        if (snapshot.exists()) {
          const allData = snapshot.val();
          if (allData.lastMatch) {
            const matchData = allData.lastMatch;
            if (matchData.scorers && !Array.isArray(matchData.scorers)) {
                matchData.scorers = Object.values(matchData.scorers);
            }
            setLastMatch(matchData);
          }
          if (allData.nextMatch) {
            setNextMatch(allData.nextMatch);
          }
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

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
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

  const handleScorerChange = (index: number, field: 'name' | 'quantity', value: string | number) => {
    if (!lastMatch || !lastMatch.scorers) return;
    const updatedScorers = [...lastMatch.scorers];
    updatedScorers[index] = { ...updatedScorers[index], [field]: value };
    setLastMatch({ ...lastMatch, scorers: updatedScorers });
  };

  const addScorer = () => {
    if (!lastMatch) return;
    const newScorers = [...(lastMatch.scorers || []), { name: '', quantity: 1 }];
    setLastMatch({ ...lastMatch, scorers: newScorers });
  };

  const removeScorer = (index: number) => {
    if (!lastMatch || !lastMatch.scorers) return;
    const updatedScorers = lastMatch.scorers.filter((_, i) => i !== index);
    setLastMatch({ ...lastMatch, scorers: updatedScorers });
  };


  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <SectionTitle title="Admin Panel" subtitle="Manage application data" />
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
            Logout
          </button>
        </div>

        <div className="mb-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Admin Sections</h3>
            <div className="flex flex-wrap gap-4">
                <Link href="/players-admin" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg">
                    Manage Players
                </Link>
                <Link href="/news-admin" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg">
                    Manage News
                </Link>
            </div>
        </div>
        
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
                  <label className="block text-sm font-medium text-gray-700">Opponent Logo</label>
                  <input type="text" name="opponentLogo" value={lastMatch.opponentLogo} onChange={handleLastMatchChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
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
                  <label className="block text-sm font-medium text-gray-700">Scorers</label>
                  {(lastMatch.scorers || []).map((scorer, index) => (
                    <div key={index} className="flex items-center gap-2 mt-2">
                      <input
                        type="text"
                        placeholder="Name"
                        value={scorer.name}
                        onChange={(e) => handleScorerChange(index, 'name', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Quantity"
                        value={scorer.quantity}
                        onChange={(e) => handleScorerChange(index, 'quantity', parseInt(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                      />
                      <button onClick={() => removeScorer(index)} className="text-red-500">Remove</button>
                    </div>
                  ))}
                  <button onClick={addScorer} className="mt-2 text-emerald-600">Add Scorer</button>
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
                  <label className="block text-sm font-medium text-gray-700">Opponent Logo</label>
                  <input type="text" name="opponentLogo" value={nextMatch.opponentLogo} onChange={handleNextMatchChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
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

        {error && <p className="text-red-500 mt-4 fixed bottom-4 right-4 bg-white p-4 shadow-lg rounded-lg">{error}</p>}
        {success && <p className="text-green-500 mt-4 fixed bottom-4 right-4 bg-white p-4 shadow-lg rounded-lg">{success}</p>}
      </div>
    </div>
  );
};

export default AdminScreen;
