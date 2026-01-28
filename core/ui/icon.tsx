import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

export type IconName = ComponentProps<typeof Ionicons>['name'];

export interface IconProps {
    className?: string;
    name: IconName;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    color?: string;
}

const sizeMap: Record<string, number> = {
    xs: 12,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
};

export function Icon({ name, size = 'md', color = '#374151', className }: IconProps) {
    return <Ionicons name={name} size={sizeMap[size]} color={color} className={className} />;
}
