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
  sendEmailVerification
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

export async function createAuthUserWithEmailAndPassword(email, password) {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function signinAuthUserWithEmailAndPassword(email, password) {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const CreateNewUser = async (detail, user) => {
  try {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format as "yyyy-MM-dd"

    // const userCollection = collection(db, "users");

    // const newUserRef = await addDoc(userCollection, {
      const result = await setDoc(doc(db, "users", detail.email), {  
      isWelcome: false,
      username: detail.displayName,
      email: detail.email,
      password: detail.password,
      uid: user.uid,
      confirmPassword: detail.confirmPassword,
      createdAt: formattedDate,
      task: {
        myDay: [],
        all: [],
        important: [],
        planned: [],
        completed: []
      },
    });

    alert("User created successfully!");
  } catch (error) {
    console.error("Create user error:", error);
  }
};

export const AddUserTask = async (user, taskvalue, date) => {
  try {
     let isimportant = false;
     let iscompleted = false;
    const userDocRef = doc(db, 'users', user.email);
    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      const existingTasks = userData.task?.all || [];
      existingTasks.push({ taskvalue, date, isimportant , iscompleted  });
      await updateDoc(userDocRef, { 'task.all': existingTasks });

      // alert('Task added!');
    } else {
      console.log('User document not found');
    }
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

//Forgot Password
export const updateUserPassword = async (email) => {
  sendPasswordResetEmail(auth, email).then(() => {
    //// console.log('sent')
  });
};



export const GetAllCategoryTasks= async (userid)=>{
  try{

    let obj= [];
    const q = query(collection(db, "users"), where("uid", "==", userid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc)=>{
    obj= doc.data().task.all
    
  })
  return obj;
}
  catch(e){
    console.log("error in getalltasks", e)
  }
}

export const ChangeofImportance= async(userid, item, importance)=>{

  const userDocRef = doc(db, 'users', userid);
  const userDocSnapshot = await getDoc(userDocRef);
  
  if (userDocSnapshot.exists()) {
    const userData = userDocSnapshot.data();
    const existingTasks = userData.task?.all || [];
  
    // Find the index of the task you want to update
    const taskIndexToUpdate = existingTasks.findIndex(task => task.taskvalue === item.taskvalue && task.date === item.date);
  
    if (taskIndexToUpdate !== -1) {
      // If the task is found, update its properties
      existingTasks[taskIndexToUpdate].isimportant = importance;
  
      // Update the 'task.all' field in the document
      await updateDoc(userDocRef, { 'task.all': existingTasks });
      console.log('Task updated successfully!');
      return;
    } else {
      console.log('Task not found for updating.');
    }
  } else {
    console.log('User document does not exist.');
  }
  
}

export const MarkasCompleted =async(userid, item, completedstats)=>{
  const userDocRef = doc(db, 'users', userid);
  const userDocSnapshot = await getDoc(userDocRef);
  
  if (userDocSnapshot.exists()) {
    const userData = userDocSnapshot.data();
    const existingTasks = userData.task?.all || [];
  
    // Find the index of the task you want to update
    const taskIndexToUpdate = existingTasks.findIndex(task => task.taskvalue === item.taskvalue && task.date === item.date);
  
    if (taskIndexToUpdate !== -1) {
      // If the task is found, update its properties
      existingTasks[taskIndexToUpdate].iscompleted = completedstats;
  
      // Update the 'task.all' field in the document
      await updateDoc(userDocRef, { 'task.completed': existingTasks });
      await updateDoc(userDocRef, { 'task.all': existingTasks });
      console.log('Task updated successfully!');
      return;
    } else {
      console.log('Task not found for updating.');
    }
  } else {
    console.log('User document does not exist.');
  }

}

export const NewListInserted=async(userId, name )=>{
  console.log(userId)
  const userDocRef = doc(db, 'users', userId);


const userDocSnapshot = await getDoc(userDocRef);

if (userDocSnapshot.exists()) {
  const userData = userDocSnapshot.data();

 
  const allTasks = userData.task || [];

  if (!Array.isArray(allTasks.custom[name.trim()])) {
    allTasks.custom[name.trim()] = [{}];
  }
  console.log(allTasks)
  
  console.log(allTasks)
 await updateDoc(userDocRef, { task: allTasks });
}
}


export const getCustomAllTasks = async(userid)=>{
  try{

    let obj= [];
    const q = query(collection(db, "users"), where("uid", "==", userid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc)=>{
    obj= doc.data().task
    
  })
  return obj;
}
  catch(e){
    console.log("error in getalltasks", e)
  }

}


export const EmailVerifyByFirebase= async(userid)=>{
  const user = auth.currentUser;

  if (user) {
    try {
      await sendEmailVerification(user);
      console.log("Email verification sent!");
    } catch (error) {
      console.error("Error sending email verification:", error.message);
    }
  } else {
    console.error("No user found.");
  }
}