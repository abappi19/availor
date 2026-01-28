import { View, type ViewProps } from 'react-native';

export interface VStackProps extends ViewProps {
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

export function VStack({ className = '', space = 'md', style, ...props }: VStackProps) {
    return <View className={`${spaceStyles[space]} ${className}`} style={style} {...props} />;
}
