/**
 * Theme utilities for the application
 * Provides centralized theme constants and utilities
 */

import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * Theme color constants
 * These match the Tailwind config colors
 */
export const colors = {
    // Primary palette
    primary: {
        50: '#E3F2FD',
        100: '#BBDEFB',
        200: '#90CAF9',
        300: '#64B5F6',
        400: '#42A5F5',
        500: '#2196F3',
        600: '#1E88E5',
        700: '#1976D2',
        800: '#1565C0',
        900: '#0D47A1',
    },
    // Success palette
    success: {
        50: '#E8F5E9',
        100: '#C8E6C9',
        200: '#A5D6A7',
        300: '#81C784',
        400: '#66BB6A',
        500: '#4CAF50',
        600: '#43A047',
        700: '#388E3C',
        800: '#2E7D32',
        900: '#1B5E20',
    },
    // Warning palette
    warning: {
        50: '#FFF3E0',
        100: '#FFE0B2',
        200: '#FFCC80',
        300: '#FFB74D',
        400: '#FFA726',
        500: '#FF9800',
        600: '#FB8C00',
        700: '#F57C00',
        800: '#EF6C00',
        900: '#E65100',
    },
    // Error palette
    error: {
        50: '#FFEBEE',
        100: '#FFCDD2',
        200: '#EF9A9A',
        300: '#E57373',
        400: '#EF5350',
        500: '#F44336',
        600: '#E53935',
        700: '#D32F2F',
        800: '#C62828',
        900: '#B71C1C',
    },
    // Gray palette
    gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
    },
    // Special colors
    gold: '#FFD700',
    silver: '#C0C0C0',
    bronze: '#CD7F32',
};

/**
 * Background colors for light and dark mode
 */
export const backgrounds = {
    light: {
        primary: '#FFFFFF',
        secondary: '#F9FAFB',
        surface: '#FFFFFF',
    },
    dark: {
        primary: '#111827',
        secondary: '#1F2937',
        surface: '#1F2937',
    },
};

/**
 * Text colors for light and dark mode
 */
export const textColors = {
    light: {
        primary: '#111827',
        secondary: '#6B7280',
        tertiary: '#9CA3AF',
        muted: '#D1D5DB',
    },
    dark: {
        primary: '#FFFFFF',
        secondary: '#9CA3AF',
        tertiary: '#6B7280',
        muted: '#374151',
    },
};

/**
 * Border colors for light and dark mode
 */
export const borderColors = {
    light: {
        primary: '#E5E7EB',
        secondary: '#F3F4F6',
    },
    dark: {
        primary: '#374151',
        secondary: '#1F2937',
    },
};

/**
 * Get theme-aware color based on color scheme
 */
export function getThemedColor(
    colorScheme: 'light' | 'dark',
    lightColor: string,
    darkColor: string
): string {
    return colorScheme === 'dark' ? darkColor : lightColor;
}

/**
 * Get background color for current theme
 */
export function getBackgroundColor(
    colorScheme: 'light' | 'dark',
    variant: 'primary' | 'secondary' | 'surface' = 'primary'
): string {
    return colorScheme === 'dark' ? backgrounds.dark[variant] : backgrounds.light[variant];
}

/**
 * Get text color for current theme
 */
export function getTextColor(
    colorScheme: 'light' | 'dark',
    variant: 'primary' | 'secondary' | 'tertiary' | 'muted' = 'primary'
): string {
    return colorScheme === 'dark' ? textColors.dark[variant] : textColors.light[variant];
}

/**
 * Get border color for current theme
 */
export function getBorderColor(
    colorScheme: 'light' | 'dark',
    variant: 'primary' | 'secondary' = 'primary'
): string {
    return colorScheme === 'dark' ? borderColors.dark[variant] : borderColors.light[variant];
}

/**
 * Check if current theme is dark
 */
export function useIsDark(): boolean {
    const colorScheme = useRNColorScheme();
    return colorScheme === 'dark';
}

/**
 * Common NativeWind class combinations for dark mode
 */
export const themeClasses = {
    // Backgrounds
    bgPrimary: 'bg-white dark:bg-gray-900',
    bgSecondary: 'bg-gray-50 dark:bg-gray-800',
    bgSurface: 'bg-white dark:bg-gray-800',
    
    // Text
    textPrimary: 'text-gray-900 dark:text-white',
    textSecondary: 'text-gray-500 dark:text-gray-400',
    textMuted: 'text-gray-400 dark:text-gray-500',
    
    // Borders
    borderPrimary: 'border-gray-200 dark:border-gray-700',
    borderSecondary: 'border-gray-100 dark:border-gray-800',
    
    // Cards
    card: 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700',
    
    // Inputs
    input: 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white',
};

export default {
    colors,
    backgrounds,
    textColors,
    borderColors,
    getThemedColor,
    getBackgroundColor,
    getTextColor,
    getBorderColor,
    useIsDark,
    themeClasses,
};
