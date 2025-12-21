import React from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useConversation } from '../hooks/useConversation';
import { MessageList } from './MessageList';
import { InputBar } from '@/components/molecules/InputBar';

export const ConversationScreen: React.FC = () => {
  const { messages, isTyping, sendMessage } = useConversation();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View className="flex-1">
          <MessageList messages={messages} isTyping={isTyping} />
          <InputBar
            onSend={sendMessage}
            placeholder="Type your message..."
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

