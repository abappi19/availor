/**
 * Validation Utilities
 */

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate name (2-50 characters)
 */
export function isValidName(name: string): boolean {
    const trimmed = name.trim();
    return trimmed.length >= 2 && trimmed.length <= 50;
}

/**
 * Validate message content
 */
export function validateMessage(content: string, maxLength = 500): { valid: boolean; error?: string } {
    const trimmed = content.trim();
    
    if (!trimmed) {
        return { valid: false, error: 'Message cannot be empty' };
    }
    
    if (trimmed.length > maxLength) {
        return { valid: false, error: `Message too long (max ${maxLength} characters)` };
    }
    
    return { valid: true };
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Validate number is in range
 */
export function isInRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
}
