import {useEffect, useState} from "react";
import {Match} from "../types";
import {get, ref, set} from "firebase/database";
import {database} from "../lib/firebase";

export const useLastMatch = () => {
  const [lastMatch, setLastMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRef = ref(database, 'data/lastMatch');
        const snapshot = await get(dataRef);
        if (snapshot.exists()) {
          const matchData = snapshot.val();
          if (matchData.scorers && !Array.isArray(matchData.scorers)) {
            matchData.scorers = Object.values(matchData.scorers);
          }
          setLastMatch(matchData);
        } else {
          setError('No last match data found. Please enter details for the new match.');
          setLastMatch({
            opponent: '',
            opponentLogo: '',
            score: '',
            result: 'D',
            home: false,
            scorers: []
          });
        }
      } catch (err) {
        setError('Failed to fetch data. ' + err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLastMatchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!lastMatch) return;
    const {name, value, type} = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setLastMatch({
      ...lastMatch,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleScorerChange = (index: number, field: 'name' | 'quantity', value: string | number) => {
    if (!lastMatch || !lastMatch.scorers) return;
    const updatedScorers = [...lastMatch.scorers];
    updatedScorers[index] = {...updatedScorers[index], [field]: value};
    setLastMatch({...lastMatch, scorers: updatedScorers});
  };

  const addScorer = () => {
    if (!lastMatch) return;
    const newScorers = [...(lastMatch.scorers || []), {name: '', quantity: 1}];
    setLastMatch({...lastMatch, scorers: newScorers});
  };

  const removeScorer = (index: number) => {
    if (!lastMatch || !lastMatch.scorers) return;
    const updatedScorers = lastMatch.scorers.filter((_, i) => i !== index);
    setLastMatch({...lastMatch, scorers: updatedScorers});
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
      setError('Failed to save last match data. ' + err);
      console.error(err);
    }
  };

  return {
    lastMatch,
    loading,
    success,
    error,
    handleLastMatchChange,
    handleScorerChange,
    addScorer,
    removeScorer,
    handleSaveLastMatch
  };
}
