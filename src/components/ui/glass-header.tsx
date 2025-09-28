import React from "react";
import { motion } from "framer-motion";
import { Rocket, Sparkles } from "lucide-react";

export const GlassHeader: React.FC = () => (
    <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/10 dark:bg-white/[0.02] backdrop-blur-2xl border-b border-white/20 dark:border-white/[0.05] sticky top-0 z-50"
    >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <div className="max-w-7xl mx-auto px-6 py-6 relative">
            <div className="flex items-center justify-between">
                <motion.div
                    className="flex items-center gap-4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <div className="relative">
                        <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl backdrop-blur-sm border border-white/20 dark:border-white/[0.05]">
                            <Rocket className="w-7 h-7 text-primary" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 rounded-xl blur-lg opacity-50" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold flex items-center gap-3 text-foreground">
                            SpaceX Explorer
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            >
                                <Sparkles className="w-5 h-5 text-primary" />
                            </motion.div>
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Explore SpaceX launches and missions with style
                        </p>
                    </div>
                </motion.div>
                {/* Header Actions (if any) */}
                <div className="flex items-center gap-2">
                    {/* Notification and Settings buttons removed (no longer used) */}
                </div>
            </div>
        </div>
    </motion.header>
);