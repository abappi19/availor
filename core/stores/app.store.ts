/**
 * App Store - Global app state with Zustand
 */

import { create } from 'zustand';

interface AppState {
    // Loading states
    isLoading: boolean;
    loadingMessage: string | null;
    
    // Error states
    error: Error | null;
    
    // Model readiness
    isModelReady: boolean;
    modelDownloadProgress: number;
    
    // Actions
    setLoading: (isLoading: boolean, message?: string) => void;
    setError: (error: Error | null) => void;
    setModelReady: (ready: boolean) => void;
    setModelProgress: (progress: number) => void;
    clearError: () => void;
}

export const useAppStore = create<AppState>()((set) => ({
    isLoading: false,
    loadingMessage: null,
    error: null,
    isModelReady: false,
    modelDownloadProgress: 0,

    setLoading: (isLoading, message) =>
        set({
            isLoading,
            loadingMessage: message || null,
        }),

    setError: (error) =>
        set({ error }),

    setModelReady: (ready) =>
        set({ isModelReady: ready }),

    setModelProgress: (progress) =>
        set({ modelDownloadProgress: progress }),

    clearError: () =>
        set({ error: null }),
}));
