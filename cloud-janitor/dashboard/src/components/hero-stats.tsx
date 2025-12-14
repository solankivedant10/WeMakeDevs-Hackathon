'use client';

'use client';

import { motion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface HeroStatsProps {
    beforeBill: number;
    afterBill: number;
    annualSavings: number;
}

export function HeroStats({ beforeBill, afterBill, annualSavings }: HeroStatsProps) {
    const [displayValue, setDisplayValue] = useState(0);
    const springValue = useSpring(0, { duration: 2000 });

    useEffect(() => {
        springValue.set(annualSavings);

        const unsubscribe = springValue.on('change', (latest) => {
            setDisplayValue(latest);
        });

        return () => unsubscribe();
    }, [annualSavings, springValue]);

    const monthlySavings = annualSavings / 12;
    const savingsPercentage = ((monthlySavings / beforeBill) * 100).toFixed(1);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 mb-12 items-center">
            {/* Before Audit Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <Card className="glass-card border-slate-800/50 bg-slate-900/40 backdrop-blur-md">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <span className="text-red-400">⚠️</span> Current Monthly Cost
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold font-mono text-slate-300">
                            ${beforeBill.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Before Audit</p>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Arrow 1 */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="hidden md:flex items-center justify-center text-slate-600 text-3xl font-bold"
            >
                →
            </motion.div>

            {/* After Cleanup Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card className="glass-card border-slate-800/50 bg-slate-900/40 backdrop-blur-md">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <span className="text-emerald-400">✅</span> Projected Monthly Cost
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold font-mono text-white">
                            ${afterBill.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">After Cleanup</p>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Arrow 2 */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.25 }}
                className="hidden md:flex items-center justify-center text-emerald-600 text-3xl font-bold"
            >
                →
            </motion.div>

            {/* Annual Savings Card - The Hero */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <Card className="glass-card border-emerald-500/30 bg-linear-to-br from-emerald-950/40 to-slate-900/40 backdrop-blur-md relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 to-transparent" />
                    <CardHeader className="pb-3 relative z-10">
                        <CardTitle className="text-sm font-medium text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                            💰 Projected Annual Savings
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10 space-y-3">
                        <motion.div className="text-4xl md:text-5xl font-bold font-mono text-emerald-400 glow-green">
                            ${displayValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </motion.div>
                        <div className="flex items-center gap-2">
                            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-xs font-semibold">
                                -{savingsPercentage}% Monthly
                            </Badge>
                            <p className="text-xs text-emerald-500/70">Per Year</p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
