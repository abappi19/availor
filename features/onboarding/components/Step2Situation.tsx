import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Button } from '@/components/atoms/Button';
import { Heading } from '@/components/atoms/Text';

const AnimatedView = Animated.createAnimatedComponent(View);

type Situation = 'student' | 'professional' | 'travel' | 'personal' | 'exam_prep';

interface SituationOption {
    id: Situation;
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    description: string;
    commonGoals: string[];
}

const situations: SituationOption[] = [
    {
        id: 'student',
        title: 'Student',
        icon: 'school',
        description: 'I am studying or planning to study in English',
        commonGoals: ['Academic writing', 'Reading comprehension', 'Note-taking', 'Presentations'],
    },
    {
        id: 'professional',
        title: 'Professional',
        icon: 'briefcase',
        description: 'I need English for work',
        commonGoals: ['Business meetings', 'Emails & reports', 'Presentations', 'Negotiations'],
    },
    {
        id: 'travel',
        title: 'Travel & Tourism',
        icon: 'airplane',
        description: 'I want to travel and communicate abroad',
        commonGoals: ['Conversations', 'Asking directions', 'Hotels & restaurants', 'Emergency situations'],
    },
    {
        id: 'personal',
        title: 'Personal Growth',
        icon: 'heart',
        description: 'I am learning for personal interest',
        commonGoals: ['General conversation', 'Media consumption', 'Making friends', 'Cultural understanding'],
    },
    {
        id: 'exam_prep',
        title: 'Exam Preparation',
        icon: 'clipboard',
        description: 'I am preparing for IELTS, TOEFL, or other exams',
        commonGoals: ['Test strategies', 'Writing tasks', 'Speaking practice', 'Listening comprehension'],
    },
];

export interface Step2SituationProps {
    name: string;
    onNext: (situation: Situation, primaryGoal: string, secondaryGoals: string[]) => void;
    onBack: () => void;
}

export const Step2Situation: React.FC<Step2SituationProps> = ({ name, onNext, onBack }) => {
    const [selectedSituation, setSelectedSituation] = useState<Situation | null>(null);
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

    const currentSituation = situations.find((s) => s.id === selectedSituation);

    const toggleGoal = (goal: string) => {
        setSelectedGoals((prev) => (prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]));
    };

    const handleNext = () => {
        if (selectedSituation && selectedGoals.length > 0) {
            onNext(selectedSituation, selectedGoals[0], selectedGoals.slice(1));
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
                <AnimatedView entering={FadeInDown.delay(100).duration(600)} className="mb-8">
                    <Heading level="h2" className="mb-2">
                        Hi {name}! 👋
                    </Heading>
                    <Text className="text-gray-600 text-lg">Tell us about your learning situation</Text>
                </AnimatedView>

                {/* Situation Selection */}
                {!selectedSituation ? (
                    <AnimatedView entering={FadeInDown.delay(200).duration(600)} className="mb-6">
                        <Text className="text-base font-semibold text-gray-900 mb-4">
                            What best describes your situation?
                        </Text>
                        {situations.map((situation, _index) => (
                            <TouchableOpacity
                                key={situation.id}
                                onPress={() => setSelectedSituation(situation.id)}
                                className="flex-row items-center p-4 mb-3 bg-white border-2 border-gray-200 rounded-xl active:bg-gray-50"
                                style={{ elevation: 1 }}
                            >
                                <View className="w-12 h-12 rounded-full bg-primary-100 items-center justify-center mr-4">
                                    <Ionicons name={situation.icon} size={24} color="#2196F3" />
                                </View>
                                <View className="flex-1">
                                    <Text className="font-semibold text-lg text-gray-900">{situation.title}</Text>
                                    <Text className="text-gray-600 text-sm">{situation.description}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={24} color="#9E9E9E" />
                            </TouchableOpacity>
                        ))}
                    </AnimatedView>
                ) : (
                    /* Goal Selection */
                    <AnimatedView entering={FadeInDown.delay(200).duration(600)} className="mb-6">
                        <View className="flex-row items-center justify-between mb-4">
                            <Text className="text-base font-semibold text-gray-900">
                                What are your main goals? (Select at least 1)
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedSituation(null);
                                    setSelectedGoals([]);
                                }}
                            >
                                <Text className="text-primary-600 font-medium">Change</Text>
                            </TouchableOpacity>
                        </View>

                        <View className="bg-primary-50 rounded-xl p-4 mb-4">
                            <Text className="text-primary-700 font-medium">{currentSituation?.title}</Text>
                        </View>

                        {currentSituation?.commonGoals.map((goal) => (
                            <TouchableOpacity
                                key={goal}
                                onPress={() => toggleGoal(goal)}
                                className={`p-4 mb-3 rounded-xl border-2 ${
                                    selectedGoals.includes(goal)
                                        ? 'border-primary-500 bg-primary-50'
                                        : 'border-gray-200 bg-white'
                                }`}
                            >
                                <View className="flex-row items-center justify-between">
                                    <Text
                                        className={`font-medium text-lg ${
                                            selectedGoals.includes(goal) ? 'text-primary-700' : 'text-gray-700'
                                        }`}
                                    >
                                        {goal}
                                    </Text>
                                    {selectedGoals.includes(goal) && (
                                        <Ionicons name="checkmark-circle" size={24} color="#2196F3" />
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </AnimatedView>
                )}

                {/* Actions */}
                <View className="gap-3">
                    <Button
                        onPress={handleNext}
                        disabled={!selectedSituation || selectedGoals.length === 0}
                        variant="primary"
                        size="lg"
                        fullWidth
                    >
                        Continue
                    </Button>
                    <Button onPress={onBack} variant="ghost" size="lg" fullWidth>
                        Back
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
