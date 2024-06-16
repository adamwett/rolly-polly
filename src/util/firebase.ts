import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCi4ahftPnlGa0dNk0c9fN8reL2uy21PKY",
    authDomain: "rolly-polly-9d001.firebaseapp.com",
    projectId: "rolly-polly-9d001",
    storageBucket: "rolly-polly-9d001.appspot.com",
    messagingSenderId: "333792217214",
    appId: "1:333792217214:web:d88bbf618b51bab041702f",
    measurementId: "G-QDJHK3K5N8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app }
