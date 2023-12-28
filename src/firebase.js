
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDolvfEl7hXZ8QCauYTGaTDT0osuJWvgMY",
  authDomain: "todo-d9044.firebaseapp.com",
  projectId: "todo-d9044",
  storageBucket: "todo-d9044.appspot.com",
  messagingSenderId: "959875698500",
  appId: "1:959875698500:web:cc26d7c786278bc5a29111",
  measurementId: "G-D5PVJLG6XE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);




