/**
 * Custom Application Error
 */

import { ErrorCode } from './error-codes';

export class AppError extends Error {
    public readonly code: ErrorCode;
    public readonly originalError?: unknown;
    public readonly timestamp: number;

    constructor(code: ErrorCode, message: string, originalError?: unknown) {
        super(message);
        this.name = 'AppError';
        this.code = code;
        this.originalError = originalError;
        this.timestamp = Date.now();

        // Maintains proper stack trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AppError);
        }
    }

    toJSON() {
        return {
            name: this.name,
            code: this.code,
            message: this.message,
            timestamp: this.timestamp,
        };
    }
}

/**
 * Create an AppError from an unknown error
 */
export function toAppError(error: unknown, defaultCode = ErrorCode.UNKNOWN_ERROR): AppError {
    if (error instanceof AppError) {
        return error;
    }

    if (error instanceof Error) {
        return new AppError(defaultCode, error.message, error);
    }

    return new AppError(defaultCode, String(error), error);
}
