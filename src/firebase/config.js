// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZQ2I1eCfKJtTw00M4zR4yzh7Js6eRaDw",
  authDomain: "job-application-tracker-30735.firebaseapp.com",
  databaseURL:
    "https://job-application-tracker-30735-default-rtdb.firebaseio.com",
  projectId: "job-application-tracker-30735",
  storageBucket: "job-application-tracker-30735.appspot.com",
  messagingSenderId: "649083841366",
  appId: "1:649083841366:web:ef924b5e8474538caec4f7",
  measurementId: "G-SL04VV4V2H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase(app);
const auth = getAuth(app);

export { app, db, auth };
