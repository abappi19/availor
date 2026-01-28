/**
 * Core shared types
 */

// Re-export store types
export type { UserProfile, AIPersonalization, EnglishLevel, LearningStyle } from './stores/user.store';

// Message types
export interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: number;
}

// Conversation types
export interface Conversation {
    id: string;
    messages: Message[];
    createdAt: number;
    updatedAt: number;
}

// Achievement types
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

// Progress types
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
