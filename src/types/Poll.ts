import { midnightTimestamp } from "@/util/time";
import type { Timestamp } from "firebase/firestore";

export type PollOption = {
    id: string;
    text: string;
    count: number;
};

export type Poll = {
    id: string;
    question: string;
    timestamp: Timestamp;
    options: PollOption[];
};

// tanstack status

export const pendingPoll = (): Poll => ({
    id: "pending",
    question: "Pending...",
    timestamp: midnightTimestamp(),
    options: [],
});

export const errorPoll = (): Poll => ({
    ...pendingPoll(),
    id: "error",
    question: "error"
});
