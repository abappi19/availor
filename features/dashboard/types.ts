/**
 * Dashboard Feature Types
 */

export type AchievementCategory = 'streak' | 'conversation' | 'practice' | 'milestone';

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    category: AchievementCategory;
    requirement: number;
    xpReward: number;
    unlockedAt?: number;
}

export interface DailyProgress {
    date: string; // YYYY-MM-DD
    messagesCount: number;
    practiceMinutes: number;
    xpEarned: number;
}

export interface GamificationState {
    level: number;
    currentXP: number;
    totalXP: number;
    streakDays: number;
    lastActiveDate: string;
    unlockedAchievements: string[];
}

export interface LevelInfo {
    level: number;
    name: string;
    minXP: number;
    maxXP: number;
    color: string;
}
