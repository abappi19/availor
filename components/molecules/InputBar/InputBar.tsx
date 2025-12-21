import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface InputBarProps {
  onSend: (message: string) => void;
  onVoicePress?: () => void;
  onAttachPress?: () => void;
  placeholder?: string;
  style?: ViewStyle;
}

export const InputBar: React.FC<InputBarProps> = ({
  onSend,
  onVoicePress,
  onAttachPress,
  placeholder = 'Type a message...',
  style,
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <View className="flex-row items-center bg-white border-t border-gray-200 px-4 py-3" style={style}>
      {/* Attach button */}
      {onAttachPress && (
        <TouchableOpacity onPress={onAttachPress} className="mr-2">
          <Ionicons name="add-circle-outline" size={28} color="#757575" />
        </TouchableOpacity>
      )}

      {/* Text input */}
      <View className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2">
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder={placeholder}
          placeholderTextColor="#9E9E9E"
          className="text-base text-gray-900"
          multiline
          maxLength={500}
        />
      </View>

      {/* Send or Voice button */}
      {message.trim() ? (
        <TouchableOpacity
          onPress={handleSend}
          className="w-10 h-10 rounded-full bg-primary-500 items-center justify-center"
        >
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      ) : onVoicePress ? (
        <TouchableOpacity onPress={onVoicePress} className="w-10 h-10 items-center justify-center">
          <Ionicons name="mic" size={28} color="#2196F3" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

