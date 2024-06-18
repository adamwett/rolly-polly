import { PollView } from "@/components/PollView";
import { TomorrowView } from "@/components/TomorrowView";
import { useTodaysID } from "@/hooks/fetch/useTodaysID";
import { dbg } from "@/util/debug";
import { SafeAreaView, Text, View } from "react-native";

export default function TodayScreen() {

    dbg("RENDER", "TodayScreen");

    const dailyID = useTodaysID();

    return (
        <SafeAreaView className="bg-gray-800">
            <View className="p-2">
                <PollView pollID={dailyID} />
                <View className="flex-row items-center p-2 mb-1 bg-gray-900 rounded-md items-center-center h-7">
                    <Text className="text-xxs text-white font-bold ">Ideas for tomorrow:</Text>
                </View>

                <TomorrowView />
                <TomorrowView />
                <TomorrowView />
            </View>
        </SafeAreaView>
    );
}
