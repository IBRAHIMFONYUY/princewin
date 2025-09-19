import { LandingHeader } from "@/components/landing-header";
import { Button } from "@/components/ui/button";
import { GameView } from "@/components/game-view";
import { GameProvider } from "@/context/game-provider";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <LandingHeader />
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <div className="relative w-full max-w-4xl h-64 md:h-96 rounded-lg overflow-hidden border border-primary/20 mb-8">
          <div className="absolute inset-0 opacity-30">
            <GameProvider>
              <GameView />
            </GameProvider>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-background via-background/80 to-transparent">
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
      </main>
    </div>
  );
}
