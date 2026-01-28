/**
 * Chat Service - Business logic for chat feature
 */

import { generate, type LLMMessage } from '@/core/services/llm';
import type { Message } from '../types';
import type { UserProfile, AIPersonalization } from '@/core/types';
import { CHAT_CONSTANTS } from '../constants';

/**
 * Build system prompt from user profile and AI settings
 */
export function buildSystemPrompt(
    profile: UserProfile | null,
    aiSettings: AIPersonalization | null
): string {
    const parts: string[] = ['You are an AI English teacher.'];

    if (profile) {
        parts.push(`The student's name is ${profile.name}.`);
        parts.push(`Their English level is ${profile.englishLevel}.`);
        
        if (profile.interests.length > 0) {
            parts.push(`They are interested in: ${profile.interests.join(', ')}.`);
        }
    }

    if (aiSettings) {
        if (aiSettings.teachingStyle === 'encouraging') {
            parts.push('Be very encouraging and positive. Celebrate their progress.');
        } else if (aiSettings.teachingStyle === 'direct') {
            parts.push('Be direct and efficient. Focus on improvement areas.');
        }

        if (aiSettings.formality === 'casual') {
            parts.push('Use casual, friendly language.');
        } else if (aiSettings.formality === 'formal') {
            parts.push('Use formal, professional language.');
        }

        if (aiSettings.focusAreas.length > 0) {
            parts.push(`Focus on helping with: ${aiSettings.focusAreas.join(', ')}.`);
        }
    }

    return parts.join(' ');
}

/**
 * Build context from recent messages
 */
export function buildMessageContext(messages: Message[]): LLMMessage[] {
    const recentMessages = messages.slice(-CHAT_CONSTANTS.MAX_CONTEXT_MESSAGES);
    
    return recentMessages.map((msg) => ({
        role: msg.role,
        content: msg.content,
    }));
}

/**
 * Send message and get AI response
 */
export async function sendMessage(
    userMessage: string,
    previousMessages: Message[],
    profile: UserProfile | null,
    aiSettings: AIPersonalization | null
): Promise<string> {
    const systemPrompt = buildSystemPrompt(profile, aiSettings);
    const context = buildMessageContext(previousMessages);
    
    // Add user message to context
    context.push({ role: 'user', content: userMessage });
    
    // Generate response
    const response = await generate(context, systemPrompt);
    
    return response.content;
}

/**
 * Create a new message object
 */
export function createMessage(content: string, role: 'user' | 'assistant'): Message {
    return {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        content,
        role,
        timestamp: Date.now(),
    };
}
