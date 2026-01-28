import { View, type ViewProps } from 'react-native';

export interface CardProps extends ViewProps {
    className?: string;
    variant?: 'elevated' | 'outline' | 'filled';
}

const variantStyles: Record<string, string> = {
    elevated: 'bg-white dark:bg-gray-800 rounded-2xl ios:shadow-sm android:elevation-2',
    outline: 'bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700',
    filled: 'bg-gray-50 dark:bg-gray-900 rounded-2xl',
};

export function Card({ className = '', variant = 'elevated', style, ...props }: CardProps) {
    return <View className={`${variantStyles[variant]} ${className}`} style={style} {...props} />;
}
