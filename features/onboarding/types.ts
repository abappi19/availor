/**
 * Onboarding Types
 * Shared types for the comprehensive onboarding flow
 */

import type { CorrectionFrequency, FocusArea, LearningPace, TeachingStyle } from '@/services/storage/aiPersonalization';
import type { EnglishLevel, LearningStyle } from '@/services/storage/userProfile';

export interface OnboardingData {
    // Step 1: Basic Info
    name: string;

    // Step 2: Situation & Goals
    learningSituation: 'student' | 'professional' | 'travel' | 'personal' | 'exam_prep';
    primaryGoal: string;
    secondaryGoals: string[];

    // Step 3: English Level (assessed)
    englishLevel: EnglishLevel;
    quizScore: number;

    // Step 4: Conversation Sample (for AI analysis)
    conversationSample: string;

    // Step 5: Teaching Style Preferences
    teachingStyle: TeachingStyle;
    formality: 'casual' | 'formal' | 'mixed';

    // Step 6: Correction Preferences
    correctionFrequency: CorrectionFrequency;
    explainCorrections: boolean;

    // Step 7: Focus Areas
    primaryFocusAreas: FocusArea[];
    secondaryFocusAreas: FocusArea[];

    // Step 8: Learning Pace & Schedule
    learningPace: LearningPace;
    dailyGoalMinutes: number;
    practiceFrequency: 'daily' | 'few_times_week' | 'weekly';

    // Step 9: Topics & Interests
    preferredTopics: string[];
    avoidTopics: string[];
    learningStyle: LearningStyle;

    // Step 10: Real-world Contexts
    realWorldContexts: string[];

    // Step 11: Additional Preferences
    useExamples: boolean;
    providePracticeExercises: boolean;
    culturalContext: boolean;
}

export const ONBOARDING_STEPS = [
    'welcome',
    'situation',
    'quiz',
    'conversation',
    'teaching_style',
    'corrections',
    'focus_areas',
    'pace',
    'topics',
    'contexts',
    'completion',
] as const;

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number];
