"use client";

import React, { useState, useEffect } from 'react';

import { useLaunches } from '@/hooks/useLaunches';
import { useLaunchDetails } from '@/hooks/useLaunchDetails';
import { useFavorites } from '@/hooks/useFavorites';
import { useDebounce } from '@/hooks/useDebounce';
import { LaunchFilters } from '@/types/spacex';
import { motion, AnimatePresence } from 'framer-motion';
import { LaunchCard } from '@/components/features/LaunchCard';
import { LaunchDetails } from '@/components/features/LaunchDetails';
import { SearchAndFilters } from '@/components/features/SearchAndFilters';
import { LoadingSkeleton, LaunchDetailsSkeleton } from '@/components/features/LoadingSkeleton';
import { ErrorState } from '@/components/features/ErrorState';
import { EmptyState } from '@/components/ui/empty-state';
import { Pagination } from '@/components/ui/pagination';
import { ResultsInfo } from '@/components/ui/results-info';
import { StatisticsOverview } from '@/components/features/StatisticsOverview';
import { TimelineView } from '@/components/features/TimelineView';
import { AppNavigation } from '@/components/layout/AppNavigation';
import { AnimatedGradientBg } from '@/components/ui/animated-gradient-bg';
import { GlassHeader } from '@/components/ui/glass-header';

// --- Reusable Background Component ---
interface BgProps { children?: React.ReactNode }
const AnimatedBg: React.FC<BgProps> = ({ children }) => (
  <div className="min-h-screen relative overflow-hidden">
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      <div className="absolute top-0 -left-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob bg-purple-500/30" />
      <div className="absolute top-0 -right-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 bg-yellow-500/30" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 bg-pink-500/30" />
    </div>
    <div className="relative max-w-7xl mx-auto p-6">{children}</div>
  </div>
);

export default function Page() {
  // --- Constants ---
  const ITEMS_PER_PAGE = 12;

  // --- State ---
  // Initialize filters from URL query params
  const getInitialFilters = (): LaunchFilters => {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    return {
      search: params?.get('search') || '',
      year: params?.get('year') || 'all',
      success: (params?.get('success') as LaunchFilters['success']) || 'all',
    };
  };
  const [filters, setFilters] = useState<LaunchFilters>(getInitialFilters());
  const [selectedLaunchId, setSelectedLaunchId] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [activeView, setActiveView] = useState('launches');

  // --- Derived Values ---
  const debouncedSearch = useDebounce(filters.search, 300);
  const debouncedFilters = { ...filters, search: debouncedSearch };
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const effectiveFilters = showFavorites
    ? { ...debouncedFilters, success: 'favorites' as const }
    : debouncedFilters;
  const { launches, loading, error, refetch } = useLaunches(effectiveFilters, favorites, sortOrder);
  const { launchDetails, loading: detailsLoading, error: detailsError, refetch: refetchDetails } = useLaunchDetails(selectedLaunchId);
  const totalPages = Math.ceil(launches.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedLaunches = launches.slice(startIndex, endIndex);

  // --- Effects ---
  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  // Reset to page 1 when filters/favorites changes
  const debouncedFiltersStr = JSON.stringify(debouncedFilters);
  useEffect(() => { setCurrentPage(1); }, [debouncedFiltersStr, showFavorites]);

  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.year && filters.year !== 'all') params.set('year', filters.year);
    if (filters.success && filters.success !== 'all') params.set('success', filters.success);
    const query = params.toString();
    const url = query ? `?${query}` : window.location.pathname;
    window.history.replaceState(null, '', url);
  }, [filters]);
  // Clamp current page if launches shrink
  useEffect(() => { if (totalPages > 0 && currentPage > totalPages) setCurrentPage(totalPages); }, [totalPages, currentPage]);

  // --- Handlers ---
  const handleViewDetails = (launchId: string) => setSelectedLaunchId(launchId);
  const handleBackToList = () => setSelectedLaunchId(null);
  const handleToggleFavorites = () => setShowFavorites(f => !f);
  const handleViewChange = (view: string) => {
    setActiveView(view);
    setSelectedLaunchId(null);
  };
  const handlePageChange = (page: number) => setCurrentPage(page);

  // filters and sync to URL
  const handleFiltersChange = (newFilters: LaunchFilters) => {
    setFilters(newFilters);
  };

  // --- Render ---
  if (selectedLaunchId) {
    if (detailsLoading) {
      return <AnimatedBg><LaunchDetailsSkeleton /></AnimatedBg>;
    }
    if (detailsError) {
      return <AnimatedBg><ErrorState message={detailsError} onRetry={refetchDetails} /></AnimatedBg>;
    }
    if (launchDetails) {
      return (
        <AnimatedBg>
          <LaunchDetails
            launchDetails={launchDetails}
            isFavorite={isFavorite(launchDetails.id)}
            onToggleFavorite={toggleFavorite}
            onBack={handleBackToList}
          />
        </AnimatedBg>
      );
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AppNavigation activeView={activeView} onViewChange={handleViewChange} />
      <AnimatedGradientBg />
      <GlassHeader />
      <div className="relative max-w-7xl mx-auto p-6 pb-32">
        <main className="w-full">
          <AnimatePresence mode="wait">
            {activeView === 'launches' && (
              <motion.div key="launches" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <SearchAndFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  favoritesCount={favorites.length}
                  showFavorites={showFavorites}
                  onToggleFavorites={handleToggleFavorites}
                  sortOrder={sortOrder}
                  onSortOrderChange={setSortOrder}
                />
                {loading ? <LoadingSkeleton /> : error ? <ErrorState message={error} onRetry={refetch} /> : paginatedLaunches.length === 0 ? (
                  <EmptyState showFavorites={showFavorites} onShowAll={showFavorites ? () => setShowFavorites(false) : undefined} />
                ) : (
                  <div className="space-y-8">
                    <ResultsInfo
                      startIndex={startIndex}
                      endIndex={endIndex}
                      total={launches.length}
                      showFavorites={showFavorites}
                      currentPage={currentPage}
                      totalPages={totalPages}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {paginatedLaunches.map((launch, index) => (
                        <motion.div key={launch.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                          <LaunchCard
                            launch={launch}
                            isFavorite={isFavorite(launch.id)}
                            onToggleFavorite={toggleFavorite}
                            onViewDetails={handleViewDetails}
                          />
                        </motion.div>
                      ))}
                    </div>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                  </div>
                )}
              </motion.div>
            )}
            {activeView === 'statistics' && (
              <motion.div key="statistics" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <StatisticsOverview launches={launches} />
              </motion.div>
            )}
            {activeView === 'telemetry' && (
              <motion.div key="telemetry" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} />
            )}
            {activeView === 'timeline' && (
              <motion.div key="timeline" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <TimelineView launches={launches} onViewDetails={handleViewDetails} />
              </motion.div>
            )}
            {activeView === 'fleet' && (
              <motion.div key="fleet" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} />
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
