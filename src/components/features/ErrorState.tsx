

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { motion } from 'framer-motion';

interface ErrorStateProps {
    message: string;
    onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
    const isNetworkError = message.toLowerCase().includes('network');
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center min-h-[400px]"
        >
            <Card className="max-w-md bg-white/10 dark:bg-white/[0.02] backdrop-blur-xl border border-white/20 dark:border-white/[0.05] rounded-xl shadow-2xl">
                <CardContent className="p-8 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: 'spring' }}
                        className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4"
                    >
                        <AlertTriangle className="w-8 h-8 text-destructive" />
                    </motion.div>
                    <h3 className="text-lg mb-2">Something went wrong</h3>
                    <p className="text-muted-foreground mb-4">{message}</p>
                    {isNetworkError && (
                        <p className="text-sm text-muted-foreground/70 mb-6">
                            This could be due to network connectivity issues or the SpaceX API being temporarily unavailable.
                        </p>
                    )}
                    {onRetry && (
                        <Button
                            onClick={onRetry}
                            variant="outline"
                            className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Try Again
                        </Button>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}
