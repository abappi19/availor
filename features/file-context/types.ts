/**
 * File Context Types
 * Types for file upload and context management
 */

export type FileType = 'image' | 'pdf' | 'audio';

export interface FileContext {
    id: string;
    type: FileType;
    uri: string;
    name: string;
    size: number;
    extractedText?: string;
    thumbnail?: string;
    uploadedAt: Date;
    status: 'uploading' | 'processing' | 'ready' | 'error';
    error?: string;
}

export interface FileUploadOptions {
    maxFiles?: number;
    allowedTypes?: FileType[];
    maxSizeBytes?: number;
}
