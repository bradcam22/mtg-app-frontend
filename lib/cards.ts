// Types that match our materialized view (v_atomic_cards)
export interface AtomicCard {
    name: string;
    face_name: string | null;
    side: string | null;
    color_identity: string;  // Stored as comma-separated string in DB
    mana_cost: string | null;
    mana_value: number | null;
    text: string | null;
    supertypes: string[] | null;
    subtypes: string[] | null;
    types: string[] | null;
    power: string | null;
    toughness: string | null;
    loyalty: string | null;
    defense: string | null;
    life: string | null;
    release_date: string;  // ISO date string
}

// Utility functions that mirror our Postgres functions
export function getUniqueCards(cards: AtomicCard[], colorFilter: string[] | null): number {
    if (!colorFilter) return new Set(cards.map(c => c.name)).size;

    const colorString = colorFilter.join(', ');
    const filteredCards = cards.filter(c => c.color_identity === colorString);
    return new Set(filteredCards.map(c => c.name)).size;
}

export function getUniqueCardsPerYear(cards: AtomicCard[], colorFilter: string[] | null): { date: string; count: number; }[] {
    const filteredCards = colorFilter
        ? cards.filter(c => c.color_identity === colorFilter.join(', '))
        : cards;

    // Create a map for all years from 1993 to current year
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1993 + 1 }, (_, i) => 1993 + i);
    const cardsByYear = years.reduce((acc, year) => {
        acc[year] = new Set();
        return acc;
    }, {} as Record<string, Set<string>>);

    // Add card data to the map
    filteredCards.forEach(card => {
        const year = parseInt(card.release_date.substring(0, 4));
        if (cardsByYear[year]) {
            cardsByYear[year].add(card.name);
        }
    });

    // Convert to array format with ISO date strings
    // Use December 31st of each year instead of January 1st
    return Object.entries(cardsByYear)
        .map(([year, uniqueNames]) => ({
            date: `${year}-12-31`,
            count: uniqueNames.size
        }))
        .sort((a, b) => a.date.localeCompare(b.date));
}

export function getDistinctColorIdentities(cards: AtomicCard[]): string[][] {
    const uniqueColorIdentities = Array.from(
        new Set(cards.map(c => c.color_identity))
    );

    return uniqueColorIdentities
        .map(colorString =>
            colorString ? colorString.split(', ').map(c => c.trim()) : []
        )
        .sort((a, b) => a.join('').localeCompare(b.join('')));
}

// Cache utilities
const DB_NAME = 'mtg-cards-db';
const STORE_NAME = 'cards';
const DB_VERSION = 1;

interface CacheData {
    timestamp: number;
    version: string;  // e.g., "2024.1"
    cards: AtomicCard[];
}

// Store version in Supabase or env variable
const CURRENT_VERSION = '2024.1';

function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {
            const db = request.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };
    });
}

export async function getCachedCards(): Promise<AtomicCard[] | null> {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get('cards');

            request.onsuccess = () => {
                const data: CacheData | undefined = request.result;
                if (!data ||
                    Date.now() - data.timestamp > 1000 * 60 * 60 * 24 * 7 ||
                    data.version !== CURRENT_VERSION) {
                    resolve(null);
                } else {
                    resolve(data.cards);
                }
            };
        });
    } catch (e) {
        console.error('Error reading cache:', e);
        return null;
    }
}

export async function setCachedCards(cards: AtomicCard[]): Promise<void> {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.put({
                timestamp: Date.now(),
                version: CURRENT_VERSION,
                cards
            }, 'cards');

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    } catch (e) {
        console.error('Error setting cache:', e);
    }
} 