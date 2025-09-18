import { Achievements } from "@/components/achievements";
import { GameView } from "@/components/game-view";
import { Header } from "@/components/header";
import { History } from "@/components/history";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <div className="flex-1 grid md:grid-cols-[1fr_350px] gap-4 p-4 overflow-hidden">
        <GameView />
        <Card className="flex flex-col overflow-hidden">
          <Tabs defaultValue="history" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2 rounded-none">
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            <TabsContent value="history" className="flex-grow mt-0 overflow-hidden">
              <ScrollArea className="h-full">
                <History />
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
    </div>
  );
}
