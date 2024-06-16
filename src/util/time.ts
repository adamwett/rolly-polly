
import { Timestamp, type Timestamp as TimestampType } from "firebase/firestore";

export const midnightTimestamp = (): TimestampType => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return Timestamp.fromDate(now);
};
