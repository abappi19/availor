/**
 * Achievement Definitions
 */

import type { Achievement } from '../types';

export const ACHIEVEMENTS: Achievement[] = [
    // Streak Achievements
    {
        id: 'first-streak',
        title: 'First Streak',
        description: 'Practice 3 days in a row',
        icon: 'flame-outline',
        category: 'streak',
        requirement: 3,
        xpReward: 50,
    },
    {
        id: 'week-streak',
        title: 'Week Warrior',
        description: 'Practice 7 days in a row',
        icon: 'flame',
        category: 'streak',
        requirement: 7,
        xpReward: 150,
    },
    {
        id: 'month-streak',
        title: 'Dedicated Learner',
        description: 'Practice 30 days in a row',
        icon: 'flame',
        category: 'streak',
        requirement: 30,
        xpReward: 500,
    },

    // Conversation Achievements
    {
        id: 'first-chat',
        title: 'First Steps',
        description: 'Have your first conversation',
        icon: 'chatbubble-outline',
        category: 'conversation',
        requirement: 1,
        xpReward: 25,
    },
    {
        id: 'chatterbox',
        title: 'Chatterbox',
        description: 'Send 100 messages',
        icon: 'chatbubbles',
        category: 'conversation',
        requirement: 100,
        xpReward: 200,
    },
    {
        id: 'conversation-master',
        title: 'Conversation Master',
        description: 'Send 500 messages',
        icon: 'chatbubbles',
        category: 'conversation',
        requirement: 500,
        xpReward: 500,
    },

    // Practice Achievements
    {
        id: 'first-hour',
        title: 'First Hour',
        description: 'Practice for 60 minutes total',
        icon: 'time-outline',
        category: 'practice',
        requirement: 60,
        xpReward: 100,
    },
    {
        id: 'practice-pro',
        title: 'Practice Pro',
        description: 'Practice for 10 hours total',
        icon: 'time',
        category: 'practice',
        requirement: 600,
        xpReward: 300,
    },

    // Milestone Achievements
    {
        id: 'level-5',
        title: 'Rising Star',
        description: 'Reach level 5',
        icon: 'star-outline',
        category: 'milestone',
        requirement: 5,
        xpReward: 250,
    },
    {
        id: 'level-10',
        title: 'Legend',
        description: 'Reach level 10',
        icon: 'star',
        category: 'milestone',
        requirement: 10,
        xpReward: 1000,
    },
];

/**
 * Get achievement by ID
 */
export function getAchievement(id: string): Achievement | undefined {
    return ACHIEVEMENTS.find((a) => a.id === id);
}

/**
 * Get all achievements in a category
 */
export function getAchievementsByCategory(category: Achievement['category']): Achievement[] {
    return ACHIEVEMENTS.filter((a) => a.category === category);
}
