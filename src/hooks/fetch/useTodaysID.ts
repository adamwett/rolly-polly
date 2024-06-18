import { dbg } from "@/util/debug";
import { db } from "@/util/firebase";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

const fetchTodaysID = async () => {
    const cRef = collection(db, "polls");
    const q = query(cRef, orderBy("timestamp", "desc"), limit(1));
    const snap = await getDocs(q);
    if (snap.empty) throw new Error("Empty snapshot in fetchToday");
    return snap.docs[0].id;
}

export const useTodaysID = () => {

    dbg("HOOK", "useTodaysID");

    const { status, error, data } = useQuery({
        queryKey: ["todaysid"],
        queryFn: fetchTodaysID,
        staleTime: 86400, // TODO: figure out a good time
    });

    switch (status) {
        case "pending":
            return null;
        case "error": {
            console.error(error);
            return null;
        }
    }

    return data;
};
