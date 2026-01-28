/**
 * useChat Hook - Main chat state and actions
 */

import { useState, useCallback, useEffect } from 'react';
import { useUserStore } from '@/core/stores';
import { sendMessage as sendMessageService, createMessage } from '../services/chat.service';
import { saveMessages, loadMessages, clearMessages } from '../services/message.storage';
import type { Message } from '../types';

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [streamingResponse, setStreamingResponse] = useState<string | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const user = useUserStore((state) => state.user);
    const aiSettings = useUserStore((state) => state.aiSettings);

    // Load messages on mount
    useEffect(() => {
        async function load() {
            const savedMessages = await loadMessages();
            setMessages(savedMessages);
            setIsLoaded(true);
        }
        load();
    }, []);

    // Send a message
    const sendMessage = useCallback(
        async (content: string) => {
            if (!content.trim() || isGenerating) return;

            setError(null);

            // Create and add user message
            const userMessage = createMessage(content, 'user');
            setMessages((prev) => [...prev, userMessage]);

            setIsGenerating(true);
            setStreamingResponse('');

            try {
                // Get AI response
                const response = await sendMessageService(
                    content,
                    messages,
                    user,
                    aiSettings
                );

                // Create AI message
                const aiMessage = createMessage(response, 'assistant');

                setMessages((prev) => {
                    const updated = [...prev, aiMessage];
                    saveMessages(updated);
                    return updated;
                });
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to send message'));
            } finally {
                setIsGenerating(false);
                setStreamingResponse(null);
            }
        },
        [messages, user, aiSettings, isGenerating]
    );

    // Clear chat history
    const clearChat = useCallback(async () => {
        setMessages([]);
        await clearMessages();
    }, []);

    return {
        messages,
        isGenerating,
        streamingResponse,
        error,
        isLoaded,
        sendMessage,
        clearChat,
    };
}
