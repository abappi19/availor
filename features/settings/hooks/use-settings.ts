/**
 * useSettings Hook
 */

import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useUserStore } from '@/core/stores';
import type { AIPersonalization, UserProfile } from '@/core/types';

export function useSettings() {
    const user = useUserStore((state) => state.user);
    const aiSettings = useUserStore((state) => state.aiSettings);
    const updateUser = useUserStore((state) => state.updateUser);
    const updateAISettings = useUserStore((state) => state.updateAISettings);
    const clearUser = useUserStore((state) => state.clearUser);

    // Update user profile
    const updateProfile = useCallback(
        (updates: Partial<UserProfile>) => {
            updateUser(updates);
        },
        [updateUser]
    );

    // Update AI settings
    const updateAI = useCallback(
        (updates: Partial<AIPersonalization>) => {
            updateAISettings(updates);
        },
        [updateAISettings]
    );

    // Reset all data
    const resetAllData = useCallback(() => {
        Alert.alert(
            'Reset All Data',
            'This will delete all your progress, settings, and chat history. This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: () => {
                        clearUser();
                    },
                },
            ]
        );
    }, [clearUser]);

    return {
        user,
        aiSettings,
        updateProfile,
        updateAI,
        resetAllData,
    };
}
