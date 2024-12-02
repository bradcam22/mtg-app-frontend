'use client';

import { AtomicCard, getDistinctColorIdentities } from '@/lib/cards';

interface ColorFilterProps {
    cards: AtomicCard[];
    selectedColor: string[] | null;
    onChange: (color: string[] | null) => void;
}

export function ColorFilter({ cards, selectedColor, onChange }: ColorFilterProps) {
    const colorIdentities = getDistinctColorIdentities(cards);

    return (
        <select
            value={selectedColor ? JSON.stringify(selectedColor) : ''}
            onChange={(e) => onChange(e.target.value ? JSON.parse(e.target.value) : null)}
            className="rounded-md border border-gray-200 px-3 py-2 text-sm"
        >
            <option key="all" value="">All Colors</option>
            {colorIdentities.map(colorIdentity => {
                const key = colorIdentity.join(',') || 'colorless';
                const label = colorIdentity.length ? colorIdentity.join(', ') : 'Colorless';
                return (
                    <option
                        key={key}
                        value={JSON.stringify(colorIdentity)}
                    >
                        {label}
                    </option>
                );
            })}
        </select>
    );
} 