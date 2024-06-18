import { createUserDoc, updateLastLogin } from "@/hooks/mutate/useUserMutation";
import { errorUser, pendingUser } from "@/types/User";
import type { User } from "@/types/User";
import { db } from "@/util/firebase";
import { auth } from "@/util/firebase";
import { nowTimestamp } from "@/util/time";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";

const fetchUser = async () => {
    if (auth.currentUser === null) throw new Error("User not logged in");

    const uid = auth.currentUser.uid;
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);

    // create a new (uninitalized) user document here if one doesn't exist
    if (userSnapshot.exists() === false)
        return await createUserDoc();

    return userSnapshot.data() as User;
};



export const useUser = () => {

    console.log("hooks: useUser");

    const { status, error, data } = useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
        staleTime: 300, // TODO: figure out a good time
    });

    switch (status) {
        case "pending":
            return pendingUser();
        case "error": {
            console.error(error);
            return errorUser();
        }
    }

    // its been more than an hour since the last login, update it
    // NOTE: we dont care abt updating local state bc this doesn't change any functionality
    if (data.lastLogin.seconds + 3600 < nowTimestamp().seconds)
        updateLastLogin();

    // console.log(`User: ${data.name} logged in at ${data.lastLogin.toDate().toLocaleString()}`);
    return data;
};
