// TypeScript interfaces for Cloud Janitor Waste Report

export interface ZombieResource {
    resource_id: string;
    name: string;
    type: string;
    region: string;
    monthly_cost: number;
    reason: string;
}

export interface Summary {
    total_resources_scanned: number;
    zombie_resource_count: number;
    total_monthly_savings: number;
    total_annual_savings: number;
    status: string;
}

export interface WasteReport {
    audit_id: string;
    generated_at: string;
    summary: Summary;
    zombies: ZombieResource[];
}
