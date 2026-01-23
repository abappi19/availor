/**
 * Progress Tracking Service
 * Tracks daily progress, sessions, and metrics
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, startOfDay } from 'date-fns';

export interface DailyProgress {
    date: string; // YYYY-MM-DD
    minutesPracticed: number;
    messagesCount: number;
    conversationsCount: number;
    pointsEarned: number;
}

export interface ProgressSummary {
    totalSessions: number;
    totalMinutes: number;
    currentStreak: number;
    longestStreak: number;
    weeklyData: number[]; // Last 7 days practice minutes
    monthlyData: number[]; // Last 30 days practice minutes
}

const STORAGE_KEY = '@availor:daily_progress';

class ProgressService {
    /**
     * Get all daily progress records
     */
    async getAllProgress(): Promise<DailyProgress[]> {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading progress:', error);
            return [];
        }
    }

    /**
     * Get progress for a specific date
     */
    async getProgressForDate(date: Date): Promise<DailyProgress> {
        const dateStr = format(startOfDay(date), 'yyyy-MM-dd');
        const allProgress = await this.getAllProgress();
        const existing = allProgress.find((p) => p.date === dateStr);

        return (
            existing || {
                date: dateStr,
                minutesPracticed: 0,
                messagesCount: 0,
                conversationsCount: 0,
                pointsEarned: 0,
            }
        );
    }

    /**
     * Get today's progress
     */
    async getTodayProgress(): Promise<DailyProgress> {
        return this.getProgressForDate(new Date());
    }

    /**
     * Update today's progress
     */
    async updateTodayProgress(update: Partial<DailyProgress>): Promise<DailyProgress> {
        const allProgress = await this.getAllProgress();
        const dateStr = format(startOfDay(new Date()), 'yyyy-MM-dd');
        const existingIndex = allProgress.findIndex((p) => p.date === dateStr);

        const updated: DailyProgress =
            existingIndex >= 0
                ? { ...allProgress[existingIndex], ...update }
                : {
                      date: dateStr,
                      minutesPracticed: 0,
                      messagesCount: 0,
                      conversationsCount: 0,
                      pointsEarned: 0,
                      ...update,
                  };

        if (existingIndex >= 0) {
            allProgress[existingIndex] = updated;
        } else {
            allProgress.push(updated);
        }

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
        return updated;
    }

    /**
     * Get weekly data (last 7 days)
     */
    async getWeeklyData(): Promise<number[]> {
        const allProgress = await this.getAllProgress();
        const weeklyData: number[] = [];

        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = format(startOfDay(date), 'yyyy-MM-dd');
            const dayProgress = allProgress.find((p) => p.date === dateStr);
            weeklyData.push(dayProgress?.minutesPracticed || 0);
        }

        return weeklyData;
    }

    /**
     * Get monthly data (last 30 days)
     */
    async getMonthlyData(): Promise<number[]> {
        const allProgress = await this.getAllProgress();
        const monthlyData: number[] = [];

        for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = format(startOfDay(date), 'yyyy-MM-dd');
            const dayProgress = allProgress.find((p) => p.date === dateStr);
            monthlyData.push(dayProgress?.minutesPracticed || 0);
        }

        return monthlyData;
    }

    /**
     * Get progress summary
     */
    async getProgressSummary(): Promise<ProgressSummary> {
        const allProgress = await this.getAllProgress();
        const weeklyData = await this.getWeeklyData();

        const totalSessions = allProgress.length;
        const totalMinutes = allProgress.reduce((sum, p) => sum + p.minutesPracticed, 0);

        // Calculate streak
        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 0;

        const sortedProgress = [...allProgress].sort((a, b) => b.date.localeCompare(a.date));

        for (let i = 0; i < sortedProgress.length; i++) {
            const _date = new Date(sortedProgress[i].date);
            const expectedDate = new Date();
            expectedDate.setDate(expectedDate.getDate() - i);
            const expectedDateStr = format(startOfDay(expectedDate), 'yyyy-MM-dd');

            if (sortedProgress[i].date === expectedDateStr) {
                tempStreak++;
                if (i === 0) currentStreak = tempStreak;
            } else {
                longestStreak = Math.max(longestStreak, tempStreak);
                tempStreak = 0;
            }
        }

        longestStreak = Math.max(longestStreak, tempStreak);

        return {
            totalSessions,
            totalMinutes,
            currentStreak,
            longestStreak,
            weeklyData,
            monthlyData: [],
        };
    }

    /**
     * Clear all progress data
     */
    async clear(): Promise<void> {
        await AsyncStorage.removeItem(STORAGE_KEY);
    }
}

export const progressService = new ProgressService();
