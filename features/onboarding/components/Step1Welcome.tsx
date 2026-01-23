import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Button } from '@/components/atoms/Button';
import { TextInput } from '@/components/atoms/Input';
import { Heading } from '@/components/atoms/Text';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface Step1WelcomeProps {
    onNext: (name: string) => void;
}

export const Step1Welcome: React.FC<Step1WelcomeProps> = ({ onNext }) => {
    const [name, setName] = useState('');

    const handleNext = () => {
        if (name.trim()) {
            onNext(name.trim());
        }
    };

    return (
        <SafeAreaView className="flex-1">
            <LinearGradient
                colors={['#2196F3', '#1976D2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                className="flex-1"
            >
                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}
                >
                    <AnimatedView entering={FadeInDown.delay(100).duration(600)} className="mb-12">
                        <Text className="text-7xl text-center mb-6">🌟</Text>
                        <Heading level="h1" className="text-white text-center mb-4">
                            Welcome to Availor
                        </Heading>
                        <Text className="text-white text-lg text-center opacity-90 mb-6">
                            Your AI-powered English learning companion
                        </Text>
                        <View className="bg-white/20 rounded-2xl p-4">
                            <Text className="text-white text-center">
                                We&apos;ll spend the next few minutes getting to know you so we can personalize your
                                learning experience perfectly.
                            </Text>
                        </View>
                    </AnimatedView>

                    <AnimatedView entering={FadeInDown.delay(300).duration(600)} className="mb-8">
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            placeholder="What's your name?"
                            placeholderTextColor="#90CAF9"
                            label="Let's start with the basics"
                            containerStyle={{ marginBottom: 24 }}
                            style={{ backgroundColor: 'white' }}
                        />

                        <Button onPress={handleNext} disabled={!name.trim()} variant="secondary" size="lg" fullWidth>
                            Begin My Journey →
                        </Button>
                    </AnimatedView>

                    <AnimatedView entering={FadeInDown.delay(500).duration(600)}>
                        <Text className="text-white text-sm text-center opacity-75">
                            ⏱️ Takes 10-12 minutes • 📊 11 steps • 🎯 100% personalized
                        </Text>
                    </AnimatedView>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
};
