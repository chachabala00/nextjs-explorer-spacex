import React from 'react';
import { Filter, Search, Sparkles, Star } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';

import { LaunchFilters } from '../../types/spacex';

interface SearchAndFiltersProps {
    filters: LaunchFilters;
    onFiltersChange: (filters: LaunchFilters) => void;
    favoritesCount: number;
    showFavorites: boolean;
    onToggleFavorites: () => void;
    sortOrder: 'desc' | 'asc';
    onSortOrderChange: (order: 'desc' | 'asc') => void;
}
export function SearchAndFilters({
    filters,
    onFiltersChange,
    favoritesCount,
    showFavorites,
    onToggleFavorites,
    sortOrder,
    onSortOrderChange
}: SearchAndFiltersProps) {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 25 }, (_, i) => currentYear - i);

    return (
        <div className="mb-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 shadow-2xl">
            {/* Search */}
            <div className="mb-4 w-full">
                <div className="relative w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/70 w-5 h-5" />
                    <Input
                        placeholder="Search missions..."
                        value={filters.search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFiltersChange({ ...filters, search: e.target.value })}
                        className="pl-12 h-12 bg-white/10 border-white/20 focus:border-primary/50 rounded-xl w-full"
                    />
                </div>
            </div>

            {/* Filters Row - responsive */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 overflow-x-auto pb-1">
                {/* Year Filter */}
                <div className="flex items-center gap-2 min-w-[160px]">
                    <div className="p-2 bg-white/10 rounded-lg">
                        <Filter className="text-primary w-4 h-4" />
                    </div>
                    <Select
                        value={filters.year}
                        onValueChange={(value: string) => onFiltersChange({ ...filters, year: value })}
                    >
                        <SelectTrigger className="w-28 sm:w-36 h-10 bg-white/10 border-white/20 rounded-lg">
                            <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent className="bg-white/10 backdrop-blur-xl border border-white/20 text-white">
                            <SelectItem value="all">All Years</SelectItem>
                            {years.map(year => (
                                <SelectItem key={year} value={year.toString()}>
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Success Filter */}
                <div className="min-w-[140px]">
                    <Select
                        value={filters.success}
                        onValueChange={(value: string) => onFiltersChange({ ...filters, success: value as 'all' | 'success' | 'failed' })}
                    >
                        <SelectTrigger className="h-10 bg-white/10 border-white/20 rounded-lg w-full">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white/10 backdrop-blur-xl border border-white/20 text-white">
                            <SelectItem value="all">All Launches</SelectItem>
                            <SelectItem value="success">Successful</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Sort Order Toggle */}
                <Button
                    variant="outline"
                    className="h-10 px-4 bg-white/10 border-white/20 rounded-lg flex items-center gap-2 whitespace-nowrap min-w-[120px]"
                    onClick={() => onSortOrderChange(sortOrder === 'desc' ? 'asc' : 'desc')}
                    aria-label="Toggle sort order"
                >
                    {sortOrder === 'desc' ? (
                        <>
                            <span className="font-medium">Newest</span>
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </>
                    ) : (
                        <>
                            <span className="font-medium">Oldest</span>
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                        </>
                    )}
                </Button>

                {/* Favorites Button */}
                <Button
                    variant={showFavorites ? "default" : "outline"}
                    size="sm"
                    onClick={onToggleFavorites}
                    className={`h-10 px-4 flex items-center gap-2 rounded-lg whitespace-nowrap min-w-[120px] ${showFavorites
                        ? 'bg-gradient-to-r from-primary to-primary/90'
                        : 'bg-white/10 border-white/20'
                        }`}
                >
                    <Star className={`w-4 h-4 ${showFavorites ? 'fill-current' : ''}`} />
                    <span>Favorites</span>
                    {favoritesCount > 0 && (
                        <div className="relative">
                            <Badge className="ml-1 h-5 px-2 bg-white/20">
                                {favoritesCount}
                            </Badge>
                            <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400" />
                        </div>
                    )}
                </Button>
            </div>
        </div>
    );
}
