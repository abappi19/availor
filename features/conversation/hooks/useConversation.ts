/**
 * Conversation Hook
 * Manages conversation state and interactions with LLM
 */

import { getToolDefinitions } from '@/features/availor-tools-definition';
import { FileContext } from '@/features/file-context';
import { useAvailorLLM, type AvailorLLMMessage } from '@/features/llm';
import {
    Conversation,
    conversationHistoryService,
    Message,
} from '@/services/storage/conversationHistory';
import { useCallback, useEffect, useState } from 'react';

export const useConversation = () => {
    const availorLLM = useAvailorLLM();
    const toolDefinitions = getToolDefinitions();

    const [conversation, setConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([{
        id: "1",
        role: "system",
        content: "You are an AI English teacher. You are here to help the user improve their English skills.",
        timestamp: new Date().getTime(),
    }]);
    const [isLoading, setIsLoading] = useState(false);
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

            // Prepare context for LLM (system prompt is automatically configured in useAvailorLLM)
            const llmMessages: AvailorLLMMessage[] = [
                ...messages.map((m) => ({
                    role: m.role as 'user' | 'assistant',
                    content: m.content,
                })),
                {
                    role: 'user' as const,
                    content: messageContent,
                },
            ];

            // Generate LLM response with tool support
            await availorLLM.generate(llmMessages, toolDefinitions);

            // Wait for response to complete (watch isGenerating state)
            // Note: In a real implementation, we'd use a useEffect to watch availorLLM.response
            // For now, we'll wait for the generate call to complete

            // Check if we have a response
            if (availorLLM.response) {
                // Add AI message
                const aiMessage = await conversationHistoryService.addMessage(conversation.id, {
                    role: 'assistant',
                    content: availorLLM.response,
                });

                setMessages((prev) => [...prev, aiMessage]);
            }
        } catch (err) {
            console.error('Error sending message:', err);
            setError('Failed to send message');
        } finally {
            setIsLoading(false);
        }
    }, [conversation, messages, availorLLM, toolDefinitions]);

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
        isTyping: availorLLM.isGenerating,
        error: error || availorLLM.error,
        isModelReady: availorLLM.isReady,
        downloadProgress: availorLLM.downloadProgress,
        sendMessage,
        clearConversation,
    };
};

