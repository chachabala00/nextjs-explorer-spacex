import React from 'react';
import { Badge } from '@/components/ui/badge';

export function StatusBadge({ success, upcoming }: { success: boolean | null, upcoming: boolean }) {
    if (upcoming) return <Badge variant="outline" className="border-blue-500 text-blue-400">Upcoming</Badge>;
    if (success === true) return <Badge variant="outline" className="border-green-500 text-green-400">Success</Badge>;
    if (success === false) return <Badge variant="outline" className="border-red-500 text-red-400">Failed</Badge>;
    return <Badge variant="outline" className="border-gray-500 text-gray-400">Unknown</Badge>;
}
