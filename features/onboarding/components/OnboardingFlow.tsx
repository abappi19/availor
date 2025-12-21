/**
 * Comprehensive Onboarding Flow Orchestrator
 * Manages navigation between all onboarding steps
 */

import React from 'react';
import { useComprehensiveOnboarding } from '../hooks/useComprehensiveOnboarding';
import { Step1Welcome } from './Step1Welcome';
import { Step2Situation } from './Step2Situation';
import { Step3Quiz } from './Step3Quiz';
import { Step4Preferences } from './Step4Preferences';
import { Step5FocusAndTopics } from './Step5FocusAndTopics';
import { Step6Completion } from './Step6Completion';

export const OnboardingFlow: React.FC = () => {
  const {
    currentStep,
    onboardingData,
    isLoading,
    updateData,
    nextStep,
    previousStep,
    completeOnboarding,
  } = useComprehensiveOnboarding();

  switch (currentStep) {
    case 'welcome':
      return (
        <Step1Welcome
          onNext={(name) => {
            updateData({ name });
            nextStep();
          }}
        />
      );

    case 'situation':
      return (
        <Step2Situation
          name={onboardingData.name!}
          onNext={(situation, primaryGoal, secondaryGoals) => {
            updateData({ learningSituation: situation, primaryGoal, secondaryGoals });
            nextStep();
          }}
          onBack={previousStep}
        />
      );

    case 'quiz':
      return (
        <Step3Quiz
          onNext={(level, score) => {
            updateData({ englishLevel: level, quizScore: score });
            nextStep();
          }}
          onBack={previousStep}
        />
      );

    case 'conversation':
      // Skip conversation sample for now, move directly to preferences
      // You can implement this later for more detailed assessment
      nextStep();
      return null;

    case 'teaching_style':
    case 'corrections':
    case 'pace':
      // Combined into single preferences screen
      return (
        <Step4Preferences
          onNext={(data) => {
            updateData({
              teachingStyle: data.teachingStyle,
              formality: data.formality,
              correctionFrequency: data.correctionFrequency,
              explainCorrections: data.explainCorrections,
              learningPace: data.learningPace,
              dailyGoalMinutes: data.dailyGoalMinutes,
              practiceFrequency: data.practiceFrequency,
            });
            // Skip to focus_areas step (we combined 3 steps)
            nextStep();
            nextStep();
            nextStep();
          }}
          onBack={previousStep}
        />
      );

    case 'focus_areas':
    case 'topics':
    case 'contexts':
      // Combined into single focus & topics screen
      return (
        <Step5FocusAndTopics
          onNext={(data) => {
            updateData({
              primaryFocusAreas: data.primaryFocusAreas,
              secondaryFocusAreas: data.secondaryFocusAreas,
              preferredTopics: data.preferredTopics,
              learningStyle: data.learningStyle,
              realWorldContexts: [], // Can be extracted from preferredTopics or situation
            });
            // Skip to completion (we combined 3 steps)
            nextStep();
            nextStep();
            nextStep();
          }}
          onBack={previousStep}
        />
      );

    case 'completion':
      return (
        <Step6Completion
          name={onboardingData.name!}
          englishLevel={onboardingData.englishLevel!}
          primaryGoal={onboardingData.primaryGoal!}
          isLoading={isLoading}
          onComplete={completeOnboarding}
        />
      );

    default:
      return null;
  }
};
