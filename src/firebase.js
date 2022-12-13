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
  orderBy,
  query,
  runTransaction,
  setDoc,
} from "firebase/firestore";
import { setStateNumber } from "./store/useeffectrender";
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

    userHandle(data);
  } else {
    userHandle(null);
  }
});

export const login = async (email, password) => {
  try {
    getAllTodos();
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err.code);
  }
};
export const logout = async () => {
  try {
    await signOut(auth);
    userHandle(null);
  } catch (err) {
    console.log(err.code);
  }
};

export const newTodo = async (
  title,
  description,
  todostatus,
  user,
  createdTime
) => {
  try {
    let todosID = Math.floor(Math.random() * 99999);
    await setDoc(doc(db, "todos", todosID.toString()), {
      title: title,
      description: description,
      todostatus: todostatus,
      uid: user.uid,
      createdby: user.name,
      createdTime: createdTime,
    });
    getAllTodos();
  } catch (err) {
    console.log(err.code);
  }
};

export const editTodo = async (
  id,
  title,
  description,
  todostatus,
  user,
  createdTime
) => {
  try {
    await setDoc(doc(db, "todos", id), {
      title: title,
      description: description,
      todostatus: todostatus,
      uid: user.uid,
      createdby: user.name,
      createdTime: createdTime,
    });
  } catch (err) {
    console.log(err.code);
  }
};

export const getCurrentData = async (id) => {
  try {
    const docSnap = await getDoc(doc(db, "todos", id));
    return docSnap.data();
  } catch (error) {
    console.log(error.code);
  }
};

export const changeTodoStatus = async (id, status) => {
  try {
    await runTransaction(db, async (transaction) => {
      transaction.update(doc(db, "todos", id.toString()), {
        todostatus: status,
      });
    });
    getAllTodos();
  } catch (err) {
    console.log(err.code);
  }
};

export const getAllTodos = async () => {
  try {
    const colRef = query(
      collection(db, "todos"),
      orderBy("createdTime", "desc")
    );
    const snapshots = await getDocs(colRef);
    const docs = snapshots.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
    setStateNumber(3);
    todosHandle(docs);
  } catch (error) {
    console.log(error.code);
  }
};
