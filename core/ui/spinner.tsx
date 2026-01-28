import { ActivityIndicator, type ActivityIndicatorProps } from 'react-native';

export interface SpinnerProps extends Omit<ActivityIndicatorProps, 'size'> {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    color?: string;
}

const sizeMap: Record<string, 'small' | 'large'> = {
    sm: 'small',
    md: 'small',
    lg: 'large',
};

export function Spinner({ className, size = 'md', color = '#2196F3', ...props }: SpinnerProps) {
    return (
        <ActivityIndicator
            size={sizeMap[size]}
            color={color}
            className={className}
            {...props}
        />
    );
}
