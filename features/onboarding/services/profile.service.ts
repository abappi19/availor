/**
 * Profile Service - Save/load user profile
 */

import type { UserProfile, AIPersonalization } from '@/core/types';
import { useUserStore } from '@/core/stores';
import type { OnboardingState } from '../types';

/**
 * Create user profile from onboarding state
 */
export function createProfileFromOnboarding(state: OnboardingState): UserProfile {
    return {
        id: Date.now().toString(),
        name: state.name,
        englishLevel: state.englishLevel || 'A1',
        learningStyle: state.learningStyle || 'reading',
        dailyGoalMinutes: state.dailyGoalMinutes,
        interests: state.interests,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    };
}

/**
 * Create AI settings from onboarding state
 */
export function createAISettingsFromOnboarding(state: OnboardingState): AIPersonalization {
    return {
        teachingStyle: state.aiSettings.teachingStyle || 'balanced',
        formality: state.aiSettings.formality || 'mixed',
        correctionFrequency: state.aiSettings.correctionFrequency || 'major_errors',
        learningPace: state.aiSettings.learningPace || 'moderate',
        focusAreas: state.aiSettings.focusAreas || [],
        preferredTopics: state.interests,
    };
}

/**
 * Save onboarding results to user store
 */
export function saveOnboardingResults(state: OnboardingState): void {
    const profile = createProfileFromOnboarding(state);
    const aiSettings = createAISettingsFromOnboarding(state);

    const { setUser, setAISettings } = useUserStore.getState();
    setUser(profile);
    setAISettings(aiSettings);
}
