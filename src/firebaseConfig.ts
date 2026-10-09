// ========================================================
// CST Connect - Firebase Web Configuration & Initialization
// Connected Project ID: cst-connect-28d6b
// ========================================================

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import appletConfig from '../firebase-applet-config.json';

// Project Configuration for cst-connect-28d6b
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || (appletConfig as any)?.apiKey || 'AIzaSyDBsbb6HXuZRegErOTcMkZj6-x7_C0lcQ4',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'cst-connect-28d6b.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'cst-connect-28d6b',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'cst-connect-28d6b.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || (appletConfig as any)?.messagingSenderId || '651716611549',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || (appletConfig as any)?.appId || '1:651716611549:web:3b9b0a5c79ca4ba0f4ba34',
};

// 1. Initialize Firebase App
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// 2. Initialize Authentication (Email/Password provider)
export const auth = getAuth(app);

// 3. Initialize Firestore Database (User profiles, Routine, Notices, Chat)
const isProvisionedProject =
  !import.meta.env.VITE_FIREBASE_PROJECT_ID &&
  (appletConfig as any)?.projectId &&
  firebaseConfig.projectId === (appletConfig as any)?.projectId;

export const db = isProvisionedProject && (appletConfig as any)?.firestoreDatabaseId
  ? getFirestore(app, (appletConfig as any).firestoreDatabaseId)
  : getFirestore(app);

// 4. Initialize Firebase Storage (Profile pictures, PDF notes)
export const storage = getStorage(app);

export default app;
