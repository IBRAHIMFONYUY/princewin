"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// Constants
const GAME_TICK_MS = 100;
const WAITING_TIME_MS = 5000;
const CRASHED_DELAY_MS = 3000;

// Types
export type GameState = "waiting" | "in-progress" | "crashed";
export type PlayerState = "idle" | "betting" | "cashed_out";
export type ChartDataPoint = { time: number; multiplier: number };

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
  highestMultiplier: number;
  winRate: number;
};

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
  
  // Stats
  stats: GameStats;
  incrementTotalBets: () => void;
  addToTotalWon: (amount: number) => void;
  checkHighestMultiplier: (multiplier: number) => void;
  recalculateWinRate: () => void;
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
  const [balance, setBalance] = useState(100.00);
  const [playerState, setPlayerState] = useState<PlayerState>("idle");
  
  // Data
  const [history, setHistory] = useState<HistoryItem[]>(initialHistory);
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>(initialLeaderboard);
  
  // Stats
  const [stats, setStats] = useState<GameStats>({
    totalBets: 0,
    totalWon: 0,
    highestMultiplier: 1.0,
    winRate: 0,
  });

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
      checkHighestMultiplier(multiplier);
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

  // Stats Functions
  const incrementTotalBets = useCallback(() => {
    setStats(prev => ({ ...prev, totalBets: prev.totalBets + 1 }));
  }, []);

  const addToTotalWon = useCallback((amount: number) => {
    setStats(prev => ({...prev, totalWon: prev.totalWon + amount }));
  }, []);

  const checkHighestMultiplier = useCallback((multiplier: number) => {
    setStats(prev => ({...prev, highestMultiplier: Math.max(prev.highestMultiplier, multiplier)}));
  }, []);

  const recalculateWinRate = useCallback(() => {
    setStats(prev => {
        const wins = history.filter(h => h.result === 'win').length;
        const newWinRate = prev.totalBets > 0 ? (wins / prev.totalBets) * 100 : 0;
        return { ...prev, winRate: newWinRate };
    });
  }, [history]);


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
    stats,
    incrementTotalBets,
    addToTotalWon,
    checkHighestMultiplier,
    recalculateWinRate,
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
