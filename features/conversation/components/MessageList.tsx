import { EmptyState } from '@/components/molecules/EmptyState';
import { AIMessage, UserMessage } from '@/components/molecules/MessageBubble';
import { TTSComponent } from '@/features/voice';
import { Message } from '@/services/storage/conversationHistory';
import React, { useEffect, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { TypingIndicator } from './TypingIndicator';

export interface MessageListProps {
  messages: Message[];
  isTyping?: boolean;
  ttsEnabled?: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isTyping = false, ttsEnabled = false }) => {
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
      {messages.length === 0 && !isTyping && (
        <EmptyState
          icon="chatbubbles-outline"
          title="Start a Conversation"
          message="Hello! I'm your AI English teacher. I'm here to help you improve your English skills. What would you like to practice today?"
        />
      )}

      {/* Messages */}
      {messages.map((message, index) =>
        message.role === 'user' ? (
          <UserMessage key={message.id} message={message.content} timestamp={message.timestamp} />
        ) : (
          <View key={message.id}>
            <AIMessage message={message.content} timestamp={message.timestamp} />
            {/* Conditionally render TTS component for AI messages when enabled */}
            {ttsEnabled && (
              <TTSComponent
                text={message.content}
                autoPlay={index === messages.length - 1} // Auto-play only the latest message
              />
            )}
          </View>
        )
      )}

      {/* Typing Indicator */}
      {isTyping && <TypingIndicator />}
    </ScrollView>
  );
};

