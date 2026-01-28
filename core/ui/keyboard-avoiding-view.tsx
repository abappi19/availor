import {
    KeyboardAvoidingView as RNKeyboardAvoidingView,
    type KeyboardAvoidingViewProps as RNKeyboardAvoidingViewProps,
    Platform,
} from 'react-native';

export interface KeyboardAvoidingViewProps extends RNKeyboardAvoidingViewProps {
    className?: string;
}

export function KeyboardAvoidingView({ className, style, ...props }: KeyboardAvoidingViewProps) {
    return (
        <RNKeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className={className}
            style={style}
            {...props}
        />
    );
}
