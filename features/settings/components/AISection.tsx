/**
 * AISection Component
 */

import React from 'react';
import { Box, Text, VStack, Divider } from '@/core/ui';
import type { AIPersonalization } from '@/core/types';
import { SettingRow } from './SettingRow';

interface AISectionProps {
    settings: AIPersonalization | null;
    onUpdateSetting?: (key: keyof AIPersonalization, value: any) => void;
}

const TEACHING_STYLE_LABELS: Record<AIPersonalization['teachingStyle'], string> = {
    encouraging: 'Encouraging',
    balanced: 'Balanced',
    direct: 'Direct',
};

const FORMALITY_LABELS: Record<AIPersonalization['formality'], string> = {
    casual: 'Casual',
    formal: 'Formal',
    mixed: 'Mixed',
};

const CORRECTION_LABELS: Record<AIPersonalization['correctionFrequency'], string> = {
    every_mistake: 'Every Mistake',
    major_errors: 'Major Errors Only',
    end_of_conversation: 'End of Conversation',
    minimal: 'Minimal',
};

const PACE_LABELS: Record<AIPersonalization['learningPace'], string> = {
    intensive: 'Intensive',
    moderate: 'Moderate',
    relaxed: 'Relaxed',
};

export function AISection({ settings, onUpdateSetting }: AISectionProps) {
    if (!settings) {
        return (
            <Box className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                <Text className="text-gray-500 dark:text-gray-400 text-center">No AI settings found</Text>
            </Box>
        );
    }

    return (
        <Box className="bg-white dark:bg-gray-800 rounded-2xl px-4 border border-gray-100 dark:border-gray-700">
            <SettingRow
                title="Teaching Style"
                subtitle="How the AI interacts with you"
                icon="school-outline"
                iconColor="#2196F3"
                iconBgColor="#EBF5FF"
                type="select"
                value={TEACHING_STYLE_LABELS[settings.teachingStyle]}
                onPress={() => {}}
            />
            
            <Divider />
            
            <SettingRow
                title="Formality"
                subtitle="Language style used"
                icon="chatbubble-ellipses-outline"
                iconColor="#9C27B0"
                iconBgColor="#F3E5F5"
                type="select"
                value={FORMALITY_LABELS[settings.formality]}
                onPress={() => {}}
            />
            
            <Divider />
            
            <SettingRow
                title="Correction Frequency"
                subtitle="When to correct mistakes"
                icon="checkmark-circle-outline"
                iconColor="#4CAF50"
                iconBgColor="#E8F5E9"
                type="select"
                value={CORRECTION_LABELS[settings.correctionFrequency]}
                onPress={() => {}}
            />
            
            <Divider />
            
            <SettingRow
                title="Learning Pace"
                subtitle="How fast to progress"
                icon="speedometer-outline"
                iconColor="#FF9800"
                iconBgColor="#FFF3E0"
                type="select"
                value={PACE_LABELS[settings.learningPace]}
                onPress={() => {}}
            />
        </Box>
    );
}
