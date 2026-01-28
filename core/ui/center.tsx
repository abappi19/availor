import { View, type ViewProps } from 'react-native';

export interface CenterProps extends ViewProps {
    className?: string;
}

export function Center({ className = '', style, ...props }: CenterProps) {
    return <View className={`items-center justify-center ${className}`} style={style} {...props} />;
}
