import type { Poll } from "@/types/Poll";
import { errorPoll, pendingPoll } from "@/types/Poll";
import { db } from "@/util/firebase";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";

const fetchPoll = async (id: string) => {
    const pollsRef = collection(db, "polls");
    const q = query(pollsRef, where("id", "==", id));
    const snapshot = await getDocs(q);
    if (snapshot.empty)
        throw new Error(`No poll found in database with id: ${id}`);
    return snapshot.docs[0].data() as Poll;
};

export const usePoll = (id: string) => {

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
