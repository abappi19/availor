/**
 * Conversation Hook
 * Manages conversation state and interactions with LLM
 */

import { LLMMessage, llmService } from '@/services/executorch/llm';
import {
    Conversation,
    conversationHistoryService,
    Message,
} from '@/services/storage/conversationHistory';
import { useCallback, useEffect, useState } from 'react';

export const useConversation = () => {
    const [conversation, setConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load current conversation on mount
    useEffect(() => {
        loadCurrentConversation();
    }, []);

    const loadCurrentConversation = async () => {
        try {
            let current = await conversationHistoryService.getCurrentConversation();

            // If no current conversation, create one
            if (!current) {
                current = await conversationHistoryService.createConversation();
            }

            setConversation(current);
            setMessages(current.messages);
        } catch (err) {
            console.error('Error loading conversation:', err);
            setError('Failed to load conversation');
        }
    };

    const sendMessage = useCallback(async (content: string) => {
        if (!conversation || !content.trim()) return;

        setIsLoading(true);
        setError(null);

        try {
            // Add user message
            const userMessage = await conversationHistoryService.addMessage(conversation.id, {
                role: 'user',
                content: content.trim(),
            });

            setMessages((prev) => [...prev, userMessage]);

            // Show typing indicator
            setIsTyping(true);

            // Prepare context for LLM
            const llmMessages: LLMMessage[] = [
                {
                    role: 'system',
                    content: 'You are an encouraging and helpful English teacher. Help students improve their English through natural conversation, gentle corrections, and positive reinforcement. Keep responses concise and educational.',
                },
                ...messages.map((m) => ({
                    role: m.role,
                    content: m.content,
                })),
                {
                    role: 'user',
                    content: content.trim(),
                },
            ];

            // Get LLM response
            const response = await llmService.generate(llmMessages);

            setIsTyping(false);

            // Add AI message
            const aiMessage = await conversationHistoryService.addMessage(conversation.id, {
                role: 'assistant',
                content: response.content,
            });

            setMessages((prev) => [...prev, aiMessage]);
        } catch (err) {
            console.error('Error sending message:', err);
            setError('Failed to send message');
            setIsTyping(false);
        } finally {
            setIsLoading(false);
        }
    }, [conversation, messages]);

    const clearConversation = useCallback(async () => {
        if (!conversation) return;

        try {
            await conversationHistoryService.deleteConversation(conversation.id);
            const newConversation = await conversationHistoryService.createConversation();
            setConversation(newConversation);
            setMessages([]);
        } catch (err) {
            console.error('Error clearing conversation:', err);
            setError('Failed to clear conversation');
        }
    }, [conversation]);

    return {
        messages,
        isLoading,
        isTyping,
        error,
        sendMessage,
        clearConversation,
    };
};

