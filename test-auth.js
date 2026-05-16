import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANYKZcLNvAGXUpk90NOk_8xmyx9-Jm6N0",
  authDomain: "hackthecore.firebaseapp.com",
  projectId: "hackthecore",
  storageBucket: "hackthecore.firebasestorage.app",
  messagingSenderId: "424224793362",
  appId: "1:424224793362:web:d5df56e667dad029b949cb",
  measurementId: "G-G1M8S70T9Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function testLogin() {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, "neshlassi@hackthecore.com", "HTC@2007");
    console.log("Success! Logged in as:", userCredential.user.email);
  } catch (error) {
    console.error("Failed to login:");
    console.error("Code:", error.code);
    console.error("Message:", error.message);
  }
  process.exit();
}

testLogin();
