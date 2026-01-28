/**
 * StatsCard Component
 */

import { Box, HStack, Text, VStack } from '@/components/ui';
import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import React from 'react';
import { useColorScheme } from 'react-native';

type IconName = ComponentProps<typeof Ionicons>['name'];

interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: IconName;
    iconColor?: string;
    backgroundColor?: string;
    darkBackgroundColor?: string;
}

export function StatsCard({
    title,
    value,
    subtitle,
    icon,
    iconColor = '#2196F3',
    backgroundColor = '#EBF5FF',
    darkBackgroundColor,
}: StatsCardProps) {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    // Use a darker version for dark mode if not provided
    const bgColor = isDark ? darkBackgroundColor || `${backgroundColor}20` : backgroundColor;

    return (
        <Box className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <HStack space="md" className="items-start">
                <Box className="w-12 h-12 rounded-xl items-center justify-center" style={{ backgroundColor: bgColor }}>
                    <Ionicons name={icon} size={32} color={iconColor} />
                </Box>

                <VStack className="flex-1" space="xs">
                    <Text className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</Text>
                    <Text className="text-2xl font-bold text-gray-900 dark:text-white">{value}</Text>
                    {subtitle && <Text className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</Text>}
                </VStack>
            </HStack>
        </Box>
    );
}
