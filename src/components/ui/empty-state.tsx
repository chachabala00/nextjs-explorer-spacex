import React from "react";
import { Rocket } from "lucide-react";
import { Button } from "./button";

interface EmptyStateProps {
    showFavorites: boolean;
    onShowAll?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ showFavorites, onShowAll }) => (
    <div className="text-center py-20">
        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Rocket className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg mb-2">No launches found</h3>
        <p className="text-muted-foreground mb-4">
            {showFavorites
                ? "You haven't favorited any launches yet."
                : "Try adjusting your search or filter criteria."}
        </p>
        {showFavorites && onShowAll && (
            <Button onClick={onShowAll} variant="outline">
                Browse All Launches
            </Button>
        )}
    </div>
);