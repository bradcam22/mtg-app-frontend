'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AtomicCard, getUniqueCardsPerYear } from '@/lib/cards';

interface CardBarChartProps {
    cards: AtomicCard[];
    colorFilter: string[] | null;
}

export default function CardBarChart({ cards, colorFilter }: CardBarChartProps) {
    const data = getUniqueCardsPerYear(cards, colorFilter);

    return (
        <div className="bg-card border border-border rounded-lg p-5 h-[420px] w-full">
            <div className="text-xl font-medium mb-3">
                How many new cards are printed per year?
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
                    barGap={0}
                    barCategoryGap="15%"
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        opacity={0.4}
                    />
                    <XAxis
                        dataKey="date"
                        tickFormatter={(value) => new Date(value).getFullYear().toString()}
                        interval={4}
                        tick={{ dy: 5 }}
                    />
                    <YAxis
                        allowDecimals={false}
                        tick={{ dx: -2 }}
                        width={35}
                    />
                    <Tooltip
                        formatter={(value: number) => [value.toLocaleString(), 'Cards']}
                        labelFormatter={(label) => `Year: ${new Date(label).getFullYear()}`}
                        cursor={{ fill: 'rgba(136, 132, 216, 0.1)' }}
                        contentStyle={{
                            backgroundColor: 'hsl(var(--background))',
                            border: '1px solid var(--border)',
                            borderRadius: '6px',
                            padding: '8px',
                            opacity: 1,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    />
                    <Bar
                        dataKey="count"
                        fill="#8884d8"
                        radius={[2, 2, 0, 0]}
                        maxBarSize={50}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
