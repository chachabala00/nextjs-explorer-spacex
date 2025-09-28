import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SearchAndFilters } from '../components/features/SearchAndFilters';

describe('SearchAndFilters', () => {
    it('renders search input', () => {
        render(
            <SearchAndFilters
                filters={{ search: '', year: 'all', success: 'all', sort: 'desc' }}
                onFiltersChange={() => { }}
                favoritesCount={0}
                showFavorites={false}
                onToggleFavorites={() => { }}
                sortOrder="desc"
                onSortOrderChange={() => { }}
            />
        );
        expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    });
});