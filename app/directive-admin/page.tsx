'use client';

import React, {useState} from 'react';
import {database} from '../lib/firebase';
import {ref, set} from 'firebase/database';
import {DataState, SectionTitle} from '../components';
import {Directive} from '../types';
import withAuth from '../components/withAuth';
import {useRouter} from 'next/navigation';
import {createClientStableId, toFirebaseMap} from '../lib/firebase-data';
import {isDirective} from '../lib/validation';
import {useFirebaseCollection} from '../hooks/useFirebaseCollection';

const DirectiveAdminScreen: React.FC = () => {
  const {items: fetchedDirective, loading: fetchLoading, error: fetchError, refetch} = useFirebaseCollection<Directive>(
    'data/directive',
    'No se pudo cargar la información de la directiva.',
    {validate: isDirective},
  );
  const [draftDirective, setDraftDirective] = useState<Directive[] | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const directive = draftDirective ?? fetchedDirective;

  const handleDirectiveChange = (id: string, field: keyof Omit<Directive, 'id'>, value: string) => {
    setDraftDirective((currentDirective) => {
      const source = currentDirective ?? fetchedDirective;
      return source.map((member) => (
        member.id === id ? {...member, [field]: value} : member
      ));
    });
  };

  const addMember = () => {
    setDraftDirective((currentDirective) => [
      ...(currentDirective ?? fetchedDirective),
      {id: createClientStableId('directive'), name: '', role: '', photoUrl: ''},
    ]);
  };

  const removeMember = (id: string) => {
    setDraftDirective((currentDirective) => (
      (currentDirective ?? fetchedDirective).filter((member) => member.id !== id)
    ));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    const validDirective = directive.filter(isDirective);
    if (validDirective.length !== directive.length) {
      setError('Revisa que cada integrante tenga nombre, cargo y una fotografía válida antes de guardar.');
      setSaving(false);
      return;
    }

    try {
      const directiveRef = ref(database, 'data/directive');
      await set(directiveRef, toFirebaseMap(validDirective));
      setSuccess('La información de la directiva se guardó correctamente.');
      setDraftDirective(null);
      await refetch();
    } catch (err) {
      setError('No se pudo guardar la información de la directiva.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <SectionTitle title="Administrar directiva" subtitle="Actualiza el equipo directivo" />
          <button onClick={() => router.push('/admin')} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg">Volver</button>
        </div>
        <DataState
          loading={fetchLoading && directive.length === 0}
          error={error || fetchError}
          empty={directive.length === 0}
          loadingLabel="Cargando directiva..."
          emptyTitle="No hay integrantes registrados"
          emptyMessage="Agrega integrantes para completar la directiva."
          emptyActionLabel="Agregar integrante"
          onEmptyAction={addMember}
        >
          <div className="bg-white p-6 rounded-lg shadow-md">
            {directive.map((member) => (
              <div key={member.id} className="border-b-2 border-gray-200 pb-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor={`name-${member.id}`} className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                      type="text"
                      id={`name-${member.id}`}
                      placeholder="Nombre"
                      value={member.name}
                      onChange={(e) => handleDirectiveChange(member.id, 'name', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor={`role-${member.id}`} className="block text-sm font-medium text-gray-700">Cargo</label>
                    <input
                      type="text"
                      id={`role-${member.id}`}
                      placeholder="Cargo"
                      value={member.role}
                      onChange={(e) => handleDirectiveChange(member.id, 'role', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor={`photoUrl-${member.id}`} className="block text-sm font-medium text-gray-700">URL de fotografía</label>
                    <input
                      type="text"
                      id={`photoUrl-${member.id}`}
                      placeholder="URL de fotografía"
                      value={member.photoUrl}
                      onChange={(e) => handleDirectiveChange(member.id, 'photoUrl', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button onClick={() => removeMember(member.id)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">Eliminar</button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-6">
              <button onClick={addMember} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg">Agregar integrante</button>
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

export default withAuth(DirectiveAdminScreen);
