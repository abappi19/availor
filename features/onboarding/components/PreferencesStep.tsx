/**
 * PreferencesStep Component
 */

import React from 'react';
import { Box, Text, VStack, Heading, HStack, Pressable, ScrollView } from '@/components/ui';
import { Ionicons } from '@expo/vector-icons';
import type { LearningStyle } from '@/core/types';
import { INTERESTS, DAILY_GOAL_OPTIONS } from '../constants';

interface PreferencesStepProps {
    learningStyle: LearningStyle | null;
    dailyGoal: number;
    interests: string[];
    onLearningStyleChange: (style: LearningStyle) => void;
    onDailyGoalChange: (minutes: number) => void;
    onToggleInterest: (interest: string) => void;
}

const LEARNING_STYLES: Array<{ value: LearningStyle; label: string; icon: string; description: string }> = [
    { value: 'visual', label: 'Visual', icon: 'eye-outline', description: 'Images & diagrams' },
    { value: 'auditory', label: 'Auditory', icon: 'ear-outline', description: 'Listening & speaking' },
    { value: 'reading', label: 'Reading', icon: 'book-outline', description: 'Text & writing' },
    { value: 'kinesthetic', label: 'Interactive', icon: 'hand-left-outline', description: 'Hands-on practice' },
];

export function PreferencesStep({
    learningStyle,
    dailyGoal,
    interests,
    onLearningStyleChange,
    onDailyGoalChange,
    onToggleInterest,
}: PreferencesStepProps) {
    return (
        <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
            <VStack space="xl">
                {/* Header */}
                <VStack space="md" className="items-center">
                    <Heading size="2xl" className="text-center">
                        Personalize Your Experience
                    </Heading>
                    <Text className="text-gray-600 dark:text-gray-400 text-center">
                        Help us tailor the learning experience for you
                    </Text>
                </VStack>

                {/* Learning Style */}
                <VStack space="md">
                    <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                        How do you learn best?
                    </Text>
                    <HStack className="flex-wrap">
                        {LEARNING_STYLES.map((style) => {
                            const isSelected = learningStyle === style.value;
                            return (
                                <Pressable
                                    key={style.value}
                                    onPress={() => onLearningStyleChange(style.value)}
                                    className={`w-[48%] mr-[2%] mb-3 p-4 rounded-xl border-2 ${
                                        isSelected
                                            ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-500'
                                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                                    }`}
                                >
                                    <VStack space="sm" className="items-center">
                                        <Ionicons
                                            name={style.icon as any}
                                            size={32}
                                            color={isSelected ? '#2196F3' : '#6B7280'}
                                        />
                                        <Text
                                            className={`font-semibold ${
                                                isSelected ? 'text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'
                                            }`}
                                        >
                                            {style.label}
                                        </Text>
                                        <Text className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                            {style.description}
                                        </Text>
                                    </VStack>
                                </Pressable>
                            );
                        })}
                    </HStack>
                </VStack>

                {/* Daily Goal */}
                <VStack space="md">
                    <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                        Daily practice goal
                    </Text>
                    <HStack space="sm">
                        {DAILY_GOAL_OPTIONS.map((option) => {
                            const isSelected = dailyGoal === option.value;
                            return (
                                <Pressable
                                    key={option.value}
                                    onPress={() => onDailyGoalChange(option.value)}
                                    className={`flex-1 p-3 rounded-xl border-2 items-center ${
                                        isSelected
                                            ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-500'
                                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                                    }`}
                                >
                                    <Text
                                        className={`font-bold ${
                                            isSelected ? 'text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'
                                        }`}
                                    >
                                        {option.label}
                                    </Text>
                                    <Text className="text-xs text-gray-500 dark:text-gray-400">{option.description}</Text>
                                </Pressable>
                            );
                        })}
                    </HStack>
                </VStack>

                {/* Interests */}
                <VStack space="md">
                    <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                        What topics interest you?
                    </Text>
                    <HStack className="flex-wrap">
                        {INTERESTS.map((interest) => {
                            const isSelected = interests.includes(interest);
                            return (
                                <Pressable
                                    key={interest}
                                    onPress={() => onToggleInterest(interest)}
                                    className={`mr-2 mb-2 px-4 py-2 rounded-full border-2 ${
                                        isSelected
                                            ? 'bg-primary-500 border-primary-500'
                                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                                    }`}
                                >
                                    <Text
                                        className={`font-medium ${
                                            isSelected ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                                        }`}
                                    >
                                        {interest}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </HStack>
                </VStack>
            </VStack>
        </ScrollView>
    );
}
