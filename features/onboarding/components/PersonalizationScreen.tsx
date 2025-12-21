import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Button } from '@/components/atoms/Button';
import { Heading } from '@/components/atoms/Text';
import { LearningStyle } from '@/services/storage/userProfile';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface PersonalizationScreenProps {
  onComplete: (data: {
    interests: string[];
    goals: string[];
    learningStyle: LearningStyle;
    dailyGoalMinutes: number;
  }) => void;
  onBack: () => void;
  loading?: boolean;
}

const interestOptions = [
  '💼 Business English',
  '✈️ Travel',
  '🎬 Movies & TV',
  '📚 Reading',
  '🎮 Gaming',
  '🍳 Cooking',
  '⚽ Sports',
  '🎵 Music',
  '💻 Technology',
  '🌍 Culture',
];

const goalOptions = [
  'Improve conversation skills',
  'Prepare for exams (IELTS, TOEFL)',
  'Business communication',
  'Academic writing',
  'Pronunciation',
  'Grammar and vocabulary',
];

const learningStyles: Array<{ value: LearningStyle; label: string; icon: string }> = [
  { value: 'visual', label: 'Visual', icon: '👁️' },
  { value: 'auditory', label: 'Auditory', icon: '👂' },
  { value: 'reading', label: 'Reading/Writing', icon: '📖' },
  { value: 'kinesthetic', label: 'Hands-on', icon: '✋' },
];

const dailyGoalOptions = [5, 10, 15, 30, 45, 60];

export const PersonalizationScreen: React.FC<PersonalizationScreenProps> = ({
  onComplete,
  onBack,
  loading = false,
}) => {
  const [interests, setInterests] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [learningStyle, setLearningStyle] = useState<LearningStyle>('visual');
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(15);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const toggleGoal = (goal: string) => {
    setGoals((prev) => (prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]));
  };

  const handleComplete = () => {
    onComplete({ interests, goals, learningStyle, dailyGoalMinutes });
  };

  const canContinue = interests.length > 0 && goals.length > 0;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
        <AnimatedView entering={FadeInDown.delay(100).duration(600)} className="mb-8">
          <Heading level="h2" className="mb-2">
            Personalize Your Learning
          </Heading>
          <Text className="text-gray-600">Help us tailor lessons just for you</Text>
        </AnimatedView>

        {/* Interests */}
        <AnimatedView entering={FadeInDown.delay(200).duration(600)} className="mb-8">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            What interests you? (Select at least 1)
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {interestOptions.map((interest) => (
              <TouchableOpacity
                key={interest}
                onPress={() => toggleInterest(interest)}
                className={`px-4 py-2 rounded-full border-2 ${
                  interests.includes(interest)
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <Text
                  className={`${
                    interests.includes(interest) ? 'text-primary-700' : 'text-gray-700'
                  }`}
                >
                  {interest}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </AnimatedView>

        {/* Goals */}
        <AnimatedView entering={FadeInDown.delay(300).duration(600)} className="mb-8">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Your learning goals (Select at least 1)
          </Text>
          {goalOptions.map((goal) => (
            <TouchableOpacity
              key={goal}
              onPress={() => toggleGoal(goal)}
              className={`p-3 mb-2 rounded-xl border-2 ${
                goals.includes(goal)
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <Text
                className={`${goals.includes(goal) ? 'text-primary-700' : 'text-gray-700'}`}
              >
                {goal}
              </Text>
            </TouchableOpacity>
          ))}
        </AnimatedView>

        {/* Learning Style */}
        <AnimatedView entering={FadeInDown.delay(400).duration(600)} className="mb-8">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Preferred learning style
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {learningStyles.map((style) => (
              <TouchableOpacity
                key={style.value}
                onPress={() => setLearningStyle(style.value)}
                className={`flex-1 min-w-[45%] p-4 rounded-xl border-2 items-center ${
                  learningStyle === style.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <Text className="text-3xl mb-2">{style.icon}</Text>
                <Text
                  className={`font-medium ${
                    learningStyle === style.value ? 'text-primary-700' : 'text-gray-700'
                  }`}
                >
                  {style.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </AnimatedView>

        {/* Daily Goal */}
        <AnimatedView entering={FadeInDown.delay(500).duration(600)} className="mb-8">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Daily practice goal
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {dailyGoalOptions.map((minutes) => (
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
        <AnimatedView entering={FadeInDown.delay(600).duration(600)} className="gap-3">
          <Button
            onPress={handleComplete}
            disabled={!canContinue}
            loading={loading}
            variant="primary"
            size="lg"
            fullWidth
          >
            Complete Setup
          </Button>

          <Button onPress={onBack} variant="ghost" size="lg" fullWidth disabled={loading}>
            Back
          </Button>
        </AnimatedView>
      </ScrollView>
    </SafeAreaView>
  );
};

