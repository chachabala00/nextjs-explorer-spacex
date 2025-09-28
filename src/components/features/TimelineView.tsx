import React, { useState } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Launch } from '../../types/spacex';

interface TimelineViewProps {
    launches: Launch[];
    onViewDetails: (launchId: string) => void;
}

export function TimelineView({ launches, onViewDetails }: TimelineViewProps) {
    // Find the most recent year with data
    const groupedLaunches = launches.reduce((acc, launch) => {
        const date = new Date(launch.date_local);
        const year = date.getFullYear();
        const month = date.getMonth();
        if (!acc[year]) acc[year] = {};
        if (!acc[year][month]) acc[year][month] = [];
        acc[year][month].push(launch);
        return acc;
    }, {} as Record<number, Record<number, Launch[]>>);

    const availableYears = Object.keys(groupedLaunches)
        .map(Number)
        .sort((a, b) => b - a);

    const [selectedYear, setSelectedYear] = useState(
        availableYears.length > 0 ? availableYears[0] : new Date().getFullYear()
    );
    const [viewMode, setViewMode] = useState<'month' | 'year'>('year');


    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const getStatusColor = (launch: Launch) => {
        if (launch.upcoming) return 'border-blue-500 text-blue-400 bg-blue-500/10';
        if (launch.success === true) return 'border-green-500 text-green-400 bg-green-500/10';
        if (launch.success === false) return 'border-red-500 text-red-400 bg-red-500/10';
        return 'border-gray-500 text-gray-400 bg-gray-500/10';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const navigateYear = (direction: 'prev' | 'next') => {
        const currentIndex = availableYears.indexOf(selectedYear);
        if (direction === 'prev' && currentIndex < availableYears.length - 1) {
            setSelectedYear(availableYears[currentIndex + 1]);
        } else if (direction === 'next' && currentIndex > 0) {
            setSelectedYear(availableYears[currentIndex - 1]);
        }
    };

    const currentYearData = groupedLaunches[selectedYear] || {};
    const totalLaunchesInYear = Object.values(currentYearData).flat().length;

    // Helper to get the years to display in yearly view (selected year and previous 3 years)
    const getYearRange = () => {
        const idx = availableYears.indexOf(selectedYear);
        if (idx === -1) return availableYears.slice(0, 4); // fallback
        return availableYears.slice(idx, idx + 4).reverse(); // most recent at right
    };

    // Helper to get launches by category for a year
    const getLaunchesByCategory = (yearData: Record<number, Launch[]>) => {
        const all = Object.values(yearData).flat() as Launch[];
        return {
            success: all.filter(l => l.success === true),
            upcoming: all.filter(l => l.upcoming),
            failed: all.filter(l => l.success === false),
        };
    };

    // Max launches to show per card in yearly view
    const MAX_LAUNCHES_PER_CARD = 5;

    // Track expanded state for each year/category
    const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

    const handleExpand = (year: number, label: string) => {
        setExpandedCards(prev => ({ ...prev, [`${year}-${label}`]: !prev[`${year}-${label}`] }));
    };

    return (
        <div className="space-y-6">
            {/* Header Controls */}
            <Card className="bg-white/10 dark:bg-white/[0.02] backdrop-blur-xl border border-white/20 dark:border-white/[0.05] rounded-xl shadow-xl">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-primary/20 rounded-lg">
                                    <Calendar className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <CardTitle>Mission Timeline</CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                        {viewMode === 'year' ? `Missions for ${getYearRange().join(', ')}` : `${totalLaunchesInYear} launches in ${selectedYear}`}
                                    </p>
                                </div>
                            </div>

                            {/* Year Navigation (only for month view) */}
                            {viewMode === 'month' && (
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => navigateYear('prev')}
                                        disabled={availableYears.indexOf(selectedYear) === availableYears.length - 1}
                                        className="p-2"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </Button>

                                    <div className="px-4 py-2 bg-white/10 dark:bg-white/[0.05] rounded-lg min-w-[80px] text-center">
                                        <span className="font-semibold">{selectedYear}</span>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => navigateYear('next')}
                                        disabled={availableYears.indexOf(selectedYear) === 0}
                                        className="p-2"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setViewMode('month')}
                                className={`text-xs px-4 py-2 rounded-lg transition-colors duration-200 border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 ${viewMode === 'month'
                                    ? 'bg-primary text-white dark:text-white shadow-md'
                                    : 'bg-white/10 dark:bg-white/5 text-primary dark:text-primary hover:bg-primary/10 dark:hover:bg-primary/20'
                                    }`}
                                aria-pressed={viewMode === 'month'}
                            >
                                Monthly
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setViewMode('year')}
                                className={`text-xs px-4 py-2 rounded-lg transition-colors duration-200 border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 ${viewMode === 'year'
                                    ? 'bg-primary text-white dark:text-white shadow-md'
                                    : 'bg-white/10 dark:bg-white/5 text-primary dark:text-primary hover:bg-primary/10 dark:hover:bg-primary/20'
                                    }`}
                                aria-pressed={viewMode === 'year'}
                            >
                                Yearly
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Timeline Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`${selectedYear}-${viewMode}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {viewMode === 'month' ? (
                        // ...existing code for month view...
                        <div className="space-y-4">
                            {Object.entries(currentYearData)
                                .sort(([a], [b]) => Number(a) - Number(b))
                                .map(([monthIndex, monthLaunches]) => {
                                    const launchesArr = monthLaunches as Launch[];
                                    return (
                                        <Card key={monthIndex} className="bg-white/10 dark:bg-white/[0.02] backdrop-blur-xl border border-white/20 dark:border-white/[0.05] rounded-xl shadow-xl">
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2">
                                                    <Clock className="w-5 h-5 text-primary" />
                                                    {months[Number(monthIndex)]} {selectedYear}
                                                    <Badge variant="outline" className="ml-2">
                                                        {launchesArr.length} launches
                                                    </Badge>
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-3">
                                                    {launchesArr
                                                        .sort((a, b) => new Date(a.date_local).getTime() - new Date(b.date_local).getTime())
                                                        .map((launch: Launch, index: number) => (
                                                            <motion.div
                                                                key={launch.id}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: index * 0.05 }}
                                                                onClick={() => onViewDetails(launch.id)}
                                                                className="flex items-center gap-4 p-3 bg-white/5 dark:bg-white/[0.02] rounded-lg cursor-pointer hover:bg-white/10 dark:hover:bg-white/[0.05] transition-all duration-200 border border-white/10 dark:border-white/[0.03]"
                                                            >
                                                                {/* Timeline dot */}
                                                                <div className={`w-3 h-3 rounded-full border-2 ${launch.upcoming ? 'bg-blue-500/20 border-blue-500' :
                                                                    launch.success ? 'bg-green-500/20 border-green-500' :
                                                                        launch.success === false ? 'bg-red-500/20 border-red-500' :
                                                                            'bg-gray-500/20 border-gray-500'
                                                                    }`} />
                                                                {/* Launch info */}
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-center justify-between">
                                                                        <h4 className="font-medium truncate">{launch.name}</h4>
                                                                        <Badge variant="outline" className={getStatusColor(launch) + ' text-xs'}>
                                                                            {launch.upcoming ? 'Upcoming' : launch.success ? 'Success' : launch.success === false ? 'Failed' : 'Unknown'}
                                                                        </Badge>
                                                                    </div>
                                                                    <div className="text-sm text-muted-foreground mt-1">
                                                                        {formatDate(launch.date_local)} Rocket: {launch.rocket}
                                                                    </div>
                                                                    {launch.details && (
                                                                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                                                            {launch.details}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                        </div>
                    ) : (
                        // Yearly View - Selected year and previous 3 years, 3 cards per year (Success, Upcoming, Failed)
                        <div className="space-y-8">
                            {getYearRange().map((year) => {
                                const yearData = groupedLaunches[year] || {};
                                const { success, upcoming, failed } = getLaunchesByCategory(yearData);
                                const categories = [
                                    {
                                        label: 'Success',
                                        launches: success,
                                        color: 'green-500',
                                        icon: <span className="text-green-500"><CheckCircle className="w-4 h-4" /></span>
                                    },
                                    {
                                        label: 'Upcoming',
                                        launches: upcoming,
                                        color: 'blue-500',
                                        icon: <span className="text-blue-500"><Clock className="w-4 h-4" /></span>
                                    },
                                    {
                                        label: 'Failed',
                                        launches: failed,
                                        color: 'red-500',
                                        icon: <span className="text-red-500"><XCircle className="w-4 h-4" /></span>
                                    },
                                ];
                                return (
                                    <div key={year}>
                                        <div className="mb-2 flex items-center gap-2">
                                            <Calendar className="w-5 h-5 text-primary" />
                                            <span className="font-semibold text-lg">{year}</span>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {categories.map((cat) => {
                                                const launchesSorted = cat.launches
                                                    .sort((a, b) => new Date(b.date_local).getTime() - new Date(a.date_local).getTime());
                                                const cardKey = `${year}-${cat.label}`;
                                                const isExpanded = expandedCards[cardKey];
                                                const launchesToShow = isExpanded ? launchesSorted : launchesSorted.slice(0, MAX_LAUNCHES_PER_CARD);
                                                const moreCount = cat.launches.length - launchesToShow.length;
                                                return (
                                                    <Card key={cat.label} className="flex flex-col h-full min-h-[220px] bg-white/10 dark:bg-white/[0.02] border border-white/20 dark:border-white/[0.05] rounded-xl shadow-xl">
                                                        <CardHeader className="pb-2">
                                                            <CardTitle className={`flex items-center gap-2 text-${cat.color}`}>
                                                                <span>{cat.icon}</span>
                                                                {cat.label}
                                                                <Badge variant="outline" className="ml-2">
                                                                    {cat.launches.length}
                                                                </Badge>
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent className="flex-1 flex flex-col justify-start">
                                                            {cat.launches.length === 0 ? (
                                                                <div className="text-xs text-muted-foreground mt-4">No launches</div>
                                                            ) : (
                                                                <div className="space-y-2">
                                                                    {launchesToShow.map((launch: Launch) => (
                                                                        <div
                                                                            key={launch.id}
                                                                            onClick={() => onViewDetails(launch.id)}
                                                                            className="p-2 bg-white/5 dark:bg-white/[0.02] rounded-lg cursor-pointer hover:bg-white/10 dark:hover:bg-white/[0.05] transition-colors"
                                                                        >
                                                                            <div className="flex items-center justify-between text-sm">
                                                                                <span className="truncate font-medium">{launch.name}</span>
                                                                                <Badge variant="outline" className={getStatusColor(launch) + ' text-xs'}>
                                                                                    {cat.label}
                                                                                </Badge>
                                                                            </div>
                                                                            <div className="text-xs text-muted-foreground mt-1">
                                                                                {formatDate(launch.date_local)}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                    {moreCount > 0 && !isExpanded && (
                                                                        <button
                                                                            className="text-xs text-primary underline w-full py-1 mt-1"
                                                                            onClick={() => handleExpand(year, cat.label)}
                                                                        >
                                                                            +{moreCount} more
                                                                        </button>
                                                                    )}
                                                                    {isExpanded && launchesSorted.length > MAX_LAUNCHES_PER_CARD && (
                                                                        <button
                                                                            className="text-xs text-primary underline w-full py-1 mt-1"
                                                                            onClick={() => handleExpand(year, cat.label)}
                                                                        >
                                                                            Show less
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </CardContent>
                                                    </Card>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Quick Stats (only for month view) */}
            {viewMode === 'month' && (
                <Card className="bg-white/10 dark:bg-white/[0.02] backdrop-blur-xl border border-white/20 dark:border-white/[0.05] rounded-xl shadow-xl">
                    <CardContent className="p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div>
                                <div className="text-lg font-semibold text-blue-400">{totalLaunchesInYear}</div>
                                <div className="text-xs text-muted-foreground">Total Launches</div>
                            </div>
                            <div>
                                <div className="text-lg font-semibold text-green-400">
                                    {(Object.values(currentYearData).flat() as Launch[]).filter(l => l.success === true).length}
                                </div>
                                <div className="text-xs text-muted-foreground">Successful</div>
                            </div>
                            <div>
                                <div className="text-lg font-semibold text-red-400">
                                    {(Object.values(currentYearData).flat() as Launch[]).filter(l => l.success === false).length}
                                </div>
                                <div className="text-xs text-muted-foreground">Failed</div>
                            </div>
                            <div>
                                <div className="text-lg font-semibold text-purple-400">
                                    {(Object.values(currentYearData).flat() as Launch[]).filter(l => l.upcoming).length}
                                </div>
                                <div className="text-xs text-muted-foreground">Upcoming</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
// ...migrated code from Vite project
