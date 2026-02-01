/**
 * useFileContext Hook - File upload and OCR processing
 */

import { useState, useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { extractText } from '@/core/services/ocr.service';
import type { FileContext } from '../types';

export function useFileContext() {
    const [files, setFiles] = useState<FileContext[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<Error | null>(null);

    // Pick image from library
    const pickImage = useCallback(async () => {
        setError(null);

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 0.8,
        });

        if (result.canceled || !result.assets[0]) {
            return null;
        }

        const asset = result.assets[0];
        const fileContext: FileContext = {
            id: Date.now().toString(),
            name: asset.fileName || 'image.jpg',
            type: 'image',
            uri: asset.uri,
            previewUri: asset.uri,
        };

        setFiles((prev) => [...prev, fileContext]);
        return fileContext;
    }, []);

    // Process file with OCR
    const processFile = useCallback(async (file: FileContext) => {
        if (file.type !== 'image') {
            return file;
        }

        setIsProcessing(true);
        setProgress(0);
        setError(null);

        try {
            // Simulate progress
            const progressInterval = setInterval(() => {
                setProgress((prev) => Math.min(prev + 10, 90));
            }, 200);

            const result = await extractText(file.uri);

            clearInterval(progressInterval);
            setProgress(100);

            const updatedFile: FileContext = {
                ...file,
                extractedText: result.text,
            };

            setFiles((prev) =>
                prev.map((f) => (f.id === file.id ? updatedFile : f))
            );

            return updatedFile;
        } catch (err) {
            setError(err instanceof Error ? err : new Error('OCR processing failed'));
            return file;
        } finally {
            setIsProcessing(false);
            setProgress(0);
        }
    }, []);

    // Remove file
    const removeFile = useCallback((fileId: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== fileId));
    }, []);

    // Clear all files
    const clearFiles = useCallback(() => {
        setFiles([]);
    }, []);

    // Get context text from all processed files
    const getContextText = useCallback(() => {
        return files
            .filter((f) => f.extractedText)
            .map((f) => f.extractedText)
            .join('\n\n');
    }, [files]);

    return {
        files,
        isProcessing,
        progress,
        error,
        pickImage,
        processFile,
        removeFile,
        clearFiles,
        getContextText,
    };
}
