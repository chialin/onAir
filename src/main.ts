import "./style.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, get } from "firebase/database";
import { setStatus } from "./setStatus";

// Set Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

const database = getDatabase();
const roundRef = ref(database, "pomoData/round");
// Get pomofocus round value
get(roundRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const round = snapshot.val();
      console.log(round);
      setStatus(round);
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });

// Listen pomofocus round change
onValue(roundRef, (snapshot) => {
  setStatus(snapshot.val());
});
