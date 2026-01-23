/**
 * Settings Screen
 * Allows users to modify onboarding preferences and app settings
 */

import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Heading } from '@/components/atoms/Text';
import { llmService } from '@/services/executorch/llm';
import { type AIPersonalization, aiPersonalizationService } from '@/services/storage/aiPersonalization';
import { type UserProfile, userProfileService } from '@/services/storage/userProfile';

export default function SettingsScreen() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [personalization, setPersonalization] = useState<AIPersonalization | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadSettings();
    }, [loadSettings]);

    const loadSettings = async () => {
        try {
            const userProfile = await userProfileService.getProfile();
            const aiSettings = await aiPersonalizationService.getSettings();
            setProfile(userProfile);
            setPersonalization(aiSettings);
        } catch (error) {
            console.error('Error loading settings:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetOnboarding = () => {
        Alert.alert(
            'Reset Onboarding',
            "This will clear your profile and preferences. You'll need to complete onboarding again. Continue?",
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await userProfileService.clearProfile();
                            await aiPersonalizationService.clear();
                            // Reload the app or navigate to onboarding
                            Alert.alert('Success', 'Settings reset. Please restart the app.');
                        } catch (error) {
                            console.error('Error resetting settings:', error);
                            Alert.alert('Error', 'Failed to reset settings');
                        }
                    },
                },
            ]
        );
    };

    const handleReloadAI = async () => {
        try {
            await llmService.reloadSystemPrompt();
            Alert.alert('Success', 'AI personalization reloaded');
        } catch (error) {
            console.error('Error reloading AI:', error);
            Alert.alert('Error', 'Failed to reload AI settings');
        }
    };

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 bg-white items-center justify-center">
                <Text className="text-gray-600">Loading settings...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView className="flex-1">
                {/* Header */}
                <View className="bg-white p-6 border-b border-gray-200">
                    <Heading level="h1" className="mb-2">
                        Settings
                    </Heading>
                    <Text className="text-gray-600">Manage your profile and learning preferences</Text>
                </View>

                {/* Profile Section */}
                <View className="mt-6">
                    <Text className="px-6 text-sm font-semibold text-gray-500 uppercase mb-3">Profile</Text>
                    <View className="bg-white">
                        <SettingRow icon="person" label="Name" value={profile?.name || 'Not set'} />
                        <SettingRow
                            icon="school"
                            label="English Level"
                            value={profile?.englishLevel || 'Not assessed'}
                        />
                        <SettingRow
                            icon="time"
                            label="Daily Goal"
                            value={`${profile?.dailyGoalMinutes || 0} minutes`}
                        />
                    </View>
                </View>

                {/* AI Personalization Section */}
                {personalization && (
                    <View className="mt-6">
                        <Text className="px-6 text-sm font-semibold text-gray-500 uppercase mb-3">
                            AI Personalization
                        </Text>
                        <View className="bg-white">
                            <SettingRow
                                icon="chatbubbles"
                                label="Teaching Style"
                                value={personalization.teachingStyle}
                            />
                            <SettingRow
                                icon="checkmark-circle"
                                label="Correction Frequency"
                                value={personalization.correctionFrequency.replace(/_/g, ' ')}
                            />
                            <SettingRow icon="speedometer" label="Learning Pace" value={personalization.learningPace} />
                            <SettingRow
                                icon="list"
                                label="Primary Focus"
                                value={personalization.primaryFocusAreas.join(', ')}
                            />
                        </View>
                    </View>
                )}

                {/* Actions Section */}
                <View className="mt-6">
                    <Text className="px-6 text-sm font-semibold text-gray-500 uppercase mb-3">Actions</Text>
                    <View className="bg-white">
                        <SettingButton
                            icon="refresh"
                            label="Reload AI Personalization"
                            description="Refresh AI teaching behavior"
                            onPress={handleReloadAI}
                        />
                        <SettingButton
                            icon="create"
                            label="Edit Preferences"
                            description="Modify your learning preferences"
                            onPress={() => Alert.alert('Coming Soon', 'Preference editing will be available soon')}
                        />
                        <SettingButton
                            icon="trash"
                            label="Reset Onboarding"
                            description="Clear all settings and start over"
                            onPress={handleResetOnboarding}
                            destructive
                        />
                    </View>
                </View>

                {/* App Info */}
                <View className="p-6 items-center">
                    <Text className="text-gray-500 text-sm">Availor v1.0.0</Text>
                    <Text className="text-gray-400 text-xs mt-1">AI English Learning</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

interface SettingRowProps {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value: string;
}

const SettingRow: React.FC<SettingRowProps> = ({ icon, label, value }) => (
    <View className="flex-row items-center p-4 border-b border-gray-100">
        <View className="w-10 h-10 rounded-full bg-primary-100 items-center justify-center mr-4">
            <Ionicons name={icon} size={20} color="#2196F3" />
        </View>
        <View className="flex-1">
            <Text className="text-gray-600 text-sm">{label}</Text>
            <Text className="text-gray-900 font-medium capitalize">{value}</Text>
        </View>
    </View>
);

interface SettingButtonProps {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    description: string;
    onPress: () => void;
    destructive?: boolean;
}

const SettingButton: React.FC<SettingButtonProps> = ({ icon, label, description, onPress, destructive = false }) => (
    <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center p-4 border-b border-gray-100 active:bg-gray-50"
    >
        <View
            className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${
                destructive ? 'bg-error-100' : 'bg-gray-100'
            }`}
        >
            <Ionicons name={icon} size={20} color={destructive ? '#F44336' : '#666'} />
        </View>
        <View className="flex-1">
            <Text className={`font-medium ${destructive ? 'text-error-600' : 'text-gray-900'}`}>{label}</Text>
            <Text className="text-gray-500 text-sm">{description}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
);
