import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInWithPopup as firebaseSignInWithPopup
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app;
let auth;
let googleProvider;

// Define wrappers that will point to either real or dummy functions
export let onAuthStateChanged;
export let signInWithEmailAndPassword;
export let createUserWithEmailAndPassword;
export let signOut;
export let signInWithPopup;

try {
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'YOUR_FIREBASE_API_KEY') {
    throw new Error('Firebase API Key is missing or invalid.');
  }
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();

  // Assign real functions
  onAuthStateChanged = (callback) => firebaseOnAuthStateChanged(auth, callback);
  signInWithEmailAndPassword = (email, password) => firebaseSignInWithEmailAndPassword(auth, email, password);
  createUserWithEmailAndPassword = (email, password) => firebaseCreateUserWithEmailAndPassword(auth, email, password);
  signOut = () => firebaseSignOut(auth);
  signInWithPopup = (provider) => firebaseSignInWithPopup(auth, provider);

} catch (error) {
  console.error("Firebase Initialization Error:", error.message);
  
  // Assign dummy functions to prevent app crash
  onAuthStateChanged = (callback) => {
    callback(null);
    return () => {};
  };
  signInWithEmailAndPassword = () => Promise.reject(new Error("Firebase not configured"));
  createUserWithEmailAndPassword = () => Promise.reject(new Error("Firebase not configured"));
  signOut = () => Promise.resolve();
  signInWithPopup = () => Promise.reject(new Error("Firebase not configured"));
  
  auth = {};
  googleProvider = {};
}

export { auth, googleProvider };
