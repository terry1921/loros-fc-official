'use client';

import React, { useState, useEffect } from 'react';
import { database } from '../lib/firebase';
import { ref, get } from 'firebase/database';
import { SectionTitle } from '../components';
import { Sponsor } from '../types';

const SponsorsScreen: React.FC = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="pt-32 pb-20 min-h-screen bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle title="Patrocinadores" subtitle="Gracias a nuestros patrocinadores por su apoyo" />
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {sponsors.map((sponsor, index) => (
              <a href={sponsor.url} key={index} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img src={sponsor.logoUrl} alt={sponsor.name} className="max-h-24" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SponsorsScreen;
