import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Button } from '@/components/atoms/Button';
import { TextInput } from '@/components/atoms/Input';
import { Heading } from '@/components/atoms/Text';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface WelcomeScreenProps {
    onNext: (name: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
    const [name, setName] = useState('');

    const handleNext = () => {
        if (name.trim()) {
            onNext(name.trim());
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gradient-to-b from-primary-500 to-primary-700">
            <View className="flex-1 justify-center px-6">
                <AnimatedView entering={FadeInDown.delay(100).duration(600)} className="mb-12">
                    <Text className="text-6xl text-center mb-4">👋</Text>
                    <Heading level="h1" className="text-white text-center mb-4">
                        Welcome to Availor
                    </Heading>
                    <Text className="text-white text-lg text-center opacity-90">Your personal AI English teacher</Text>
                </AnimatedView>

                <AnimatedView entering={FadeInDown.delay(300).duration(600)} className="mb-8">
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        placeholder="What's your name?"
                        label="Let's get started!"
                        containerStyle={{ marginBottom: 24 }}
                        style={{ backgroundColor: 'white' }}
                    />

                    <Button onPress={handleNext} disabled={!name.trim()} variant="secondary" size="lg" fullWidth>
                        Continue
                    </Button>
                </AnimatedView>

                <AnimatedView entering={FadeInDown.delay(500).duration(600)}>
                    <Text className="text-white text-sm text-center opacity-75">
                        We&apos;ll help you improve your English through personalized lessons
                    </Text>
                </AnimatedView>
            </View>
        </SafeAreaView>
    );
};
