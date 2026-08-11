import {useEffect, useState} from "react";
import {Match} from "../types";
import {get, ref, set} from "firebase/database";
import {database} from "../lib/firebase";
import {normalizeMatch} from "../lib/firebase-data";

export const useNextMatch = () => {
    const [nextMatch, setNextMatch] = useState<Match | null>(null);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;
        const fetchData = async () => {
            try {
                const dataRef = ref(database, 'data/nextMatch');
                const snapshot = await get(dataRef);
                if (!cancelled && snapshot.exists()) {
                    setNextMatch(normalizeMatch(snapshot.val()));
                } else if (!cancelled) {
                    setError('No se encontró información del próximo partido. Captura los datos del nuevo partido.');
                    setNextMatch({
                        opponent: '',
                        opponentLogo: '',
                        date: '',
                        time: '',
                        stadium: '',
                        home: false,
                    });
                }
            } catch (err) {
                if (!cancelled) {
                    setError('No se pudo cargar la información del próximo partido.');
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

    const handleNextMatchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!nextMatch) return;
        const {name, value, type} = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setNextMatch({
            ...nextMatch,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSaveNextMatch = async () => {
        if (!nextMatch) return;
        setError('');
        setSuccess('');
        try {
            const nextMatchRef = ref(database, 'data/nextMatch');
            await set(nextMatchRef, nextMatch);
            setSuccess('La información del próximo partido se guardó correctamente.');
        } catch (err) {
            setError('No se pudo guardar la información del próximo partido. ' + err);
            console.error(err);
        }
    };

    return {
        nextMatch,
        loading,
        success,
        error,
        handleNextMatchChange,
        handleSaveNextMatch
    };
}
