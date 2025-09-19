"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useGame } from "@/context/game-provider";
import { cn } from "@/lib/utils";

export function BetControls() {
  const {
    gameState,
    multiplier,
    balance,
    setBalance,
    playerState,
    setPlayerState,
    addHistory,
    addLeaderboard,
    updateStats,
    updateAchievements,
  } = useGame();
  const { toast } = useToast();

  const [betAmount, setBetAmount] = useState("10.00");
  const [autoCashoutEnabled, setAutoCashoutEnabled] = useState(false);
  const [autoCashoutAmount, setAutoCashoutAmount] = useState("2.00");

  const hasUserBet = playerState === "betting" || playerState === "cashed_out";

  // Reset player state for new round
  useEffect(() => {
    if (gameState === "waiting") {
      if (playerState === "cashed_out" || playerState === "lost") {
        setPlayerState("idle");
      }
    }
  }, [gameState, playerState, setPlayerState]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    updateStats({ totalBets: 1, betAmount: amount });
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
    
    updateStats({ totalWon: profit, highestMultiplier: multiplier, wins: 1 });
    updateAchievements({ betAmount: amount, multiplier, profit, isWin: true, isCrash: false });


    addHistory({
      id: Date.now(),
      crashPoint: multiplier,
      bet: amount,
      profit: profit,
      result: "win",
    });

    if (profit > 100) {
      addLeaderboard({
        username: "You",
        profit: profit,
        multiplier: multiplier,
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      });
    }

    toast({
      title: "Cashed Out!",
      description: `You won ${profit.toFixed(
        2
      )} XAF at ${multiplier.toFixed(2)}x.`,
    });
  };

  // Handle crash loss
  useEffect(() => {
    if (gameState === "crashed" && playerState === "betting") {
      const amount = parseFloat(betAmount);
      
      setPlayerState("lost");
      updateStats({ losses: 1 });
      updateAchievements({ betAmount: amount, multiplier, profit: -amount, isWin: false, isCrash: true });

      addHistory({
        id: Date.now(),
        crashPoint: multiplier,
        bet: amount,
        profit: -amount,
        result: "loss",
      });

      toast({
        title: "Crashed!",
        description: `You lost your bet of ${betAmount} XAF.`,
        variant: "destructive",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);


  return (
    <div className="p-4 space-y-4">
       <h3 className="text-lg font-semibold text-primary">Place Your Bet</h3>
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
       <div className="grid grid-cols-2 gap-2">
         <Button
           size="lg"
           className="w-full h-12 text-lg"
           onClick={handlePlaceBet}
           disabled={hasUserBet || gameState !== 'waiting'}
         >
           Place Bet
         </Button>
         <Button
           size="lg"
           className="w-full h-12 text-lg bg-green-500 text-white hover:bg-green-600 disabled:bg-green-500/50"
           onClick={handleCashout}
           disabled={playerState !== 'betting' || gameState !== 'in-progress'}
         >
           Cash Out
         </Button>
       </div>
    </div>
  );
}
