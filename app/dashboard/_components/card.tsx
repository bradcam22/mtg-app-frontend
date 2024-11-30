'use client';

import { useEffect, useState } from "react";
import { fetchUniqueCards } from "@/lib/data";

export default function CardWrapper({ color }: { color: string[] | null }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetchUniqueCards(color).then(([{ count }]) => setCount(count));
    }, [color]);

    return (
        <Card title="Unique Cards" value={count} />
    );
}

export function Card({ title, value }: { title: string, value: number }) {
    return (
        <div className="rounded-xl bg-white p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-4">{title}</h3>
            <p className="text-3xl font-semibold text-gray-900">
                {value.toLocaleString()}
            </p>
        </div>
    )
}