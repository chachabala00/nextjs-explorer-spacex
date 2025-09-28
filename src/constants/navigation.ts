// Central navigation config for sidebar and floating navigation
import { Rocket, Calendar, BarChart3 } from 'lucide-react';

export const navigationItems = [
    { id: 'launches', label: 'Launches', icon: Rocket, description: 'Browse SpaceX launches' },
    { id: 'timeline', label: 'Timeline', icon: Calendar, description: 'View launch timeline' },
    { id: 'statistics', label: 'Stats', icon: BarChart3, description: 'Mission statistics' }
];
