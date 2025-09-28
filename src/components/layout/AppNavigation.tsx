import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/utils';
import { navigationItems } from '@/constants/navigation';

interface NavigationProps {
    activeView: string;
    onViewChange: (view: string) => void;
}

export function AppNavigation({ activeView, onViewChange }: NavigationProps) {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    return (
        <>
            {/* Floating navigation for all screens (desktop and mobile) */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
            >
                <div className="relative bg-white/10 dark:bg-white/[0.02] backdrop-blur-2xl border border-white/20 dark:border-white/[0.05] rounded-2xl shadow-2xl px-2 py-2">
                    <div className="flex items-center gap-1">
                        {navigationItems.map((item) => (
                            <motion.div
                                key={item.id}
                                className="relative"
                                onHoverStart={() => setHoveredItem(item.id)}
                                onHoverEnd={() => setHoveredItem(null)}
                            >
                                <motion.button
                                    onClick={() => onViewChange(item.id)}
                                    className={`relative flex flex-col items-center lg:flex-row lg:gap-2 gap-1 p-3 rounded-xl transition-all duration-300 group ${activeView === item.id
                                        ? 'text-primary-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {activeView === item.id && (
                                        <motion.div
                                            layoutId="activeBackground"
                                            className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg"
                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    {hoveredItem === item.id && activeView !== item.id && (
                                        <motion.div
                                            className="absolute inset-0 bg-white/20 dark:bg-white/[0.08] rounded-xl"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                    <div className="relative z-10">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    {/* Show label on desktop, hide on mobile */}
                                    <span className="font-medium hidden lg:inline relative z-10">{item.label}</span>
                                    {activeView === item.id && (
                                        <motion.div
                                            className="absolute inset-0 bg-primary/30 rounded-xl blur-lg"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1.4 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                    )}
                                </motion.button>
                                <AnimatePresence>
                                    {hoveredItem === item.id && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 400,
                                                damping: 25,
                                                duration: 0.2,
                                            }}
                                            className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 pointer-events-none"
                                        >
                                            <div className="relative">
                                                <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-white/30 dark:border-white/[0.1] rounded-xl px-4 py-3 shadow-2xl min-w-[140px]">
                                                    <div className="text-center">
                                                        <div className="font-semibold text-foreground text-sm mb-1">
                                                            {item.label}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {item.description}
                                                        </div>
                                                    </div>
                                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                                                        <div className="w-3 h-3 bg-white/95 dark:bg-slate-800/95 border-r border-b border-white/30 dark:border-white/[0.1] transform rotate-45 -mt-1.5"></div>
                                                    </div>
                                                </div>
                                                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-xl blur-lg -z-10"></div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 rounded-2xl blur-xl -z-10"></div>
            </motion.div>
        </>
    );
}
