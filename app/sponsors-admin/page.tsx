'use client';

import React, {useState} from 'react';
import {database} from '../lib/firebase';
import {ref, set} from 'firebase/database';
import {DataState, SectionTitle} from '../components';
import {Sponsor} from '../types';
import withAuth from '../components/withAuth';
import {useRouter} from 'next/navigation';
import {createClientStableId, toFirebaseMap} from '../lib/firebase-data';
import {isSponsor} from '../lib/validation';
import {useFirebaseCollection} from '../hooks/useFirebaseCollection';

const SponsorsAdminScreen: React.FC = () => {
  const {items: fetchedSponsors, loading: fetchLoading, error: fetchError, refetch} = useFirebaseCollection<Sponsor>(
    'data/sponsors',
    'No se pudo cargar la información de patrocinadores.',
    {validate: isSponsor},
  );
  const [draftSponsors, setDraftSponsors] = useState<Sponsor[] | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const sponsors = draftSponsors ?? fetchedSponsors;

  const handleSponsorChange = (id: string, field: keyof Omit<Sponsor, 'id'>, value: string) => {
    setDraftSponsors((currentSponsors) => {
      const source = currentSponsors ?? fetchedSponsors;
      return source.map((sponsor) => (
        sponsor.id === id ? {...sponsor, [field]: value} : sponsor
      ));
    });
  };

  const addSponsor = () => {
    setDraftSponsors((currentSponsors) => [
      ...(currentSponsors ?? fetchedSponsors),
      {id: createClientStableId('sponsor'), name: '', logoUrl: '', url: ''},
    ]);
  };

  const removeSponsor = (id: string) => {
    setDraftSponsors((currentSponsors) => (
      (currentSponsors ?? fetchedSponsors).filter((sponsor) => sponsor.id !== id)
    ));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    const validSponsors = sponsors.filter(isSponsor);
    if (validSponsors.length !== sponsors.length) {
      setError('Revisa que cada patrocinador tenga nombre, logotipo y una URL válida con https:// antes de guardar.');
      setSaving(false);
      return;
    }

    try {
      const sponsorsRef = ref(database, 'data/sponsors');
      await set(sponsorsRef, toFirebaseMap(validSponsors));
      setSuccess('La información de patrocinadores se guardó correctamente.');
      setDraftSponsors(null);
      await refetch();
    } catch (err) {
      setError('No se pudo guardar la información de patrocinadores.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <SectionTitle title="Administrar patrocinadores" subtitle="Actualiza los patrocinadores" />
          <button onClick={() => router.push('/admin')} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg">Volver</button>
        </div>
        <DataState
          loading={fetchLoading && sponsors.length === 0}
          error={error || fetchError}
          empty={sponsors.length === 0}
          loadingLabel="Cargando patrocinadores..."
          emptyTitle="No hay patrocinadores registrados"
          emptyMessage="Agrega patrocinadores para mostrarlos en el sitio público."
          emptyActionLabel="Agregar patrocinador"
          onEmptyAction={addSponsor}
        >
          <div className="bg-white p-6 rounded-lg shadow-md">
            {sponsors.map((sponsor) => (
              <div key={sponsor.id} className="border-b-2 border-gray-200 pb-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor={`name-${sponsor.id}`} className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                      type="text"
                      id={`name-${sponsor.id}`}
                      placeholder="Nombre"
                      value={sponsor.name}
                      onChange={(e) => handleSponsorChange(sponsor.id, 'name', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor={`logoUrl-${sponsor.id}`} className="block text-sm font-medium text-gray-700">URL del logotipo</label>
                    <input
                      type="text"
                      id={`logoUrl-${sponsor.id}`}
                      placeholder="URL del logotipo"
                      value={sponsor.logoUrl}
                      onChange={(e) => handleSponsorChange(sponsor.id, 'logoUrl', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor={`url-${sponsor.id}`} className="block text-sm font-medium text-gray-700">URL</label>
                    <input
                      type="text"
                      id={`url-${sponsor.id}`}
                      placeholder="URL"
                      value={sponsor.url}
                      onChange={(e) => handleSponsorChange(sponsor.id, 'url', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button onClick={() => removeSponsor(sponsor.id)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">Eliminar</button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-6">
              <button onClick={addSponsor} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg">Agregar patrocinador</button>
              <button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-2 px-4 rounded-lg">
                {saving ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
          </div>
        </DataState>
        {success && <p className="text-green-500 mt-4 fixed bottom-4 right-4 bg-white p-4 shadow-lg rounded-lg">{success}</p>}
      </div>
    </div>
  );
};

export default withAuth(SponsorsAdminScreen);
