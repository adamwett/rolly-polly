import { type OldPoll, errorOldPolls, pendingOldPolls } from "@/types/OldPoll";
import { dbg } from "@/util/debug";
import { db } from "@/util/firebase";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

//
// FIREBASE
//

// TODO: pagination
const fetchOldPolls = async () => {
    const oldPollsRef = collection(db, "old");
    const oldQuery = query(oldPollsRef, orderBy("timestamp", "desc"), limit(5));
    const oldSnap = await getDocs(oldQuery);
    dbg("READ", "OldPolls", oldSnap.size);

    const oldPollData: OldPoll[] = [];
    // biome-ignore lint: firebase uses this convention
    oldSnap.forEach((poll) => {
        oldPollData.push(poll.data() as OldPoll);
    });

    return oldPollData;
};

//
// HOOK
//

export const useOldPolls = () => {
    dbg("HOOK", "useOldPolls");

    const { status, error, data } = useQuery({
        queryKey: ["old"],
        queryFn: fetchOldPolls,
        staleTime: 86400,
    });

    switch (status) {
        case "pending": return pendingOldPolls();
        case "error": {
            console.error(error);
            return errorOldPolls();
        }
    }

    return data;
};
