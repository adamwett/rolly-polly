import { Stack } from 'expo-router';
import 'react-native-reanimated';
import "../global.css";
import { db } from "@/util/firebase";
import { collection, doc, setDoc } from "firebase/firestore";


export default function RootLayout() {

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
}
