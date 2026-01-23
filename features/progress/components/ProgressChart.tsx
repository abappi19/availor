import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export interface ProgressChartProps {
    data: number[];
    labels: string[];
    title: string;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ data, labels, title }) => {
    const screenWidth = Dimensions.get('window').width - 48; // Padding

    // Ensure we have data to display
    const chartData = data.length > 0 ? data : [0];
    const chartLabels = labels.length > 0 ? labels : [''];

    return (
        <View className="bg-white rounded-2xl p-4 shadow-md mb-4">
            <Text className="text-lg font-bold text-gray-900 mb-3">{title}</Text>
            <LineChart
                data={{
                    labels: chartLabels,
                    datasets: [
                        {
                            data: chartData,
                        },
                    ],
                }}
                width={screenWidth}
                height={220}
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(117, 117, 117, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#2196F3',
                    },
                }}
                bezier
                style={{
                    borderRadius: 16,
                }}
            />
        </View>
    );
};
