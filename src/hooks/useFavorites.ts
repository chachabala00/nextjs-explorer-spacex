import { useState, useEffect } from 'react';

export function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>([]);
    useEffect(() => {
        try {
            const stored = localStorage.getItem('spacex-favorites');
            if (stored && stored !== 'null' && stored !== 'undefined') {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    setFavorites(parsed);
                } else {
                    localStorage.removeItem('spacex-favorites');
                    setFavorites([]);
                }
            } else {
                setFavorites([]);
            }
        } catch (error) {
            localStorage.removeItem('spacex-favorites');
            setFavorites([]);
        }
    }, []);
    const addFavorite = (launchId: string) => {
        const newFavorites = [...favorites, launchId];
        setFavorites(newFavorites);
        localStorage.setItem('spacex-favorites', JSON.stringify(newFavorites));
    };
    const removeFavorite = (launchId: string) => {
        const newFavorites = favorites.filter(id => id !== launchId);
        setFavorites(newFavorites);
        localStorage.setItem('spacex-favorites', JSON.stringify(newFavorites));
    };
    const isFavorite = (launchId: string) => {
        return favorites.includes(launchId);
    };
    const toggleFavorite = (launchId: string) => {
        if (isFavorite(launchId)) {
            removeFavorite(launchId);
        } else {
            addFavorite(launchId);
        }
    };
    return {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite
    };
}
