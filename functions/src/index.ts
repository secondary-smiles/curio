import * as functions from "firebase-functions";

import { sanitize, validateWord } from "./util/helpers";

import type { Word } from "./util/word";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.onCreateWord = functions.firestore
  .document('words/{word}')
  .onCreate((snap, context) => {
    const data = snap.data();

    let word = data as Word;

    let wordField = sanitize(word.word);
    let defField = sanitize(word.def);
    try {
      validateWord(word);
    } catch (err) {
      snap.ref.delete();
      return;
    }

    if (word.word != wordField || word.def != defField) {
      return snap.ref.set({
        word: wordField,
        def: defField,
      }, { merge: true })
    };

    return;
  })

