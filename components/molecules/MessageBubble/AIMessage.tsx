import { LinearGradient } from 'expo-linear-gradient';
import React, { memo } from 'react';
import { Text, View } from 'react-native';

export interface AIMessageProps {
    message: string;
    timestamp?: number;
    isStreaming?: boolean;
}

// Memoized to prevent re-renders unless props actually change
export const AIMessage = memo<AIMessageProps>(
    ({ message, timestamp, isStreaming }) => {
        return (
            <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                {/* AI Avatar */}
                <View
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 12,
                        overflow: 'hidden',
                    }}
                >
                    <LinearGradient
                        colors={['#2196F3', '#7B1FA2']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>AI</Text>
                    </LinearGradient>
                </View>

                {/* Message Bubble */}
                <View style={{ flex: 1, maxWidth: '75%' }}>
                    <View
                        style={{
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
                        }}
                    >
                        <Text style={{ color: '#111827', fontSize: 16, lineHeight: 24 }}>
                            {message}
                            {isStreaming && <Text style={{ color: '#2196F3' }}>▊</Text>}
                        </Text>
                        {timestamp && !isStreaming && (
                            <Text style={{ color: '#6b7280', fontSize: 12, marginTop: 4 }}>
                                {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Text>
                        )}
                    </View>
                </View>
            </View>
        );
    },
    (prevProps, nextProps) => {
        // Custom comparison - only re-render if message content actually changed
        // This prevents unnecessary re-renders for streaming updates
        return prevProps.message === nextProps.message && prevProps.isStreaming === nextProps.isStreaming;
    }
);
