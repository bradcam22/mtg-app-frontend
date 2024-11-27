'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchUniqueCardsPerYear } from '@/lib/data';

interface TimeSeriesDataPoint {
    date: string;
    count: number;
}

export default function CardBarChart() {
    const [data, setData] = useState<TimeSeriesDataPoint[]>([]);

    useEffect(() => {
        fetchUniqueCardsPerYear().then(setData);
    }, []);

    const formattedData = data.map(d => ({
        year: d.date.substring(0, 4),
        count: d.count
    }));

    return (
        <div className="w-full h-[400px] bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">How many new cards are printed per year?</h2>
            <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={formattedData}
                        margin={{ top: 25, right: 25, left: 25, bottom: 25 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="rgba(0, 0, 0, 0.08)"
                        />
                        <XAxis
                            dataKey="year"
                            angle={-45}
                            textAnchor="end"
                            tick={{ fontSize: 12, fill: '#374151' }}
                            tickMargin={10}
                            interval={1}
                            minTickGap={15}
                            height={25}
                        />
                        <YAxis
                            tick={{ fontSize: 12, fill: '#374151' }}
                            tickFormatter={(value) => value.toLocaleString()}
                            width={25}
                            tickCount={6}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#ffffff',
                                border: '1px solid #E5E7EB',
                                borderRadius: '6px',
                                padding: '12px 16px',
                                fontSize: '13px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                color: '#111827'
                            }}
                            formatter={(value: number) => [
                                `${value.toLocaleString()} cards`,
                                'New Cards'
                            ]}
                            labelFormatter={(year) => (
                                `Year: ${year}`
                            )}
                            labelStyle={{
                                fontSize: '13px',
                                fontWeight: 600,
                                color: '#111827',
                                marginBottom: '4px'
                            }}
                        />
                        <Bar
                            dataKey="count"
                            fill="rgba(99, 102, 241, 0.85)"
                            stroke="rgb(79, 82, 221)"
                            strokeWidth={1}
                            radius={[4, 4, 0, 0]}
                            maxBarSize={35}
                            animationDuration={500}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
