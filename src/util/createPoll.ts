import type { Poll } from "@/types/Poll";
import { db } from "@/util/firebase";
import { doc, setDoc } from "firebase/firestore";

// TODO: add auth check
export const createPoll = (poll: Poll) => {
    const ref = doc(db, "polls", poll.id);
    setDoc(ref, poll);
};
