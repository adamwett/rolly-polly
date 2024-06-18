import type { PollOption } from "@/types/Poll";
import type { Vote } from "@/types/Vote";
import { db } from "@/util/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { collection, doc, getDocs, increment, updateDoc } from "firebase/firestore";
import { useVote } from "../fetch/useVote";


//
//  MUTATIONS
//

type MutatePollParams = {
    newVote: Vote,
    oldVote: Vote,
}


const mutuatePollOptions = async (params: MutatePollParams) => {

    const { newVote, oldVote } = params;

    console.log("MPO: ", params);

    // if we keep the same vote, don't do anything
    if (newVote.choice === oldVote.choice) {
        console.log("SAME VOTE");
        return;
    }

    // put all of the options into a list
    const optionsRef = collection(db, "polls", newVote.pollID, "options");
    const optionsSnap = await getDocs(optionsRef);
    if (optionsSnap.empty) throw new Error(`Options snap empty for poll ${newVote.pollID}`);
    const optionList: PollOption[] = [];
    // biome-ignore lint/complexity/noForEach: firebase uses this convention
    optionsSnap.forEach((option) => {
        const data = option.data() as PollOption;
        optionList.push(data);
    });

    // iterate thru the list and update the docs for each option when necessary
    // biome-ignore lint/complexity/noForEach: the for..of didnt work
    optionList.forEach(async (option) => {
        // console.log("OPTION: ", option.id);
        const optionRef = doc(db, "polls", newVote.pollID, "options", option.id);

        if (option.id === newVote.choice) {
            console.log("increment ", option.id);
            // increment the new chosen vote counter
            await updateDoc(optionRef, { count: increment(1) });
        } else {
            // only decrement other counters if there was a previous choice
            if (oldVote.choice !== null) {
                console.log("decrement ", option.id);
                await updateDoc(optionRef, { count: increment(-1) });
            }
        }
    })

};

//
//  HOOK
//

export const usePollMutation = () => {

    return useMutation({
        mutationFn: (params: MutatePollParams) => mutuatePollOptions(params), // pass the vote into .mutate
        onMutate: () => console.log("upm: mutating"),
        onError: () => console.error("upm: error"),
        onSuccess: () => {
            console.log("upm: bang!");
            // TODO: invalidate the query somehow
        },
    });
};
