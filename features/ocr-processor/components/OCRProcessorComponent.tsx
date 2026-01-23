import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { Button } from '@/components/atoms/Button';
import { Heading } from '@/components/atoms/Text';
import { ocrService } from '@/services/executorch/ocr';

export interface OCRProcessorProps {
    onTextExtracted: (text: string, imageUri: string) => void;
    onCancel?: () => void;
}

export const OCRProcessorComponent: React.FC<OCRProcessorProps> = ({ onTextExtracted, onCancel }) => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [extractedText, setExtractedText] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);

    const scanLine = useSharedValue(-100);

    useEffect(() => {
        pickImage();
    }, [pickImage]);

    useEffect(() => {
        if (isProcessing) {
            // Animate scanning line
            scanLine.value = withRepeat(
                withSequence(
                    withTiming(100, { duration: 2000, easing: Easing.linear }),
                    withTiming(-100, { duration: 0 })
                ),
                -1,
                false
            );
        }
    }, [
        isProcessing, // Animate scanning line
        scanLine,
    ]);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to extract text from images!');
            onCancel?.();
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled && result.assets[0]) {
            setImageUri(result.assets[0].uri);
            processImage(result.assets[0].uri);
        } else {
            onCancel?.();
        }
    };

    const processImage = async (uri: string) => {
        setIsProcessing(true);
        setProgress(0);

        // Simulate progress
        const progressInterval = setInterval(() => {
            setProgress((prev) => Math.min(prev + 10, 90));
        }, 200);

        try {
            const result = await ocrService.extractText(uri);
            clearInterval(progressInterval);
            setProgress(100);
            setExtractedText(result.text);
        } catch (error) {
            clearInterval(progressInterval);
            console.error('OCR error:', error);
            alert('Failed to extract text from image');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleConfirm = () => {
        if (extractedText && imageUri) {
            onTextExtracted(extractedText, imageUri);
        }
    };

    const scanLineStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: scanLine.value }],
    }));

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 p-6">
                <Heading level="h2" className="mb-4">
                    Extract Text from Image
                </Heading>

                {/* Image Preview */}
                {imageUri && (
                    <View className="mb-6 rounded-2xl overflow-hidden border-2 border-gray-200">
                        <Image source={{ uri: imageUri }} className="w-full h-64" resizeMode="cover" />

                        {/* Scanning animation */}
                        {isProcessing && (
                            <View className="absolute inset-0 justify-center items-center">
                                <View className="absolute inset-0 bg-black/20" />
                                <Animated.View
                                    className="w-full h-1 bg-primary-500"
                                    style={[{ position: 'absolute', top: '50%' }, scanLineStyle]}
                                />
                                <View className="bg-white/90 px-6 py-3 rounded-full">
                                    <Text className="text-primary-600 font-semibold">Reading text... {progress}%</Text>
                                </View>
                            </View>
                        )}
                    </View>
                )}

                {/* Progress indicator */}
                {isProcessing && (
                    <View className="mb-6">
                        <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <View className="h-full bg-primary-500" style={{ width: `${progress}%` }} />
                        </View>
                    </View>
                )}

                {/* Extracted text */}
                {extractedText && !isProcessing && (
                    <View className="flex-1 mb-6">
                        <Text className="text-lg font-semibold text-gray-900 mb-2">Extracted Text:</Text>
                        <View className="flex-1 bg-gray-50 rounded-2xl p-4 border border-gray-200">
                            <Text className="text-base text-gray-900 leading-relaxed">{extractedText}</Text>
                        </View>
                    </View>
                )}

                {/* Actions */}
                {!isProcessing && (
                    <View className="gap-3">
                        {extractedText ? (
                            <>
                                <Button onPress={handleConfirm} variant="primary" size="lg" fullWidth>
                                    Use This Text
                                </Button>
                                <Button onPress={pickImage} variant="outline" size="lg" fullWidth>
                                    Choose Another Image
                                </Button>
                                <Button onPress={onCancel} variant="ghost" size="lg" fullWidth>
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <Button onPress={onCancel} variant="ghost" size="lg" fullWidth>
                                Cancel
                            </Button>
                        )}
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};
