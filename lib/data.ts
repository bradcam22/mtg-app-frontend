import { createClient } from "@/utils/supabase/client";

type ColorFilter = string[] | null;

interface UniqueCardsPerYear {
    release_year: string;
    unique_cards: number;
}

interface ColorIdentityResponse {
    color_identity: string;
}

export async function fetchUniqueCards(colors: ColorFilter = null) {
    const supabase = createClient();

    const { data, error } = await supabase
        .rpc('get_unique_cards', {
            color_filter: colors === null ? null :
                colors.length === 0 ? '' :
                    colors.join(', ')
        });

    if (error) throw error;

    return [{ count: data[0]?.unique_cards ?? 0 }];
}

export async function fetchUniqueCardsPerYear(colors: ColorFilter = null) {
    const supabase = createClient();

    const { data, error } = await supabase
        .rpc('get_unique_cards_per_year', {
            color_filter: colors === null ? null :
                colors.length === 0 ? '' :
                    colors.join(', ')
        });

    if (error) throw error;

    return (data ?? []).map((row: UniqueCardsPerYear) => ({
        date: row.release_year,
        count: row.unique_cards
    }));
}

export async function fetchDistinctColorIdentities(): Promise<string[][]> {
    const supabase = createClient();

    const { data, error } = await supabase.rpc('get_distinct_color_identities');

    if (error) throw error;

    return (data ?? []).map((item: ColorIdentityResponse) => {
        if (!item.color_identity) return [];
        return item.color_identity.split(',').map(color => color.trim());
    });
}
