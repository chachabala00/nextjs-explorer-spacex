import { useState, useEffect, useCallback } from 'react';
import { Launch, LaunchFilters } from '@/types/spacex';
import axios from 'axios';

export function useLaunches(filters: LaunchFilters, favorites?: string[], sortOrder: 'desc' | 'asc' = 'desc') {
    const [launches, setLaunches] = useState<Launch[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLaunches = useCallback(async (retryCount = 0) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get<Launch[]>('https://api.spacexdata.com/v4/launches', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            setLaunches(response.data || []);
        } catch (err: unknown) {
            let errorMessage = 'Failed to fetch launches';
            if (typeof err === 'object' && err !== null) {
                const maybeError = err as { code?: string; message?: string };
                if (maybeError.code === 'ERR_NETWORK') {
                    errorMessage = 'Network error - please check your connection and try again';
                } else if (typeof maybeError.message === 'string') {
                    errorMessage = maybeError.message;
                }
            }
            if (retryCount < 2 && (errorMessage.includes('Network') || errorMessage.includes('Failed to fetch'))) {
                setTimeout(() => {
                    fetchLaunches(retryCount + 1);
                }, Math.pow(2, retryCount) * 1000);
                return;
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLaunches();
    }, [fetchLaunches]);

    const filteredLaunches = launches.filter(launch => {
        if (filters.search && !launch.name.toLowerCase().includes(filters.search.toLowerCase())) {
            return false;
        }
        if (filters.year && filters.year !== 'all') {
            const launchYear = new Date(launch.date_utc).getFullYear().toString();
            if (launchYear !== filters.year) {
                return false;
            }
        }
        if (filters.success !== 'all') {
            if (filters.success === 'success' && launch.success !== true) {
                return false;
            }
            if (filters.success === 'failed' && launch.success !== false) {
                return false;
            }
        }
        if (filters.success === 'favorites' && favorites && !favorites.includes(launch.id)) {
            return false;
        }
        return true;
    });
    const sortedLaunches = filteredLaunches.sort((a, b) => {
        const diff = new Date(a.date_utc).getTime() - new Date(b.date_utc).getTime();
        return sortOrder === 'desc' ? -diff : diff;
    });
    return {
        launches: sortedLaunches,
        loading,
        error,
        refetch: fetchLaunches
    };
}
