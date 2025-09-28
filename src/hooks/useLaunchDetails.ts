
import { Launch, LaunchDetails } from '@/types/spacex';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export function useLaunchDetails(launchId: string | null) {
    const [launchDetails, setLaunchDetails] = useState<LaunchDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchLaunchDetails = useCallback(async (id: string, retryCount = 0) => {
        try {
            setLoading(true);
            setError(null);
            const launchResponse = await axios.get<Launch>(`https://api.spacexdata.com/v4/launches/${id}`);
            const launch = launchResponse.data;
            const fetchWithFallback = async (url: string) => {
                try {
                    const response = await axios.get(url);
                    return response.data;
                } catch {
                    return null;
                }
            };
            const requests = [
                fetchWithFallback(`https://api.spacexdata.com/v4/rockets/${launch.rocket}`),
                fetchWithFallback(`https://api.spacexdata.com/v4/launchpads/${launch.launchpad}`),
                ...(launch.payloads || []).map((payloadId: string) =>
                    fetchWithFallback(`https://api.spacexdata.com/v4/payloads/${payloadId}`)
                )
            ];
            const [rocket, launchpad, ...payloads] = await Promise.all(requests);
            const validPayloads = payloads.filter(Boolean);
            const details: LaunchDetails = {
                ...launch,
                rocket_details: rocket,
                launchpad_details: launchpad,
                payloads_details: validPayloads
            };
            setLaunchDetails(details);
        } catch (err: unknown) {
            let errorMessage = 'Failed to fetch launch details';
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
                    fetchLaunchDetails(id, retryCount + 1);
                }, Math.pow(2, retryCount) * 1000);
                return;
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (launchId) {
            fetchLaunchDetails(launchId);
        } else {
            setLaunchDetails(null);
        }
    }, [launchId, fetchLaunchDetails]);

    return {
        launchDetails,
        loading,
        error,
        refetch: launchId ? () => fetchLaunchDetails(launchId) : undefined
    };
}
