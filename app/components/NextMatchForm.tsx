import React, {useState} from 'react';
import {LoadingSpinner} from '../components';
import {useNextMatch} from '../hooks/useNextMatch';

export const NextMatchForm: React.FC = () => {
  const {
    nextMatch,
    loading,
    success,
    error,
    handleNextMatchChange,
    handleSaveNextMatch
  } = useNextMatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) {
    return <div className="bg-white p-6 rounded-lg shadow">
      <LoadingSpinner/>
    </div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow relative">
      {isSubmitting && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <LoadingSpinner/>
        </div>
      )}
      <h3 className="text-xl font-bold mb-4">Edit Next Match</h3>
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                       role="alert">
        <strong className="font-bold">Success!</strong>
        <span className="block sm:inline"> {success}</span>
      </div>}
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                     role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>}
      {nextMatch ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Opponent</label>
            <input type="text" name="opponent" value={nextMatch.opponent} onChange={handleNextMatchChange}
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Opponent Logo</label>
            <input type="text" name="opponentLogo" value={nextMatch.opponentLogo}
                   onChange={handleNextMatchChange}
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input type="text" name="date" value={nextMatch.date} onChange={handleNextMatchChange}
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input type="text" name="time" value={nextMatch.time} onChange={handleNextMatchChange}
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stadium</label>
            <input type="text" name="stadium" value={nextMatch.stadium} onChange={handleNextMatchChange}
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"/>
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="home" checked={nextMatch.home} onChange={handleNextMatchChange}
                   className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"/>
            <label htmlFor="home" className="ml-2 block text-sm text-gray-900">Home Game</label>
          </div>
          <div className="md:col-span-2">
            <button onClick={async () => {
              setIsSubmitting(true);
              try {
                await handleSaveNextMatch();
              } finally {
                setIsSubmitting(false);
              }
            }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg">Save
              Next Match
            </button>
          </div>
        </div>
      ) : <p>No match data available to display.</p>}
    </div>)
}