export type Vote = {
    pollID: string;
    choice: string | null;
};

export const pendingVote = (pollID: string) => ({
    pollID: pollID,
    choice: "pending"
})

export const errorVote = (pollID: string) => ({
    pollID: pollID,
    choice: "error"
})
