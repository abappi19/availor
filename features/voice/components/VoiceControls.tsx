/**
 * Voice Controls Component
 * Toggles for enabling/disabling STT and TTS
 */

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export interface VoiceControlsProps {
    sttEnabled: boolean;
    ttsEnabled: boolean;
    onToggleSTT: () => void;
    onToggleTTS: () => void;
}

export const VoiceControls: React.FC<VoiceControlsProps> = ({ sttEnabled, ttsEnabled, onToggleSTT, onToggleTTS }) => {
    return (
        <View className="flex-row items-center justify-center p-4 bg-white border-b border-gray-200">
            {/* STT Toggle */}
            <TouchableOpacity
                onPress={onToggleSTT}
                className={`flex-row items-center px-4 py-2 rounded-full mr-3 ${
                    sttEnabled ? 'bg-primary-500' : 'bg-gray-200'
                }`}
            >
                <Ionicons name="mic" size={20} color={sttEnabled ? 'white' : '#666'} />
                <Text className={`ml-2 font-medium ${sttEnabled ? 'text-white' : 'text-gray-700'}`}>Voice Input</Text>
            </TouchableOpacity>

            {/* TTS Toggle */}
            <TouchableOpacity
                onPress={onToggleTTS}
                className={`flex-row items-center px-4 py-2 rounded-full ${
                    ttsEnabled ? 'bg-success-500' : 'bg-gray-200'
                }`}
            >
                <Ionicons name="volume-high" size={20} color={ttsEnabled ? 'white' : '#666'} />
                <Text className={`ml-2 font-medium ${ttsEnabled ? 'text-white' : 'text-gray-700'}`}>Voice Output</Text>
            </TouchableOpacity>
        </View>
    );
};
