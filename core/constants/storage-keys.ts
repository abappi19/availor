/**
 * AsyncStorage Keys
 */

export const STORAGE_KEYS = {
    // User
    USER_PROFILE: 'user_profile',
    AI_PERSONALIZATION: 'ai_personalization',

    // Chat
    CHAT_MESSAGES: 'chat_messages',
    CHAT_HISTORY: 'chat_history',

    // Progress
    PROGRESS_DATA: 'progress_data',
    DAILY_PROGRESS: 'daily_progress',
    ACHIEVEMENTS: 'achievements',
    GAMIFICATION_STATE: 'gamification_state',

    // Settings
    APP_SETTINGS: 'app_settings',
    THEME_PREFERENCE: 'theme_preference',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
