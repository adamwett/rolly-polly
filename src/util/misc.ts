import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { nowTimestamp } from "./time";


export const logMostRecentPollTimestamp = async () => {
    const q = query(collection(db, "polls"), where("timestamp", "<", nowTimestamp()), orderBy("timestamp", "desc"));
    const qSnap = await getDocs(q);
    if (qSnap.empty) {
        console.log("No polls found");
        return;
    }
    const mostRecent = qSnap.docs[0].data();
    console.log("Most recent poll timestamp: ", mostRecent.timestamp.toDate().toISOString());
}

export const DuplicateDocument = async (collectionName: string, docID: string) => {
    const docRef = doc(db, collectionName, docID);
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) {
        console.error("Document does not exist");
        return;
    }
    const docData = docSnap.data();
    docData.id = `${docID}_dupe`;
    const newDocCollection = collection(db, collectionName);
    await addDoc(newDocCollection, docData)
    console.log("Document duplicated");
}
