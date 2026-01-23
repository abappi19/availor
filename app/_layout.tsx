import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import '../global.css';

import { useEffect, useState } from 'react';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { userProfileService } from '@/services/storage/userProfile';

export const unstable_settings = {
    initialRouteName: 'onboarding',
};

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);

    useEffect(() => {
        checkOnboardingStatus();
    }, [checkOnboardingStatus]);

    const checkOnboardingStatus = async () => {
        const profile = await userProfileService.getProfile();
        setHasCompletedOnboarding(profile?.hasCompletedOnboarding ?? false);
    };

    if (hasCompletedOnboarding === null) {
        // Loading state
        return null;
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{ headerShown: false }}>
                {!hasCompletedOnboarding ? (
                    <Stack.Screen name="onboarding/index" options={{ headerShown: false }} />
                ) : (
                    <>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
                    </>
                )}
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
