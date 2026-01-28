/**
 * Onboarding Feature Types
 */

import type { EnglishLevel, LearningStyle, AIPersonalization } from '@/core/types';

export type OnboardingStep = 'welcome' | 'assessment' | 'preferences' | 'completion';

export interface OnboardingState {
    currentStep: OnboardingStep;
    name: string;
    englishLevel: EnglishLevel | null;
    learningStyle: LearningStyle | null;
    dailyGoalMinutes: number;
    interests: string[];
    aiSettings: Partial<AIPersonalization>;
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    difficulty: EnglishLevel;
}
