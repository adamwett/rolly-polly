import type { Poll, PollOption } from "@/types/Poll";
import { errorPoll, pendingPoll } from "@/types/Poll";
import { dbg } from "@/util/debug"
import { db } from "@/util/firebase";
import { nowTimestamp } from "@/util/time";
import { useQuery } from "@tanstack/react-query";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";

const fetchPollOptions = async (pollID: string) => {

    const options: PollOption[] = [];

    // get all the poll options
    const optionsRef = collection(db, "polls", pollID, "options");
    const optionsQuery = query(optionsRef, orderBy("text"));
    const optionsSnap = await getDocs(optionsQuery);

    if (optionsSnap.empty) throw new Error(`Empty snapshot: poll/${pollID}/options`);

    // biome-ignore lint/complexity/noForEach: firebase uses this convention
    optionsSnap.forEach((option) => {
        options.push(option.data() as PollOption);
        dbg("READ", "PollOption", option.id); // debug in here to get an accurate size of reads
    });

    return options;
}

const fetchPoll = async (pollID: string) => {
    const pollRef = doc(db, "polls", pollID);
    const pollSnap = await getDoc(pollRef);
    dbg("READ", "Poll", pollID);

    if (pollSnap.exists() === false) throw new Error(`Empty snapshot: poll/${pollID}`);

    const pollData = {
        ...pollSnap.data(),
    } as Poll;

    pollData.options = await fetchPollOptions(pollID);

    return pollData;

};

export const usePoll = (id: string) => {
    dbg("HOOK", "usePoll", id);

    const { status, error, data } = useQuery({
        queryKey: ["poll", id],
        queryFn: () => fetchPoll(id),
        staleTime: 3600,
    });

    switch (status) {
        case "pending": return pendingPoll();
        case "error": {
            console.error(error);
            return errorPoll();
        }
    }

    return data;

};
