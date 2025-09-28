import React from 'react';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, className = '', ...props }) => (
    <button
        type="button"
        className={`relative px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white bg-white/10 hover:bg-primary/80 hover:text-primary-foreground transition-colors duration-300 overflow-hidden border-none rounded shadow group focus:outline-none ${className}`}
        {...props}
    >
        <span className="absolute left-0 top-0 w-1/2 h-full bg-white/10 pointer-events-none" />
        <span className="absolute left-0 top-0 w-0 h-0.5 bg-white transition-all duration-500 group-hover:w-full group-hover:translate-x-full" />
        <span className="absolute left-0 top-0 w-0.5 h-0 bg-white transition-all duration-500 group-hover:h-full group-hover:translate-y-full" />
        <span className="absolute right-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-500 group-hover:w-full group-hover:-translate-x-full" />
        <span className="absolute right-0 bottom-0 w-0.5 h-0 bg-white transition-all duration-500 group-hover:h-full group-hover:-translate-y-full" />
        <span className="relative z-10">{children}</span>
    </button>
);
