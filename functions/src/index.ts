import * as functions from "firebase-functions";

import { isXSS, isValidLength, isClean, isValidChars } from "./util/helpers";

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

    // Word and Def are valid lengths
    if (!(isValidLength(word))) {
      functions.logger.warn("INVALID length");
      deleteSnap(snap);
    }

    // Word contains only valid chars
    if (!(isValidChars(word.word))) {
      functions.logger.warn("INVALID chars");
      deleteSnap(snap);
    }

    // Word definition is an XSS attack
    if (isXSS(word.def)) {
      functions.logger.warn("INVALID contains xss");
      deleteSnap(snap);
    }

    // Neither word nor def contain words i don't like
    if (!isClean(word.word) || !isClean(word.def)) {
      functions.logger.warn("INVALID contains bad words");
      deleteSnap(snap);
    }

    return;
  })

function deleteSnap(snap: functions.firestore.QueryDocumentSnapshot) {
  functions.logger.error("DELETING invalid word", snap.data());
  snap.ref.delete();
}
