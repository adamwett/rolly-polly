import type { Poll } from "@/types/Poll";
import { errorPoll, pendingPoll } from "@/types/Poll";
import { db } from "@/util/firebase";
import { midnightTimestamp } from "@/util/time";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";

const fetchDailyPoll = async () => {
    const pollsRef = collection(db, "polls");
    const ts = midnightTimestamp();
    const q = query(pollsRef, where("timestamp", "==", ts));
    const snapshot = await getDocs(q);
    if (snapshot.empty) throw new Error(`No daily poll found in database. TS:  ${ts.seconds}`);
    return snapshot.docs[0].data() as Poll;
};

export const useDailyPoll = () => {

    const { status, error, data } = useQuery({
        queryKey: ["poll", "daily"],
        queryFn: fetchDailyPoll,
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
