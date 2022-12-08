import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { userHandle } from "./utils";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHWEvliIWSQZAo3xR_QwO4PT_upgPMRpE",
  authDomain: "yukatech-todo-challenge.firebaseapp.com",
  projectId: "yukatech-todo-challenge",
  storageBucket: "yukatech-todo-challenge.appspot.com",
  messagingSenderId: "299265507659",
  appId: "1:299265507659:web:0dac62378ae7e49b4528ce",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => { 
  if (user) {
    const dbUser = await getDoc(doc(db, "users", user.uid));
      let data = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        ...dbUser.data(),
      };
      userHandle(data);
  } else {
    userHandle(false);
  }
});

export const login = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err.code);
  }
};
