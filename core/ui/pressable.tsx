import { Pressable as RNPressable, type PressableProps as RNPressableProps } from 'react-native';

export interface PressableProps extends RNPressableProps {
    className?: string;
}

export function Pressable({ className, style, ...props }: PressableProps) {
    return <RNPressable className={className} style={style} {...props} />;
}
