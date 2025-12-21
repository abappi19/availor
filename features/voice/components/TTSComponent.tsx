/**
 * TTS (Text-to-Speech) Component
 * Conditionally rendered component that loads TTS model
 * Uses React Native ExecuTorch for TTS or falls back to Expo Speech
 */

import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
// TODO: Import from react-native-executorch when TTS is available
// import { useTextToSpeech } from 'react-native-executorch';

export interface TTSComponentProps {
  text: string;
  autoPlay?: boolean;
  onStart?: () => void;
  onDone?: () => void;
  onError?: (error: string) => void;
}

export const TTSComponent: React.FC<TTSComponentProps> = ({
  text,
  autoPlay = false,
  onStart,
  onDone,
  onError,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // TODO: Replace with actual ExecuTorch hook
  // const { synthesize, isLoading: isModelLoading } = useTextToSpeech({
  //   modelPath: 'fastspeech2.pte',
  // });
  const isModelLoading = false;

  useEffect(() => {
    if (autoPlay && text && !isPlaying) {
      handlePlay();
    }

    // Cleanup on unmount (free resources)
    return () => {
      Speech.stop();
    };
  }, [autoPlay, text]);

  const handlePlay = useCallback(async () => {
    if (isPlaying && !isPaused) {
      // Pause
      Speech.pause();
      setIsPaused(true);
      return;
    }

    if (isPaused) {
      // Resume
      Speech.resume();
      setIsPaused(false);
      return;
    }

    try {
      setIsPlaying(true);
      onStart?.();

      // TODO: Replace with ExecuTorch TTS when available
      // const audioUri = await synthesize(text);
      // Play the generated audio using expo-av or native audio player

      // For now, use Expo Speech as fallback
      await Speech.speak(text, {
        language: 'en-US',
        pitch: 1.0,
        rate: 1.0,
        onDone: () => {
          setIsPlaying(false);
          setIsPaused(false);
          onDone?.();
        },
        onStopped: () => {
          setIsPlaying(false);
          setIsPaused(false);
        },
        onError: (error) => {
          console.error('TTS Error:', error);
          setIsPlaying(false);
          setIsPaused(false);
          onError?.('Failed to play speech');
        },
      });
    } catch (err) {
      console.error('Failed to play speech:', err);
      setIsPlaying(false);
      setIsPaused(false);
      onError?.('Failed to play speech');
    }
  }, [text, isPlaying, isPaused, onStart, onDone, onError]);

  const handleStop = useCallback(() => {
    Speech.stop();
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  if (isModelLoading) {
    return (
      <View className="flex-row items-center p-2">
        <ActivityIndicator size="small" color="#4CAF50" />
        <Text className="text-gray-600 text-sm ml-2">Loading TTS...</Text>
      </View>
    );
  }

  if (!text) {
    return null;
  }

  return (
    <View className="flex-row items-center p-2">
      <TouchableOpacity
        onPress={handlePlay}
        className="flex-row items-center"
      >
        <View className="w-8 h-8 rounded-full bg-success-100 items-center justify-center mr-2">
          <Ionicons
            name={isPlaying && !isPaused ? 'pause' : 'play'}
            size={16}
            color="#4CAF50"
          />
        </View>
        <Text className="text-success-600 text-sm font-medium">
          {isPlaying && !isPaused ? 'Pause' : isPaused ? 'Resume' : 'Listen'}
        </Text>
      </TouchableOpacity>

      {isPlaying && (
        <TouchableOpacity
          onPress={handleStop}
          className="ml-3"
        >
          <View className="w-8 h-8 rounded-full bg-error-100 items-center justify-center">
            <Ionicons
              name="stop"
              size={16}
              color="#F44336"
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

