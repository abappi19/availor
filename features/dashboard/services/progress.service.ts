/**
 * Progress Service - Track and calculate progress
 */

import { getItem, setItem } from '@/core/services/storage.service';
import { STORAGE_KEYS } from '@/core/constants';
import type { DailyProgress } from '../types';

/**
 * Get today's date string (YYYY-MM-DD)
 */
export function getTodayString(): string {
    return new Date().toISOString().split('T')[0];
}

/**
 * Load all daily progress
 */
export async function loadProgress(): Promise<DailyProgress[]> {
    const progress = await getItem<DailyProgress[]>(STORAGE_KEYS.PROGRESS_DATA);
    return progress || [];
}

/**
 * Save daily progress
 */
export async function saveProgress(progress: DailyProgress[]): Promise<boolean> {
    return setItem(STORAGE_KEYS.PROGRESS_DATA, progress);
}

/**
 * Get today's progress
 */
export async function getTodayProgress(): Promise<DailyProgress> {
    const today = getTodayString();
    const allProgress = await loadProgress();
    
    const todayProgress = allProgress.find((p) => p.date === today);
    
    return todayProgress || {
        date: today,
        messagesCount: 0,
        practiceMinutes: 0,
        xpEarned: 0,
    };
}

/**
 * Update today's progress
 */
export async function updateTodayProgress(
    updates: Partial<Omit<DailyProgress, 'date'>>
): Promise<DailyProgress> {
    const today = getTodayString();
    const allProgress = await loadProgress();
    
    const index = allProgress.findIndex((p) => p.date === today);
    
    if (index >= 0) {
        allProgress[index] = {
            ...allProgress[index],
            ...updates,
        };
    } else {
        allProgress.push({
            date: today,
            messagesCount: updates.messagesCount || 0,
            practiceMinutes: updates.practiceMinutes || 0,
            xpEarned: updates.xpEarned || 0,
        });
    }
    
    await saveProgress(allProgress);
    
    return allProgress.find((p) => p.date === today)!;
}

/**
 * Get progress for last N days
 */
export async function getRecentProgress(days: number): Promise<DailyProgress[]> {
    const allProgress = await loadProgress();
    const today = new Date();
    
    const recentDates = Array.from({ length: days }, (_, i) => {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
    });
    
    return recentDates.map((date) => {
        const existing = allProgress.find((p) => p.date === date);
        return existing || { date, messagesCount: 0, practiceMinutes: 0, xpEarned: 0 };
    });
}

/**
 * Calculate total stats
 */
export async function getTotalStats(): Promise<{
    totalMessages: number;
    totalMinutes: number;
    totalXP: number;
    activeDays: number;
}> {
    const allProgress = await loadProgress();
    
    return allProgress.reduce(
        (acc, day) => ({
            totalMessages: acc.totalMessages + day.messagesCount,
            totalMinutes: acc.totalMinutes + day.practiceMinutes,
            totalXP: acc.totalXP + day.xpEarned,
            activeDays: day.messagesCount > 0 || day.practiceMinutes > 0
                ? acc.activeDays + 1
                : acc.activeDays,
        }),
        { totalMessages: 0, totalMinutes: 0, totalXP: 0, activeDays: 0 }
    );
}
