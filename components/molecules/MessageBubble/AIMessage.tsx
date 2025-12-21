import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export interface AIMessageProps {
  message: string;
  timestamp?: number;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export const AIMessage: React.FC<AIMessageProps> = ({ message, timestamp }) => {
  return (
    <AnimatedView 
      entering={FadeInRight.duration(300)} 
      style={{ flexDirection: 'row', marginBottom: 16 }}
    >
      {/* AI Avatar */}
      <View style={{ 
        width: 40, 
        height: 40, 
        borderRadius: 20, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginRight: 12,
        overflow: 'hidden'
      }}>
        <LinearGradient
          colors={['#2196F3', '#7B1FA2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ 
            width: '100%', 
            height: '100%', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>AI</Text>
        </LinearGradient>
      </View>

      {/* Message Bubble */}
      <View style={{ flex: 1, maxWidth: '75%' }}>
        <View style={{ 
          backgroundColor: '#fff', 
          borderRadius: 16,
          borderTopLeftRadius: 4,
          paddingHorizontal: 16, 
          paddingVertical: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}>
          <Text style={{ color: '#111827', fontSize: 16, lineHeight: 24 }}>{message}</Text>
          {timestamp && (
            <Text style={{ color: '#6b7280', fontSize: 12, marginTop: 4 }}>
              {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          )}
        </View>
      </View>
    </AnimatedView>
  );
};

