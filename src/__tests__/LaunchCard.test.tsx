import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LaunchCard } from '../components/features/LaunchCard';

const launch = {
    id: '1',
    name: 'Falcon 9',
    date_utc: '2022-01-01',
    date_local: '2022-01-01',
    success: true,
    upcoming: false,
    details: 'Test launch',
    rocket: 'rocket1',
    launchpad: 'pad1',
    payloads: [],
    links: { patch: { small: null, large: null }, reddit: { campaign: null, launch: null, media: null, recovery: null }, flickr: { small: [], original: [] }, presskit: null, webcast: null, youtube_id: null, article: null, wikipedia: null }
};

describe('LaunchCard', () => {
    it('renders launch name', () => {
        render(
            <LaunchCard
                launch={launch}
                isFavorite={false}
                onToggleFavorite={() => { }}
                onViewDetails={() => { }}
            />
        );
        expect(screen.getByText('Falcon 9')).toBeInTheDocument();
    });
});