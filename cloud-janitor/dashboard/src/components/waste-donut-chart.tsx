'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WasteDonutChartProps {
    zombieCount: number;
    totalResources: number;
}

export function WasteDonutChart({ zombieCount, totalResources }: WasteDonutChartProps) {
    const healthyCount = totalResources - zombieCount;

    const data = [
        { name: 'Zombie Resources', value: zombieCount, color: '#ef4444' },
        { name: 'Healthy Resources', value: healthyCount, color: '#10b981' },
    ];

    const COLORS = ['#ef4444', '#10b981'];

    return (
        <Card className="glass-card border-slate-800/50 bg-slate-900/40 backdrop-blur-md">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-200">
                    Resource Health Overview
                </CardTitle>
                <p className="text-sm text-slate-400">Zombie vs Healthy Resources</p>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                border: '1px solid rgba(100, 116, 139, 0.3)',
                                borderRadius: '8px',
                                color: '#f1f5f9',
                            }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            formatter={(value, entry: any) => (
                                <span className="text-slate-300 text-sm">
                                    {value}: {entry.payload.value}
                                </span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
