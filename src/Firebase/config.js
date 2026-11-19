import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Pegá acá adentro tus credenciales exactas de Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyASDlD5u-zpCKYIvd8w1AasKgo67KdsswM",
  authDomain: "teoforever-computers.firebaseapp.com",
  projectId: "teoforever-computers",
  storageBucket: "teoforever-computers.firebasestorage.app",
  messagingSenderId: "23455460917",
  appId: "1:23455460917:web:aa594d62603d069c8c0b7c",
  measurementId: "G-2X5M8RXCXS"

};

// Inicializamos Firebase y exportamos los dos servicios que vamos a usar
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);