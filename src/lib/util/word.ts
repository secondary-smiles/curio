import type { Timestamp, FieldValue } from "firebase/firestore";

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
  time: Timestamp | FieldValue;
  uid: string;
  random: number;
}

export const wordMap: WordType[] = [
  { type: "noun", abv: "n" },
  { type: "verb", abv: "v" },
  { type: "adjective", abv: "adj" },
  { type: "adverb", abv: "adv" },
  { type: "preposition", abv: "prep" },
  { type: "ideophone", abv: "ideo" },
  { type: "interjection", abv: "interj" },
  { type: "pronoun", abv: "pn" },
]

export type { Word, WordType }
