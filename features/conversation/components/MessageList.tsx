import React, { useRef, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { UserMessage, AIMessage } from '@/components/molecules/MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { Message } from '@/services/storage/conversationHistory';

export interface MessageListProps {
  messages: Message[];
  isTyping?: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isTyping = false }) => {
  const scrollViewRef = useRef<ScrollView>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages.length, isTyping]);

  return (
    <ScrollView
      ref={scrollViewRef}
      className="flex-1 px-4"
      contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}
      showsVerticalScrollIndicator={false}
    >
      {messages.length === 0 && (
        <View className="flex-1 items-center justify-center py-20">
          <AIMessage message="Hello! I'm your AI English teacher. I'm here to help you improve your English skills. What would you like to practice today?" />
        </View>
      )}

      {messages.map((message) =>
        message.role === 'user' ? (
          <UserMessage key={message.id} message={message.content} timestamp={message.timestamp} />
        ) : (
          <AIMessage key={message.id} message={message.content} timestamp={message.timestamp} />
        )
      )}

      {isTyping && <TypingIndicator />}
    </ScrollView>
  );
};

