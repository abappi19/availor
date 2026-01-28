/**
 * Chat Feature Types
 */

export interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: number;
}

export interface ChatState {
    messages: Message[];
    isGenerating: boolean;
    streamingResponse: string | null;
    error: Error | null;
}

export interface FileContext {
    id: string;
    name: string;
    type: 'image' | 'pdf' | 'text';
    uri: string;
    extractedText?: string;
    previewUri?: string;
}
