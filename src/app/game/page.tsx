import { Achievements } from "@/components/achievements";
import { GameView } from "@/components/game-view";
import { Header } from "@/components/header";
import { History } from "@/components/history";
import { StatsBar } from "@/components/stats-bar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BetControls } from "@/components/bet-controls";
import { Leaderboard } from "@/components/leaderboard";
import { GameProvider } from "@/context/game-provider";
import { Sidebar, SidebarContent, SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function GamePage() {
  return (
    <GameProvider>
      <SidebarProvider>
        <div className="flex flex-col min-h-screen bg-background text-foreground">
          <Header />
          <div className="flex flex-1">
            <Sidebar side="left" className="w-[350px] border-r border-primary/20" variant="sidebar" collapsible="icon">
              <SidebarContent className="p-0">
                <div className="flex flex-col h-full">
                  <Card className="rounded-none border-0 border-b border-primary/20 shadow-none">
                    <BetControls />
                  </Card>
                  <Card className="flex-grow rounded-none border-0 shadow-none">
                    <Tabs defaultValue="history" className="h-full flex flex-col">
                      <TabsList className="grid w-full grid-cols-3 rounded-none">
                        <TabsTrigger value="history">History</TabsTrigger>
                        <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                        <TabsTrigger value="achievements">Achievements</TabsTrigger>
                      </TabsList>
                      <TabsContent value="history" className="flex-grow mt-0 overflow-hidden">
                        <ScrollArea className="h-full">
                          <History />
                        </ScrollArea>
                      </TabsContent>
                      <TabsContent value="leaderboard" className="flex-grow mt-0 overflow-hidden">
                        <ScrollArea className="h-full">
                          <Leaderboard />
                        </ScrollArea>
                      </TabsContent>
                      <TabsContent value="achievements" className="flex-grow mt-0 overflow-hidden">
                        <ScrollArea className="h-full">
                          <Achievements />
                        </ScrollArea>
                      </TabsContent>
                    </Tabs>
                  </Card>
                </div>
              </SidebarContent>
            </Sidebar>
            <main className="flex-1 p-4 space-y-4 overflow-auto">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
                <h2 className="text-2xl font-bold text-primary">Dashboard</h2>
              </div>
              <StatsBar />
              <GameView />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </GameProvider>
  );
}
