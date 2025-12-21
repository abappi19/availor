import { Button } from '@/components/atoms/Button';
import { Heading } from '@/components/atoms/Text';
import { EnglishLevel } from '@/services/storage/userProfile';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);

const levelDescriptions: Record<EnglishLevel, string> = {
  'A1': 'Beginner - Starting your English journey',
  'A2': 'Elementary - Building basic skills',
  'B1': 'Intermediate - Can handle everyday situations',
  'B2': 'Upper Intermediate - Confident in most contexts',
  'C1': 'Advanced - Near-native proficiency',
  'C2': 'Mastery - Highly proficient',
};

export interface Step6CompletionProps {
  name: string;
  englishLevel: EnglishLevel;
  primaryGoal: string;
  isLoading: boolean;
  onComplete: () => void;
}

export const Step6Completion: React.FC<Step6CompletionProps> = ({
  name,
  englishLevel,
  primaryGoal,
  isLoading,
  onComplete,
}) => {
  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={['#4CAF50', '#2E7D32']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="flex-1"
      >
        <View className="flex-1 justify-center items-center p-6">
          <AnimatedView entering={FadeInUp.delay(100).duration(800)} className="items-center mb-12">
            <Text className="text-8xl mb-6">🎉</Text>
            <Heading level="h1" className="text-white text-center mb-4">
              You&apos;re All Set, {name}!
            </Heading>
            <Text className="text-white text-lg text-center opacity-90 mb-8">
              Your AI English teacher is ready and personalized just for you
            </Text>
          </AnimatedView>

          <AnimatedView entering={FadeInDown.delay(400).duration(800)} className="w-full">
            {/* Summary Cards */}
            <View className="bg-white/20 rounded-2xl p-5 mb-4 backdrop-blur">
              <View className="flex-row items-center mb-2">
                <Text className="text-3xl mr-3">📊</Text>
                <View className="flex-1">
                  <Text className="text-white font-semibold text-base">Your Level</Text>
                  <Text className="text-white text-lg font-bold">{englishLevel}</Text>
                  <Text className="text-white/80 text-sm">{levelDescriptions[englishLevel]}</Text>
                </View>
              </View>
            </View>

            <View className="bg-white/20 rounded-2xl p-5 mb-4 backdrop-blur">
              <View className="flex-row items-center mb-2">
                <Text className="text-3xl mr-3">🎯</Text>
                <View className="flex-1">
                  <Text className="text-white font-semibold text-base">Primary Goal</Text>
                  <Text className="text-white text-lg">{primaryGoal}</Text>
                </View>
              </View>
            </View>

            <View className="bg-white/20 rounded-2xl p-5 mb-8 backdrop-blur">
              <Text className="text-white font-semibold text-center mb-2">
                ✨ Your AI is configured to:
              </Text>
              <Text className="text-white/90 text-sm text-center">
                Match your learning style • Correct at your pace • Focus on your goals • Discuss your interests
              </Text>
            </View>

            <Button
              onPress={onComplete}
              disabled={isLoading}
              variant="secondary"
              size="lg"
              fullWidth
            >
              {isLoading ? 'Setting up...' : 'Start Learning →'}
            </Button>
          </AnimatedView>

          <AnimatedView entering={FadeInDown.delay(800).duration(800)} className="mt-8">
            <Text className="text-white text-center opacity-75 text-sm">
              You can change these settings anytime in your profile
            </Text>
          </AnimatedView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

