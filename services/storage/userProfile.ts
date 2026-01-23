/**
 * User Profile Storage
 * Manages user profile data and preferences
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export type EnglishLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type LearningStyle = 'visual' | 'auditory' | 'reading' | 'kinesthetic';

export interface UserProfile {
    id: string;
    name: string;
    englishLevel: EnglishLevel;
    interests: string[];
    goals: string[];
    learningStyle: LearningStyle;
    dailyGoalMinutes: number;
    createdAt: number;
    streak: number;
    longestStreak: number;
    lastActiveDate: number;
    totalPoints: number;
    level: number;
    currentXP: number;
    nextLevelXP: number;
    hasCompletedOnboarding: boolean;
}

const STORAGE_KEY = '@availor:user_profile';

class UserProfileService {
    /**
     * Get user profile
     */
    async getProfile(): Promise<UserProfile | null> {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading user profile:', error);
            return null;
        }
    }

    /**
     * Create or update user profile
     */
    async saveProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
        try {
            const existingProfile = await this.getProfile();

            const updatedProfile: UserProfile = {
                id: existingProfile?.id || Date.now().toString(),
                name: profile.name || existingProfile?.name || '',
                englishLevel: profile.englishLevel || existingProfile?.englishLevel || 'A1',
                interests: profile.interests || existingProfile?.interests || [],
                goals: profile.goals || existingProfile?.goals || [],
                learningStyle: profile.learningStyle || existingProfile?.learningStyle || 'visual',
                dailyGoalMinutes: profile.dailyGoalMinutes || existingProfile?.dailyGoalMinutes || 15,
                createdAt: existingProfile?.createdAt || Date.now(),
                streak: existingProfile?.streak || 0,
                longestStreak: existingProfile?.longestStreak || 0,
                lastActiveDate: existingProfile?.lastActiveDate || Date.now(),
                totalPoints: profile.totalPoints || existingProfile?.totalPoints || 0,
                level: profile.level || existingProfile?.level || 1,
                currentXP: profile.currentXP || existingProfile?.currentXP || 0,
                nextLevelXP: existingProfile?.nextLevelXP || 100,
                hasCompletedOnboarding:
                    profile.hasCompletedOnboarding !== undefined
                        ? profile.hasCompletedOnboarding
                        : existingProfile?.hasCompletedOnboarding || false,
            };

            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
            return updatedProfile;
        } catch (error) {
            console.error('Error saving user profile:', error);
            throw error;
        }
    }

    /**
     * Update streak
     */
    async updateStreak(): Promise<UserProfile> {
        const profile = await this.getProfile();
        if (!profile) throw new Error('Profile not found');

        const today = new Date().setHours(0, 0, 0, 0);
        const lastActive = new Date(profile.lastActiveDate).setHours(0, 0, 0, 0);
        const daysDiff = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));

        let newStreak = profile.streak;

        if (daysDiff === 0) {
            // Same day, no change
            newStreak = profile.streak;
        } else if (daysDiff === 1) {
            // Next day, increment streak
            newStreak = profile.streak + 1;
        } else {
            // Streak broken
            newStreak = 1;
        }

        const longestStreak = Math.max(profile.longestStreak, newStreak);

        return this.saveProfile({
            ...profile,
            streak: newStreak,
            longestStreak,
            lastActiveDate: Date.now(),
        });
    }

    /**
     * Add XP and handle leveling up
     */
    async addXP(xp: number): Promise<UserProfile> {
        const profile = await this.getProfile();
        if (!profile) throw new Error('Profile not found');

        let currentXP = profile.currentXP + xp;
        let level = profile.level;
        let nextLevelXP = profile.nextLevelXP;
        const totalPoints = profile.totalPoints + xp;

        // Level up if XP exceeds threshold
        while (currentXP >= nextLevelXP) {
            currentXP -= nextLevelXP;
            level += 1;
            nextLevelXP = Math.floor(nextLevelXP * 1.5); // 50% increase per level
        }

        return this.saveProfile({
            ...profile,
            currentXP,
            level,
            nextLevelXP,
            totalPoints,
        });
    }

    /**
     * Clear user profile (for testing/reset)
     */
    async clearProfile(): Promise<void> {
        await AsyncStorage.removeItem(STORAGE_KEY);
    }
}

export const userProfileService = new UserProfileService();
