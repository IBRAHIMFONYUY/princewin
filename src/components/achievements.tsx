
"use client";

import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Lock } from "lucide-react";
import { useGame } from "@/context/game-provider";

export type Achievement = {
  id: number;
  title: string;
  description: string;
  progress: number;
  goal: number;
  unlocked: boolean;
  imageId: string;
};

export function Achievements() {
  const { achievements } = useGame();

  return (
    <div className="p-4 space-y-4">
      {achievements.map((ach) => {
        const image = PlaceHolderImages.find((img) => img.id === ach.imageId);
        return (
          <div
            key={ach.id}
            className={`flex items-center gap-4 p-4 rounded-lg border ${
              ach.unlocked ? "bg-card" : "bg-card/50"
            }`}
          >
            <div className="relative">
              {image && (
                <Image
                  src={image.imageUrl}
                  alt={ach.title}
                  width={50}
                  height={50}
                  data-ai-hint={image.imageHint}
                  className={`rounded-full ${
                    !ach.unlocked ? "opacity-30" : ""
                  }`}
                />
              )}
              {!ach.unlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                  <Lock className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
            <div className="flex-grow">
              <h3 className="font-bold">{ach.title}</h3>
              <p className="text-sm text-muted-foreground">
                {ach.description}
              </p>
              {!ach.unlocked && ach.progress < ach.goal && (
                <Progress value={ach.progress} className="mt-2 h-2" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
