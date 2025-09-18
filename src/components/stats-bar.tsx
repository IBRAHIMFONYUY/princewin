import { Card } from "@/components/ui/card";

const stats = [
    { label: "Total Bets", value: "0" },
    { label: "Total Won", value: "$0.00" },
    { label: "Highest Multiplier", value: "3.94x" },
    { label: "Win Rate", value: "0%" },
];

export function StatsBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4 flex flex-col items-center justify-center text-center border-primary/20">
          <p className="text-sm text-muted-foreground">{stat.label}</p>
          <p className="text-xl font-bold text-primary">{stat.value}</p>
        </Card>
      ))}
    </div>
  );
}
