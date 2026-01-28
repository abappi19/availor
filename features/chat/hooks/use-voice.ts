/**
 * useVoice Hook - Voice input/output
 */

import { useState, useCallback } from 'react';
import { startListening, stopListening, getIsListening } from '@/core/services/speech/stt.service';
import { speak, stop as stopSpeaking, isSpeaking } from '@/core/services/speech/tts.service';

export function useVoice() {
    const [isRecording, setIsRecording] = useState(false);
    const [isSpeakingState, setIsSpeakingState] = useState(false);
    const [transcript, setTranscript] = useState<string | null>(null);
    const [error, setError] = useState<Error | null>(null);

    // Start voice recording
    const startRecording = useCallback(async () => {
        setError(null);
        setTranscript(null);
        setIsRecording(true);

        try {
            await startListening(
                (text) => {
                    setTranscript(text);
                    setIsRecording(false);
                },
                (err) => {
                    setError(new Error(err));
                    setIsRecording(false);
                }
            );
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to start recording'));
            setIsRecording(false);
        }
    }, []);

    // Stop voice recording
    const stopRecording = useCallback(async () => {
        await stopListening();
        setIsRecording(false);
    }, []);

    // Speak text
    const speakText = useCallback(async (text: string) => {
        setIsSpeakingState(true);
        try {
            await speak(text);
        } finally {
            setIsSpeakingState(false);
        }
    }, []);

    // Stop speaking
    const stopSpeakingText = useCallback(async () => {
        await stopSpeaking();
        setIsSpeakingState(false);
    }, []);

    // Clear transcript
    const clearTranscript = useCallback(() => {
        setTranscript(null);
    }, []);

    return {
        isRecording,
        isSpeaking: isSpeakingState,
        transcript,
        error,
        startRecording,
        stopRecording,
        speakText,
        stopSpeakingText,
        clearTranscript,
    };
}
