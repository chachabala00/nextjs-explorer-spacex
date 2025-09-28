export interface Launch {
    id: string;
    name: string;
    date_utc: string;
    date_local: string;
    success: boolean | null;
    upcoming: boolean;
    details: string | null;
    rocket: string;
    launchpad: string;
    payloads: string[];
    links: {
        patch: {
            small: string | null;
            large: string | null;
        };
        reddit: {
            campaign: string | null;
            launch: string | null;
            media: string | null;
            recovery: string | null;
        };
        flickr: {
            small: string[];
            original: string[];
        };
        presskit: string | null;
        webcast: string | null;
        youtube_id: string | null;
        article: string | null;
        wikipedia: string | null;
    };
}

export interface Rocket {
    id: string;
    name: string;
    type: string;
    active: boolean;
    stages: number;
    boosters: number;
    cost_per_launch: number;
    success_rate_pct: number;
    first_flight: string;
    country: string;
    company: string;
    height: {
        meters: number;
        feet: number;
    };
    diameter: {
        meters: number;
        feet: number;
    };
    mass: {
        kg: number;
        lb: number;
    };
    description: string;
    flickr_images: string[];
}

export interface Launchpad {
    id: string;
    name: string;
    full_name: string;
    locality: string;
    region: string;
    timezone: string;
    latitude: number;
    longitude: number;
    launch_attempts: number;
    launch_successes: number;
    status: string;
    details: string;
}

export interface Payload {
    id: string;
    name: string;
    type: string;
    mass_kg: number | null;
    mass_lbs: number | null;
    orbit: string | null;
    reference_system: string | null;
    regime: string | null;
    longitude: number | null;
    semi_major_axis_km: number | null;
    eccentricity: number | null;
    periapsis_km: number | null;
    apoapsis_km: number | null;
    inclination_deg: number | null;
    period_min: number | null;
    lifespan_years: number | null;
    epoch: string | null;
    mean_motion: number | null;
    raan: number | null;
    arg_of_pericenter: number | null;
    mean_anomaly: number | null;
}

export interface LaunchFilters {
    search: string;
    year: string;
    success: 'all' | 'success' | 'failed' | 'favorites';
    sort?: 'asc' | 'desc';
}

export interface LaunchDetails extends Launch {
    rocket_details?: Rocket;
    launchpad_details?: Launchpad;
    payloads_details?: Payload[];
}
