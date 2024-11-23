import { fetchUniqueCards } from "@/lib/data";

export default async function CardWrapper() {
    const [{ count: countUniqueCards }] = await fetchUniqueCards();

    return (
        <>
            <Card title="Unique Cards" value={countUniqueCards} />
        </>
    )
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