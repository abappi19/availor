import { Button } from '@/components/atoms/Button';
import { Heading } from '@/components/atoms/Text';
import {
    CorrectionFrequency,
    LearningPace,
    TeachingStyle,
} from '@/services/storage/aiPersonalization';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface Step4PreferencesProps {
  onNext: (data: {
    teachingStyle: TeachingStyle;
    formality: 'casual' | 'formal' | 'mixed';
    correctionFrequency: CorrectionFrequency;
    explainCorrections: boolean;
    learningPace: LearningPace;
    dailyGoalMinutes: number;
    practiceFrequency: 'daily' | 'few_times_week' | 'weekly';
  }) => void;
  onBack: () => void;
}

export const Step4Preferences: React.FC<Step4PreferencesProps> = ({ onNext, onBack }) => {
  const [teachingStyle, setTeachingStyle] = useState<TeachingStyle>('balanced');
  const [formality, setFormality] = useState<'casual' | 'formal' | 'mixed'>('mixed');
  const [correctionFrequency, setCorrectionFrequency] = useState<CorrectionFrequency>('major_errors');
  const [explainCorrections] = useState(true);
  const [learningPace, setLearningPace] = useState<LearningPace>('moderate');
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(15);
  const [practiceFrequency] = useState<'daily' | 'few_times_week' | 'weekly'>('daily');

  const handleNext = () => {
    onNext({
      teachingStyle,
      formality,
      correctionFrequency,
      explainCorrections,
      learningPace,
      dailyGoalMinutes,
      practiceFrequency,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
        <AnimatedView entering={FadeInDown.delay(100).duration(600)} className="mb-8">
          <Heading level="h2" className="mb-2">
            Personalize Your Learning
          </Heading>
          <Text className="text-gray-600 text-lg">
            Let&apos;s customize how the AI teaches you
          </Text>
        </AnimatedView>

        {/* Teaching Style */}
        <AnimatedView entering={FadeInDown.delay(200).duration(600)} className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Teaching Style
          </Text>
          {[
            { value: 'encouraging' as TeachingStyle, label: 'Encouraging', desc: 'Lots of praise and positive reinforcement' },
            { value: 'balanced' as TeachingStyle, label: 'Balanced', desc: 'Mix of encouragement and constructive feedback' },
            { value: 'direct' as TeachingStyle, label: 'Direct', desc: 'Straightforward and efficiency-focused' },
          ].map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => setTeachingStyle(option.value)}
              className={`p-4 mb-3 rounded-xl border-2 ${
                teachingStyle === option.value
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <Text
                className={`font-semibold text-base ${
                  teachingStyle === option.value ? 'text-primary-700' : 'text-gray-900'
                }`}
              >
                {option.label}
              </Text>
              <Text className="text-gray-600 text-sm mt-1">{option.desc}</Text>
            </TouchableOpacity>
          ))}
        </AnimatedView>

        {/* Formality */}
        <AnimatedView entering={FadeInDown.delay(300).duration(600)} className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Communication Style
          </Text>
          <View className="flex-row gap-3">
            {[
              { value: 'casual' as const, label: 'Casual' },
              { value: 'mixed' as const, label: 'Mixed' },
              { value: 'formal' as const, label: 'Formal' },
            ].map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => setFormality(option.value)}
                className={`flex-1 p-4 rounded-xl border-2 items-center ${
                  formality === option.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <Text
                  className={`font-semibold ${
                    formality === option.value ? 'text-primary-700' : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </AnimatedView>

        {/* Correction Frequency */}
        <AnimatedView entering={FadeInDown.delay(400).duration(600)} className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            How often should I correct you?
          </Text>
          {[
            { value: 'every_mistake' as CorrectionFrequency, label: 'Every mistake', desc: 'Correct all errors immediately' },
            { value: 'major_errors' as CorrectionFrequency, label: 'Major errors only', desc: 'Focus on important mistakes' },
            { value: 'end_of_conversation' as CorrectionFrequency, label: 'End summary', desc: 'Summary at the end' },
            { value: 'minimal' as CorrectionFrequency, label: 'Minimal', desc: 'Focus on fluency, not accuracy' },
          ].map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => setCorrectionFrequency(option.value)}
              className={`p-4 mb-3 rounded-xl border-2 ${
                correctionFrequency === option.value
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <Text
                className={`font-semibold text-base ${
                  correctionFrequency === option.value ? 'text-primary-700' : 'text-gray-900'
                }`}
              >
                {option.label}
              </Text>
              <Text className="text-gray-600 text-sm mt-1">{option.desc}</Text>
            </TouchableOpacity>
          ))}
        </AnimatedView>

        {/* Learning Pace */}
        <AnimatedView entering={FadeInDown.delay(500).duration(600)} className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Learning Pace
          </Text>
          <View className="flex-row gap-3">
            {[
              { value: 'intensive' as LearningPace, label: 'Fast' },
              { value: 'moderate' as LearningPace, label: 'Moderate' },
              { value: 'relaxed' as LearningPace, label: 'Relaxed' },
            ].map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => setLearningPace(option.value)}
                className={`flex-1 p-4 rounded-xl border-2 items-center ${
                  learningPace === option.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <Text
                  className={`font-semibold ${
                    learningPace === option.value ? 'text-primary-700' : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </AnimatedView>

        {/* Daily Goal */}
        <AnimatedView entering={FadeInDown.delay(600).duration(600)} className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Daily Practice Goal
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {[5, 10, 15, 20, 30, 45].map((minutes) => (
              <TouchableOpacity
                key={minutes}
                onPress={() => setDailyGoalMinutes(minutes)}
                className={`px-6 py-3 rounded-xl border-2 ${
                  dailyGoalMinutes === minutes
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <Text
                  className={`font-medium ${
                    dailyGoalMinutes === minutes ? 'text-primary-700' : 'text-gray-700'
                  }`}
                >
                  {minutes} min
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </AnimatedView>

        {/* Actions */}
        <View className="gap-3 pb-6">
          <Button onPress={handleNext} variant="primary" size="lg" fullWidth>
            Continue
          </Button>
          <Button onPress={onBack} variant="ghost" size="lg" fullWidth>
            Back
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

