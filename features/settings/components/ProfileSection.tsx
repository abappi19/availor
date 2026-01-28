/**
 * ProfileSection Component
 */

import React from 'react';
import { Box, Text, VStack, HStack, Avatar, Badge, Pressable, Icon } from '@/core/ui';
import type { UserProfile } from '@/core/types';

interface ProfileSectionProps {
    user: UserProfile | null;
    onEditPress?: () => void;
}

export function ProfileSection({ user, onEditPress }: ProfileSectionProps) {
    if (!user) {
        return (
            <Box className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                <Text className="text-gray-500 dark:text-gray-400 text-center">No profile found</Text>
            </Box>
        );
    }

    return (
        <Box className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
            <HStack space="lg" className="items-center">
                <Avatar name={user.name} size="xl" />

                <VStack className="flex-1" space="xs">
                    <Text className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</Text>
                    <HStack space="sm" className="items-center">
                        <Badge colorScheme="primary" size="sm">
                            {user.englishLevel}
                        </Badge>
                        <Text className="text-sm text-gray-500 dark:text-gray-400">{user.learningStyle}</Text>
                    </HStack>
                    <Text className="text-sm text-gray-500 dark:text-gray-400">
                        Daily goal: {user.dailyGoalMinutes} min
                    </Text>
                </VStack>

                {onEditPress && (
                    <Pressable
                        onPress={onEditPress}
                        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 items-center justify-center"
                    >
                        <Icon name="pencil" size="md" color="#6B7280" />
                    </Pressable>
                )}
            </HStack>

            {user.interests.length > 0 && (
                <VStack space="sm" className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">Interests</Text>
                    <HStack className="flex-wrap">
                        {user.interests.map((interest) => (
                            <Box
                                key={interest}
                                className="bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 mr-2 mb-2"
                            >
                                <Text className="text-sm text-gray-600 dark:text-gray-300">{interest}</Text>
                            </Box>
                        ))}
                    </HStack>
                </VStack>
            )}
        </Box>
    );
}
