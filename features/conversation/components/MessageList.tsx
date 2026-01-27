import { EmptyState } from '@/components/molecules/EmptyState';
import { AIMessage, UserMessage } from '@/components/molecules/MessageBubble';
import { TTSComponent } from '@/features/voice';
import type { Message } from '@/services/storage/conversationHistory';
import { LinearGradient } from 'expo-linear-gradient';
import React, { memo, useEffect, useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';

export interface MessageListProps {
    messages: Message[];
    streamingResponse?: string | null;
    ttsEnabled?: boolean;
}

// Optimized streaming bubble - minimal re-renders, no shadows (they cause flicker)
const StreamingBubble = memo<{ text: string }>(({ text }) => (
    <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        {/* AI Avatar */}
        <View
            style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
                overflow: 'hidden',
            }}
        >
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
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>AI</Text>
            </LinearGradient>
        </View>

        {/* Message Bubble - no shadow to prevent flicker */}
        <View style={{ flex: 1, maxWidth: '75%' }}>
            <View
                style={{
                    backgroundColor: '#fff',
                    borderRadius: 16,
                    borderTopLeftRadius: 4,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                }}
            >
                <Text style={{ color: '#111827', fontSize: 16, lineHeight: 24 }}>
                    {text}
                    <Text style={{ color: '#2196F3' }}>▊</Text>
                </Text>
            </View>
        </View>
    </View>
));

// Memoized saved messages list - won't re-render when streaming updates
const SavedMessages = memo<{
    messages: Message[];
    ttsEnabled: boolean;
    hasStreaming: boolean;
}>(({ messages, ttsEnabled, hasStreaming }) => (
    <>
        {messages.map((message, index) =>
            message.role === 'user' ? (
                <UserMessage key={message.id} message={message.content} timestamp={message.timestamp} />
            ) : (
                <View key={message.id}>
                    <AIMessage message={message.content} timestamp={message.timestamp} />
                    {ttsEnabled && !hasStreaming && index === messages.length - 1 && (
                        <TTSComponent text={message.content} autoPlay />
                    )}
                </View>
            )
        )}
    </>
));

export const MessageList: React.FC<MessageListProps> = ({ messages, streamingResponse, ttsEnabled = false }) => {
    const scrollViewRef = useRef<ScrollView>(null);

    // Auto-scroll when messages change or streaming updates
    useEffect(() => {
        const timer = setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
        return () => clearTimeout(timer);
    }, [messages.length, streamingResponse]);

    const isEmpty = messages.length === 0 && !streamingResponse;

    return (
        <ScrollView
            ref={scrollViewRef}
            style={{ flex: 1, backgroundColor: '#f9fafb' }}
            contentContainerStyle={{
                flexGrow: 1,
                paddingHorizontal: 16,
                paddingTop: 16,
                paddingBottom: 16,
            }}
            showsVerticalScrollIndicator={false}
        >
            {/* Empty State */}
            {isEmpty && (
                <EmptyState
                    icon="chatbubbles-outline"
                    title="Start a Conversation"
                    message="Hello! I'm your AI English teacher. I'm here to help you improve your English skills. What would you like to practice today?"
                />
            )}

            {/* Saved Messages - memoized, won't re-render during streaming */}
            <SavedMessages messages={messages} ttsEnabled={ttsEnabled} hasStreaming={!!streamingResponse} />

            {/* Streaming Response - optimized, no shadows */}
            {streamingResponse && <StreamingBubble text={streamingResponse} />}
        </ScrollView>
    );
};
