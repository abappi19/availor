/**
 * Message Storage Service
 */

import { getItem, setItem, removeItem } from '@/core/services/storage.service';
import { STORAGE_KEYS } from '@/core/constants';
import type { Message } from '../types';

/**
 * Save messages to storage
 */
export async function saveMessages(messages: Message[]): Promise<boolean> {
    return setItem(STORAGE_KEYS.CHAT_MESSAGES, messages);
}

/**
 * Load messages from storage
 */
export async function loadMessages(): Promise<Message[]> {
    const messages = await getItem<Message[]>(STORAGE_KEYS.CHAT_MESSAGES);
    return messages || [];
}

/**
 * Clear all messages
 */
export async function clearMessages(): Promise<boolean> {
    return removeItem(STORAGE_KEYS.CHAT_MESSAGES);
}

/**
 * Add message to storage
 */
export async function addMessage(message: Message): Promise<boolean> {
    const messages = await loadMessages();
    messages.push(message);
    return saveMessages(messages);
}
