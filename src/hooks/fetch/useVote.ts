import { mutateUserVote } from "@/hooks/mutate/useUserMutation";
import type { Vote } from "@/types/Vote";
import { errorVote, pendingVote } from "@/types/Vote";
import { dbg } from "@/util/debug";
import { auth, db } from "@/util/firebase";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";

//
//  FIREBASE
//

const fetchVote = async (pollID: string) => {
    if (auth.currentUser === null) throw new Error("User not logged in");

    const uid = auth.currentUser.uid;
    const voteRef = doc(db, "users", uid, "votes", pollID);
    const voteSnap = await getDoc(voteRef);

    dbg("READ", "Vote", pollID);

    // if there's no vote doc for the user, make it, then return
    if (voteSnap.exists() === false) {
        const blankVote: Vote = { pollID: pollID, choice: null };
        await mutateUserVote(blankVote);
        return blankVote;
    }

    // if there is, then return it
    return voteSnap.data() as Vote;
};

//
//  HOOK
//

export const useVote = (pollID: string) => {

    dbg("HOOK", "useVote", pollID);

    const { status, error, data } = useQuery({
        queryKey: ["vote", pollID],
        queryFn: () => fetchVote(pollID),
        staleTime: Number.POSITIVE_INFINITY, // TODO: figure out a good time
    });

    switch (status) {
        case "pending":
            return pendingVote(pollID);
        case "error": {
            console.error(error);
            return errorVote(pollID);
        }
    }

    return data;
};
