import React from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeInLeft } from 'react-native-reanimated';

export interface UserMessageProps {
    message: string;
    timestamp?: number;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export const UserMessage: React.FC<UserMessageProps> = ({ message, timestamp }) => {
    return (
        <AnimatedView
            entering={FadeInLeft.duration(300)}
            style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginBottom: 16,
            }}
        >
            <View
                style={{
                    maxWidth: '80%',
                    backgroundColor: '#2196F3',
                    borderRadius: 16,
                    borderTopRightRadius: 4,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                }}
            >
                <Text style={{ color: '#fff', fontSize: 16, lineHeight: 24 }}>{message}</Text>
                {timestamp && (
                    <Text style={{ color: '#fff', fontSize: 12, opacity: 0.7, marginTop: 4 }}>
                        {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                )}
            </View>
        </AnimatedView>
    );
};
