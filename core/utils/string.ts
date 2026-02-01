/**
 * String Utilities
 */

/**
 * Truncate string with ellipsis
 */
export function truncate(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;
    return `${str.slice(0, maxLength - 3)}...`;
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Get initials from name (e.g., "John Doe" -> "JD")
 */
export function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

/**
 * Format number with commas (e.g., 1000 -> "1,000")
 */
export function formatNumber(num: number): string {
    return num.toLocaleString();
}

/**
 * Format duration in minutes to readable string
 */
export function formatDuration(minutes: number): string {
    if (minutes < 60) {
        return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

/**
 * Slugify string (e.g., "Hello World" -> "hello-world")
 */
export function slugify(str: string): string {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
