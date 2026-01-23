/**
 * Progress Hook
 * Manages progress data and statistics
 */

import { useCallback, useEffect, useState } from 'react';
import { type ProgressSummary, progressService } from '@/services/progress/progressService';
import { type UserProfile, userProfileService } from '@/services/storage/userProfile';

export const useProgress = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [summary, setSummary] = useState<ProgressSummary | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadProgress = useCallback(async () => {
        setIsLoading(true);
        try {
            const [userProfile, progressSummary] = await Promise.all([
                userProfileService.getProfile(),
                progressService.getProgressSummary(),
            ]);

            setProfile(userProfile);
            setSummary(progressSummary);
        } catch (error) {
            console.error('Error loading progress:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProgress();
    }, [loadProgress]);

    const refreshProgress = useCallback(() => {
        loadProgress();
    }, [loadProgress]);

    return {
        profile,
        summary,
        isLoading,
        refreshProgress,
    };
};
