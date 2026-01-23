/**
 * File Preview Component
 * Displays uploaded files with their processing status
 */

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import type { FileContext } from '../types';

export interface FilePreviewProps {
    file: FileContext;
    onRemove?: () => void;
}

export const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemove }) => {
    const getFileIcon = () => {
        switch (file.type) {
            case 'image':
                return 'image';
            case 'pdf':
                return 'document-text';
            case 'audio':
                return 'musical-notes';
            default:
                return 'document';
        }
    };

    const getStatusColor = () => {
        switch (file.status) {
            case 'ready':
                return 'text-success-600';
            case 'processing':
                return 'text-warning-600';
            case 'error':
                return 'text-error-600';
            default:
                return 'text-gray-600';
        }
    };

    const getStatusText = () => {
        switch (file.status) {
            case 'uploading':
                return 'Uploading...';
            case 'processing':
                return 'Processing...';
            case 'ready':
                return file.extractedText ? 'Text extracted' : 'Ready';
            case 'error':
                return file.error || 'Error';
            default:
                return '';
        }
    };

    return (
        <View className="bg-white rounded-lg p-3 mb-2 border border-gray-200 flex-row items-center">
            {/* File Icon or Image Thumbnail */}
            <View className="w-12 h-12 rounded-lg bg-gray-100 items-center justify-center mr-3 overflow-hidden">
                {file.type === 'image' && file.uri ? (
                    <Image source={{ uri: file.uri }} className="w-full h-full" resizeMode="cover" />
                ) : (
                    <Ionicons name={getFileIcon()} size={24} color="#666" />
                )}
            </View>

            {/* File Info */}
            <View className="flex-1">
                <Text className="font-medium text-gray-900 mb-1" numberOfLines={1}>
                    {file.name}
                </Text>
                <View className="flex-row items-center">
                    {file.status === 'processing' && (
                        <ActivityIndicator size="small" color="#FFA726" className="mr-2" />
                    )}
                    <Text className={`text-sm ${getStatusColor()}`}>{getStatusText()}</Text>
                </View>
                {file.extractedText && (
                    <Text className="text-xs text-gray-600 mt-1" numberOfLines={2}>
                        {file.extractedText}
                    </Text>
                )}
            </View>

            {/* Remove Button */}
            {onRemove && (
                <TouchableOpacity onPress={onRemove} className="w-8 h-8 items-center justify-center ml-2">
                    <Ionicons name="close-circle" size={24} color="#999" />
                </TouchableOpacity>
            )}
        </View>
    );
};
