import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useLaunches } from '../hooks/useLaunches';

describe('useLaunches', () => {
    it('returns initial state', () => {
        const { result } = renderHook(() => useLaunches({ search: '', year: 'all', success: 'all' }));
        expect(result.current.launches).toEqual([]);
        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBeNull();
    });
});
