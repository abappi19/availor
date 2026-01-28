/**
 * SettingRow Component
 */

import React from 'react';
import { Switch, useColorScheme } from 'react-native';
import { Box, Text, HStack, Icon, Pressable, type IconName } from '@/core/ui';

interface SettingRowProps {
    title: string;
    subtitle?: string;
    icon?: IconName;
    iconColor?: string;
    iconBgColor?: string;
    value?: string | boolean;
    type?: 'link' | 'toggle' | 'select' | 'action';
    onPress?: () => void;
    onToggle?: (value: boolean) => void;
    showChevron?: boolean;
    destructive?: boolean;
}

export function SettingRow({
    title,
    subtitle,
    icon,
    iconColor = '#6B7280',
    iconBgColor = '#F3F4F6',
    value,
    type = 'link',
    onPress,
    onToggle,
    showChevron = true,
    destructive = false,
}: SettingRowProps) {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    
    // Adjust icon background for dark mode
    const bgColor = isDark ? `${iconBgColor}40` : iconBgColor;
    
    const content = (
        <HStack space="md" className="items-center py-3">
            {icon && (
                <Box
                    className="w-10 h-10 rounded-xl items-center justify-center"
                    style={{ backgroundColor: bgColor }}
                >
                    <Icon name={icon} size="md" color={iconColor} />
                </Box>
            )}

            <Box className="flex-1">
                <Text
                    className={`font-medium ${
                        destructive ? 'text-error-500' : 'text-gray-900 dark:text-white'
                    }`}
                >
                    {title}
                </Text>
                {subtitle && (
                    <Text className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</Text>
                )}
            </Box>

            {type === 'toggle' && typeof value === 'boolean' && (
                <Switch
                    value={value}
                    onValueChange={onToggle}
                    trackColor={{ false: isDark ? '#374151' : '#E5E7EB', true: '#93C5FD' }}
                    thumbColor={value ? '#2196F3' : isDark ? '#9CA3AF' : '#F3F4F6'}
                />
            )}

            {type === 'select' && typeof value === 'string' && (
                <Text className="text-gray-500 dark:text-gray-400">{value}</Text>
            )}

            {showChevron && (type === 'link' || type === 'select') && (
                <Icon name="chevron-forward" size="md" color={isDark ? '#6B7280' : '#9CA3AF'} />
            )}
        </HStack>
    );

    if (onPress) {
        return (
            <Pressable onPress={onPress} className="active:opacity-70">
                {content}
            </Pressable>
        );
    }

    return content;
}
