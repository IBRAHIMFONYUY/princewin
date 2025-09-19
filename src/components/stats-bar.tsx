
"use client";

import { Card } from "@/components/ui/card";
import { useGame } from "@/context/game-provider";


export function StatsBar() {
  const { stats } = useGame();
  
  const displayStats = [
    { label: "Total Bets", value: stats.totalBets.toString() },
    { label: "Total Won", value: `${stats.totalWon.toFixed(2)} XAF` },
    { label: "Highest Multiplier", value: `${stats.highestMultiplier.toFixed(2)}x` },
    { label: "Win Rate", value: `${stats.winRate.toFixed(0)}%` },
  ]
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {displayStats.map((stat) => (
        <Card key={stat.label} className="p-4 flex flex-col items-center justify-center text-center border-primary/20">
          <p className="text-sm text-muted-foreground">{stat.label}</p>
          <p className="text-xl font-bold text-primary">{stat.value}</p>
        </Card>
      ))}
    </div>
  );
}
