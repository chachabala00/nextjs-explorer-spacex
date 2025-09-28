import React from 'react';
import { BarChart3, Rocket, Target, Calendar, TrendingUp, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { motion } from 'framer-motion';
import { Launch } from '../../types/spacex';

interface StatisticsOverviewProps {
    launches: Launch[];
}

export function StatisticsOverview({ launches }: StatisticsOverviewProps) {
    // Calculate statistics
    const totalLaunches = launches.length;
    const successfulLaunches = launches.filter(l => l.success === true).length;
    const failedLaunches = launches.filter(l => l.success === false).length;
    const upcomingLaunches = launches.filter(l => l.upcoming).length;
    const successRate = totalLaunches > 0 ? Math.round((successfulLaunches / (successfulLaunches + failedLaunches)) * 100) : 0;

    // Get unique rockets and their usage
    const rocketStats = launches.reduce((acc, launch) => {
        acc[launch.rocket] = (acc[launch.rocket] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const topRockets = Object.entries(rocketStats)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

    // Launch frequency by year
    const yearStats = launches.reduce((acc, launch) => {
        const year = new Date(launch.date_local).getFullYear();
        acc[year] = (acc[year] || 0) + 1;
        return acc;
    }, {} as Record<number, number>);

    const recentYears = Object.entries(yearStats)
        .sort(([a], [b]) => Number(b) - Number(a))
        .slice(0, 6);

    const stats = [
        {
            title: 'Total Launches',
            value: totalLaunches,
            icon: Rocket,
            color: 'text-blue-400',
            bgColor: 'bg-blue-500/10'
        },
        {
            title: 'Success Rate',
            value: `${successRate}%`,
            icon: Target,
            color: 'text-green-400',
            bgColor: 'bg-green-500/10'
        },
        {
            title: 'Upcoming',
            value: upcomingLaunches,
            icon: Calendar,
            color: 'text-purple-400',
            bgColor: 'bg-purple-500/10'
        },
        {
            title: 'Failed Missions',
            value: failedLaunches,
            icon: TrendingUp,
            color: 'text-red-400',
            bgColor: 'bg-red-500/10'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="bg-white/10 dark:bg-white/[0.02] backdrop-blur-xl border border-white/20 dark:border-white/[0.05] rounded-xl shadow-xl">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                                        <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                                    </div>
                                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Success Rate Progress */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card className="bg-white/10 dark:bg-white/[0.02] backdrop-blur-xl border border-white/20 dark:border-white/[0.05] rounded-xl shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="w-5 h-5 text-green-400" />
                                Mission Success Breakdown
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span>Successful Missions</span>
                                    <span className="text-green-400">{successfulLaunches}</span>
                                </div>
                                <Progress value={(successfulLaunches / totalLaunches) * 100} className="h-2" />

                                <div className="flex justify-between text-sm">
                                    <span>Failed Missions</span>
                                    <span className="text-red-400">{failedLaunches}</span>
                                </div>
                                <Progress value={(failedLaunches / totalLaunches) * 100} className="h-2" />

                                <div className="flex justify-between text-sm">
                                    <span>Upcoming</span>
                                    <span className="text-purple-400">{upcomingLaunches}</span>
                                </div>
                                <Progress value={(upcomingLaunches / totalLaunches) * 100} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Top Rockets */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card className="bg-white/10 dark:bg-white/[0.02] backdrop-blur-xl border border-white/20 dark:border-white/[0.05] rounded-xl shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-blue-400" />
                                Most Used Rockets
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {topRockets.map(([rocketId, count]) => (
                                    <div key={rocketId} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                            <span className="text-sm font-medium truncate">{rocketId}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-muted-foreground">{count} launches</span>
                                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary rounded-full transition-all duration-300"
                                                    style={{ width: `${(count / Math.max(...Object.values(rocketStats))) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Launch Activity by Year */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="lg:col-span-2"
                >
                    <Card className="bg-white/10 dark:bg-white/[0.02] backdrop-blur-xl border border-white/20 dark:border-white/[0.05] rounded-xl shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Globe className="w-5 h-5 text-purple-400" />
                                Launch Activity by Year
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {recentYears.map(([year, count]) => (
                                    <div key={year} className="text-center p-3 bg-white/5 dark:bg-white/[0.02] rounded-lg">
                                        <div className="text-lg font-semibold">{count}</div>
                                        <div className="text-sm text-muted-foreground">{year}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
