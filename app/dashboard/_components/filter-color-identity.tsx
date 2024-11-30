'use client';

import { useEffect, useState } from 'react';
import { fetchDistinctColorIdentities } from '@/lib/data';

interface ColorFilterProps {
    selectedColor: string[] | null;
    onChange: (color: string[] | null) => void;
}

export function ColorFilter({ selectedColor, onChange }: ColorFilterProps) {
    const [colors, setColors] = useState<string[][]>([]);

    useEffect(() => {
        fetchDistinctColorIdentities().then(setColors);
    }, []);

    return (
        <select
            value={selectedColor ? JSON.stringify(selectedColor) : ''}
            onChange={(e) => onChange(e.target.value ? JSON.parse(e.target.value) : null)}
            className="rounded-md border border-gray-200 px-3 py-2 text-sm"
        >
            <option key="all" value="">All Colors</option>
            {colors.map(colorIdentity => {
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