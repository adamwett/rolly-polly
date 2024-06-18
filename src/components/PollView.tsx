import { usePoll } from "@/hooks/fetch/usePoll";
import { useVote } from "@/hooks/fetch/useVote";
import { usePollMutation } from "@/hooks/mutate/usePollMutation";
import { mutateUserVote } from "@/hooks/mutate/useUserMutation";
import type { PollOption } from "@/types/Poll";
import type { Vote } from "@/types/Vote";
import { dbg } from "@/util/debug";
import { useQueryClient } from "@tanstack/react-query";
import { Text, TouchableOpacity, View } from "react-native";

type PollViewProps = {
    pollID: string | null;
};

type PollOptionViewProps = {
    pollID: string;
    option: PollOption;
    selected: boolean;
    mutator: (vote: Vote) => void;
};

const PollOptionView = (props: PollOptionViewProps) => {

    const { pollID, option, selected, mutator } = props;

    const newVote: Vote = { pollID: pollID, choice: option.id };

    const color = selected ? "bg-green-500" : "bg-gray-500";
    const style = `flex-1 flex-col ${color} border-2 border-white rounded-md m-2`;

    const handlePress = () => {
        mutator(newVote);
    };

    return (
        <TouchableOpacity className={style} onPress={handlePress}>
            <Text className="text-lg text-white text-center">{option.text}</Text>
            <Text className="text-xs text-white text-center">{option.count}</Text>
        </TouchableOpacity>
    );
};

export const PollView = (props: PollViewProps) => {
    dbg("RENDER", "PollView");
    const { pollID } = props;

    if (pollID === null) {
        return (<Text>Invalid Poll ID</Text>);
    }

    const poll = usePoll(pollID);
    const vote = useVote(pollID);

    const pollMutation = usePollMutation();
    const qc = useQueryClient();

    const mutator = (newVote: Vote) => {

        const params = { newVote: newVote, oldVote: vote }

        mutateUserVote(params.newVote);

        pollMutation.mutate(params, {
            onSuccess: () => {
                qc.invalidateQueries({ queryKey: ["poll", pollID] });
                qc.invalidateQueries({ queryKey: ["vote", pollID] });
                console.log("SUCCESS!");
            },
        })
    }

    // TODO: handle pending and error

    // console.log("POLL: ", poll);

    return (
        <View>
            <Text className="text-xl text-white text-center">{poll.question}</Text>
            <View className="flex-row justify-evenly p-2">
                {poll.options.map((option) => (
                    <PollOptionView
                        key={option.id}
                        pollID={pollID}
                        option={option}
                        selected={vote.choice === option.id}
                        mutator={mutator}
                    />
                ))}
            </View>
        </View>
    );
};
