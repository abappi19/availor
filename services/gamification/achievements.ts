/**
 * Achievement Definitions and Management
 */

import { Ionicons } from '@expo/vector-icons';

export type AchievementCategory = 'streak' | 'conversation' | 'practice' | 'milestone';

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
    category: AchievementCategory;
    requirement: number;
    rewardPoints: number;
}

export const achievementDefinitions: Achievement[] = [
    // Streak achievements
    {
        id: 'streak_3',
        name: 'Getting Started',
        description: 'Practice for 3 days in a row',
        icon: 'flame',
        category: 'streak',
        requirement: 3,
        rewardPoints: 50,
    },
    {
        id: 'streak_7',
        name: 'Week Warrior',
        description: 'Practice for 7 days in a row',
        icon: 'flame',
        category: 'streak',
        requirement: 7,
        rewardPoints: 100,
    },
    {
        id: 'streak_30',
        name: 'Month Master',
        description: 'Practice for 30 days in a row',
        icon: 'flame',
        category: 'streak',
        requirement: 30,
        rewardPoints: 500,
    },
    {
        id: 'streak_100',
        name: 'Century Club',
        description: 'Practice for 100 days in a row',
        icon: 'flame',
        category: 'streak',
        requirement: 100,
        rewardPoints: 2000,
    },

    // Conversation achievements
    {
        id: 'conv_10',
        name: 'Chatterbox',
        description: 'Complete 10 conversations',
        icon: 'chatbubbles',
        category: 'conversation',
        requirement: 10,
        rewardPoints: 100,
    },
    {
        id: 'conv_50',
        name: 'Social Butterfly',
        description: 'Complete 50 conversations',
        icon: 'chatbubbles',
        category: 'conversation',
        requirement: 50,
        rewardPoints: 300,
    },
    {
        id: 'conv_100',
        name: 'Conversation Expert',
        description: 'Complete 100 conversations',
        icon: 'chatbubbles',
        category: 'conversation',
        requirement: 100,
        rewardPoints: 1000,
    },

    // Practice time achievements
    {
        id: 'time_60',
        name: 'First Hour',
        description: 'Practice for 60 minutes total',
        icon: 'time',
        category: 'practice',
        requirement: 60,
        rewardPoints: 50,
    },
    {
        id: 'time_300',
        name: 'Dedicated Learner',
        description: 'Practice for 5 hours total',
        icon: 'time',
        category: 'practice',
        requirement: 300,
        rewardPoints: 200,
    },
    {
        id: 'time_1000',
        name: 'Practice Master',
        description: 'Practice for 1000 minutes total',
        icon: 'time',
        category: 'practice',
        requirement: 1000,
        rewardPoints: 1000,
    },

    // Milestone achievements
    {
        id: 'level_5',
        name: 'Rising Star',
        description: 'Reach level 5',
        icon: 'star',
        category: 'milestone',
        requirement: 5,
        rewardPoints: 100,
    },
    {
        id: 'level_10',
        name: 'Shining Bright',
        description: 'Reach level 10',
        icon: 'star',
        category: 'milestone',
        requirement: 10,
        rewardPoints: 300,
    },
    {
        id: 'level_25',
        name: 'Superstar',
        description: 'Reach level 25',
        icon: 'star',
        category: 'milestone',
        requirement: 25,
        rewardPoints: 1000,
    },
];

