import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  setDoc,
  where,
} from "firebase/firestore";
import { setAllTodos } from "./store/todos";
import { todosHandle, userHandle } from "./utils";

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

    onSnapshot(doc(db, "todos", user.uid), (doc) => {
      todosHandle(doc.data())
    });


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
export const logout = async () => {
  try {
    await signOut(auth);
    userHandle(false);
  } catch (err) {
    console.log(err.code);
  }
};

export const newTodo = async (title, todostatus, user) => {
  try {
    let naber = Math.floor(Math.random() * 9999); 
    const response = await setDoc(doc(db, "todos", user.uid), {
      title: title,
      todostatus: todostatus,
      uid: user.uid,
      createdby: user.name,
    });
    return response;
  } catch (err) {
    console.log(err.code);
  }
};

export async function getAllTodos() {
  const colRef = collection(db, "todos");
  const snapshots = await getDocs(colRef);
  const docs = snapshots.docs.filter((doc) => {
    const data = doc.data();
    data.id = doc.id;
    return data;
  });
  console.log(snapshots)
  todosHandle(docs);
}


export async function deneme() {
  const docRef = collection(db, "todos");
  const docSnap = await getDocs(docRef);
  const docs = docSnap.docs.map(doc => {
    const data = doc.data()
    data.id = doc.id

    return data
  })

  todosHandle(docs)  
  return docs
}

export const getTodosByUser = async () => {
  const colRef = collection(db, "todos",  where("todostatus", "==", "Pending"));
  const snapshots = await getDocs(colRef);
  const docs = snapshots.docs.map((doc) => {
    const data = doc.data();
    data.id = doc.id;
    return data;
  });
  todosHandle(docs);
};
