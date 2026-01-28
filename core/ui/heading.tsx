import { Text as RNText, type TextProps } from 'react-native';

export interface HeadingProps extends TextProps {
    className?: string;
    level?: 'h1' | 'h2' | 'h3' | 'h4';
}

const levelStyles: Record<string, string> = {
    h1: 'text-3xl font-bold text-gray-900 dark:text-white',
    h2: 'text-2xl font-bold text-gray-900 dark:text-white',
    h3: 'text-xl font-semibold text-gray-900 dark:text-white',
    h4: 'text-lg font-semibold text-gray-900 dark:text-white',
};

export function Heading({ className = '', level = 'h1', style, ...props }: HeadingProps) {
    const levelClass = levelStyles[level];
    return <RNText className={`${levelClass} ${className}`} style={style} {...props} />;
}
