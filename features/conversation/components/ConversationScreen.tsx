import { InputBar } from '@/components/molecules/InputBar';
import { Message } from '@/services/storage/conversationHistory';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageList } from './MessageList';

// Dummy conversation data for UI showcase
const DUMMY_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hello! I'm your AI English teacher. How can I help you improve your English today?",
    timestamp: Date.now() - 300000,
  },
  {
    id: '2',
    role: 'user',
    content: "Hi! I want to practice my conversation skills.",
    timestamp: Date.now() - 240000,
  },
  {
    id: '3',
    role: 'assistant',
    content: "That's great! Conversation practice is one of the best ways to improve. Let's start with a common scenario. Imagine you're at a coffee shop. What would you say to order your favorite drink?",
    timestamp: Date.now() - 180000,
  },
  {
    id: '4',
    role: 'user',
    content: "I would like to order a cappuccino, please.",
    timestamp: Date.now() - 120000,
  },
  {
    id: '5',
    role: 'assistant',
    content: "Excellent! Your sentence is grammatically correct. To make it sound more natural, you could also say: 'Could I have a cappuccino, please?' or 'I'll have a cappuccino, please.' These variations sound more conversational. Would you like to practice more scenarios?",
    timestamp: Date.now() - 60000,
  },
];

export const ConversationScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(DUMMY_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI typing
    setIsTyping(true);
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "That's a great question! I'm here to help you with that. Let me explain...",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

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

