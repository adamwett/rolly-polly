import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type LikeViewProps = {
    likes: number;
    selected: boolean;
}

const LikeView = (props: LikeViewProps) => {

    const { selected, likes } = props;

    const color = selected ? "white" : "green";
    const icon = selected ? "thumbs-up" : "thumbs-up-outline";

    const handlePress = () => {
        console.log("Like button pressed");
    }

    return (
        <TouchableOpacity className="flex-row justify-evenly items-center w-7 h-5" onPress={handlePress}>
            <Ionicons className="flex-1" name={icon} size={24} color={color} />
            <Text className="text-white text-xxs flex-1 text-center">{likes}</Text>
        </TouchableOpacity>
    )
}

export const TomorrowView = () => {

    return (
        <View className="flex-row justify-between items-center px-2 py-1 bg-gray-600 rounded-md my-1 h-7">
            <Text className="text-white">Should I use this poll tomorrow?</Text>
            <LikeView selected={true} likes={69} />
        </View>
    )
};
