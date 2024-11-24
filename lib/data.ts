import { createClient } from "@/utils/supabase/client";

export async function fetchUniqueCards() {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('v_count_unique_cards')
        .select('unique_cards');

    if (error) throw error;

    return [{
        count: data?.[0]?.unique_cards ?? 0
    }];
}

export async function fetchUniqueCardsPerYear() {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('v_unique_cards_per_year')
        .select('release_year, unique_cards')
        .order('release_year', { ascending: true });

    if (error) throw error;

    return (data ?? []).map(row => ({
        date: row.release_year,
        count: row.unique_cards
    }));
}