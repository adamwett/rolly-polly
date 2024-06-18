import type { Vote } from "@/types/Vote";
import { blankTimestamp, nowTimestamp } from "@/util/time";
import type { Timestamp } from "firebase/firestore";

export type User = {
    id: string;
    name: string;
    created?: Timestamp;
    lastLogin: Timestamp;
    votes: Vote[];
};

const blankUser = (): User => ({
    id: "blank",
    name: "Blank",
    created: blankTimestamp(),
    lastLogin: blankTimestamp(),
    votes: [],
});


export const errorUser = (): User => ({
    ...blankUser(),
    id: "error",
    name: "Error",
});

export const pendingUser = (): User => ({
    ...blankUser(),
    id: "pending",
    name: "Pending",
});

export const freshUser = (uid: string): User => ({
    ...blankUser(),
    id: uid,
    name: "No Name",
    created: nowTimestamp(),
    lastLogin: nowTimestamp(),
});
