/**
 * Storage Service - AsyncStorage wrapper with type safety
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Get item from storage with type safety
 */
export async function getItem<T>(key: string): Promise<T | null> {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value === null) return null;
        return JSON.parse(value) as T;
    } catch (error) {
        console.error(`Storage: Error reading ${key}:`, error);
        return null;
    }
}

/**
 * Set item in storage
 */
export async function setItem<T>(key: string, value: T): Promise<boolean> {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Storage: Error writing ${key}:`, error);
        return false;
    }
}

/**
 * Remove item from storage
 */
export async function removeItem(key: string): Promise<boolean> {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Storage: Error removing ${key}:`, error);
        return false;
    }
}

/**
 * Get multiple items from storage
 */
export async function getMultiple<T>(keys: string[]): Promise<Record<string, T | null>> {
    try {
        const pairs = await AsyncStorage.multiGet(keys);
        const result: Record<string, T | null> = {};
        for (const [key, value] of pairs) {
            result[key] = value ? (JSON.parse(value) as T) : null;
        }
        return result;
    } catch (error) {
        console.error('Storage: Error reading multiple keys:', error);
        return {};
    }
}

/**
 * Clear all storage
 */
export async function clearAll(): Promise<boolean> {
    try {
        await AsyncStorage.clear();
        return true;
    } catch (error) {
        console.error('Storage: Error clearing:', error);
        return false;
    }
}
