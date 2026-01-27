import { Ionicons } from '@expo/vector-icons';
import React, { type ReactNode, useState } from 'react';
import { ActivityIndicator, TextInput, TouchableOpacity, View, type ViewStyle } from 'react-native';

export interface InputBarProps {
    onSend: (message: string) => void;
    onVoicePress?: () => void;
    onAttachPress?: () => void;
    placeholder?: string;
    style?: ViewStyle;
    leftAccessory?: ReactNode;
    disabled?: boolean;
}

export const InputBar: React.FC<InputBarProps> = ({
    onSend,
    onVoicePress,
    onAttachPress,
    placeholder = 'Type a message...',
    style,
    leftAccessory,
    disabled = false,
}) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim() && !disabled) {
            onSend(message.trim());
            setMessage('');
        }
    };

    return (
        <View
            style={[
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    opacity: disabled ? 0.7 : 1,
                },
                style,
            ]}
        >
            {/* Left accessory or attach button */}
            {leftAccessory ||
                (onAttachPress && (
                    <TouchableOpacity onPress={onAttachPress} disabled={disabled} style={{ marginRight: 8 }}>
                        <Ionicons name="add-circle-outline" size={28} color="#757575" />
                    </TouchableOpacity>
                ))}

            {/* Text input */}
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#f3f4f6',
                    borderRadius: 24,
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    marginRight: 8,
                    minHeight: 40,
                }}
            >
                <TextInput
                    value={message}
                    onChangeText={setMessage}
                    placeholder={placeholder}
                    placeholderTextColor="#9E9E9E"
                    style={{ fontSize: 16, color: '#111827', paddingVertical: 0 }}
                    multiline
                    maxLength={500}
                    editable={!disabled}
                />
            </View>

            {/* Send button or loading indicator */}
            {disabled ? (
                <View
                    style={{
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ActivityIndicator size="small" color="#2196F3" />
                </View>
            ) : message.trim() ? (
                <TouchableOpacity
                    onPress={handleSend}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: '#2196F3',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Ionicons name="send" size={20} color="white" />
                </TouchableOpacity>
            ) : onVoicePress ? (
                <TouchableOpacity
                    onPress={onVoicePress}
                    style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
                >
                    <Ionicons name="mic" size={28} color="#2196F3" />
                </TouchableOpacity>
            ) : null}
        </View>
    );
};
