"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { ShieldCheck, Wand2 } from "lucide-react";
import { explainProvablyFair } from "@/app/actions";
import { type ProvablyFairExplanationInput } from "@/ai/flows/provably-fair-explanation";
import { ScrollArea } from "./ui/scroll-area";

type ProvablyFairModalProps = {
  gameData: ProvablyFairExplanationInput;
};

export function ProvablyFairModal({ gameData }: ProvablyFairModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleExplain = () => {
    setExplanation("");
    startTransition(async () => {
      const result = await explainProvablyFair(gameData);
      setExplanation(result.explanation);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <ShieldCheck className="w-4 h-4" />
          <span className="sr-only">Verify Fairness</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-primary" />
            Provably Fair Verification
          </DialogTitle>
          <DialogDescription>
            Verify the fairness of any game round. The outcome is determined by a combination of a server seed, your client seed, and a nonce.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-4">
             <div className="space-y-2">
              <Label htmlFor="gameId">Game ID</Label>
              <Input id="gameId" value={gameData.gameId} readOnly />
            </div>
             <div className="space-y-2">
              <Label htmlFor="serverSeed">Server Seed (Hashed)</Label>
              <Input id="serverSeed" value={gameData.serverSeed} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientSeed">Client Seed</Label>
              <Input id="clientSeed" defaultValue={gameData.clientSeed} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="nonce">Nonce</Label>
              <Input id="nonce" value={gameData.nonce} readOnly />
            </div>
            <Button onClick={handleExplain} disabled={isPending}>
              <Wand2 className="mr-2 h-4 w-4" />
              {isPending ? "Generating..." : "Explain Fairness with AI"}
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Explanation</Label>
            <ScrollArea className="h-64 rounded-md border p-4">
              {isPending && (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              )}
              {explanation ? (
                 <p className="text-sm text-muted-foreground whitespace-pre-wrap">{explanation}</p>
              ) : (
                !isPending && <p className="text-sm text-muted-foreground">Click the button to generate an AI-powered explanation of how this game's result was determined.</p>
              )}
            </ScrollArea>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
