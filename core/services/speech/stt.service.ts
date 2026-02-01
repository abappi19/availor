/**
 * Speech-to-Text Service
 * TODO: Replace mock with react-native-executorch when available
 */

export interface STTConfig {
    language?: string;
    continuous?: boolean;
}

let isListening = false;

/**
 * Start listening for speech
 */
export async function startListening(
    onResult: (text: string) => void,
    onError?: (error: string) => void
): Promise<void> {
    isListening = true;

    // Mock: Simulate speech recognition after delay
    setTimeout(() => {
        if (isListening) {
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
export async function stopListening(): Promise<void> {
    isListening = false;
}

/**
 * Check if currently listening
 */
export function getIsListening(): boolean {
    return isListening;
}

/**
 * Transcribe audio file
 */
export async function transcribeAudio(audioUri: string): Promise<string> {
    // Mock transcription
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return 'This is a mock transcription of the audio file.';
}
