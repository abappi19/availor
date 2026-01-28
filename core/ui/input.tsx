import {
    TextInput as RNTextInput,
    type TextInputProps as RNTextInputProps,
    Text,
    useColorScheme,
    View,
} from 'react-native';

export interface InputProps extends RNTextInputProps {
    className?: string;
    label?: string;
    error?: string;
    helperText?: string;
}

export function Input({ className = '', label, error, helperText, style, ...props }: InputProps) {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <View className="w-full">
            {label && <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</Text>}
            <RNTextInput
                className={`bg-white dark:bg-gray-800 border rounded-xl px-4 py-3 text-base text-gray-900 dark:text-white ${error ? 'border-error-500' : 'border-gray-300 dark:border-gray-600'
                    } ${className}`}
                placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
                style={style}
                {...props}
            />
            {helperText && !error && (
                <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">{helperText}</Text>
            )}
            {error && <Text className="text-sm text-error-500 mt-1">{error}</Text>}
        </View>
    );
}
