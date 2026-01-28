import { View, type ViewProps } from 'react-native';

export interface HStackProps extends ViewProps {
    className?: string;
    space?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const spaceStyles: Record<string, string> = {
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4',
    xl: 'gap-6',
};

export function HStack({ className = '', space = 'md', style, ...props }: HStackProps) {
    return (
        <View
            className={`flex-row items-center ${spaceStyles[space]} ${className}`}
            style={style}
            {...props}
        />
    );
}
