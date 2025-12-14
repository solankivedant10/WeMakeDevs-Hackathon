'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Zombie {
    type: string;
    monthly_cost: number;
}

interface SavingsBarChartProps {
    zombies: Zombie[];
}

export function SavingsBarChart({ zombies }: SavingsBarChartProps) {
    // Aggregate savings by resource type
    const savingsByType = zombies.reduce((acc, zombie) => {
        const type = zombie.type;
        if (!acc[type]) {
            acc[type] = 0;
        }
        acc[type] += zombie.monthly_cost;
        return acc;
    }, {} as Record<string, number>);

    const data = Object.entries(savingsByType).map(([type, savings]) => ({
        type: type.replace(' Instance', '').replace(' Volume', '').replace(' Snapshot', '').replace(' Bucket', ''),
        savings: Number(savings.toFixed(2)),
    }));

    return (
        <Card className="glass-card border-slate-800/50 bg-slate-900/40 backdrop-blur-md">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-200">
                    Potential Savings by Type
                </CardTitle>
                <p className="text-sm text-slate-400">Monthly cost breakdown</p>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                        <XAxis
                            dataKey="type"
                            stroke="#94a3b8"
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                        />
                        <YAxis
                            stroke="#94a3b8"
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                border: '1px solid rgba(100, 116, 139, 0.3)',
                                borderRadius: '8px',
                                color: '#f1f5f9',
                            }}
                            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Monthly Savings']}
                            labelStyle={{ color: '#f1f5f9' }}
                        />
                        <Bar
                            dataKey="savings"
                            fill="url(#colorGradient)"
                            radius={[8, 8, 0, 0]}
                        />
                        <defs>
                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#f97316" stopOpacity={0.8} />
                                <stop offset="100%" stopColor="#ea580c" stopOpacity={0.6} />
                            </linearGradient>
                        </defs>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
