import React from 'react';
import {
    TextInput as RNTextInput,
    type TextInputProps as RNTextInputProps,
    Text,
    View,
    type ViewStyle,
} from 'react-native';

export interface TextInputProps extends RNTextInputProps {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    containerStyle?: ViewStyle;
}

export const TextInput: React.FC<TextInputProps> = ({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    containerStyle,
    ...textInputProps
}) => {
    return (
        <View style={containerStyle}>
            {label && <Text className="text-sm font-medium text-gray-700 mb-2">{label}</Text>}

            <View
                className={`flex-row items-center border-2 rounded-xl px-4 ${
                    error ? 'border-error-500' : 'border-gray-200 focus:border-primary-500'
                }`}
            >
                {leftIcon && <View className="mr-2">{leftIcon}</View>}

                <RNTextInput
                    className="flex-1 py-3 text-base text-gray-900"
                    placeholderTextColor="#9E9E9E"
                    {...textInputProps}
                />

                {rightIcon && <View className="ml-2">{rightIcon}</View>}
            </View>

            {error && <Text className="text-sm text-error-500 mt-1">{error}</Text>}

            {helperText && !error && <Text className="text-sm text-gray-600 mt-1">{helperText}</Text>}
        </View>
    );
};
