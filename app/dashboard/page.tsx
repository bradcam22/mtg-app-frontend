'use client';

import { useState } from 'react';
import CardWrapper from "./_components/card";
import CardBarChart from "./_components/bar-chart";
import { ColorFilter } from './_components/filter-color-identity';

export default function Page() {
  const [selectedColor, setSelectedColor] = useState<string[] | null>(null);

  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Commander Dashboard</h1>
      <p className="text-muted-foreground mb-6">Showing stats for cards that are legal in Commander.</p>

      <div className="mb-6">
        <ColorFilter
          selectedColor={selectedColor}
          onChange={setSelectedColor}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardWrapper color={selectedColor} />
      </div>

      <div className="mt-6">
        <CardBarChart color={selectedColor} />
      </div>
    </main>
  );
}
