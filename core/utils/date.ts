/**
 * Date Utilities
 */

import { format, formatDistanceToNow, isToday, isYesterday, startOfDay, differenceInDays } from 'date-fns';

/**
 * Format timestamp to time string (e.g., "2:30 PM")
 */
export function formatTime(timestamp: number): string {
    return format(new Date(timestamp), 'h:mm a');
}

/**
 * Format timestamp to date string (e.g., "Jan 28, 2026")
 */
export function formatDate(timestamp: number): string {
    return format(new Date(timestamp), 'MMM d, yyyy');
}

/**
 * Format timestamp to relative time (e.g., "5 minutes ago")
 */
export function formatRelativeTime(timestamp: number): string {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
}

/**
 * Format timestamp for message display
 */
export function formatMessageTime(timestamp: number): string {
    const date = new Date(timestamp);
    
    if (isToday(date)) {
        return format(date, 'h:mm a');
    }
    
    if (isYesterday(date)) {
        return `Yesterday ${format(date, 'h:mm a')}`;
    }
    
    return format(date, 'MMM d, h:mm a');
}

/**
 * Check if two timestamps are on the same day
 */
export function isSameDay(timestamp1: number, timestamp2: number): boolean {
    return startOfDay(new Date(timestamp1)).getTime() === startOfDay(new Date(timestamp2)).getTime();
}

/**
 * Get streak days between dates
 */
export function getStreakDays(lastActiveDate: number, currentDate: number = Date.now()): number {
    return differenceInDays(new Date(currentDate), new Date(lastActiveDate));
}
