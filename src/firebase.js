import { initializeApp } from "firebase/app";
import {
  getFirestore,
  where,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
  initializeFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { query, orderBy, onSnapshot, limit } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDolvfEl7hXZ8QCauYTGaTDT0osuJWvgMY",
  authDomain: "todo-d9044.firebaseapp.com",
  projectId: "todo-d9044",
  storageBucket: "todo-d9044.appspot.com",
  messagingSenderId: "959875698500",
  appId: "1:959875698500:web:cc26d7c786278bc5a29111",
  measurementId: "G-D5PVJLG6XE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
const db = getFirestore(app);

export const auth = getAuth();
const provider = new GoogleAuthProvider();

export const CreateNewUser = async (detail, extra) => {
  try {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    console.log(detail);
    const result = await setDoc(doc(db, "users", detail.email), {
      isWelcome: false,
      username: detail.displayName,
      email: detail.email,
      password: detail.password,
      confirmPassword: detail.confirmPassword,
      CreatedAt: new Date(),
      Task: {
        MyDay: [], 
        All: [],
        Important: [],
        Planned:[],
        extra
      }
    });
    alert("user created!!!");
  } catch (e) {
    console.log("create user error", e);
  }
};


export const AddUserTask = async (user, taskvalue, today)=>{
  var obj =[];
  const docRef = doc(db, "users", user);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  console.log(data)
  await updateDoc(docRef, {
    Task: [
      ... taskvalue[today]
    ]
  });
  return obj;
}

//Forgot Password
export const updateUserPassword = async (email) => {
  sendPasswordResetEmail(auth, email).then(() => {
    //// console.log('sent')
  });
};


export async function createAuthUserWithEmailAndPassword(email, password) {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function signinAuthUserWithEmailAndPassword(email, password) {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}
