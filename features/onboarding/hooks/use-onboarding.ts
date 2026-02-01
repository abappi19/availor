/**
 * useOnboarding Hook - Onboarding flow state
 */

import { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import type { EnglishLevel, LearningStyle, AIPersonalization } from '@/core/types';
import { calculateLevel } from '../services/assessment.service';
import { saveOnboardingResults } from '../services/profile.service';
import type { OnboardingState, OnboardingStep } from '../types';

const STEPS: OnboardingStep[] = ['welcome', 'assessment', 'preferences', 'completion'];

const initialState: OnboardingState = {
    currentStep: 'welcome',
    name: '',
    englishLevel: null,
    learningStyle: null,
    dailyGoalMinutes: 15,
    interests: [],
    aiSettings: {},
};

export function useOnboarding() {
    const [state, setState] = useState<OnboardingState>(initialState);
    const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    // Current step index
    const currentStepIndex = STEPS.indexOf(state.currentStep);

    // Go to next step
    const nextStep = useCallback(() => {
        const nextIndex = currentStepIndex + 1;
        if (nextIndex < STEPS.length) {
            setState((prev) => ({ ...prev, currentStep: STEPS[nextIndex] }));
        }
    }, [currentStepIndex]);

    // Go to previous step
    const prevStep = useCallback(() => {
        const prevIndex = currentStepIndex - 1;
        if (prevIndex >= 0) {
            setState((prev) => ({ ...prev, currentStep: STEPS[prevIndex] }));
        }
    }, [currentStepIndex]);

    // Update name
    const setName = useCallback((name: string) => {
        setState((prev) => ({ ...prev, name }));
    }, []);

    // Update quiz answer
    const setQuizAnswer = useCallback((questionId: string, answerIndex: number) => {
        setQuizAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
    }, []);

    // Calculate level from quiz
    const submitQuiz = useCallback(() => {
        const level = calculateLevel(quizAnswers);
        setState((prev) => ({ ...prev, englishLevel: level }));
        return level;
    }, [quizAnswers]);

    // Update learning style
    const setLearningStyle = useCallback((style: LearningStyle) => {
        setState((prev) => ({ ...prev, learningStyle: style }));
    }, []);

    // Update daily goal
    const setDailyGoal = useCallback((minutes: number) => {
        setState((prev) => ({ ...prev, dailyGoalMinutes: minutes }));
    }, []);

    // Toggle interest
    const toggleInterest = useCallback((interest: string) => {
        setState((prev) => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter((i) => i !== interest)
                : [...prev.interests, interest],
        }));
    }, []);

    // Update AI settings
    const updateAISettings = useCallback((updates: Partial<AIPersonalization>) => {
        setState((prev) => ({
            ...prev,
            aiSettings: { ...prev.aiSettings, ...updates },
        }));
    }, []);

    // Complete onboarding
    const completeOnboarding = useCallback(async () => {
        setIsSubmitting(true);
        try {
            saveOnboardingResults(state);
            router.replace('/(tabs)');
        } catch (error) {
            console.error('Failed to complete onboarding:', error);
        } finally {
            setIsSubmitting(false);
        }
    }, [state, router]);

    // Check if current step is valid
    const canProceed = useCallback(() => {
        switch (state.currentStep) {
            case 'welcome':
                return state.name.trim().length >= 2;
            case 'assessment':
                return Object.keys(quizAnswers).length >= 3;
            case 'preferences':
                return state.learningStyle !== null;
            case 'completion':
                return true;
            default:
                return false;
        }
    }, [state, quizAnswers]);

    return {
        state,
        quizAnswers,
        isSubmitting,
        currentStepIndex,
        totalSteps: STEPS.length,

        // Actions
        nextStep,
        prevStep,
        setName,
        setQuizAnswer,
        submitQuiz,
        setLearningStyle,
        setDailyGoal,
        toggleInterest,
        updateAISettings,
        completeOnboarding,
        canProceed,
    };
}
