'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AtomicCard, getUniqueCardsPerYear } from '@/lib/cards';

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    return (
        <div className="bg-background border border-border rounded-md shadow-md p-2">
            <p className="text-sm font-medium">Year: {new Date(label).getFullYear()}</p>
            <p className="text-sm">Cards: {payload[0].value.toLocaleString()}</p>
        </div>
    );
};

interface CardBarChartProps {
    cards: AtomicCard[];
    colorFilter: string[] | null;
}

export default function CardBarChart({ cards, colorFilter }: CardBarChartProps) {
    const data = getUniqueCardsPerYear(cards, colorFilter);
    const maxCount = Math.max(...data.map(d => d.count));
    const yMax = maxCount <= 50 ? 50 :
        maxCount <= 100 ? 100 :
            Math.ceil(maxCount / 100) * 100;
    const tickCount = 5;
    const ticks = Array.from(
        { length: tickCount + 1 },
        (_, i) => Math.round(i * (yMax / tickCount))
    );

    return (
        <div className="bg-card border border-border rounded-lg p-5 h-[420px] w-full">
            <div className="text-xl font-medium mb-3">
                How many new cards are printed per year?
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
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
                        tick={(props) => {
                            const { x, y, payload } = props;
                            return (
                                <g transform={`translate(${x},${y})`}>
                                    <text
                                        x={0}
                                        y={0}
                                        dy={16}
                                        textAnchor="middle"
                                        fill="currentColor"
                                        fontSize={12}
                                    >
                                        {new Date(payload.value).getFullYear()}
                                    </text>
                                </g>
                            );
                        }}
                        axisLine={{ strokeWidth: 1 }}
                        tickLine={{ strokeWidth: 1 }}
                    />
                    <YAxis
                        allowDecimals={false}
                        tick={{ fontSize: 12 }}
                        axisLine={{ strokeWidth: 1 }}
                        tickLine={{ strokeWidth: 1 }}
                        domain={[0, yMax]}
                        ticks={ticks}
                        width={35}
                    />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: 'rgba(136, 132, 216, 0.1)' }}
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
