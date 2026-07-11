import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQpi9XqIPQVllh3FW77Pulcc77UFZswAI",
  authDomain: "lava-jato-do-yuri.firebaseapp.com",
  projectId: "lava-jato-do-yuri",
  storageBucket: "lava-jato-do-yuri.firebasestorage.app",
  messagingSenderId: "474257294224",
  appId: "1:474257294224:web:291bcfeeafc673df86a915",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);