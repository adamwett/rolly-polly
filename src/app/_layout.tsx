import "@/global.css";
import { Slot, Stack } from "expo-router";

export default function Root() {
    return (
        <Stack>
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
            <Stack.Screen name="(login)/index" options={{ headerShown: false }} />
        </Stack>
    );
}
