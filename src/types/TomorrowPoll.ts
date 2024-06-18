import type { Poll } from "@/types/Poll";

export type TomorrowPoll = Omit<Poll, 'options'> & {
    likes: number;
};
