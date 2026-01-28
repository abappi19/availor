import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

export interface TextProps extends RNTextProps {
    className?: string;
}

export function Text({ className, style, ...props }: TextProps) {
    return <RNText className={className} style={style} {...props} />;
}
