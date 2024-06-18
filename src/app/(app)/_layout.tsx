import { TabBarIcon } from "@/components/TabBarIcon";
import { dbg } from "@/util/debug";
import { auth } from "@/util/firebase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Redirect, Tabs } from "expo-router";
import React from "react";

const qc = new QueryClient();

const options = {
    tabBarActiveTintColor: "green",
    headerShown: false,
};

export default function TabLayout() {


    dbg("RENDER", "TabLayout");

    if (auth.currentUser === null) return <Redirect href="(login)/index" />;

    const qc = new QueryClient();


    return (
        <QueryClientProvider client={qc}>
            <Tabs screenOptions={options}>
                <Tabs.Screen name="today"
                    options={{
                        title: "Today",
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? "calendar" : "calendar-outline"} color={color} focused={focused} />
                        ),
                    }}
                />
                <Tabs.Screen name="previous"
                    options={{
                        title: "Previous",
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? "code" : "code-outline"} color={color} focused={focused} />
                        ),
                    }}
                />
            </Tabs>
        </QueryClientProvider>
    );
}
