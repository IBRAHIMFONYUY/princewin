"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { Achievement } from '@/components/achievements';
import { initialAchievements } from '@/lib/achievements-data';

// Constants
const GAME_TICK_MS = 100;
const WAITING_TIME_MS = 5000;
const CRASHED_DELAY_MS = 3000;

// Types
export type GameState = "waiting" | "in-progress" | "crashed";
export type PlayerState = "idle" | "betting" | "cashed_out" | "lost";
export type ChartDataPoint = { time: number; multiplier: number };
export type Language = "english" | "french" | "spanish";


type HistoryItem = {
  id: number;
  crashPoint: number;
  bet: number;
  profit: number;
  result: "win" | "loss";
};

type LeaderboardItem = {
  username: string;
  profit: number;
  multiplier: number;
  avatar: string;
};

type GameStats = {
  totalBets: number;
  totalWon: number;
  totalWagered: number;
  highestMultiplier: number;
  wins: number;
  losses: number;
};

type UpdateStatsPayload = {
  totalBets?: number;
  totalWon?: number;
  betAmount?: number;
  highestMultiplier?: number;
  wins?: number;
  losses?: number;
}

type UpdateAchievementsPayload = {
  betAmount: number;
  multiplier: number;
  profit: number;
  isWin: boolean;
  isCrash: boolean;
}

interface GameContextType {
  // Game State
  gameState: GameState;
  multiplier: number;
  chartData: ChartDataPoint[];
  countdown: number;

  // Player State
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  playerState: PlayerState;
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>;
  
  // Data
  history: HistoryItem[];
  addHistory: (item: HistoryItem) => void;
  leaderboard: LeaderboardItem[];
  addLeaderboard: (item: LeaderboardItem) => void;
  achievements: Achievement[];
  updateAchievements: (payload: UpdateAchievementsPayload) => void;
  
  // Stats
  stats: GameStats & { winRate: number };
  updateStats: (payload: UpdateStatsPayload) => void;

  // Language
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialHistory = [
  { id: 1, crashPoint: 2.34, bet: 10, profit: 13.4, result: "win" as const },
  { id: 2, crashPoint: 1.0, bet: 10, profit: -10, result: "loss" as const },
  { id: 3, crashPoint: 10.12, bet: 5, profit: 45.6, result: "win" as const },
];

const initialLeaderboard = [
  { username: "CryptoKing", profit: 250.75, multiplier: 12.54, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
  { username: "LuckyLuke", profit: 221.3, multiplier: 8.91, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d" },
  { username: "Satoshi", profit: 198.45, multiplier: 25.01, avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d" },
];


export const GameProvider = ({ children }: { children: ReactNode }) => {
  // Game State
  const [gameState, setGameState] = useState<GameState>("waiting");
  const [multiplier, setMultiplier] = useState(1.0);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([{ time: 0, multiplier: 1.0 }]);
  const [startTime, setStartTime] = useState(0);
  const [countdown, setCountdown] = useState(WAITING_TIME_MS / 1000);
  
  // Player State
  const [balance, setBalance] = useState(1000.00);
  const [playerState, setPlayerState] = useState<PlayerState>("idle");
  
  // Data
  const [history, setHistory] = useState<HistoryItem[]>(initialHistory);
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>(initialLeaderboard);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  
  // Stats
  const [stats, setStats] = useState<GameStats>({
    totalBets: 0,
    totalWon: 0,
    totalWagered: 0,
    highestMultiplier: 1.0,
    wins: 0,
    losses: 0,
  });

  // Language
  const [language, setLanguage] = useState<Language>("english");

  // Game Loop
  useEffect(() => {
    let gameLoop: NodeJS.Timeout;

    if (gameState === "waiting") {
      setMultiplier(1.0);
      setChartData([{ time: 0, multiplier: 1.0 }]);
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => (prev > 0.1 ? prev - 0.1 : 0));
      }, 100);

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
      updateStats({ highestMultiplier: multiplier });
      gameLoop = setTimeout(() => {
        setGameState("waiting");
      }, CRASHED_DELAY_MS);

      return () => clearTimeout(gameLoop);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, startTime]);
  
  // Data Functions
  const addHistory = useCallback((item: HistoryItem) => {
    setHistory(prev => [item, ...prev].slice(0, 10));
  }, []);
  
  const addLeaderboard = useCallback((item: LeaderboardItem) => {
    setLeaderboard(prev => [...prev, item].sort((a,b) => b.profit - a.profit).slice(0, 10));
  }, []);

  const updateStats = useCallback((payload: UpdateStatsPayload) => {
    setStats(prev => ({
      ...prev,
      totalBets: prev.totalBets + (payload.totalBets || 0),
      totalWon: prev.totalWon + (payload.totalWon || 0),
      totalWagered: prev.totalWagered + (payload.betAmount || 0),
      highestMultiplier: Math.max(prev.highestMultiplier, payload.highestMultiplier || 0),
      wins: prev.wins + (payload.wins || 0),
      losses: prev.losses + (payload.losses || 0),
    }));
  }, []);

  const updateAchievements = useCallback((payload: UpdateAchievementsPayload) => {
    setAchievements(prev => {
      const newAchievements = prev.map(ach => {
        if (ach.unlocked) return ach;

        let newProgress = ach.progress;
        let unlocked = ach.unlocked;

        switch (ach.id) {
          case 1: // First Win
            if (payload.isWin && !ach.unlocked) {
              newProgress = 100;
              unlocked = true;
            }
            break;
          case 2: // High Roller
            if (!ach.unlocked) {
              const currentWagered = stats.totalWagered + (payload.isWin ? 0 : payload.betAmount)
              newProgress = Math.min(100, (currentWagered / ach.goal) * 100);
              if (newProgress >= 100) {
                unlocked = true;
              }
            }
            break;
          case 3: // To the Moon!
            if (payload.isWin && payload.multiplier >= 100 && !ach.unlocked) {
              newProgress = 100;
              unlocked = true;
            }
            break;
        }

        return { ...ach, progress: newProgress, unlocked };
      });
      return newAchievements;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats.totalWagered]);

  const winRate = stats.totalBets > 0 ? (stats.wins / stats.totalBets) * 100 : 0;


  const value = {
    gameState,
    multiplier,
    chartData,
    countdown,
    balance,
    setBalance,
    playerState,
    setPlayerState,
    history,
    addHistory,
    leaderboard,
    addLeaderboard,
    achievements,
    updateAchievements,
    stats: { ...stats, winRate },
    updateStats,
    language,
    setLanguage,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
