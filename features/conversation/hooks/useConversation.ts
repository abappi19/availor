/**
 * Conversation Hook
 * Manages conversation state and interactions with LLM
 *
 * Flow:
 * 1. User sends message → saved to storage, sent to LLM
 * 2. LLM generates → streamingResponse updates in real-time
 * 3. Generation complete → save final response to storage
 */

import type { FileContext } from '@/features/file-context';
import { DEFAULT_SYSTEM_PROMPT, useAvailorLLM } from '@/features/llm';
import { conversationHistoryService, type Message } from '@/services/storage/conversationHistory';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { LLMTool } from 'react-native-executorch';

const TOOL_DEFINITIONS: LLMTool[] = [
    {
        name: 'get_weather',
        description: 'Get/check weather in given location.',
        parameters: {
            type: 'dict',
            properties: {
                location: {
                    type: 'string',
                    description: 'Location where user wants to check weather',
                },
            },
            required: ['location'],
        },
    },
    {
        name: 'get_creator_name',
        description: 'Get the name of the creator of the app.',
        parameters: {
            type: 'dict',
            properties: {
                name: {
                    type: 'string',
                    description: 'The name of the creator of the app.',
                },
            },
            required: ['name'],
        },
    },
];

export const useConversation = () => {
    const llm = useAvailorLLM();

    // Core state
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Streaming state - LLM's current response while generating
    const [streamingResponse, setStreamingResponse] = useState<string | null>(null);

    // Refs for tracking
    const isConfigured = useRef(false);
    const lastSavedResponse = useRef('');

    // ─────────────────────────────────────────────────────────────────────────
    // LLM Configuration (once on ready)
    // ─────────────────────────────────────────────────────────────────────────
    useEffect(() => {
        if (llm.isReady && !isConfigured.current) {
            llm.configure({
                chatConfig: { systemPrompt: DEFAULT_SYSTEM_PROMPT },
                toolsConfig: {
                    tools: TOOL_DEFINITIONS,
                    executeToolCallback: async (call) => {
                        if (call.toolName === 'get_weather') {
                            console.log('Checking weather!');
                            // perform call to weather API
                            // ...
                            const mockResults = 'Weather is very very very hot!';
                            return mockResults;
                        }
                        if (call.toolName === 'get_creator_name') {
                            console.log('Getting creator name!');
                            // perform call to creator name API
                            // ...
                            const mockResults = 'Md Asadujjaman';
                            return mockResults;
                        }
                        return null;
                    },
                    displayToolCalls: true,
                },
            });
            isConfigured.current = true;
        }
    }, [llm.isReady, llm.configure]);

    // ─────────────────────────────────────────────────────────────────────────
    // Watch LLM Response
    // - While generating: update streamingResponse
    // - When complete: save to storage, add to messages, clear streaming
    // ─────────────────────────────────────────────────────────────────────────
    useEffect(() => {
        if (!conversationId) return;

        // During generation - update streaming state
        if (llm.isGenerating) {
            if (llm.response) {
                setStreamingResponse(llm.response);
            }
            return;
        }

        // Generation complete - save final response
        if (llm.response && llm.response !== lastSavedResponse.current) {
            const finalResponse = llm.response;
            lastSavedResponse.current = finalResponse;

            // Clear streaming immediately
            setStreamingResponse(null);

            // Save to storage
            conversationHistoryService
                .addMessage(conversationId, {
                    role: 'assistant',
                    content: finalResponse,
                })
                .then((savedMessage) => {
                    setMessages((prev) => [...prev, savedMessage]);
                })
                .catch((err) => {
                    console.error('Failed to save AI response:', err);
                    setError('Failed to save response');
                });
        }
    }, [llm.response, llm.isGenerating, conversationId]);

    // ─────────────────────────────────────────────────────────────────────────
    // Load Conversation on Mount
    // ─────────────────────────────────────────────────────────────────────────
    useEffect(() => {
        const load = async () => {
            try {
                // TODO: Remove this line after first run to clear corrupted history
                // await conversationHistoryService.clearAll();

                let conversation = await conversationHistoryService.getCurrentConversation();
                if (!conversation) {
                    conversation = await conversationHistoryService.createConversation();
                }
                setConversationId(conversation.id);
                setMessages(conversation.messages);
            } catch (err) {
                console.error('Failed to load conversation:', err);
                setError('Failed to load conversation');
            }
        };
        load();
    }, []);

    // ─────────────────────────────────────────────────────────────────────────
    // Send Message
    // ─────────────────────────────────────────────────────────────────────────
    const sendMessage = useCallback(
        async (content: string, files: FileContext[] = []) => {
            if (!conversationId || !content.trim() || llm.isGenerating) return;

            setError(null);
            lastSavedResponse.current = ''; // Reset for new response

            try {
                // Build message content with file context
                let messageContent = content.trim();
                if (files.length > 0) {
                    const fileContext = files
                        .filter((f) => f.status === 'ready' && f.extractedText)
                        .map((f) => `[File: ${f.name}]\n${f.extractedText}`)
                        .join('\n\n');
                    if (fileContext) {
                        messageContent = `${messageContent}\n\n---\nAttached files:\n${fileContext}`;
                    }
                }

                // Save user message to storage
                const userMessage = await conversationHistoryService.addMessage(conversationId, {
                    role: 'user',
                    content: messageContent,
                });

                // Update local messages state
                const updatedMessages = [...messages, userMessage];
                setMessages(updatedMessages);

                // Build LLM context (clean history without streaming artifacts)
                // const llmContext = updatedMessages.map((m) => ({
                //     role: m.role as 'user' | 'assistant',
                //     content: m.content,
                // }));

                // Generate response
                await llm.generate(
                    [
                        {
                            role: 'system',
                            content: 'Your are lily, a helpful english teacher.',
                        },
                        {
                            role: 'user',
                            content: messageContent,
                        },
                    ],
                    TOOL_DEFINITIONS
                );
            } catch (err) {
                console.error('Failed to send message:', err);
                setError('Failed to send message');
            }
        },
        [conversationId, messages, llm.isGenerating, llm.generate]
    );

    // ─────────────────────────────────────────────────────────────────────────
    // Clear Conversation
    // ─────────────────────────────────────────────────────────────────────────
    const clearConversation = useCallback(async () => {
        if (!conversationId) return;

        try {
            await conversationHistoryService.deleteConversation(conversationId);
            const newConversation = await conversationHistoryService.createConversation();

            setConversationId(newConversation.id);
            setMessages([]);
            setStreamingResponse(null);
            setError(null);
            lastSavedResponse.current = '';

            // Reset LLM state
            if (llm.isReady) {
                llm.configure({
                    chatConfig: {
                        systemPrompt: DEFAULT_SYSTEM_PROMPT,
                        initialMessageHistory: [],
                    },
                });
            }
        } catch (err) {
            console.error('Failed to clear conversation:', err);
            setError('Failed to clear conversation');
        }
    }, [conversationId, llm.isReady, llm.configure]);

    // ─────────────────────────────────────────────────────────────────────────
    // Return
    // ─────────────────────────────────────────────────────────────────────────
    return {
        // Data
        messages,
        streamingResponse,

        // Status
        isGenerating: llm.isGenerating,
        isModelReady: llm.isReady,
        downloadProgress: llm.downloadProgress,
        error: error || llm.error,

        // Actions
        sendMessage,
        clearConversation,
    };
};
