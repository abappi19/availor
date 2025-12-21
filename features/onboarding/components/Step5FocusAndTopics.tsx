import { Button } from '@/components/atoms/Button';
import { Heading } from '@/components/atoms/Text';
import { FocusArea } from '@/services/storage/aiPersonalization';
import { LearningStyle } from '@/services/storage/userProfile';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);

const focusAreaOptions: { value: FocusArea; label: string; icon: string }[] = [
  { value: 'grammar', label: 'Grammar', icon: '📝' },
  { value: 'vocabulary', label: 'Vocabulary', icon: '📚' },
  { value: 'pronunciation', label: 'Pronunciation', icon: '🗣️' },
  { value: 'fluency', label: 'Fluency', icon: '💬' },
  { value: 'writing', label: 'Writing', icon: '✍️' },
  { value: 'listening', label: 'Listening', icon: '👂' },
];

const topicOptions = [
  '💼 Business English',
  '✈️ Travel',
  '🎬 Movies & TV',
  '📚 Reading & Literature',
  '🎮 Gaming',
  '🍳 Cooking & Food',
  '⚽ Sports',
  '🎵 Music',
  '💻 Technology',
  '🌍 Culture & Society',
  '🔬 Science',
  '🎨 Art & Design',
];

const learningStyleOptions: { value: LearningStyle; label: string; desc: string }[] = [
  { value: 'visual', label: 'Visual', desc: 'I learn best by seeing' },
  { value: 'auditory', label: 'Auditory', desc: 'I learn best by listening' },
  { value: 'reading', label: 'Reading/Writing', desc: 'I learn best by reading and writing' },
  { value: 'kinesthetic', label: 'Hands-on', desc: 'I learn best by doing' },
];

export interface Step5FocusAndTopicsProps {
  onNext: (data: {
    primaryFocusAreas: FocusArea[];
    secondaryFocusAreas: FocusArea[];
    preferredTopics: string[];
    learningStyle: LearningStyle;
  }) => void;
  onBack: () => void;
}

export const Step5FocusAndTopics: React.FC<Step5FocusAndTopicsProps> = ({ onNext, onBack }) => {
  const [primaryFocusAreas, setPrimaryFocusAreas] = useState<FocusArea[]>([]);
  const [secondaryFocusAreas, setSecondaryFocusAreas] = useState<FocusArea[]>([]);
  const [preferredTopics, setPreferredTopics] = useState<string[]>([]);
  const [learningStyle, setLearningStyle] = useState<LearningStyle>('visual');

  const togglePrimaryFocus = (area: FocusArea) => {
    setPrimaryFocusAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const toggleSecondaryFocus = (area: FocusArea) => {
    setSecondaryFocusAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const toggleTopic = (topic: string) => {
    setPreferredTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleNext = () => {
    if (primaryFocusAreas.length > 0 && preferredTopics.length > 0) {
      onNext({
        primaryFocusAreas,
        secondaryFocusAreas,
        preferredTopics,
        learningStyle,
      });
    }
  };

  const canContinue = primaryFocusAreas.length > 0 && preferredTopics.length > 0;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
        <AnimatedView entering={FadeInDown.delay(100).duration(600)} className="mb-8">
          <Heading level="h2" className="mb-2">
            What Should We Focus On?
          </Heading>
          <Text className="text-gray-600 text-lg">
            Tell us what you want to improve
          </Text>
        </AnimatedView>

        {/* Primary Focus Areas */}
        <AnimatedView entering={FadeInDown.delay(200).duration(600)} className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Primary Focus (Select 1-3)
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {focusAreaOptions.map((area) => (
              <TouchableOpacity
                key={area.value}
                onPress={() => togglePrimaryFocus(area.value)}
                disabled={!primaryFocusAreas.includes(area.value) && primaryFocusAreas.length >= 3}
                className={`px-4 py-3 rounded-xl border-2 flex-row items-center ${
                  primaryFocusAreas.includes(area.value)
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 bg-white'
                } ${!primaryFocusAreas.includes(area.value) && primaryFocusAreas.length >= 3 ? 'opacity-40' : ''}`}
              >
                <Text className="mr-2">{area.icon}</Text>
                <Text
                  className={`font-medium ${
                    primaryFocusAreas.includes(area.value) ? 'text-primary-700' : 'text-gray-700'
                  }`}
                >
                  {area.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </AnimatedView>

        {/* Secondary Focus Areas */}
        <AnimatedView entering={FadeInDown.delay(300).duration(600)} className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Secondary Focus (Optional)
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {focusAreaOptions
              .filter((area) => !primaryFocusAreas.includes(area.value))
              .map((area) => (
                <TouchableOpacity
                  key={area.value}
                  onPress={() => toggleSecondaryFocus(area.value)}
                  className={`px-4 py-3 rounded-xl border-2 flex-row items-center ${
                    secondaryFocusAreas.includes(area.value)
                      ? 'border-success-500 bg-success-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <Text className="mr-2">{area.icon}</Text>
                  <Text
                    className={`font-medium ${
                      secondaryFocusAreas.includes(area.value) ? 'text-success-700' : 'text-gray-700'
                    }`}
                  >
                    {area.label}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </AnimatedView>

        {/* Preferred Topics */}
        <AnimatedView entering={FadeInDown.delay(400).duration(600)} className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Topics You&apos;re Interested In (Select at least 1)
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {topicOptions.map((topic) => (
              <TouchableOpacity
                key={topic}
                onPress={() => toggleTopic(topic)}
                className={`px-4 py-2 rounded-full border-2 ${
                  preferredTopics.includes(topic)
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <Text
                  className={`${
                    preferredTopics.includes(topic) ? 'text-primary-700' : 'text-gray-700'
                  }`}
                >
                  {topic}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </AnimatedView>

        {/* Learning Style */}
        <AnimatedView entering={FadeInDown.delay(500).duration(600)} className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Learning Style
          </Text>
          {learningStyleOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => setLearningStyle(option.value)}
              className={`p-4 mb-3 rounded-xl border-2 ${
                learningStyle === option.value
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <Text
                className={`font-semibold text-base ${
                  learningStyle === option.value ? 'text-primary-700' : 'text-gray-900'
                }`}
              >
                {option.label}
              </Text>
              <Text className="text-gray-600 text-sm mt-1">{option.desc}</Text>
            </TouchableOpacity>
          ))}
        </AnimatedView>

        {/* Actions */}
        <View className="gap-3 pb-6">
          <Button
            onPress={handleNext}
            disabled={!canContinue}
            variant="primary"
            size="lg"
            fullWidth
          >
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

