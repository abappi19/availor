import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useConversation } from '../hooks/useConversation';
import { MessageList } from './MessageList';
import { InputBar } from '@/components/molecules/InputBar';
import { VoiceControls, STTComponent, useVoiceMode } from '@/features/voice';
import { FileUploadButton, FileContextPanel, useFileProcessor, FileContext } from '@/features/file-context';

export const ConversationScreen: React.FC = () => {
  const { messages, isTyping, sendMessage } = useConversation();
  const { settings, loadSettings, toggleSTT, toggleTTS } = useVoiceMode();
  const { processFile } = useFileProcessor();
  const [attachedFiles, setAttachedFiles] = useState<FileContext[]>([]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleVoiceTranscription = (text: string) => {
    if (text.trim()) {
      sendMessage(text, attachedFiles);
      setAttachedFiles([]); // Clear files after sending
    }
  };

  const handleSendMessage = (text: string) => {
    sendMessage(text, attachedFiles);
    setAttachedFiles([]); // Clear files after sending
  };

  const handleFileSelect = async (file: FileContext) => {
    // Add file to list with uploading status
    setAttachedFiles(prev => [...prev, { ...file, status: 'uploading' }]);

    // Process file in background
    try {
      const updatedFile = await processFile({ ...file, status: 'processing' });
      
      // Update file status
      setAttachedFiles(prev =>
        prev.map(f => f.id === updatedFile.id ? updatedFile : f)
      );
    } catch (error) {
      console.error('Error processing file:', error);
      // Update file with error status
      setAttachedFiles(prev =>
        prev.map(f =>
          f.id === file.id
            ? { ...f, status: 'error', error: 'Failed to process file' }
            : f
        )
      );
    }
  };

  const handleRemoveFile = (fileId: string) => {
    setAttachedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View className="flex-1">
          {/* Voice Mode Controls */}
          <VoiceControls
            sttEnabled={settings.sttEnabled}
            ttsEnabled={settings.ttsEnabled}
            onToggleSTT={toggleSTT}
            onToggleTTS={toggleTTS}
          />

          {/* File Context Panel */}
          <FileContextPanel
            files={attachedFiles}
            onRemoveFile={handleRemoveFile}
          />

          {/* Message List */}
          <MessageList messages={messages} isTyping={isTyping} ttsEnabled={settings.ttsEnabled} />

          {/* Input Area */}
          <View>
            {/* Conditionally render STT component when enabled */}
            {settings.sttEnabled && (
              <STTComponent
                onTranscription={handleVoiceTranscription}
                onError={(error) => console.error('STT Error:', error)}
              />
            )}

            {/* Text Input with File Upload (always available) */}
            <InputBar
              onSend={handleSendMessage}
              placeholder={settings.sttEnabled ? "Type or speak..." : "Type your message..."}
              leftAccessory={
                <FileUploadButton
                  onFileSelect={handleFileSelect}
                  disabled={isTyping}
                />
              }
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

