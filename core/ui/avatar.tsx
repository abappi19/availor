import { Image, type ImageSourcePropType, Text, View } from 'react-native';

export interface AvatarProps {
    className?: string;
    source?: ImageSourcePropType;
    name?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeStyles: Record<string, { container: string; text: string; size: number }> = {
    sm: { container: 'w-8 h-8', text: 'text-xs', size: 32 },
    md: { container: 'w-10 h-10', text: 'text-sm', size: 40 },
    lg: { container: 'w-14 h-14', text: 'text-lg', size: 56 },
    xl: { container: 'w-20 h-20', text: 'text-2xl', size: 80 },
};

function getInitials(name: string): string {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

export function Avatar({ className = '', source, name, size = 'md' }: AvatarProps) {
    const sizeConfig = sizeStyles[size];

    if (source) {
        return (
            <Image
                source={source}
                className={`rounded-full ${sizeConfig.container} ${className}`}
                style={{ width: sizeConfig.size, height: sizeConfig.size }}
            />
        );
    }

    return (
        <View
            className={`rounded-full bg-primary-100 dark:bg-primary-900 items-center justify-center ${sizeConfig.container} ${className}`}
        >
            <Text className={`font-semibold text-primary-700 dark:text-primary-300 ${sizeConfig.text}`}>
                {name ? getInitials(name) : '?'}
            </Text>
        </View>
    );
}
