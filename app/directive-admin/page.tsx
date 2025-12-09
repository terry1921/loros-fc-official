'use client';

import React, { useState, useEffect } from 'react';
import { database } from '../lib/firebase';
import { ref, get, set } from 'firebase/database';
import { SectionTitle } from '../components';
import { Directive } from '../types';
import withAuth from '../components/withAuth';
import { useRouter } from 'next/navigation';

const DirectiveAdminScreen: React.FC = () => {
  const [directive, setDirective] = useState<Directive[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

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

  const handleDirectiveChange = (index: number, field: keyof Directive, value: string) => {
    const updatedDirective = [...directive];
    updatedDirective[index] = { ...updatedDirective[index], [field]: value };
    setDirective(updatedDirective);
  };

  const addMember = () => {
    setDirective([...directive, { name: '', role: '', photoUrl: '' }]);
  };

  const removeMember = (index: number) => {
    const updatedDirective = directive.filter((_, i) => i !== index);
    setDirective(updatedDirective);
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const directiveRef = ref(database, 'data/directive');
      await set(directiveRef, directive);
      setSuccess('Directive data saved successfully!');
    } catch (err) {
      setError('Failed to save directive data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
            <SectionTitle title="Manage Directive" subtitle="Update the board of directors" />
            <button onClick={() => router.push('/admin')} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg">Go Back</button>
        </div>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            {directive.map((member, index) => (
              <div key={index} className="border-b-2 border-gray-200 pb-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor={`name-${index}`} className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      id={`name-${index}`}
                      placeholder="Name"
                      value={member.name}
                      onChange={(e) => handleDirectiveChange(index, 'name', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor={`role-${index}`} className="block text-sm font-medium text-gray-700">Role</label>
                    <input
                      type="text"
                      id={`role-${index}`}
                      placeholder="Role"
                      value={member.role}
                      onChange={(e) => handleDirectiveChange(index, 'role', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor={`photoUrl-${index}`} className="block text-sm font-medium text-gray-700">Photo URL</label>
                    <input
                      type="text"
                      id={`photoUrl-${index}`}
                      placeholder="Photo URL"
                      value={member.photoUrl}
                      onChange={(e) => handleDirectiveChange(index, 'photoUrl', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button onClick={() => removeMember(index)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">Remove</button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-6">
              <button onClick={addMember} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg">Add Member</button>
              <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Save Changes</button>
            </div>
          </div>
        )}
        {success && <p className="text-green-500 mt-4 fixed bottom-4 right-4 bg-white p-4 shadow-lg rounded-lg">{success}</p>}
      </div>
    </div>
  );
};

export default withAuth(DirectiveAdminScreen);
