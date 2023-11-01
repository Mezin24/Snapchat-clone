import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBYED2A4QmILHWH6Ujs3GzRSQcJRjImK8c',
  authDomain: 'snapchat-clone-841fa.firebaseapp.com',
  projectId: 'snapchat-clone-841fa',
  storageBucket: 'snapchat-clone-841fa.appspot.com',
  messagingSenderId: '120759569220',
  appId: '1:120759569220:web:3351d88a8f82a3229e2511',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
