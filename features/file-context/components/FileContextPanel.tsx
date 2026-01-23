/**
 * File Context Panel Component
 * Displays and manages uploaded files in conversation
 */

import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import type { FileContext } from '../types';
import { FilePreview } from './FilePreview';

export interface FileContextPanelProps {
    files: FileContext[];
    onRemoveFile: (fileId: string) => void;
}

export const FileContextPanel: React.FC<FileContextPanelProps> = ({ files, onRemoveFile }) => {
    if (files.length === 0) {
        return null;
    }

    return (
        <View className="bg-gray-50 border-b border-gray-200 p-3">
            <Text className="text-sm font-medium text-gray-700 mb-2">Files ({files.length})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2">
                    {files.map((file) => (
                        <View key={file.id} style={{ width: 200 }}>
                            <FilePreview file={file} onRemove={() => onRemoveFile(file.id)} />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};
