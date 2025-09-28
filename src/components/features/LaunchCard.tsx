
import React from 'react';
import { Star, Rocket, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { formatDate } from '@/utils/ui';
import { Button } from '../ui/button';
import { AnimatedButton } from '../ui/animated-button';
import { Launch } from '../../types/spacex';
import { StatusBadge } from '../ui/StatusBadge';

// Props for LaunchCard
interface LaunchCardProps {
    launch: Launch;
    isFavorite: boolean;
    onToggleFavorite: (launchId: string) => void;
    onViewDetails: (launchId: string) => void;
}


export function LaunchCard({ launch, isFavorite, onToggleFavorite, onViewDetails }: LaunchCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
            className="h-full"
        >
            <Card className="flex flex-col h-full min-h-[340px] relative bg-white/10 dark:bg-white/[0.02] backdrop-blur-xl border border-white/20 dark:border-white/[0.05] hover:border-primary/40 transition-all duration-300 group rounded-xl overflow-hidden">
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" />
                <CardContent className="relative p-0 z-10 flex flex-col h-full">
                    <div className="p-6 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-lg mb-2 text-foreground group-hover:text-primary transition-colors truncate">
                                    {launch.name}
                                </h3>
                                <div className="flex items-center gap-2 mb-2">
                                    <StatusBadge success={launch.success} upcoming={launch.upcoming} />
                                </div>
                            </div>
                            {/* Favorite button */}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={e => {
                                    e.stopPropagation();
                                    onToggleFavorite(launch.id);
                                }}
                                className="ml-2 p-2 hover:bg-accent/50 transition-colors"
                            >
                                <Star className={`w-4 h-4 transition-all duration-200 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground hover:text-yellow-400'}`} />
                            </Button>
                        </div>
                        <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(launch.date_local)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Rocket className="w-4 h-4" />
                                <span>Rocket ID: {launch.rocket}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                <span>Launchpad: {launch.launchpad}</span>
                            </div>
                        </div>
                        {launch.details && (
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{launch.details}</p>
                        )}
                        <div className="flex justify-between items-center mt-auto">
                            <div className="flex gap-2">
                                {launch.links.webcast && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={e => {
                                            e.stopPropagation();
                                            window.open(launch.links.webcast!, '_blank');
                                        }}
                                        className="p-2 text-muted-foreground hover:text-foreground"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                            <AnimatedButton onClick={() => onViewDetails(launch.id)}>
                                View Details
                            </AnimatedButton>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
