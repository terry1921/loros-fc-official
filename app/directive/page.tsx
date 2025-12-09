'use client';

import React, { useState, useEffect } from 'react';
import { database } from '../lib/firebase';
import { ref, get } from 'firebase/database';
import { SectionTitle, DirectiveCard } from '../components';
import { Directive } from '../types';

const DirectiveScreen: React.FC = () => {
  const [directive, setDirective] = useState<Directive[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDirective = async () => {
      try {
        const directiveRef = ref(database, 'data/directive');
        const snapshot = await get(directiveRef);
        if (snapshot.exists()) {
          setDirective(Object.values(snapshot.val()));
        } else {
          setError('No directive data found.');
        }
      } catch (err) {
        setError('Failed to fetch directive data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDirective();
  }, []);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Directiva" subtitle="Conoce a nuestro equipo directivo" />
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {directive.map((member, index) => (
              <DirectiveCard
                key={index}
                name={member.name}
                role={member.role}
                photoUrl={member.photoUrl}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectiveScreen;
