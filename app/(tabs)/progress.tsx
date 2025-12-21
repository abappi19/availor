import React from 'react';
import { View, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import { Heading, Text } from '@/components/atoms/Text';
import { StreakCounter } from '@/components/molecules/StreakCounter';
import { LevelBadge } from '@/components/molecules/LevelBadge';
import { StatCard } from '@/components/molecules/StatCard';
import { ProgressChart } from '@/features/progress/components/ProgressChart';
import { useProgress } from '@/features/progress/hooks/useProgress';

export default function ProgressScreen() {
  const { profile, summary, isLoading, refreshProgress } = useProgress();

  if (isLoading || !profile || !summary) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 items-center justify-center">
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refreshProgress} />}
      >
        {/* Header */}
        <View className="py-6">
          <Heading level="h1" className="mb-2">
            Your Progress
          </Heading>
          <Text variant="caption" size="lg">
            Keep learning every day! 🚀
          </Text>
        </View>

        {/* Level and Streak Row */}
        <View className="flex-row justify-between mb-6">
          <View className="flex-1 mr-3">
            <LevelBadge
              level={profile.level}
              currentXP={profile.currentXP}
              nextLevelXP={profile.nextLevelXP}
              size="lg"
            />
          </View>

          <View className="flex-1 ml-3 justify-center">
            <StreakCounter streakDays={profile.streak} isActive={true} />
          </View>
        </View>

        {/* Stats Grid */}
        <View className="flex-row flex-wrap justify-between mb-6">
          <StatCard
            icon="chatbubbles"
            value={summary.totalSessions.toString()}
            label="Conversations"
            color="#2196F3"
          />
          <StatCard
            icon="time"
            value={`${summary.totalMinutes}m`}
            label="Practice Time"
            color="#4CAF50"
          />
          <StatCard
            icon="trending-up"
            value={profile.englishLevel}
            label="English Level"
            color="#FF9800"
          />
          <StatCard
            icon="trophy"
            value={profile.totalPoints.toString()}
            label="Total Points"
            color="#FFD700"
          />
        </View>

        {/* Weekly Chart */}
        <ProgressChart
          data={summary.weeklyData}
          labels={weekLabels}
          title="This Week"
        />

        {/* Additional Info */}
        <View className="bg-white rounded-2xl p-6 shadow-md mb-4">
          <Text weight="semibold" size="lg" className="mb-4">
            Quick Stats
          </Text>
          <View className="space-y-3">
            <View className="flex-row justify-between">
              <Text variant="caption">Current Streak</Text>
              <Text weight="semibold">{profile.streak} days</Text>
            </View>
            <View className="flex-row justify-between">
              <Text variant="caption">Longest Streak</Text>
              <Text weight="semibold">{profile.longestStreak} days</Text>
            </View>
            <View className="flex-row justify-between">
              <Text variant="caption">Daily Goal</Text>
              <Text weight="semibold">{profile.dailyGoalMinutes} minutes</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

