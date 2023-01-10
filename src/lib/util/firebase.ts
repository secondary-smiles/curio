import { initializeApp } from "firebase/app";

import { getFirestore, collection, query, where, getDocs, } from "firebase/firestore/lite";
import type { DocumentData } from "firebase/firestore/lite";

import { DBNotFoundError } from "$lib/util/error";

const firebaseConfig = {
  apiKey: "AIzaSyCVpwVVAkJEGf9R40b2Lqes4NG1YtkXVos",
  authDomain: "curio-a6a8b.firebaseapp.com",
  projectId: "curio-a6a8b",
  storageBucket: "curio-a6a8b.appspot.com",
  messagingSenderId: "1075874528385",
  appId: "1:1075874528385:web:fd825b67752b97e66ea180",
  measurementId: "G-10R6P7KEK5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let db = getFirestore(app);

// Util functions
async function getWord(name: string) {
  const wordsRef = collection(db, "words");
  const q = query(wordsRef, where("query", "==", name));

  const snapshot = await getDocs(q);

  const docs: DocumentData = []
  snapshot.forEach((doc) => {
    docs.push(doc.data());
  })

  if (docs.length < 1) {
    throw new DBNotFoundError(`No such word '${name}' in database`);
  }

  return docs[0];
}

export { getWord }
