
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { motion } from 'framer-motion';

export function LoadingSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <Card className="h-full bg-white/10 dark:bg-white/[0.02] backdrop-blur-xl border border-white/20 dark:border-white/[0.05] rounded-xl">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <Skeleton className="h-6 w-3/4 mb-2" />
                                    <Skeleton className="h-5 w-20" />
                                </div>
                                <Skeleton className="h-8 w-8 rounded" />
                            </div>
                            <div className="space-y-3 mb-4">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-4" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-4" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-4" />
                                    <Skeleton className="h-4 w-28" />
                                </div>
                            </div>
                            <Skeleton className="h-16 w-full mb-4" />
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-8 w-8" />
                                <Skeleton className="h-8 w-24" />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}

export function LaunchDetailsSkeleton() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <div className="flex items-center gap-4 mb-6">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-48" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-white/10 dark:bg-white/[0.02] backdrop-blur-xl border border-white/20 dark:border-white/[0.05] rounded-xl">
                        <CardContent className="p-6">
                            <Skeleton className="h-6 w-32 mb-4" />
                            <Skeleton className="h-20 w-full" />
                        </CardContent>
                    </Card>
                    <Card className="bg-white/10 dark:bg-white/[0.02] backdrop-blur-xl border border-white/20 dark:border-white/[0.05] rounded-xl">
                        <CardContent className="p-6">
                            <Skeleton className="h-6 w-24 mb-4" />
                            <div className="space-y-3">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="flex justify-between">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-32" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="bg-white/10 dark:bg-white/[0.02] backdrop-blur-xl border border-white/20 dark:border-white/[0.05] rounded-xl">
                        <CardContent className="p-6">
                            <Skeleton className="h-6 w-20 mb-4" />
                            <div className="space-y-3">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="flex justify-between">
                                        <Skeleton className="h-4 w-16" />
                                        <Skeleton className="h-4 w-24" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/10 dark:bg-white/[0.02] backdrop-blur-xl border border-white/20 dark:border-white/[0.05] rounded-xl">
                        <CardContent className="p-6">
                            <Skeleton className="h-6 w-24 mb-4" />
                            <div className="space-y-3">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="flex justify-between">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-4 w-20" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </motion.div>
    );
}
