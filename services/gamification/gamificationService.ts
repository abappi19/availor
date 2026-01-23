/**
 * Gamification Service
 * Manages achievements, points, and leveling system
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { type Achievement, achievementDefinitions } from './achievements';

export interface UnlockedAchievement {
    achievementId: string;
    unlockedAt: number;
}

export interface GamificationState {
    unlockedAchievements: UnlockedAchievement[];
    totalConversations: number;
    totalMinutes: number;
}

const STORAGE_KEY = '@availor:gamification';

class GamificationService {
    /**
     * Get gamification state
     */
    async getState(): Promise<GamificationState> {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEY);
            return data
                ? JSON.parse(data)
                : {
                      unlockedAchievements: [],
                      totalConversations: 0,
                      totalMinutes: 0,
                  };
        } catch (error) {
            console.error('Error loading gamification state:', error);
            return {
                unlockedAchievements: [],
                totalConversations: 0,
                totalMinutes: 0,
            };
        }
    }

    /**
     * Save gamification state
     */
    async saveState(state: GamificationState): Promise<void> {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            console.error('Error saving gamification state:', error);
        }
    }

    /**
     * Check and unlock achievements
     */
    async checkAchievements(
        streak: number,
        totalConversations: number,
        totalMinutes: number,
        userLevel: number
    ): Promise<UnlockedAchievement[]> {
        const state = await this.getState();
        const newlyUnlocked: UnlockedAchievement[] = [];

        for (const achievement of achievementDefinitions) {
            // Skip if already unlocked
            if (state.unlockedAchievements.some((ua) => ua.achievementId === achievement.id)) {
                continue;
            }

            let shouldUnlock = false;

            switch (achievement.category) {
                case 'streak':
                    shouldUnlock = streak >= achievement.requirement;
                    break;
                case 'conversation':
                    shouldUnlock = totalConversations >= achievement.requirement;
                    break;
                case 'practice':
                    shouldUnlock = totalMinutes >= achievement.requirement;
                    break;
                case 'milestone':
                    shouldUnlock = userLevel >= achievement.requirement;
                    break;
            }

            if (shouldUnlock) {
                const unlockedAchievement = {
                    achievementId: achievement.id,
                    unlockedAt: Date.now(),
                };
                newlyUnlocked.push(unlockedAchievement);
                state.unlockedAchievements.push(unlockedAchievement);
            }
        }

        if (newlyUnlocked.length > 0) {
            await this.saveState(state);
        }

        return newlyUnlocked;
    }

    /**
     * Get all achievements with unlock status
     */
    async getAllAchievements(): Promise<Array<Achievement & { isUnlocked: boolean; unlockedAt?: number }>> {
        const state = await this.getState();

        return achievementDefinitions.map((achievement) => {
            const unlocked = state.unlockedAchievements.find((ua) => ua.achievementId === achievement.id);
            return {
                ...achievement,
                isUnlocked: !!unlocked,
                unlockedAt: unlocked?.unlockedAt,
            };
        });
    }

    /**
     * Record a conversation completion
     */
    async recordConversation(): Promise<void> {
        const state = await this.getState();
        state.totalConversations += 1;
        await this.saveState(state);
    }

    /**
     * Record practice time
     */
    async recordPracticeTime(minutes: number): Promise<void> {
        const state = await this.getState();
        state.totalMinutes += minutes;
        await this.saveState(state);
    }

    /**
     * Clear gamification data
     */
    async clear(): Promise<void> {
        await AsyncStorage.removeItem(STORAGE_KEY);
    }
}

export const gamificationService = new GamificationService();
