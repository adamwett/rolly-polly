import { OldPollView } from "@/components/OldPollView";
import { useOldPolls } from "@/hooks/fetch/useOldPolls";
import { DuplicateDocument } from "@/util/misc";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";


export default function PreviousScreen() {

    const oldPolls = useOldPolls();

    if (oldPolls[0].id === "pending" || oldPolls[0].id === "error") {
        return (
            <SafeAreaView className="bg-gray-600">
                <View className="flex flex-row bg-gray-800 p-2 m-2 rounded-lg">
                    <View className="text-white text-lg">
                        <Text>Loading...</Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="bg-gray-600">
            <View>
                <FlatList
                    className="h-full"
                    data={oldPolls}
                    renderItem={({ item }) => <OldPollView poll={item} />}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </SafeAreaView>
    );
}
