import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Stack } from 'expo-router';
import { Text } from '~/components/nativewindui/Text';
import { Slider } from '~/components/nativewindui/Slider';
import { Card, CardContent } from '~/components/nativewindui/Card';

export default function SliderScreen() {
    const [volume, setVolume] = React.useState(50);
    const [brightness, setBrightness] = React.useState(75);
    const [progress, setProgress] = React.useState(30);

    return (
        <>
            <Stack.Screen options={{ title: 'Slider' }} />
            <ScrollView className="flex-1 bg-background" contentContainerClassName="p-4 gap-6">
                <Text variant="title3">Volume</Text>
                <Card>
                    <CardContent>
                        <View className="flex-row items-center justify-between mb-2">
                            <Text color="secondary">Volume</Text>
                            <Text className="font-bold text-foreground">{volume}%</Text>
                        </View>
                        <Slider
                            value={volume}
                            min={0}
                            max={100}
                            step={1}
                            onValueChange={setVolume}
                        />
                    </CardContent>
                </Card>

                <Text variant="title3">Brightness</Text>
                <Card>
                    <CardContent>
                        <View className="flex-row items-center justify-between mb-2">
                            <Text color="secondary">Brightness</Text>
                            <Text className="font-bold text-foreground">{brightness}%</Text>
                        </View>
                        <Slider
                            value={brightness}
                            min={0}
                            max={100}
                            step={5}
                            onValueChange={setBrightness}
                        />
                    </CardContent>
                </Card>

                <Text variant="title3">Stepped (0–10)</Text>
                <Card>
                    <CardContent>
                        <View className="flex-row items-center justify-between mb-2">
                            <Text color="secondary">Rating</Text>
                            <Text className="font-bold text-foreground">{progress}</Text>
                        </View>
                        <Slider
                            value={progress}
                            min={0}
                            max={10}
                            step={1}
                            onValueChange={setProgress}
                        />
                    </CardContent>
                </Card>

                <Text variant="title3">Disabled</Text>
                <Slider value={60} disabled />
            </ScrollView>
        </>
    );
}
