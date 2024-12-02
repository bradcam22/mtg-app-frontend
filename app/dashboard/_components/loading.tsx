export default function Loading() {
    return (
        <div className="flex items-center justify-center w-full p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
    );
}

export function LoadingCard() {
    return (
        <div className="rounded-xl bg-white p-6 shadow-md border border-gray-100 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        </div>
    );
}

export function LoadingBarChart() {
    return (
        <div className="h-[400px] w-full bg-white rounded-xl p-4 animate-pulse">
            <div className="w-full h-full bg-gray-200 rounded"></div>
        </div>
    );
} 