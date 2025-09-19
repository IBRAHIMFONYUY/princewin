import type { Achievement } from '@/components/achievements';

export const initialAchievements: Achievement[] = [
  {
    id: 1,
    title: "First Win",
    description: "Achieve your first cash out over 1.01x.",
    progress: 0,
    goal: 100,
    unlocked: false,
    imageId: "first-win-achievement",
  },
  {
    id: 2,
    title: "High Roller",
    description: "Place a total of 1,000 XAF in bets.",
    progress: 0,
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
    imageId: "to-the-moon-achievement",
  },
];
