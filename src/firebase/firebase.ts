import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjP6m50hPUU4dPZkggq41e-AUjGfS_OLo",
  authDomain: "pizza-9effc.firebaseapp.com",
  projectId: "pizza-9effc",
  storageBucket: "pizza-9effc.firebasestorage.app",
  messagingSenderId: "290851243559",
  appId: "1:290851243559:web:5449e2f76f1bd03136b002",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
