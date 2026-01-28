/**
 * SettingsScreen Component
 */

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, Text, VStack, ScrollView, Divider, Heading } from '@/components/ui';
import { useSettings } from '../hooks/use-settings';
import { ProfileSection } from './ProfileSection';
import { AISection } from './AISection';
import { SettingRow } from './SettingRow';

export function SettingsScreen() {
    const { user, aiSettings, updateAI, resetAllData } = useSettings();

    return (
        <SafeAreaView
            className="flex-1 bg-gray-50 dark:bg-gray-900"
            edges={['top', 'left', 'right']}
        >
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <VStack space="sm" className="mb-6">
                    <Heading size="3xl">
                        Settings
                    </Heading>
                    <Text className="text-gray-500 dark:text-gray-400">
                        Manage your profile and preferences
                    </Text>
                </VStack>

                {/* Profile */}
                <VStack space="md" className="mb-6">
                    <Text className="text-lg font-semibold text-gray-900 dark:text-white">Profile</Text>
                    <ProfileSection user={user} />
                </VStack>

                {/* AI Settings */}
                <VStack space="md" className="mb-6">
                    <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                        AI Personalization
                    </Text>
                    <AISection
                        settings={aiSettings}
                        onUpdateSetting={(key, value) => updateAI({ [key]: value })}
                    />
                </VStack>

                {/* App Settings */}
                <VStack space="md" className="mb-6">
                    <Text className="text-lg font-semibold text-gray-900 dark:text-white">App</Text>
                    <Box className="bg-white dark:bg-gray-800 rounded-2xl px-4 border border-gray-100 dark:border-gray-700">
                        <SettingRow
                            title="Notifications"
                            subtitle="Daily reminders and updates"
                            icon="notifications-outline"
                            iconColor="#2196F3"
                            iconBgColor="#EBF5FF"
                            type="toggle"
                            value={true}
                            onToggle={() => {}}
                        />
                        
                        <Divider />
                        
                        <SettingRow
                            title="Sound Effects"
                            subtitle="Play sounds for achievements"
                            icon="volume-high-outline"
                            iconColor="#9C27B0"
                            iconBgColor="#F3E5F5"
                            type="toggle"
                            value={true}
                            onToggle={() => {}}
                        />
                        
                        <Divider />
                        
                        <SettingRow
                            title="Haptic Feedback"
                            subtitle="Vibrations for interactions"
                            icon="phone-portrait-outline"
                            iconColor="#4CAF50"
                            iconBgColor="#E8F5E9"
                            type="toggle"
                            value={true}
                            onToggle={() => {}}
                        />
                    </Box>
                </VStack>

                {/* About */}
                <VStack space="md" className="mb-6">
                    <Text className="text-lg font-semibold text-gray-900 dark:text-white">About</Text>
                    <Box className="bg-white dark:bg-gray-800 rounded-2xl px-4 border border-gray-100 dark:border-gray-700">
                        <SettingRow
                            title="Privacy Policy"
                            icon="shield-outline"
                            iconColor="#6B7280"
                            iconBgColor="#F3F4F6"
                            onPress={() => {}}
                        />
                        
                        <Divider />
                        
                        <SettingRow
                            title="Terms of Service"
                            icon="document-text-outline"
                            iconColor="#6B7280"
                            iconBgColor="#F3F4F6"
                            onPress={() => {}}
                        />
                        
                        <Divider />
                        
                        <SettingRow
                            title="App Version"
                            icon="information-circle-outline"
                            iconColor="#6B7280"
                            iconBgColor="#F3F4F6"
                            value="1.0.0"
                            type="select"
                            showChevron={false}
                        />
                    </Box>
                </VStack>

                {/* Danger Zone */}
                <VStack space="md">
                    <Text className="text-lg font-semibold text-gray-900 dark:text-white">Danger Zone</Text>
                    <Box className="bg-white dark:bg-gray-800 rounded-2xl px-4 border border-gray-100 dark:border-gray-700">
                        <SettingRow
                            title="Reset All Data"
                            subtitle="Delete all progress and settings"
                            icon="trash-outline"
                            iconColor="#EF4444"
                            iconBgColor="#FEE2E2"
                            destructive
                            showChevron={false}
                            onPress={resetAllData}
                        />
                    </Box>
                </VStack>
            </ScrollView>
        </SafeAreaView>
    );
}
