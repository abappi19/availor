/**
 * MessageList Component
 */

import { ScrollView } from '@/components/ui';
import React, { useEffect, useRef } from 'react';
import type { ScrollView as RNScrollView } from 'react-native';
import type { Message } from '../types';
import { EmptyState } from './EmptyState';
import { MessageBubble } from './MessageBubble';

interface MessageListProps {
    messages: Message[];
    streamingResponse?: string | null;
}

export function MessageList({ messages, streamingResponse }: MessageListProps) {
    const scrollViewRef = useRef<RNScrollView>(null);

    // Auto-scroll when messages change
    useEffect(() => {
        const timer = setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
        return () => clearTimeout(timer);
    }, [messages.length, streamingResponse]);

    const isEmpty = messages.length === 0 && !streamingResponse;

    if (isEmpty) {
        return <EmptyState />;
    }

    return (
        <ScrollView
            ref={scrollViewRef}
            className="flex-1 bg-gray-50 dark:bg-gray-900"
            contentContainerStyle={{ padding: 16, flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
            ))}

            {streamingResponse && (
                <MessageBubble
                    message={{
                        id: 'streaming',
                        content: streamingResponse,
                        role: 'assistant',
                        timestamp: Date.now(),
                    }}
                    isStreaming
                />
            )}
        </ScrollView>
    );
}
