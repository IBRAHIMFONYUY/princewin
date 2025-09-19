import { LandingHeader } from "@/components/landing-header";
import { Button } from "@/components/ui/button";
import { GameView } from "@/components/game-view";
import { GameProvider } from "@/context/game-provider";
import Link from "next/link";
import { ShieldCheck, Zap, Trophy, TrendingUp } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <LandingHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full flex flex-col items-center justify-center text-center p-4 pt-16 md:pt-24">
          <div className="relative w-full max-w-4xl h-64 md:h-96 rounded-lg overflow-hidden border border-primary/20 mb-8">
            <div className="absolute inset-0 opacity-30">
              <GameProvider>
                <GameView />
              </GameProvider>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-background via-background/80 to-transparent p-4">
              <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary text-shadow-lg">
                Welcome to PrinceWin
              </h1>
              <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                The ultimate crash game where timing is everything. Place your bet, watch the multiplier climb, and cash out before the crash to win big.
              </p>
              <div className="mt-8">
                <Link href="/game">
                  <Button size="lg" className="h-12 text-lg">
                    Play Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-card border-y border-primary/10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Place a Bet</h3>
                <p className="text-muted-foreground">Decide your bet amount before the round begins. You can also set an auto-cashout multiplier.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Trophy className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Watch it Climb</h3>
                <p className="text-muted-foreground">Once the round starts, the multiplier will increase from 1.00x upwards. The higher it goes, the bigger the potential win.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Cash Out</h3>
                <p className="text-muted-foreground">Click the cashout button before the game crashes to lock in your winnings. If you're too late, you lose your stake.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-1 space-y-2">
              <h2 className="text-3xl font-bold">Fair, Fast, and Fun</h2>
              <p className="text-muted-foreground">We provide a top-tier gaming experience built on transparency and cutting-edge technology.</p>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <ShieldCheck className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-1">Provably Fair</h3>
                  <p className="text-muted-foreground">Every single round can be independently verified. We can't control the outcome, and you can prove it.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Zap className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-1">Instant Payouts</h3>
                  <p className="text-muted-foreground">Win and withdraw your funds in minutes with our automated Mobile Money payment system.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Trophy className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-1">Achievements</h3>
                  <p className="text-muted-foreground">Unlock unique achievements as you play, hit milestones, and climb the leaderboard.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-card border-t border-primary/10">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PrinceWin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
