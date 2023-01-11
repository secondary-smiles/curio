import { initializeApp } from "firebase/app";

import { getFirestore, collection, query, where, getDocs, } from "firebase/firestore/lite";
import type { DocumentData } from "firebase/firestore/lite";

import { DBNotFoundError } from "$lib/util/error";
import { wordsLoadedStore } from '$lib/util/store';
import type { Word } from '$lib/util/word';

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

let wordsLoaded: Word[] = [];
wordsLoadedStore.subscribe(value => {
  console.log(value)
  wordsLoaded = value
});

// Doesn't work otherwise
wordsLoaded = wordsLoaded;

// Util functions
async function getWord(name: string) {
  for (let i = 0; i < wordsLoaded.length; i++) {
    if (wordsLoaded[i].query == name) {
      console.log("cache")
      return wordsLoaded[i];
    }
  }

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

  wordsLoaded.push(docs[0])
  wordsLoadedStore.set(wordsLoaded);

  return docs[0];
}

async function searchWord(name: string) {
  console.log()
}

export { getWord }
