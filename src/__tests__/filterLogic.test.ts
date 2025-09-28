import { describe, it, expect } from 'vitest';
import { Launch } from '../types/spacex';

const launches: Launch[] = [
    { id: '1', name: 'A', date_utc: '2022-01-01', date_local: '2022-01-01', success: true, upcoming: false, details: '', rocket: '', launchpad: '', payloads: [], links: { patch: { small: null, large: null }, reddit: { campaign: null, launch: null, media: null, recovery: null }, flickr: { small: [], original: [] }, presskit: null, webcast: null, youtube_id: null, article: null, wikipedia: null } },
    { id: '2', name: 'B', date_utc: '2022-01-01', date_local: '2022-01-01', success: false, upcoming: false, details: '', rocket: '', launchpad: '', payloads: [], links: { patch: { small: null, large: null }, reddit: { campaign: null, launch: null, media: null, recovery: null }, flickr: { small: [], original: [] }, presskit: null, webcast: null, youtube_id: null, article: null, wikipedia: null } },
];

describe('filter logic', () => {
    it('filters successful launches', () => {
        const filtered = launches.filter(l => l.success);
        expect(filtered.length).toBe(1);
        expect(filtered[0].name).toBe('A');
    });
    it('filters failed launches', () => {
        const filtered = launches.filter(l => l.success === false);
        expect(filtered.length).toBe(1);
        expect(filtered[0].name).toBe('B');
    });
});
