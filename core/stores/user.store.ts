/**
 * User Store - Global user state with Zustand
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type EnglishLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type LearningStyle = 'visual' | 'auditory' | 'reading' | 'kinesthetic';

export interface UserProfile {
    id: string;
    name: string;
    englishLevel: EnglishLevel;
    learningStyle: LearningStyle;
    dailyGoalMinutes: number;
    interests: string[];
    createdAt: number;
    updatedAt: number;
}

export interface AIPersonalization {
    teachingStyle: 'encouraging' | 'balanced' | 'direct';
    formality: 'casual' | 'formal' | 'mixed';
    correctionFrequency: 'every_mistake' | 'major_errors' | 'end_of_conversation' | 'minimal';
    learningPace: 'intensive' | 'moderate' | 'relaxed';
    focusAreas: string[];
    preferredTopics: string[];
}

interface UserState {
    // User profile
    user: UserProfile | null;
    hasCompletedOnboarding: boolean;

    // AI personalization
    aiSettings: AIPersonalization | null;

    // Hydration state
    _hasHydrated: boolean;

    // Actions
    setUser: (user: UserProfile) => void;
    updateUser: (updates: Partial<UserProfile>) => void;
    setAISettings: (settings: AIPersonalization) => void;
    updateAISettings: (updates: Partial<AIPersonalization>) => void;
    completeOnboarding: () => void;
    clearUser: () => void;
    setHasHydrated: (state: boolean) => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            hasCompletedOnboarding: false,
            aiSettings: null,
            _hasHydrated: false,

            setUser: (user) =>
                set({
                    user,
                    hasCompletedOnboarding: true,
                }),

            updateUser: (updates) =>
                set((state) => ({
                    user: state.user
                        ? { ...state.user, ...updates, updatedAt: Date.now() }
                        : null,
                })),

            setAISettings: (settings) =>
                set({ aiSettings: settings }),

            updateAISettings: (updates) =>
                set((state) => ({
                    aiSettings: state.aiSettings
                        ? { ...state.aiSettings, ...updates }
                        : null,
                })),

            completeOnboarding: () =>
                set({ hasCompletedOnboarding: true }),

            clearUser: () =>
                set({
                    user: null,
                    hasCompletedOnboarding: false,
                    aiSettings: null,
                }),

            setHasHydrated: (state) =>
                set({ _hasHydrated: state }),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => AsyncStorage),
            onRehydrateStorage: () => (state) => {
                // Called after rehydration is complete
                state?.setHasHydrated(true);
            },
            partialize: (state) => ({
                // Only persist these fields, not _hasHydrated
                user: state.user,
                hasCompletedOnboarding: state.hasCompletedOnboarding,
                aiSettings: state.aiSettings,
            }),
        }
    )
);
