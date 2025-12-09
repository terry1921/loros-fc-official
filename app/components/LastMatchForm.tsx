import React, {useState} from 'react';
import {useLastMatch} from "../hooks/useLastMatch";
import {LoadingSpinner} from '../components';

export const LastMatchForm: React.FC = () => {
  const {
    lastMatch,
    loading,
    success,
    error,
    handleLastMatchChange,
    handleScorerChange,
    addScorer,
    removeScorer,
    handleSaveLastMatch
  } = useLastMatch();
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
      <h3 className="text-xl font-bold mb-4">Edit Last Match</h3>
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
      {lastMatch ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Opponent</label>
            <input type="text" name="opponent" value={lastMatch.opponent} onChange={handleLastMatchChange}
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Opponent Logo</label>
            <input type="text" name="opponentLogo" value={lastMatch.opponentLogo}
                   onChange={handleLastMatchChange}
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Score</label>
            <input type="text" name="score" value={lastMatch.score} onChange={handleLastMatchChange}
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Result</label>
            <select name="result" value={lastMatch.result} onChange={handleLastMatchChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
              <option>W</option>
              <option>L</option>
              <option>D</option>
            </select>
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="home" checked={lastMatch.home} onChange={handleLastMatchChange}
                   className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"/>
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
                  onChange={(event) => handleScorerChange(index, 'quantity', Number.parseInt(event.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                />
                <button onClick={() => removeScorer(index)} className="text-red-500">Remove</button>
              </div>
            ))}
            <button onClick={addScorer} className="mt-2 text-emerald-600">Add Scorer</button>
          </div>
          <div className="md:col-span-2">
            <button onClick={async () => {
              setIsSubmitting(true);
              try {
                await handleSaveLastMatch();
              } finally {
                setIsSubmitting(false);
              }
            }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg">Save
              Last Match
            </button>
          </div>
        </div>
      ) : <p>No match data available to display.</p>}
    </div>)

}
