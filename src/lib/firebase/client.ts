// FRONT-END Firebase init (brauzer uchun)
import { getApps, initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdWZl01LqJtXtVUmRGbjRN9aSSnop-So8",
  authDomain: "yilong-datebase.firebaseapp.com",
  projectId: "yilong-datebase",
  storageBucket: "yilong-datebase.firebasestorage.app",
  messagingSenderId: "60891371934",
  appId: "1:60891371934:web:bafa13518da74eada99e8f",
  measurementId: "G-97BJPL5FCB"
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
