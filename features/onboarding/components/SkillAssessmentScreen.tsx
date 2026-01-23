import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Button } from '@/components/atoms/Button';
import { Heading } from '@/components/atoms/Text';
import type { EnglishLevel } from '@/services/storage/userProfile';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface SkillAssessmentScreenProps {
    name: string;
    onNext: (level: EnglishLevel) => void;
    onBack: () => void;
}

const levels: { value: EnglishLevel; title: string; description: string }[] = [
    {
        value: 'A1',
        title: 'Beginner (A1)',
        description: 'I can understand and use basic phrases',
    },
    {
        value: 'A2',
        title: 'Elementary (A2)',
        description: 'I can communicate in simple routine tasks',
    },
    {
        value: 'B1',
        title: 'Intermediate (B1)',
        description: 'I can handle most travel situations',
    },
    {
        value: 'B2',
        title: 'Upper Intermediate (B2)',
        description: 'I can interact fluently with native speakers',
    },
    {
        value: 'C1',
        title: 'Advanced (C1)',
        description: 'I can express myself fluently and precisely',
    },
    {
        value: 'C2',
        title: 'Proficient (C2)',
        description: 'I have mastery of the language',
    },
];

export const SkillAssessmentScreen: React.FC<SkillAssessmentScreenProps> = ({ name, onNext, onBack }) => {
    const [selectedLevel, setSelectedLevel] = useState<EnglishLevel | null>(null);

    const handleNext = () => {
        if (selectedLevel) {
            onNext(selectedLevel);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
                <AnimatedView entering={FadeInDown.delay(100).duration(600)} className="mb-8">
                    <Heading level="h2" className="mb-2">
                        Hi {name}! 👋
                    </Heading>
                    <Text className="text-gray-600 text-lg">Let&apos;s assess your current English level</Text>
                </AnimatedView>

                <AnimatedView entering={FadeInDown.delay(200).duration(600)} className="mb-8">
                    {levels.map((level, _index) => (
                        <TouchableOpacity
                            key={level.value}
                            onPress={() => setSelectedLevel(level.value)}
                            className={`p-4 mb-3 rounded-xl border-2 ${
                                selectedLevel === level.value
                                    ? 'border-primary-500 bg-primary-50'
                                    : 'border-gray-200 bg-white'
                            }`}
                            style={{ elevation: selectedLevel === level.value ? 4 : 0 }}
                        >
                            <Text
                                className={`font-semibold text-lg mb-1 ${
                                    selectedLevel === level.value ? 'text-primary-700' : 'text-gray-900'
                                }`}
                            >
                                {level.title}
                            </Text>
                            <Text className="text-gray-600">{level.description}</Text>
                        </TouchableOpacity>
                    ))}
                </AnimatedView>

                <AnimatedView entering={FadeInDown.delay(300).duration(600)} className="gap-3">
                    <Button onPress={handleNext} disabled={!selectedLevel} variant="primary" size="lg" fullWidth>
                        Continue
                    </Button>

                    <Button onPress={onBack} variant="ghost" size="lg" fullWidth>
                        Back
                    </Button>
                </AnimatedView>
            </ScrollView>
        </SafeAreaView>
    );
};
