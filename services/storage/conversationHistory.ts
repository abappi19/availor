/**
 * Conversation History Storage
 * Manages persistent storage of conversations using AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  messages: Message[];
  startedAt: number;
  lastUpdatedAt: number;
}

const STORAGE_KEY = '@availor:conversations';
const CURRENT_CONVERSATION_KEY = '@availor:current_conversation';

class ConversationHistoryService {
  /**
   * Get all conversations
   */
  async getAllConversations(): Promise<Conversation[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading conversations:', error);
      return [];
    }
  }

  /**
   * Get a specific conversation by ID
   */
  async getConversation(id: string): Promise<Conversation | null> {
    const conversations = await this.getAllConversations();
    return conversations.find((c) => c.id === id) || null;
  }

  /**
   * Get current active conversation
   */
  async getCurrentConversation(): Promise<Conversation | null> {
    try {
      const currentId = await AsyncStorage.getItem(CURRENT_CONVERSATION_KEY);
      if (!currentId) return null;
      return this.getConversation(currentId);
    } catch (error) {
      console.error('Error loading current conversation:', error);
      return null;
    }
  }

  /**
   * Create a new conversation
   */
  async createConversation(): Promise<Conversation> {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      messages: [],
      startedAt: Date.now(),
      lastUpdatedAt: Date.now(),
    };

    const conversations = await this.getAllConversations();
    conversations.push(newConversation);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    await AsyncStorage.setItem(CURRENT_CONVERSATION_KEY, newConversation.id);

    return newConversation;
  }

  /**
   * Add a message to a conversation
   */
  async addMessage(conversationId: string, message: Omit<Message, 'id' | 'timestamp'>): Promise<Message> {
    const newMessage: Message = {
      id: Date.now().toString() + Math.random(),
      timestamp: Date.now(),
      ...message,
    };

    const conversations = await this.getAllConversations();
    const conversationIndex = conversations.findIndex((c) => c.id === conversationId);

    if (conversationIndex === -1) {
      throw new Error('Conversation not found');
    }

    conversations[conversationIndex].messages.push(newMessage);
    conversations[conversationIndex].lastUpdatedAt = Date.now();

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));

    return newMessage;
  }

  /**
   * Delete a conversation
   */
  async deleteConversation(id: string): Promise<void> {
    const conversations = await this.getAllConversations();
    const filtered = conversations.filter((c) => c.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));

    // If it was the current conversation, clear that
    const currentId = await AsyncStorage.getItem(CURRENT_CONVERSATION_KEY);
    if (currentId === id) {
      await AsyncStorage.removeItem(CURRENT_CONVERSATION_KEY);
    }
  }

  /**
   * Set current conversation
   */
  async setCurrentConversation(id: string): Promise<void> {
    await AsyncStorage.setItem(CURRENT_CONVERSATION_KEY, id);
  }

  /**
   * Clear all conversations
   */
  async clearAll(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEY);
    await AsyncStorage.removeItem(CURRENT_CONVERSATION_KEY);
  }
}

export const conversationHistoryService = new ConversationHistoryService();

