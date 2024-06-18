import { Timestamp } from "firebase/firestore";

export type OldPollOptionMap = {
    option: string;
    votes: number;
}

export type OldPoll = {
    id: string;
    timestamp: Timestamp;
    question: string;
    results: OldPollOptionMap[];
};

// TODO: make cleaner
export const pendingOldPolls = (): OldPoll[] => {
    const o: OldPoll[] = [];
    o.push({
        id: "pending",
        timestamp: Timestamp.now(),
        question: "Loading old polls...",
        results: [],
    });
    return o;
};

export const errorOldPolls = (): OldPoll[] => {
    const o: OldPoll[] = [];
    o.push({
        id: "error",
        timestamp: Timestamp.now(),
        question: "Error loading old polls!",
        results: [],
    });
    return o;
}
