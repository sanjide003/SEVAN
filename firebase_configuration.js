import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, collection } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBIZr2FTMHyzbtayMssjxtN1o6dDME2_hA",
    authDomain: "fiesta-for-checking.firebaseapp.com",
    projectId: "fiesta-for-checking",
    storageBucket: "fiesta-for-checking.firebasestorage.app",
    messagingSenderId: "243257698174",
    appId: "1:243257698174:web:97e2d2904eb4d556b9f52f",
    measurementId: "G-T73M1BMP9V"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const appIdStr = "charity_v3_demo"; 
const invRef = collection(db, 'artifacts', appIdStr, 'public', 'data', 'inventory_v3');
const reqRef = collection(db, 'artifacts', appIdStr, 'public', 'data', 'requests_v3');
const setRef = doc(db, 'artifacts', appIdStr, 'public', 'data', 'settings', 'app_settings');

export { app, auth, db, invRef, reqRef, setRef };
