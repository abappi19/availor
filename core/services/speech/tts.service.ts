/**
 * Text-to-Speech Service - Using expo-speech (native)
 */

import * as Speech from 'expo-speech';

export interface TTSConfig {
    language?: string;
    pitch?: number;
    rate?: number;
}

const defaultConfig: TTSConfig = {
    language: 'en',
    pitch: 1.0,
    rate: 0.9,
};

/**
 * Speak text using native TTS
 */
export async function speak(text: string, options?: Partial<TTSConfig>): Promise<void> {
    const config = { ...defaultConfig, ...options };
    await Speech.speak(text, {
        language: config.language,
        pitch: config.pitch,
        rate: config.rate,
    });
}

/**
 * Stop speaking
 */
export async function stop(): Promise<void> {
    await Speech.stop();
}

/**
 * Check if currently speaking
 */
export async function isSpeaking(): Promise<boolean> {
    return await Speech.isSpeakingAsync();
}

/**
 * Get available voices
 */
export async function getVoices(): Promise<Speech.Voice[]> {
    return await Speech.getAvailableVoicesAsync();
}
