import React from "react";
import { Button } from "./button";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;
    // Calculate page numbers to show (max 7)
    const getPageNumbers = () => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        } else if (currentPage <= 4) {
            return Array.from({ length: 7 }, (_, i) => i + 1);
        } else if (currentPage >= totalPages - 3) {
            return Array.from({ length: 7 }, (_, i) => totalPages - 6 + i);
        } else {
            return Array.from({ length: 7 }, (_, i) => currentPage - 3 + i);
        }
    };
    const pageNumbers = getPageNumbers();
    return (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-8 bg-white/10 dark:bg-white/[0.02] backdrop-blur-xl border border-white/20 dark:border-white/[0.05] rounded-xl p-4">
            {/* Page numbers row */}
            <div className="flex items-center gap-1">
                {pageNumbers.map((pageNum) => (
                    <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "ghost"}
                        size="sm"
                        onClick={() => onPageChange(pageNum)}
                        className={`w-10 h-10 p-0 rounded-lg transition-all duration-200 ${currentPage === pageNum
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                            : 'bg-white/10 dark:bg-white/[0.03] hover:bg-white/20 dark:hover:bg-white/[0.05] backdrop-blur-sm'
                            }`}
                    >
                        {pageNum}
                    </Button>
                ))}
            </div>
            {/* Prev/Next row, centered on mobile, inline on desktop */}
            <div className="flex w-full justify-center items-center gap-2 mt-2 sm:mt-0 sm:w-auto">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="bg-white/10 dark:bg-white/[0.03] border-white/20 dark:border-white/[0.08] hover:bg-white/20 dark:hover:bg-white/[0.05] backdrop-blur-sm disabled:opacity-50"
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="bg-white/10 dark:bg-white/[0.03] border-white/20 dark:border-white/[0.08] hover:bg-white/20 dark:hover:bg-white/[0.05] backdrop-blur-sm disabled:opacity-50"
                >
                    Next
                </Button>
            </div>
            <div className="ml-2 text-sm text-muted-foreground w-full text-center sm:w-auto sm:text-left">
                Page {currentPage} of {totalPages}
            </div>
        </div>
    );
};