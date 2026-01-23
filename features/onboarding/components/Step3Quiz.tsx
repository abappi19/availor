import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Button } from '@/components/atoms/Button';
import { Heading } from '@/components/atoms/Text';
import type { EnglishLevel } from '@/services/storage/userProfile';

const AnimatedView = Animated.createAnimatedComponent(View);

interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    difficulty: 'easy' | 'medium' | 'hard';
}

const quizQuestions: QuizQuestion[] = [
    {
        id: 1,
        question: 'I _____ to the gym every morning.',
        options: ['go', 'goes', 'going', 'gone'],
        correctAnswer: 0,
        difficulty: 'easy',
    },
    {
        id: 2,
        question: 'She has _____ finished her homework.',
        options: ['yet', 'already', 'still', 'already been'],
        correctAnswer: 1,
        difficulty: 'medium',
    },
    {
        id: 3,
        question: 'If I _____ you, I would apologize.',
        options: ['am', 'was', 'were', 'be'],
        correctAnswer: 2,
        difficulty: 'medium',
    },
    {
        id: 4,
        question: 'The report _____ by next week.',
        options: ['will finish', 'will be finished', 'finishes', 'is finishing'],
        correctAnswer: 1,
        difficulty: 'medium',
    },
    {
        id: 5,
        question: 'Despite _____ hard, he failed the test.',
        options: ['study', 'studying', 'studied', 'to study'],
        correctAnswer: 1,
        difficulty: 'hard',
    },
    {
        id: 6,
        question: 'She suggested _____ the meeting.',
        options: ['to postpone', 'postponing', 'postpone', 'postponed'],
        correctAnswer: 1,
        difficulty: 'hard',
    },
    {
        id: 7,
        question: 'The phenomenon _____ by scientists for decades.',
        options: ['has been studying', 'has been studied', 'is studying', 'was study'],
        correctAnswer: 1,
        difficulty: 'hard',
    },
    {
        id: 8,
        question: 'Had I known about the traffic, I _____ earlier.',
        options: ['would leave', 'will leave', 'would have left', 'left'],
        correctAnswer: 2,
        difficulty: 'hard',
    },
];

export interface Step3QuizProps {
    onNext: (level: EnglishLevel, score: number) => void;
    onBack: () => void;
}

export const Step3Quiz: React.FC<Step3QuizProps> = ({ onNext, onBack }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<(number | null)[]>(new Array(quizQuestions.length).fill(null));
    const [showResults, setShowResults] = useState(false);

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

    const selectAnswer = (optionIndex: number) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = optionIndex;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            calculateResults();
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const calculateResults = () => {
        let score = 0;
        answers.forEach((answer, index) => {
            if (answer === quizQuestions[index].correctAnswer) {
                score++;
            }
        });

        const percentage = (score / quizQuestions.length) * 100;

        // Determine level based on score
        let level: EnglishLevel;
        if (percentage >= 90) level = 'C2';
        else if (percentage >= 75) level = 'C1';
        else if (percentage >= 60) level = 'B2';
        else if (percentage >= 45) level = 'B1';
        else if (percentage >= 30) level = 'A2';
        else level = 'A1';

        setShowResults(true);

        // Auto-proceed after showing results
        setTimeout(() => {
            onNext(level, score);
        }, 3000);
    };

    if (showResults) {
        const score = answers.filter((answer, index) => answer === quizQuestions[index].correctAnswer).length;
        const percentage = (score / quizQuestions.length) * 100;

        return (
            <SafeAreaView className="flex-1 bg-white">
                <View className="flex-1 items-center justify-center p-6">
                    <AnimatedView entering={FadeInDown.duration(600)} className="items-center">
                        <Text className="text-6xl mb-6">🎉</Text>
                        <Heading level="h2" className="mb-4 text-center">
                            Great Job!
                        </Heading>
                        <Text className="text-gray-600 text-lg text-center mb-8">
                            You scored {score} out of {quizQuestions.length}
                        </Text>
                        <View className="w-full bg-gray-200 rounded-full h-4 mb-4">
                            <View className="bg-success-500 h-4 rounded-full" style={{ width: `${percentage}%` }} />
                        </View>
                        <Text className="text-gray-600 text-center">Analyzing your level...</Text>
                    </AnimatedView>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1">
                {/* Progress Bar */}
                <View className="px-6 pt-6 pb-4">
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-sm text-gray-600">
                            Question {currentQuestionIndex + 1} of {quizQuestions.length}
                        </Text>
                        <Text className="text-sm text-gray-600">{Math.round(progress)}%</Text>
                    </View>
                    <View className="w-full bg-gray-200 rounded-full h-2">
                        <View className="bg-primary-500 h-2 rounded-full" style={{ width: `${progress}%` }} />
                    </View>
                </View>

                <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
                    <AnimatedView key={currentQuestionIndex} entering={FadeInDown.duration(400)} className="mb-8">
                        <Heading level="h3" className="mb-6">
                            {currentQuestion.question}
                        </Heading>

                        {currentQuestion.options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => selectAnswer(index)}
                                className={`p-4 mb-3 rounded-xl border-2 ${
                                    answers[currentQuestionIndex] === index
                                        ? 'border-primary-500 bg-primary-50'
                                        : 'border-gray-200 bg-white'
                                }`}
                            >
                                <Text
                                    className={`text-lg ${
                                        answers[currentQuestionIndex] === index
                                            ? 'text-primary-700 font-semibold'
                                            : 'text-gray-700'
                                    }`}
                                >
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </AnimatedView>
                </ScrollView>

                {/* Navigation */}
                <View className="p-6 border-t border-gray-200">
                    <View className="flex-row gap-3">
                        {currentQuestionIndex > 0 && (
                            <Button onPress={handlePrevious} variant="outline" size="lg" style={{ flex: 1 }}>
                                Previous
                            </Button>
                        )}
                        <Button
                            onPress={currentQuestionIndex === 0 ? onBack : handleNext}
                            disabled={answers[currentQuestionIndex] === null && currentQuestionIndex !== 0}
                            variant="primary"
                            size="lg"
                            style={{ flex: 2 }}
                        >
                            {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};
