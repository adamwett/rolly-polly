import type { OldPoll } from "@/types/OldPoll";
import { Text, View } from "react-native";

type OldPollViewProps = {
    poll: OldPoll;
};

export const OldPollView = (props: OldPollViewProps) => {

    const { poll } = props;

    return (
        <View>
            <Text>{poll.question}</Text>
            {poll.results.map(
                (result) => (
                    <View key={result.option}>
                        <Text>{result.option}</Text>
                        <Text>{result.votes}</Text>
                    </View>
                )
            )}
        </View>
    )
}
