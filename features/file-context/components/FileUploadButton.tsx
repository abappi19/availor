/**
 * File Upload Button Component
 * Allows users to pick and upload files
 */

import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, TouchableOpacity, View } from 'react-native';
import type { FileContext, FileType } from '../types';

export interface FileUploadButtonProps {
    onFileSelect: (file: FileContext) => void;
    allowedTypes?: FileType[];
    disabled?: boolean;
}

export const FileUploadButton: React.FC<FileUploadButtonProps> = ({
    onFileSelect,
    allowedTypes = ['image', 'pdf', 'audio'],
    disabled = false,
}) => {
    const [isUploading, setIsUploading] = useState(false);

    const showFileTypeOptions = () => {
        const options: string[] = [];
        const handlers: (() => void)[] = [];

        if (allowedTypes.includes('image')) {
            options.push('📷 Take Photo');
            options.push('🖼️ Choose from Gallery');
            handlers.push(handleTakePhoto, handlePickImage);
        }

        if (allowedTypes.includes('pdf')) {
            options.push('📄 Pick PDF');
            handlers.push(handlePickDocument);
        }

        if (allowedTypes.includes('audio')) {
            options.push('🎵 Pick Audio File');
            handlers.push(handlePickAudio);
        }

        options.push('Cancel');

        // Simple implementation - in production, use ActionSheet or custom modal
        // For now, just open image picker as default
        handlePickImage();
    };

    const handleTakePhoto = async () => {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Required', 'Camera permission is required to take photos.');
                return;
            }

            setIsUploading(true);
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ['images'],
                quality: 0.8,
                allowsEditing: true,
            });

            if (!result.canceled && result.assets[0]) {
                const asset = result.assets[0];
                const fileContext: FileContext = {
                    id: Date.now().toString(),
                    type: 'image',
                    uri: asset.uri,
                    name: `photo_${Date.now()}.jpg`,
                    size: asset.fileSize || 0,
                    uploadedAt: new Date(),
                    status: 'uploading',
                };
                onFileSelect(fileContext);
            }
        } catch (error) {
            console.error('Error taking photo:', error);
            Alert.alert('Error', 'Failed to take photo');
        } finally {
            setIsUploading(false);
        }
    };

    const handlePickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Required', 'Photo library permission is required.');
                return;
            }

            setIsUploading(true);
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                quality: 0.8,
                allowsEditing: false,
                allowsMultipleSelection: false,
            });

            if (!result.canceled && result.assets[0]) {
                const asset = result.assets[0];
                const fileContext: FileContext = {
                    id: Date.now().toString(),
                    type: 'image',
                    uri: asset.uri,
                    name: asset.fileName || `image_${Date.now()}.jpg`,
                    size: asset.fileSize || 0,
                    uploadedAt: new Date(),
                    status: 'uploading',
                };
                onFileSelect(fileContext);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image');
        } finally {
            setIsUploading(false);
        }
    };

    const handlePickDocument = async () => {
        try {
            setIsUploading(true);
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                copyToCacheDirectory: true,
            });

            if (!result.canceled && result.assets[0]) {
                const asset = result.assets[0];
                const fileContext: FileContext = {
                    id: Date.now().toString(),
                    type: 'pdf',
                    uri: asset.uri,
                    name: asset.name,
                    size: asset.size || 0,
                    uploadedAt: new Date(),
                    status: 'uploading',
                };
                onFileSelect(fileContext);
            }
        } catch (error) {
            console.error('Error picking document:', error);
            Alert.alert('Error', 'Failed to pick document');
        } finally {
            setIsUploading(false);
        }
    };

    const handlePickAudio = async () => {
        try {
            setIsUploading(true);
            const result = await DocumentPicker.getDocumentAsync({
                type: 'audio/*',
                copyToCacheDirectory: true,
            });

            if (!result.canceled && result.assets[0]) {
                const asset = result.assets[0];
                const fileContext: FileContext = {
                    id: Date.now().toString(),
                    type: 'audio',
                    uri: asset.uri,
                    name: asset.name,
                    size: asset.size || 0,
                    uploadedAt: new Date(),
                    status: 'uploading',
                };
                onFileSelect(fileContext);
            }
        } catch (error) {
            console.error('Error picking audio:', error);
            Alert.alert('Error', 'Failed to pick audio file');
        } finally {
            setIsUploading(false);
        }
    };

    if (isUploading) {
        return (
            <View className="w-10 h-10 items-center justify-center">
                <ActivityIndicator size="small" color="#2196F3" />
            </View>
        );
    }

    return (
        <TouchableOpacity
            onPress={showFileTypeOptions}
            disabled={disabled}
            className={`w-10 h-10 items-center justify-center ${disabled ? 'opacity-50' : ''}`}
        >
            <Ionicons name="attach" size={24} color={disabled ? '#999' : '#2196F3'} />
        </TouchableOpacity>
    );
};
