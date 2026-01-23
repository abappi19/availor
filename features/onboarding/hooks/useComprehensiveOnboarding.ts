/**
 * Comprehensive Onboarding Hook
 * Manages state for the full onboarding flow
 */

import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { aiPersonalizationService } from '@/services/storage/aiPersonalization';
import { userProfileService } from '@/services/storage/userProfile';
import { ONBOARDING_STEPS, type OnboardingData, type OnboardingStep } from '../types';

export const useComprehensiveOnboarding = () => {
    const router = useRouter();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({
        secondaryGoals: [],
        primaryFocusAreas: [],
        secondaryFocusAreas: [],
        preferredTopics: [],
        avoidTopics: [],
        realWorldContexts: [],
        explainCorrections: true,
        useExamples: true,
        providePracticeExercises: true,
        culturalContext: true,
    });
    const [isLoading, setIsLoading] = useState(false);

    const currentStep: OnboardingStep = ONBOARDING_STEPS[currentStepIndex];
    const progress = ((currentStepIndex + 1) / ONBOARDING_STEPS.length) * 100;

    const updateData = useCallback((data: Partial<OnboardingData>) => {
        setOnboardingData((prev) => ({ ...prev, ...data }));
    }, []);

    const nextStep = useCallback(() => {
        if (currentStepIndex < ONBOARDING_STEPS.length - 1) {
            setCurrentStepIndex((prev) => prev + 1);
        }
    }, [currentStepIndex]);

    const previousStep = useCallback(() => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex((prev) => prev - 1);
        }
    }, [currentStepIndex]);

    const completeOnboarding = useCallback(async () => {
        setIsLoading(true);
        try {
            // Save user profile
            await userProfileService.saveProfile({
                name: onboardingData.name!,
                englishLevel: onboardingData.englishLevel!,
                goals: [onboardingData.primaryGoal!, ...onboardingData.secondaryGoals!],
                learningStyle: onboardingData.learningStyle!,
                dailyGoalMinutes: onboardingData.dailyGoalMinutes!,
                hasCompletedOnboarding: true,
            });

            // Save AI personalization
            await aiPersonalizationService.saveSettings({
                teachingStyle: onboardingData.teachingStyle!,
                formality: onboardingData.formality!,
                correctionFrequency: onboardingData.correctionFrequency!,
                explainCorrections: onboardingData.explainCorrections!,
                vocabularyLevel:
                    onboardingData.englishLevel! >= 'B2'
                        ? 'advanced'
                        : onboardingData.englishLevel! >= 'B1'
                          ? 'intermediate'
                          : 'simple',
                sentenceComplexity:
                    onboardingData.englishLevel! >= 'B2'
                        ? 'complex'
                        : onboardingData.englishLevel! >= 'B1'
                          ? 'moderate'
                          : 'simple',
                primaryFocusAreas: onboardingData.primaryFocusAreas!,
                secondaryFocusAreas: onboardingData.secondaryFocusAreas!,
                learningPace: onboardingData.learningPace!,
                sessionDuration: onboardingData.dailyGoalMinutes!,
                practiceFrequency: onboardingData.practiceFrequency!,
                preferredTopics: onboardingData.preferredTopics!,
                avoidTopics: onboardingData.avoidTopics!,
                realWorldContexts: onboardingData.realWorldContexts!,
                useExamples: onboardingData.useExamples!,
                providePracticeExercises: onboardingData.providePracticeExercises!,
                culturalContext: onboardingData.culturalContext!,
            });

            // Navigate to main app
            router.replace('/(tabs)');
            return true;
        } catch (error) {
            console.error('Error completing onboarding:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [onboardingData, router]);

    return {
        currentStep,
        currentStepIndex,
        totalSteps: ONBOARDING_STEPS.length,
        progress,
        onboardingData,
        isLoading,
        updateData,
        nextStep,
        previousStep,
        completeOnboarding,
    };
};
