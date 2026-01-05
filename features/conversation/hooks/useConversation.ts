/**
 * Conversation Hook
 * Manages conversation state and interactions with LLM
 */

import { getToolDefinitions } from '@/features/availor-tools-definition';
import { FileContext } from '@/features/file-context';
import { DEFAULT_SYSTEM_PROMPT, useAvailorLLM } from '@/features/llm';
import {
    conversationHistoryService,
    Message
} from '@/services/storage/conversationHistory';
import { useCallback, useEffect, useRef, useState } from 'react';
//TODO: use this to clear all conversations
// conversationHistoryService.clearAll()
export const useConversation = () => {
    const availorLLM = useAvailorLLM();
    const toolDefinitions = getToolDefinitions();

    const [isConversationLoaded, setIsConversationLoaded] = useState(false);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);


    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const typingMessageId = useRef<string | null>(null);

    const modelConfigured = useRef(false);

    useEffect(() => {
        if (isConversationLoaded && availorLLM.isReady && !modelConfigured.current) {
            console.log('configuring model', messages);
            availorLLM.configure({
                chatConfig: {
                    initialMessageHistory: messages,
                    systemPrompt: DEFAULT_SYSTEM_PROMPT,

                },
            });
            console.log('model configured', availorLLM.messageHistory);
            modelConfigured.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConversationLoaded, availorLLM.isReady]);

    // Load current conversation on mount
    useEffect(() => {
        loadCurrentConversation();
    }, []);

    // Track if we've already processed the current response to avoid duplicates
    const lastProcessedResponse = useRef<string>('');

    // Watch for new responses from the LLM and add them to messages
    useEffect(() => {
        if (!conversationId || !availorLLM.response) return;

        // Skip if we've already processed this response
        if (availorLLM.response === lastProcessedResponse.current) return;

        // Skip if currently generating (wait for complete response)

        lastProcessedResponse.current = availorLLM.response;

        if (!typingMessageId.current) {
            typingMessageId.current = Date.now().toString() + Math.random();
        }

        // Save AI response to storage and add to state
        conversationHistoryService.addMessage(conversationId, {
            role: 'assistant',
            content: availorLLM.response,
            id: typingMessageId.current,
        }).then((aiMessage) => {
            setMessages((prev) => {
                // Check if this message is already in the list to avoid duplicates
                const exists = prev.some(m => m.id === aiMessage.id);
                if (exists) return prev;
                return [...prev, aiMessage];
            });
        }).catch(console.error);

        if (!availorLLM.isGenerating) {
            typingMessageId.current = null;
        };

    }, [availorLLM.response, availorLLM.isGenerating, conversationId]);

    const loadCurrentConversation = async () => {
        try {
            let current = await conversationHistoryService.getCurrentConversation();

            // If no current conversation, create one
            if (!current) {
                current = await conversationHistoryService.createConversation();
            }

            setConversationId(current.id);
            setMessages(current.messages);
            setIsConversationLoaded(true);
        } catch (err) {
            console.error('Error loading conversation:', err);
            setError('Failed to load conversation');
        }
    };

    const sendMessage = useCallback(async (content: string, files: FileContext[] = []) => {
        if (!conversationId || !content.trim()) return;

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
            // const userMessage = await conversationHistoryService.addMessage(conversationId, {
            //     role: 'user',
            //     content: messageContent,
            // });

            // setMessages((prev) => [...prev, userMessage]);

            // Prepare context for LLM (system prompt is automatically configured in useAvailorLLM)
            // const llmMessages: AvailorLLMMessage[] = [
            //     ...messages.map((m) => ({
            //         role: m.role as 'user' | 'assistant',
            //         content: m.content,
            //     })),
            //     {
            //         role: 'user' as const,
            //         content: messageContent,
            //     },
            // ];

            // Save user message to storage and add to state
            const userMessage = await conversationHistoryService.addMessage(conversationId, {
                role: 'user',
                content: messageContent,
            });

            setMessages((prev) => [...prev, userMessage]);

            // Generate LLM response with tool support
            // The generate method uses the configured message history
            // Response will be handled by the useEffect watching availorLLM.response
            await availorLLM.generate([
                {
                    role: 'user',
                    content: messageContent,
                }
            ], toolDefinitions);

            console.log('Generation complete');
            console.log('availorLLM.messageHistory:', availorLLM.messageHistory);

        } catch (err) {
            console.error('Error sending message:', err);
            setError('Failed to send message');
        } finally {
            setIsLoading(false);
        }
    }, [conversationId, availorLLM, toolDefinitions]);

    const clearConversation = useCallback(async () => {
        if (!conversationId) return;

        try {
            await conversationHistoryService.deleteConversation(conversationId);
            const newConversation = await conversationHistoryService.createConversation();
            setConversationId(newConversation.id);
            setMessages([]);
        } catch (err) {
            console.error('Error clearing conversation:', err);
            setError('Failed to clear conversation');
        }
    }, [conversationId]);

    useEffect(() => {

        console.log('availorLLM.messageHistory:', availorLLM.messageHistory);
    }, [availorLLM.messageHistory]);

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

