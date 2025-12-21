import { InputBar } from '@/components/molecules/InputBar';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useConversation } from '../hooks/useConversation';
import { MessageList } from './MessageList';

export const ConversationScreen: React.FC = () => {
  const { messages, isTyping, sendMessage } = useConversation();

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    sendMessage(text);

  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Message List */}
        <MessageList
          messages={messages}
          isTyping={isTyping}
          ttsEnabled={false}
        />

        {/* Input Area */}
        <View style={{ backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e5e7eb' }}>
          <InputBar
            onSend={handleSendMessage}
            placeholder="Type your message..."
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

