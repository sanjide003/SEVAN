import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, doc, collection } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

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
// Persist Firestore data locally so repeat visits use fewer network reads on the free plan.
const db = initializeFirestore(app, {
    localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});

// Unified database route mapping
const rootPath = "SKSSF/charity_app";

const invRef = collection(db, `${rootPath}/inventory`);
const reqRef = collection(db, `${rootPath}/requests`);
const admRef = collection(db, `${rootPath}/admins`);
const setRef = doc(db, `${rootPath}/settings/app_settings`);
const trackRef = collection(db, `${rootPath}/tracking`);

export { app, auth, db, invRef, reqRef, admRef, setRef, trackRef, rootPath };
