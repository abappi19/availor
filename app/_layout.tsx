/**
 * Root Layout
 */

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import '../global.css';

import { useEffect, useState } from 'react';
import { useColorScheme } from '@/core/hooks';
import { useUserStore } from '@/core/stores';

export const unstable_settings = {
    initialRouteName: 'onboarding',
};

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const hasCompletedOnboarding = useUserStore((state) => state.hasCompletedOnboarding);
    const [isHydrated, setIsHydrated] = useState(false);

    // Wait for Zustand hydration
    useEffect(() => {
        const unsubscribe = useUserStore.persist.onFinishHydration(() => {
            setIsHydrated(true);
        });
        
        // Check if already hydrated
        if (useUserStore.persist.hasHydrated()) {
            setIsHydrated(true);
        }

        return () => unsubscribe();
    }, []);

    if (!isHydrated) {
        // Loading state while hydrating
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
                    </>
                )}
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
