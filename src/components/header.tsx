"use client";

import { Crown, Wallet } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Exchange } from "./icons";
import { DepositModal } from "./deposit-modal";
import { useGame } from "@/context/game-provider";

export function Header() {
  const { balance } = useGame();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-full">
            <Exchange className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold font-headline text-primary">
            PrinceWin
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm font-medium border border-primary/20 rounded-full px-4 py-2">
            <Wallet className="w-4 h-4 text-primary" />
            <span className="font-bold text-primary">{balance.toFixed(2)} XAF</span>
          </div>
          <DepositModal />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
