import type { Achievement } from '@/components/achievements';

export const initialAchievements: Achievement[] = [
  {
    id: 1,
    title: "First Win",
    description: "Achieve your first cash out over 1.01x.",
    progress: 0,
    goal: 1, // Goal is 1 win
    unlocked: false,
    imageId: "first-win-achievement",
  },
  {
    id: 2,
    title: "High Roller",
    description: "Place a total of 1,000 XAF in bets.",
    progress: 0,
    goal: 1000, // Goal is 1000 XAF
    unlocked: false,
    imageId: "high-roller-achievement",
  },
  {
    id: 3,
    title: "To the Moon!",
    description: "Cash out at over 100x.",
    progress: 0,
    goal: 1, // Goal is 1 cashout > 100x
    unlocked: false,
    imageId: "to-the-moon-achievement",
  },
];
