// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYRGB7wjVvudGkLClOwMdioBxY7jFJ5ZE",
  authDomain: "liveink-f06e3.firebaseapp.com",
  projectId: "liveink-f06e3",
  storageBucket: "liveink-f06e3.firebasestorage.app",
  messagingSenderId: "760692055199",
  appId: "1:760692055199:web:ce96744f367efb108096aa"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = getApps().length ===0 ? initializeApp(firebaseConfig): getApp();

const db = getFirestore(app);
export { db };
