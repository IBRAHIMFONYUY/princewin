"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { PlaneIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type GameState = "waiting" | "in-progress" | "crashed";
type ChartDataPoint = { time: number; multiplier: number };

const GAME_TICK_MS = 100;
const WAITING_TIME_MS = 5000;
const CRASHED_DELAY_MS = 3000;

export function GameView() {
  const [gameState, setGameState] = useState<GameState>("waiting");
  const [multiplier, setMultiplier] = useState(1.0);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [startTime, setStartTime] = useState(0);
  const [countdown, setCountdown] = useState(WAITING_TIME_MS / 1000);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gameLoop: NodeJS.Timeout;

    if (gameState === "waiting") {
      setMultiplier(1.0);
      setChartData([{ time: 0, multiplier: 1.0 }]);
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      gameLoop = setTimeout(() => {
        setGameState("in-progress");
        setStartTime(Date.now());
        clearInterval(countdownInterval);
      }, WAITING_TIME_MS);

      return () => {
        clearTimeout(gameLoop);
        clearInterval(countdownInterval);
        setCountdown(WAITING_TIME_MS / 1000);
      };
    }

    if (gameState === "in-progress") {
      const crashPoint =
        1 + Math.random() * 5 + (Math.random() > 0.9 ? Math.random() * 10 : 0);

      gameLoop = setInterval(() => {
        const elapsedTime = (Date.now() - startTime) / 1000;
        const newMultiplier = Math.pow(1.07, elapsedTime);

        if (newMultiplier >= crashPoint) {
          setMultiplier(crashPoint);
          setChartData((prev) => [
            ...prev,
            { time: elapsedTime, multiplier: crashPoint },
          ]);
          setGameState("crashed");
        } else {
          setMultiplier(newMultiplier);
          setChartData((prev) => [
            ...prev,
            { time: elapsedTime, multiplier: newMultiplier },
          ]);
        }
      }, GAME_TICK_MS);

      return () => clearInterval(gameLoop);
    }

    if (gameState === "crashed") {
      gameLoop = setTimeout(() => {
        setGameState("waiting");
      }, CRASHED_DELAY_MS);

      return () => clearTimeout(gameLoop);
    }
  }, [gameState, startTime]);

  const backgroundClass = useMemo(() => {
    return {
      waiting: "from-background to-background",
      "in-progress": "from-blue-900/10 to-background",
      crashed: "from-red-900/20 to-background",
    }[gameState];
  }, [gameState]);

  const planePosition = useMemo(() => {
    if (!chartContainerRef.current || chartData.length < 2)
      return { x: 0, y: 0, angle: -25 };

    const { width, height } = chartContainerRef.current.getBoundingClientRect();
    const lastPoint = chartData[chartData.length - 1];
    const secondLastPoint = chartData[chartData.length - 2];

    const maxTime = Math.max(3, lastPoint.time);
    const maxMultiplier = Math.max(2, lastPoint.multiplier);

    const x = (lastPoint.time / maxTime) * width * 0.95;
    const y = (lastPoint.multiplier / maxMultiplier) * height * 0.9;

    const deltaX =
      x - (secondLastPoint.time / maxTime) * width * 0.95;
    const deltaY =
      y - (secondLastPoint.multiplier / maxMultiplier) * height * 0.9;

    const angle = -Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    return { x, y: Math.min(y, height - 40), angle };
  }, [chartData]);

  const renderCenterText = () => {
    switch (gameState) {
      case "waiting":
        return (
          <div className="text-center">
            <h2 className="text-5xl md:text-8xl font-bold font-headline text-muted-foreground">
              {countdown.toFixed(1)}s
            </h2>
            <p className="text-muted-foreground">Prepare your bet!</p>
          </div>
        );
      case "in-progress":
        return (
          <h2 className={cn(
            "text-5xl md:text-8xl font-bold font-headline transition-colors duration-300 text-shadow-lg",
            multiplier > 2 ? "text-green-400" : "text-primary/80"
          )}>
            {multiplier.toFixed(2)}x
          </h2>
        );
      case "crashed":
        return (
          <h2 className="text-5xl md:text-8xl font-bold font-headline text-red-500 text-shadow-lg">
            Crashed @ {multiplier.toFixed(2)}x
          </h2>
        );
      default:
        return null;
    }
  };


  return (
    <Card className="flex flex-col h-[500px] md:h-auto border-primary/20">
      <div className="p-2 border-b border-primary/20 flex justify-between items-center">
        <span
          className={cn("text-lg font-bold", {
            "text-primary": gameState !== "crashed",
            "text-red-500": gameState === "crashed",
          })}
        >
          {multiplier.toFixed(2)}x
        </span>
        <span
          className={cn("text-sm font-semibold", {
            "text-yellow-500": gameState === "waiting",
            "text-green-500": gameState === "in-progress",
            "text-red-500": gameState === "crashed",
          })}
        >
          {gameState.toUpperCase()}
        </span>
      </div>
      <div
        ref={chartContainerRef}
        className={cn(
          "relative flex-grow rounded-b-lg overflow-hidden bg-gradient-to-b transition-all duration-500",
          backgroundClass
        )}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(var(--background))_90%)]"></div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorMultiplier" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="multiplier"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorMultiplier)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-8">
          {renderCenterText()}
        </div>

        <PlaneIcon
          className={cn(
            "w-8 h-8 text-primary absolute bottom-4 left-4 transition-all duration-100 ease-linear",
            { "opacity-0 scale-50": gameState !== "in-progress" }
          )}
          style={{
            transform: `translate(${planePosition.x}px, -${planePosition.y}px) rotate(${planePosition.angle}deg) scale(1)`,
          }}
        />
      </div>
    </Card>
  );
}
