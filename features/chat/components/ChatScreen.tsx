/**
 * ChatScreen Component
 */

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '@/core/stores';
import { Box, KeyboardAvoidingView, Text } from '@/core/ui';
import { useChat } from '../hooks/use-chat';
import { InputBar } from './InputBar';
import { MessageList } from './MessageList';

export function ChatScreen() {
    const { messages, streamingResponse, isGenerating, sendMessage } = useChat();
    const { modelDownloadProgress } = useAppStore();

    const handleSend = (text: string) => {
        if (!text.trim()) return;
        sendMessage(text);
    };

    // For now, model is always ready (mock)
    const ready = true;

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900" edges={['top', 'left', 'right']}>
            <KeyboardAvoidingView className="flex-1">
                {/* Status Bar */}
                {!ready && (
                    <Box className="p-2 bg-warning-100 dark:bg-warning-900">
                        <Text className="text-center text-warning-800 dark:text-warning-200">
                            Loading model...{' '}
                            {modelDownloadProgress ? `${Math.round(modelDownloadProgress * 100)}%` : ''}
                        </Text>
                    </Box>
                )}

                {/* Messages */}
                <MessageList messages={messages} streamingResponse={streamingResponse} />

                {/* Input */}
                <InputBar onSend={handleSend} disabled={!ready || isGenerating} placeholder="Type your message..." />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
