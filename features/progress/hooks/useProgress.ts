/**
 * Progress Hook
 * Manages progress data and statistics
 */

import { useState, useEffect, useCallback } from 'react';
import { userProfileService, UserProfile } from '@/services/storage/userProfile';
import { progressService, ProgressSummary } from '@/services/progress/progressService';
import { gamificationService } from '@/services/gamification/gamificationService';

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

