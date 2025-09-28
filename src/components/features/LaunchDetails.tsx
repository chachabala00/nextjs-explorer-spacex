
import React, { useState } from 'react';
import { ArrowLeft, Star, ExternalLink, Calendar, MapPin, Rocket, Package, Image as ImageIcon, ChevronLeft, ChevronRight, Play, FileText, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { formatDate } from '@/utils/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { LaunchDetails as LaunchDetailsType } from '../../types/spacex';
import { ImageWithFallback } from '@/design/ImageWithFallback';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { StatusBadge } from '../ui/StatusBadge';

interface LaunchDetailsProps {
    launchDetails: LaunchDetailsType;
    isFavorite: boolean;
    onToggleFavorite: (launchId: string) => void;
    onBack: () => void;
}

export function LaunchDetails({ launchDetails, isFavorite, onToggleFavorite, onBack }: LaunchDetailsProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    // Get all available images
    const getAllImages = () => {
        const images: { url: string; type: string; alt: string }[] = [];

        // Add mission patches first
        if (launchDetails.links.patch.large) {
            images.push({
                url: launchDetails.links.patch.large,
                type: 'Mission Patch',
                alt: `${launchDetails.name} mission patch`
            });
        } else if (launchDetails.links.patch.small) {
            images.push({
                url: launchDetails.links.patch.small,
                type: 'Mission Patch',
                alt: `${launchDetails.name} mission patch`
            });
        }

        // Add Flickr images
        launchDetails.links.flickr.original.forEach((url, index) => {
            images.push({
                url,
                type: 'Launch Photo',
                alt: `${launchDetails.name} launch photo ${index + 1}`
            });
        });

        launchDetails.links.flickr.small.forEach((url, index) => {
            if (!images.some(img => img.url === url)) {
                images.push({
                    url,
                    type: 'Launch Photo',
                    alt: `${launchDetails.name} launch photo ${index + 1}`
                });
            }
        });

        return images;
    };

    const images = getAllImages();
    const hasImages = images.length > 0;

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
        >
            {/* Header with Hero Image */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-white/10 dark:bg-white/[0.02] backdrop-blur-xl border border-white/20 dark:border-white/[0.05] rounded-2xl overflow-hidden shadow-2xl"
            >
                {hasImages && (
                    <div className="relative h-80 md:h-96 bg-gradient-to-br from-purple-600/60 via-purple-400/30 to-background">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                            >
                                <ImageWithFallback
                                    src={images[currentImageIndex].url}
                                    alt={images[currentImageIndex].alt}
                                    className="w-full h-full object-contain flex items-center justify-center"
                                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            </motion.div>
                        </AnimatePresence>

                        {/* Image Navigation */}
                        {images.length > 1 && (
                            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={prevImage}
                                    className="p-3 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white rounded-full"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={nextImage}
                                    className="p-3 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white rounded-full"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </Button>
                            </div>
                        )}

                        {/* Image Counter */}
                        {images.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                                {currentImageIndex + 1} / {images.length}
                            </div>
                        )}

                        {/* Image Type Badge */}
                        <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                            <ImageIcon className="w-4 h-4" />
                            {images[currentImageIndex]?.type}
                        </div>
                    </div>
                )}

                {/* Header Content */}
                <div className="relative p-6 md:p-8">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={onBack}
                                    className="p-3 hover:bg-white/20 dark:hover:bg-white/[0.05] rounded-lg backdrop-blur-sm border border-white/20 dark:border-white/[0.05]"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </Button>
                            </motion.div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent mb-2">
                                    {launchDetails.name}
                                </h1>
                                <div className="flex items-center gap-3 flex-wrap">
                                    <StatusBadge success={launchDetails.success} upcoming={launchDetails.upcoming} />
                                    <span className="text-sm text-muted-foreground">
                                        {formatDate(launchDetails.date_local, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onToggleFavorite(launchDetails.id)}
                                className="p-3 hover:bg-white/20 dark:hover:bg-white/[0.05] rounded-lg backdrop-blur-sm border border-white/20 dark:border-white/[0.05]"
                            >
                                <Star
                                    className={`w-6 h-6 transition-all duration-200 ${isFavorite
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-muted-foreground hover:text-yellow-400'
                                        }`}
                                />
                            </Button>
                        </motion.div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-3 flex-wrap">
                        {launchDetails.links.webcast && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(launchDetails.links.webcast!, '_blank')}
                                className="flex items-center gap-2 bg-white/10 dark:bg-white/[0.03] border-white/20 dark:border-white/[0.08] hover:bg-white/20 dark:hover:bg-white/[0.05] backdrop-blur-sm"
                            >
                                <Play className="w-4 h-4" />
                                Watch Launch
                            </Button>
                        )}
                        {launchDetails.links.article && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(launchDetails.links.article!, '_blank')}
                                className="flex items-center gap-2 bg-white/10 dark:bg-white/[0.03] border-white/20 dark:border-white/[0.08] hover:bg-white/20 dark:hover:bg-white/[0.05] backdrop-blur-sm"
                            >
                                <FileText className="w-4 h-4" />
                                Article
                            </Button>
                        )}
                        {launchDetails.links.wikipedia && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(launchDetails.links.wikipedia!, '_blank')}
                                className="flex items-center gap-2 bg-white/10 dark:bg-white/[0.03] border-white/20 dark:border-white/[0.08] hover:bg-white/20 dark:hover:bg-white/[0.05] backdrop-blur-sm"
                            >
                                <Globe className="w-4 h-4" />
                                Wikipedia
                            </Button>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Mission Details - Main Content */}
                <div className="xl:col-span-2 space-y-6">
                    <Card className="bg-white/10 dark:bg-white/[0.02] backdrop-blur-xl border border-white/20 dark:border-white/[0.05] rounded-xl shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <FileText className="w-6 h-6 text-primary" />
                                Mission Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {launchDetails.details && launchDetails.details.trim() ? (
                                <p className="text-muted-foreground leading-relaxed text-base">
                                    {launchDetails.details}
                                </p>
                            ) : (
                                <p className="text-muted-foreground leading-relaxed text-base">
                                    No official mission description is available for this launch. SpaceX may not have published details for this mission, or it is a test/early flight. Please check the links above for more information.
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Payloads */}
                    {launchDetails.payloads_details && launchDetails.payloads_details.length > 0 && (
                        <Card className="bg-white/10 dark:bg-white/[0.02] backdrop-blur-xl border border-white/20 dark:border-white/[0.05] rounded-xl shadow-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <Package className="w-6 h-6 text-primary" />
                                    Payloads ({launchDetails.payloads_details.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-white/5 dark:bg-white/[0.02] rounded-lg backdrop-blur-sm border border-white/10 dark:border-white/[0.03] overflow-hidden">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-white/20 dark:border-white/[0.05]">
                                                <TableHead className="text-foreground/80">Name</TableHead>
                                                <TableHead className="text-foreground/80">Type</TableHead>
                                                <TableHead className="text-foreground/80">Orbit</TableHead>
                                                <TableHead className="text-foreground/80">Mass</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {launchDetails.payloads_details.map((payload) => (
                                                <TableRow key={payload.id} className="border-white/10 dark:border-white/[0.03] hover:bg-white/5 dark:hover:bg-white/[0.02]">
                                                    <TableCell className="font-medium">{payload.name}</TableCell>
                                                    <TableCell>{payload.type || 'Unknown'}</TableCell>
                                                    <TableCell>{payload.orbit || 'Unknown'}</TableCell>
                                                    <TableCell>
                                                        {payload.mass_kg ? `${payload.mass_kg.toLocaleString()} kg` : 'Unknown'}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Sidebar - Technical Info */}
                <div className="space-y-6">
                    {/* Rocket Details */}
                    {launchDetails.rocket_details && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="bg-white/10 dark:bg-white/[0.02] backdrop-blur-xl border border-white/20 dark:border-white/[0.05] rounded-xl shadow-xl">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-xl">
                                        <Rocket className="w-6 h-6 text-primary" />
                                        Rocket
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-3 bg-white/5 dark:bg-white/[0.02] rounded-lg">
                                            <span className="text-muted-foreground text-sm">Name</span>
                                            <span className="font-medium">{launchDetails.rocket_details.name}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-white/5 dark:bg-white/[0.02] rounded-lg">
                                            <span className="text-muted-foreground text-sm">Type</span>
                                            <span>{launchDetails.rocket_details.type}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-white/5 dark:bg-white/[0.02] rounded-lg">
                                            <span className="text-muted-foreground text-sm">Company</span>
                                            <span>{launchDetails.rocket_details.company}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-white/5 dark:bg-white/[0.02] rounded-lg">
                                            <span className="text-muted-foreground text-sm">Success Rate</span>
                                            <span className="text-green-400 font-medium">{launchDetails.rocket_details.success_rate_pct}%</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-white/5 dark:bg-white/[0.02] rounded-lg">
                                            <span className="text-muted-foreground text-sm">Height</span>
                                            <span>{launchDetails.rocket_details.height.meters}m</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-white/5 dark:bg-white/[0.02] rounded-lg">
                                            <span className="text-muted-foreground text-sm">Mass</span>
                                            <span>{launchDetails.rocket_details.mass.kg.toLocaleString()} kg</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Launchpad Details */}
                    {launchDetails.launchpad_details && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card className="bg-white/10 dark:bg-white/[0.02] backdrop-blur-xl border border-white/20 dark:border-white/[0.05] rounded-xl shadow-xl">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-xl">
                                        <MapPin className="w-6 h-6 text-primary" />
                                        Launchpad
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-3 bg-white/5 dark:bg-white/[0.02] rounded-lg">
                                            <span className="text-muted-foreground text-sm">Name</span>
                                            <span className="font-medium text-right">{launchDetails.launchpad_details.name}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-white/5 dark:bg-white/[0.02] rounded-lg">
                                            <span className="text-muted-foreground text-sm">Location</span>
                                            <span className="text-right text-sm">{launchDetails.launchpad_details.locality}, {launchDetails.launchpad_details.region}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-white/5 dark:bg-white/[0.02] rounded-lg">
                                            <span className="text-muted-foreground text-sm">Status</span>
                                            <span className="capitalize text-green-400 font-medium">{launchDetails.launchpad_details.status}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-white/5 dark:bg-white/[0.02] rounded-lg">
                                            <span className="text-muted-foreground text-sm">Launch Attempts</span>
                                            <span>{launchDetails.launchpad_details.launch_attempts}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-white/5 dark:bg-white/[0.02] rounded-lg">
                                            <span className="text-muted-foreground text-sm">Successes</span>
                                            <span className="text-green-400 font-medium">{launchDetails.launchpad_details.launch_successes}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
