/**
 * @deprecated Use features/llm/useAvailorLLM instead
 * This file is kept for backward compatibility only
 *
 * LLM Service - Wrapper for React Native ExecuTorch useLLM hook
 * Integrates with AI Personalization to provide customized teaching behavior
 */

import { aiPersonalizationService } from '../storage/aiPersonalization';

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
 * LLM service with AI Personalization integration
 * TODO: Replace with actual react-native-executorch useLLM hook when available
 */
class LLMService {
    private systemPrompt: string | null = null;
    private systemPromptLoaded: boolean = false;

    constructor(config: LLMConfig = {}) {
        this.config = {
            model: config.model || 'llama-3.2-3b',
            maxTokens: config.maxTokens || 512,
            temperature: config.temperature || 0.7,
        };
    }

    /**
     * Load the personalized system prompt
     */
    private async loadSystemPrompt(): Promise<string> {
        if (this.systemPromptLoaded && this.systemPrompt) {
            return this.systemPrompt;
        }

        try {
            this.systemPrompt = await aiPersonalizationService.generateSystemPrompt();
            this.systemPromptLoaded = true;
            return this.systemPrompt;
        } catch (error) {
            console.error('Error loading system prompt:', error);
            // Fallback to default prompt
            return 'You are a helpful English teacher.';
        }
    }

    /**
     * Reload the system prompt (call after user changes settings)
     */
    async reloadSystemPrompt(): Promise<void> {
        this.systemPromptLoaded = false;
        await this.loadSystemPrompt();
    }

    /**
     * Generate a response from the LLM with personalized system prompt
     */
    async generate(messages: LLMMessage[]): Promise<LLMResponse> {
        // Load personalized system prompt
        const systemPrompt = await this.loadSystemPrompt();

        // Inject system prompt if not already present
        const messagesWithSystem = messages.find((m) => m.role === 'system')
            ? messages
            : [{ role: 'system' as const, content: systemPrompt }, ...messages];

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

        const lastMessage = messagesWithSystem[messagesWithSystem.length - 1];

        // Mock responses based on user input and personalization
        const mockResponses = this.getMockResponse(lastMessage.content, systemPrompt);

        return {
            content: mockResponses,
            finishReason: 'stop',
        };
    }

    /**
     * Generate mock responses for testing (personalized based on system prompt)
     * TODO: Remove when integrating actual LLM
     */
    private getMockResponse(userInput: string, systemPrompt: string): string {
        const input = userInput.toLowerCase();

        // Extract teaching style from system prompt
        const isEncouraging = systemPrompt.includes('encouraging') || systemPrompt.includes('positive');
        const isDirect = systemPrompt.includes('direct') || systemPrompt.includes('straightforward');
        const isCasual = systemPrompt.includes('casual') || systemPrompt.includes('friendly');
        const focusesOnGrammar = systemPrompt.includes('grammar');
        const focusesOnVocabulary = systemPrompt.includes('vocabulary');

        // Greetings
        if (input.includes('hello') || input.includes('hi')) {
            if (isEncouraging) {
                return "Hello! I'm so excited to be your AI English teacher! 🌟 I'm here to help you achieve your English learning goals. What would you like to practice today?";
            } else if (isDirect) {
                return "Hello. I'm your AI English teacher. Let's get started. What area do you want to focus on?";
            } else if (isCasual) {
                return "Hey there! I'm your AI English buddy. Ready to practice some English? What's on your mind?";
            }
            return "Hello! I'm your AI English teacher. I'm here to help you improve your English skills. What would you like to practice today?";
        }

        // Grammar questions
        if (input.includes('grammar') || input.includes('tense')) {
            if (focusesOnGrammar) {
                return "Perfect choice! Grammar is one of your focus areas. Let's dive into it. English has 12 main tenses. Which one gives you the most trouble? I'll help you master it.";
            }
            return "Great! Let's work on grammar. English has 12 main tenses. Which one would you like to focus on? For example, we could practice present perfect, past simple, or future continuous.";
        }

        // Vocabulary
        if (input.includes('vocabulary') || input.includes('words')) {
            if (focusesOnVocabulary) {
                return "Excellent! Building vocabulary is one of your main goals. I can help you learn new words in context. Let's focus on topics that interest you most.";
            }
            return 'Vocabulary building is excellent! I can help you learn new words in context. What topics interest you? Business, travel, daily life, or something else?';
        }

        // Conversation practice
        if (input.includes('conversation') || input.includes('speaking')) {
            return "Perfect! Conversation practice is one of the best ways to improve. Let's start with a simple topic. Tell me about your day or what you did last weekend.";
        }

        // Default responses based on teaching style
        let responses: string[];

        if (isEncouraging) {
            responses = [
                "That's fantastic! 🎉 Can you tell me more about that? Try to use complete sentences and I'll help you refine your expression.",
                'Wonderful effort! Let me help you take it to the next level. Have you considered using more descriptive words?',
                "I love that! Let's practice expressing that idea in different ways to build your vocabulary.",
                "Amazing! Now, let's take it a step further. Can you elaborate on that thought?",
                'Excellent work! Your English is improving with every message. Keep up the great work!',
            ];
        } else if (isDirect) {
            responses = [
                'Understood. Can you provide more details? Use complete sentences.',
                "Let's improve that. Consider using more descriptive vocabulary.",
                "Try expressing that differently. What's another way to say it?",
                'Elaborate on that point. Add more context.',
                "Good. Continue practicing and you'll see improvement.",
            ];
        } else {
            responses = [
                "That's interesting! Can you tell me more about that? Try to use complete sentences.",
                'Good effort! Let me help you improve that. Have you considered using more descriptive words?',
                "I see what you mean. Let's practice expressing that idea in different ways to build your vocabulary.",
                "Great! Now, let's take it a step further. Can you elaborate on that thought?",
                "Excellent! Your English is improving. Keep practicing and you'll get even better!",
            ];
        }

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
        reloadSystemPrompt: () => llmService.reloadSystemPrompt(),
        isLoading: false,
        error: null,
    };
};
