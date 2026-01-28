/**
 * Dashboard Feature Constants
 */

import type { LevelInfo } from './types';

export const LEVELS: LevelInfo[] = [
    { level: 1, name: 'Beginner', minXP: 0, maxXP: 100, color: '#9E9E9E' },
    { level: 2, name: 'Novice', minXP: 100, maxXP: 250, color: '#8BC34A' },
    { level: 3, name: 'Learner', minXP: 250, maxXP: 500, color: '#4CAF50' },
    { level: 4, name: 'Intermediate', minXP: 500, maxXP: 850, color: '#03A9F4' },
    { level: 5, name: 'Skilled', minXP: 850, maxXP: 1300, color: '#2196F3' },
    { level: 6, name: 'Proficient', minXP: 1300, maxXP: 1850, color: '#3F51B5' },
    { level: 7, name: 'Advanced', minXP: 1850, maxXP: 2500, color: '#9C27B0' },
    { level: 8, name: 'Expert', minXP: 2500, maxXP: 3300, color: '#673AB7' },
    { level: 9, name: 'Master', minXP: 3300, maxXP: 4200, color: '#FF9800' },
    { level: 10, name: 'Legend', minXP: 4200, maxXP: Infinity, color: '#FFD700' },
];

export const XP_REWARDS = {
    MESSAGE_SENT: 10,
    CORRECT_ANSWER: 25,
    PRACTICE_SESSION: 50,
    DAILY_GOAL: 100,
    STREAK_BONUS_PER_DAY: 5,
} as const;
