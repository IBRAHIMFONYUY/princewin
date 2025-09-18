"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

type GameState = "waiting" | "in-progress" | "crashed";
type PlayerState = "idle" | "betting" | "cashed_out";

const useGameStore = () => {
  const [gameState, setGameState] = useState<GameState>("waiting");
  const [multiplier, setMultiplier] = useState(1.0);
  const [balance, setBalance] = useState(100.0);

  useEffect(() => {
    // This would typically be a WebSocket or real-time DB listener
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setGameState((prev) =>
          prev === "waiting" ? "in-progress" : "crashed"
        );
      }
      if (gameState === "crashed") {
        setTimeout(() => setGameState("waiting"), 3000);
      }
      if (gameState === "in-progress") {
        setMultiplier((m) => m + 0.05 + Math.random() * 0.1);
      } else {
        setMultiplier(1.0);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [gameState]);

  return { gameState, multiplier, balance, setBalance };
};

export function BetControls() {
  const { gameState, multiplier, balance, setBalance } = useGameStore();
  const { toast } = useToast();

  const [betAmount, setBetAmount] = useState("10.00");
  const [autoCashoutEnabled, setAutoCashoutEnabled] = useState(false);
  const [autoCashoutAmount, setAutoCashoutAmount] = useState("2.00");
  const [playerState, setPlayerState] = useState<PlayerState>("idle");
  const [cashedOutAt, setCashedOutAt] = useState(0);

  const hasUserBet = playerState === "betting" || playerState === "cashed_out";

  // Reset player state for new round
  useEffect(() => {
    if (gameState === "waiting" && playerState !== "idle") {
      setPlayerState("idle");
      setCashedOutAt(0);
    }
  }, [gameState, playerState]);

  // Auto-cashout logic
  useEffect(() => {
    if (
      gameState === "in-progress" &&
      playerState === "betting" &&
      autoCashoutEnabled &&
      multiplier >= parseFloat(autoCashoutAmount)
    ) {
      handleCashout();
    }
  }, [multiplier, gameState, playerState, autoCashoutEnabled, autoCashoutAmount]);

  const handlePlaceBet = () => {
    const amount = parseFloat(betAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Bet",
        description: "Please enter a positive number for your bet.",
        variant: "destructive",
      });
      return;
    }
    if (amount > balance) {
      toast({
        title: "Insufficient Balance",
        description: "Your bet amount exceeds your current balance.",
        variant: "destructive",
      });
      return;
    }

    setBalance((b) => b - amount);
    setPlayerState("betting");
    toast({
      title: "Bet Placed!",
      description: `Your bet of ${amount.toFixed(2)} XAF has been placed.`,
    });
  };

  const handleCashout = () => {
    if (gameState !== "in-progress" || playerState !== "betting") return;

    const amount = parseFloat(betAmount);
    const winnings = amount * multiplier;
    const profit = winnings - amount;

    setBalance((b) => b + winnings);
    setPlayerState("cashed_out");
    setCashedOutAt(multiplier);

    toast({
      title: "Cashed Out!",
      description: `You won ${profit.toFixed(
        2
      )} XAF at ${multiplier.toFixed(2)}x.`,
    });
  };

  const renderButton = () => {
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

    switch (gameState) {
      case "waiting":
        if (playerState === "betting") {
          return (
            <Button
              size="lg"
              className="w-full h-12 text-lg"
              variant="destructive"
              onClick={() => {
                setPlayerState("idle");
                setBalance(b => b + parseFloat(betAmount));
              }}
            >
              Cancel Bet
            </Button>
          );
        }
        return (
          <Button
            size="lg"
            className="w-full h-12 text-lg"
            onClick={handlePlaceBet}
          >
            Place Bet
          </Button>
        );
      case "in-progress":
        if (playerState === "betting") {
          return (
            <Button
              size="lg"
              className="w-full h-12 text-lg bg-green-500 text-white hover:bg-green-600"
              onClick={handleCashout}
            >
              Cash Out {multiplier.toFixed(2)}x
            </Button>
          );
        }
        return (
          <Button size="lg" className="w-full h-12 text-lg" disabled>
            Running...
          </Button>
        );
      case "crashed":
        if (playerState === 'betting') {
           toast({
             title: 'Crashed!',
             description: `You lost your bet of ${betAmount} XAF.`,
             variant: 'destructive',
           });
           setPlayerState('idle'); // Reset for next round
        }
        return (
          <Button size="lg" className="w-full h-12 text-lg" disabled>
            Crashed @ {multiplier.toFixed(2)}x
          </Button>
        );
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="bet-amount">Bet Amount</Label>
        <div className="relative">
          <Input
            id="bet-amount"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            className="pl-4 text-base"
            disabled={hasUserBet}
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Button variant="outline" size="sm" onClick={() => setBetAmount("10.00")} disabled={hasUserBet}>10XAF</Button>
          <Button variant="outline" size="sm" onClick={() => setBetAmount("50.00")} disabled={hasUserBet}>50XAF</Button>
          <Button variant="outline" size="sm" onClick={() => setBetAmount("100.00")} disabled={hasUserBet}>100XAF</Button>
          <Button variant="outline" size="sm" onClick={() => setBetAmount(balance.toFixed(2))} disabled={hasUserBet}>MAX</Button>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-cashout">Auto Cashout</Label>
          <Switch
            id="auto-cashout"
            checked={autoCashoutEnabled}
            onCheckedChange={setAutoCashoutEnabled}
            disabled={hasUserBet}
          />
        </div>
        {autoCashoutEnabled && (
           <div className="relative">
            <Input
              id="auto-cashout-amount"
              value={autoCashoutAmount}
              onChange={(e) => setAutoCashoutAmount(e.target.value)}
              className="pl-4 text-base"
              disabled={hasUserBet}
            />
          </div>
        )}
      </div>
      {renderButton()}
    </div>
  );
}
