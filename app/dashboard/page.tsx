import CardWrapper from "@/components/dashboard/card";
import CardBarChart from "@/components/dashboard/bar-chart";

export default function Page() {
  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardWrapper />
      </div>
      <div className="mt-6">
        <CardBarChart />
      </div>
    </main>
  )
}
