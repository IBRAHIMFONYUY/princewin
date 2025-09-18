import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Lock } from "lucide-react";

const achievements = [
  {
    id: 1,
    title: "First Win",
    description: "Achieve your first cash out over 1.01x.",
    progress: 100,
    goal: 100,
    unlocked: true,
    imageId: "first-win-achievement",
  },
  {
    id: 2,
    title: "High Roller",
    description: "Place a total of 1 BTC in bets.",
    progress: 25,
    goal: 100,
    unlocked: false,
    imageId: "high-roller-achievement",
  },
  {
    id: 3,
    title: "To the Moon!",
    description: "Cash out at over 100x.",
    progress: 0,
    goal: 100,
    unlocked: false,
    imageId: "close-call-achievement",
  },
  {
    id: 4,
    title: "Close Call",
    description: "Cash out within 0.05 of a crash.",
    progress: 100,
    goal: 100,
    unlocked: true,
    imageId: "close-call-achievement",
  },
];

export function Achievements() {
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
              {ach.progress < ach.goal && (
                <Progress value={ach.progress} className="mt-2 h-2" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
