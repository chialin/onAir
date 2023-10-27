import "./style.css";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  get,
  DatabaseReference,
} from "firebase/database";
import { setStatus } from "./setStatus";
import { isError } from "./isError";

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
async function fetchFirstRoundData(roundRef: DatabaseReference) {
  try {
    const snapshot = await get(roundRef);
    let round: string = "";
    if (snapshot.exists()) {
      round = snapshot.val();
      console.log(round);
      setStatus(round);
    }
  } catch (error: unknown) {
    if (isError(error)) {
      throw new Error(`Fetch Error: ${error.message}.`);
    }
  }
}

fetchFirstRoundData(roundRef);

// Listen pomofocus round change
onValue(roundRef, (snapshot) => {
  if (snapshot.exists()) {
    setStatus(snapshot.val());
  }
});
