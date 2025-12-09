'use client';

import React, { useState, useEffect } from 'react';
import { database } from '../lib/firebase';
import { ref, get, set } from 'firebase/database';
import { SectionTitle } from '../components';
import { Sponsor } from '../types';
import withAuth from '../components/withAuth';
import { useRouter } from 'next/navigation';

const SponsorsAdminScreen: React.FC = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const sponsorsRef = ref(database, 'data/sponsors');
        const snapshot = await get(sponsorsRef);
        if (snapshot.exists()) {
          setSponsors(Object.values(snapshot.val()));
        } else {
          setError('No sponsors data found.');
        }
      } catch (err) {
        setError('Failed to fetch sponsors data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  const handleSponsorChange = (index: number, field: keyof Sponsor, value: string) => {
    const updatedSponsors = [...sponsors];
    updatedSponsors[index] = { ...updatedSponsors[index], [field]: value };
    setSponsors(updatedSponsors);
  };

  const addSponsor = () => {
    setSponsors([...sponsors, { name: '', logoUrl: '', url: '' }]);
  };

  const removeSponsor = (index: number) => {
    const updatedSponsors = sponsors.filter((_, i) => i !== index);
    setSponsors(updatedSponsors);
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const sponsorsRef = ref(database, 'data/sponsors');
      await set(sponsorsRef, sponsors);
      setSuccess('Sponsors data saved successfully!');
    } catch (err) {
      setError('Failed to save sponsors data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
            <SectionTitle title="Manage Sponsors" subtitle="Update the sponsors" />
            <button onClick={() => router.push('/admin')} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg">Go Back</button>
        </div>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="border-b-2 border-gray-200 pb-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor={`name-${index}`} className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      id={`name-${index}`}
                      placeholder="Name"
                      value={sponsor.name}
                      onChange={(e) => handleSponsorChange(index, 'name', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor={`logoUrl-${index}`} className="block text-sm font-medium text-gray-700">Logo URL</label>
                    <input
                      type="text"
                      id={`logoUrl-${index}`}
                      placeholder="Logo URL"
                      value={sponsor.logoUrl}
                      onChange={(e) => handleSponsorChange(index, 'logoUrl', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor={`url-${index}`} className="block text-sm font-medium text-gray-700">URL</label>
                    <input
                      type="text"
                      id={`url-${index}`}
                      placeholder="URL"
                      value={sponsor.url}
                      onChange={(e) => handleSponsorChange(index, 'url', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button onClick={() => removeSponsor(index)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">Remove</button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-6">
              <button onClick={addSponsor} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg">Add Sponsor</button>
              <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Save Changes</button>
            </div>
          </div>
        )}
        {success && <p className="text-green-500 mt-4 fixed bottom-4 right-4 bg-white p-4 shadow-lg rounded-lg">{success}</p>}
      </div>
    </div>
  );
};

export default withAuth(SponsorsAdminScreen);
