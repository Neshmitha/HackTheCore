import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyANYKZcLNvAGXUpk90NOk_8xmyx9-Jm6N0",
  authDomain: "hackthecore.firebaseapp.com",
  projectId: "hackthecore",
  storageBucket: "hackthecore.firebasestorage.app",
  messagingSenderId: "424224793362",
  appId: "1:424224793362:web:d5df56e667dad029b949cb",
  measurementId: "G-G1M8S70T9Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
