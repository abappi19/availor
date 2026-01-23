import React from 'react';
import { Image, Text, View, type ViewStyle } from 'react-native';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
    source?: { uri: string } | number;
    name?: string;
    size?: AvatarSize;
    style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({ source, name, size = 'md', style }) => {
    const getSizeClasses = () => {
        const sizeMap = {
            sm: 'w-8 h-8',
            md: 'w-12 h-12',
            lg: 'w-16 h-16',
            xl: 'w-24 h-24',
        };
        return sizeMap[size];
    };

    const getTextSize = () => {
        const textSizeMap = {
            sm: 'text-xs',
            md: 'text-base',
            lg: 'text-xl',
            xl: 'text-3xl',
        };
        return textSizeMap[size];
    };

    const getInitials = (name: string) => {
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <View
            className={`${getSizeClasses()} rounded-full items-center justify-center bg-primary-100 overflow-hidden`}
            style={style}
        >
            {source ? (
                <Image source={source} className="w-full h-full" resizeMode="cover" />
            ) : name ? (
                <Text className={`${getTextSize()} font-semibold text-primary-700`}>{getInitials(name)}</Text>
            ) : (
                <View className="w-full h-full bg-gray-300" />
            )}
        </View>
    );
};
