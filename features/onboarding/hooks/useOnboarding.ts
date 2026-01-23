/**
 * Onboarding Hook
 * Manages onboarding state and user profile creation
 */

import { useCallback, useState } from 'react';
import { type EnglishLevel, type LearningStyle, userProfileService } from '@/services/storage/userProfile';

export interface OnboardingData {
    name: string;
    englishLevel: EnglishLevel;
    interests: string[];
    goals: string[];
    learningStyle: LearningStyle;
    dailyGoalMinutes: number;
}

export const useOnboarding = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({
        interests: [],
        goals: [],
    });
    const [isLoading, setIsLoading] = useState(false);

    const updateData = useCallback((data: Partial<OnboardingData>) => {
        setOnboardingData((prev) => ({ ...prev, ...data }));
    }, []);

    const nextStep = useCallback(() => {
        setCurrentStep((prev) => prev + 1);
    }, []);

    const previousStep = useCallback(() => {
        setCurrentStep((prev) => Math.max(0, prev - 1));
    }, []);

    const completeOnboarding = useCallback(async () => {
        setIsLoading(true);
        try {
            await userProfileService.saveProfile({
                ...onboardingData,
                hasCompletedOnboarding: true,
            } as any);
            return true;
        } catch (error) {
            console.error('Error completing onboarding:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [onboardingData]);

    return {
        currentStep,
        onboardingData,
        isLoading,
        updateData,
        nextStep,
        previousStep,
        completeOnboarding,
    };
};
