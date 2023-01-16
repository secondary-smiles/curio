import { initializeApp } from "firebase/app";

import { getFirestore, collection, query, where, getDocs, addDoc, } from "firebase/firestore/lite";

import { DBNotFoundError } from "$lib/util/error";
import { wordsLoadedStore } from '$lib/util/store';

import type { Word, WordType } from '$lib/util/word';

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
  wordsLoaded = value
});

// Doesn't work otherwise
wordsLoaded = wordsLoaded;

// Util functions
async function getWord(name: string) {
  for (let i = 0; i < wordsLoaded.length; i++) {
    if (wordsLoaded[i].query == name) {
      return [wordsLoaded[i]];
    }
  }

  const wordsRef = collection(db, "words");
  const q = query(wordsRef, where("query", "==", name));

  const snapshot = await getDocs(q);

  const docs: Word[] = []
  snapshot.forEach((doc) => {
    docs.push(doc.data() as Word);
    wordsLoaded.push(doc.data() as Word);
  })
  wordsLoadedStore.set(wordsLoaded);

  if (docs.length < 1) {
    throw new DBNotFoundError(`No such word '${name}' in database`);
  }

  return docs;
}

async function searchWord(name: string) {
  const endCode = name.replace(/.$/, (c) => {
    return String.fromCharCode(c.charCodeAt(0) + 1);
  });

  const wordsRef = collection(db, "words");
  const q = query(
    wordsRef,
    where("query", ">=", name),
    where("query", "<=", endCode)
  );

  const snapshot = await getDocs(q);

  const results: Word[] = [];
  snapshot.forEach((doc) => {
    results.push(doc.data() as Word);
  })

  return results;
}

async function wordExistsCount(word: string, type: WordType) {
  const wordsRef = collection(db, "words");
  const q = query(
    wordsRef,
    where("word", "==", word),
    where("type.abv", "==", type.abv)
  );

  const snapshot = await getDocs(q);

  let numResults = 0;
  snapshot.forEach((doc) => {
    numResults++;

    wordsLoaded.push(doc.data() as Word);
    wordsLoadedStore.set(wordsLoaded)
  });

  return numResults
}

async function uploadWord(word: Word) {
  const wordsRef = collection(db, "words");
  await addDoc(wordsRef, word);
}

export { getWord, searchWord, app, wordExistsCount, uploadWord }
