/**
 * LLM Service - Wrapper for React Native ExecuTorch useLLM hook
 * This is a placeholder implementation that will be replaced with actual ExecuTorch integration
 */

export interface LLMMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface LLMConfig {
    model?: string;
    maxTokens?: number;
    temperature?: number;
}

export interface LLMResponse {
    content: string;
    finishReason?: string;
}

/**
 * Placeholder LLM service
 * TODO: Replace with actual react-native-executorch useLLM hook when available
 */
class LLMService {
    private config: LLMConfig;

    constructor(config: LLMConfig = {}) {
        this.config = {
            model: config.model || 'llama-3.2-3b',
            maxTokens: config.maxTokens || 512,
            temperature: config.temperature || 0.7,
        };
    }

    /**
     * Generate a response from the LLM
     * This is a mock implementation that simulates LLM responses
     */
    async generate(messages: LLMMessage[]): Promise<LLMResponse> {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

        const lastMessage = messages[messages.length - 1];

        // Mock responses based on user input
        const mockResponses = this.getMockResponse(lastMessage.content);

        return {
            content: mockResponses,
            finishReason: 'stop',
        };
    }

    /**
     * Generate mock responses for testing
     * TODO: Remove when integrating actual LLM
     */
    private getMockResponse(userInput: string): string {
        const input = userInput.toLowerCase();

        // Greetings
        if (input.includes('hello') || input.includes('hi')) {
            return "Hello! I'm your AI English teacher. I'm here to help you improve your English skills. What would you like to practice today?";
        }

        // Grammar questions
        if (input.includes('grammar') || input.includes('tense')) {
            return "Great! Let's work on grammar. English has 12 main tenses. Which one would you like to focus on? For example, we could practice present perfect, past simple, or future continuous.";
        }

        // Vocabulary
        if (input.includes('vocabulary') || input.includes('words')) {
            return "Vocabulary building is excellent! I can help you learn new words in context. What topics interest you? Business, travel, daily life, or something else?";
        }

        // Conversation practice
        if (input.includes('conversation') || input.includes('speaking')) {
            return "Perfect! Conversation practice is one of the best ways to improve. Let's start with a simple topic. Tell me about your day or what you did last weekend.";
        }

        // Default encouraging response
        const responses = [
            "That's interesting! Can you tell me more about that? Try to use complete sentences.",
            "Good effort! Let me help you improve that. Have you considered using more descriptive words?",
            "I see what you mean. Let's practice expressing that idea in different ways to build your vocabulary.",
            "Great! Now, let's take it a step further. Can you elaborate on that thought?",
            "Excellent! Your English is improving. Keep practicing and you'll get even better!",
        ];

        return responses[Math.floor(Math.random() * responses.length)];
    }

    /**
     * Stream response (not implemented in mock)
     * TODO: Implement streaming when ExecuTorch supports it
     */
    async *streamGenerate(messages: LLMMessage[]): AsyncGenerator<string> {
        const response = await this.generate(messages);
        yield response.content;
    }
}

// Export singleton instance
export const llmService = new LLMService();

// Export hook-like interface for future ExecuTorch integration
export const useLLM = () => {
    return {
        generate: (messages: LLMMessage[]) => llmService.generate(messages),
        isLoading: false,
        error: null,
    };
};

