/**
 * Speech-to-Text Service - Placeholder for React Native ExecuTorch useSpeechToText
 * This is a mock implementation that will be replaced with actual ExecuTorch integration
 */

export interface STTConfig {
    language?: string;
    continuous?: boolean;
}

/**
 * Placeholder STT service
 * TODO: Replace with actual react-native-executorch useSpeechToText hook when available
 */
class STTService {
    private isListening = false;

    constructor(config: STTConfig = {}) {
        this.config = {
            language: config.language || 'en',
            continuous: config.continuous || false,
        };
    }

    /**
     * Start listening for speech
     * This is a mock implementation
     */
    async start(onResult: (text: string) => void, _onError?: (error: string) => void): Promise<void> {
        this.isListening = true;

        // Mock: Simulate speech recognition after 2 seconds
        setTimeout(() => {
            if (this.isListening) {
                const mockPhrases = [
                    'Hello, how are you?',
                    'I want to practice English',
                    'Can you help me with grammar?',
                    'Tell me about your day',
                    'What did you do yesterday?',
                ];
                const randomPhrase = mockPhrases[Math.floor(Math.random() * mockPhrases.length)];
                onResult(randomPhrase);
            }
        }, 2000);
    }

    /**
     * Stop listening
     */
    async stop(): Promise<void> {
        this.isListening = false;
    }

    /**
     * Check if currently listening
     */
    getIsListening(): boolean {
        return this.isListening;
    }
}

export const sttService = new STTService();

// Export hook-like interface for future ExecuTorch integration
export const useSpeechToText = () => {
    return {
        transcribe: async (_audioUri: string) => {
            // Mock transcription
            return 'This is a mock transcription of the audio file.';
        },
        isProcessing: false,
        error: null,
    };
};
