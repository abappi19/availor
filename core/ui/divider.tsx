import { View } from 'react-native';

export interface DividerProps {
    className?: string;
    orientation?: 'horizontal' | 'vertical';
}

export function Divider({ className = '', orientation = 'horizontal' }: DividerProps) {
    const orientationClass =
        orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full';

    return <View className={`bg-gray-200 dark:bg-gray-700 ${orientationClass} ${className}`} />;
}
