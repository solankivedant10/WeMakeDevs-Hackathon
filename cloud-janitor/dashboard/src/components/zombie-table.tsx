'use client';

import { motion } from 'framer-motion';
import { Database, HardDrive, Camera, FolderOpen, Server } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface Zombie {
    resource_id: string;
    name: string;
    type: string;
    region: string;
    monthly_cost: number;
    reason: string;
}

interface ZombieTableProps {
    zombies: Zombie[];
}

const getResourceIcon = (type: string) => {
    if (type.includes('RDS')) return <Database className="w-4 h-4" />;
    if (type.includes('EBS')) return <HardDrive className="w-4 h-4" />;
    if (type.includes('Snapshot')) return <Camera className="w-4 h-4" />;
    if (type.includes('S3')) return <FolderOpen className="w-4 h-4" />;
    if (type.includes('EC2')) return <Server className="w-4 h-4" />;
    return <Server className="w-4 h-4" />;
};

const getTypeBadgeColor = (type: string) => {
    if (type.includes('RDS')) return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    if (type.includes('EBS')) return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    if (type.includes('Snapshot')) return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
    if (type.includes('S3')) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    if (type.includes('EC2')) return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
};

export function ZombieTable({ zombies }: ZombieTableProps) {
    return (
        <Card className="glass-card border-slate-800/50 bg-slate-900/40 backdrop-blur-md">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-200 flex items-center gap-2">
                    ☠️ Detected Zombie Resources
                </CardTitle>
                <p className="text-sm text-slate-400">Resources identified for cleanup</p>
            </CardHeader>
            <CardContent>
                <div className="rounded-lg border border-slate-800/50 overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-950/50 hover:bg-slate-950/50 border-slate-800/50">
                                <TableHead className="text-slate-300 font-semibold">🆔 Resource ID</TableHead>
                                <TableHead className="text-slate-300 font-semibold">📦 Type</TableHead>
                                <TableHead className="text-slate-300 font-semibold">🌍 Region</TableHead>
                                <TableHead className="text-slate-300 font-semibold">💰 Monthly Cost</TableHead>
                                <TableHead className="text-slate-300 font-semibold">⚠️ Reason</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {zombies.map((zombie, index) => (
                                <motion.tr
                                    key={zombie.resource_id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="border-slate-800/50 hover:bg-slate-800/50 transition-colors group"
                                >
                                    <TableCell>
                                        <div className="font-mono text-sm text-slate-300">{zombie.name}</div>
                                        <div className="font-mono text-xs text-slate-500">{zombie.resource_id}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={`${getTypeBadgeColor(zombie.type)} flex items-center gap-1.5 w-fit`}>
                                            {getResourceIcon(zombie.type)}
                                            <span className="font-semibold">{zombie.type}</span>
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-slate-400 font-mono text-sm">
                                        {zombie.region}
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-orange-400 font-bold font-mono text-lg group-hover:text-orange-300 transition-colors">
                                            ${zombie.monthly_cost.toFixed(2)}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-slate-400 text-sm max-w-xs">
                                        {zombie.reason}
                                    </TableCell>
                                </motion.tr>
                            ))}
                            {/* Total Savings Row */}
                            <motion.tr
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: zombies.length * 0.1 + 0.2 }}
                                className="border-t-2 border-emerald-500/30 bg-emerald-950/20"
                            >
                                <TableCell colSpan={3} className="font-bold text-emerald-400 text-right py-4">
                                    Total Monthly Savings:
                                </TableCell>
                                <TableCell className="py-4">
                                    <span className="text-emerald-400 font-bold font-mono text-2xl glow-green">
                                        ${zombies.reduce((sum, z) => sum + z.monthly_cost, 0).toFixed(2)}
                                    </span>
                                </TableCell>
                                <TableCell className="text-emerald-500/70 text-sm py-4">
                                    ${(zombies.reduce((sum, z) => sum + z.monthly_cost, 0) * 12).toFixed(2)}/year
                                </TableCell>
                            </motion.tr>
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
