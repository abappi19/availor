/**
 * Voice Mode Types
 * Types for voice interaction features
 */

export type VoiceMode = 'stt' | 'tts' | 'both' | 'off';

export interface VoiceSettings {
    sttEnabled: boolean;
    ttsEnabled: boolean;
    autoPlayResponses: boolean;
    voiceSpeed: number; // 0.5 to 2.0
}

export interface AudioRecordingState {
    isRecording: boolean;
    duration: number;
    uri: string | null;
}

export interface TTSState {
    isPlaying: boolean;
    isPaused: boolean;
    currentText: string | null;
}

