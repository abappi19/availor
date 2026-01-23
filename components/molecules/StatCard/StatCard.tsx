import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View, type ViewStyle } from 'react-native';

export interface StatCardProps {
    icon: keyof typeof Ionicons.glyphMap;
    value: string;
    label: string;
    color?: string;
    style?: ViewStyle;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, value, label, color = '#2196F3', style }) => {
    return (
        <View className="bg-white rounded-2xl p-4 shadow-md mb-4 w-[48%]" style={style}>
            <View className="flex-row items-center mb-2">
                <View
                    className="w-10 h-10 rounded-full items-center justify-center"
                    style={{ backgroundColor: `${color}20` }}
                >
                    <Ionicons name={icon} size={20} color={color} />
                </View>
            </View>

            <Text className="text-2xl font-bold text-gray-900">{value}</Text>
            <Text className="text-sm text-gray-600 mt-1">{label}</Text>
        </View>
    );
};
