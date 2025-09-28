import React from "react";

interface ResultsInfoProps {
    startIndex: number;
    endIndex: number;
    total: number;
    showFavorites: boolean;
    currentPage: number;
    totalPages: number;
}

export const ResultsInfo: React.FC<ResultsInfoProps> = ({
    startIndex,
    endIndex,
    total,
    showFavorites,
    currentPage,
    totalPages,
}) => (
    <div className="flex items-center justify-between bg-white/5 dark:bg-white/[0.02] backdrop-blur-sm border border-white/10 dark:border-white/[0.03] rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, total)} of {total} launches
            {showFavorites && " from your favorites"}
        </p>
        <p className="text-sm text-muted-foreground">
            {totalPages > 1 && `Page ${currentPage} of ${totalPages}`}
        </p>
    </div>
);