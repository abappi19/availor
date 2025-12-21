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
import { FileContext } from '@/features/file-context';
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

    const sendMessage = useCallback(async (content: string, files: FileContext[] = []) => {
        if (!conversation || !content.trim()) return;

        setIsLoading(true);
        setError(null);

        try {
            // Prepare user message content with file context
            let messageContent = content.trim();
            
            // Add file context if files are attached
            if (files.length > 0) {
                const fileContexts = files
                    .filter(f => f.status === 'ready' && f.extractedText)
                    .map(f => `[File: ${f.name}]\n${f.extractedText}`)
                    .join('\n\n');
                
                if (fileContexts) {
                    messageContent = `${messageContent}\n\n---\nContext from uploaded files:\n${fileContexts}`;
                }
            }

            // Add user message
            const userMessage = await conversationHistoryService.addMessage(conversation.id, {
                role: 'user',
                content: messageContent,
            });

            setMessages((prev) => [...prev, userMessage]);

            // Show typing indicator
            setIsTyping(true);

            // Prepare context for LLM (system prompt is automatically injected by LLM service based on user personalization)
            const llmMessages: LLMMessage[] = [
                ...messages.map((m) => ({
                    role: m.role,
                    content: m.content,
                })),
                {
                    role: 'user',
                    content: messageContent,
                },
            ];

            // Get LLM response (personalized based on onboarding preferences and file context)
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

