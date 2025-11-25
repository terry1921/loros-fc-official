'use client';

import React, { useState, useEffect } from 'react';
import { database } from '../lib/firebase';
import { ref, get, set } from 'firebase/database';
import { SectionTitle } from '../components';
import { Player } from '../types';

// Generate a unique ID for new players
const generateUniqueId = () => `player_${new Date().getTime()}`;

const PlayersAdminScreen: React.FC = () => {
  const [players, setPlayers] = useState<Record<string, Player>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);

  const fetchPlayers = async () => {
    try {
      const playersRef = ref(database, 'data/players');
      const snapshot = await get(playersRef);
      if (snapshot.exists()) {
        setPlayers(snapshot.val());
      } else {
        setPlayers({});
      }
    } catch (err) {
      setError('Failed to fetch players.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleSavePlayer = async (playerToSave: Player) => {
    if (!playerToSave.id) return;
    setError('');
    setSuccess('');
    try {
      const playerRef = ref(database, `data/players/${playerToSave.id}`);
      await set(playerRef, playerToSave);
      setSuccess(`Player ${playerToSave.name} saved successfully!`);
      setEditingPlayer(null);
      fetchPlayers(); // Refresh the list
    } catch (err) {
      setError('Failed to save player.');
      console.error(err);
    }
  };

  const handleDeletePlayer = async (playerId: string) => {
    if (!window.confirm("Are you sure you want to delete this player?")) return;
    setError('');
    setSuccess('');
    try {
      const playerRef = ref(database, `data/players/${playerId}`);
      await set(playerRef, null);
      setSuccess('Player deleted successfully!');
      fetchPlayers(); // Refresh the list
    } catch (err) {
      setError('Failed to delete player.');
      console.error(err);
    }
  };

  const handleAddNewPlayer = () => {
    setEditingPlayer({
      id: generateUniqueId(),
      name: '',
      position: 'Goalkeeper',
      number: 0,
      img: 'bg-red-200',
      photoUrl: '/assets/default_player.png',
      active: true,
    });
  };

  const PlayerForm = ({ player, onSave }: { player: Player, onSave: (player: Player) => void }) => {
    const [formData, setFormData] = useState(player);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="text-xl font-bold mb-4">{player.id.startsWith('player_') ? 'Add New Player' : 'Edit Player'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Number</label>
                <input type="number" name="number" value={formData.number} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <select name="position" value={formData.position} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm">
                    <option>Goalkeeper</option>
                    <option>Defender</option>
                    <option>Midfielder</option>
                    <option>Forward</option>
                </select>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Photo URL</label>
                <input type="text" name="photoUrl" value={formData.photoUrl} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>
            <div className="flex items-center">
                <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} className="h-4 w-4 rounded border-gray-300" />
                <label htmlFor="active" className="ml-2 block text-sm text-gray-900">Active</label>
            </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
            <button onClick={() => setEditingPlayer(null)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg">Cancel</button>
            <button onClick={() => onSave(formData)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg">Save Player</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Players Admin" subtitle="Manage your team players" />

        {editingPlayer ? (
            <PlayerForm player={editingPlayer} onSave={handleSavePlayer} />
        ) : (
            <div className="flex justify-end mb-4">
                <button onClick={handleAddNewPlayer} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg">+ Add New Player</button>
            </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Current Players</h3>
            {loading ? <p>Loading players...</p> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.values(players).map(player => (
                        <div key={player.id} className="p-4 border rounded-lg flex justify-between items-center">
                            <div>
                                <p className="font-bold">{player.name} (#{player.number})</p>
                                <p className="text-sm text-gray-600">{player.position}</p>
                                <p className={`text-sm font-semibold ${player.active ? 'text-green-600' : 'text-red-600'}`}>
                                    {player.active ? 'Active' : 'Inactive'}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setEditingPlayer(player)} className="text-blue-500 hover:underline">Edit</button>
                                <button onClick={() => handleDeletePlayer(player.id)} className="text-red-500 hover:underline">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {error && <p className="text-red-500 mt-4 fixed bottom-4 right-4 bg-white p-4 shadow-lg rounded-lg">{error}</p>}
        {success && <p className="text-green-500 mt-4 fixed bottom-4 right-4 bg-white p-4 shadow-lg rounded-lg">{success}</p>}
      </div>
    </div>
  );
};

export default PlayersAdminScreen;
