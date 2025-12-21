/**
 * STT (Speech-to-Text) Component
 * Conditionally rendered component that loads STT model
 * Uses React Native ExecuTorch useSpeechToText hook
 */

import { Ionicons } from '@expo/vector-icons';
import { Audio, RecordingPresets } from 'expo-audio';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
// TODO: Import from react-native-executorch when available
// import { useSpeechToText } from 'react-native-executorch';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface STTComponentProps {
  onTranscription: (text: string) => void;
  onError?: (error: string) => void;
}

export const STTComponent: React.FC<STTComponentProps> = ({
  onTranscription,
  onError,
}) => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // TODO: Replace with actual ExecuTorch hook
  // const { transcribe, isLoading: isModelLoading } = useSpeechToText({
  //   modelPath: 'whisper-tiny.pte',
  // });
  const isModelLoading = false;

  // Pulse animation for recording indicator
  const pulseStyle = useAnimatedStyle(() => {
    if (!isRecording) {
      return { opacity: 1, transform: [{ scale: 1 }] };
    }
    return {
      opacity: withRepeat(
        withSequence(
          withTiming(0.6, { duration: 800 }),
          withTiming(1, { duration: 800 })
        ),
        -1,
        true
      ),
      transform: [
        {
          scale: withRepeat(
            withSequence(
              withTiming(1.1, { duration: 800 }),
              withTiming(1, { duration: 800 })
            ),
            -1,
            true
          ),
        },
      ],
    };
  });

  useEffect(() => {
    // Request permissions on mount
    (async () => {
      const { granted } = await Audio.requestRecordingPermissionsAsync();
      if (!granted) {
        onError?.('Microphone permission not granted');
      }
    })();

    // Cleanup on unmount (free resources)
    return () => {
      if (recording) {
        recording.stopAsync().then(() => recording.unloadAsync()).catch(console.error);
      }
    };
  }, []);

  const startRecording = useCallback(async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareAsync(RecordingPresets.HIGH_QUALITY);
      await newRecording.startAsync();

      setRecording(newRecording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording:', err);
      onError?.('Failed to start recording');
    }
  }, [onError]);

  const stopRecording = useCallback(async () => {
    if (!recording) return;

    setIsRecording(false);
    setIsProcessing(true);

    try {
      await recording.stopAsync();
      const uri = recording.getURI();
      await recording.unloadAsync();

      if (uri) {
        // TODO: Replace with actual ExecuTorch transcription
        // const transcription = await transcribe(uri);
        // onTranscription(transcription.text);

        // Mock transcription for now
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockTranscription = "This is a mock transcription of your speech.";
        onTranscription(mockTranscription);
      }

      setRecording(null);
    } catch (err) {
      console.error('Failed to stop recording:', err);
      onError?.('Failed to process audio');
    } finally {
      setIsProcessing(false);
    }
  }, [recording, onTranscription, onError]);

  if (isModelLoading) {
    return (
      <View className="items-center justify-center p-4">
        <ActivityIndicator size="small" color="#2196F3" />
        <Text className="text-gray-600 text-sm mt-2">Loading voice model...</Text>
      </View>
    );
  }

  return (
    <View className="items-center p-4">
      {isProcessing ? (
        <View className="items-center">
          <ActivityIndicator size="large" color="#2196F3" />
          <Text className="text-gray-600 mt-2">Processing audio...</Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={isRecording ? stopRecording : startRecording}
          className="items-center"
        >
          <AnimatedView
            style={[pulseStyle]}
            className={`w-16 h-16 rounded-full items-center justify-center ${
              isRecording ? 'bg-error-500' : 'bg-primary-500'
            }`}
          >
            <Ionicons
              name={isRecording ? 'stop' : 'mic'}
              size={32}
              color="white"
            />
          </AnimatedView>
          <Text className={`mt-2 font-medium ${isRecording ? 'text-error-500' : 'text-primary-500'}`}>
            {isRecording ? 'Tap to stop' : 'Tap to speak'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

