'use client';

import { AtomicCard, getUniqueCards } from "@/lib/cards";

interface CardWrapperProps {
    cards: AtomicCard[];
    colorFilter: string[] | null;
}

export default function CardWrapper({ cards, colorFilter }: CardWrapperProps) {
    const count = getUniqueCards(cards, colorFilter);

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