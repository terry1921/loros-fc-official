import {useEffect, useState} from "react";
import {Match} from "../types";
import {get, ref, set} from "firebase/database";
import {database} from "../lib/firebase";
import {normalizeMatch} from "../lib/firebase-data";

export const useLastMatch = () => {
  const [lastMatch, setLastMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        const dataRef = ref(database, 'data/lastMatch');
        const snapshot = await get(dataRef);
        if (!cancelled && snapshot.exists()) {
          setLastMatch(normalizeMatch(snapshot.val()));
        } else if (!cancelled) {
          setError('No se encontró información del último partido. Captura los datos del nuevo partido.');
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
        if (!cancelled) {
          setError('No se pudo cargar la información del último partido.');
        }
        console.error(err);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchData();
    return () => {
      cancelled = true;
    };
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
      const payload = lastMatch.scorers && lastMatch.scorers.length > 0
        ? lastMatch
        : Object.fromEntries(Object.entries(lastMatch).filter(([key]) => key !== 'scorers'));
      await set(lastMatchRef, payload);
      setSuccess('La información del último partido se guardó correctamente.');
    } catch (err) {
      setError('No se pudo guardar la información del último partido. ' + err);
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
