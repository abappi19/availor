import { InputBar } from '@/components/molecules/InputBar';
import React from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useConversation } from '../hooks/useConversation';
import { MessageList } from './MessageList';

export const ConversationScreen: React.FC = () => {
    const { messages, streamingResponse, isGenerating, isModelReady, downloadProgress, sendMessage } =
        useConversation();

    const handleSend = (text: string) => {
        if (!text.trim()) return;
        sendMessage(text);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }} edges={['top', 'left', 'right']}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                {/* Status Bar */}
                {!isModelReady && (
                    <View style={{ padding: 8, backgroundColor: '#fef3c7' }}>
                        <Text style={{ textAlign: 'center', color: '#92400e' }}>
                            Loading model... {downloadProgress ? `${Math.round(downloadProgress * 100)}%` : ''}
                        </Text>
                    </View>
                )}

                {/* Messages */}
                <MessageList messages={messages} streamingResponse={streamingResponse} ttsEnabled={false} />

                {/* Input */}
                <View style={{ backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e5e7eb' }}>
                    <InputBar
                        onSend={handleSend}
                        placeholder="Type your message..."
                        disabled={!isModelReady || isGenerating}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
