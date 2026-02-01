/**
 * InputBar Component
 */

import { Box, HStack, Pressable, Spinner } from '@/components/ui';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput, useColorScheme } from 'react-native';
import { CHAT_CONSTANTS } from '../constants';

interface InputBarProps {
    onSend: (message: string) => void;
    onVoicePress?: () => void;
    disabled?: boolean;
    placeholder?: string;
}

export function InputBar({ onSend, onVoicePress, disabled = false, placeholder = 'Type a message...' }: InputBarProps) {
    const [message, setMessage] = useState('');
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const handleSend = () => {
        const trimmed = message.trim();
        if (trimmed && !disabled) {
            onSend(trimmed);
            setMessage('');
        }
    };

    const canSend = message.trim().length > 0 && !disabled;

    return (
        <Box className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700">
            <HStack className="items-center" space="sm">
                {/* Text Input */}
                <Box className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 min-h-[44px] justify-center">
                    <TextInput
                        value={message}
                        onChangeText={setMessage}
                        placeholder={placeholder}
                        placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
                        className="text-base text-gray-900 dark:text-white"
                        multiline
                        maxLength={CHAT_CONSTANTS.MAX_MESSAGE_LENGTH}
                        editable={!disabled}
                        onSubmitEditing={handleSend}
                        blurOnSubmit={false}
                    />
                </Box>

                {/* Send/Voice Button */}
                {disabled ? (
                    <Box className="w-11 h-11 items-center justify-center">
                        <Spinner size="small" color="#2196F3" />
                    </Box>
                ) : canSend ? (
                    <Pressable
                        onPress={handleSend}
                        className="w-11 h-11 rounded-full bg-primary-500 items-center justify-center"
                    >
                        <Ionicons name="send" size={24} color="#FFFFFF" />
                    </Pressable>
                ) : onVoicePress ? (
                    <Pressable onPress={onVoicePress} className="w-11 h-11 items-center justify-center">
                        <Ionicons name="mic" size={32} color="#2196F3" />
                    </Pressable>
                ) : null}
            </HStack>
        </Box>
    );
}
