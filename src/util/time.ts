
import { Timestamp, type Timestamp as TimestampType } from "firebase/firestore";

export const midnightTimestamp = (): TimestampType => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return Timestamp.fromDate(now);
};

export const blankTimestamp = (): TimestampType => {
    return new Timestamp(0, 0);
}

export const nowTimestamp = (): TimestampType => {
    const now = new Date();
    return Timestamp.fromDate(now);
}

export const timestring = (ts: TimestampType): string => {
    return ts.toDate().toISOString();
}
