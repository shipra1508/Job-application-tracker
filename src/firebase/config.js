// Import the necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZQ2I1eCfKJtTw00M4zR4yzh7Js6eRaDw",
  authDomain: "job-application-tracker-30735.firebaseapp.com",
  databaseURL:
    "https://job-application-tracker-30735-default-rtdb.firebaseio.com",
  projectId: "job-application-tracker-30735",
  storageBucket: "job-application-tracker-30735.appspot.com", // Ensure this is included
  messagingSenderId: "649083841366",
  appId: "1:649083841366:web:ef924b5e8474538caec4f7",
  measurementId: "G-SL04VV4V2H",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const analytics = getAnalytics(app);
const db = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app); // Initialize Firebase Storage

// Export the initialized services
export { app, db, auth, storage, analytics };
