import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ErrorState } from '../components/features/ErrorState';

describe('ErrorState', () => {
    it('renders error message in both heading and paragraph', () => {
        render(<ErrorState message="Something went wrong" />);
        const all = screen.getAllByText('Something went wrong');
        expect(all.length).toBeGreaterThanOrEqual(2);
        all.forEach(el => expect(el).toBeInTheDocument());
    });
});