import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useOnboarding } from '../hooks/useOnboarding';
import { WelcomeScreen } from './WelcomeScreen';
import { SkillAssessmentScreen } from './SkillAssessmentScreen';
import { PersonalizationScreen } from './PersonalizationScreen';
import { EnglishLevel, LearningStyle } from '@/services/storage/userProfile';

export const OnboardingFlow: React.FC = () => {
  const router = useRouter();
  const { currentStep, onboardingData, isLoading, updateData, nextStep, previousStep, completeOnboarding } =
    useOnboarding();

  const handleWelcomeNext = (name: string) => {
    updateData({ name });
    nextStep();
  };

  const handleSkillAssessmentNext = (englishLevel: EnglishLevel) => {
    updateData({ englishLevel });
    nextStep();
  };

  const handlePersonalizationComplete = async (data: {
    interests: string[];
    goals: string[];
    learningStyle: LearningStyle;
    dailyGoalMinutes: number;
  }) => {
    updateData(data);
    const success = await completeOnboarding();
    if (success) {
      router.replace('/(tabs)');
    }
  };

  return (
    <View className="flex-1">
      {currentStep === 0 && <WelcomeScreen onNext={handleWelcomeNext} />}
      {currentStep === 1 && (
        <SkillAssessmentScreen
          name={onboardingData.name || ''}
          onNext={handleSkillAssessmentNext}
          onBack={previousStep}
        />
      )}
      {currentStep === 2 && (
        <PersonalizationScreen
          onComplete={handlePersonalizationComplete}
          onBack={previousStep}
          loading={isLoading}
        />
      )}
    </View>
  );
};

