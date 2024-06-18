import { freshUser } from "@/types/User";
import type { Vote } from "@/types/Vote";
import { auth, db } from "@/util/firebase";
import { nowTimestamp } from "@/util/time";
import { doc, setDoc, updateDoc } from "firebase/firestore";

//
//  FIREBASE
//

export const createUserDoc = async () => {
    if (auth.currentUser === null) throw new Error("User not logged in");

    const uid = auth.currentUser.uid;
    const userRef = doc(db, "users", uid);

    const userState = freshUser(uid);
    await setDoc(userRef, userState);

    return userState;

    // TODO: add set timeout error?
};

export const updateLastLogin = async () => {
    if (auth.currentUser === null) throw new Error("User not logged in");

    const uid = auth.currentUser.uid;
    const userRef = doc(db, "users", uid);

    const stateUpdate = {
        lastLogin: nowTimestamp(),
    };

    await updateDoc(userRef, stateUpdate);
};

const updateLastVote = async () => {
    if (auth.currentUser === null) throw new Error("User not logged in");
    const uid = auth.currentUser.uid;
    const userRef = doc(db, "users", uid);
    const stateUpdate = {
        lastVote: nowTimestamp(),
    };
    await updateDoc(userRef, stateUpdate);
};

export const setUserVoteDoc = async (vote: Vote) => {
    if (auth.currentUser === null) throw new Error("User not logged in");
    const uid = auth.currentUser.uid;
    const voteRef = doc(db, "users", uid, "votes", vote.pollID);
    await setDoc(voteRef, vote);
}



//
//  MUTATIONS
//

export const mutateUserVote = async (vote: Vote) => {
    await setUserVoteDoc(vote);
    await updateLastVote();
};

//
//  HOOK
//
