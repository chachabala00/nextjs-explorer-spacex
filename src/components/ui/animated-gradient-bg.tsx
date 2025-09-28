import React from "react";
import { motion } from "framer-motion";

export const AnimatedGradientBg: React.FC = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        {/* Subtle space texture overlay */}
        <div
            className="absolute inset-0 opacity-[0.03] bg-cover bg-center mix-blend-overlay"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1605703905070-24220ce7f693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtaWMlMjBuZWJ1bGElMjBzdGFyc3xlbnwxfHx8fDE3NTg3OTk3NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080')",
            }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        {/* Animated gradient blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob bg-purple-500/30" />
        <div className="absolute top-0 -right-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 bg-yellow-500/30" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 bg-pink-500/30" />
        {/* Earth from space in top right corner - subtle */}
        <div className="absolute top-10 right-10 w-32 h-32 opacity-5">
            <div
                className="w-full h-full rounded-full bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMGZyb20lMjBzcGFjZXxlbnwxfHx8fDE3NTg4MzMxOTh8MA&ixlib=rb-4.1.0&q=80&w=400')",
                }}
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-green-500/10" />
        </div>
        {/* Floating space particles */}
        <>
            <motion.div
                className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-60"
                animate={{
                    y: [0, -20, 0],
                    opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute top-3/4 right-1/3 w-0.5 h-0.5 bg-blue-300 rounded-full opacity-80"
                animate={{
                    y: [0, -15, 0],
                    x: [0, 10, 0],
                    opacity: [0.8, 1, 0.8],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.div
                className="absolute top-1/2 left-3/4 w-0.5 h-0.5 bg-purple-300 rounded-full opacity-70"
                animate={{
                    y: [0, -25, 0],
                    x: [0, -15, 0],
                    opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
        </>
    </div>
);