import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Stack } from 'expo-router';
import { Text } from '~/components/nativewindui/Text';
import { Separator } from '~/components/nativewindui/Separator';
import { Card, CardContent } from '~/components/nativewindui/Card';

export default function SeparatorScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Separator' }} />
            <ScrollView className="flex-1 bg-background" contentContainerClassName="p-4 gap-6">
                <Text variant="title3">Horizontal Separator</Text>
                <Card>
                    <CardContent className="gap-3">
                        <Text>Item one</Text>
                        <Separator />
                        <Text>Item two</Text>
                        <Separator />
                        <Text>Item three</Text>
                    </CardContent>
                </Card>

                <Text variant="title3">Vertical Separator</Text>
                <Card>
                    <CardContent>
                        <View className="flex-row items-center gap-4 py-2">
                            <Text>Left</Text>
                            <Separator orientation="vertical" className="h-6" />
                            <Text>Center</Text>
                            <Separator orientation="vertical" className="h-6" />
                            <Text>Right</Text>
                        </View>
                    </CardContent>
                </Card>

                <Text variant="title3">In a Settings-style List</Text>
                <Card>
                    <CardContent className="gap-0">
                        <View className="flex-row items-center justify-between py-3">
                            <Text>Notifications</Text>
                            <Text color="secondary">On</Text>
                        </View>
                        <Separator />
                        <View className="flex-row items-center justify-between py-3">
                            <Text>Dark Mode</Text>
                            <Text color="secondary">System</Text>
                        </View>
                        <Separator />
                        <View className="flex-row items-center justify-between py-3">
                            <Text>Language</Text>
                            <Text color="secondary">English</Text>
                        </View>
                    </CardContent>
                </Card>
            </ScrollView>
        </>
    );
}
