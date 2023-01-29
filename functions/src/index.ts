import * as functions from "firebase-functions";

import sanitizeHtml from 'sanitize-html';

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

type WordTypeAbv = "n" | "v" | "adj" | "adv" | "prep" | "ideo" | "interj" | "pn";
type WordTypeWords = "noun" | "verb" | "adjective" | "adverb" | "preposition" | "ideophone" | "interjection" | "pronoun";

interface WordType {
  type: WordTypeWords;
  abv: WordTypeAbv
}

interface Word {
  word: string;
  type: WordType;
  def: string;
  query: string;
  uid: string;
  random: number;
}

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

function sanitize(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

function validateWord(data: Word) {
  if (data.word.length > 45 || data.word.length < 3) {
    throw new Error("incorrect word length");
  }

  if (data.def.length > 2000 || data.def.split(" ").length < 3) {
    throw new Error("incorrect def length");
  }
}
