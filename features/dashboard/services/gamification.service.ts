/**
 * Gamification Service - XP, levels, achievements
 */

import { getItem, setItem } from '@/core/services/storage.service';
import { STORAGE_KEYS } from '@/core/constants';
import { LEVELS, XP_REWARDS } from '../constants';
import { ACHIEVEMENTS, getAchievement } from './achievements';
import type { GamificationState, Achievement, LevelInfo } from '../types';

const DEFAULT_STATE: GamificationState = {
    level: 1,
    currentXP: 0,
    totalXP: 0,
    streakDays: 0,
    lastActiveDate: '',
    unlockedAchievements: [],
};

/**
 * Load gamification state
 */
export async function loadState(): Promise<GamificationState> {
    const state = await getItem<GamificationState>(STORAGE_KEYS.GAMIFICATION_STATE);
    return state || DEFAULT_STATE;
}

/**
 * Save gamification state
 */
export async function saveState(state: GamificationState): Promise<boolean> {
    return setItem(STORAGE_KEYS.GAMIFICATION_STATE, state);
}

/**
 * Get level info from total XP
 */
export function getLevelFromXP(totalXP: number): LevelInfo {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
        if (totalXP >= LEVELS[i].minXP) {
            return LEVELS[i];
        }
    }
    return LEVELS[0];
}

/**
 * Calculate XP progress within current level
 */
export function getLevelProgress(totalXP: number): { current: number; max: number; percentage: number } {
    const level = getLevelFromXP(totalXP);
    const nextLevel = LEVELS.find((l) => l.level === level.level + 1);
    
    if (!nextLevel) {
        return { current: totalXP - level.minXP, max: 1000, percentage: 100 };
    }

    const current = totalXP - level.minXP;
    const max = nextLevel.minXP - level.minXP;
    const percentage = Math.round((current / max) * 100);

    return { current, max, percentage };
}

/**
 * Add XP and update state
 */
export async function addXP(
    amount: number,
    state: GamificationState
): Promise<{ state: GamificationState; leveledUp: boolean; newLevel?: LevelInfo }> {
    const newTotalXP = state.totalXP + amount;
    const oldLevel = getLevelFromXP(state.totalXP);
    const newLevel = getLevelFromXP(newTotalXP);
    const leveledUp = newLevel.level > oldLevel.level;

    const progress = getLevelProgress(newTotalXP);

    const newState: GamificationState = {
        ...state,
        totalXP: newTotalXP,
        currentXP: progress.current,
        level: newLevel.level,
    };

    await saveState(newState);

    return {
        state: newState,
        leveledUp,
        newLevel: leveledUp ? newLevel : undefined,
    };
}

/**
 * Update streak
 */
export function updateStreak(state: GamificationState, today: string): GamificationState {
    const { lastActiveDate, streakDays } = state;

    if (!lastActiveDate) {
        return { ...state, streakDays: 1, lastActiveDate: today };
    }

    if (lastActiveDate === today) {
        return state; // Already active today
    }

    const lastDate = new Date(lastActiveDate);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
        // Continue streak
        return { ...state, streakDays: streakDays + 1, lastActiveDate: today };
    } else {
        // Reset streak
        return { ...state, streakDays: 1, lastActiveDate: today };
    }
}

/**
 * Check and unlock achievements
 */
export function checkAchievements(
    state: GamificationState,
    stats: { messagesCount: number; practiceMinutes: number }
): { newAchievements: Achievement[]; updatedState: GamificationState } {
    const newAchievements: Achievement[] = [];
    const unlockedIds = new Set(state.unlockedAchievements);

    for (const achievement of ACHIEVEMENTS) {
        if (unlockedIds.has(achievement.id)) continue;

        let shouldUnlock = false;

        switch (achievement.category) {
            case 'streak':
                shouldUnlock = state.streakDays >= achievement.requirement;
                break;
            case 'conversation':
                shouldUnlock = stats.messagesCount >= achievement.requirement;
                break;
            case 'practice':
                shouldUnlock = stats.practiceMinutes >= achievement.requirement;
                break;
            case 'milestone':
                shouldUnlock = state.level >= achievement.requirement;
                break;
        }

        if (shouldUnlock) {
            newAchievements.push({ ...achievement, unlockedAt: Date.now() });
            unlockedIds.add(achievement.id);
        }
    }

    const updatedState: GamificationState = {
        ...state,
        unlockedAchievements: Array.from(unlockedIds),
    };

    return { newAchievements, updatedState };
}
