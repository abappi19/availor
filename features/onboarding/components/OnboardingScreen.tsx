/**
 * OnboardingScreen Component
 */

import { Box, Button, ButtonText, HStack, Progress, ProgressFilledTrack, VStack } from '@/components/ui';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOnboarding } from '../hooks/use-onboarding';
import { AssessmentStep } from './AssessmentStep';
import { CompletionStep } from './CompletionStep';
import { PreferencesStep } from './PreferencesStep';
import { WelcomeStep } from './WelcomeStep';

export function OnboardingScreen() {
    const {
        state,
        quizAnswers,
        isSubmitting,
        currentStepIndex,
        totalSteps,
        nextStep,
        prevStep,
        setName,
        setQuizAnswer,
        submitQuiz,
        setLearningStyle,
        setDailyGoal,
        toggleInterest,
        completeOnboarding,
        canProceed,
    } = useOnboarding();

    const handleNext = () => {
        if (state.currentStep === 'assessment') {
            submitQuiz();
        }
        if (state.currentStep === 'completion') {
            completeOnboarding();
        } else {
            nextStep();
        }
    };

    const renderStep = () => {
        switch (state.currentStep) {
            case 'welcome':
                return <WelcomeStep name={state.name} onNameChange={setName} />;
            case 'assessment':
                return <AssessmentStep answers={quizAnswers} onAnswer={setQuizAnswer} />;
            case 'preferences':
                return (
                    <PreferencesStep
                        learningStyle={state.learningStyle}
                        dailyGoal={state.dailyGoalMinutes}
                        interests={state.interests}
                        onLearningStyleChange={setLearningStyle}
                        onDailyGoalChange={setDailyGoal}
                        onToggleInterest={toggleInterest}
                    />
                );
            case 'completion':
                return <CompletionStep name={state.name} level={state.englishLevel} />;
            default:
                return null;
        }
    };

    const getButtonText = () => {
        switch (state.currentStep) {
            case 'welcome':
                return 'Get Started';
            case 'assessment':
                return 'Continue';
            case 'preferences':
                return 'Finish Setup';
            case 'completion':
                return 'Start Learning';
            default:
                return 'Next';
        }
    };

    const progressPercentage = ((currentStepIndex + 1) / totalSteps) * 100;

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
            <VStack className="flex-1">
                {/* Progress */}
                <Box className="px-6 pt-4">
                    <Progress value={progressPercentage} size="sm">
                        <ProgressFilledTrack style={{ width: `${progressPercentage}%` }} />
                    </Progress>
                </Box>

                {/* Content */}
                <Box className="flex-1">{renderStep()}</Box>

                {/* Footer */}
                <Box className="px-6 pb-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <HStack space="md">
                        {currentStepIndex > 0 && state.currentStep !== 'completion' && (
                            <Button variant="outline" className="flex-1" onPress={prevStep}>
                                <ButtonText>Back</ButtonText>
                            </Button>
                        )}
                        <Button className="flex-1" onPress={handleNext} disabled={!canProceed()}>
                            {isSubmitting ? (
                                <ButtonText>Loading...</ButtonText>
                            ) : (
                                <ButtonText>{getButtonText()}</ButtonText>
                            )}
                        </Button>
                    </HStack>
                </Box>
            </VStack>
        </SafeAreaView>
    );
}
