"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DollarSign } from "lucide-react";

type BetControlsProps = {
  gameState: "waiting" | "running" | "crashed";
  currentMultiplier: number;
};

type PlayerState = "idle" | "betting" | "cashed_out";

export function BetControls({
  gameState: initialGameState,
  currentMultiplier: initialCurrentMultiplier,
}: BetControlsProps) {
  const [betAmount, setBetAmount] = useState("10.00");
  const [autoCashout, setAutoCashout] = useState(true);
  const [playerState, setPlayerState] = useState<PlayerState>("idle");
  const [cashedOutAt, setCashedOutAt] = useState(0);
  const [gameState, setGameState] = useState(initialGameState);
  const [currentMultiplier, setCurrentMultiplier] = useState(
    initialCurrentMultiplier
  );

  const handleBet = () => {
    if (gameState === "waiting" && playerState === "idle") {
      setPlayerState("betting");
    }
  };

  const handleCashout = () => {
    if (gameState === "running" && playerState === "betting") {
      setPlayerState("cashed_out");
      setCashedOutAt(currentMultiplier);
    }
  };

  const handleStateReset = () => {
    if (gameState === "waiting" && playerState !== "idle") {
      setPlayerState("idle");
      setCashedOutAt(0);
    }
  };

  if (gameState === "waiting" && playerState !== "idle") {
    handleStateReset();
  }

  const renderButtons = () => {
    if (playerState === "cashed_out") {
      return (
        <Button
          size="lg"
          className="w-full h-12 text-lg bg-green-600 hover:bg-green-700"
          disabled
        >
          Cashed Out @ {cashedOutAt.toFixed(2)}x
        </Button>
      );
    }

    if (gameState === "waiting") {
      if (playerState === "betting") {
        return (
          <Button
            size="lg"
            className="w-full h-12 text-lg"
            variant="destructive"
            onClick={() => setPlayerState("idle")}
          >
            Cancel Bet
          </Button>
        );
      }
      return (
        <Button size="lg" className="w-full h-12 text-lg" onClick={handleBet}>
          Place Bet
        </Button>
      );
    }

    if (gameState === "running") {
      if (playerState === "betting") {
        return (
          <Button
            size="lg"
            className="w-full h-12 text-lg bg-green-500 text-white hover:bg-green-600"
            onClick={handleCashout}
          >
            Cash Out {currentMultiplier.toFixed(2)}x
          </Button>
        );
      }
      return (
        <Button size="lg" className="w-full h-12 text-lg" disabled>
          Running...
        </Button>
      );
    }

    return (
      <Button size="lg" className="w-full h-12 text-lg" disabled>
        Crashed
      </Button>
    );
  };

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold text-primary text-center">
        Place Your Bet
      </h3>
      <div className="space-y-2">
        <Label htmlFor="bet-amount">Bet Amount</Label>
        <div className="relative">
          <Input
            id="bet-amount"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            className="pl-4 text-base"
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Button variant="outline" size="sm" onClick={() => setBetAmount("10.00")}>10XAF</Button>
          <Button variant="outline" size="sm" onClick={() => setBetAmount("50.00")}>50XAF</Button>
          <Button variant="outline" size="sm" onClick={() => setBetAmount("100.00")}>100XAF</Button>
          <Button variant="outline" size="sm" onClick={() => setBetAmount("1000.00")}>MAX</Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="auto-cashout">Auto Cashout</Label>
        <Switch
          id="auto-cashout"
          checked={autoCashout}
          onCheckedChange={setAutoCashout}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button className="h-12 text-lg" onClick={handleBet}>Place Bet</Button>
        <Button className="h-12 text-lg bg-green-500 hover:bg-green-600 text-white" onClick={handleCashout}>Cashout</Button>
      </div>
    </div>
  );
}
