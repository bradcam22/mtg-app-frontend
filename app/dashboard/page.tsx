import CardWrapper from "./_components/card";
import CardBarChart from "./_components/bar-chart";

export default function Page() {
  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Commander Dashboard</h1>
      <p className="text-muted-foreground mb-6">Showing stats for cards that are legal in Commander.</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardWrapper />
      </div>
      <div className="mt-6">
        <CardBarChart />
      </div>
    </main>
  )
}
