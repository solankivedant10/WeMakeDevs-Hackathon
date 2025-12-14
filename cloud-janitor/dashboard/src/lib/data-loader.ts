// Data loader - imports JSON at build time for Vercel compatibility
import reportData from '@/data/waste-report.json';
import { WasteReport } from './types';

export const getWasteReport = (): WasteReport => {
    return reportData as WasteReport;
};
