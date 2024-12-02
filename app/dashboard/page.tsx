'use client';

import { useState, useEffect } from 'react';
import CardWrapper from "./_components/card";
import CardBarChart from "./_components/bar-chart";
import { ColorFilter } from './_components/filter-color-identity';
import Loading, { LoadingCard, LoadingBarChart } from './_components/loading';
import { fetchAllCards } from '@/lib/data';
import { AtomicCard } from '@/lib/cards';

export default function Page() {
  const [selectedColor, setSelectedColor] = useState<string[] | null>(null);
  const [cards, setCards] = useState<AtomicCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllCards()
      .then(setCards)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-500">
        Error loading cards: {error}
      </div>
    );
  }

  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Commander Dashboard</h1>
      <p className="text-muted-foreground mb-6">
        Showing stats for cards that are legal in Commander.
      </p>

      <div className="mb-6">
        {loading ? (
          <div className="h-9 w-32 bg-gray-200 rounded animate-pulse" />
        ) : (
          <ColorFilter
            cards={cards}
            selectedColor={selectedColor}
            onChange={setSelectedColor}
          />
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          <LoadingCard />
        ) : (
          <CardWrapper
            cards={cards}
            colorFilter={selectedColor}
          />
        )}
      </div>

      <div className="mt-6">
        {loading ? (
          <LoadingBarChart />
        ) : (
          <CardBarChart
            cards={cards}
            colorFilter={selectedColor}
          />
        )}
      </div>
    </main>
  );
}
