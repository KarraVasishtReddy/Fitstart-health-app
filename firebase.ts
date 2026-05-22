import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "healthy-fuze-374603",
  appId: "1:387124791717:web:8c30b7d60ef707f57d804c",
  apiKey: "AIzaSyARtqa800dchL7foeWjMm0dmE2bFUz_x98",
  authDomain: "healthy-fuze-374603.firebaseapp.com",
  databaseURL: `https://ai-studio-33bd2243-4bfb-4476-9f6b-65179602f8e2`,
  storageBucket: "healthy-fuze-374603.firebasestorage.app",
  messagingSenderId: "387124791717",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, 'ai-studio-33bd2243-4bfb-4476-9f6b-65179602f8e2');
export const googleProvider = new GoogleAuthProvider();
