"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { DollarSign, Zap } from "lucide-react";

type BetControlsProps = {
  gameState: "waiting" | "running" | "crashed";
  currentMultiplier: number;
};

type PlayerState = 'idle' | 'betting' | 'cashed_out';

export function BetControls({ gameState, currentMultiplier }: BetControlsProps) {
  const [betAmount, setBetAmount] = useState("0.001");
  const [risk, setRisk] = useState("medium");
  const [playerState, setPlayerState] = useState<PlayerState>('idle');
  const [cashedOutAt, setCashedOutAt] = useState(0);

  const handleBet = () => {
    if (gameState === 'waiting' && playerState === 'idle') {
      setPlayerState('betting');
    }
  };

  const handleCashout = () => {
    if (gameState === 'running' && playerState === 'betting') {
      setPlayerState('cashed_out');
      setCashedOutAt(currentMultiplier);
    }
  }

  const handleStateReset = () => {
    if (gameState === 'waiting' && playerState !== 'idle') {
        setPlayerState('idle');
        setCashedOutAt(0);
    }
  }
  
  if (gameState === 'waiting' && playerState !== 'idle') {
      handleStateReset();
  }

  const renderButton = () => {
    if (playerState === 'cashed_out') {
        return <Button size="lg" className="w-full h-16 text-xl bg-green-600 hover:bg-green-700" disabled>Cashed Out @ {cashedOutAt.toFixed(2)}x</Button>
    }
    
    if (gameState === 'waiting') {
        if (playerState === 'betting') {
            return <Button size="lg" className="w-full h-16 text-xl" variant="destructive" onClick={() => setPlayerState('idle')}>Cancel Bet</Button>
        }
        return <Button size="lg" className="w-full h-16 text-xl" onClick={handleBet}>Place Bet</Button>
    }

    if (gameState === 'running') {
        if (playerState === 'betting') {
            return <Button size="lg" className="w-full h-16 text-xl bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleCashout}>Cash Out {currentMultiplier.toFixed(2)}x</Button>
        }
        return <Button size="lg" className="w-full h-16 text-xl" disabled>Running...</Button>
    }

    return <Button size="lg" className="w-full h-16 text-xl" disabled>Crashed</Button>
  }


  return (
    <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="space-y-2">
          <Label htmlFor="bet-amount">Bet Amount (BTC)</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input id="bet-amount" value={betAmount} onChange={(e) => setBetAmount(e.target.value)} className="pl-8" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Risk Level</Label>
          <RadioGroup
            defaultValue="medium"
            className="flex items-center space-x-2"
            value={risk}
            onValueChange={setRisk}
          >
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="low" id="low" />
              <Label htmlFor="low">Low</Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium">Med</Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="high" id="high" />
              <Label htmlFor="high">High</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className="w-full">
        {renderButton()}
      </div>
    </div>
  );
}
