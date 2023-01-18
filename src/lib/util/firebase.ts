import { initializeApp } from "firebase/app";

import { getFirestore, collection, query, where, getDocs, addDoc, orderBy, limit, startAfter, } from "firebase/firestore/lite";

import { DBNotFoundError } from "$lib/util/error";

import type { Word, WordType } from '$lib/util/word';
import { paginatedAllWordsStore, wordPaginationIndexStore } from "./store";

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

  const docs: Word[] = []
  snapshot.forEach((doc) => {
    docs.push(doc.data() as Word);
  })

  if (docs.length < 1) {
    throw new DBNotFoundError(name);
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
    where("query", "==", word),
    where("type.abv", "==", type.abv)
  );

  const snapshot = await getDocs(q);

  let numResults = 0;
  snapshot.forEach((_) => {
    numResults++;
  });

  return numResults
}

async function getLatestWords(num: number = 10) {
  const wordsRef = collection(db, "words");
  const q = query(wordsRef, orderBy("time", "desc"), limit(num));

  const snapshot = await getDocs(q);

  const results: Word[] = [];
  snapshot.forEach(doc => {

    results.push(doc.data() as Word);
  })


  // @ts-ignore
  wordPaginationIndexStore.set(snapshot.docs[snapshot.docs.length - 1]);

  return results;
}

async function getNextWords(num: number = 10) {
  let paginatedAll = false;
  paginatedAllWordsStore.subscribe((value) => paginatedAll = value);

  let latestIndex = 0;
  wordPaginationIndexStore.subscribe((value) => latestIndex = value);

  if (paginatedAll) {
    throw new Error("reached end of words")
  }

  const wordsRef = collection(db, "words");
  const q = query(
    wordsRef,
    orderBy('time', 'desc'),
    startAfter(latestIndex),
    limit(num)
  );

  const snapshot = await getDocs(q);

  const results: Word[] = [];
  snapshot.forEach(doc => {
    results.push(doc.data() as Word);
  });

  if (results.length < 1) {
    paginatedAllWordsStore.set(true);
    throw new Error("reached end of words");
  }

  // @ts-ignore
  wordPaginationIndexStore.set(snapshot.docs[snapshot.docs.length - 1]);

  return results;
}

async function uploadWord(word: Word) {
  const wordsRef = collection(db, "words");
  await addDoc(wordsRef, word);
}

async function getUserWords(uid: string, num: number = 10) {
  const wordsRef = collection(db, "words");

  const q = query(
    wordsRef,
    where("uid", "==", uid),
    orderBy('time', "desc"),
    limit(num)
  );

  const snapshot = await getDocs(q);

  const results: Word[] = [];
  snapshot.forEach((doc) => {
    results.push(doc.data() as Word)
  })

  if (results.length < 1) {
    throw new DBNotFoundError(`'${uid}' is not a valid user`)
  }

  // @ts-ignore
  wordPaginationIndexStore.set(snapshot.docs[snapshot.docs.length - 1]);

  return results;
}

async function getNextUserWords(uid: string, num: number = 10) {
  let paginatedAll = false;
  paginatedAllWordsStore.subscribe((value) => paginatedAll = value);

  let latestIndex = 0;
  wordPaginationIndexStore.subscribe((value) => latestIndex = value);

  if (paginatedAll) {
    throw new Error("reached end of words")
  }

  const wordsRef = collection(db, "words");

  const q = query(
    wordsRef,
    where("uid", "==", uid),
    orderBy("time", "desc"),
    limit(num),
    startAfter(latestIndex)
  )

  const snapshot = await getDocs(q);

  const results: Word[] = [];
  snapshot.forEach(doc => {
    results.push(doc.data() as Word);
  });

  if (results.length < 1) {
    paginatedAllWordsStore.set(true);
    throw new Error("reached end of words");
  }

  // @ts-ignore
  wordPaginationIndexStore.set(snapshot.docs[snapshot.docs.length - 1]);

  return results;
}

export {
  getWord,
  searchWord,
  app,
  wordExistsCount,
  uploadWord,
  getLatestWords,
  getNextWords,
  getUserWords,
  getNextUserWords
}
