import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Stack } from 'expo-router';
import { Text } from '~/components/nativewindui/Text';
import { Select } from '~/components/nativewindui/Select';
import { Card, CardContent } from '~/components/nativewindui/Card';

const FRUIT_OPTIONS = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
    { label: 'Dragon Fruit', value: 'dragonfruit' },
    { label: 'Elderberry', value: 'elderberry' },
];

const SIZE_OPTIONS = [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
    { label: 'Extra Large', value: 'xl' },
];

export default function SelectScreen() {
    const [fruit, setFruit] = React.useState<string | undefined>();
    const [size, setSize] = React.useState<string | undefined>('md');

    return (
        <>
            <Stack.Screen options={{ title: 'Select' }} />
            <ScrollView className="flex-1 bg-background" contentContainerClassName="p-4 gap-6">
                <Text variant="title3">Basic Select</Text>
                <Select
                    options={FRUIT_OPTIONS}
                    value={fruit}
                    onValueChange={setFruit}
                    placeholder="Pick a fruit…"
                />
                {fruit && (
                    <Card>
                        <CardContent>
                            <Text color="secondary">
                                Selected: <Text className="font-bold text-foreground">{fruit}</Text>
                            </Text>
                        </CardContent>
                    </Card>
                )}

                <Text variant="title3" className="mt-4">Pre-selected</Text>
                <Select
                    options={SIZE_OPTIONS}
                    value={size}
                    onValueChange={setSize}
                />

                <Text variant="title3" className="mt-4">Disabled</Text>
                <Select
                    options={FRUIT_OPTIONS}
                    value="cherry"
                    disabled
                />
            </ScrollView>
        </>
    );
}
