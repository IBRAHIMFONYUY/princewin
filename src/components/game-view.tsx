"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { BetControls } from "@/components/bet-controls";
import { PlaneIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type GameState = "waiting" | "running" | "crashed";
type ChartDataPoint = { time: number; multiplier: number };

const GAME_TICK_MS = 100;
const WAITING_TIME_MS = 5000;

export function GameView() {
  const [gameState, setGameState] = useState<GameState>("waiting");
  const [multiplier, setMultiplier] = useState(1.0);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [startTime, setStartTime] = useState(0);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gameLoop: NodeJS.Timeout;

    const runGame = () => {
      setGameState("running");
      setStartTime(Date.now());
      setMultiplier(1.0);
      setChartData([{ time: 0, multiplier: 1.0 }]);
    };

    if (gameState === "waiting") {
      gameLoop = setTimeout(runGame, WAITING_TIME_MS);
    } else if (gameState === "running") {
      const crashPoint = 1 + Math.random() * 5 + (Math.random() > 0.95 ? Math.random() * 10 : 0);

      gameLoop = setInterval(() => {
        const elapsedTime = (Date.now() - startTime) / 1000;
        const newMultiplier = Math.pow(1.08, elapsedTime);

        if (newMultiplier >= crashPoint) {
          setMultiplier(crashPoint);
          setChartData((prev) => [...prev, { time: elapsedTime, multiplier: crashPoint }]);
          setGameState("crashed");
        } else {
          setMultiplier(newMultiplier);
          setChartData((prev) => [...prev, { time: elapsedTime, multiplier: newMultiplier }]);
        }
      }, GAME_TICK_MS);
    } else if (gameState === "crashed") {
      gameLoop = setTimeout(() => {
        setGameState("waiting");
      }, WAITING_TIME_MS / 2);
    }

    return () => {
      clearTimeout(gameLoop);
      clearInterval(gameLoop);
    };
  }, [gameState, startTime]);
  
  const backgroundClass = useMemo(() => {
    return {
      waiting: "from-blue-900/40 to-card",
      running: "from-purple-900/40 to-card",
      crashed: "from-red-900/50 to-card",
    }[gameState];
  }, [gameState]);

  const planePosition = useMemo(() => {
    if (!chartContainerRef.current || chartData.length < 2) return { x: 0, y: 0, angle: -25 };
    
    const { width, height } = chartContainerRef.current.getBoundingClientRect();
    const lastPoint = chartData[chartData.length - 1];
    const secondLastPoint = chartData[chartData.length - 2];

    const maxTime = Math.max(3, lastPoint.time);
    const maxMultiplier = Math.max(2, lastPoint.multiplier);
    
    const x = (lastPoint.time / maxTime) * width * 0.95;
    const y = (lastPoint.multiplier / maxMultiplier) * height * 0.9;
    
    const deltaX = x - ((secondLastPoint.time / maxTime) * width * 0.95);
    const deltaY = y - ((secondLastPoint.multiplier / maxMultiplier) * height * 0.9);
    
    const angle = -Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    return { x, y: Math.min(y, height-40), angle };
  }, [chartData]);


  return (
    <Card className="flex flex-col h-[500px] md:h-auto">
      <CardContent className="p-2 sm:p-4 flex-grow flex flex-col">
        <div
          ref={chartContainerRef}
          className={cn(
            "relative flex-grow rounded-lg overflow-hidden bg-gradient-to-b transition-all duration-500",
            backgroundClass
          )}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorMultiplier" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
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
            <h2 className={cn("text-5xl md:text-8xl font-bold font-headline transition-colors duration-300",
                gameState === 'running' && 'text-white',
                gameState === 'waiting' && 'text-gray-400',
                gameState === 'crashed' && 'text-red-500'
            )}>
              {gameState === 'waiting' && `Starting in...`}
              {gameState === 'running' && `${multiplier.toFixed(2)}x`}
              {gameState === 'crashed' && `Crashed @ ${multiplier.toFixed(2)}x`}
            </h2>
          </div>
          
           <PlaneIcon
              className={cn(
                "w-10 h-10 text-primary absolute bottom-4 left-4 transition-transform duration-100 ease-linear",
                { "opacity-0": gameState !== "running" }
              )}
              style={{
                transform: `translate(${planePosition.x}px, -${planePosition.y}px) rotate(${planePosition.angle}deg)`,
              }}
            />
        </div>
        <BetControls gameState={gameState} currentMultiplier={multiplier} />
      </CardContent>
    </Card>
  );
}
