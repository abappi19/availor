/**
 * LLM Service - AI text generation
 * TODO: Replace mock with react-native-executorch when available
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

// Default configuration
const defaultConfig: LLMConfig = {
    model: 'llama-3.2-3b',
    maxTokens: 512,
    temperature: 0.7,
};

/**
 * Generate a response from the LLM
 */
export async function generate(
    messages: LLMMessage[],
    systemPrompt?: string,
    config: LLMConfig = defaultConfig
): Promise<LLMResponse> {
    // Inject system prompt if provided
    const messagesWithSystem = systemPrompt
        ? [{ role: 'system' as const, content: systemPrompt }, ...messages]
        : messages;

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 800));

    const lastMessage = messagesWithSystem[messagesWithSystem.length - 1];
    const response = generateMockResponse(lastMessage.content, systemPrompt);

    return {
        content: response,
        finishReason: 'stop',
    };
}

/**
 * Stream response generation (mock implementation)
 */
export async function* streamGenerate(
    messages: LLMMessage[],
    systemPrompt?: string
): AsyncGenerator<string> {
    const response = await generate(messages, systemPrompt);
    
    // Simulate streaming by yielding words
    const words = response.content.split(' ');
    for (const word of words) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        yield word + ' ';
    }
}

/**
 * Generate mock responses (temporary until ExecuTorch integration)
 */
function generateMockResponse(userInput: string, systemPrompt?: string): string {
    const input = userInput.toLowerCase();
    const isEncouraging = systemPrompt?.includes('encouraging');
    const isCasual = systemPrompt?.includes('casual');

    if (input.includes('hello') || input.includes('hi')) {
        if (isCasual) {
            return "Hey there! Ready to practice some English? What would you like to work on today?";
        }
        return "Hello! I'm your AI English teacher. I'm here to help you improve your English skills. What would you like to practice today?";
    }

    if (input.includes('grammar') || input.includes('tense')) {
        return "Great choice! Grammar is fundamental. English has 12 main tenses. Which one would you like to focus on? We could practice present perfect, past simple, or future continuous.";
    }

    if (input.includes('vocabulary') || input.includes('words')) {
        return "Vocabulary building is excellent! I can help you learn new words in context. What topics interest you? Business, travel, daily life, or something else?";
    }

    if (input.includes('conversation') || input.includes('speaking')) {
        return "Perfect! Conversation practice is one of the best ways to improve. Let's start with a simple topic. Tell me about your day or what you did last weekend.";
    }

    // Default responses
    const responses = isEncouraging
        ? [
            "That's fantastic! 🎉 Can you tell me more about that? Try using complete sentences.",
            "Wonderful effort! Let me help you take it to the next level.",
            "I love that! Let's practice expressing that idea in different ways.",
            "Amazing! Your English is improving with every message!",
        ]
        : [
            "That's interesting! Can you tell me more? Try using complete sentences.",
            "Good effort! Let me help you improve that expression.",
            "I see what you mean. Let's practice saying that differently.",
            "Great! Keep practicing and you'll continue to improve!",
        ];

    return responses[Math.floor(Math.random() * responses.length)];
}
