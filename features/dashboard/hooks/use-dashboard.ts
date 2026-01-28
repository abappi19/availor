/**
 * useDashboard Hook - Progress & gamification state
 */

import { useState, useEffect, useCallback } from 'react';
import {
    loadState,
    saveState,
    getLevelFromXP,
    getLevelProgress,
    addXP as addXPService,
    updateStreak as updateStreakService,
    checkAchievements,
} from '../services/gamification.service';
import {
    getTodayProgress,
    updateTodayProgress,
    getRecentProgress,
    getTotalStats,
    getTodayString,
} from '../services/progress.service';
import { ACHIEVEMENTS } from '../services/achievements';
import type { GamificationState, DailyProgress, Achievement, LevelInfo } from '../types';

export function useDashboard() {
    const [gamification, setGamification] = useState<GamificationState | null>(null);
    const [todayProgress, setTodayProgress] = useState<DailyProgress | null>(null);
    const [recentProgress, setRecentProgress] = useState<DailyProgress[]>([]);
    const [totalStats, setTotalStats] = useState<{
        totalMessages: number;
        totalMinutes: number;
        totalXP: number;
        activeDays: number;
    } | null>(null);
    const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load initial data
    useEffect(() => {
        async function load() {
            setIsLoading(true);
            try {
                const [state, today, recent, stats] = await Promise.all([
                    loadState(),
                    getTodayProgress(),
                    getRecentProgress(7),
                    getTotalStats(),
                ]);
                setGamification(state);
                setTodayProgress(today);
                setRecentProgress(recent);
                setTotalStats(stats);
            } finally {
                setIsLoading(false);
            }
        }
        load();
    }, []);

    // Get current level info
    const levelInfo = gamification ? getLevelFromXP(gamification.totalXP) : null;
    const levelProgress = gamification ? getLevelProgress(gamification.totalXP) : null;

    // Add XP
    const addXP = useCallback(async (amount: number) => {
        if (!gamification) return;

        const result = await addXPService(amount, gamification);
        setGamification(result.state);

        // Update today's progress
        if (todayProgress) {
            const updated = await updateTodayProgress({
                xpEarned: todayProgress.xpEarned + amount,
            });
            setTodayProgress(updated);
        }

        return result;
    }, [gamification, todayProgress]);

    // Record a message sent
    const recordMessage = useCallback(async () => {
        if (!gamification || !todayProgress) return;

        // Update progress
        const updated = await updateTodayProgress({
            messagesCount: todayProgress.messagesCount + 1,
        });
        setTodayProgress(updated);

        // Add XP
        await addXP(10);

        // Update streak
        const today = getTodayString();
        const updatedState = updateStreakService(gamification, today);
        
        // Check achievements
        const stats = await getTotalStats();
        setTotalStats(stats);
        
        const { newAchievements: unlocked, updatedState: finalState } = checkAchievements(
            updatedState,
            { messagesCount: stats.totalMessages, practiceMinutes: stats.totalMinutes }
        );

        if (unlocked.length > 0) {
            setNewAchievements(unlocked);
        }

        await saveState(finalState);
        setGamification(finalState);
    }, [gamification, todayProgress, addXP]);

    // Clear new achievements notification
    const clearNewAchievements = useCallback(() => {
        setNewAchievements([]);
    }, []);

    // Get unlocked achievements
    const unlockedAchievements = gamification
        ? ACHIEVEMENTS.filter((a) => gamification.unlockedAchievements.includes(a.id))
            .map((a) => ({
                ...a,
                unlockedAt: Date.now(), // We don't store the exact time currently
            }))
        : [];

    // Get locked achievements
    const lockedAchievements = gamification
        ? ACHIEVEMENTS.filter((a) => !gamification.unlockedAchievements.includes(a.id))
        : ACHIEVEMENTS;

    return {
        // State
        gamification,
        todayProgress,
        recentProgress,
        totalStats,
        levelInfo,
        levelProgress,
        unlockedAchievements,
        lockedAchievements,
        newAchievements,
        isLoading,

        // Actions
        addXP,
        recordMessage,
        clearNewAchievements,
    };
}
