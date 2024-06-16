import type { MyTimestamp } from "@/types/MyTimestamp";
import { midnightTimestamp } from "@/types/MyTimestamp";

export type PollOption = {
    text: string;
    votes: number;
};

export type Poll = {
    id: string;
    question: string;
    timestamp: MyTimestamp;
    options: PollOption[];
};

// dummy

export const dummyPoll = (): Poll => {
    const option1: PollOption = {
        text: "Yes",
        votes: 1,
    };

    const option2: PollOption = {
        text: "No",
        votes: 2,
    };

    const example: Poll = {
        id: "dummy",
        question: "Do you like this dummy?",
        options: [option1, option2],
        timestamp: midnightTimestamp(),
    };

    return example;
};

// tanstack status

export const pendingPoll = (): Poll => {
    const option1: PollOption = {
        text: "Pending...",
        votes: 0,
    };

    const example: Poll = {
        id: "pending",
        question: "Pending...",
        options: [option1],
        timestamp: midnightTimestamp(),
    };

    return example;
}

export const errorPoll = (): Poll => {
    const option1: PollOption = {
        text: "Error",
        votes: 0,
    };

    const example: Poll = {
        id: "error",
        question: "Error",
        options: [option1],
        timestamp: midnightTimestamp(),
    };

    return example;
}
