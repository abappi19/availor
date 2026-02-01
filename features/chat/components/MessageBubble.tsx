/**
 * MessageBubble Component
 */

import { Box, HStack, Text } from '@/components/ui';
import { formatMessageTime } from '@/core/utils/date';
import { LinearGradient } from 'expo-linear-gradient';
import React, { memo } from 'react';
import type { Message } from '../types';

interface MessageBubbleProps {
    message: Message;
    isStreaming?: boolean;
}

export const MessageBubble = memo<MessageBubbleProps>(({ message, isStreaming }) => {
    const isUser = message.role === 'user';

    if (isUser) {
        return (
            <HStack className="justify-end mb-4">
                <Box className="max-w-[80%] bg-primary-500 rounded-2xl rounded-tr-sm px-4 py-3">
                    <Text className="text-white text-base leading-6">{message.content}</Text>
                    <Text className="text-white/70 text-xs mt-1">{formatMessageTime(message.timestamp)}</Text>
                </Box>
            </HStack>
        );
    }

    return (
        <HStack className="mb-4" space="sm">
            {/* AI Avatar */}
            <Box className="w-10 h-10 rounded-full overflow-hidden">
                <LinearGradient
                    colors={['#2196F3', '#7B1FA2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text className="text-white font-bold text-lg">AI</Text>
                </LinearGradient>
            </Box>

            {/* Message Bubble */}
            <Box className="flex-1 max-w-[75%]">
                <Box className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 border border-gray-100 dark:border-gray-700">
                    <Text className="text-gray-900 dark:text-white text-base leading-6">
                        {message.content}
                        {isStreaming && <Text className="text-primary-500">▊</Text>}
                    </Text>
                    {!isStreaming && (
                        <Text className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                            {formatMessageTime(message.timestamp)}
                        </Text>
                    )}
                </Box>
            </Box>
        </HStack>
    );
});

MessageBubble.displayName = 'MessageBubble';
