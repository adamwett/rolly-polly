import { TabBarIcon } from '@/components/TabBarIcon';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "green",
                headerShown: false,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Today',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="previous"
                options={{
                    title: 'Previous',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={color} focused={focused} />
                    ),
                }}
            />
        </Tabs>
    );
}
