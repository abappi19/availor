import { Text, View } from 'react-native';

export interface ProgressProps {
    className?: string;
    value: number; // 0-100
    colorScheme?: 'primary' | 'success' | 'warning' | 'error';
    size?: 'sm' | 'md' | 'lg';
    showValue?: boolean;
}

const colorStyles: Record<string, string> = {
    primary: 'bg-primary-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    error: 'bg-error-500',
};

const sizeStyles: Record<string, string> = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
};

export function Progress({
    className = '',
    value,
    colorScheme = 'primary',
    size = 'md',
    showValue = false,
}: ProgressProps) {
    const clampedValue = Math.min(Math.max(value, 0), 100);

    return (
        <View className={className}>
            <View className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${sizeStyles[size]}`}>
                <View
                    className={`${sizeStyles[size]} ${colorStyles[colorScheme]} rounded-full`}
                    style={{ width: `${clampedValue}%` }}
                />
            </View>
            {showValue && (
                <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">{Math.round(clampedValue)}%</Text>
            )}
        </View>
    );
}
