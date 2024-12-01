// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrsjSiDd_e4UAC1QUNFr_VSHnYLm1063A",
  authDomain: "coffee-store-db46a.firebaseapp.com",
  projectId: "coffee-store-db46a",
  storageBucket: "coffee-store-db46a.firebasestorage.app",
  messagingSenderId: "1004979941948",
  appId: "1:1004979941948:web:e96b7014fd1c210bfa0939"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);