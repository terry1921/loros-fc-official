import {useEffect, useState} from "react";
import {Match} from "../types";
import {get, ref, set} from "firebase/database";
import {database} from "../lib/firebase";

export const useNextMatch = () => {
    const [nextMatch, setNextMatch] = useState<Match | null>(null);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataRef = ref(database, 'data/nextMatch');
                const snapshot = await get(dataRef);
                if (snapshot.exists()) {
                    setNextMatch(snapshot.val());
                } else {
                    setError('No next match data found. Please enter details for the new match.');
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
                setError('Failed to fetch data. ' + err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
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
            setSuccess('Next match data saved successfully!');
        } catch (err) {
            setError('Failed to save next match data. ' + err);
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
