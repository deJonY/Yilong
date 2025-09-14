// src/lib/firebase/init.ts
import { getApps, getApp, initializeApp } from "firebase/app";
import { getFirestore /*, initializeFirestore, persistentLocalCache, persistentMultipleTabManager */ } from "firebase/firestore";

// .env.local dagi PUBLIC keylar
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  // measurementId ixtiyoriy (Analytics faqat clientda kerak bo‘ladi)
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Hot-reload paytida bir necha marta initialize bo‘lib ketmasligi uchun:
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Oddiy Firestore instance (client o‘qishlar uchun yetarli)
export const db = getFirestore(app);

// Agar keyin offline cache yoki ko‘p tab rejimi xohlasangiz:
// export const db = initializeFirestore(app, {
//   localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
// });

export default app;
