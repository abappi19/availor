/**
 * Root Layout
 */

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import '../global.css';

import { useColorScheme } from '@/core/hooks';
import { useUserStore } from '@/core/stores';

export const unstable_settings = {
    initialRouteName: 'onboarding',
};

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const hasCompletedOnboarding = useUserStore((state) => state.hasCompletedOnboarding);
    const isHydrated = useUserStore((state) => state._hasHydrated);

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
