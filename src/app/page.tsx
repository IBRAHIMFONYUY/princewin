import { Achievements } from "@/components/achievements";
import { GameView } from "@/components/game-view";
import { Header } from "@/components/header";
import { History } from "@/components/history";
import { StatsBar } from "@/components/stats-bar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BetControls } from "@/components/bet-controls";
import { Leaderboard } from "@/components/leaderboard";
import { GameProvider } from "@/context/game-provider";

export default function Home() {
  return (
    <GameProvider>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-1 p-4 space-y-4">
          <StatsBar />
          <div className="grid md:grid-cols-[1fr_350px] gap-4">
            <GameView />
            <div className="flex flex-col gap-4">
              <Card>
                <BetControls />
              </Card>
              <Card className="flex flex-col overflow-hidden flex-grow">
                <Tabs defaultValue="history" className="h-full flex flex-col">
                  <TabsList className="grid w-full grid-cols-3 rounded-none">
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="history"
                    className="flex-grow mt-0 overflow-hidden"
                  >
                    <ScrollArea className="h-full">
                      <History />
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent
                    value="leaderboard"
                    className="flex-grow mt-0 overflow-hidden"
                  >
                    <ScrollArea className="h-full">
                      <Leaderboard />
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent
                    value="achievements"
                    className="flex-grow mt-0 overflow-hidden"
                  >
                    <ScrollArea className="h-full">
                      <Achievements />
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </GameProvider>
  );
}
