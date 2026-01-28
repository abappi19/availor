/**
 * Onboarding Feature Constants
 */

import type { QuizQuestion } from './types';

export const INTERESTS = [
    'Business English',
    'Travel',
    'Academic English',
    'Daily Conversation',
    'Technology',
    'Culture & Entertainment',
    'Sports',
    'Health & Fitness',
];

export const DAILY_GOAL_OPTIONS = [
    { value: 5, label: '5 min', description: 'Casual' },
    { value: 15, label: '15 min', description: 'Regular' },
    { value: 30, label: '30 min', description: 'Serious' },
    { value: 60, label: '60 min', description: 'Intensive' },
];

export const FOCUS_AREAS = [
    'Grammar',
    'Vocabulary',
    'Pronunciation',
    'Conversation',
    'Writing',
    'Reading',
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        id: 'q1',
        question: 'Complete the sentence: "She ___ to the store yesterday."',
        options: ['go', 'goes', 'went', 'going'],
        correctAnswer: 2,
        difficulty: 'A1',
    },
    {
        id: 'q2',
        question: 'Which sentence is correct?',
        options: [
            'I have been living here since 2 years.',
            'I have been living here for 2 years.',
            'I am living here since 2 years.',
            'I live here since 2 years.',
        ],
        correctAnswer: 1,
        difficulty: 'B1',
    },
    {
        id: 'q3',
        question: 'Choose the correct word: "The meeting was ___ until next week."',
        options: ['postponed', 'delayed', 'cancelled', 'prevented'],
        correctAnswer: 0,
        difficulty: 'B2',
    },
    {
        id: 'q4',
        question: 'What does "to break the ice" mean?',
        options: [
            'To damage something',
            'To start a conversation in a social situation',
            'To cool down',
            'To make problems worse',
        ],
        correctAnswer: 1,
        difficulty: 'B2',
    },
    {
        id: 'q5',
        question: 'Which sentence uses the third conditional correctly?',
        options: [
            'If I would have known, I would have helped.',
            'If I had known, I would have helped.',
            'If I knew, I would helped.',
            'If I have known, I would help.',
        ],
        correctAnswer: 1,
        difficulty: 'C1',
    },
];
