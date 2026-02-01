/**
 * Assessment Service - Level assessment logic
 */

import type { EnglishLevel } from '@/core/types';
import { QUIZ_QUESTIONS } from '../constants';
import type { QuizQuestion } from '../types';

/**
 * Get quiz questions for assessment
 */
export function getQuizQuestions(): QuizQuestion[] {
    return QUIZ_QUESTIONS;
}

/**
 * Calculate English level based on quiz answers
 */
export function calculateLevel(answers: Record<string, number>): EnglishLevel {
    let score = 0;
    let total = 0;

    for (const question of QUIZ_QUESTIONS) {
        const userAnswer = answers[question.id];
        if (userAnswer !== undefined) {
            total++;
            if (userAnswer === question.correctAnswer) {
                // Weight by difficulty
                switch (question.difficulty) {
                    case 'A1':
                        score += 1;
                        break;
                    case 'A2':
                        score += 2;
                        break;
                    case 'B1':
                        score += 3;
                        break;
                    case 'B2':
                        score += 4;
                        break;
                    case 'C1':
                        score += 5;
                        break;
                    case 'C2':
                        score += 6;
                        break;
                }
            }
        }
    }

    // Calculate percentage of max possible score
    const maxScore = QUIZ_QUESTIONS.reduce((sum, q) => {
        switch (q.difficulty) {
            case 'A1': return sum + 1;
            case 'A2': return sum + 2;
            case 'B1': return sum + 3;
            case 'B2': return sum + 4;
            case 'C1': return sum + 5;
            case 'C2': return sum + 6;
            default: return sum;
        }
    }, 0);

    const percentage = (score / maxScore) * 100;

    // Map percentage to level
    if (percentage >= 80) return 'C1';
    if (percentage >= 65) return 'B2';
    if (percentage >= 50) return 'B1';
    if (percentage >= 35) return 'A2';
    return 'A1';
}

/**
 * Get level description
 */
export function getLevelDescription(level: EnglishLevel): { title: string; description: string } {
    const descriptions: Record<EnglishLevel, { title: string; description: string }> = {
        A1: {
            title: 'Beginner',
            description: 'You can understand and use basic phrases.',
        },
        A2: {
            title: 'Elementary',
            description: 'You can communicate in simple, routine tasks.',
        },
        B1: {
            title: 'Intermediate',
            description: 'You can handle most situations while traveling.',
        },
        B2: {
            title: 'Upper Intermediate',
            description: 'You can interact with fluency and spontaneity.',
        },
        C1: {
            title: 'Advanced',
            description: 'You can express ideas fluently and precisely.',
        },
        C2: {
            title: 'Proficient',
            description: 'You can understand virtually everything with ease.',
        },
    };

    return descriptions[level];
}
