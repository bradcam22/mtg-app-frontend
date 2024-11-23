'use client';

import { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { fetchUniqueCardsOverTime } from '@/lib/data';

Chart.register(...registerables);

interface TimeSeriesDataPoint {
    date: string;
    count: number;
}

export default function LineChart() {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);
    const [data, setData] = useState<TimeSeriesDataPoint[]>([]);

    useEffect(() => {
        fetchUniqueCardsOverTime().then(setData);
    }, []);

    useEffect(() => {
        if (!chartRef.current || !data.length) return;

        // Destroy existing chart
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => {
                    const date = new Date(d.date);
                    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
                }),
                datasets: [{
                    label: 'Unique Cards',
                    data: data.map(d => d.count),
                    borderColor: 'rgb(99, 102, 241)',
                    backgroundColor: 'rgba(99, 102, 241, 0.05)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    pointBackgroundColor: 'white',
                    pointBorderColor: 'rgb(99, 102, 241)',
                    pointHoverBackgroundColor: 'rgb(99, 102, 241)',
                }]
            },
            options: {
                responsive: true,
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuart'
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Unique Cards Over Time',
                        font: {
                            size: 16,
                            weight: '500'
                        },
                        padding: 20
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        title: {
                            display: true,
                            text: 'Count',
                            font: {
                                size: 12
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Date',
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data]);

    return (
        <div className="w-full h-[400px] bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <canvas ref={chartRef} />
        </div>
    );
}
