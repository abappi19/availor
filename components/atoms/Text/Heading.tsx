import React from 'react';
import { Text as RNText, type TextStyle } from 'react-native';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';

export interface HeadingProps {
    children: React.ReactNode;
    level?: HeadingLevel;
    color?: string;
    className?: string;
    style?: TextStyle;
}

export const Heading: React.FC<HeadingProps> = ({ children, level = 'h1', color, className = '', style }) => {
    const getLevelClasses = () => {
        const levelClasses = {
            h1: 'text-3xl font-bold text-gray-900',
            h2: 'text-2xl font-bold text-gray-900',
            h3: 'text-xl font-semibold text-gray-900',
            h4: 'text-lg font-semibold text-gray-900',
        };
        return levelClasses[level];
    };

    return (
        <RNText className={`${getLevelClasses()} ${className}`} style={[color ? { color } : {}, style]}>
            {children}
        </RNText>
    );
};
