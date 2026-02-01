/**
 * AssessmentStep Component
 */

import React, { useState } from 'react';
import { Box, Text, VStack, Button, ButtonText, Heading, HStack, Pressable, ScrollView } from '@/components/ui';
import { QUIZ_QUESTIONS } from '../constants';

interface AssessmentStepProps {
    answers: Record<string, number>;
    onAnswer: (questionId: string, answerIndex: number) => void;
}

export function AssessmentStep({ answers, onAnswer }: AssessmentStepProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const question = QUIZ_QUESTIONS[currentQuestion];

    const handleAnswer = (answerIndex: number) => {
        onAnswer(question.id, answerIndex);
        
        // Auto-advance to next question
        if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
            setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
        }
    };

    return (
        <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
            <VStack space="xl">
                {/* Header */}
                <VStack space="md" className="items-center">
                    <Heading size="2xl" className="text-center">
                        Quick Assessment
                    </Heading>
                    <Text className="text-gray-600 dark:text-gray-400 text-center">
                        Answer a few questions so we can personalize your experience
                    </Text>
                </VStack>

                {/* Progress */}
                <HStack className="justify-center" space="sm">
                    {QUIZ_QUESTIONS.map((_, index) => (
                        <Box
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                                answers[QUIZ_QUESTIONS[index].id] !== undefined
                                    ? 'bg-primary-500'
                                    : index === currentQuestion
                                    ? 'bg-gray-400 dark:bg-gray-500'
                                    : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                        />
                    ))}
                </HStack>

                {/* Question */}
                <VStack space="lg">
                    <VStack space="sm">
                        <Text className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                            Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
                        </Text>
                        <Text className="text-xl font-semibold text-gray-900 dark:text-white">
                            {question.question}
                        </Text>
                    </VStack>

                    {/* Options */}
                    <VStack space="sm">
                        {question.options.map((option, index) => {
                            const isSelected = answers[question.id] === index;
                            return (
                                <Pressable
                                    key={index}
                                    onPress={() => handleAnswer(index)}
                                    className={`p-4 rounded-xl border-2 ${
                                        isSelected
                                            ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-500'
                                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                                    }`}
                                >
                                    <HStack space="md" className="items-center">
                                        <Box
                                            className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                                                isSelected
                                                    ? 'bg-primary-500 border-primary-500'
                                                    : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                        >
                                            {isSelected && (
                                                <Box className="w-2 h-2 rounded-full bg-white" />
                                            )}
                                        </Box>
                                        <Text
                                            className={`flex-1 ${
                                                isSelected
                                                    ? 'text-primary-700 dark:text-primary-300 font-medium'
                                                    : 'text-gray-700 dark:text-gray-300'
                                            }`}
                                        >
                                            {option}
                                        </Text>
                                    </HStack>
                                </Pressable>
                            );
                        })}
                    </VStack>
                </VStack>

                {/* Navigation */}
                <HStack className="justify-between pt-4">
                    <Button
                        variant="outline"
                        action="secondary"
                        onPress={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                        disabled={currentQuestion === 0}
                    >
                        <ButtonText>Previous</ButtonText>
                    </Button>
                    <Button
                        variant="outline"
                        action="secondary"
                        onPress={() =>
                            setCurrentQuestion(
                                Math.min(QUIZ_QUESTIONS.length - 1, currentQuestion + 1)
                            )
                        }
                        disabled={currentQuestion === QUIZ_QUESTIONS.length - 1}
                    >
                        <ButtonText>Next</ButtonText>
                    </Button>
                </HStack>
            </VStack>
        </ScrollView>
    );
}
