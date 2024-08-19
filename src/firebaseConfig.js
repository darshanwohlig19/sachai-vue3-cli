import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbC6Q-gPdFtYk6jmQ0ju_U9OfvtBIc7Zs",
  authDomain: "Sachai-Web.firebaseapp.com",
  projectId: "askus-4055a",
  storageBucket: "askus-4055a.appspot.com",
  messagingSenderId: "920776112657",
  appId: "1:920776112657:web:e7ed40a77acbd3b3454fb0",
  measurementId: "G-QC5E3WXVH5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
