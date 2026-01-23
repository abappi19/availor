/**
 * Voice Mode Hook
 * Manages voice mode state and settings
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useState } from 'react';
import type { VoiceSettings } from '../types';

const VOICE_SETTINGS_KEY = '@availor:voice_settings';

const defaultSettings: VoiceSettings = {
    sttEnabled: false,
    ttsEnabled: false,
    autoPlayResponses: false,
    voiceSpeed: 1.0,
};

export const useVoiceMode = () => {
    const [settings, setSettings] = useState<VoiceSettings>(defaultSettings);
    const [isLoading, setIsLoading] = useState(true);

    // Load settings from storage
    const loadSettings = useCallback(async () => {
        try {
            const stored = await AsyncStorage.getItem(VOICE_SETTINGS_KEY);
            if (stored) {
                setSettings(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Error loading voice settings:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Save settings to storage
    const saveSettings = useCallback(
        async (newSettings: Partial<VoiceSettings>) => {
            try {
                const updated = { ...settings, ...newSettings };
                setSettings(updated);
                await AsyncStorage.setItem(VOICE_SETTINGS_KEY, JSON.stringify(updated));
            } catch (error) {
                console.error('Error saving voice settings:', error);
            }
        },
        [settings]
    );

    // Toggle STT
    const toggleSTT = useCallback(() => {
        saveSettings({ sttEnabled: !settings.sttEnabled });
    }, [settings.sttEnabled, saveSettings]);

    // Toggle TTS
    const toggleTTS = useCallback(() => {
        saveSettings({ ttsEnabled: !settings.ttsEnabled });
    }, [settings.ttsEnabled, saveSettings]);

    // Toggle auto-play responses
    const toggleAutoPlay = useCallback(() => {
        saveSettings({ autoPlayResponses: !settings.autoPlayResponses });
    }, [settings.autoPlayResponses, saveSettings]);

    // Set voice speed
    const setVoiceSpeed = useCallback(
        (speed: number) => {
            saveSettings({ voiceSpeed: speed });
        },
        [saveSettings]
    );

    return {
        settings,
        isLoading,
        loadSettings,
        toggleSTT,
        toggleTTS,
        toggleAutoPlay,
        setVoiceSpeed,
    };
};
